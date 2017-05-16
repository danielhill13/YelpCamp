var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    Campground     = require("./models/campground");
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds")
    methodOverride = require("method-override"),
    MongoClient    = require("mongodb"),
    tls            = require("tls");

//Routes Requires
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//APP CONFIG
// mongoose.connect("mongodb://localhost:27017/yelp_camp");
mongoose.connect("mongodb://danielhill13:yelpcamp@yelpcamp-shard-00-00-bfssn.mongodb.net:27017,yelpcamp-shard-00-01-bfssn.mongodb.net:27017,yelpcamp-shard-00-02-bfssn.mongodb.net:27017/yelpcamp?ssl=true&replicaSet=yelpcamp-shard-0&authSource=admin");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, function(){
    console.log("YelpCamp Server Has Started");
});