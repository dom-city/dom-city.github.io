import LevelTranslator from "./LevelTranslator.js";
import CodeEvaluator from "./CodeEvaluator.js";
import LevelManager from "./LevelManager.js";
import LanguageManager from "./LanguageManager.js";

import { formatString, getElementPosition } from "./Helper.js";

class Game {
    langCode = window.location.hash.substring(1) || localStorage.langCode || "de";
    currentLevelIndex = parseInt(localStorage.currentLevelIndex) || 0;
    solved = (localStorage.solved && JSON.parse(localStorage.solved)) || [];

    levels = null;
    levelTranslator = null;
    codeEvaluator = null;
    translation = null;
    editorButtonState = "enter";

    fireworks = null;

    start() {
        this.translateGame();
        this.initLevelsWithLanguage();
        this.buildLevelMenu();
        this.initHandlers();
        this.loadLevel(this.currentLevelIndex);
        this.updateProgress();
        this.initFireworks();
    }

    initLevelsWithLanguage() {
        localStorage.langCode = this.langCode;
        this.levels = LevelManager.getLevels(this.langCode);

        this.levelTranslator = new LevelTranslator(this.langCode);
        this.codeEvaluator = new CodeEvaluator(this.langCode);
    }

    translateGame() {
        this.translation = LanguageManager.getTranslation(this.langCode);

        $(".credits-container").html(
            formatString(this.translation.createdBy, [
                '<a href="https://github.com/wakatoa" target="_blank">@wakatoa</a>',
                '<a href="https://github.com/dom-city/dom-city.github.io" target="_blank">Github</a>',
            ]),
        );

        $(".editor-upper .editor .input-header span").text(this.translation.jsEditorTitle);
        $(".editor-lower .editor .input-header span").text(this.translation.htmlEditorTitle);

        $(".menu-header h1").text(this.translation.selectLevel);
        $(".reset-button").text(this.translation.resetButton);

        $(".game-finished-header").html(this.translation.gameFinishedHeader);
        $(".game-finished-text").html(this.translation.gameFinishedText);

        $("#mobile-warning").append(this.translation.mobileWarning);
    }

    initHandlers() {
        $("#board, #dom-tree").on("mouseenter", ".board-tile, .html-editor-line", function (e) {
            hoverElementById($(e.currentTarget).data("id"));
            updateSelectorTextAndPosition($(e.currentTarget).data("id"));
        });

        $("#board, #dom-tree").on("mouseleave", ".board-tile, .html-editor-line", function (e) {
            hoverElementById($(e.currentTarget).data("id"));
            updateSelectorTextAndPosition();
        });

        function calculateTileWidth() {
            let width = $(".game").width();

            let tileWidth = 0;

            let maxTileWidth = Math.round(width / 10);

            if (maxTileWidth >= 96 * 1.1) {
                tileWidth = 96;
            } else if (maxTileWidth >= 80 * 1.1) {
                tileWidth = 80;
            } else if (maxTileWidth >= 64 * 1.1) {
                tileWidth = 64;
            } else if (maxTileWidth >= 48 * 1.1) {
                tileWidth = 48;
            } else if (maxTileWidth >= 32 * 1.1) {
                tileWidth = 32;
            }

            return tileWidth;
        }

        function updateSelectorTextAndPosition(id) {
            if (!id) {
                $("#selector-text").text("");
                $("#selector-text").css("top", 0);
                $("#selector-text").css("left", 0);
                $("#selector-text").css("display", "none");
                return;
            }
            let boardGameElement = $(`.board-tile.grid-tile[data-id='${id}']:visible`);
            let htmlEditorElements = $(`.html-editor-line[data-id='${id}']:visible`);

            let displayText = "";
            htmlEditorElements.each(function () {
                displayText += this.textContent.trim();
            });

            let position = getElementPosition(boardGameElement?.get(0));
            $("#selector-text").text(displayText);
            $("#selector-text").css("top", `${position.top - calculateTileWidth() / 2}px`);
            $("#selector-text").css("left", `${position.left + calculateTileWidth() / 2}px`);
            $("#selector-text").css("display", "block");
        }

        function hoverElementById(id) {
            let elem = $(`[data-id='${id}']`);

            elem.each((_, e) => {
                e = $(e);

                if (e.hasClass("html-editor-line")) {
                    if (e.hasClass("hover")) {
                        e.removeClass("hover");
                    } else {
                        e.addClass("hover");
                    }
                }
                if (e.hasClass("board-tile")) {
                    if (e.hasClass("hover")) {
                        e.removeClass("hover");
                    } else {
                        e.addClass("hover");
                    }
                }
            });
        }

        $("#container .file-window.code-view").on("keypress", "#code", (e) => {
            if (e.which == 13) {
                let maxLines = $(e.currentTarget).data("lines");
                var code = $(e.currentTarget).val();
                var trim = code.trim();
                var codeLength = code.split("\n").length;
                var trimLength = trim.split("\n").length;

                if (codeLength >= maxLines) {
                    if (codeLength === trimLength) {
                        e.preventDefault();
                        $(".editor-button").click();
                    } else {
                        $("#code").focus().val("").val(trim);
                    }
                }
            }
        });

        $(".reset-button").click(() => {
            this.resetProgress();
        });

        $(".language-container a").click((e) => {
            window.location.hash = $(e.currentTarget).attr("href");
            window.location.reload();
        });

        $(".game-finished .close").click(() => {
            this.stopFireworks();
            $(".game-finished").hide();
        });

        $(".editor-button").click(() => {
            if (this.editorButtonState === "enter") {
                this.checkInput();
            } else if (this.editorButtonState === "next") {
                if (this.currentLevelIndex + 1 === this.levels.length && this.getProgress() === 100) {
                    this.finishGame();
                } else {
                    this.nextLevel();
                }
            }
        });

        $(window).resize(function () {
            let tileWidth = calculateTileWidth();

            $("#board").css("grid-template", `repeat(10, ${tileWidth}px) / repeat(10, ${tileWidth}px)`);
        });
        $(window).trigger("resize");
    }

