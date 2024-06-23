fx_version 'cerulean'
game 'gta5'
description 'GKSPHONE'
version '1.6.9'
lua54 'yes'

data_file 'DLC_ITYP_REQUEST' 'stream/patoche_props_phone.ytyp'
data_file 'DLC_ITYP_REQUEST' 'stream/gks_charge_normal.ytyp'
data_file 'DLC_ITYP_REQUEST' 'stream/gks_charge_fast.ytyp'

ui_page 'html/index.html'

files {
	'html/*.html',
	'html/css/*.css',
	'html/js/*.js',
	'html/static/config/config.json',
	'html/static/config/lang/*.json',


	'html/static/img/**/*.jpg',
	'html/static/img/**/*.png',
	'html/static/img/**/*.svg',
	'html/static/sound/*.ogg',
	'html/static/sound/*.mp3',
	'html/static/fonts/*.ttf',
	'html/static/fonts/*.otf',
}

shared_scripts {
    "locales.lua",
	"config.lua",
	"locales/*.lua",
}

client_script {
	'@PolyZone/client.lua',  -- ## If you are not going to use the signal function delete it ##
	'@PolyZone/BoxZone.lua', -- ## If you are not going to use the signal function delete it ##
	'@PolyZone/EntityZone.lua', -- ## If you are not going to use the signal function delete it ##
	'@PolyZone/CircleZone.lua', -- ## If you are not going to use the signal function delete it ##
	'@PolyZone/ComboZone.lua', -- ## If you are not going to use the signal function delete it ##

	"client/prop.lua",
	"client/clientAPI.lua",
	"client/client.lua",
	"client/photo.lua",
	"client/bank.lua",
	"client/twitter.lua",
	"client/yellow.lua",
	"client/instagram.lua",
	"client/valet.lua",
	"client/client2.lua",
	"client/race.lua",
	"client/vehicle_names.lua",
	"client/music.lua",
	-- Charge
	"charge/config.lua",
	"charge/client.lua",
	"charge/prop.lua",
	-- Signal
	"signal/client.lua",
	"signal/config.lua",
}

server_script {
	--'@oxmysql/lib/MySQL.lua',
	"@mysql-async/lib/MySQL.lua",

	"configAPI.lua",
	"server/twitter.lua",
	"server/server.lua",
	"server/serverAPI/*.lua",
	"server/twitch.lua",
    "server/yellow.lua",
	"server/instagram.lua",
	"server/server2.lua",
	"server/versioncheck.lua",
	-- Charge
	"charge/config.lua",
	"charge/server.lua",
}

-- Client Exports --
exports {
    'CheckFlightMode',
	'PhoneNumber',
	'CheckOpenPhone',
	'ClosePhone',
	'BlockOpenPhone',
	'StartingCall',
	'IsCall',
	'JobDispatch',
	'SendNotification',
	'SendNewMail',
	'SendNewMailOffline',
	'OpenPhone',
	'InputChange'
}

-- Server Exports --
server_exports {
	'cryptoadd',
	'cryptoremove',
	'GetSourceByPhone',
	'GetPhoneBySource',
	'SendNotification',
	'SendNewMail',
	'SendNewMailOffline',
	'NumberChange',
	'SendNewBill'
}


escrow_ignore {
	'locales/*.lua',
	'config.lua',
	'configAPI.lua',
	"server/serverAPI/*.lua",
	'client/prop.lua',
	'client/valet.lua',
	'client/photo.lua',
	'client/clientAPI.lua',
	'client/vehicle_names.lua',
	'client/music.lua',
	"charge/prop.lua",
	"charge/config.lua",
	"signal/config.lua",
}


dependency '/assetpacks'