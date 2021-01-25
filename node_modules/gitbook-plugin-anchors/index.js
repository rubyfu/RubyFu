var cheerio = require('cheerio');
var _ = require('lodash');

// insert anchor link into section
function insertAnchors(content) {
    var $ = cheerio.load(content);
    $(':header').each(function(i, elem) {
        var header = $(elem);
        var id = header.attr('id');
        header.prepend('<a name="' + id + '" class="plugin-anchor" '
                   + 'href="#' + id + '">'
                   + '<span class="fa fa-link"></span>'
                   + '</a>');
    });
    return $.html();
}

module.exports = {
    book: {
        assets: "./assets",
        css: [ "plugin.css" ]
    },
    hooks: {
        "page": function(page) {
            page.sections = _.map(page.sections, function(section) {
                if (section.type != 'normal') return section;

                section.content = insertAnchors(section.content);
                return section;
            });

            return page;
        }
    }
};
