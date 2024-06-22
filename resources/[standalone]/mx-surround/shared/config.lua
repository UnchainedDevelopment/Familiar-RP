--[[
    Welcome to the config file of MX SURROUND. Here you can change the default settings of the script.
    Do not make the name of the script anything other than mx-surround!
    Check the documentation for detailed information about the API: https://docs.moxha.dev/documentation/paid-scripts/surround-spatial-audio/api
    If you changed xsound name or export names, you can edit client/providers/xsound.lua.
    You can customize the streamer mode in client/streamer.lua.
    Don't forget to download the free addon scripts released for this script to get the best experience. You can find them in the documentation: https://docs.moxha.dev/documentation/paid-scripts/surround-spatial-audio/api
    If you have problems or are just looking for a place to chat, you can join my discord: https://discord.gg/qEUYxm8Nnd

    # Debug mode
    You can open the debug mode with the command `setr surround:debug true` in the console or server.cfg.
]]

SOUNDS_PATH = '/ui/sounds/' -- Path to the sounds folder (Don't change this if you don't know what you are doing)

Config = {}

Config.DefaultDistance = 75.0             -- Default max distance to fadeout sound (50.0 - inf)

Config.SleepDistance = 100                -- Max distance to fadeout sound when sleeping

Config.DefaultVolume = 1.0                -- Default volume (If sound profile is not false, it will be ignored) (0.0 - 1.0)

Config.InformApiStatus = false            -- Inform API status (Api down, created new token etc...)

Config.DisableAmbientSounds = true        -- Disable ambience sounds (For now just available for vanilla unicorn)

Config.Locale = 'en'                      -- Default locale

Config.SoundProfile = 306                 -- If you don't want to use sound profiles, set this to false. Otherwise, set this to the sound profile you want to use. (https://docs.fivem.net/docs/game-references/profile-settings/)

Config.SetStereoWhenInInterior = true     -- Set stereo mode when player is in interior.

Config.FadeDuration = 0.3                 -- Fade duration (0.0 - 1.0) (default: 0.3)

Config.DisableInteriorFilter = false      -- Disables interior filter

Config.DisableVehicleFilter = false       -- Disables vehicle filter

Config.SetStereoWhenClosestToSound = true -- Set stereo mode when player is closest a sound.

-- Filters doors by door count
Config.DoorCounts = {
    [7] = 3,
    [6] = 3,
    [5] = 3,
    [4] = 2,
    [3] = 2,
    [2] = 1,
    [1] = 1,
    [0] = 0,
}

--[[
    Usage is same as server export.
    Its not included in the docs because its not recommended to use it. But if you want to use it set the Config.CreateAServerEvent to true and use it like this:
    Example:
    TriggerServerEvent('mx-surround:playsv', source, soundId, url, coords, loop, volume, panner)
]]
Config.CreateAServerEvent = false -- If you want to use a server event to play sound, set this to true. Normally its not recommended. Because it can be trigger by cheaters.

-- You can use the `testpan` command for testing the panner. Check the client/commands.lua
Config.DefaultPanner = {           -- https://developer.mozilla.org/en-US/docs/Web/API/PannerNode
    panningModel = 'HRTF',
    refDistance = 1.2,             -- Distance of the volume dropoff start (maximum distance the song can be heard best volume)
    rolloffFactor = 1.2,           -- How fast the volume falls. The higher the value, the faster the fall, the lower the value, the slower the fall
    distanceModel = 'exponential', -- How the volume drops off (linear, inverse, exponential)
}

Config.ProvideXsound = true
Config.ProvideInteractSound = true

Config.interact_sound_extension = 'ogg' -- File type of the interact sound (mp3, ogg, wav)

-- You can use the `fltr` command for testing the filter. Check the client/commands.lua
Config.InteriorFilter = { -- https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
    frequency = 300,      -- Frequency (Hz)
    Q = 0.3,              -- Quality factor (float >= 0 and < 1000)
    gain = 40.0,          -- Gain (float >= -40 and <= 40) (dB)
}

Config.VehicleFilter = { -- https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
    frequency = 400,     -- Frequency (Hz)
    Q = -15.0,           -- Quality factor (float >= 0 and < 1000)
    gain = -1.0,         -- Gain (float >= -40 and <= 40) (dB)
}

Config.LiveHosts = { -- Your custom live audio hosts. (NOTE: I'm not supporting it, if you have problem with it you have to fix it yourself.)

}

--[[
    Here you can add a sound to a specific coords. An interior or anywhere you want. (Interior filter is applied automatically. So you just need to add the coords)
    If you dont want to use the static sounds just set the Config.StaticSounds to false.
]]
Config.StaticSounds = {
    -- {
    --     coords = vec3(108.4165267944336, -1289.333251953125, 28.858736038208), -- Coords of the sound (Vanilla unicorn)
    --     playlist = {                                                           -- You can add as many songs as you want. (If the audio needs to load very fast, use a local audio file)
    --         'https://www.youtube.com/watch?v=wJXB_wyEPg4&ab_channel=NoCopyrightSounds',
    --         'https://www.youtube.com/watch?v=lg1N-4jJJrk&ab_channel=TrapNation',
    --         -- SOUNDS_PATH .. 'beltalarm.ogg', -- this is an example of local audio file
    --     },
    --     volume = 0.08,           -- You can remove the volume. It will use the SoundProfile (0.0 - 1.0) (If you setted SetStereoWhenInInterior to false, best choice is the 1.0 but its true)
    --     panner = {               -- this is optional. If you don't want to add custom panner, you can remove this. It will be used default panner.
    --         panningModel = 'HRTF',
    --         refDistance = 20.0,  -- Distance of the volume dropoff start
    --         rolloffFactor = 1.8, -- How fast the volume drops off (don't 0.1)
    --         distanceModel = 'exponential',
    --     },
    --     loop = true, -- Loop the playlist
    -- }
}

Locales = {}

local _resourceName = GetCurrentResourceName()
local locale = LoadResourceFile(_resourceName, ('locales/%s.json'):format(Config.Locale)) or LoadResourceFile(_resourceName, 'locales/en.json')
_T = locale and json.decode(locale) or nil
if not _T then
    error(('^3[MX-SURROUND]^1 ERROR: ^7Failed to load locale file. Please make sure that the file %s exists and is valid JSON.'):format(('locales/%s.json'):format(Config.Locale)), 2)
end

if not IsDuplicityVersion() then
    return
end

if Config.CreateAServerEvent then
    RegisterNetEvent('mx-surround:playsv', function(source, soundId, url, coords, loop, volume, panner)
        local _soundId = SPlaySound(source, soundId, url, coords, loop, volume, panner)
        print('soundId', _soundId)
        -- Do something.
    end)
end
