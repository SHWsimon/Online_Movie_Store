var mongoose   = require("mongoose");
var Movie = require("./models/movie");
var Comment    = require("./models/comment");

//Default Data in DB
var data = [
    {
        name: "First Man", 
        price: 20,
        image: "https://m.media-amazon.com/images/M/MV5BMDBhOTMxN2UtYjllYS00NWNiLWE1MzAtZjg3NmExODliMDQ0XkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SY1000_CR0,0,631,1000_AL_.jpg",
        description: "A look at the life of the astronaut, Neil Armstrong, and the legendary space mission that led him to become the first man to walk on the Moon on July 20, 1969."
    },
    {
        name: "Venom", 
        price: 25,
        image: "https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4MV5BMl5BanBnXkFtZTgwMTQ5MzM0NjM@._V1_.jpg",
        description: "Tom Hardy and his Venom co-stars embrace their inner monsters and reveal which MCU character the Marvel antihero should face off against."
    },
    {
        name: "Small Foot", 
        price: 15,
        image: "https://m.media-amazon.com/images/M/MV5BMTc5NzI1NjY4MV5BMl5BanBnXkFtZTgwNDIxNTIyNDM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        description: "A Yeti is convinced that the elusive creatures known as humans really do exist."
    },
    {
        name: "Crazy Rich Asians", 
        price: 20,
        image: "https://m.media-amazon.com/images/M/MV5BMTYxNDMyOTAxN15BMl5BanBnXkFtZTgwMDg1ODYzNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        description: "This contemporary romantic comedy, based on a global bestseller, follows native New Yorker Rachel Chu to Singapore to meet her boyfriend's family."
    },
    {
        name: "Incredibles 2", 
        price: 30,
        image: "https://m.media-amazon.com/images/M/MV5BMTEzNzY0OTg0NTdeQTJeQWpwZ15BbWU4MDU3OTg3MjUz._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        description: "Incredibles 2 is now available digitally, so let's look back at how stars Craig T. Nelson, Holly Hunter, and more got back in the superhero game. Plus, more Edna Mode!"
    }
]

//Create Seeds Datas
function seedDB(){
    //Remove all campground first
    Movie.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed movie");
        // Add a few campgrounds
        data.forEach(function(seed){
            Movie.create(seed, function(err, movie){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("added a movie");
                    
                    //Create Comment
                    // Comment.create(
                    //     {
                    //         text: "This is a great movie!!!",
                    //         author: "Homer"
                    //     }, function(err, comment){
                    //         if(err){
                    //             console.log(err);
                    //         }
                    //         else{
                    //             Movie.comments.push(comment);
                    //             Movie.save();
                    //             console.log("Created new comment");
                    //         }
                    //     });
                }
            });
        });
    });
};

//Output the seedDB function
module.exports = seedDB;