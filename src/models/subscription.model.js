const mongoose = require('mongoose');
const { Schema } = mongoose;


const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, //user who subscribes
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, //owner of channel also user
        ref: "User"
    }
}, { timestamps: true })

const Subscription = mongoose.model('Subscription', subscriptionSchema)

module.exports = Subscription; 