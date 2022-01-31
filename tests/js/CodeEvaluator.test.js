import LevelTranslator from "../../js/LevelTranslator.js";
import CodeEvaluator from "../../js/CodeEvaluator.js";

describe("CodeEvaluator", function () {
    const levelTranslator = new LevelTranslator("de");
    const codeEvaluator = new CodeEvaluator("de");

    describe("Query", function () {
        const levelQuery = {
            jsEditor: {
                before: "", input: "", after: "",
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
                        type: "house", location: [1, 2],
                    },
                    {
                        type: "house", location: [2, 2],
                    },
                ],
            },
        };

        before(function () {
            levelTranslator.prepareGameBoard(levelQuery.boardGame);
        });

        describe("generateDummyDOM()", function () {
            it("should generate a valid html string", function () {
                let dummyDOM = codeEvaluator.generateDummyDOM(levelQuery.boardGame);

                expect(dummyDOM).to.equal("<straße><haus></haus><haus></haus></straße>");
            });
        });
        describe("evalDOMQuery()", function () {
            it("should validate the task correctly", function () {
                expect(codeEvaluator.evalDOMQuery("document.querySelectorAll('haus');", levelQuery)).to.equal(true);
                expect(codeEvaluator.evalDOMQuery("document.getElementsByTagName('haus');", levelQuery)).to.equal(true);

                expect(codeEvaluator.evalDOMQuery("document.querySelectorAll('haus');", levelQuery)).to.equal(true);
            });

            it("should validate the task incorrectly", function () {
                expect(codeEvaluator.evalDOMQuery("document.querySelector('street');", levelQuery)).to.equal(false);
                expect(codeEvaluator.evalDOMQuery("document.querySelectorAll('street');", levelQuery)).to.equal(false);
            });
        });
    });

    describe("Modification", function () {
        const levelModification = {
            jsEditor: { before: "", input: "", after: "" },
            codeEvaluator: {
                expected: [`let haus = document.querySelector("[name='besonders']");`,
                    `haus.remove();`],
                checkType: "modification",
            },
            boardGame: {
                type: "street", location: [1, 1], direction: "down", steps: 5,
                children: [
                    { 
                        type: "house", location: [1, 2],
                        attributes: { initial: { name: "special" } }
                    },
                    { type: "house", location: [2, 2] },
                ],
            },
        };
    
        before(function () {
            levelTranslator.prepareGameBoard(levelModification.boardGame);
        });
    
        describe("generateDummyDOM()", function () {
            it("should generate a valid html string", function () {
                expect(codeEvaluator.generateDummyDOM(levelModification.boardGame)).to
                    .equal('<straße><haus name="besonders"></haus><haus></haus></straße>');
            });
        });
        
        describe("evalDOMModifications()", function () {
            it("should validate the task correctly", function () {
                expect(codeEvaluator.evalDOMModifications(
                    `let haus = document.querySelector("[name='besonders']"); haus.remove();`,
                    levelModification)).to.equal(true);
            });
            
            it("should validate the task incorrectly", function () {
                expect(codeEvaluator.evalDOMModifications(
                    `let haus = document.querySelector("[name='besonders']");`,
                    levelModification)).to.equal(false);
                    
                expect(codeEvaluator.evalDOMModifications(
                    `let haus = document.querySelector("street"); haus.remove();`,
                    levelModification)).to.equal(false);
            });
        });
    });
});
