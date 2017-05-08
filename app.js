var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground");
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

//Routes Requires
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//APP CONFIG
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

//SEED THE DB
// seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "this is a wonderful use of text for my yelpcamp app",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//THIS PASSES LOGGED IN USER TO ALL ROUTES
//MUST BE BELOW PASSPORT CONFIG ABOVE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3001, function(){
    console.log("YelpCamp Server Has Started");
});