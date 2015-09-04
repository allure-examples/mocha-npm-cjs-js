"use strict";
function SearchBox(selector) {
    this.selector = selector || ".search2";
    this.input = this.selector + " [name=text]";
    this.submitButton = this.selector + " [type=submit]";
}

function Suggest(selector) {
    this.selector = selector || ".suggest2";
    this.items = this.selector + " .suggest2-item";
}

module.exports = {
    search: new SearchBox(),
    suggest: new Suggest()
};
