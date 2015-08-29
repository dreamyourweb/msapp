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
    heart: new ReactiveVar(generateDummyData(100, 55, 2)),
    stress: new ReactiveVar(generateDummyData(100, 20, 2)),
    respiration: new ReactiveVar(13)
};

Meteor.setInterval(() => {
    let h = stats.heart.get();
    h.series[0].splice(0, 1);
    h.series[0].push(h.series[0][98] + (Math.random()-0.5) * 2 * 2);
    stats.heart.set(h);

    let s = stats.stress.get();
    s.series[0].splice(0, 1);
    s.series[0].push(s.series[0][98] + (Math.random()-0.5) * 2 * 2);
    stats.stress.set(s);
}, 1000);

Template.stats.helpers({
    temperature() {
        return stats.temperature.get()
    },
    heart() {
        return Math.round(stats.heart.get().series[0][stats.heart.get().series[0].length - 1]);
    },
    stress() {
        return Math.round(stats.stress.get().series[0][stats.stress.get().series[0].length - 1]);
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
            bottom: -25,
            left: -25
        }
    };

    let stressChart = new Chartist.Line('.stressChart', stats.stress.get(), chartOptions);
    let heartChart = new Chartist.Line('.heartChart', stats.heart.get(), chartOptions);

    Template.instance().autorun(() => {
        stressChart.update(stats.stress.get());
        heartChart.update(stats.heart.get());
    });

};
Template.registerHelper("color", function() {
    let colors = {
        "warning": "energized",
        "question": "calm",
        "info": "positive"
    };
    return colors[this.type];
})

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
});
