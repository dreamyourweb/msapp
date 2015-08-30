Template.control.events({
   "click .control-more-stress": (event) => {
        Meteor.call("moreStress", () => {});
   },
   "click .control-less-stress": (event) => {
        Meteor.call("lessStress", () => {});
   },
   "click .control-reset": (event) => {
        Meteor.call("resetStress", () => {});
   }
});