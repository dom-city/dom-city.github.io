import LevelTranslator from "../../js/LevelTranslator.js";
import CodeEvaluator from "../../js/CodeEvaluator.js";

describe("CodeEvaluator", function () {
    const levelTranslator = new LevelTranslator();
    const codeEvaluator = new CodeEvaluator();

    describe("Query", function () {
        const levelQuery = {
            jsEditor: {
                before: "",
                input: "",
                after: "",
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
                    },
                    {
                        type: "house",
                        location: [2, 2],
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

                expect(dummyDOM).to.equal("<street><house></house><house></house></street>");
            });
        });
        describe("evalDOMQuery()", function () {
            it("should validate the task correctly", function () {
                expect(codeEvaluator.evalDOMQuery("document.querySelectorAll('house');", levelQuery)).to.equal(true);
                expect(codeEvaluator.evalDOMQuery("document.getElementsByTagName('house');", levelQuery)).to.equal(true);
            });
        });
    });

    describe("Modification", function () {
        const levelModification = {
            jsEditor: {
                before: "",
                input: "",
                after: "",
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
                        attributes: { initial: { name: ["special"] } },
                    },
                    {
                        type: "house",
                        location: [2, 2],
                    },
                ],
            },
        };

        before(function () {
            levelTranslator.prepareGameBoard(levelModification.boardGame);
        });

        describe("generateDummyDOM()", function () {
            it("should generate a valid html string", function () {
                let dummyDOM = codeEvaluator.generateDummyDOM(levelModification.boardGame);

                expect(dummyDOM).to.equal('<street><house name="special"></house><house></house></street>');
            });
        });

        describe("evalDOMModifications()", function () {
            it("should validate the task correctly", function () {
                expect(codeEvaluator.evalDOMModifications(`let house = document.querySelector("[name='special']"); house.remove();`, levelModification)).to.equal(true);
            });
        });
    });
});
