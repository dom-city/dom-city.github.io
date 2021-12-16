import LevelManager from "../../js/LevelManager.js";

describe("LevelManager", function () {
    describe("getLevels('en')", function () {
        it("should return the english levels", function () {
            var levelsEn = LevelManager.getLevels("en");
            expect(levelsEn).to.equal(LevelManager.levels.en);
        });
    });
    describe("getLevels('de')", function () {
        it("should return the german levels", function () {
            var levelsDe = LevelManager.getLevels("de");
            expect(levelsDe).to.equal(LevelManager.levels.de);
        });
    });
    describe("getLevels()", function () {
        it("default levels should be english", function () {
            var levelsDefault = LevelManager.getLevels();
            expect(levelsDefault).to.equal(LevelManager.levels.en);
        });
    });
    describe("getLevels('1234')", function () {
        it("if the langCode is not found, return english", function () {
            var levelsNotKnown = LevelManager.getLevels("1234");
            expect(levelsNotKnown).to.equal(LevelManager.levels.en);
        });
    });
});
