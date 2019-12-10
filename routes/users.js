var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Movie = require("../models/movie");
var middleware = require("../middleware");
var arr3=new Array(size);
var size;
var arr =[];
var temp2 = [];
var temp3 = [];
// USER PROFILE
router.get("/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if(err) {
            req.flash("error", "Something went wrong.");
            return res.redirect("/");
        }
        Movie.find().where('author.id').equals(foundUser._id).exec(function(err, movies) {
            if(err) {
                req.flash("error", "Something went wrong.");
                return res.redirect("/");
            }
            // res.render("users/show", {user: foundUser, movies: movies});
            res.redirect("/users/" + foundUser._id + "/cart");
        })
    });
});

//EDIT
router.get("/:username/edit", middleware.checkProfileOwner, function(req, res){
	User.findById(req.params.username, function(err, foundUser){
		if (err || !foundUser) {
			req.flash("error", "No permission");
			return res.redirect("/movies/page/1");
		} else {
			res.render("users/edit", {user: foundUser});
		}
	});
});

//UPDATE
router.put("/:username", middleware.checkProfileOwner, function(req, res){
	User.findOneAndUpdate({username: req.params.username}, req.body.user, function(err, foundUser){
		if(err || !foundUser) {
			req.flash('error', "Something went wrong");
			return res.redirect("back");
		} else {
			req.flash("success", "Profile information was updated");
            res.redirect("/users/" + foundUser.id);
		}
	});
});

//Add Movie to Cart
// router.get("/:username/checkout", middleware.checkProfileOwner, function(req, res){
router.get("/:username/checkout", function(req, res){
		User.findById(req.params.username, function(err, foundUser){
		if (err || !foundUser) {
			req.flash("error", "No permission");
			return res.redirect("/movies/page/1");
		}
	
		Movie.find({}, function(err, allmovies){
			var temp = [];
			var total = 0;
			temp2 = allmovies;
			
			foundUser.movies.forEach(function(movie){
				for(var i=0; i<temp2.length; i++){
					if(temp2[i]._id.equals(movie)){
						temp.push(temp2[i]);
						total += parseInt(temp2[i].price, 10);
					}
				}
				
			});

			res.render("users/checkout", {user: foundUser, movieDetail: temp, total: total});
		});
	});
});

// DESTROY Movie from Cart
router.delete("/:username/:movieId/item-delete", function(req, res){
	// User.findById(req.params.username, function(err, foundUser){
	var movie_id = req.params.movieId;
	var user_id = req.params.username;
		
	User.findByIdAndUpdate(user_id, {$pull: {movies:movie_id }}, function(err,model){
	    
	    if(err){
	  		res.send(err);
	   			
	    }
	    else{
	    	arr3 =[];
	    	res.redirect("/users/" + user_id + "/checkout");
	    	
	    }
	});
	
});

// UPDATE History ROUTE
router.put("/:username/cart", function(req, res){
    User.findByIdAndUpdate(req.user.id, {$push: {historys:{movies: req.user.movies}}},{new: true}, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } 
        else {
        	user.movies.forEach(function(movie){
        		User.findByIdAndUpdate(user._id, {$pull: {movies: movie}}, function(err,model){
        		});		
        	});
        	req.flash("success","Successfully Updated!");
	        res.redirect("/users/" + user._id + "/cart");
        }
    });
});

// Get History ROUTE
router.get("/:username/cart", function(req, res){
	User.findById(req.user.id, function(err, foundUser) {
	    if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
    		Movie.find({}, function(err, allmovies){
			var temp4 = [];
			var total = [];
			var z = -1;
			temp3 = allmovies;
			var totaltest;
			
			
			foundUser.historys.forEach(function(movieHistorys){
				z+=1;
				temp4[z]=[]
				totaltest = 0
				for(var j=0; j<movieHistorys.movies.length; j++) {
    			    for(var i=0; i<temp3.length; i++){
						if(temp3[i]._id.equals(movieHistorys.movies[j]._id)){
							temp4[z][j]= temp3[i];
							totaltest +=parseInt(temp3[i].price, 10);
							
						}
						
					}
					total[z] =totaltest;
    			} 
			});
			res.render("users/show", {user: foundUser, movieDetail: temp4, total: total});
    		});
        }
	});
});

    
module.exports = router;
