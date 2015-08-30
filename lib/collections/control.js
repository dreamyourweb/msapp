Control = new Mongo.Collection("control");

Control.remove({});
if (Meteor.isServer) {
    Control.insert({
        stressFactor: 0,
        heartFactor: 0,
        temperature: 22
    });
};