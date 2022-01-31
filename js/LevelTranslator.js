import LanguageManager from "./LanguageManager.js";

import { generateRandomId } from "./Helper.js";


/*
Translates a gameboard object into two parts: an array which will be displayed in the user interface and a html-structure which will be visible in the html editor
*/
export default class LevelTranslator {
    translation = null;

    constructor(langCode) {
        this.translation = LanguageManager.getTranslation(langCode);
    }

    /*adds a random id to identify an object*/
    prepareGameBoard(boardGame) {
        boardGame.id = generateRandomId();

        boardGame.children?.forEach((element) => {
            this.prepareGameBoard(element);
        });
    }

    /*converts the gameboard object into a 2d array*/
    generateGameObject2DArray(obj, arr) {
        if (!arr) {
            arr = Array(10)
                .fill()
                .map(() => Array(10).fill(null));
        }

        switch (obj.type) {
            case "street":
                let streetObj = {
                    id: obj.id,
                    type: obj.type,
                    highlight: obj.highlight,
                    transition: obj.transition,
                    attributes: obj.attributes,
                };

                switch (obj.direction) {
                    case "up":
                        for (let i = 0; i < obj.steps; i++) {
                            arr[obj.location[1] - i][obj.location[0]] = Object.assign({}, streetObj);
                        }
                        break;
                    case "down":
                        for (let i = 0; i < obj.steps; i++) {
                            arr[obj.location[1] + i][obj.location[0]] = Object.assign({}, streetObj);
                        }
                        break;
                    case "left":
                        for (let i = 0; i < obj.steps; i++) {
                            arr[obj.location[0]][obj.location[1] - i] = Object.assign({}, streetObj);
                        }
                        break;
                    case "right":
                        for (let i = 0; i < obj.steps; i++) {
                            arr[obj.location[0]][obj.location[1] + i] = Object.assign({}, streetObj);
                        }
                        break;
                }

                obj.children?.forEach((element) => {
                    this.generateGameObject2DArray(element, arr);
                });

                break;
            case "house":
                arr[obj.location[0]][obj.location[1]] = {
                    id: obj.id,
                    type: obj.type,
                    highlight: obj.highlight,
                    transition: obj.transition,
                    attributes: obj.attributes,
                };
                break;
        }

        return arr;
    }

