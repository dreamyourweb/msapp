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
    }
})
