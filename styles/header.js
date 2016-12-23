window.onload = function(){
 $( "body" ).prepend('<div id="header" class="header absolute"><div class="wrap"><div class="clearfix" style="width:100%;"><div id="logo"><a href="https://rubyfu.net/"><img src="http://rubyfu.net/content/images/other/logo.png" class="logo_rubyfu"></a></div></div></div></div>');

    $(".book-body .body-inner").niceScroll({cursorcolor:"#b21818"});
    $(".book-summary").niceScroll({cursorcolor:"#b21818"});
  
$('.fa-spin').nextAll().remove()
};


// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-88660585-1', 'auto');
ga('send', 'pageview');
