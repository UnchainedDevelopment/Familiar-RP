

function  GiveKeyCar (plate)
  -- TriggerEvent("vehiclekeys:client:SetOwner", plate)  -- You may need to write your car key function
end

function  OpenPhoneBlock () -- You can use this function if you want to prevent the phone from being turned on.
  return true
end

function ItemClientCheck()
  local phoneModel = "phone"
  local itemcheck = false
  if (GetResourceState('ox_inventory') == 'started' or Config.OxInvetory) and Config.UsableItem  then
    for k, v in pairs(Config.ItemName) do
      local count = exports.ox_inventory:Search('count', v)
      if count ~= nil then
        if count >= 1 then
          phoneModel = v
          itemcheck = true
          break
        end
      end
    end
  else
    itemcheck = true
  end
  return itemcheck, phoneModel
end

-- ## Clock in phone ## --

local useMilitaryTime = false

RegisterNUICallback('saat', function(data,cb)
  local hour = GetClockHours()
	local minute = GetClockMinutes()

	if useMilitaryTime == false then
		if hour == 0 or hour == 24 then
			hour = 12
		elseif hour >= 13 then
			hour = hour - 12
		end
	end

	if hour <= 9 then
		hour = "0" .. hour
	end
	if minute <= 9 then
		minute = "0" .. minute
	end
  local timeText = hour ..':' ..minute;
  SendNUIMessage({event = 'emuncuk', timeText = timeText})
  cb('ok')
end)


-- ## JOB APP ## --

RegisterNUICallback('JobMMessages', function(data, cb)
  local myPos = GetEntityCoords(PlayerPedId())
  local GPS = 'GPS: ' .. myPos.x .. ', ' .. myPos.y
  TriggerServerEvent('gksphone:gkcs:jbmessage', data.name, data.number, data.message, data.photo, GPS, data.jobm, data.anon)

  local jobs = json.decode(data.jobm)
  if Config.cdDispatch then
    for k=1, #jobs, 1 do
      if jobs[k] == "police" then
        local plyrdata = exports['cd_dispatch']:GetPlayerInfo()
        TriggerServerEvent('cd_dispatch:AddNotification', {
            job_table = {'police'},
            coords = plyrdata.coords,
            title = 'Notification sent over the phone',
            message = data.message,
            flash = 0,
            unique_id = tostring(math.random(0000000,9999999)),
            blip = {
                sprite = 817,
                scale = 1.2,
                colour = 3,
                flashes = false,
                text = 'Notification phone',
                time = (5*60*1000),
                sound = 1,
            }
        })
      end
    end
  end
  cb('ok')
end)

-- ## Weather in phone ## --

CreateThread(function()
  while true do
    Citizen.Wait(250)
    WeatherControl()
    Citizen.Wait(120000)
  end
end)

local water = {
  ExtraSunny = 90,
  Clear = 80,
  Neutral = 80,
  Smog = 90,
  Foggy = 80,
  Clouds = 80,
  Overcast = 80,
  Clearing = 75,
  Raining = 75,
  ThunderStorm = 80,
  Blizzard = -5,
  Snowing = 2,
  Snowlight = 8,
  Christmas = -2,
  Halloween = 60
}

local function temperatureRanges(birincihava)
  local deneyasd = water[birincihava]
  if not Config.Fahrenheit then
    deneyasd = (deneyasd - 32) * (5 / 9)
  end
  local temp_conv_str = string.format('%.0f', deneyasd)
  if Config.Fahrenheit then
    return temp_conv_str .. ' °F'
  else
    return temp_conv_str .. ' °C'
  end
end

function WeatherControl()
  local faruk, deea, waadad = GetWeatherTypeTransition()
    local denmee
    local agasdwa
      if (faruk == -1750463879) then
        denmee = 'ExtraSunny'
      elseif (faruk == 916995460) then
        denmee = 'Clear'
      elseif (faruk == -1530260698) then
        denmee = 'Neutral'
      elseif (faruk == 282916021) then
        denmee = 'Smog'
      elseif (faruk == -1368164796) then
        denmee = 'Foggy'
      elseif (faruk == 821931868) then
        denmee = 'Clouds'
      elseif (faruk == -1148613331) then
        denmee = 'Overcast'
      elseif (faruk == 1840358669) then
        denmee = 'Clearing'
      elseif (faruk == 1420204096) then
        denmee = 'Raining'
      elseif (faruk == -1233681761) then
        denmee = 'ThunderStorm'
      elseif (faruk == 669657108) then
        denmee = 'Blizzard'
      elseif (faruk == -273223690) then
        denmee = 'Snowing'
      elseif (faruk == 603685163) then
        denmee = 'Snowlight'
      elseif (faruk == -1429616491) then
        denmee = 'Christmas'
      elseif (faruk == -921030142) then
        denmee = 'Halloween'
      end

      if (deea == -1750463879) then
        agasdwa = 'ExtraSunny'
      elseif (deea == 916995460) then
        agasdwa = 'Clear'
      elseif (deea == -1530260698) then
        agasdwa = 'Neutral'
      elseif (deea == 282916021) then
        agasdwa = 'Smog'
      elseif (deea == -1368164796) then
        agasdwa = 'Foggy'
      elseif (deea == 821931868) then
        agasdwa = 'Clouds'
      elseif (deea == -1148613331) then
        agasdwa = 'Overcast'
      elseif (deea == 1840358669) then
        agasdwa = 'Clearing'
      elseif (deea == 1420204096) then
        agasdwa = 'Raining'
      elseif (deea == -1233681761) then
        agasdwa = 'ThunderStorm'
      elseif (deea == 669657108) then
        agasdwa = 'Blizzard'
      elseif (deea == -273223690) then
        agasdwa = 'Snowing'
      elseif (deea == 603685163) then
        agasdwa = 'Snowlight'
      elseif (deea == -1429616491) then
        agasdwa = 'Christmas'
      elseif (deea == -921030142) then
        agasdwa = 'Halloween'
      end

      local weatherg = {}
      local temperature = temperatureRanges(denmee)
      local temperatureto = temperatureRanges(agasdwa)

      table.insert(weatherg, { weatersi = denmee, waterso = agasdwa, tempsi = temperature, tempso = temperatureto })

      SendNUIMessage({event = 'weatherx', weathers = weatherg})
