
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
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});


//CREATE campground
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: description, author: author}    
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
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE campground- kinda confusing - take time to learn this and sanitizer dependency for POST->PUT
router.put("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY campground
router.delete("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else{
                res.redirect("/campgrounds");
            }
        }
    });
    } else {
        res.redirect("/campgrounds");
    }

}

module.exports = router;