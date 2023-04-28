const { Schema, model} = require('mongoose')

const schema = new Schema({
    firstName: String,
    lastName: String,
    surName: String,
    email: {type: String, required: true, unique: true},
    password: String,
    managerStatus: {type: Schema.Types.ObjectId, ref: 'ManagerStatus'},
    phoneNumber: {type: String, required: true, unique: true},
    created_byUser: {type: Schema.Types.ObjectId, ref: 'User'},
    userAccessRoot: {type: Schema.Types.ObjectId, ref: 'UserAccessRoot'},
    startDateOfJobOffer: String,
    expiresDateOfJobOffer: String,
    sex: {type: String, enum: ['male', 'female']},
    dateOfStartVacation: String,
    dateOfEndVacation: String,
    quantityOfOpenStore: String,
    image: String,
}, {
    timestamps: true
})

module.exports = model('User', schema)

// const schema = new Schema({
//     firstName: String,
//     lastName: String,
//     surName: String,
//     email: {type: String, required: true, unique: true},
//     password: String,
//     managerStatus: {type: Schema.Types.ObjectId, ref: 'ManagerStatus'},
//     phoneNumber: {type: String, required: true, unique: true},
//     created_byUser: {type: Schema.Types.ObjectId, ref: 'User'},
//     userAccessRoot: {type: Schema.Types.ObjectId, ref: 'UserAccessRoot'},
//     startDateOfJobOffer: String,
//     expiresDateOfJobOffer: String,
//     sex: {type: String, enum: ['male', 'female']},
//     dateOfStartVacation: String,
//     dateOfEndVacation: String,
//     quantityOfOpenStore: String,
//     image: String,
// }, {
//     timestamps: true
// })



// const { Schema, model} = require('mongoose')
//
// const schema = new Schema({
//     firstName: {type: String, required: true},
//     lastName: {type: String, required: true},
//     surName: {type: String, required: true},
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true},
//     managerStatus: {type: Schema.Types.ObjectId, ref: 'ManagerStatus'},
//     phoneNumber: {type: String, required: true, unique: true},
//     created_byUser: {type: Schema.Types.ObjectId, ref: 'User'},
//     userAccessRoot: {type: Schema.Types.ObjectId, ref: 'UserAccessRoot'},
//     startDateOfJobOffer: {type: String, required: true},
//     expiresDateOfJobOffer: {type: String, required: true},
//     sex: {type: String, enum: ['male', 'female']},
//     dateOfStartVacation: String,
//     dateOfEndVacation: String,
//     quantityOfOpenStore: String,
//     image: String,
// }, {
//     timestamps: { createdAt: 'created_at'}
// })
//
// module.exports = model('User', schema)