Meteor.methods({
    "moreStress" () {
        let id = Control.findOne()._id;
        Control.update(id, {$inc: {
            stressFactor: 1,
            heartFactor: 1,
        }});
    },

    "lessStress" () {
        let id = Control.findOne()._id;
        Control.update(id, {$inc: {
            stressFactor: -1,
            heartFactor: -1,
        }});
    },

    "resetStress" () {
        let id = Control.findOne()._id;
        Control.update(id, {$set: {
            stressFactor: 0,
            heartFactor: 0
        }});
    },

    "addStressCard" () {
        Cards.insert({
            type: "warning",
            title: "You are stressed!!",
            message: "Get your ass in bed!",
            status: "new",
            priority: 10
        });
    },

    "clearCards" () {
        Cards.remove({});
    },

    "resetCards" () {
        Cards.remove({});
        populateCards();
    }
})
