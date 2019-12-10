var mongoose = require("mongoose");

// Schema setup
var movieSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    movieTrail: String,
    category: String,
    createdAt: { type: Date, default: Date.now },
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;