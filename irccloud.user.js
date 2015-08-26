// ==UserScript==
// @name       irccloud
// @namespace  http://www.reddit.com/r/creesch
// @version    0.19
// @description  do stuff on irccloud!
// @match      http://*.irccloud.com/*
// @match      https://*.irccloud.com/*
// @include      http://*.irccloud.com/*
// @include      https://*.irccloud.com/*
// @downloadURL https://raw.github.com/creesch/userscripts/master/irccloud.user.js
// ==/UserScript==
function main() {

	// insert /u/ and /r/ links for reddit
    $(document).on('DOMNodeInserted', function(e) {
        var element = e.target;

        $('#limits').remove();

        //console.log(element);
        $element = $(element);

        if (!$element.hasClass('type_buffer_msg')) {
            return;
        }
        //console.log($element.find('.content').html());
        var content = $element.find('.content').html();
        //console.log(content);
        if (content) {
            var newcontent = content.replace(/(?:^|[^\w])(\/(u|r)\/\w+)/g, ' <a href="https://www.reddit.com$1" target="_blank">$1</a>');

            //console.log(newcontent);
            $element.find('.content').html(newcontent);
            $element.find('.content').addClass('userscript');
        }

    });

    $('body').delegate('#limits', 'click', function() {


    });
	
	
	// when changing channels also insert /u/ and /r/ links as well as dismissing the read buffer.

    $('body').delegate('li.buffer', 'click', function() {
        $('.content').each(function() {
            if (!$(this).hasClass('userscript')) {

                var content = $(this).html();

                var newcontent = content.replace(/(?:^|[^\w])(\/(u|r)\/\w+)/g, ' <a href="https://www.reddit.com$1" target="_blank">$1</a>');
                $(this).addClass('userscript');
                $(this).html(newcontent);
            }
        });

        $('table.buffer').filter(':visible').find('.extrasDismiss.bufferAboveExtrasDismiss').click();


    });


	// irc markdown 
	// ***bold italic***
	// **bold**
	// *italic*
	// _underline_
	// ^03color^  <--The number is a color code (user 00 till 15)
	// ^03,06colorbackground^ <-- same as above but with a background 
	
    $body = $('body');
    
   $body.on('keyup', function(e) {
        $checkbox = $body.find('.markdown:visible');
        var checkboxChecked = $body.find('.markdown:visible:checked').length;
            
            if(e.ctrlKey && e.keyCode == 81) {
                if (checkboxChecked) { 
                    $checkbox.prop( "checked", false );
                    checkboxChecked = false;
                } else { 
                    $checkbox.prop( "checked", true );
                    checkboxChecked = true;
                }
            }
     });
    
    $body.delegate('[id^=bufferInputView]:visible', 'click', function() {
        var $this = $(this);
        var $checkbox = $this.closest('form').find('.markdown');
        if(!$checkbox.length) { 
            $this.after('<input type="checkbox" class="markdown" style="float: right" name="markdown" value="markdown" checked>'); 
            $this.css('width', 'calc(100% - 13px)');
        }
        
       
        
        $this.on('keydown', function(e) {
            
          

            var checkboxChecked = $body.find('.markdown:visible:checked').length;
            //console.log(checkboxChecked);
            //console.log(e);
            if (e.keyCode === 13 && checkboxChecked) {
                
                
                e.preventDefault();
                e.currentTarget.value = e.currentTarget.value.replace(/\*\*\*(.*?)\*\*\*/g, '\x1D\x02$1\x0F');
                e.currentTarget.value = e.currentTarget.value.replace(/\*\*(.*?)\*\*/g, '\x02$1\x0F');
                e.currentTarget.value = e.currentTarget.value.replace(/\*(.*?)\*/g, '\x1D$1\x0F');
                e.currentTarget.value = e.currentTarget.value.replace(/~(.*?)~/g, '\x1F$1\x0F');
                e.currentTarget.value = e.currentTarget.value.replace(/\^([0-9]{2},[0-9]{2}.*?)\^/g, '\x03$1\x0F');
                e.currentTarget.value = e.currentTarget.value.replace(/\^([0-9]{2}.*?)\^/g, '\x03$1\x0F');
            }
        });
    });
    
    
    //////// Hide inactive stuff ////////
    var delay = 500,
        enabled = false,
        intId;
    
    $('#buffersFooter').append('<p><a class="tb-show-active" href="javascript:;" style="text-align: center;"><span class="icon"></span>hide inactive</a></p>');
    
    function showActive() {
        $('ul.buffers .active:not(.unread)').hide();
        $('ul.buffers .active.unread').show();
        $('ul.buffers .active.selected').show();  // always show the chann we're in.
    }
    
    
    $body.on('click', '.tb-show-active', function() {
        var $this = $(this);
        
        if (!enabled) {
            $this.text('show all');
            intId = setInterval(showActive, delay); 
        } else {
            $this.text('hide inactive');
            clearInterval(intId);
            $('ul.buffers .active:not(.unread)').show();
        }
        
        enabled = !enabled;
    });
}


function inject(fn) {
    'use strict';

    function waitloop(fn) {
        var has_session = typeof(window.SESSION) !== 'undefined';
        var has_jquery = typeof(window.jQuery) !== 'undefined';

        if (has_jquery === false || has_session === false) {
            console.log("[CN] Resources are not ready...");
            window.setTimeout(function() {
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
