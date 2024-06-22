if not Config.ProvideInteractSound then return end

local _soundExt = Config.interact_sound_extension
RegisterNetEvent('InteractSound_CL:PlayOnOne')
AddEventHandler('InteractSound_CL:PlayOnOne', function(soundFile, soundVolume)
    PlaySound(soundFile, SOUNDS_PATH .. soundFile .. '.' .. _soundExt, nil, false, soundVolume)
end)

RegisterNetEvent('InteractSound_CL:PlayOnAll')
AddEventHandler('InteractSound_CL:PlayOnAll', function(soundFile, soundVolume)
    PlaySound(soundFile, SOUNDS_PATH .. soundFile .. '.' .. _soundExt, nil, false, soundVolume)
end)

RegisterNetEvent('InteractSound_CL:PlayWithinDistance')
AddEventHandler('InteractSound_CL:PlayWithinDistance', function(playerNetId, maxDistance, soundFile, soundVolume)
    if GetPlayerFromServerId(playerNetId) ~= -1 then
        local eCoords = GetEntityCoords(GetPlayerPed(GetPlayerFromServerId(playerNetId)))
        PlaySound(soundFile, SOUNDS_PATH .. soundFile .. '.' .. _soundExt, eCoords, false, soundVolume)
        SetMaxDistance(soundFile, maxDistance)
    end
end)
