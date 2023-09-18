import mongoose from 'mongoose';

const schema = new mongoose.Schema({

    username: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    admin: {
        type: Boolean,
        default: false,
    },

    created: {
        type: Date,
        default: Date.now,
    },

});

schema.set("toJSON", { virtuals: true });

export default mongoose.model("User", schema);
