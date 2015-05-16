'use strict';
var cheerio = require('cheerio');
var _ = require('underscore');
var multiline = require('multiline');

var defaultConfig = {
  helpers: {
    buttons: {}
  }
};

var template = _.template(multiline(function() {
  /*
     <a href="<%= url %>" title="<%= title %>" class="fancybox">
       <img src="<%= url %>" alt="<%= title %>"></img>
     </a>
   */
}));

module.exports = {
  book: {
    assets: './assets',
    js: [
      'jquery.min.js',
      'jquery.fancybox.pack.js',
      'jquery.fancybox-buttons.js'
    ],
    css: [
      'jquery.fancybox.css',
      'jquery.fancybox-buttons.css'
    ],
    html: {
      'body:end': function() {
        var config = _.defaults(this.options.pluginsConfig.fancybox,
          defaultConfig);
        return '<script>$(".fancybox").fancybox(JSON.parse(\'' + JSON.stringify(
          config) + '\'));</script>';
      }
    }
  },
  hooks: {
    page: function(page) {
      _.each(page.sections, function(section) {
        var $ = cheerio.load(section.content);
        $('img').each(function(index, img) {
          var $img = $(img);
          $img.replaceWith(template({
            url: $img.attr('src'),
            title: $img.attr('alt')
          }));
        });
        section.content = $.html();
      });
      return page;
    }
  }
};
