import { Schema, model } from 'mongoose';

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },

    shortUrl: {
        type: String,
        required: true,
        unique: true
    },

    clicks: {
        type: Number,
        required: true,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Url = model('Url', urlSchema);

export default Url;