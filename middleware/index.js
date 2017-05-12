//All MIDDLEWARE goes here
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Issue finding Campground in database")
            res.redirect("/campgrounds");
        } else{
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else{
                req.flash("error", "You can only edit your own campgrounds")
                res.redirect("/campgrounds");
            }
        }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/campgrounds");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Issue finding comment in database");
            res.redirect("back");
        } else{
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else{
                req.flash("error", "You can only edit your own comments");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;