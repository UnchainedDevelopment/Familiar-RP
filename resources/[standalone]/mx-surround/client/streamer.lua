---@param bool boolean
local function setStreamerMode(bool)
    StreamerMode = bool
    TriggerEvent('xsound:streamerMode', bool)
    TriggerServerEvent('mx-surround:streamerMode', bool)
    if not StreamerMode then
        PushNotification('Streamer mode is disabled')
    end
end

RegisterCommand('streamermode', function(source, args, rawCommand)
    local mode = not StreamerMode
    setStreamerMode(mode)
end, false)

exports('isStreamerModeEnabled', function()
    return StreamerMode
end)

exports('setStreamerMode', setStreamerMode)

-- https://github.com/Xogy/xsound/blob/8790f60a32506273ef09d7d963b36299bb621e54/client/commands.lua#L13C1-L19C5
AddEventHandler('xsound:streamerMode', function(status)
    if status then
        DestroyAllSounds()
        PushNotification('Streamer mode is enabled')
    end
end)
