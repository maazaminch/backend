const mongoose = require('mongoose');
const { Schema } = mongoose;

const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, { timestamps: true }
)

videoSchema.plugin(mongooseAggregatePaginate)

const Video = mongoose.model('Video', videoSchema)
module.exports = { Video }