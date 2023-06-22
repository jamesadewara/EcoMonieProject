//Get All Images for the Screen
const Thumbnail = {
    aware_img: require("../../../../assets/img/anime/awareness.png"),
    trash_img: require("../../../../assets/img/anime/trash.png"),
    cash_img: require("../../../../assets/img/anime/cash.png"),
}

export default [
    {
        id : '1',
        "title": "Please be Aware",
        description: "Human activity such as indiscriminate dumping and burning of refuse, Burning of tyres, rubbers, etc. causes hazardous impact to the society which affects the climate",
        image: Thumbnail.aware_img
    },
    {
        id : '2',
        "title": "Waste",
        description: "The continuous disposal of trash or recycleable material into the environment has negative impact on human.",
        image: Thumbnail.trash_img
    },
    {
        id : '3',
        "title": "Why Trash when you can earn",
        description: "We provide a platform whereby you can convert your trash into cash.",
        image: Thumbnail.cash_img
    }
    
]