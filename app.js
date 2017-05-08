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

//APP CONFIG
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

//SEED THE DB
seedDB();

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
//THIS PASSES LOGGED IN USER TO ALL ROUTES - MUST BE BELOW PASSPORT CONFIG ABOVE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//LANDING PAGE
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX campgrounds
app.get("/campgrounds", function(req, res){
    //GET ALL  CAMPGROUNDS
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
             res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});
//NEW campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new.ejs");
});


//CREATE campground
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description}
    //CREATE NEW CAMPGROUND AND SAVE TO DB
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

//SHOW campgrounds
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//EDIT campground
//UPDATE campground- kinda confusing - take time to learn this and sanitizer dependency for POST->PUT
//DESTROY campground


//=================
// COMMENT ROUTES
//=================

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else {
    res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
    }})}})})

//=============
// AUTH ROUTES
//=============

//show register form
app.get("/register", function(req, res){
    res.render("register");
})
//handle signup logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
           return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        })
    })
})
//show login form
app.get("/login", function (req, res){
    res.render("login");
})
//login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res){
})
//logout route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
})




function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(3001, function(){
    console.log("YelpCamp Server Has Started");
});