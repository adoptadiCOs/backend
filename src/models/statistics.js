const {model, Schema} = require('mongoose')

const Statistic = new Schema({
    _id: {
        type: Date,
        default: new Date(new Date().setHours(0,0,0,0)).getTime()
    },
    num: Number
})

module.exports = model("Statistics",Statistic)