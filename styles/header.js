window.onload = function(){
window.localStorage.removeItem(":keyword");

$(document).ready(function() {

function appendHeader() {

  var div = document.createElement('div');
  div.innerHTML = '<header id="header" class="header absolute"><div class="wrap"><div class="clearfix" style="width:100%;"><div id="logo"><a href="http://rubyfu.net/"><img src="http://rubyfu.net/content/images/other/logo.png"></a></div><div class="arangodb_version">Where ruby goes evil!</div></div></div></header>';

    $('.book').before(div.innerHTML);

  };

  function rerenderNavbar() {
    $('#header').remove();
    appendHeader();
  };

  rerenderNavbar();

});

};
