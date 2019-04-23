var express = require("express");
var router  = express.Router();
var passport= require("passport");
var User    = require("../models/user");

//Root Route
router.get("/", function(req, res){
    res.render("landing");
});

//show register form 
router.get("/register",(req,res)=>{
   res.render("register"); 
});

//Handle sign up logic
router.post("/register", (req,res)=>{
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message);
            req.refresh();
            return res.render("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Welcome to YelpCamp "+ user.username);
            res.redirect("/campgrounds");
        });
    });
});


//show login form
router.get("/login",(req,res)=>{
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});


//logout route
router.get("/logout", function(req, res){
    req.flash("success", "You Logout!");
   req.logout();
   res.redirect("/campgrounds");
});



module.exports = router;