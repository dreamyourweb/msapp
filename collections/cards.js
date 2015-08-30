Cards = new Mongo.Collection("cards");

let questions = [
    "How much energy do you have now?",
    "How is your concentration now?",
    "How do you feel at this moment?",
    "How did you sleep last night?"
];

let medicine = ["Interferon beta, 30 mcg", "Fingolimod, 0.5 mg"];

let warnings = [
    {title: "Do not forget your medicine",
    message: medicine[Math.floor(Math.random() * medicine.length)] + "; in one hour"},
    {title: "Maybe it's better to take a rest now",
    message: "Your stress level seems a bit high"},
    {title: "Maybe it's better to stay inside today",
    message: "It's currently " + Math.floor(25 + Math.random() * 10) + " degrees outside"}
];

let infos = [
    {title: "Weather forecast tomorrow",
    message: Math.floor(25 + Math.random() * 10) + " degrees and sunny"},
    {title: "Doctor visit tomorrow",
    message: "Appointment at " + Math.floor(8 + Math.random() * 3)}
];

if (Cards.find().count() === 0 && Meteor.isServer) {
        Cards.insert({
            type: "question",
            title: questions[Math.floor(Math.random() * questions.length)],
            message: "",
            status: "new"
        });
        for (let i = 0; i < 2; i++) {
            let warning = warnings[Math.floor(Math.random() * warnings.length)];
            Cards.insert({
                type: "warning",
                title: warning.title,
                message: warning.message,
                status: "new"
            });
        }
        let info = infos[Math.floor(Math.random() * info.length)];
        Cards.insert({
            type: "info",
            title: info.title,
            message: info.message,
            status: "new"
        });
}
