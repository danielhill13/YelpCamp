
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX campgrounds
router.get("/", function(req, res){
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
router.get("/new", function(req, res){
    res.render("campgrounds/new.ejs");
});


//CREATE campground
router.post("/", function(req, res){
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
router.get("/:id", function(req, res){
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


//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;