var express = require("express");
var router = express.Router({mergeParams: true});
var Movie = require("../models/movie");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ======================
// Middleware
// ======================
// middleware.obj

// ====================================
//  COMMENTS ROUTES
// ====================================
// isLoggedIn check the user login or not
// COMMENTS - NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find movie by ID
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {movie: movie});
        }
    });
    
});

// COMMENTS - CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup movie using ID
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log(err);
            res.redirect("/movies/page/1");
        }
        else{
            //create new comment
            var text = req.body.comment;
            Comment.create(text, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save()
                    //connect new comment to movie
                    movie.comments.push(comment);
                    movie.save();
                    //redirect movie show page
                    req.flash("success", "Successfully added comment");
                    res.redirect("/movies/" + movie._id);
                }
            });
        }
           
    });
});


// COMMENTS - EDIT 
router.get("/:comments_id/edit", middleware.checkCommentOwnership, function(req, res){
    // make sure movie exist
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err || !foundMovie){
            req.flash("error", "Movie not found");
            return res.redirect("back");
        }
        //req.params.id: user id
        //req.params.comment_id: comment id
        Comment.findById(req.params.comments_id, function(err, foundComment) {
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            }
            else{
                res.render("comments/edit", {movie_id: req.params.id, comment: foundComment});
            }
        });
    });
    
});

// COMMENTS - UPDATE
router.put("/:comment_id", function(req, res){
    //req.body.comment: comment[text]
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/movies/" + req.params.id);
        }
    });
});

// COMMENTS - DESTROY
router.delete("/:comments_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comments_id, function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("error", "Comment deleted");
            res.redirect("/movies/" + req.params.id);
        }
    });
});

module.exports = router;