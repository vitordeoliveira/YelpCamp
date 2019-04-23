var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX - SHOW ALL CAMPGROUNDS
router.get("/",(req,res)=>{
    //Get all campgrounds from DB
    Campground.find({}, (err,allCampgrounds)=>{
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser: req.user});
        }
    })
})

//CREATE - ADD NEW CAMPGROUND TO DB

router.post("/", middleware.isLoggedin,  (req, res)=>{
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, price:price, image:image, description: description, author:author}
    //Create a new campground and save in DB
    Campground.create(newCampground, (err, newCreated)=>{
        if(err){
            console.log(err);
        } else {
            console.log(newCreated);
            res.redirect("/campgrounds")
        }
    })
})

//NEW - SHOW FORM TO CREATE NEW CAMPGROUNDS

router.get("/new", middleware.isLoggedin, (req,res)=>{
    res.render("campgrounds/new");
});

//SHOW - shows more info about campground
router.get('/:id', function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render('campgrounds/show', {campground:foundCampground});
        }
    });
});

//EDIT ROUTE CAMPGROUND
router.get("/:id/edit",middleware.checkCampgroundOwnership, (req,res)=>{
    Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
    })
})
//UPDATE ROUTE CAMPGROUND
router.put("/:id",middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
})

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;
