Config = {}

-- We also recommend vms_charcreator, it fits perfectly with the style!

--====================================================--
-- For more information, read the documentation
-- https://docs.vames-store.com/assets/vms_clothestore
--====================================================--


Config.Core = "ESX" -- "ESX" / "QB-Core"
Config.CoreExport = function()
    if Config.Core == "ESX" then
        return exports['es_extended']:getSharedObject() -- ESX
    else
        return exports['qb-core']:GetCoreObject() -- QB-CORE
    end
end

Config.Notification = function(message, time, type)
    if type == "success" then
        if GetResourceState('vms_notify') ~= 'missing' then
            exports["vms_notify"]:Notification("CLOTHES STORE", message, time, "#27FF09", "fa-solid fa-shirt")
        else
            TriggerEvent('esx:showNotification', message)
            TriggerEvent('QBCore:Notify', message, 'success', time)
        end
    elseif type == "error" then
        if GetResourceState('vms_notify') ~= 'missing' then
            exports["vms_notify"]:Notification("CLOTHES STORE", message, time, "#FF0909", "fa-solid fa-shirt")
        else
            TriggerEvent('esx:showNotification', message)
            TriggerEvent('QBCore:Notify', message, 'error', time)
        end
    end
end

Config.Hud = {
    Enable = function()
        if GetResourceState('vms_hud') ~= 'missing' then
            exports['vms_hud']:Display(true)
        end
    end,
    Disable = function()
        if GetResourceState('vms_hud') ~= 'missing' then
            exports['vms_hud']:Display(false)
        end
    end
}

Config.Interact = {
    Enabled = false,
    Open = function()
        -- exports["interact"]:Open("E", Config.Translate['press_to_open']) -- Here you can use your TextUI or use my free one - https://github.com/vames-dev/interact
        -- exports['okokTextUI']:Open('[E] '..Config.Translate['press_to_open'], 'darkgreen', 'right')
        -- exports['qb-core']:DrawText(Config.Translate['press_to_open'], 'right')
    end,
    Close = function()
        -- exports["interact"]:Close() -- Here you can use your TextUI or use my free one - https://github.com/vames-dev/interact
        -- exports['okokTextUI']:Close()
        -- exports['qb-core']:HideText()
    end
}

-- @UseTarget: Do you want to use target system
Config.UseTarget = true
Config.TargetResource = 'ox_target'
Config.Target = function(data, cb)
    if Config.TargetResource == 'ox_target' then
        return exports[Config.TargetResource]:addBoxZone({
            coords = vec(data.coords.x, data.coords.y, data.coords.z),
            size = vec(data.targetSize.x, data.targetSize.y, data.targetSize.z),
            debug = false,
            useZ = true,
            rotation = data.targetRotation,
            options = {
                {
                    distance = 2.0,
                    name = 'clothestore',
                    icon = "fa-solid fa-shirt",
                    label = Config.Translate["target.clothestore"],
                    onSelect = function()
                        cb()
                    end
                }
            }
        })
    else
        print('You need to prepare Config.Target for the target system')
    end
end

Config.GetClosestPlayersFunction = function()
    local playerInArea = Config.Core == "ESX" and ESX.Game.GetPlayersInArea(GetEntityCoords(PlayerPedId()), 10.0) or QBCore.Functions.GetPlayersFromCoords(GetEntityCoords(PlayerPedId()), 10.0)
    return playerInArea
end

Config.UseCustomQuestionMenu = true -- if you want to use for example vms_notify Question Menu, set it true, if you want to use default menu from Config.Menu set it false
Config.CustomQuestionMenu = function(requesterId, outfitName, outfitTable)
    local question = exports['vms_notify']:Question(
        Config.Translate["share_outfit_title"], 
        Config.PriceForAcceptOutfit and Config.PriceForAcceptOutfit >= 1 and (Config.Translate['share_outfit_description']):format(outfitName, Config.PriceForAcceptOutfit) or (Config.Translate['share_outfit_description_free']):format(outfitName),
        '#8cfa64', 
        'fa-solid fa-shirt'
    )
    Citizen.Await(question)
    if question == 'y' then -- vms_notify question export return 'y' when player accept and 'n' when player reject
        TriggerServerEvent("vms_clothestore:acceptOutfit", requesterId, outfitName, outfitTable)
    end
end

-- @KeyOpen - https://docs.fivem.net/docs/game-references/controls/
Config.KeyOpen = 38 -- [E]

-- @SkinManager - ESX: "esx_skin" / "fivem-appearance" / "illenium-appearance"
-- @SkinManager - QB-Core: "qb-clothing" / "fivem-appearance" / "illenium-appearance"
Config.SkinManager = "illenium-appearance"


-- @UseQSInventory - if you use qs-inventory and clothing options
Config.UseQSInventory = true
Config.QSInventoryName = 'qs-inventory'

