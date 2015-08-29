let stats = {
    temperature: new ReactiveVar(22),
    heart: new ReactiveVar(55),
    stress: new ReactiveVar(60),
    respiration: new ReactiveVar(13)
};

// Meteor.setInterval(() => {
//     stats.temperature.
// }, 2500);

Template.stats.helpers({
    temperature() { return stats.temperature.get() },
    heart() { return stats.heart.get() },
    stress() { return stats.stress.get() },
    respiration() { return stats.respiration.get() }
});

Template['slider-action'].created = () => {
    Template.instance().show = new ReactiveVar(false);
}

Template['slider-action'].events({
    "mouseup": (ev) => {
        Template.instance().show.set(true);
    }
});

Template['slider-action'].helpers({
    show() {
        return Template.instance().show.get();
    }
})

Template.card.rendered = () => {
    let hammertime = new Hammer(this.find('.card'), {});
    hammertime.on('swiperight', function(ev) {
        console.log(ev);
    });
}

Template.card.helpers({
    icon() {
        let icons = {
          "warning": "ion-alert-circled",
          "question": "ion-help-circled",
          "info": "ion-information-circled"
        };
        return icons[this.type];
    },
    action() {
      let actions = {
        "warning": "no-action",
        "question": "slider-action",
        "info": "no-action"
      };
      return actions[this.type];
    }
})

Template.registerHelper("color", function() {
    let colors = {
      "warning": "energized",
      "question": "calm",
      "info": "positive"
    };
    return colors[this.type];
})
