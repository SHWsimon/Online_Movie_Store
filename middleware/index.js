var Movie = require("../models/movie");
var Comment = require("../models/comment");
var User = require("../models/user");

// ======================
// Middleware
// ======================
//all the middleware
var middlewareObj = {};

middlewareObj.checkMovieOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Movie.findById(req.params.id, function(err, foundMovie){
            if(err || !foundMovie){
                req.flash("error", "Movie not found");
                res.redirect("back");
            }
            else{
                // does user own campground?
                // foundCampground is an object not string
                if(foundMovie.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission");
                    res.redirect("back");
                }
            }
        });  
    }
    else{
        res.redirect("back");
    }
}
    
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            }
            else{
                // does user own comment?
                // foundCampground is an object not string
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission");
                    res.redirect("back");
                }
            }
        });  
    }
    else{
        req.flash("error", "You need to log in");
        res.redirect("back");
    }
}   

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // key, value
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}   

middlewareObj.checkProfileOwner = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user.id -> login user
		User.findById(req.user.id, function(err, user){
			if (err || !user) {
				req.flash("error", "User not found");
				return res.redirect("back");
			} else {
			 //   console.log(user._id); -> login user
			 //   console.log(req.params.username); -> user profile id
			    //user._id -> user profile id
				if(user._id.equals(req.user.id)  || req.user.isAdmin){
					next();
				} else {
					req.flash("error", "Permission denied");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please, login first!");
		res.redirect("back");
	}
};


module.exports = middlewareObj