-- @ChangeClothes - Menu for choosing whether to buy new clothes or change into your clothes
Config.ChangeClothes = true

Config.DataStoreName = "property"

-- @ShareOutfit - Gives the ability to share a saved outfit with another player
Config.ShareOutfit = true

-- @PriceForAcceptOutfit - The price at which a player can accept an outfit
Config.PriceForAcceptOutfit = 0

Config.ManageClothes = true

-- @SaveClothesMenu - Clothes saving
Config.SaveClothesMenu = true

-- @Menu for ESX: "esx_context", "esx_menu_default", "ox_lib"
-- @Menu for QB-Core: "qb-menu", "ox_lib"
Config.Menu = "ox_lib"
Config.ESXMenuDefault_Align = 'right' -- works only for esx_menu_default
Config.ESXContext_Align = 'right' -- works only for ESX_Context


Config.SoundsEffects = true -- if you want to sound effects by clicks set true
Config.BlurBehindPlayer = true -- to see it you need to have PostFX upper Very High or Ultra

Config.EnableHandsUpButtonUI = true -- Is there to be a button to raise hands on the UI
Config.HandsUpKey = 'x' -- Key JS (key.code) - https://www.toptal.com/developers/keycode
Config.HandsUpAnimation = {'missminuteman_1ig_2', 'handsup_enter', 50}

Config.ClothingPedAnimation = {"missclothing", "idle_storeclerk"} -- animation of the player during character creation

Config.DefaultCamDistance = 0.95 -- camera distance from player location (during character creation)
Config.CameraHeight = {
    ['masks'] = {z_height = 0.65, fov = 25.0},
    ['hats'] = {z_height = 0.65, fov = 25.0},
    ['torsos'] = {z_height = 0.175, fov = 68.0},
    ['bproofs'] = {z_height = 0.175, fov = 68.0},
    ['pants'] = {z_height = -0.425, fov = 75.0},
    ['shoes'] = {z_height = -0.75, fov = 75.0},
    ['chains'] = {z_height = 0.35, fov = 35.0},
    ['glasses'] = {z_height = 0.65, fov = 25.0},
    ['watches'] = {z_height = -0.025, fov = 45.0},
    ['ears'] = {z_height = 0.65, fov = 30.0},
    ['bags'] = {z_height = 0.15, fov = 75.0},
}

Config.CameraSettings = {
    startingFov = 25.0,
    maxCameraFov = 120.0,
    minCameraFov = 10.0,
    maxCameraHeight = 2.5,
    minCameraHeight = -0.85
}

Config.Translate = {
    ['share_outfit_to_player'] = {name = 'Share Outfit - %s', icon = ''},
    ['share_outfit_to_player_id'] = 'Player [%s]',
    ['share_outfit_title'] = 'Outfit Share',
    ['share_outfit_description_free'] = 'Do you want to accept the style of outfit - %s',
    ['share_outfit_description'] = 'Do you want to buy the outfit - %s for $%s',
    ['received_outfit'] = 'You received outfit style - %s',
    ['sent_outfit'] = 'You sent outfit style - %s',
    ['no_players_around'] = 'No players around you',

    ['title_share_free'] = {name = 'You want to accept outfit %s?', icon = 'fas fa-shirt'},
    ['title_share'] = {name = 'You want to buy outfit %s for $%s?', icon = 'fas fa-shirt'},
    ['share_accept'] = {name = 'Yes', icon = 'fas fa-check'},
    ['share_reject'] = {name = 'No', icon = 'fas fa-xmark'},


    ['blip.clothesstore'] = 'Clothes Store',
    ['blip.maskstore'] = 'Mask Store',
    
    ['target.clothestore'] = 'Clothe store',
    ['press_to_open'] = 'Press ~INPUT_CONTEXT~ to open',

    ['you_paid'] = 'You paid %s$ for the clothes',
    ['saved_clothes'] = 'You saved the clothes with a name %s',
    ['removed_clothes'] = 'Clothes has been deleted from the wardrobe.',
    ['enought_money'] = 'You dont have enough money',
    
    ['name_is_too_short'] = 'The clothe name is too short',

    ['select_option'] = {name = 'Select option', icon = 'fas fa-check-double'},
    ['manage_header'] = {name = 'Manage clothes', icon = 'fas fa-tshirt'}, 
    ['share_header'] = {name = 'Share outfit', icon = 'fas fa-share'}, 
    ['wardrobe_header'] = {name = 'Wardrobe', icon = 'fas fa-tshirt'}, 

    ['open_wardrobe'] = {name = 'Open Wardrobe', icon = 'fas fa-shirt'},
    ['open_manage'] = {name = 'Manage clothes', icon = 'fas fa-shirt'},
    ['open_share'] = {name = 'Share clothes', icon = 'fas fa-share'},
    ['open_store'] = {name = 'Open Store', icon = 'fas fa-bag-shopping'},
    
    ['menu:header'] = {name = 'Do you want save this outfit?', icon = 'fas fa-check-double'},
    ['menu:yes'] = {name = 'Yes', icon = 'fas fa-check-circle'},
    ['menu:no'] = {name = 'No', icon = 'fas fa-window-close'},
    
    ['title_remove'] = {name = 'You want to remove %s?', icon = 'fas fa-shirt'},
    ['remove_yes'] = {name = 'Yes', icon = 'fas fa-check'},
    ['remove_no'] = {name = 'No', icon = 'fas fa-xmark'},

    ['esx_menu_default:header'] = 'Name your outfit',
    ['esx_context:title'] = {name = 'Enter name of outfit', icon = 'fas fa-shirt'},
    ['esx_context:placeholder_title'] = 'Outfit Name',
    ['esx_context:placeholder'] = 'Outfit name in wardrobe..',
    ['esx_context:confirm'] = {name = 'Confirm', icon = 'fas fa-check-circle'},

    ['qb-input:header'] = 'Name your outfit',
    ['qb-input:submitText'] = 'Save Outfit',
    ['qb-input:text'] = 'Outfit Name',
}

