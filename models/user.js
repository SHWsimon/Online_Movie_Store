var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Movie = require("../models/movie");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   avatar: String,
   firstName: String,
   lastName: String,
   email: String,
   intro: String,
   isAdmin: {type: Boolean, default: false},
   movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
        }
   ],
   historys: [{
        movies:[],
        date: { type: Date, default: Date.now }
   }
       
   ]
    
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);