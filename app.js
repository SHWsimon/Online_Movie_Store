require('dotenv').config();

var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Movie          = require("./models/movie"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

// Requiring Routes    
var commentRoutes    = require("./routes/comments"),
    movieRoutes      = require("./routes/movies"),
    authRoutes       = require("./routes/index"),
    userRoutes       = require("./routes/users");
    

// Connect to DB
mongoose.connect("mongodb://localhost/moviestore_v2");
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
// Public directory : 
app.use(express.static(__dirname + "/public"));
// Use override
app.use(methodOverride("_method"));
// Use Ejs 
app.set("view engine", "ejs");
// Use flash
app.use(flash());
// Execute seedDB() function: add default data to DB
// seedDB();

// Passport configuration
app.use(require("express-session")({
    secret: "Bingo is the cutest dog!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======================
// Function
// ======================
// Global variable currentUser, message
app.use(function(req, res, next){
    //*****Important****** : know who login
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Show the time
app.locals.moment = require('moment');

// ======================
// USER(AUTH) ROUTE
// ======================
app.use("/", authRoutes);

// ======================
// MOVIES ROUTE
// ======================
app.use("/movies", movieRoutes);

// ====================================
//  COMMENTS ROUTES
// ====================================
app.use("/movies/:id/comments", commentRoutes);

// ====================================
//  USERS ROUTES
// ====================================
app.use("/users", userRoutes);

// ======================
// SERVER
// ======================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The MovieFox server started!!!");    
});