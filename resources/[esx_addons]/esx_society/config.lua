Config = {}

Config.Locale = GetConvar('esx:locale', 'en')
Config.EnableESXIdentity = true
Config.MaxSalary = 3500

Config.UseVMSHud = GetResourceState('vms_hud') ~= 'missing'

Config.BossGrades = { -- Uncomment and/or add additional grades you want to have access to the boss menu.
    ['boss'] = true,
    --['staff1'] = false,
    --['staff2'] = false,
    --['staff3'] = false,
}

Config.VMSStores = {
	['ltd1'] = 'LTDGasoline_1',
	['ltd2'] = 'LTDGasoline_2',
	['ltd3'] = 'LTDGasoline_3',
	['ltd4'] = 'LTDGasoline_4',
	['ltd5'] = 'LTDGasoline_5',
    ['robsliquor1'] = 'Robs_Liquor_1',
    ['robsliquor2'] = 'Robs_Liquor_2',
    ['robsliquor3'] = 'Robs_Liquor_3',
    ['robsliquor4'] = 'Robs_Liquor_4',
    ['twentyfourseven1'] = 'TwentyFourSeven_1',
    ['twentyfourseven2'] = 'TwentyFourSeven_2',
    ['twentyfourseven3'] = 'TwentyFourSeven_3',
    ['twentyfourseven4'] = 'TwentyFourSeven_4',
    ['twentyfourseven5'] = 'TwentyFourSeven_5',
    ['twentyfourseven6'] = 'TwentyFourSeven_6',
    ['twentyfourseven7'] = 'TwentyFourSeven_7',
    ['twentyfourseven8'] = 'TwentyFourSeven_8',
    ['twentyfourseven9'] = 'TwentyFourSeven_9',
    -- ['job_name'] = 'store_id',

    -- If you are using vms_stores with esx_society balance, add more jobs here
};

Config.VMSVehicleShops = {
	['pdm'] = 'PDM',
	['planesdealership'] = 'PlanesDealership',
	['boatsdealership'] = 'BoatsDealership',
    -- ['job_name'] = 'store_id',

    -- If you are using vms_stores with esx_society balance, add more jobs here
};

Config.VMSTunings = {
	['mechanic'] = 'BennyS',
    -- ['job_name'] = 'store_id',
	
    -- If you are using vms_stores with esx_society balance, add more jobs here
};