Cards = new Mongo.Collection("cards");

let types = ["warning", "question", "info"];


Meteor.startup(() => {
    if (Cards.find().count() === 0) {

        for(let i = 0; i < 10; i++){
            Cards.insert({
                type: types[Math.floor(Math.random()*3)],
                message: "Bla bla bla " + i,
                status: "new"
            });
        }

    }
});