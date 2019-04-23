var express = require("express");
var router  = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment   = require("../models/comment");
var middleware = require("../middleware");
//Comments new
router.get("/new", middleware.isLoggedin, (req,res)=>{
    //find campground by id
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground:campground});
        }
    })
});

//comments create
router.post("/", middleware.isLoggedin, (req,res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment)=>{
                if (err){
                    req.flash("error", "something whorg happens!");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Successfully added the comment");
                    res.redirect("/campgrounds/"+ campground._id); 
                }
            })
        }
    //create new comment
    //connect new comment to campground
    //redirect campground show page
    })
});

router.get("/:comments_id/edit",middleware.checkCommentOwnership, (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            res.redirect("back");
        } else {
            Comment.findById(req.params.comments_id, (err, comment)=>{
                if(err){
                    res.redirect("back");
                } else {
                    console.log(foundCampground.name)
                    res.render("comments/edit", {campground: foundCampground, comment: comment});
                }
            })
        }
    })
});

//Comments update route
router.put("/:comments_id",middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, (err, updatedComment)=>{
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//COMMENTS DESTROY ROUTE
router.delete("/:comments_id",middleware.checkCommentOwnership, (req,res)=>{
    Comment.findByIdAndRemove(req.params.comments_id, (err)=>{
        if(err){
            res.redirect("back");
        } else {
            req.flash("success","Comment deleted!")
            res.redirect("back")
        }
    }) 
});



module.exports = router;