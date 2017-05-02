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
             res.render("index", {campgrounds: allCampgrounds});
        }
    })
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
//NEW
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});
app.listen(3000, function(){
    console.log("YelpCamp Server Has Started");
});


// //SHOW
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
})

// //EDIT Route
// app.get("/campgrounds/:id/edit", function(req, res){
//     //get ID and put in url
//     Campground.findById(req.params.id, function(err, foundBlog){
//         if(err){
//             res.redirect("/campgrounds");
//         } else {
//             res.render("edit", {campground: foundCampground});
//         }
//     })
// });

// //UPDATE Route - kinda confusing - take time to learn this and sanitizer dependency for POST->PUT
// app.put("/blogs/:id", function(req, res){
//     Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
//         if(err){
//             res.redirect("/blogs");
//         } else {
//             res.redirect("/blogs/" + req.params.id);
//         }
//     });
// });

// //DESTROY Route
// app.delete("/blogs/:id", function(req, res){
//     Blog.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/blogs");
//         } else{
//             res.redirect("/blogs");
//         }
//     })
// });