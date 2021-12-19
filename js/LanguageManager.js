export default {
    languages: {
        de: {
            createdBy: "DOM City wurde entwickelt von {0} • {1} • <a href='/about.html'>Über</a>",
            jsEditorTitle: "JavaScript-Editor",
            htmlEditorTitle: "HTML-Editor",
            level: "Level {0} von {1}",
            selectLevel: "Level auswählen",
            syntaxTitle: "Syntax",
            examplesTitle: "Beispiele",
            resetButton: "Zurücksetzen",
            nextButton: "Weiter",
            gameFinishedHeader: "Klasse!",
            gameFinishedText:
                "<p>Du hast erfolgreich alle Level in DOM City gelöst! Du bist nun ein wahrer Meister der DOM-API!</p><p>Wenn du mehr über CSS lernen möchtest, kannst du gerne bei CSS Diner, Flexbox Froggy und Grid Garden vorbeischauen!</p>",
            mobileWarning:
                "Achtung! Falls du DOM City auf einem Smartphone oder Tablet spielst, kann es sein, dass die Spielerfahrung durch das kleine Display eingeschrank ist. Es wird empfohlen, DOM City auf einem Laptop oder Desktop Computer zu spielen.",
            tags: {
                street: "straße",
                house: "haus",
                small: "klein",
                blue: "blau",
                special: "besonders",
                bakerstreet: "Gartenstraße",
            },
        },
        en: {
            createdBy: "DOM City is created by {0} • {1} • <a href='/about.html'>About</a>",
            jsEditorTitle: "JavaScript-Editor",
            htmlEditorTitle: "HTML-Editor",
            level: "Level {0} of {1}",
            selectLevel: "Select a level",
            syntaxTitle: "Syntax",
            examplesTitle: "Examples",
            resetButton: "Reset",
            nextButton: "Next",
            gameFinishedHeader: "You rock!",
            gameFinishedText:
                "<p>You successfully solved all xx levels of DOM City. Now you are a real master of the DOM-API!</p><p>Feel free to share this game. If you want to learn more about CSS, check out CSS Diner, Flexbox Froggy and Grid Garden!</p>",
            mobileWarning:
                "Warning! If you are playing DOM City on a smartphone or tablet, the game experience may be limited due to the small display. It is recommended to play DOM City on a laptop or desktop computer.",

            tags: {
                street: "street",
                house: "house",
                small: "small",
                blue: "blue",
                special: "special",
                bakerstreet: "BakerStreet",
            },
        },
    },

    getTranslation(lang) {
        return this.languages[lang] || this.languages["de"];
    },
};
