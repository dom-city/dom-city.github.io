import LevelsEN from "./Levels.en.js";
import LevelsDE from "./Levels.de.js";

export default {
    levels: { en: LevelsEN, de: LevelsDE },

    getLevels(lang) {
        return this.levels[lang] || this.levels["en"];
    },
};