Config.Stores = {
    [1] = {
        coords = vector3(-1337.84, -1277.81, 4.0),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 362,
            display = 4,
            scale = 0.95,
            color = 5,
            name = Config.Translate['blip.maskstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = false,
            ['torsos'] = false,
            ['bproofs'] = false,
            ['pants'] = false,
            ['shoes'] = false,
            ['chains'] = false,
            ['glasses'] = false,
            ['watches'] = false,
            ['ears'] = false,
            ['bags'] = false,
        },
        -- @blockedClothes:
        --  For the clothing blockage to work correctly in the table, there must be at least two values. Only one value, for example {10}, cannot exist.
        --  To block only one value, you need to set the second value as a number that does not exist, for example {10, 100000}.
        blockedClothes = {
            ['male'] = {
                -- ['mask_1'] = {46, 100000},
            },
            ['female'] = {
                -- ['mask_1'] = {46, 100000},
            },
        }
    },
    [2] = {
        coords = vector3(-163.19, -310.78, 38.83),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = false,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['helmet_2'] = {
                --     ['3'] = {2,5},
                --     ['12'] = {1, 2, 4},
                --     ['16'] = {0, 1, 5}
                -- },
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [3] = {
        coords = vector3(76.27, -1399.03, 28.39),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [4] = {
        coords = vector3(424.73, -800.06, 28.5),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [5] = {
        coords = vector3(123.23, -228.47, 53.56),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [6] = {
        coords = vector3(-716.01, -147.9, 36.42),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [7] = {
        coords = vector3(-1188.53, -765.75, 16.32),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [8] = {
        coords = vector3(-3173.47, 1039.36, 19.86),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [9] = {
        coords = vector3(614.76, 2767.83, 41.09),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [10] = {
        coords = vector3(-1105.39, 2705.81, 18.12),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [11] = {
        coords = vector3(1190.51, 2709.38, 37.23),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [12] = {
        coords = vector3(1692.06, 4828.69, 41.07),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [13] = {
        coords = vector3(8.61, 6517.44, 30.89),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {2, 3, 4},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
    [14] = {
        coords = vector3(-827.25, -1077.71, 10.34),
        targetRotation = 85.0,
        targetSize = vec(2.15, 2.15, 2.15),
        blip = {
            sprite = 73,
            display = 4,
            scale = 0.95,
            color = 55,
            name = Config.Translate['blip.clothesstore'],
        },
        marker = {
            id = 23,
            size = vec(1.85, 1.85, 0.95),
            color = {255, 205, 0, 125},
            rotate = false,
            bobUpAndDown = false
        },
        categories = {
            ['masks'] = true,
            ['hats'] = true,
            ['torsos'] = true,
            ['bproofs'] = true,
            ['pants'] = true,
            ['shoes'] = true,
            ['chains'] = true,
            ['glasses'] = true,
            ['watches'] = true,
            ['ears'] = true,
            ['bags'] = true,
        },
        blockedClothes = {
            ['male'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {2, 3, 4},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
            ['female'] = {
                -- ['helmet_1'] = {46, 100000},
                -- ['mask_1'] = {},
                -- ['tshirt_1'] = {10, 15, 16, 17, 18, 19, 20},
                -- ['torso_1'] = {},
                -- ['arms'] = {},
                -- ['decals_1'] = {},
                -- ['bproof_1'] = {},
                -- ['pants_1'] = {},
                -- ['shoes_1'] = {},
                -- ['chain_1'] = {},
                -- ['glasses_1'] = {},
                -- ['watches_1'] = {},
                -- ['bracelets_1'] = {},
                -- ['ears_1'] = {},
                -- ['bags_1'] = {},
            },
        }
    },
}