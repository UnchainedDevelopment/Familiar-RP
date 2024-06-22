if Config.UseTarget ~= 'ox_target' then
    return
end

local ox_target = exports.ox_target

function createPeds()
    if pedSpawned then return end

    for k, v in pairs(Config.Locations) do
        local current = type(v['ped']) == 'number' and v['ped'] or joaat(v['ped'])

        RequestModel(current)
        while not HasModelLoaded(current) do
            Wait(0)
        end

        ShopPed[k] = CreatePed(0, current, v['coords'].x, v['coords'].y, v['coords'].z - 1, v['coords'].w, false, false)
        TaskStartScenarioInPlace(ShopPed[k], v['scenario'], 0, true)
        FreezeEntityPosition(ShopPed[k], true)
        SetEntityInvincible(ShopPed[k], true)
        SetBlockingOfNonTemporaryEvents(ShopPed[k], true)

        local options = {
            {
                label = v['targetLabel'],
                icon = v['targetIcon'],
                item = v['item'],
                job = v.requiredJob,
                gang = v.requiredGang,
                distance = 2.0,
                onSelect = function()
                    if v['requiredJobs'] and type(v['requiredJobs']) == 'table' then
                        local hasRequiredJob = false
                        for _, job in ipairs(v['requiredJobs']) do
                            if job == GetJobName() then
                                local jobGrade = GetJobGrade()
                                if not v['requiredJobsGrades'] then
                                    hasRequiredJob = true
                                else
                                    for _, requiredGrade in ipairs(v['requiredJobsGrades']) do
                                        if jobGrade == requiredGrade then
                                            hasRequiredJob = true
                                            break
                                        end
                                    end
                                end
                                break
                            end
                        end
                        if hasRequiredJob then
                            if v['requiredLicense'] then
                                TriggerServerCallback(Config.esx_licensecheckLicense, function(have)
                                    if have then
                                        OpenShop(k, Config.Locations[k])
                                    else
                                        SendTextMessage(Lang('SHOPS_NOTIFICATION_MISSING_LICENSE'), 'error')
                                    end
                                end, GetPlayerServerId(PlayerId()), v['requiredLicense'])
                            else
                                OpenShop(k, Config.Locations[k])
                            end
                        else
                            SendTextMessage(Lang('SHOPS_NOTIFICATION_MISSING_JOB'), 'error')
                        end
                    else
                        if v['requiredLicense'] then
                            if Config.Framework == 'esx' and Config.ESXLicense then
                                TriggerServerCallback(Config.esx_licensecheckLicense, function(have)
                                    if have then
                                        if v['requiredJobs'] then
                                            local hasRequiredJob = false
                                            for _, job in ipairs(v['requiredJobs']) do
                                                if job == GetJobName() then
                                                    local requiredGrades = v['requiredJobsGrades']
                                                    if not requiredGrades or #requiredGrades == 0 then
                                                        hasRequiredJob = true
                                                        break
                                                    end

                                                    for _, requiredGrade in ipairs(requiredGrades) do
                                                        if GetJobGrade() == requiredGrade then
                                                            hasRequiredJob = true
                                                            break
                                                        end
                                                    end
                                                    break
                                                end
                                            end
                                            if hasRequiredJob then
                                                OpenShop(k, Config.Locations[k])
                                            else
                                                SendTextMessage(Lang('SHOPS_NOTIFICATION_MISSING_JOB'), 'error')
                                            end
                                        else
                                            OpenShop(k, Config.Locations[k])
                                        end
                                    else
                                        SendTextMessage(Lang('SHOPS_NOTIFICATION_MISSING_LICENSE'), 'error')
                                    end
                                end, GetPlayerServerId(PlayerId()), v['requiredLicense'])
                            else
                                TriggerServerCallback('shops:server:HasItem', function(have)
                                    if have then
                                        if v['requiredJobs'] then
                                            local hasRequiredJob = false
                                            for _, job in ipairs(v['requiredJobs']) do
                                                if job == GetJobName() then
                                                    local requiredGrades = v['requiredJobsGrades']
                                                    if not requiredGrades or #requiredGrades == 0 then
                                                        hasRequiredJob = true
                                                        break
                                                    end

                                                    for _, requiredGrade in ipairs(requiredGrades) do
                                                        if GetJobGrade() == requiredGrade then
                                                            hasRequiredJob = true
                                                            break
                                                        end
                                                    end
                                                    break
                                                end
                                            end
                                            if hasRequiredJob then
                                                OpenShop(k, Config.Locations[k])
                                            else
                                                SendTextMessage(Lang('SHOPS_NOTIFICATION_MISSING_JOB'), 'error')
                                            end
                                        else
                                            OpenShop(k, Config.Locations[k])
                                        end
                                    else
                                        SendTextMessage(Lang('SHOPS_NOTIFICATION_MISSING_LICENSE'), 'error')
                                    end
                                end, v['requiredLicense'])
                            end
                        else
                            OpenShop(k, Config.Locations[k])
                        end
                    end
                end
            },
        }
        ox_target:addLocalEntity(ShopPed[k], options)
    end
    pedSpawned = true
end

CreateThread(function()
    for i = 1, #Config.Stashes do
        local stash = Config.Stashes[i]
        local options = {
            coords = vec3(stash.coords.x, stash.coords.y, stash.coords.z),
            distance = 150.0,
            rotation = 180.0,
            debug = false,
            options = {
                {
                    icon = 'fa-solid fa-cash-register',
                    label = stash.targetLabel,
                    distance = 2.5,
                    canInteract = function()
                        for _, job in ipairs(stash['requiredJobs']) do
                            if job == GetJobName() then
                                return true
                            end
                        end
                    end,
                    onSelect = function()
                        OpenTargetStash(stash)
                    end
                }
            }
        }

        ox_target:addBoxZone(options)
    end
end)
