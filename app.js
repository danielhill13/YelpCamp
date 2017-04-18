var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412_960_720.jpg"},
        {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2015/09/14/13/57/campground-939588_960_720.jpg"},
        {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg"}

    ]
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function(){
    console.log("YelpCamp Server Has Started");
});