RegisterCommand('deleteallsounds', function(source, args, rawCommand)
    DestroyAllSounds()
    PushNotification('All sounds have been deleted')
end, false)

-- RegisterCommand('playcl', function(source, args)
--     local coords = GetEntityCoords(PlayerPedId())
--     local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
--     local panner = {
--         panningModel = 'HRTF',
--         refDistance = 1.2,
--         rolloffFactor = 1.0,
--         distanceModel = 'exponential',
--         coneInnerAngle = 360.0,
--         coneOuterAngle = 0.0,
--     }
--     local soundId = exports['mx-surround']:createUniqueId()
--     PlaySound(soundId, args[1], coords)
--     -- local playerId = GetPlayerServerId(PlayerId())
--     -- exports['mx-surround']:attachPlayer(soundId, playerId)
--     if vehicle ~= 0 then
--         local networkId = VehToNet(vehicle)
--         -- local ped = PlayerPedId()
--         -- local networkId = PedToNet(ped)
--         AttachEntity(soundId, networkId)
--     end
-- end, false)

-- RegisterCommand('playsvev', function(source, args)
--     local coords = GetEntityCoords(PlayerPedId())
--     local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
--     local panner = {
--         panningModel = 'HRTF',
--         refDistance = 1.2,
--         rolloffFactor = 1.0,
--         distanceModel = 'exponential',
--         coneInnerAngle = 360.0,
--         coneOuterAngle = 0.0,
--     }
--     local soundId = exports['mx-surround']:createUniqueId()
--     TriggerServerEvent('mx-surround:playsv', -1, soundId, args[1], coords)
--     -- PlaySound(soundId, args[1], coords, true, nil)
--     -- local playerId = GetPlayerServerId(PlayerId())
--     -- exports['mx-surround']:attachPlayer(soundId, playerId)
--     if vehicle ~= 0 then
--         local networkId = VehToNet(vehicle)
--         -- local ped = PlayerPedId()
--         -- local networkId = PedToNet(ped)
--         AttachEntity(soundId, networkId)
--     end
-- end, false)

-- Example Usage: /fltr lowpass 1000 0.5 -20
-- RegisterCommand('fltr', function(source, args)
--     for k, v in pairs(Sounds) do
--         if v.filter then
--             exports['mx-surround']:removeFilter(k)
--         end
--         local type = args[1]
--         local freq = tonumber(args[2])
--         local q = tonumber(args[3])
--         local gain = tonumber(args[4])
--         exports['mx-surround']:addFilter(k, 'vehicle', {
--             type = type,
--             frequency = freq,
--             Q = q,
--             gain = gain
--         })
--     end
-- end, false)

-- RegisterCommand('clearfltr', function(source, args)
--     for k, v in pairs(Sounds) do
--         if v.filter then
--             exports['mx-surround']:removeFilter(k)
--         end
--     end
-- end, false)

-- Example Usage: /testpan HRTF 1.0 4.0 exponential
-- RegisterCommand('testpan', function(source, args)
--     local panningModel = args[1]
--     local refDistance = tonumber(args[2])
--     local rolloffFactor = tonumber(args[3])
--     local distanceModel = args[4]
--     local panner = { panningModel = panningModel, refDistance = refDistance, rolloffFactor = rolloffFactor, distanceModel = distanceModel }
--     for soundId, soundData in pairs(Sounds) do
--         SetPanner(soundId, panner)
--     end
-- end, false)
