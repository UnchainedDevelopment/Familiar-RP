
local inVehicle = false
local fizzPed = nil
local carget = false
local mechBlip = nil


RegisterNUICallback('getCarsValetGKS', function(data, cb)

	if not carget then
		carget = true

		if data.hash == nil then
			TriggerEvent('gksphone:notifi', {title = _U('vale_title'), message = _U('vale_notclass'), img= '/html/static/img/icons/vale.png' })
			carget = false
			return
		end
		local modelHash = tonumber(data.hash)
		local ClassNumber =  GetVehicleClassFromName(modelHash)
		if ClassNumber == 14 or ClassNumber == 15 or ClassNumber == 16 then
			TriggerEvent('gksphone:notifi', {title = _U('vale_title'), message = _U('vale_notclass'), img= '/html/static/img/icons/vale.png' })
			carget = false
			return
		end

		local vehicles = GetGamePool("CVehicle")
		for _, vehicle in pairs(vehicles) do
			local plate = Entity(vehicle).state.plate or GetVehicleNumberPlateText(vehicle)
			if ESX.Math.Trim(plate) == ESX.Math.Trim(data.plate) then
				local vehicleCoords = GetEntityCoords(vehicle)
                SetNewWaypoint(vehicleCoords.x, vehicleCoords.y)
				TriggerEvent('gksphone:notifi', {title = _U('vale_title'), message = _U('vale_getr'), img= '/html/static/img/icons/vale.png' })
				carget = false
				return
			end
		end
		ESX.TriggerServerCallback('gksphone:loadVehicle', function(vehicleinfo, coords)
			if vehicleinfo ~= false then
				if vehicleinfo == "nomoney" then
					TriggerEvent('gksphone:notifi', {title = _U('vale_title'), message = _U('vale_checmoney'), img= '/html/static/img/icons/vale.png' })
					carget = false
				else
					local props = json.decode(vehicleinfo.vehicle)
					SpawnVehicle(props, props.plate)
					TriggerServerEvent('gksphone:valet-car-set-outside', props.plate)
				end
			else
				if coords then
					SetNewWaypoint(coords.x, coords.y)
					TriggerEvent('gksphone:notifi', {title = _U('vale_title'), message = _U('vale_getr'), img= '/html/static/img/icons/vale.png' })
				else
					TriggerEvent('gksphone:notifi', {title = _U('vale_title'), message = _U('vale_notcoming'), img= '/html/static/img/icons/vale.png' })
				end
				carget = false
			end
		end, data.plate)
	else
		TriggerEvent('gksphone:notifi', {title = _U('vale_title'), message = _U('vale_gete'), img= '/html/static/img/icons/vale.png' })
	end
	cb('ok')
end)




function SpawnVehicle(vehicle, plate)
	if	Config.ValeNPC  then
		local player = PlayerPedId()
		local playerPos = GetEntityCoords(player)
		local found, spawnPos, spawnHeading = GetClosestVehicleNodeWithHeading(playerPos.x + math.random(-100, 100), playerPos.y + math.random(-100, 100), playerPos.z, 0, 3, 0)

		local driverhash = 999748158
		local modelHash = vehicle.model

		modelHash = (type(modelHash) == 'number' and modelHash or joaat(modelHash))

		if not HasModelLoaded(modelHash) and IsModelInCdimage(modelHash) then
			while not HasModelLoaded(modelHash) do
				RequestModel(modelHash)
				Wait(500)
			end
		end

		Wait(500)

		ESX.Game.SpawnVehicle(modelHash, {
				x = spawnPos.x,
				y = spawnPos.y,
				z = spawnPos.z + 1
			}, spawnHeading, function(callback_vehicle)

				ESX.Game.SetVehicleProperties(callback_vehicle, vehicle)
				SetVehicleEngineOn(callback_vehicle,true)

				while not HasModelLoaded(driverhash) do
					RequestModel(driverhash)
					Wait(500)
				end

				fizzPed = CreatePedInsideVehicle(callback_vehicle, 4, driverhash, -1, true, false)
				mechBlip = AddBlipForEntity(callback_vehicle)
				SetBlipSprite(mechBlip, 225)                                                      	--Blip Spawning.
				SetBlipFlashes(mechBlip, true)
				SetBlipColour(mechBlip, 0)
				SetBlipFlashes(mechBlip, false)
				BeginTextCommandSetBlipName("STRING")
				AddTextComponentString(vehicle.plate)
				EndTextCommandSetBlipName(mechBlip)

				inVehicle = true
				GiveKeyCar(GetVehicleNumberPlateText(callback_vehicle))
				TaskVehicle(callback_vehicle, modelHash)
		end)

	else

		local player = PlayerPedId()
		local playerPos = GetEntityCoords(player)
		local found, spawnPos, spawnHeading = GetClosestVehicleNodeWithHeading(playerPos.x + math.random(-30, 30), playerPos.y + math.random(-30, 30), playerPos.z, 0, 3, 0)

		local modelHash = vehicle.model

		modelHash = (type(modelHash) == 'number' and modelHash or joaat(modelHash))

		if not HasModelLoaded(modelHash) and IsModelInCdimage(modelHash) then
			
			while not HasModelLoaded(modelHash) do
				RequestModel(modelHash)
				Wait(500)
			end
		end

		Wait(500)

		ESX.Game.SpawnVehicle(modelHash, {
				x = spawnPos.x,
				y = spawnPos.y,
				z = spawnPos.z + 1
			}, spawnHeading, function(callback_vehicle)

				ESX.Game.SetVehicleProperties(callback_vehicle, vehicle)
				SetVehicleEngineOn(callback_vehicle,true)

				mechBlip = AddBlipForEntity(callback_vehicle)
				SetBlipSprite(mechBlip, 225)                                                      	--Blip Spawning.
				SetBlipFlashes(mechBlip, true)
				SetBlipColour(mechBlip, 0)
				SetBlipFlashes(mechBlip, false)
				BeginTextCommandSetBlipName("STRING")
				AddTextComponentString(vehicle.plate)
				EndTextCommandSetBlipName(mechBlip)

				GiveKeyCar(GetVehicleNumberPlateText(callback_vehicle))
				Citizen.Wait(10000)
				RemoveBlip(mechBlip)
				mechBlip = nil
				carget = false
		end)

	end
	carget = false
end

function TaskVehicle(vehicle, vehhash)
	Citizen.Wait(750)
	local plycoords = GetEntityCoords(PlayerPedId())

	TaskVehicleDriveToCoord(fizzPed, vehicle, plycoords.x, plycoords.y, plycoords.z, 20.0, 0, model, 786603, 1.0, 1)

	while #(GetEntityCoords(fizzPed) - GetEntityCoords(PlayerPedId())) > 7.5 do
		Wait(1000)
	end

	LeaveIt(vehicle)
end

function LeaveIt(vehicle)
	TaskLeaveVehicle(fizzPed, vehicle, 14)
	inVehicle = false
	while IsPedInAnyVehicle(fizzPed, false) do
		Citizen.Wait(0)
	end

	Citizen.Wait(500)
	TaskWanderStandard(fizzPed, 10.0, 10)
	Citizen.Wait(10000)
	DeleteEntity(fizzPed)
	RemoveBlip(mechBlip)
	mechBlip = nil
	fizzPed = nil
	carget = false
end


