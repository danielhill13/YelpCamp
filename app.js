var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/93/7b/64/filename-dsc0326-jpg.jpg"},
    {name: "Granite Hill", image: "https://cdn0.vox-cdn.com/thumbor/cJsjf1KCt0lSO7wyOe6Vm6nFxGk=/0x271:5225x3210/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/54137641/camping_tents.0.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg"},
    {name: "Salmon Creek", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/93/7b/64/filename-dsc0326-jpg.jpg"},
    {name: "Granite Hill", image: "https://cdn0.vox-cdn.com/thumbor/cJsjf1KCt0lSO7wyOe6Vm6nFxGk=/0x271:5225x3210/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/54137641/camping_tents.0.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg"},
    {name: "Salmon Creek", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/93/7b/64/filename-dsc0326-jpg.jpg"},
    {name: "Granite Hill", image: "https://cdn0.vox-cdn.com/thumbor/cJsjf1KCt0lSO7wyOe6Vm6nFxGk=/0x271:5225x3210/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/54137641/camping_tents.0.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg"},
    {name: "Salmon Creek", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/93/7b/64/filename-dsc0326-jpg.jpg"},
    {name: "Granite Hill", image: "https://cdn0.vox-cdn.com/thumbor/cJsjf1KCt0lSO7wyOe6Vm6nFxGk=/0x271:5225x3210/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/54137641/camping_tents.0.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});
app.listen(3000, function(){
    console.log("YelpCamp Server Has Started");
});


/*
Setup new campground POST route
Add in body parser
setup route to show form
add basic form
*/