    initFireworks() {
        let container = document.querySelector(".fireworks-container");
        this.fireworks = new Fireworks(container, {
            rocketsPoint: 50,
            speed: 5,
            acceleration: 1,
            gravity: 1,
            trace: 1,
            explosion: 15,
            autoresize: true,
            brightness: {
                min: 50,
                max: 80,
                decay: {
                    min: 0.002,
                    max: 0.005,
                },
            },
            boundaries: {
                x: 50,
                y: 50,
                width: container.clientWidth,
                height: container.clientHeight,
                visible: false,
            },
        });
    }

    startFireworks() {
        $(".fireworks-container").css("visibility", "visible");
        this.fireworks.start();
    }

    stopFireworks() {
        $(".fireworks-container").css("visibility", "hidden");
        this.fireworks.stop();
    }

    prevLevel() {
        this.currentLevelIndex--;
        this.loadLevel();
    }

    nextLevel() {
        this.currentLevelIndex++;
        this.loadLevel();
    }

    buildLevelMenu() {
        this.levels.forEach((level, index) => {
            $(".menu .levels").append(
                `<div class="level-container" data-level="${index}"><span class="${
                    this.isLevelSolved(index) ? "level-passed" : "level-not-passed"
                }"><i class="fa-solid fa-check"></i></span><span class="level-number">${index + 1})</span><span class="level-title">${level.apiMemberName}</span></div>`,
            );
        });

        $(".nav-menu, .close-menu").click(() => {
            $(".menu").toggleClass("hidden");
            $(".level").toggleClass("hidden");
        });

        $(".level-container").click((e) => {
            this.currentLevelIndex = $(e.currentTarget).data("level");
            this.loadLevel();
            $(".menu").toggleClass("hidden");
            $(".level").toggleClass("hidden");
        });

        $(".nav-button.prev").click(() => {
            this.prevLevel();
        });
        $(".nav-button.next").click(() => {
            this.nextLevel();
        });
    }

