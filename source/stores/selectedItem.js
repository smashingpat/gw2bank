let initialState = {
    "id":30689,"slot":"WeaponA1","upgrades":[24615,24597],"stats":{"id":161,"attributes":{"Power":251,"Precision":179,"CritDamage":179}},"count":1,"name":"Eternity","type":"Weapon","level":80,"rarity":"Legendary","vendor_value":100000,"default_skin":4678,"game_types":["Activity","Wvw","Dungeon","Pve"],"flags":["HideSuffix","NoSalvage","NoSell","AccountBindOnUse"],"restrictions":[],"chat_link":"[&AgHhdwAA]","icon":"https://render.guildwars2.com/file/A30DA1A1EF05BD080C95AE2EF0067BADCDD0D89D/456014.png","details":{"type":"Greatsword","damage_type":"Physical","min_power":1045,"max_power":1155,"defense":0,"infusion_slots":[{"flags":[]},{"flags":[]}],"suffix_item_id":24599,"secondary_suffix_item_id":"","stat_choices":[155,161,159,157,158,160,153,605,700,616,154,156,162,686,559,754,753,799,1026,1067,1123,1140,1085,1153,1118,1131,1111,1109]},"filter":true
}

const selectedItem = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SELECTED_ITEM':
            return {
                ...initialState,
                ...action.payload
            }
        case 'REMOVE_SELECTED_ITEM':
            return initialState
        default:
            return state
    }
}

export default selectedItem