    /* converts an gameboard object into a html structure */
    generateHTMLEditorDOMTree(obj, intend) {
        let translation = this.translation;
        let htmlCode = "";

        if (!intend) {
            htmlCode = "<div>&lt;!DOCTYPE html&gt;</div>";
        }

        if (!obj) {
            return "";
        }

        switch (obj.type) {
            case "street": {
                let idText = "";
                let nameText = "";
                let textText = "";
                let classText = "";
                if (obj.attributes?.initial?.id) {
                    idText = ` id="${translation.tags[obj.attributes.initial.id]}"`;
                }
                if (obj.attributes?.initial?.name) {
                    nameText = ` name="${translation.tags[obj.attributes.initial.name]}"`;
                }
                if (obj.attributes?.initial?.text) {
                    textText = `${translation.tags[obj.attributes.initial.text]}`;
                }
                if (obj.attributes?.initial?.class) {
                    let classArray = [].concat(obj.attributes.initial.class);
                    classArray.forEach(function (part, index) {
                        classArray[index] = translation.tags[classArray[index]];
                    });
                    classText = ` class="${classArray.join(" ")}"`;
                }

                let transitionText = "";
                if (obj.transition) {
                    transitionText = `data-transition="${obj.transition}"`;
                }

                let modifyText = "";
                if (obj.attributes?.modify) {
                    modifyText = "data-modify";
                }

                htmlCode += `<div class="html-editor-line" ${transitionText} ${modifyText} data-id="${obj.id}">${intend ?? ""}&lt;${
                    this.translation.tags.street
                }${idText}${nameText}${classText}&gt;${textText}</div>`;

                if (obj.attributes?.modify) {
                    let modifyIdText = "";
                    let modifyNameText = "";
                    let modifyTextText = "";
                    let modifyClassText = "";
                    if (obj.attributes?.modify?.id) {
                        modifyIdText = ` id="${translation.tags[obj.attributes.modify.id]}"`;
                    }
                    if (obj.attributes?.modify?.name) {
                        modifyNameText = ` name="${translation.tags[obj.attributes.modify.name]}"`;
                    }
                    if (obj.attributes?.modify?.text) {
                        modifyTextText = `${translation.tags[obj.attributes.modify.text]}`;
                    }
                    if (obj.attributes?.modify?.class) {
                        let classArray = [].concat(obj.attributes.modify.class);
                        classArray.forEach(function (part, index) {
                            classArray[index] = translation.tags[classArray[index]];
                        });
                        modifyClassText = ` class="${classArray.join(" ")}"`;
                    }

                    htmlCode += `<div class="html-editor-line" style="display:none" data-modify data-id="${obj.id}">${intend ?? ""}&lt;${
                        this.translation.tags.street
                    }${modifyIdText}${modifyNameText}${modifyClassText}&gt;${modifyTextText}</div>`;
                }

                obj.children?.forEach((element) => {
                    htmlCode += this.generateHTMLEditorDOMTree(element, (intend ?? "") + "  ");
                });
                htmlCode += `<div class="html-editor-line" ${transitionText} data-id="${obj.id}">${intend ?? ""}&lt;/${this.translation.tags.street}&gt;</div>`;
                break;
            }
            case "house": {
                let idText = "";
                let nameText = "";
                let textText = "";
                let classText = "";
                if (obj.attributes?.initial?.id) {
                    idText = ` id="${translation.tags[obj.attributes.initial.id]}"`;
                }
                if (obj.attributes?.initial?.name) {
                    nameText = ` name="${translation.tags[obj.attributes.initial.name]}"`;
                }
                if (obj.attributes?.initial?.text) {
                    textText = `${translation.tags[obj.attributes.initial.text]}`;
                }
                if (obj.attributes?.initial?.class) {
                    let classArray = [].concat(obj.attributes.initial.class);
                    classArray.forEach(function (part, index) {
                        classArray[index] = translation.tags[classArray[index]];
                    });
                    classText = ` class="${classArray.join(" ")}"`;
                }

                let transitionText = "";
                if (obj.transition) {
                    transitionText = `data-transition="${obj.transition}"`;
                }

                let modifyText = "";
                if (obj.attributes?.modify) {
                    modifyText = "data-modify";
                }

                htmlCode += `<div class="html-editor-line" ${transitionText} ${modifyText} data-id="${obj.id}">${intend}&lt;${this.translation.tags.house}${idText}${nameText}${classText}&gt;${textText}&lt;/${this.translation.tags.house}&gt;</div>`;

                if (obj.attributes?.modify) {
                    let modifyIdText = "";
                    let modifyNameText = "";
                    let modifyTextText = "";
                    let modifyClassText = "";
                    if (obj.attributes?.modify?.id) {
                        modifyIdText = ` id="${translation.tags[obj.attributes.modify.id]}"`;
                    }
                    if (obj.attributes?.modify?.name) {
                        modifyNameText = ` name="${translation.tags[obj.attributes.modify.name]}"`;
                    }
                    if (obj.attributes?.modify?.text) {
                        modifyTextText = `${translation.tags[obj.attributes.modify.text]}`;
                    }
                    if (obj.attributes?.modify?.class) {
                        let classArray = [].concat(obj.attributes.modify.class);
                        classArray.forEach(function (part, index) {
                            classArray[index] = translation.tags[classArray[index]];
                        });
                        modifyClassText = ` class="${classArray.join(" ")}"`;
                    }

                    htmlCode += `<div class="html-editor-line" style="display:none" data-modify data-id="${obj.id}">${intend}&lt;${this.translation.tags.house}${modifyIdText}${modifyNameText}${modifyClassText}&gt;${modifyTextText}&lt;/${this.translation.tags.house}&gt;</div>`;
                }
                break;
            }
        }

        return htmlCode;
    }

    /** logic for generating a tile array from the 2d array*/
    generateTilesArray(arr) {
        let retArr = [];

        arr.forEach((e1, i1) => {
            e1.forEach((e2, i2) => {
                switch (e2?.type) {
                    case "street": {
                        retArr.push({
                            type: e2.type,
                            id: e2.id,
                            tile: this.generateStreetTile(this.generateStreetDescription(arr, i1, i2, true)),
                            highlight: e2.highlight,
                            transition: e2.transition,
                            attributes: e2.attributes?.initial,
                            modification: e2.attributes?.modify,
                        });

                        if (e2.attributes?.modify) {
                            retArr.push({
                                type: e2.type,
                                id: e2.id,
                                tile: this.generateStreetTile(this.generateStreetDescription(arr, i1, i2, false)),
                                highlight: e2.highlight,
                                transition: e2.transition,
                                attributes: e2.attributes?.modify,
                                modification: e2.attributes?.modify,
                                modified: true,
                            });
                        }
                        break;
                    }

                    case "house": {
                        retArr.push({
                            type: e2.type,
                            id: e2.id,
                            tile: e2.attributes?.initial?.class?.includes("blue") ? "house_blue.png" : "house.png",
                            highlight: e2.highlight,
                            transition: e2.transition,
                            attributes: e2.attributes?.initial,
                            modification: e2.attributes?.modify,
                        });

                        if (e2.attributes?.modify) {
                            retArr.push({
                                type: e2.type,
                                id: e2.id,
                                tile: e2.attributes?.modify?.class?.includes("blue") ? "house_blue.png" : "house.png",
                                highlight: e2.highlight,
                                transition: e2.transition,
                                attributes: e2.attributes?.modify,
                                modification: e2.attributes?.modify,
                                modified: true,
                            });
                        }
                        break;
                    }
                    default: {
                        retArr.push(null);
                    }
                }
            });
        });

        return retArr;
    }


