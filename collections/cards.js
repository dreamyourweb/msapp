Cards = new Mongo.Collection("cards");

let types = ["warning", "question", "info"];


if (Cards.find().count() === 0 && Meteor.isServer) {

    for(let i = 0; i < 10; i++){
        Cards.insert({
            type: types[Math.floor(Math.random()*3)],
            title: "Kaart " + i + ":",
            message: "Bla bla bla " + i,
            status: "new"
        });
    }

}
