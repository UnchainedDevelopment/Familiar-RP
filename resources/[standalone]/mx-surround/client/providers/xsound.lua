if not Config.ProvideXsound then return end

-- https://github.com/overextended/ox_target/blob/main/client/compat/qb-target.lua
local warned = false
local function exportHandler(exportName, func)
    AddEventHandler(('__cfx_export_xsound_%s'):format(exportName), function(setCB)
        if not warned then
            Warning('Please update your exports to mx-surround. Do not use xsound exports anymore.')
            Warning('Please update your exports to mx-surround. Do not use xsound exports anymore.')
            Warning('Please update your exports to mx-surround. Do not use xsound exports anymore.')
            warned = true
        end
        setCB(func)
    end)
end

-- mx-surround already have volume transitions
local function fadeIn(soundId)
    local volume = GetVolume(soundId)
    if not volume then return end
    SetVolumeMax(soundId, volume)
end

local function fadeOut(soundId)
    SetVolumeMax(soundId, 0.0)
end

exportHandler('onPlayStart', OnStart)
exportHandler('onPlayEnd', OnDestroy)
exportHandler('onLoading', OnLoading)
exportHandler('onPlayPause', OnPause)
exportHandler('onPlayResume', OnResume)
exportHandler('onPlayStartSilent', OnStart)
exportHandler('fadeIn', fadeIn)
exportHandler('fadeOut', fadeOut)
exportHandler('Distance', SetMaxDistance)
exportHandler('destroyOnFinish', SetDestroyOnFinish)
exportHandler('setSoundDynamic', SetDynamic)
exportHandler('setSoundURL', function(soundId, url)
    local soundData = table.deep_clone(Sounds[soundId])
    if not soundData then return Debug('Sound id ' .. soundId .. ' is not found') end
    soundData.url = url
    DestroySound(soundId)
    Wait(100)
    return PlaySound(soundId, soundData.url, soundData.coords, soundData.loop, soundData.volume, soundData.panner)
end)
exportHandler('getLink', GetLink)
exportHandler('getPosition', GetCoords)
exportHandler('isLooped', IsLooped)
exportHandler('getTimeStamp', GetTimeStamp)
exportHandler('getMaxDuration', GetMaxDuration)
exportHandler('isPlayerCloseToAnySound', IsPlayerHearingSound)
exportHandler('soundExists', SoundExists)
exportHandler('isPlaying', IsPlaying)
exportHandler('isPaused', IsPaused)
exportHandler('repeatSound', RepeatSound)
exportHandler('getVolume', GetVolume)
exportHandler('isDynamic', IsDynamic)
exportHandler('Position', function(soundId, coords)
    return SetCoords(soundId, coords, true)
end)
exportHandler('Destroy', DestroySound)
exportHandler('Resume', ResumeSound)
exportHandler('Pause', PauseSound)
exportHandler('setVolume', SetVolumeMax)
exportHandler('setVolumeMax', SetVolumeMax)
exportHandler('setTimeStamp', SetTimeStamp)
exportHandler('setSoundLoop', SetLoop)

exportHandler('isPlayerInStreamerMode', function()
    return StreamerMode
end)

local function infoConverter(data)
    data.position = data.coords
    data.url = data.link
    data.distance = 100.0 -- not supported
    data.isDynamic = data.dynamic
    data.timeStamp = GetTimeStamp(data.soundId)
end

exportHandler('getInfo', function(soundId)
    local info = GetInfo(soundId)
    return infoConverter(info)
end)

exportHandler('getAllAudioInfo', function()
    local sounds = table.deep_clone(Sounds)
    for _, sound in pairs(sounds) do
        infoConverter(sound)
    end
    return sounds
end)

local xSoundPanner = {
    panningModel = 'HRTF',
    -- rolloffFactor = 0.1,
    distanceModel = 'exponential',
}

local function playUrl(name, url, volume, loop)
    if Config.SoundProfile then
        Warning('Don\'t forget. If you pass a volume to PlayUrl, Config.SoundProfile will be ignored.')
    end

    PlaySoundAsync(name, url, nil, loop, volume)
end

exportHandler('PlayUrl', playUrl)

RegisterNetEvent('mx-surround:xsound:PlayUrl', playUrl)

local function playUrlPos(name, url, volume, vec, loop, options)
    if Config.SoundProfile then
        Warning('Don\'t forget. If you pass a volume to PlayUrlPos, Config.SoundProfile will be ignored.')
    end
    PlaySoundAsync(name, url, vec, loop, volume, xSoundPanner)
    if not SoundHandlers[name] then return Debug('PlayUrlPos :: Sound handler is not found') end
    if options then
        if options.onPlayStart then
            SoundHandlers[name].start = options.onPlayStart
            options.onPlayStart(Sounds[name])
        end
    end
end

exportHandler('PlayUrlPos', playUrlPos)

RegisterNetEvent('mx-surround:xsound:PlayUrlPos', playUrlPos)
