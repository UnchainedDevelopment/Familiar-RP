-- PHONE SETTINGS --

Config = Config or {}
Config.KeyMapping       = true                 --## This setting is for those using slotted inventory. (Prevents key operation)
Config.OpenPhone        = 'f1'                 --## Phone open key ## https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/
Config.RegisterCommand  = "TooglePhone"        --
Config.ItemName         = {
                            "phone",
                            "pink_phone",
                            "gold_phone"
                        }
Config.ChargeItemName       = "powerbank"      -- PowerBank Item Name
Config.PropActive           = true
Config.Locale               = 'en'
Config.Fahrenheit           = true
Config.DataUsersPhoneNumber = true            -- You can use it if there is phone_number in the users table in the database.
Config.UsableItem           = true             -- If you want to use without items set it to false
Config.OxInvetory           = false            -- if you are using ox inventory set this to true
Config.AirDropID            = true            -- Activate the AirDrop feature if you want the player to see the ID.
Config.AutoMessageDelete    = true             -- Automatically deletes messages (Messages,Mail,Group Messages,Matchme Messages,Advertising)
Config.AutoDeleteTime       = 4                -- How many days ago you want to delete data
Config.TargetExport         = "ox_target"        -- exports["ox_target"]  -- Resource Name
Config.EyeTarget            = true            -- required ox_target
Config.WaitPhone            = 2                -- Cycle time when phone is on
Config.Signal               = true             -- Signal system (phone downtime in some areas)
-- PHONE SETTINGS --


-- ESX  --
Config.ESXVersion           = "Legacy"            -- ESX Version Legacy (+1.2) / OldLegacy (1.1)
Config.ESXResourceName      = "es_extended"       -- Filename of ESX Framework script
Config.ESXSharedObject      = "esx:getSharedObject"  -- ESX SharedObject Function
Config.ESXName              = "esx"            -- if you are using a different ESX name (you may need to change it)
Config.ESXLogout            = "esx:playerLogout"    --- ESX Logout trigger
Config.EsxAddonAcc          = 'esx_addonaccount:getSharedAccount'   -- if you are using a different ESX name (you may need to change it)
Config.ESXonPlayerDeath     = 'esx:onPlayerDeath'      -- Trigger to be used when the player dies
Config.ESXonPlayerSpawn     = 'esx:onPlayerSpawn'      --  The trigger that should be when the player gets revive
Config.ESXScoietyGetEmployes = "esx_society:getEmployees"   -- ESX Scoiety Adjust the triggers accordingly if they are different for you.
Config.ESXScoietyGetJob      = "esx_society:getJob"         -- ESX Scoiety Adjust the triggers accordingly if they are different for you.

-- ESX --


-- SETTINGS REQUIRED TO SPEAK VOICE --


Config.MumbleExport         = "mumble-voip"       -- exports["mumble-voip"]
Config.PMAVoiceExport       = "pma-voice"         -- exports["pma-voice"]
Config.PMAVoice         = true                   -- Use Pma-Voice Resource (Recomended!) https://github.com/AvarianKnight/pma-voice
Config.UseMumbleVoIP    = false                   -- Use Frazzle's Mumble-VoIP Resource https://github.com/FrazzIe/mumble-voip
Config.UseTokoVoIP      = false
Config.SaltyChat        = false                   -- SaltyChat (v2.6)


--- ## CALL COMMAND ### ---

Config.OnlineContactPlayers = false    -- Activate to see active players in the contacts

Config.CallAnswer = "answer"  -- quick answer (registercommand)
Config.EndCall = "endcall"  -- to close call (registercommand)

Config.SpecificNumberOn = false  --- If you want the SpecificNumber function to work, enable it
 -- When this number is called the trigger on the doc page will work.
 -- server : https://docs.gkshop.org/gksphone/developers/server-event#specific-number
 -- client : https://docs.gkshop.org/gksphone/developers/client-event#specific-number
Config.SpecificNumber = {
    ["5555555"] = true
}


-- APP SETTINGS --

Config.TaxiPrice        = 75      -- Taxi Price ( 75$/KM )
Config.TaxiJobCode      = "taxi"  -- Job Code

-- ### BANK APP ### ---
Config.BankTransferCom  = 10     -- Bank transfer commission rate
Config.OfflineBankTransfer = true

