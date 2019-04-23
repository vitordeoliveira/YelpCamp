//Requiring modules
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    methodOverride  = require("method-override");
//Requiring Routes
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index")

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_12", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "whatever",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
app.use((req ,res, next)=>{
    res.locals.currentUser= req.user;
    res.locals.error      = req.flash("error");
    res.locals.success    = req.flash("success");
    next();
})
    

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments/",commentRoutes);



app.listen(3001, 'localhost', (req,res) =>{
    console.log("The YelpCamp has started!");
});