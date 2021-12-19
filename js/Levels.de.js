export default [
    {
        levelName: "Selektiere die Straße",
        apiMemberName: "getElementsByTagName",
        apiMemberExplanation:
            "Die <code>Element.getElementsByTagName()</code> Methode gibt ein array-ähnliches Objekt zurück (HTMLCollection), welches die Elemente beinhaltet, die dem angegebenen Tag entsprechen.",
        apiMemberSyntax: "<code>elements = element.getElementsByTagName(tagName)</code>",
        apiMemberExamples: ["<code>let items = document.getElementsByTagName('li').length;</code>"], //single line or multiple as array

        jsEditor: {
            before: `/*Hallo! Du scheinst neu in DOM City zu sein...\nUm zu Beginnen, selektiere die Straße mithilfe der getElementsByTagName Methode!\ngetElementsByTagName gibt dir eine Collection zurück. Um an die einzelne Straße zu kommen, musst du das erste Element selektieren ([0]).*/\n\n`,
            input: "document.",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByTagName('straße')[0];`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,
            highlight: true,
            transition: "bounce",
        },
    },

    {
        levelName: "Selektiere alle Häuser",
        apiMemberName: "getElementsByTagName",
        apiMemberExplanation:
            "Die <code>Element.getElementsByTagName()</code> Methode gibt ein array-ähnliches Objekt zurück (HTMLCollection), welches die Elemente beinhaltet, die dem angegebenen Tag entsprechen.",
        apiMemberSyntax: "<code>elements = element.getElementsByTagName(tagName)</code>",
        apiMemberExamples: "<code>let items = document.getElementsByTagName('li');</code>",

        jsEditor: {
            before: "/*Cool, das hat ja gut funktioniert! getElementsByTagName selektiert <em>alle</em> Elemente mit einem bestimmten Tag...\nSelektiere alle Häuser!*/\n\n",
            input: "document.",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByTagName('haus');`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,
            children: [
                {
                    type: "house",
                    location: [1, 2],
                    highlight: true,
                    transition: "bounce",
                },
                {
                    type: "house",
                    location: [2, 2],
                    highlight: true,
                    transition: "bounce",
                },
            ],
        },
    },

    {
        levelName: "Selektiere die kleine Straße",
        apiMemberName: "getElementsByClassName",
        apiMemberExplanation: "Die <code>Element.getElementsByClassName()</code> Methode gibt eine HTMLCollection der Kindelemente zurück, die alle genannten Klassen beinhalten.",
        apiMemberSyntax: "<code>elements = element.getElementsByClassName(tagName)</code>",
        apiMemberExamples: "<code>let items = document.getElementsByClassName('up');</code>",

        jsEditor: {
            before: "/* Die getElementsByClassName Methode selektiert alle Elemente mit einer bestimmten Klasse.\nSelektiere die <em>kleine</em> Straße (Auch hier: Das erste Element der Collection)!*/\n\n",
            input: "document.",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByClassName('klein')[0];`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    highlight: true,
                    transition: "bounce",
                },
            ],
        },
    },

    {
        levelName: "Selektiere das blaue Haus",
        apiMemberName: "getElementsByClassName",
        apiMemberExplanation: "Die <code>Element.getElementsByClassName()</code> Methode gibt eine HTMLCollection der Kindelemente zurück, die alle genannten Klassen beinhalten.",
        apiMemberSyntax: "<code>elements = element.getElementsByClassName(tagName)</code>",
        apiMemberExamples: "<code>let items = document.getElementsByClassName('up');</code>",

        jsEditor: {
            before: "/* Versuche nun das blaue Haus zu selektieren (Auch hier: Das erste Element der Collection)*/\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByClassName('blau')[0];`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"] } },
                            location: [4, 3],
                            highlight: true,
                            transition: "bounce",
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Selektiere das 'besondere' Haus",
        apiMemberName: "getElementsByName",
        apiMemberExplanation:
            "Die <code>Element.getElementsByName()</code> Methode gibt eine array-ähnliche Collection (NodeList) mit den selektieren Elementen des angegebenen <em>name</em>-Attributes zurück.",
        apiMemberSyntax: "<code>elements = element.getElementsByName(tagName)</code>",
        apiMemberExamples: "<code>let items = document.getElementsByName('up');</code>",

        jsEditor: {
            before: "/* Das klappt super! Ein Haus ist 'besonders'... Versuche es mithilfe der Methode <em>getElementsByName</em> zu selektieren (Auch hier: Das erste Element der Collection)!*/\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByName('besonders')[0];`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"] } },
                            location: [4, 3],
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                            highlight: true,
                            transition: "bounce",
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Selektiere die Gartenstraße",
        apiMemberName: "getElementById",
        apiMemberExplanation: "Die Methode <code>getElementById()</code> gibt ein Element anhand seiner ID zurück.",
        apiMemberSyntax: "<code>element = element.getElementById(id)</code>",
        apiMemberExamples: "<code>let element = document.getElementById('table');</code>",

        jsEditor: {
            before: "/* Mithilfe der <em>getElementById</em> Methode kannst du ein Element anhand seiner ID selektieren. */\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementById('Gartenstraße');`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"] } },
                            location: [4, 3],
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                        },

                        {
                            type: "street",
                            location: [8, 5],
                            direction: "down",
                            steps: 3,
                            attributes: { initial: { class: ["small"], id: "bakerstreet" } },
                            highlight: true,
                            transition: "bounce",
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Selektiere alle Häuser",
        apiMemberName: "querySelectorAll",
        apiMemberExplanation:
            "Die <code>querySelectorAll()</code> Methode gibt eine NodeList zurück, welche eine Liste von Elementen repräsentiert, die durch den angegebenen CSS-Selektor selektiert wurden.",
        apiMemberSyntax: "<code>elementList = parentNode.querySelectorAll(selectors);</code>",
        apiMemberExamples: "<code>let row = parentNode.querySelectorAll('tr');</code>",

        jsEditor: {
            before: "/* In diesem Level wirst du lernen wie man die <em>querySelectorAll</em> Methode benutzt. In dieser Methode kannst du CSS-Selektoren nutzen, um Elemente im DOM zu selektieren.\nSelektiere alle Häuser! */\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.querySelectorAll('haus');`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                    highlight: true,
                    transition: "bounce",
                },
                {
                    type: "house",
                    location: [2, 2],
                    highlight: true,
                    transition: "bounce",
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"] } },
                            location: [4, 3],
                            highlight: true,
                            transition: "bounce",
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                            highlight: true,
                            transition: "bounce",
                        },

                        {
                            type: "street",
                            location: [8, 5],
                            direction: "down",
                            steps: 3,
                            attributes: { initial: { class: ["small"], id: "bakerstreet" } },
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Selektiere das blaue Haus (noch einmal)",
        apiMemberName: "querySelector",
        apiMemberExplanation: "Die <code>querySelector()</code> Methode gibt das erste passende Element zum angegebenen CSS-Selektor zurück.",
        apiMemberSyntax: "<code>element = document.querySelector(selectors);</code>",
        apiMemberExamples: "<code>let table = document.querySelector('table');</code>",

        jsEditor: {
            before: "/* Selektiere das blaue Haus erneut, aber dieses mal mit der <em>querySelector</em> Methode! */\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.querySelector('.blau');`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"] } },
                            location: [4, 3],
                            highlight: true,
                            transition: "bounce",
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                        },

                        {
                            type: "street",
                            location: [8, 5],
                            direction: "down",
                            steps: 3,
                            attributes: { initial: { class: ["small"], id: "bakerstreet" } },
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Füge Text zu einem Haus hinzu",
        apiMemberName: "textContent",
        apiMemberExplanation: "Die <code>textContent</code> Eigenschaft eines Elementes repräsentiert den Text innerhalb des Elements und seiner Kinder.",
        apiMemberSyntax: "<code>element.textContent</code>",
        apiMemberExamples: ["<code>let text = element.textContent;</code>", "<code>element.textContent = 'example text';</code>"],

        jsEditor: {
            before: "/* Nutze die <em>textContent</em> Eigenschaft, um Text zu einem Element hinzuzufügen, zu entfernen oder zu modifizieren. Selektiere zuerst das blaue Haus und füge dann den Text 'blau' hinzu! */\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`let house = document.querySelector('.blau');`, `house.textContent = 'blau';`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"] }, modify: { class: ["blue"], text: "blue" } },
                            location: [4, 3],
                            highlight: true,
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                        },

                        {
                            type: "street",
                            location: [8, 5],
                            direction: "down",
                            steps: 3,
                            attributes: { initial: { class: ["small"], id: "bakerstreet" } },
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Wie groß ist die Gartenstraße?",
        apiMemberName: "getAttribute",
        apiMemberExplanation:
            "Die <code>getAttribute()</code> Methode eines Elementes gibt den Wert des angeforderten Attributes zurück. Falls das angegebene Attribut nicht existiert, wird entweder null oder ein leerer String zurückgegeben.",
        apiMemberSyntax: "<code>attribute = element.getAttribute(attributeName);</code>",
        apiMemberExamples: "<code>let divClass = div1.getAttribute('class');</code>", //single line or multiple as array

        jsEditor: {
            before: "/* Ist die Gartenstraße eine große oder eine kleine Straße? Mit der <em>getAttribute</em> Methode kannst du die Klasse überprüfen. */\n\nlet gartenstraße = document.querySelector('#Gartenstraße');", //single line with quotes or multiple as array
            input: "",
            after: "\n\n/* Die DOM API besitzt zudem noch viele andere Methoden um Informationen über ein Element zu erfahren. */", //single line with quotes or multiple as array
        },

        codeEvaluator: {
            expected: [`gartenstraße.getAttribute('class');`],
            checkType: "query",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"], text: "blue" } },
                            location: [4, 3],
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                        },

                        {
                            type: "street",
                            location: [8, 5],
                            direction: "down",
                            steps: 3,
                            attributes: { initial: { class: ["small"], id: "bakerstreet" } },
                            highlight: true,
                            transition: "bounce",
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Erstelle ein neues Haus",
        apiMemberName: "createElement",
        apiMemberExplanation:
            "Die <code>document.createElement()</code> erstellt ein HTMLElement mit dem angegebenen Tag. Falls der angegebene Tag nicht erkannt wird, wird ein HTMLUnknownElement erstellt.",
        apiMemberSyntax: "<code>element = document.createElement(tagName);</code>",
        apiMemberExamples: "<code>let div = document.createElement('div');</code>",

        jsEditor: {
            before: "/* Das hat super geklappt! Bislang hast du nur Elemente oder Eigenschaften selektiert. Nun erstelle selbst ein Haus!\nIch werde dir dieses mal helfen und es an die Gartenstraße anfügen. */\n\n",
            input: "",
            after: "document.getElementById('Gartenstraße').append(haus);",
        },

        codeEvaluator: {
            expected: [`let haus = document.createElement('haus');`],
            checkType: "modification",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"], text: "blue" } },
                            location: [4, 3],
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                        },

                        {
                            type: "street",
                            location: [8, 5],
                            direction: "down",
                            steps: 3,
                            attributes: { initial: { class: ["small"], id: "bakerstreet" } },
                            children: [
                                {
                                    type: "house",
                                    location: [5, 9],
                                    transition: "dropin",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Füge ein neues Haus hinzu",
        apiMemberName: "append",
        apiMemberExplanation: "Die <code>Element.append()</code> Methode fügt ein oder mehrere Elemente (Node-Objekte oder DOMStrings) nach dem letzten Kindelement ein.",
        apiMemberSyntax: "<code>element.append(...nodesOrDOMStrings);</code>",
        apiMemberExamples: `<code>let div = document.createElement("div")\nlet p = document.createElement("p")\ndiv.append(p)</code>`,

        jsEditor: {
            before: "/* Cool! Dieses mal werde ich das Haus erstellen, und du fügst es zur Gartenstraße hinzu! */\n\nlet haus = document.createElement('haus');",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`let gartenstraße = document.getElementById('Gartenstraße');`, `gartenstraße.append(haus);`],
            checkType: "modification",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"], text: "blue" } },
                            location: [4, 3],
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                        },

                        {
                            type: "street",
                            location: [8, 5],
                            direction: "down",
                            steps: 3,
                            attributes: { initial: { class: ["small"], id: "bakerstreet" } },
                            children: [
                                {
                                    type: "house",
                                    location: [5, 9],
                                },
                                {
                                    type: "house",
                                    location: [6, 9],
                                    transition: "dropin",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Erstelle und füge ein neues Haus hinzu",
        apiMemberName: "createElement und append",
        apiMemberExplanation:
            "Die <code>document.createElement()</code> erstellt ein HTMLElement mit dem angegebenen Tag. Falls der angegebene Tag nicht erkannt wird, wird ein HTMLUnknownElement erstellt.\n\nDie <code>Element.append()</code> Methode fügt ein oder mehrere Elemente (Node-Objekte oder DOMStrings) nach dem letzten Kindelement ein.",
        apiMemberSyntax: "<code>element = document.createElement(tagName);</code>\n\n<code>element.append(...nodesOrDOMStrings);</code>",
        apiMemberExamples: `<code>let div = document.createElement("div")\nlet p = document.createElement("p")\ndiv.append(p)</code>`,
        jsEditor: {
            before: "/* Sehr gut!\nNun erstelle ein neues Haus und füge es an die Gartenstraße an! */\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`let haus = document.createElement('haus');`, `let gartenstraße = document.getElementById('Gartenstraße');`, `gartenstraße.append(haus);`],
            checkType: "modification",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"], text: "blue" } },
                            location: [4, 3],
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                        },

                        {
                            type: "street",
                            location: [8, 5],
                            direction: "down",
                            steps: 3,
                            attributes: { initial: { class: ["small"], id: "bakerstreet" } },
                            children: [
                                {
                                    type: "house",
                                    location: [5, 9],
                                },
                                {
                                    type: "house",
                                    location: [6, 9],
                                },
                                {
                                    type: "house",
                                    location: [7, 9],
                                    transition: "dropin",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Entferne das besondere Haus",
        apiMemberName: "remove",
        apiMemberExplanation: "Die <code>Element.remove()</code> Methode enfernt ein Element aus dem DOM.",
        apiMemberSyntax: "<code>element = Element.remove();</code>",
        apiMemberExamples: "<code>let el = document.getElementById('div-02').remove();</code>", //single line or multiple as array

        jsEditor: {
            before: "/* Okay, es sind nun wirklich viele Häuser in DOM City!\nEntferne das besondere Haus! *Tipp* Du musst eine query-Methode und <em>remove</em> kombinieren! */\n\n",
            input: ``,
            after: "",
        },

        codeEvaluator: {
            expected: [`let haus = document.querySelector("[name='besonders']");`, `haus.remove();`],
            checkType: "modification",
        },

        boardGame: {
            type: "street",
            location: [1, 1],
            direction: "down",
            steps: 5,

            children: [
                {
                    type: "house",
                    location: [1, 2],
                },
                {
                    type: "house",
                    location: [2, 2],
                },
                {
                    type: "street",
                    location: [5, 2],
                    direction: "right",
                    steps: 6,
                    attributes: { initial: { class: ["small"] } },
                    children: [
                        {
                            type: "house",
                            attributes: { initial: { class: ["blue"], text: "blue" } },
                            location: [4, 3],
                        },

                        {
                            type: "house",
                            attributes: { initial: { name: ["special"] } },
                            location: [4, 5],
                            highlight: true,
                            transition: "dropout",
                        },

                        {
                            type: "street",
                            location: [8, 5],
                            direction: "down",
                            steps: 3,
                            attributes: { initial: { class: ["small"], id: "bakerstreet" } },
                            children: [
                                {
                                    type: "house",
                                    location: [5, 9],
                                },
                                {
                                    type: "house",
                                    location: [6, 9],
                                },
                                {
                                    type: "house",
                                    location: [7, 9],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
];