end

--  --

RegisterNetEvent(Config.ESXName..':playerLoaded')
AddEventHandler(Config.ESXName..':playerLoaded', function(playerData)
      local accounts = playerData.accounts or {}
      for index, account in ipairs(accounts) do
            if account.name == 'bank' then
                  SetBankBalance(account.money)
            end
      end
end)

--[[CreateThread(function ()
  while true do
      Wait(500)
      if NetworkIsPlayerActive(PlayerId()) then
          TriggerServerEvent('gksphone:gkssc:playerLoad', GetPlayerServerId(PlayerId()))
          break
      end
  end
end)]]

--  --


-- REGISTER COOMAND --

RegisterCommand("testmailbutton",function(source, args, rawCommand)
	TriggerServerEvent('gksphone:NewMail', {
		sender = 'GKSHOP',
		image = '/html/static/img/icons/mail.png',
		subject = "GKSPHONE",
		message = 'TEST',
    button = {
      buttonEvent = "qb-drugs:client:setLocation",
      buttonData = "test",
      buttonname = "test"
    }
  })
end)

RegisterCommand("testmail",function(source, args, rawCommand)
	TriggerServerEvent('gksphone:NewMail', {
		sender = 'GKSHOP',
		image = '/html/static/img/icons/mail.png',
		subject = "GKSPHONE",
		message = 'TEST'
  })
end)


RegisterCommand("911p",function(source, args, rawCommand)
  local message = args[1]
  local label = ""
  for i=1, #args, 1 do
    label = label .. ' ' ..args[i]
  end
  if message then
    local playerPed = PlayerPedId()
    local coords = GetEntityCoords(playerPed)
    local myPos = GetEntityCoords(PlayerPedId())
    local GPS = 'GPS: ' .. myPos.x .. ', ' .. myPos.y
    ESX.TriggerServerCallback('gksphone:namenumber', function(Races)
        local name = Races[2].firstname .. ' ' .. Races[2].lastname
        TriggerServerEvent('gksphone:gkcs:jbmessage', name, Races[1].phone_number, label, '', GPS, 'police', false)
    end)
    TriggerEvent('gksphone:notifi', {title = _U('job_appname'), message = _U('911message'), img= '/html/static/img/icons/jobm.png' })
  else
    TriggerEvent('gksphone:notifi', {title = _U('job_appname'), message = _U('no_args'), img= '/html/static/img/icons/jobm.png' })
  end
end, false)

RegisterCommand("911e",function(source, args, rawCommand)
  local message = args[1]
  local label = ""
  for i=1, #args, 1 do
    label = label .. ' ' ..args[i]
  end
  if message then
    local playerPed = PlayerPedId()
    local coords = GetEntityCoords(playerPed)
    local myPos = GetEntityCoords(PlayerPedId())
    local GPS = 'GPS: ' .. myPos.x .. ', ' .. myPos.y
    ESX.TriggerServerCallback('gksphone:namenumber', function(Races)
      local name = Races[2].firstname .. ' ' .. Races[2].lastname
      TriggerServerEvent('gksphone:gkcs:jbmessage', name, Races[1].phone_number, label, '', GPS, '["ambulance"]', false)
    end)
    TriggerEvent('gksphone:notifi', {title = _U('job_appname'), message = _U('911message'), img= '/html/static/img/icons/jobm.png' })
  else
    TriggerEvent('gksphone:notifi', {title = _U('job_appname'), message = _U('no_args'), img= '/html/static/img/icons/jobm.png' })
  end
end, false)

Citizen.CreateThread(function()
  TriggerEvent('chat:addSuggestion', '/911p', _U('911p'), {{ name="message", help=_U('911pmessage')}})
  TriggerEvent('chat:addSuggestion', '/911e', _U('911e'), {{ name="message", help=_U('911emessage')}})
end)

-- REGISTER COMMAND --
