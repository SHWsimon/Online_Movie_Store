var express = require("express");
var router = express.Router();
var User = require("../models/user")
var Movie = require("../models/movie");
var middleware = require("../middleware");
var multer = require('multer');
var newArr = [];
var temp2 = [];
var noMatch = null;
// ======================
// Middleware
// ======================
// middleware.obj

// ======================
// MOVIE ROUTE
// ======================
// INDEX - show all movies
router.get("/page/:pageId", function(req, res){
    var noMatch = null;
    // Query
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        //Get movie from specific word(regex)
        Movie.find({name: regex}, function(err, allMovies){
            if(err){
                console.log(err);
            } 
            else {
                if(allMovies.length < 1) {
                    noMatch = "No movies match that query, please try again.";
                }
                var temp = []; 
    			var endPage = (req.params.pageId) * 8;
    			var startPage = endPage - 8;
    			temp2 = allMovies;
    			
    			for(var i=startPage; i<Math.min(temp2.length, endPage); i++){
    				temp.push(temp2[i]);
    			}
    			noMatch = true;
                res.render("movies/index",{movies:temp, page: temp2, noMatch: noMatch, flag: req.query.search});
            }
        });
    }
    else{
        Movie.find({}, function(err, allMovies){
			var temp = []; 
			var endPage = (req.params.pageId) * 8;
			var startPage = endPage - 8;
			temp2 = allMovies;
			
			for(var i=startPage; i<Math.min(temp2.length, endPage); i++){
				temp.push(temp2[i]);
			}

			res.render("movies/index", {movies: temp, page: temp2, noMatch: noMatch, flag: ""});
		});
    }
});

// INDEX - show category movies
router.get("/category/:category/page/:pageId", function(req, res){
    // var noMatch = null;
    // Query
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        //Get movie from specific word(regex)
        Movie.find({name: regex}, function(err, allMovies){
            if(err){
                console.log(err);
            } 
            else {
                if(allMovies.length < 1) {
                    noMatch = "No movies match that query, please try again.";
                }
                noMatch = true;
                res.render("movies/index",{movies:allMovies, page: allMovies, noMatch: noMatch, flag: req.query.search});
            }
        });
    }
    else{
        // Get all movies from DB
         Movie.find({category:req.params.category}, function(err, categorymovie){
            if(err){
                console.log(err);
            } 
            else{
        			var temp = []; 
        			var endPage = (req.params.pageId) * 8;
        			var startPage = endPage - 8;
        			temp2 = categorymovie;
        			
        			for(var i=startPage; i<Math.min(temp2.length, endPage); i++){
        				temp.push(temp2[i]);
        			}

        			res.render("movies/index", {movies: temp, page: temp2, noMatch: noMatch, flag: req.params.category});

            }
        });   
    }
});

router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to movies array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var movieTrail = req.body.movieTrail;
    var category = req.body.category;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newMovie = {name: name,  price: price, image: image, movieTrail: movieTrail, category: category, description: desc, author:author};
    // Create a new movie and save to DB
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to movies page
            console.log(newlyCreated);
            res.redirect("/movies/page/1");
        }
    });

});

// NEW - show form to create new movie
// Add new movie: go to new.ejs, and then add the new movie to /movies 
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("movies/new"); 
});

// SHOW - Show info about one movie
// router.get("/:id", middleware.isLoggedIn, function(req, res) {
router.get("/:id", function(req, res) {
    //find the movie with provide ID
    //get Comments data along with Posts data
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if(err || !foundMovie){
            req.flash("error", "Movie not found");
            res.redirect("back");
        }
        else{
            console.log(foundMovie);
            res.render("movies/show", {movie: foundMovie}); 
        }
    });
});

// EDIT MOVIE ROUTE
router.get("/:id/edit", middleware.checkMovieOwnership, function(req, res) {
    // already check ownership!
    Movie.findById(req.params.id, function(err, foundMovie){
        res.render("movies/edit", {movie: foundMovie});
    }); 
});

// UPDATE MOVIE ROUTE
router.put("/:id", middleware.checkMovieOwnership, function(req, res){

    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, movie){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/movies/" + movie._id);
        }
    });
});

// DESTROY MOVIE ROUTE
router.delete("/:id", middleware.checkMovieOwnership, function(req, res){
    Movie.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", err.message);
            res.redirect("/movies/page/1");
        }
        else{
            req.flash("success","Successfully Removed!");
            res.redirect("/movies/page/1");
        }
    });
});

// UPDATE Movie cart ROUTE
// router.put("/:id/cart", middleware.checkMovieOwnership, function(req, res){
router.put("/:id/cart", function(req, res){
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            var updateUser = {movies:movie};
            User.findByIdAndUpdate(req.user.id, {$addToSet: {movies:movie}},{new: true}, function(user){
                res.redirect("/users/"+req.user.id+"/checkout");
            });
        }
    });
});


// SEARCH
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
