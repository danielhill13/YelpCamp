var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [{
        name: "Cloud's Rest",
    image: "http://i.imgur.com/RW0Xv7G.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis felis semper, semper turpis vitae, ornare nulla. Sed faucibus nisl magna, vitae venenatis dolor consectetur ut. Proin vehicula accumsan lobortis. Nulla non arcu vel lorem sodales dignissim id ut nulla. Phasellus ornare et ex in posuere. Morbi ligula turpis, facilisis nec mauris a, accumsan lacinia orci."
    },
    {name: "Pinecone Valley",
    image: "http://i.imgur.com/3PL1Nag.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis felis semper, semper turpis vitae, ornare nulla. Sed faucibus nisl magna, vitae venenatis dolor consectetur ut. Proin vehicula accumsan lobortis. Nulla non arcu vel lorem sodales dignissim id ut nulla. Phasellus ornare et ex in posuere. Morbi ligula turpis, facilisis nec mauris a, accumsan lacinia orci."
    },
    {name: "Happy Tree Trails",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Camping_ground_in_Kippel.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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