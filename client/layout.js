Template.layout.rendered = function () {
    IonSideMenu.snapper.settings({touchToDrag: false});

    let hammertimeOpen = new Hammer(Template.instance().find(".sideMenuSwipeArea"));
    let hammertimeClose = new Hammer(Template.instance().find(".ionic-body"));

    hammertimeOpen.on("swiperight", (ev) => {
        IonSideMenu.snapper.open("left");
    });

    hammertimeClose.on("swipeleft", (ev) => {
        IonSideMenu.snapper.close("left");
    });
};
