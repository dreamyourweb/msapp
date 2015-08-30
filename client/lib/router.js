Router.configure({
    layoutTemplate: "layout"
});

Router.route('/', function() {
    this.render('home', {
        data: function() {
            return {cards: Cards.find({},{sort: {priority: -1}})};
        }
    });
});

Router.route('/control', function() {
    this.render('control', {});
});