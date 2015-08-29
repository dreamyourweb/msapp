Router.configure({
    layoutTemplate: "layout"
});

Router.route('/', function() {
    this.render('home', {
        data: function() {
            return {cards: Cards.find()};
        }
    });
});