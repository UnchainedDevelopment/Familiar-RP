Config = {}

--[[
    >  HOW TO USE CLIENT:
    exports["vms_notify"]:Notification(
    	Title,
    	Message,
    	Show_Time, >> 1000 == 1s <<
    	HEX_Color, >> https://htmlcolorcodes.com/ <<
    	FontAwesome_Icon >> https://fontawesome.com/v4/icons/ <<
    )

 	>  HOW TO USE SERVER:
	TriggerClientEvent('vms_notify:Notification', source, 'Title', 'Message', Show_Time, 'HEX_Color', 'FontAwesome_Icon')
]]

-- @Skew: true / false
Config.Skew = true

-- @DefaultPosition: 'left' / 'right'
Config.DefaultPosition = 'right'

Config.QuestionAcceptKeyId = 246
Config.QuestionRejectKeyId = 306

Config.TestNotifyCommand = true
if Config.TestNotifyCommand then
    RegisterCommand('notify', function(source, args, raw)
    	exports["vms_notify"]:Notification(
    		"SMS", 
    		"Hello, my name is notification, nice to meet you!", 
    		5000, 
    		"#e8ad2e", 
    		"fa-solid fa-comment-sms"
    	)
    	Citizen.Wait(200)
    	exports["vms_notify"]:Notification(
    		"SHOP", 
    		"Hello, my name is notification, nice to meet you!", 
    		5000, 
    		"#ffeb12", 
    		"fa-solid fa-shop"
    	)
    end, false)
end

Config.TestQuestionCommand = true
if Config.TestQuestionCommand then
    RegisterCommand('question', function(source, args, raw)
		local question = exports['vms_notify']:Question('ANIMATION', 'Do you want to dance with vames?', '#25dbf7', 'fa-solid fa-user')
    	Citizen.Await(question)
		if question == 'y' then -- export return 'y' when player accept and 'n' when player reject
			print('ACCEPTED')
		else
			print('NOT ACCEPTED')
		end
    end, false)
end