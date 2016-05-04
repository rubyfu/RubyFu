module.exports = {
  book: {
    assets: ".",
    html: {
      "head:end": function(current) {
        var BASE_PATH, config, jsArray, cssArray, elements, i;

        BASE_PATH = current.basePath === "." ? "" : current.basePath + "/";

        config = this.options.pluginsConfig.addcssjs || {js: [], css: []};
        jsArray = config.js || [];
        cssArray = config.css || [];
        elements = "";

        /**
         * Creates a full path for the given file name
         *
         * @param {String} fileName
         * @returns {string}
         */
        var createPath = function (fileName) {
          return BASE_PATH + fileName.replace("../", "");
        };

        /**
         * Generates a script element for the given file name
         *
         * @param {String} fileName
         * @returns {string}
         */
        var generateScriptElement = function (fileName) {
          return "<script type=\"text/javascript\" src=\"" + createPath(fileName) + "\"></script>"
        };

        /**
         * Generates a link element for the given file name
         *
         * @param {String} fileName
         * @returns {string}
         */
        var generateLinkElement = function (fileName) {
          return "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + createPath(fileName) + "\">";
        };

        for (i = 0; i < jsArray.length; i++) {
          elements += generateScriptElement(jsArray[i]);
        }

        for (i = 0; i < cssArray.length; i++) {
          elements += generateLinkElement(cssArray[i]);
        }

        return elements;
      }
    }
  }
};