    loadLevel() {
        if (this.currentLevelIndex < 0) {
            this.currentLevelIndex = 0;
        }

        if (this.currentLevelIndex >= this.levels.length) {
            //jump to the first level not finished
            let notSolved = [...Array(this.levels.length - 1).keys()].filter((x) => !this.solved.includes(x));
            if (notSolved.length === 0) {
                this.currentLevelIndex = 0;
            } else {
                this.currentLevelIndex = notSolved[0];
            }
        }

        localStorage.currentLevelIndex = this.currentLevelIndex;

        let level = this.levels[this.currentLevelIndex];

        this.levelTranslator.prepareGameBoard(level.boardGame);

        $("#level-name").html(level.levelName);
        $("#level-header-text").html(`${formatString(this.translation.level, [this.currentLevelIndex + 1, this.levels.length])} <span class="${
            this.isLevelSolved(this.currentLevelIndex) ? "level-passed" : "level-not-passed"
        }
        "><i class="fa-solid fa-check"></i></span>`);
        $("#api-member-name").html(level.apiMemberName);
        $("#api-member-explanation").html(level.apiMemberExplanation);

        $("#api-member-examples").html([].concat(level.apiMemberExamples).join("\r\n"));

        $("#api-member-syntax").html(level.apiMemberSyntax);

        let htmlEditorDOMTree = this.levelTranslator.generateHTMLEditorDOMTree(level.boardGame);
        $("#dom-tree").html(htmlEditorDOMTree);

        $("#dom-tree > div.html-editor-line[data-transition='dropin']").css("visibility", "hidden");

        let object2DArray = this.levelTranslator.generateGameObject2DArray(level.boardGame);
        let tiles2DArray = this.levelTranslator.generateTilesArray(object2DArray);

        $("#board").empty();
        tiles2DArray.forEach((e) => {
            if (e) {
                let div = $("<div>", { class: "board-tile grid-tile", "data-id": e.id });
                div.css("background-image", `url(/img/${e.tile})`);

                if (e.modification) {
                    div.attr("data-modify", "");
                    if (e.modified) {
                        div.css("display", "none");
                    }
                }

                if (e.highlight) {
                    div.addClass("animate__animated animate__slow animate__flash30 animate__infinite");
                    div.attr("data-highlight", "highlight");
                }
                if (e.transition) {
                    div.attr("data-transition", e.transition);

                    if (e.transition === "dropin") {
                        div.css("visibility", "hidden");
                    }
                }
                if (e.attributes?.text) {
                    div.append(`<div class="post-it post-it-yellow">${this.translation.tags[e.attributes.text]}</div>`);
                }
                if (e.attributes?.id) {
                    div.append(`<div class="post-it post-it-blue">${this.translation.tags[e.attributes.id]}</div>`);
                }
                if (e.attributes?.name) {
                    div.append(`<div class="post-it post-it-pink">${this.translation.tags[e.attributes.name]}</div>`);
                }

                $("#board").append(div);
            } else {
                $("#board").append(`<div class="grid-tile" style="background: var(--color-board-background)"></div>`);
            }
        });

        $("#js-input").empty();

        $("#js-input").append(`<pre style="white-space: pre-wrap;line-height: 150%;">${level.jsEditor.before}</pre>`);
        $("#js-input").append(
            `<textarea id="code" data-lines="${level.codeEvaluator.expected.length}" style="height: ${
                level.codeEvaluator.expected.length * 1.5
            }em" spellcheck="false" autocomplete="off" autocorrect="off" wrap="off" autocapitalize="off" onfocus="this.setSelectionRange(this.value.length, this.value.length);">${
                level.jsEditor.input
            }</textarea>`,
        );
        $("#js-input").append(`<pre style="white-space: pre-wrap;line-height: 150%;">${level.jsEditor.after}</pre>`);

        this.editorButtonState = "enter";
        $(".editor-button").text("Enter");
    }

    checkInput() {
        let userInput = $("#code").val();

        let level = this.levels[this.currentLevelIndex];

        let solved = this.codeEvaluator.validateTask(userInput, level);

        if (solved) {
            this.inputCorrect();
        } else {
            this.inputWrong();
        }
    }

