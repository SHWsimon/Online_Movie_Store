var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Movie = require("../models/movie");


// ======================
// Middleware
// ======================
// middleware.obj

// ======================
// USER(AUTH) ROUTE
// ======================
// Root route
router.get("/", function(req, res){
   res.render("landing"); 
});

// REGISTER ROUTE
// Register form
router.get("/register", function(req, res) {
   res.render("register", {page: 'register'}); 
});

// Handle sign up logic
router.post("/register", function(req, res) {
    var password = req.body.password;
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar,
        intro: req.body.intro
    });

    // Administer check
    if(req.body.username === 'Admin') {
        newUser.isAdmin = true;
    }
    User.register(newUser, password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        //let user in 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to MovieFox " + user.username);
            res.redirect("/movies/page/1"); 
        });
        
    });
});

// LOGIN ROUTE
// Show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// Handling login logic (resume already register)
// middleware first to check password, 
// middleware use passport.use(new LocalStrategy(User.authenticate()));
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/movies/page/1",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to MovieFox!'
    }), function(req, res){
});

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out");
   res.redirect("/movies/page/1");
});


module.exports = router;