Router.configure({
    layoutTemplate: "layout"
});

Router.route('/', function() {
    this.render('home', {
        data: function() {
            return {cards: Cards.find({},{sort: {priority: -1}}), control: Control.findOne()};
        }
    });
});

Router.route('/control', function() {
    this.render('control', {});
});