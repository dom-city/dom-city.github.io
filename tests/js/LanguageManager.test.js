import LanguageManager from "../../js/LanguageManager.js";

describe("LanguageManager", function () {
    describe("getTranslation('en')", function () {
        it("should return the english translation", function () {
            var langEn = LanguageManager.getTranslation("en");
            expect(langEn).to.equal(LanguageManager.languages.en);
        });
    });
    describe("getTranslation('de')", function () {
        it("should return the german translation", function () {
            var langDe = LanguageManager.getTranslation("de");
            expect(langDe).to.equal(LanguageManager.languages.de);
        });
    });
    describe("getTranslation()", function () {
        it("default translation should be english", function () {
            var langDefault = LanguageManager.getTranslation();
            expect(langDefault).to.equal(LanguageManager.languages.en);
        });
    });
    describe("getTranslation('1234')", function () {
        it("if the translation is not found, return english", function () {
            var langNotKnown = LanguageManager.getTranslation("1234");
            expect(langNotKnown).to.equal(LanguageManager.languages.en);
        });
    });
});
