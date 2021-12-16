export default [
    {
        levelName: "Get the street",
        apiMemberName: "getElementsByTagName",
        apiMemberExplanation: "The <code>Element.getElementsByTagName()</code> method returns an array-like object (HTMLCollection) of elements with the given tag name.",
        apiMemberSyntax: "<code>elements = element.getElementsByTagName(tagName)</code>",
        apiMemberExamples: ["<code>let items = document.getElementsByTagName('li').length;</code>"], //single line or multiple as array

        jsEditor: {
            before: `/*Hey! I see you are new to DOM City...\nTo begin, just try to select the street by using the getElementsByTagName method!\ngetElementsByTagName returns an collection. To get the street, you need to access the first element ([0])*/\n\n`,
            input: "document.",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByTagName('street')[0];`],
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
        levelName: "Get all houses",
        apiMemberName: "getElementsByTagName",
        apiMemberExplanation: "The <code>Element.getElementsByTagName()</code> method returns an array-like object (HTMLCollection) of elements with the given tag name.",
        apiMemberSyntax: "<code>elements = element.getElementsByTagName(tagName)</code>",
        apiMemberExamples: "<code>let items = document.getElementsByTagName('li');</code>",

        jsEditor: {
            before: "/*Cool, that already worked great! The getElementsByTagName selects <em>all</em> elements with that tag...\nSo please select all houses!*/\n\n",
            input: "document.",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByTagName('house');`],
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
        levelName: "Get the small street",
        apiMemberName: "getElementsByClassName",
        apiMemberExplanation: "The <code>Element.getElementsByClassName()</code> method returns a HTMLCollection of all child elements which have all of the given class name(s).",
        apiMemberSyntax: "<code>elements = element.getElementsByClassName(tagName)</code>",
        apiMemberExamples: "<code>let items = document.getElementsByClassName('up');</code>",

        jsEditor: {
            before: "/* The getElementsByClassName method will select all elements with a given class name.\nPlease select the <em>small</em> street (the first item of the returned collection)!*/\n\n",
            input: "document.",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByClassName('small')[0];`],
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
        levelName: "Get the blue house",
        apiMemberName: "getElementsByClassName",
        apiMemberExplanation: "The <code>Element.getElementsByClassName()</code> method returns a HTMLCollection of all child elements which have all of the given class name(s).",
        apiMemberSyntax: "<code>elements = element.getElementsByClassName(tagName)</code>",
        apiMemberExamples: "<code>let items = document.getElementsByClassName('up');</code>",

        jsEditor: {
            before: "/* Now try to get the blue house (the first item of the returned collection)*/\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByClassName('blue')[0];`],
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
        levelName: "Get the 'special' house",
        apiMemberName: "getElementsByName",
        apiMemberExplanation: "The <code>Element.getElementsByName()</code> method returns an array-like collection (NodeList) of elements with a given name attribute.",
        apiMemberSyntax: "<code>elements = element.getElementsByName(tagName)</code>",
        apiMemberExamples: "<code>let items = document.getElementsByName('up');</code>",

        jsEditor: {
            before: "/* This worked great so far! One house has a special name... Try to select it using <em>getElementsByName</em> (the first item of the returned collection)!*/\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.getElementsByName('special')[0];`],
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
        levelName: "Get the baker street",
        apiMemberName: "getElementById",
        apiMemberExplanation: "The method <code>getElementById()</code> returns an object (Element) representing the element whose id matches the stated string.",
        apiMemberSyntax: "<code>element = element.getElementById(id)</code>",
        apiMemberExamples: "<code>let element = document.getElementById('table');</code>",

        jsEditor: {
            before: "/* Using the <em>getElementById</em> method you can select a single element with a unique identifier */\n\n",
            input: "",
            after: "",
            expected: [`document.getElementById('BakerStreet');`],
            checkType: "query",
        },

        codeEvaluator: {
            expected: [`document.getElementById('BakerStreet');`],
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
                            attributes: { initial: { class: ["small"], id: "BakerStreet" } },
                            highlight: true,
                            transition: "bounce",
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Get all houses",
        apiMemberName: "querySelectorAll",
        apiMemberExplanation:
            "The <code>querySelectorAll()</code> method returns a NodeList representing a list of the elements that match the stated group of selectors. If no match is found, <code>null</code> is returned.",
        apiMemberSyntax: "<code>elementList = parentNode.querySelectorAll(selectors);</code>",
        apiMemberExamples: "<code>let row = parentNode.querySelectorAll('tr');</code>",

        jsEditor: {
            before: "/* In this level, you will learn how to use the <em>querySelectorAll</em> method. It allows you to use CSS selectors to select HTML elements.\nSelect all houses! */\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.querySelectorAll('house');`],
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
                            attributes: { initial: { class: ["small"], id: "BakerStreet" } },
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Get the blue house (one more time)",
        apiMemberName: "querySelector",
        apiMemberExplanation: "The method <code>querySelector()</code> returns the first Element that matches the specified selector. If no match is found, <code>null</code> is returned.",
        apiMemberSyntax: "<code>element = document.querySelector(selectors);</code>",
        apiMemberExamples: "<code>let table = document.querySelector('table');</code>",

        jsEditor: {
            before: "/* Get the blue house one more time, but this time you use the <em>querySelector</em> method! */\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`document.querySelector('.blue');`],
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
                            attributes: { initial: { class: ["small"], id: "BakerStreet" } },
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Add text to a house",
        apiMemberName: "textContent",
        apiMemberExplanation: "The <code>textContent</code> property of the Node represents the text content of the node and its children.",
        apiMemberSyntax: "<code>element.textContent</code>",
        apiMemberExamples: ["<code>let text = element.textContent;</code>", "<code>element.textContent = 'example text';</code>"],

        jsEditor: {
            before: "/* Using the <em>textContent</em> property, you can add, remove or get the text of a node. First, select the blue house, and then add the text 'blue' to it! */\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`let house = document.querySelector('.blue');`, `house.textContent = 'blue';`],
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
                            attributes: { initial: { class: ["small"], id: "BakerStreet" } },
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "How big is the BakerStreet?",
        apiMemberName: "getAttribute",
        apiMemberExplanation:
            "The <code>getAttribute()</code> method of the Element interface returns the value of a specified attribute. If the given attribute does not exist, the value returned will either be null an empty string.",
        apiMemberSyntax: "<code>attribute = element.getAttribute(attributeName);</code>",
        apiMemberExamples: "<code>let divClass = div1.getAttribute('class');</code>", //single line or multiple as array

        jsEditor: {
            before: "/* Well, is the BakerStreet a big or a small street? If you want to check it, just use the <em>getAttribute</em> method... */\n\nlet bakerStreet = document.querySelector('#BakerStreet');", //single line with quotes or multiple as array
            input: "",
            after: "\n\n/* The DOM api offers a lot of others methods to get information about an element. */", //single line with quotes or multiple as array
        },

        codeEvaluator: {
            expected: [`bakerStreet.getAttribute('class');`],
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
                            attributes: { initial: { class: ["small"], id: "BakerStreet" } },
                            highlight: true,
                            transition: "bounce",
                        },
                    ],
                },
            ],
        },
    },

    {
        levelName: "Create a new house",
        apiMemberName: "createElement",
        apiMemberExplanation:
            "In an HTML document, the <code>document.createElement()</code> method creates a HTML element specified by the tag name, or an HTMLUnknownElement if the tag is not recognized.",
        apiMemberSyntax: "<code>element = document.createElement(tagName);</code>",
        apiMemberExamples: "<code>let div = document.createElement('div');</code>",

        jsEditor: {
            before: "/* So far you did a really good job! For now you only selected some elements. Let's create a new house!\nI will help you this time and append it to the BakerStreet. */\n\n",
            input: "",
            after: "document.getElementById('BakerStreet').append(house);",
        },

        codeEvaluator: {
            expected: [`let house = document.createElement('house');`],
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
                            attributes: { initial: { class: ["small"], id: "BakerStreet" } },
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
        levelName: "Append a house",
        apiMemberName: "append",
        apiMemberExplanation: "The <code>Element.append()</code> method inserts a set (one or multiple) of Node objects or DOMString objects after the last child of the Element.",
        apiMemberSyntax: "<code>element.append(...nodesOrDOMStrings);</code>",
        apiMemberExamples: `<code>let div = document.createElement("div")\nlet p = document.createElement("p")\ndiv.append(p)</code>`,

        jsEditor: {
            before: "/* Okay cool! This time i will create the house and you can append it to the BakerStreet! */\n\nlet house = document.createElement('house');",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`let bakerstreet = document.getElementById('BakerStreet');`, `bakerstreet.append(house);`],
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
                            attributes: { initial: { class: ["small"], id: "BakerStreet" } },
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
        levelName: "Create and append a house",
        apiMemberName: "createElement and append",
        apiMemberExplanation: "The <code>Element.append()</code> method inserts a set (one or multiple) of Node objects or DOMString objects after the last child of the Element.",
        apiMemberSyntax: "<code>element = document.createElement(tagName);</code>\n\n<code>element.append(...nodesOrDOMStrings);</code>",
        apiMemberExamples: `<code>let div = document.createElement("div")\nlet p = document.createElement("p")\ndiv.append(p)</code>`,
        jsEditor: {
            before: "/* Good job!\nI think you can create and append a house at the BakerStreet on you own... don't you? */\n\n",
            input: "",
            after: "",
        },

        codeEvaluator: {
            expected: [`let house = document.createElement('house');`, `let bakerStreet = document.getElementById('BakerStreet');`, `bakerStreet.append(house);`],
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
                            attributes: { initial: { class: ["small"], id: "BakerStreet" } },
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
        levelName: "Remove the special house",
        apiMemberName: "remove",
        apiMemberExplanation: "The <code>Element.remove()</code> method removes the element from the DOM.",
        apiMemberSyntax: "<code>element = Element.remove();</code>",
        apiMemberExamples: "<code>let el = document.getElementById('div-02').remove();</code>", //single line or multiple as array

        jsEditor: {
            before: "/* Okay okay... There are a lot of houses built now in DOM City!\nIf you like to, you can remove the special house now! *Hint* You need to combine a query method and <em>remove</em>! */\n\n",
            input: ``,
            after: "",
        },

        codeEvaluator: {
            expected: [`let house = document.querySelector("[name='special']");`, `house.remove();`],
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
                            attributes: { initial: { class: ["small"], id: "BakerStreet" } },
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
