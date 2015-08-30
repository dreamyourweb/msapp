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
            title: "You are very stressed!",
            message: "Please get some rest.",
            status: "new",
            priority: 10
        });
    },

    "clearCards" () {
        Cards.remove({});
    },

    "resetCards" () {
        Cards.remove({});
        Cards.insert({
            type: "info",
            title: "Hot weather",
            message: "This afternoon will be very hot. Plan you activities in the morning.",
            priority: 5,
            status: "new"
        })
        Cards.insert({
            type: "question",
            title: "How well are you feeling?",
            message: "",
            priority: 4,
            status: "new",
            advice: {
                title: "That's great!",
                message: "You have'nt moved a lot today. Take a stroll."
            }
        });
    },

    "increaseTemp" () {
        let id = Control.findOne()._id;
        Control.update(id, {$inc: {
            temperature: 1
        }});
    },
    "decreaseTemp" () {
        let id = Control.findOne()._id;
        Control.update(id, {$inc: {
            temperature: -1
        }});

    },
    "addTempCard" () {
        Cards.insert({
            type: "info",
            title: "It's " + Control.findOne().temperature + "°C outside.",
            message: "Keep indoors",
            status: "new",
            priority: 5
        });
    },

    "increaseSteps" () {
        let id = Control.findOne()._id;
        Control.update(id, {$inc: {
            steps: 10
        }});
    },
    "decreaseSteps" () {
        let id = Control.findOne()._id;
        Control.update(id, {$inc: {
            steps: -10
        }});

    },
    "addStepsCard" () {
        Cards.insert({
            type: "info",
            title: "Je hebt niet zo veel gelopen.",
            message: "Loop meer",
            status: "new",
            priority: 5
        });
    }

})
