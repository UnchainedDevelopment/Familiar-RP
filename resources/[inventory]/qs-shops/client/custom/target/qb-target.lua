if Config.UseTarget ~= 'qb-target' then
    return
end

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

        exports['qb-target']:AddTargetEntity(ShopPed[k], {
            options = {
                {
                    label = v['targetLabel'],
                    icon = v['targetIcon'],
                    item = v['item'],
                    action = function()
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
                    end,
                    job = v.requiredJob,
                    gang = v.requiredGang
                }
            },
            distance = 2.0
        })
    end
    pedSpawned = true
end

CreateThread(function()
    for i = 1, #Config.Stashes do
        local stash = Config.Stashes[i]
        exports['qb-target']:AddBoxZone(stash, vec3(stash.coords.x, stash.coords.y, stash.coords.z), 0.5, 0.5, {
            name = stash,
            heading = 90.0,
            debugPoly = false,
            minZ = stash.coords.z - 1,
            maxZ = stash.coords.z + 1,
        }, {
            options = {
                {
                    type = 'client',
                    icon = 'fa-solid fa-cash-register',
                    label = stash.targetLabel,
                    canInteract = function()
                        for _, job in ipairs(stash['requiredJobs']) do
                            if job == GetJobName() then
                                return true
                            end
                        end
                    end,
                    action = function()
                        OpenTargetStash(stash)
                    end,
                },
            },
            distance = 2.5
        })
    end
end)