    inputCorrect() {
        $(".success").show();
        $(".success").addClass("animate__animated animate__slow animate__zoomIn");

        $(".success").on("animationend", () => {
            $(".success").hide();
            $(".success").unbind("animationend");
            this.setLevelSolved(this.currentLevelIndex);

            this.editorButtonState = "next";
            $(".editor-button").text(this.translation.nextButton);
        });

        //remove highlights
        let highlighted = $("#board > div.board-tile.grid-tile[data-highlight]");
        highlighted.removeClass("animate__animated animate__slow animate__flash30 animate__infinite");

        //bounce elements
        let bounce = $("#board > div.board-tile.grid-tile[data-transition='bounce']");
        bounce.addClass("animate__animated animate__slower animate__heartBeat animate__infinite");

        //dropin elements
        let dropin = $("#board > div.board-tile.grid-tile[data-transition='dropin']");
        dropin.css("visibility", "visible");
        dropin.addClass("animate__animated animate__slow animate__bounceInDown");

        //dropout elements
        let dropout = $("#board > div.board-tile.grid-tile[data-transition='dropout']");
        dropout.addClass("animate__animated animate__slow animate__bounceOutUp");

        //modifications
        let modificationsVisible = $("#board > div.board-tile.grid-tile[data-modify]:visible");
        let modificationsHidden = $("#board > div.board-tile.grid-tile[data-modify]:hidden");
        if (modificationsHidden.length && modificationsHidden.length) {
            modificationsVisible.on("animationend", () => {
                modificationsVisible.unbind("animationend");

                modificationsVisible.toggle();
                modificationsHidden.toggle();

                modificationsVisible.removeClass("animate__fadeOut");
                modificationsHidden.addClass("animate__animated animate__fadeIn");
            });

            modificationsVisible.addClass("animate__animated animate__fadeOut");
        }

        //dom-tree fade out and in
        if ((dropin.length && dropin.length) > 0 || (dropout.length && dropout.length > 0) || (modificationsHidden.length && modificationsHidden.length)) {
            $("#dom-tree").on("animationend", () => {
                $("#dom-tree").unbind("animationend");

                $("#dom-tree > div.html-editor-line[data-transition='dropin']").css("visibility", "visible");
                $("#dom-tree > div.html-editor-line[data-transition='dropout']").css("visibility", "hidden");

                $("#dom-tree > div.html-editor-line[data-modify]").toggle();

                $("#dom-tree").removeClass("animate__fadeOut");
                $("#dom-tree").addClass("animate__fadeIn");
            });

            $("#dom-tree").addClass("animate__animated animate__fadeOut");
        }
    }

    inputWrong() {
        $(".editor-upper > .editor").addClass("animate__animated animate__fast animate__headShake");
        $(".editor-upper > .editor").on("animationend", () => {
            $(".editor-upper > .editor").unbind("animationend");
            $(".editor-upper > .editor").removeClass("animate__animated animate__fast animate__headShake");
        });
    }

    setLevelSolved(levelIndex) {
        if (!this.isLevelSolved(levelIndex)) {
            this.solved.push(levelIndex);

            localStorage.solved = JSON.stringify(this.solved);

            $(`.level-container[data-level="${levelIndex}"] span:first-child`).addClass("level-passed").removeClass("level-not-passed");
        }
        this.updateProgress();
    }

    getProgress() {
        let uniqueLevelsSolved = this.solved.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        let percentage = Math.round(((100 * uniqueLevelsSolved.length) / this.levels.length) * 100) / 100;

        if (percentage > 100) {
            percentage = 100;
        }

        return percentage;
    }

    updateProgress() {
        let percentage = this.getProgress();

        $(".progress-inner").css("width", `${percentage}%`);
    }

    resetProgress() {
        this.stopFireworks();
        $(".game-finished").hide();

        this.solved = [];
        localStorage.solved = JSON.stringify(this.solved);

        this.currentLevelIndex = 0;

        $(`.level-container[data-level] span:first-child`).addClass("level-not-passed").removeClass("level-passed");

        $(".menu").toggleClass("hidden");
        $(".level").toggleClass("hidden");

        this.updateProgress();

        this.loadLevel();
    }

    finishGame() {
        document.body.style.webkitTransform = "scale(1)";
        document.body.style.msTransform = "scale(1)";
        document.body.style.transform = "scale(1)";
        $("html, body").animate({ scrollTop: 0 }, "smooth");
        this.startFireworks();
        $(".game-finished").show();
    }

    isLevelSolved(levelIndex) {
        return this.solved.includes(levelIndex);
    }
}

$(document).ready(function () {
    let game = new Game();
    game.start();
});
