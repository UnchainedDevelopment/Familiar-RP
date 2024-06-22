Config.Slots = 5
Config.Prefix = 'char'
Config.Identifier = "license" -- this is the identifier you use in the users table, if you use R* license set "license", if steam set "steam"
Config.UsersDatabase = { -- is the option where you add the tables to be cleared when a player removes a character by himself > {table = column}
    users = 'identifier',
    -- datastore_data = 'owner',
    -- owned_vehicles = 'owner',
    -- user_licenses = 'owner',

    -- vms_marketplaces = 'owner',
}


Config.EnableStarterItems = false
Config.StarterItems = {
    {name = 'bread', count = 15},
    {name = 'water', count = 15},
}

Config.EnableStarterMoney = false
Config.StarterMoney = {
    {account = 'money', amount = 1000},
    {account = 'bank', amount = 5000},
    -- {account = 'black_money', amount = 100},
}