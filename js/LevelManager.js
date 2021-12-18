import LevelsDE from "./Levels.de.js";
import LevelsEN from "./Levels.en.js";

export default {
    levels: { de: LevelsDE, en: LevelsEN },

    getLevels(lang) {
        return this.levels[lang] || this.levels["de"];
    },
};
