Config                  = {}

Config.MaxNameLength = 20 -- Max Name Length.
Config.LimitHeight = {120, 220} -- minimum and maximum
Config.LimitYear = {1900, 2010} -- minimum and maximum

Config.EnableBlur = true

Config.Multichars = true
Config.UseCustomSkinCreator = false -- If you want this you must set Config.Multichars = false 

-- @UseLatinAlphabetChecker: If you are using other alphabet than Latin, like Arabic, Japanese, Cyrillic etc. set false
Config.UseLatinAlphabetChecker = true

Config.UseNationalityOption = true

Config.DateFormat = 'mm/dd/yyyy'

Config.Notification = function(title, message, type)
	if type == "success" then
		exports["vms_notify"]:Notification(title, message, 4000, "#58c431", "fa-solid fa-fingerprint")
		-- TriggerEvent('esx:showNotification', message)
	elseif type == "error" then
		exports["vms_notify"]:Notification(title, message, 4000, "#c43131", "fa-solid fa-fingerprint")
		-- TriggerEvent('esx:showNotification', message)
	elseif type == "info" then
		exports["vms_notify"]:Notification(title, message, 4000, "#4287f5", "fa-solid fa-fingerprint")
		-- TriggerEvent('esx:showNotification', message)
	end
end

Config.Hud = {
    Enable = function()
        -- exports['vms_hud']:Display(true)
    end,
    Disable = function()
        -- exports['vms_hud']:Display(false)
    end
}

Config.Translate = {
	['cmd.opened_register'] = 'Successfully opened register menu for player %s',
	['cmd.help_id'] = 'id',
	['cmd.help_register'] = 'Open a register menu for a player',

	['register_notify'] = 'Register',
  	['register_success'] = 'Registration successful!',
  	['already_registered'] = 'You have already registered character.',
  	['invalid_firstname'] = 'Invalid format of <b>First Name</b>.',
  	['invalid_lastname'] = 'Invalid format of <b>Last Name</b>.',
  	['invalid_sex'] = 'Invalid format of <b>Sex</b>.',
  	['invalid_dob'] = 'Invalid format of <b>DOB</b>.',
  	['invalid_height'] = 'Invalid format of <b>Height</b>.',
}