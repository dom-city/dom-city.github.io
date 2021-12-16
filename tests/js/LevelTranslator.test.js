import LevelTranslator from "../../js/LevelTranslator.js";

describe("LevelTranslator", function () {
    const levelTranslator = new LevelTranslator();

    const boardGame = {
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
    };

    describe("prepareGameboard()", function () {
        it("should add an id to every element in the boardGame", function () {
            levelTranslator.prepareGameBoard(boardGame);

            expect(boardGame).to.have.deep.property("id");
            boardGame.children.forEach((e) => {
                expect(e).to.have.deep.property("id");
            });
        });
    });
    describe("generateGameObject2DArray()", function () {
        it("should generate a 2d-array, containing game objects", function () {
            let generated2DArray = levelTranslator.generateGameObject2DArray(boardGame);

            expect(generated2DArray[0]).to.deep.equal(Array(10).fill(null));

            expect(generated2DArray[1][1].type).to.equal("street");
            expect(generated2DArray[2][1].type).to.equal("street");
            expect(generated2DArray[3][1].type).to.equal("street");
            expect(generated2DArray[4][1].type).to.equal("street");
            expect(generated2DArray[5][1].type).to.equal("street");

            expect(generated2DArray[1][2].type).to.equal("house");
            expect(generated2DArray[2][2].type).to.equal("house");

            expect(generated2DArray[6]).to.deep.equal(Array(10).fill(null));
            expect(generated2DArray[7]).to.deep.equal(Array(10).fill(null));
            expect(generated2DArray[8]).to.deep.equal(Array(10).fill(null));
            expect(generated2DArray[9]).to.deep.equal(Array(10).fill(null));
        });
    });
    describe("generateHTMLEditorDOMTree()", function () {
        it("should generate a matching HTML-DOM for the HTML editor", function () {
            let htmlEditorDOM = levelTranslator.generateHTMLEditorDOMTree(boardGame);

            let template = document.createElement("template");
            template.innerHTML = htmlEditorDOM;

            let fragment = template.content;

            let divs = fragment.querySelectorAll("div");
            expect(divs.length).to.equal(5);
            expect(divs[0].innerHTML).to.have.string("DOCTYPE", "html");
            expect(divs[1].innerHTML).to.have.string("street", "html-editor-line");
            expect(divs[2].innerHTML).to.have.string("house", "html-editor-line");
            expect(divs[3].innerHTML).to.have.string("house", "html-editor-line");
            expect(divs[4].innerHTML).to.have.string("street", "html-editor-line");
        });
    });
    describe("generateTilesArray()", function () {
        it("should return an array of tiles which will be rendererd in the game", function () {
            let generated2DArray = levelTranslator.generateGameObject2DArray(boardGame);

            let tiles = levelTranslator.generateTilesArray(generated2DArray);

            expect(tiles[11].type).to.equal("street");
            expect(tiles[21].type).to.equal("street");
            expect(tiles[31].type).to.equal("street");
            expect(tiles[41].type).to.equal("street");
            expect(tiles[51].type).to.equal("street");

            expect(tiles[12].type).to.equal("house");
            expect(tiles[22].type).to.equal("house");
        });
    });
});
