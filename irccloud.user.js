// ==UserScript==
// @name       irccloud
// @namespace  http://www.reddit.com/r/creesch
// @version    0.24
// @description  do stuff on irccloud!
// @match      http://*.irccloud.com/*
// @match      https://*.irccloud.com/*
// @include      http://*.irccloud.com/*
// @include      https://*.irccloud.com/*
// @downloadURL https://raw.github.com/creesch/userscripts/master/irccloud.user.js
// ==/UserScript==

function main() {
    var $body = $('body');

    //////// subreddit and user linking ////////
    $(document).on('DOMNodeInserted', function(e) {
        $('#limits').remove(); //because it gets replaced every time.

        var element = e.target,
            $element = $(element);

        if (!$element.hasClass('type_buffer_msg')) {
            return;
        }

        var content = $element.find('.content').html();
        if (content) {
            var newcontent = content.replace(/(?:^|[^\w])(\/(u|r)\/\w+)/g, ' <a href="https://www.reddit.com$1" target="_blank">$1</a>');

            $element.find('.content').html(newcontent);
            $element.find('.content').addClass('userscript');
        }
    });

    // when changing channels also insert /u/ and /r/ links as well as dismissing the read buffer.
    $body.on('click', 'li.buffer', function() {
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


    //////// irc markdown ////////
    /*
	***bold italic***
	**bold**
	*italic*
	~underline~
	^03color^  <--The number is a color code (user 00 till 15)
	^03,06colorbackground^ <-- same as above but with a background 
    */
    $body.on('keyup', function(e) {
        $checkbox = $body.find('.markdown:visible');
        var checkboxChecked = $body.find('.markdown:visible:checked').length;

        if (e.ctrlKey && e.keyCode == 81) {
            if (checkboxChecked) {
                $checkbox.prop("checked", false);
                checkboxChecked = false;
            } else {
                $checkbox.prop("checked", true);
                checkboxChecked = true;
            }
        }
    });

    $body.delegate('[id^=bufferInputView]:visible', 'click', function() {
        var $this = $(this);
        var $checkbox = $this.closest('form').find('.markdown');
        if (!$checkbox.length) {
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


    //////// Hide inactive ////////
    var delay = 1000,
        enabled = false,
        stickies = JSON.parse(localStorage['IRCC.stickies'] || '[]'),
        hideInactive = JSON.parse(localStorage['IRCC.hideInactive'] || 'false'),
        intId;

    $('#sidebar').prepend('<div id="buffersFooter" style="display: block;"><p><a class="tb-hide-inactive" href="javascript:;" style="text-align: center;"><span class="icon"></span>hide inactive</a></p></div>');

    // wait for chann list to load
    setTimeout(function() {
        $('li.buffer a.buffer').each(function() {
            var $this = $(this),
                checked = (stickies.indexOf($this.prop('title')) !== -1);

            $this.after('<input type="checkbox" class="tb-sticky-chan" style="float: right;"' + (checked ? ' checked' : '') + '/></input>');
        });

        if (hideInactive) {
            toggleInactive();
        }
    }, 5000);

    $body.on('click', '.tb-sticky-chan', function() {
        var $this = $(this),
            name = $this.prev().attr('title');

        if ($this.prop('checked')) {
            stickies.push(name);
        } else {
            var idx = stickies.indexOf(name);
            if (idx !== -1) {
                stickies.splice(idx, 1);
            }
        }

        localStorage['IRCC.stickies'] = JSON.stringify(stickies);
        console.log(stickies);
    });

    function hideInactiveChanns() {
        $('ul.buffers .active:not(.unread)').each(function() {
            var $this = $(this);

            if (stickies.indexOf($this.find('a.buffer').prop('title')) === -1) {
                $this.hide();
            }
        });

        $('ul.buffers .active.unread').show();
        $('ul.buffers .active.selected').show(); // always show the chann we're in.
    }

    function toggleInactive() {
        var $this = $('.tb-hide-inactive');

        if (!enabled) {
            // don't show other clutter.
            $('.archiveToggle.show').hide();
            $('.disconnected').hide();
            $('#addNetwork').hide();
            $('#reorderNetworks.show').hide();

            $this.text('show all');
            intId = setInterval(hideInactiveChanns, delay);
            hideInactiveChanns();
        } else {
            $('.archiveToggle.show').show();
            $('.disconnected').show();
            $('#addNetwork').show();
            $('#reorderNetworks.show').show();

            $this.text('hide inactive');
            clearInterval(intId);
            $('ul.buffers .active:not(.unread)').show();
        }

        //save it
        enabled = !enabled;
        localStorage['IRCC.hideInactive'] = JSON.stringify(enabled);
    }

    $body.on('click', '.tb-hide-inactive', function() {
        toggleInactive();
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
