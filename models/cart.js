var mongoose = require("mongoose");

// Schema setup
var cartSchema = new mongoose.Schema({

    createdAt: { type: Date, default: Date.now },
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
    },
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
        }
    ]
});

var Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;