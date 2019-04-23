var mongoose = require("mongoose"),
Campground   = require("./models/campground"),
Comment      = require("./models/comment");

var data = [
        {
            name: "Cloud Reste", 
            image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144496f6c27ca3efb5_340.jpg",
            description:"Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker"
        },
        {
            name: "CamprFire Rest", 
            image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144496f6c27ca3efb5_340.jpg",
            description:"Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker"
        },
        {
            name: "CampTiger", 
            image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144496f6c27ca3efb5_340.jpg",
            description:"Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker"
        }
        
    ];
    
function seedDB(){
    Campground.deleteMany({},(err)=>{
        if(err){
            console.log(err);
        } 
        console.log("Campground remove");
    });
    data.forEach((seed)=>{
        Campground.create(seed,(err,campground)=>{
            if(err){
                console.log(err);
            } else {
                console.log("Added a campground")
                { 
                    Comment.create(
                    {
                        author: "Homer",
                        text: "I love here, but I want internet!"
                    }, (err, comment)=>{
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                        }
                    });
                }
               
            }
        })
    })
    
}

module.exports = seedDB;