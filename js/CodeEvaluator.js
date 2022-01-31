import LanguageManager from "./LanguageManager.js";

import { generateRandomId } from "./Helper.js";

/* responsible to check the user input */

export default class CodeEvaluator {
    translation = null;

    constructor(langCode) {
        this.translation = LanguageManager.getTranslation(langCode);
    }

    generateDummyDOM(obj) {
        let translation = this.translation;
        let htmlCode = "";

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
                htmlCode += `<${translation.tags.street}${idText}${nameText}${classText}>${textText}`;
                obj.children?.forEach((element) => {
                    htmlCode += this.generateDummyDOM(element);
                });
                htmlCode += `</${translation.tags.street}>`;
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

                htmlCode += `<${translation.tags.house}${idText}${nameText}${classText}>${textText}</${translation.tags.house}>`;

                break;
            }
        }

        return htmlCode;
    }

    validateTask(userInput, level) {
        if (level.codeEvaluator.checkType === "query") {
            return this.evalDOMQuery(userInput, level);
        } else if (level.codeEvaluator.checkType === "modification") {
            return this.evalDOMModifications(userInput, level);
        }
        return false;
    }

    evalDOMQuery(userInput, level) {
        let iframe;
        try {
            iframe = this.generateIFrameEvaluator(level.boardGame);

            let evaluateUserInput;
            let evaluateValidResult;

            evaluateUserInput = iframe.contentWindow.eval(this.formatCodeToExecute(userInput, level));
            evaluateValidResult = iframe.contentWindow.eval(this.formatCodeToExecute(level.codeEvaluator.expected.join(" "), level));

            document.body.removeChild(iframe);

            if (!evaluateUserInput || !evaluateValidResult) {
                return false;
            }

            if (evaluateUserInput === evaluateValidResult) {
                return true;
            }

            //need to check if the result is the same or maybe the same elements in other collections (NodeList, HTMLCollection)

            let evaluateUserInputAsArray;
            if (this.isNodeList(evaluateUserInput)) {
                evaluateUserInputAsArray = [...evaluateUserInput];
            }
            let evaluateValidResultAsArray;
            if (this.isNodeList(evaluateValidResult)) {
                evaluateValidResultAsArray = [...evaluateValidResult];
            }

            if (evaluateUserInputAsArray.length !== evaluateValidResultAsArray.length) {
                return false;
            }

            for (let i = 0; i > evaluateUserInputAsArray.length; i++) {
                if (evaluateUserInputAsArray[i] !== evaluateValidResultAsArray[i]) {
                    return false;
                }
            }

            return true;
        } catch (error) {
            return false;
        } finally {
            if (iframe) {
                iframe.remove();
            }
        }
    }

    evalDOMModifications(userInput, level) {
        let iframeUserInput;
        let iframeValidResult;
        try {
            iframeUserInput = this.generateIFrameEvaluator(level.boardGame);
            iframeValidResult = this.generateIFrameEvaluator(level.boardGame);

            let evaluateUserInput;
            let evaluateValidResult;

            iframeUserInput.contentWindow.eval(this.formatCodeToExecute(userInput, level));
            evaluateUserInput = iframeUserInput.contentWindow.document.body.innerHTML;
            iframeValidResult.contentWindow.eval(this.formatCodeToExecute(level.codeEvaluator.expected.join(" "), level));
            evaluateValidResult = iframeValidResult.contentWindow.document.body.innerHTML;

            if (!evaluateUserInput || !evaluateValidResult) {
                return false;
            }

            if (evaluateUserInput === evaluateValidResult) {
                return true;
            }

            return false;
        } catch (error) {
            return false;
        } finally {
            if (iframeUserInput) {
                iframeUserInput.remove();
            }
            if (iframeValidResult) {
                iframeValidResult.remove();
            }
        }
    }

    generateIFrameEvaluator(boardGame) {
        try {
            let iframe = document.createElement("iframe");
            iframe.id = generateRandomId();

            iframe.style.cssText = "display:none;";

            document.body.appendChild(iframe);

            var realDOM = this.generateDummyDOM(boardGame);

            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(realDOM);
            iframe.contentWindow.document.close();
            return iframe;
        } catch (e) {
            return null;
        }
    }

    isNodeList(nodes) {
        var stringRepr = Object.prototype.toString.call(nodes);

        return (
            typeof nodes === "object" &&
            /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
            typeof nodes.length === "number" &&
            (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0))
        );
    }

    formatCodeToExecute(inputCode, level) {
        return `${level.jsEditor.before}\n${inputCode}\n${level.jsEditor.after}`;
    }
}