---### Dispatch ### ---
Config.cdDispatch       = false  -- Activate if you are using Codesign Dispatch (https://codesign.pro/package/4206357)

-- ### VALE APP ### ---
Config.OwnedVehicles        = "owned_vehicles"    -- ## SQL TABLE NAME (VEHICLES)
Config.ValetOut             = "OUT"               -- ## GARAGE IN OUT OPTION
Config.ValePrice            = 100                 -- Vale Price
Config.ValeNPC              = false                -- Activate if you want the valet to bring the car to you.
Config.ImpoundVale          = true                -- Set to true to not fetch impounded cars


Config.cdGarages            = false   -- Activate if you are using Codesign Garage (https://codesign.pro/package/4206352)
Config.loafGarages          = false   -- Activate if you are using Loaf Garage (https://store.loaf-scripts.com/package/4310876)

Config.ClassList = {
    [0] = "Compact",
    [1] = "Sedan",
    [2] = "SUV",
    [3] = "Coupe",
    [4] = "Muscle",
    [5] = "Sport Classic",
    [6] = "Sport",
    [7] = "Super",
    [8] = "Motorbike",
    [9] = "Off-Road",
    [10] = "Industrial",
    [11] = "Utility",
    [12] = "Van",
    [13] = "Bike",
    [14] = "Boat",
    [15] = "Helicopter",
    [16] = "Plane",
    [17] = "Service",
    [18] = "Emergency",
    [19] = "Military",
    [20] = "Commercial",
    [21] = "Train"
}

-- ## CAR SELLER ## --
Config.OfflineCarSeller = false
Config.DefaultGarage = "pillboxgarage"  -- The garage where the car will go when a car is purchased
Config.Carhashdebug = false  -- car hash (f8)
Config.CarsellerTax = 10
Config.CarsSellerBlacklist = {
    [-16948145] = false, -- car hash and true/false
    [-344943009] = false
}

Config.CarSellerClassBlock = {
    ["Emergency"] = true
}



-- ### House APP ### ---
Config.loafHouse          = false   -- Activate if you are using Loaf House (https://store.loaf-scripts.com/package/4310850)
Config.bcs_housing        = false   -- Activate if you are using BCS House (https://masbagus.tebex.io/package/5090952)


-- ### Advertising APP ### ---
Config.AdvertisingPrice = 300
Config.AdvertisingSendBlockCommand = "blockAdd" -- (/blockAdd true/false)


-- ### Twitter APP ### ---
Config.TwitterVerifyCommand = "twitterverify"   -- (/twitterverify true/false username) yellow tick
Config.TwitterSendBlockCommand = "blocktwitter" -- (/blockTwitter true/false)
Config.TwitterSendBanCommand = "bantwitter" -- (/bantwitter true/false username)
Config.TwitterSubsDate = 5 -- Twitter subs subscription renewal time
Config.TwitterSubsPay = 15 -- Twitter Subscription fee


-- ### SnapGram APP ### ---
Config.InstagramVerifyCommand = "instagramverify"
Config.InstagramSendBlockCommand = "blockSnapgram" -- (/blockInstagram true/false)

-- ### Race APP ### ---
Config.RaceAutCommand = "raceaut"
Config.esxcoreaut = "admin"  --- esx 1.2 authorization system

-- ### Charge ### --- (/charge playerid charge(0-100))
Config.ChargeAutCommand = "charge"
Config.esxcorechargeaut = "admin"  ---  esx 1.2 authorization system

-- ### Number Change ### ---
Config.NewNumberChange = "phonenumberchange" -- /phonenumberchange playerid newnumber

-- APP SETTINGS --


--## PHONE Box --##
Config.PhoneBox = true
Config.PhoneBoxKey = "E"
Config.PhoneBoxRegCom = "phonebox"
Config.PhoneBoothMoney = { actived = true, money = 500 }
Config.PhoneBoothModel = {
	[1281992692] = true,
    [1158960338] = true,
    [295857659] = true,
    [-78626473] = true,
    [-2103798695] = true,
    [1511539537] = true,
    [-1559354806] = true
}
Config.PhoneBootNumber = "22222"


--## Crypto ##--

Config.Crytos = {
    ["bitcoin"] = true,
    ["ethereum"] = true,
    ["tether"] = true,
    ["binance-usd"] = true,
    ["uniswap"] = true,
    ["binancecoi"] = true,
    ["terra-luna"] = true,
    ["avalanche-2"] = true,
    ["cardano"] = true,
    ["ripple"] = true,
    ["usd-coin"] = true,
    ["dogecoin"] = true,
    ["litecoin"] = true,
    ["chainlink"] = true,
    ["stellar"] = true,
    ["tron"] = true,
    ["eos"] = true,
    ["monero"] = true,
    ["iota"] = true
}

---##  Spam ## ---

Config.SpamLimit = 6  -- Default: 6
Config.SpamReset = 10  -- seconds
Config.SpamPlayerKick = true
Config.SpamDropPlayer = "You were kicked from the server for spamming too much"


-- ### Business APP ### ---


-- JOBs that will use the Business APP
Config.UseBusinessJobs = {
    mechanic = true,
    ambulance = true,
    police = true
}


Config.ESXBillingServer = false -- Set to true to Run Server Side Triggers
Config.UseBillingCommission = true  -- Invoice commission true/false
-- This is a percentage (0.10) == 10% ( Must be active to receive commission - If the player is not in the game, she/he cannot receive a commission.)
Config.BillingCommissions = {
    mechanic = 0.10,
    police = 0.25
}

-- People who can use the application at a high level (jobs and lowest rank)
Config.JobGrade  = {
    ["police"] = 3,
    ["ambulance"] = 2,
    ["mechanic"] = 2
}

--- ## Live APP --- ##

Config.LiveAPPDonateTax = 0.20 -- deduction rate from incoming money

--- ### FREAMWORK ### ----

ESX = nil
pcall(function() ESX = exports[Config.ESXResourceName]:getSharedObject() end)
if ESX == nil then
    TriggerEvent(Config.ESXSharedObject, function(obj) ESX = obj end)
end