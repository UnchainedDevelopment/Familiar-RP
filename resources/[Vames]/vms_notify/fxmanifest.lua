fx_version 'adamant'
lua54 'on'
game 'gta5'

author 'vames™️#1400'
description 'vms_notify'
version '1.0.2'

ui_page 'html/ui.html'

client_scripts {
	'config.lua',
	'client.lua',
}

files {
	'html/*.*',
}

exports {
	'Notification',
	'Question'
}

escrow_ignore {
	'config.lua',
}
dependency '/assetpacks'