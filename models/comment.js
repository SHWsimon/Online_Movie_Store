var mongoose = require("mongoose");

//Comment Schema
var commentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});
 
//Output Comment Schema
var comment = mongoose.model("Comment", commentSchema);
module.exports = comment;