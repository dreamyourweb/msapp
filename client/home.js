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
