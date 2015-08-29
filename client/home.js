let generateDummyData = (n, init, a) => {
    output = [init];
    labels = [-n + 1];
    for (let i = 1; i < n; i++) {
        output[i] = output[i - 1] + (Math.random() - 0.5) * 2 * a;
        labels[i] = -n + i;
    }
    return {
        series: [output],
        labels: labels
    };
};

let stats = {
    temperature: new ReactiveVar(22),
    heart: new ReactiveVar(generateDummyData(100, 55, 10)),
    stress: new ReactiveVar(generateDummyData(100, 20, 2)),
    respiration: new ReactiveVar(13)
};

// Meteor.setInterval(() => {
//     stats.temperature.
// }, 2500);

Template.stats.helpers({
    temperature() {
        return stats.temperature.get()
    },
    heart() {
        return stats.heart.get()
    },
    stress() {
        return stats.stress.get()
    },
    respiration() {
        return stats.respiration.get()
    }
});

Template.stats.rendered = () => {
    let chartOptions = {
        fullWidth: true,
        axisX: {
            showGrid: false,
            showLabel: false
        },
        axisY: {
            showGrid: false,
            showLabel: false
        },
        showPoint: false,
        height: 50,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    };

    new Chartist.Line('.stressChart', stats.stress.get(), chartOptions);

    new Chartist.Line('.heartChart', stats.heart.get(), chartOptions);

};

Template.card.helpers({
    icon() {
        let icons = {
            "warning": "ion-alert-circled",
            "question": "ion-help-circled",
            "info": "ion-information-circled"
        };
        return icons[this.type];
    }
});