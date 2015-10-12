'use strict';
var cheerio = require('cheerio');
var _ = require('underscore');
var re = /^\s*\[[x ]\]\s*/;

module.exports = {
	hooks: {
		page: function(page) {
			_.each(page.sections, function(section) {
				var $ = cheerio.load(section.content);
				$('li').each(function(index, a) {
					a = $(a);
					var text = a.text();
					if (re.test(text)) {
						text = text
							.replace(/^\s*\[ \]\s*/, '<input type="checkbox" disabled="disabled"></i> ')
							.replace(/^\s*\[x\]\s*/, '<input type="checkbox" disabled="disabled" checked="checked"></i> ');
						a.replaceWith('<li style="list-style: none">' + text + '</li>');
					}
				});
				section.content = $.html();
			});
			return page;
		}
	}
};