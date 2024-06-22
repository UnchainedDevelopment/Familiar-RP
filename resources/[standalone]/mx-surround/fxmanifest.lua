fx_version 'adamant'
game 'gta5'
author 'https://github.com/MOXHARTZ'
lua54 'yes'
version '1.9.1'
discord 'https://discord.gg/qEUYxm8Nnd'
documentation 'https://docs.moxha.dev/documentation/paid-scripts/surround-3d-sound/api'

shared_scripts {
    'shared/*.lua',
}

client_scripts {
    'client/callback.lua',
    'client/ambience.lua',
    'client/main.lua',
    'client/streamer.lua',
    'client/exports/*.lua',
    'client/handlers/*.lua',
    'client/providers/**/*.lua',
    'client/commands.lua',
    'client/types.lua',
}

server_scripts {
    'server/callback.lua',
    'server/main.lua',
    'server/exports/*.lua',
    'server/handlers/*.lua',
    'server/providers/**/*.lua',
    'server/commands.lua',
    'server/staticsounds.lua',
}

ui_page 'ui/build/index.html'
-- ui_page 'http://localhost:5173/'

files({
    'ui/build/index.html',
    'ui/build/**/*',
    'locales/*.json',
    'ui/sounds/*',
})

escrow_ignore {
    'client/callback.lua',
    'server/callback.lua',
    'server/providers/**/*.lua',
    'client/streamer.lua',
    'client/providers/**/*.lua',
    'shared/config.lua',
    'client/commands.lua',
    'server/commands.lua',
    'server/types.lua'
}

dependencies {
    '/onesync',
}

provide 'xsound'
provide 'interact-sound'

dependency '/assetpacks'