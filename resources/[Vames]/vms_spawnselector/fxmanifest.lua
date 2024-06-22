fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'vames™️'
description 'vms_spawnselector'
version '1.0.7'

shared_script 'config.lua'

client_scripts {
	'client/*.lua',
	'config.client.lua',
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
	'config.server.lua',
	'server/*.lua',
}

ui_page 'html/ui.html'

files {
	'html/*.*',
	'translation.js'
}

escrow_ignore {
	'config.lua',
	'config.client.lua',
	'config.server.lua',
	'server/version_check.lua',
}
dependency '/assetpacks'