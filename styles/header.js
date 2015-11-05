window.onload = function(){

$(document).ready(function() {

function appendHeader() {

  var div = document.createElement('div');
  div.innerHTML = '<header id="header" class="header absolute"><div class="wrap"><div class="clearfix" style="width:100%;"><div id="logo"><a href="http://rubyfu.net/"><img src="http://rubyfu.net/content/images/other/logo.png"></a></div></div></div></header>';

    $('.book').before(div.innerHTML);

  };

  function rerenderNavbar() {
    appendHeader();
  };

  rerenderNavbar();

});

};
