//all middleware goes here
var Campground = require("../models/campground");
var Comment   = require("../models/comment");

var middlewareObj ={}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back")
            } else {
                //User owns the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission denied");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
     //is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id, function(err, foundComment){
            if(err){
                res.redirect("back")
            } else {
                //User owns the campground?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged to do that!");
        res.redirect("back");
    }
}

//middleware
middlewareObj.isLoggedin = function (req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login");
}

module.exports = middlewareObj