local vehicles = {
  {'spawnName', 'vehicle name'},   -- spawnName -> For the make name (in vehicles.meta -> <gameName>) -- vehicle name -> For the car name itself
  {'jp12', 'BMW lol'},   -- example
}

Citizen.CreateThread(function()
  for _,v in pairs(vehicles) do
    AddTextEntry(v[1],v[2])
  end
end)
