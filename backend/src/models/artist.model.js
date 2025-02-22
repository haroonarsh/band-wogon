import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    artistImage: {
        type: String,
        default: "https://thumbs.dreamstime.com/z/crowd-music-show-happy-people-raised-hands-orange-stage-light-144447159.jpg?ct=jpeg",
        required: false,
    },
    artistName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    showPerformed: {
        type: String,
        required: true,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    genres: {
        type: [String],
        enum: ['Blues', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 'Hip-Hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'Reggae', 'R&B', 'Rock', 'Soul'],
        validate: {
            validator: function (array) {
                return array.length >= 1;
            },
            message: 'At least one genre must be selected.'
        },
        required: true,
    },
}, { timestamps: true }
);

const Artist = mongoose.models.Artist || mongoose.model("Artist", artistSchema);

export default Artist;