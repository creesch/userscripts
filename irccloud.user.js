// ==UserScript==
// @name       irccloud
// @namespace  http://www.reddit.com/r/creesch
// @version    0.5
// @description  do stuff on irccloud!
// @match      http://*.irccloud.com*
// @match      https://*.irccloud.com*
// @include      http://*.irccloud.com*
// @include      https://*.irccloud.com*
// @downloadURL https://raw.github.com/creesch/userscripts/master/irccloud.user.js
// ==/UserScript==

function main() {


    $(document).on('DOMNodeInserted', function (e) {
        var element = e.target;
        
        $('#limits').remove();


        //console.log(element);
        $element = $(element);
        
        if (!$element.hasClass('type_buffer_msg'))  {
            return;
        }
        //console.log($element.find('.content').html());
        var content = $element.find('.content').html();
        //console.log(content);

        var newcontent = content.replace(/(?:^|[^\w])(\/(u|r)\/\w+)/, ' <a href="http://www.reddit.com$1" target="_blank">$1</a>');
        
        //console.log(newcontent);
        $element.find('.content').html(newcontent);
        $element.find('.content').addClass('userscript');

    });

    $('body').delegate('#limits', 'click', function () {

     
    });

 $('body').delegate('li.buffer', 'click', function () {
        $('.content').each(function (){ 
            if(!$(this).hasClass('userscript')) { 
          var content = $(this).html(); 
          var newcontent = content.replace(/(?:^|[^\w])(\/(u|r)\/\w+)/, ' <a href="http://www.reddit.com$1" target="_blank">$1</a>');
          $(this).addClass('userscript');
        $(this).html(newcontent);
            }
        });
  
     $('table.buffer').filter(':visible').find('.extrasDismiss.bufferAboveExtrasDismiss').click();
     
    });

}


function inject(fn) {
    'use strict';

    function waitloop(fn) {
        var has_session = typeof (window.SESSION) !== 'undefined';
        var has_jquery = typeof (window.jQuery) !== 'undefined';

        if (has_jquery === false || has_session === false) {
            console.log("[CN] Resources are not ready...");
            window.setTimeout(function () {
                waitloop(fn);
            }, 100);
            return;
        }

        console.log("[CN] Required resources are ready, calling plugin function.");
        fn();
    }

    var wrap = "(" + fn.toString() + ")";

    console.log("[CN] Injecting wrapper script.");
    var script = document.createElement('script');
    script.textContent += "(" + waitloop.toString() + ')(' + wrap + ');';
    document.body.appendChild(script);
    console.log("[CN] Done injecting wrapper script.");

}

inject(main);
