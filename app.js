var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground");
    Comment = require("./models/comment"),
    // User = require("./models/user");
    seedDB = require("./seeds");

//APP CONFIG
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SEED THE DB
seedDB();

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

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else {
    res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
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


app.listen(3000, function(){
    console.log("YelpCamp Server Has Started");
});