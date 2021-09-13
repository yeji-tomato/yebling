// const jewerly = [
//     {
//         "_id": 1,
//         "name": "NECKLACE"
//     },
//     {
//         "_id": 2,
//         "name": "EARRINGS"
//     },
//     {
//         "_id": 3,
//         "name": "RING"
//     },
//     {
//         "_id": 4,
//         "name": "BRACELET"
//     }
// ]
const jetype = ['NECKLACE', 'EARRINGS', 'RING', 'BRACELET'];
const price = [
    {
        "name": "Any",
        "array": []
    },
    {
        "name": "10만원 이하",
        "array": [0, 100000]
    },
    {
        "name": "10만원 ~ 20만원",
        "array": [100000, 200000]
    },
    {
        "name": "20만원 이상",
        "array": [200000, 1000000]
    }
]

export {
    jetype,
    price
}