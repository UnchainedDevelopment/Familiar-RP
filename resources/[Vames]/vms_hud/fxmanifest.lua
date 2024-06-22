fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'vames™️'
description 'vms_hud'
version '1.1.4'

shared_script 'config/config.lua'

client_scripts {
	'client/*.lua',
	'config/config.client.lua',
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
	'config/config.server.lua',
	'server/version_check.lua',
}

ui_page 'html/ui.html'

files {
	'html/*.*',
	'html/images/*.*',
	'html/sounds/*.*',
	'config/config.js',
	'translation.js'
}

escrow_ignore {
	'config/*.lua',
	'server/version_check.lua',
}
dependency '/assetpacks'