    /** generates a street description which is used to identify the correct tile*/
    generateStreetDescription(arr, i1, i2, initial = true) {
        let t = null,
            r = null,
            l = null,
            b = null;

        try {
            t = arr[i1 - 1][i2];
        } catch (error) {}
        try {
            r = arr[i1][i2 + 1];
        } catch (error) {}
        try {
            b = arr[i1 + 1][i2];
        } catch (error) {}
        try {
            l = arr[i1][i2 - 1];
        } catch (error) {}

        //streetDescription |||| Falls es hier dann mal verschiedene Typen von straßen gibt bzw. props kann hier ein objekt erstellt werden
        let sd = {
            top: false,
            topSmall: false,
            right: false,
            rightSmall: false,
            bottom: false,
            bottomSmall: false,
            left: false,
            leftSmall: false,
        };

        if (t?.type === "street") {
            sd.top = true;
            if (initial) {
                sd.topSmall = t?.attributes?.initial?.class?.includes("small") ?? false;
            } else {
                sd.topSmall = t?.attributes?.modify?.class?.includes("small") ?? false;
            }
        }

        if (r?.type === "street") {
            sd.right = true;
            if (initial) {
                sd.rightSmall = r?.attributes?.initial?.class?.includes("small") ?? false;
            } else {
                sd.rightSmall = r?.attributes?.modify?.class?.includes("small") ?? false;
            }
        }

        if (b?.type === "street") {
            sd.bottom = true;
            if (initial) {
                sd.bottomSmall = b?.attributes?.initial?.class?.includes("small") ?? false;
            } else {
                sd.bottomSmall = b?.attributes?.modify?.class?.includes("small") ?? false;
            }
        }

        if (l?.type === "street") {
            sd.left = true;
            if (initial) {
                sd.leftSmall = l?.attributes?.initial?.class?.includes("small") ?? false;
            } else {
                sd.leftSmall = l?.attributes?.modify?.class?.includes("small") ?? false;
            }
        }

        return sd;
    }

    /* generates the correct tile for a given street description */
    generateStreetTile(sd) {
        let tile = null;

        if ((sd.top && !sd.right && sd.bottom && !sd.left) || (sd.top && !sd.right && !sd.bottom && !sd.left) || (!sd.top && !sd.right && sd.bottom && !sd.left)) {
            //Straße vertikal
            //3 Checks, weil wenn es der Anfang oder Ende ist, ist nur top oder bottom true
            if (sd.topSmall && !sd.bottomSmall && sd.bottom) {
                //transition small to big
                tile = "street_vertical_transition_big_small.png";
            } else if (sd.top && !sd.topSmall && sd.bottomSmall) {
                //transition big to small
                tile = "street_vertical_transition_small_big.png";
            } else if ((sd.topSmall && sd.bottomSmall) || (sd.bottomSmall && !sd.topSmall) || (sd.topSmall && !sd.bottom)) {
                //street_small
                tile = "street_vertical_small.png";
            } else {
                tile = "street_vertical.png";
            }
        } else if ((!sd.top && sd.right && !sd.bottom && sd.left) || (!sd.top && !sd.right && !sd.bottom && sd.left) || (!sd.top && sd.right && !sd.bottom && !sd.left)) {
            //Straße horizontal
            //3 Checks, weil wenn es der Anfang oder Ende ist, ist nur left oder right true

            if (sd.rightSmall && !sd.leftSmall && sd.left) {
                //transition small to big
                tile = "street_horizontal_transition_big_small.png";
            } else if (sd.right && !sd.rightSmall && sd.leftSmall) {
                //transition big to small
                tile = "street_horizontal_transition_small_big.png";
            } else if ((sd.rightSmall && sd.leftSmall) || (sd.leftSmall && !sd.right) || (sd.rightSmall && !sd.left)) {
                //street_small
                tile = "street_horizontal_small.png";
            } else {
                tile = "street_horizontal.png";
            }
        } else if (sd.top && sd.right && !sd.bottom && !sd.left) {
            if (sd.topSmall && sd.rightSmall) {
                tile = "street_turn_tr_small.png";
            } else {
                tile = "street_turn_tr.png";
            }
        } else if (sd.top && !sd.right && !sd.bottom && sd.left) {
            if (sd.topSmall && sd.leftSmall) {
                tile = "street_turn_tl_small.png";
            } else {
                tile = "street_turn_tl.png";
            }
        } else if (!sd.top && sd.right && sd.bottom && !sd.left) {
            if (sd.rightSmall && sd.bottomSmall) {
                tile = "street_turn_rb_small.png";
            } else {
                tile = "street_turn_rb.png";
            }
        } else if (!sd.top && !sd.right && sd.bottom && sd.left) {
            if (sd.bottomSmall && sd.leftSmall) {
                tile = "street_turn_bl_small.png";
            } else {
                tile = "street_turn_bl.png";
            }
        } else if (sd.top && sd.right && sd.bottom && sd.left) {
            tile = "street_cross_trbl.png";
            if (sd.topSmall && sd.rightSmall && sd.bottomSmall && sd.leftSmall) {
                tile = "street_cross_trbl_small.png";
            } else {
                tile = "street_cross_trbl.png";
            }
        }

        return tile;
    }
}
