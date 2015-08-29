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

Template.card.helpers({
    icon() {
        let icons = [
          "warning" => "ion-alert-circled",
          "question" => "ion-help-circled",
          "info" => "ion-information-circled"
        ];
        return icons[this.type];
    }
});
