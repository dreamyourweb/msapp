let heartFactor = 0;
let stressFactor = 0;

let handleControl = (doc) => {
    heartFactor = doc.heartFactor;
    stressFactor = doc.stressFactor;
};

Control.find().observe({
    added(doc) {
        handleControl(doc);
    },

    changed(newDoc, oldDoc) {
        handleControl(newDoc);
    }
});

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
    h.series[0].push(h.series[0][98] + (Math.random()-0.5 + heartFactor) * 2 * 2 );
    stats.heart.set(h);

    let s = stats.stress.get();
    s.series[0].splice(0, 1);
    s.series[0].push(s.series[0][98] + (Math.random()-0.5 + stressFactor) * 2 * 2 );
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


Template['slider-action'].created = () => {
    Template.instance().show = new ReactiveVar(false);
};

Template['slider-action'].events({
    "mouseup": (ev) => {
        Template.instance().show.set(true);
    },
    "touchend": (ev) => {
        Template.instance().show.set(true);
    }
});

Template['slider-action'].helpers({
    show() {
        return Template.instance().show.get();
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

    let stressChart = new Chartist.Line('.stressChart', stats.stress.get(), _.extend(chartOptions, {
        low: 0,
        high: 100
    }));
    let heartChart = new Chartist.Line('.heartChart', stats.heart.get(), _.extend(chartOptions, {
        low: 30,
        high: 120
    }));

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
});

Template.card.created = () => {
    Template.instance().panx = new ReactiveVar(0);
}

Template.card.rendered = () => {
    let instance = Template.instance();
    let container = instance.find('.flip-container');
    let card = instance.find('.card.front');
    let back = instance.find('.card.back');
    let hammertime = new Hammer(container);
    let width = $(container).innerWidth() - 20;
    $(container).height($(card).outerHeight() + 16);
    $(card).width(width);
    $(back).width(width).height($(card).innerHeight());
    hammertime.on("panleft panright", (ev) => {
        if (ev.target.className !== 'noswipe' && ev.target.className !== 'link')
            $(container).css({left: ev.deltaX + 'px'});
    });
    hammertime.on("panend", (ev) => {
        if (ev.target.className !== 'noswipe' && ev.target.className !== 'link')
            if (Math.abs(ev.deltaX) > $('body').width() * 0.5) {
                $(container).stop().animate({left: Math.sign(ev.deltaX) * $('body').width() + 'px'}, {duration: 150, complete: () => {
                    $(container).animate({height: "0px", padding: "0px", margin: "0px"}, {duration: 300, complete: () => {
                        Cards.remove(instance.data._id);
                    }});
                }});
            } else
                $(container).stop().animate({left: '0px'}, 200);
    });
};

Template['slider-action'].events({
    //'click input': (ev) => {
    //    let instance = Template.instance().find('div.item');
    //    let card = $(instance).closest('.card');
    //},
    'click a.item': (ev) => {
        let instance = Template.instance().find('div.item');
        let container = $(instance).closest('.flip-container');
        container.addClass('play');
        /*let card = $(instance).closest('.card');
        let fullwidth = $(card).outerWidth();
        let fullheight = $(card).outerHeight();
        $(card).after('<div class="flip-container"></div>');
        let container = $(card).next('.flip-container');
        let html = $(card).remove();
        container.css({height: (fullheight + 20) + 'px'}).append(html.addClass('front').addClass('flipper').css({width: fullwidth + 'px'})).append('<div class="list card back flipper" style="height:' + fullheight + 'px;width:' + fullwidth + 'px;">' +
            '<div class="item item-icon-left">' +
                '<i class="icon ion-information-circled positive"></i>' +
                '<h2>Advies: Eet een koekje</h2>' +
                '<p>Dat helpt altijd.</p>' +
            '</div>' +
        '</div>');
        Meteor.setTimeout(() => {container.addClass('play')}, 200);*/
    }
});

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
    },
    style() {
        return 'transform: translate(' + Template.instance().panx.get() + 'px);';
    }
});

Template.registerHelper("color", function() {
    let colors = {
      "warning": "energized",
      "question": "calm",
      "info": "positive"
    };
    return colors[this.type];
});
