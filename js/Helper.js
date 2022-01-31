/* helper functions */

function generateRandomId() {
    return (
        Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(2, 10) + Date.now()
    );
}

function formatString(template, params) {
    jQuery.each(params, function (i, n) {
        template = template.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return template;
}

function getElementPosition(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + Math.max($("html").scrollTop(), $("body").scrollTop()),
        left: rect.left + Math.max($("html").scrollLeft(), $("body").scrollLeft()),
    };
}

export { generateRandomId, formatString, getElementPosition };
