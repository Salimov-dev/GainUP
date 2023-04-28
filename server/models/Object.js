const { Schema, model} = require('mongoose')

const schema = new Schema({
    status: String,
    userId: String,
    contact: {
        email: String,
        name: String,
        phone: String,
        position: {type: Schema.Types.ObjectId, ref: 'WorkingPosition'}
    },
    accordTerms: {
        readyToContract: String,
        readyToRenovation: String,
        readyToRent: String,
    },
    description: {
        comment: {type: String, required: true},
        fullDescription: {type: String, required: true},
    },
    estateOptions: {
        premisesFloor: String,
        premisesHeight: String,
        prepaidPrice: String,
        rentPrice: String,
        rentSquare: String,
        rentalHolidays: String,
        totalSquare: String,
    },
    location: {
        city: {type: String, required: true},
        district: {type: String, required: true},
        adress: {type: String, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        zoom: {type: Number, required: true},
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: "edited_at"}
})

module.exports = model('Object', schema)

// const { Schema, model} = require('mongoose')
//
// const schema = new Schema({
//     status: {type: Schema.Types.ObjectId, ref: 'ObjectStatus'},
//     userId: {type: Schema.Types.ObjectId, ref: 'User'},
//     contact: {
//         email: String,
//         name: String,
//         phone: String,
//         position: {type: Schema.Types.ObjectId, ref: 'WorkingPosition'}
//     },
//     accordTerms: {
//         readyToContract: String,
//         readyToRenovation: String,
//         readyToRent: String,
//     },
//     description: {
//         comment: {type: String, required: true},
//         fullDescription: {type: String, required: true},
//     },
//     estateOptions: {
//         premisesFloor: String,
//         premisesHeight: String,
//         prepaidPrice: String,
//         rentPrice: String,
//         rentSquare: String,
//         rentalHolidays: String,
//         totalSquare: String,
//     },
//     location: {
//         city: {type: String, required: true},
//         district: {type: String, required: true},
//         adress: {type: String, required: true},
//         latitude: {type: Number, required: true},
//         longitude: {type: Number, required: true},
//         zoom: {type: Number, required: true},
//     },
// }, {
//     timestamps: { createdAt: 'created_at', updatedAt: "edited_at"}
// })
//
// module.exports = model('Object', schema)