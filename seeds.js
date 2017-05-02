var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [{
        name: "Cloud's Rest",
    image: "http://i.imgur.com/RW0Xv7G.jpg",
    description: "Blah blah blah blah"
    },
    {name: "Hop Valley Trailhead",
    image: "http://i.imgur.com/q6Tre1m.jpg",
    description: "Beer and hiking"
    },
    {name: "Pinecone Valley",
    image: "http://i.imgur.com/3PL1Nag.jpg",
    description: "Pinecones!!! Pinecones!!!"
    }
];

function seedDB(){
    //Remove all campgorunds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        } else{
        console.log("Removed all campgrounds");
        }
    })
    Comment.remove({}, function(err){
        if(err){
            console.log(err)
        } else{
        console.log("Removed all comments");
        }
    });
    //Add some campgrounds
    data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
        if(err){
            console.log(err);
        }else{
            console.log("Added campground");
            //Create comments
            Comment.create({
                text: "This is a great campground, but no internet connectivity",
                author: "Hikey Hikerson"
            }, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                campground.comments.push(comment);
                campground.save();
                console.log("created new comment");
                }
            });
        }
    });
    });
};

module.exports = seedDB;