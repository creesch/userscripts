// ==UserScript==
// @name       irccloud enhancement toolbox
// @namespace  http://www.reddit.com/r/creesch
// @version    0.80
// @description  do stuff on irccloud!
// @match      http://*.irccloud.com/*
// @match      https://*.irccloud.com/*
// @include      http://*.irccloud.com/*
// @include      https://*.irccloud.com/*
// @downloadURL https://raw.github.com/creesch/userscripts/master/irccloud.user.js
// ==/UserScript==
function main() {
    var $body = $('body');

    jQuery.fn.scrollTo = function (elem) {
        $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top - 50);
        return this;
    };


    function compareTime(a, b) {
        if (a.time < b.time)
            return -1;
        else if (a.time > b.time)
            return 1;
        else
            return 0;
    }
    //
    //
    //
    // Do not remove the colored nick stuff, needed for stuff inserted later on.
    // The /r/history mod room is linked with discord through a bot. Some of the stuff below makes that look less ugly.
    //
    //
    function clean_nick(nick) {
        // attempts to clean up a nickname
        // by removing alternate characters from the end
        // nc_ becomes nc, avidal` becomes avidal

        nick = nick.toLowerCase();

        // typically ` and _ are used on the end alone
        nick = nick.replace(/[`_]+$/, '');

        // remove |<anything> from the end
        nick = nick.replace(/|.*$/, '');

        return nick;
    }

    function hash(nick) {
        var cleaned = clean_nick(nick);
        var h = 0;

        for(var i = 0; i < cleaned.length; i++) {
            h = cleaned.charCodeAt(i) + (h << 6) + (h << 16) - h;
        }

        return h;

    }


    function get_color(nick) {
        var nickhash = hash(nick);

        // get a positive value for the hue
        var deg = nickhash % 360;
        var h = deg < 0 ? 360 + deg : deg;

        // default L is 50
        var l = 50;

        // half of the hues are too light, for those we
        // decrease lightness
        if(h >= 30 && h <= 210) {
            l = 30;
        }

        // keep saturation above 20
        var s = 20 + Math.abs(nickhash) % 80;

        return `hsl(${h},${s}%,${l}%)`;

    }

    var discordLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAANlBMVEUAAAD///////////////////////////////////////////////////////////////8AAADx3eDuAAAAEXRSTlMABAIDAQsMDQ4REAoPBgUHCM7XMEMAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAcElEQVQY041PRw6AMAxLV0YH5P+vxSkgccSHyHEdyyX6hZRjlvSstTUWVWHmugW1B910++2DuBpfYUCYZnMx+ALTSuU2WidaoMeeI4IKNdCTHL43QePtMBOXHqsjaaGg2ES7GvFSokh2vyu75z8fvQBvOATdxBiIWAAAAABJRU5ErkJggg==';
    //
    //
    //
    //

    function escapeHTML(html) {
        //create a in-memory div, set it's inner text(which jQuery automatically encodes)
        //then grab the encoded contents back out.  The div never exists on the page.
        return $('<div/>').text(html).html();
    }
    // CSS STUFFS (that isn't the actual theme)

    $('head').append(`<style>
						input.tb-sticky-chan {
							float: left;
							margin-top: 5px;
							margin-left: 4px;
						}
                       table.shortcuts th {
							vertical-align: top;
                       }
                       div#tb-pingmenu {
                            display: none;
                            top: 40px;
                            bottom: inherit;
                            left: inherit;
                            right: 10px;
                            width: initial;
                            padding: 5px;
                        }
                        a.tb-ping-count {
                            margin-left: 7px;
                            font-weight: bold;
                        }
                        div#tb-pingmenu li:hover {
                            text-decoration: underline;
                            cursor: pointer;
                        }
                        span.content .code-block {
                            border: solid 1px #545454;
                            padding: 2px;
                            color: gray;
                            display: inline-block;
                            width: 98%;
                        }
                     </style>`);

    // ADD HTML STUFFS
    $body.find('.shortcuts').before(`<table class="shortcuts">
    <tbody>
        <tr class="heading">
               <th>Script stuffs!</th>
               <td></td>
        </tr>
        <tr>
            <th><kbd>&lt;Ctrl&gt;</kbd> + <kbd>Q</kbd></th>
            <td>Turn markdown on or off</td>
        </tr>
        <tr>
            <th><kbd>*italic*</kbd></th>
            <td>Makes stuff <i>italic</i></td>
        </tr>
        <tr>
            <th><kbd>**bold**</kbd></th>
            <td>Makes stuff <b>bold</b></td>
        </tr>
        <tr>
            <th><kbd>~underline~</kbd></th>
            <td>Makes stuff <u>underlined</u></td>
        </tr>
        <tr>
            <th><kbd>^03color^ </kbd></th>
            <td>The number is a color code </td>
        </tr>
        <tr>
            <th><kbd>^03,06colorbackground^</kbd></th>
            <td>same as above but with a background</td>
        </tr>
        <tr>
            <th><kbd>color codes</kbd></th>
            <td>
                <ol start="0" style="list-style-type: decimal-leading-zero; margin-left: 45px;">
                    <li style="color: #FFF; background-color: #000;">White</li>
                    <li style="color: #000;">Black</li>
                    <li style="color: #000080;">Blue (Navy)</li>
                    <li style="color: #008000;">Green</li>
                    <li style="color: #F00;">Red</li>
                    <li style="color: #A52A2A;">Brown (Maroon)</li>
                    <li style="color: #800080;">Purple</li>
                    <li style="color: #FFA500;">Orange</li>
                    <li style="color: #FFA500;">Yellow</li>
                    <li style="color: #0F0;">Light Green (Lime)</li>
                    <li style="color: #008080;">Teal (Green/Blue Cyan)</li>
                    <li style="color: #0FF;">Light Cyan (Cyan) (Aqua)</li>
                    <li style="color: #00F;">Light Blue (Royal)</li>
                    <li style="color: #F0F;">Pink (Light Purple) (Fuchsia)</li>
                    <li style="color: #808080;">Grey</li>
                    <li style="color: #C0C0C0;">Light Grey (Silver)</li>
                </ol>
            </td>
        </tr>
    </tbody>
</table>`);


    //////// subreddit and user linking ////////
    // NOW ALSO WITH PING BACKLOG
    var pingLog = {};
    $(document).on('DOMNodeInserted', function (e) {
        $('#limits').remove(); //because it gets replaced every time.

        var element = e.target,
            $element = $(element);

        if (!$element.hasClass('type_buffer_msg')) {
            return;
        }

        var content = $element.find('.content').html();
        if (content) {

            if ($element.attr('data-name') === 'h_d') {
                //console.log(content);
                var userDiscordName = content.match(/^&lt;(.*?)&gt;/)[1];
                var $userDiscordName = $(userDiscordName);
                $userDiscordName.addClass('buffer bufferLink author user');
                $userDiscordName.prepend(`<img style="vertical-align:text-top" src="${discordLogo}">&nbsp;`);
                $userDiscordName.css('color', get_color($userDiscordName.text()));

                content = content.replace(/^(&lt;.*?&gt; ?)/, '');

                $element.find('.authorWrap .author').replaceWith($userDiscordName);

            }
            let $contentLine = $element.find('.content');

            $element.find('.content').contents().filter(function() {
                return this.nodeType == 3;
            }).each(function(){
                var $this = $(this);
                const thistextContent = $(this).text().replace(/(?:^|[^\w])(\/(u|r)\/\w+)/g, ' <a class="link" href="https://www.reddit.com$1" target="_blank">$1</a>');
                const $replaceNode = $(`<span>${thistextContent}</span>`);
                $this.replaceWith($replaceNode);
            });

            //var newcontent = content.replace(/(?:^|[^\w])(\/(u|r)\/\w+)/g, ' <a class="link" href="https://www.reddit.com$1" target="_blank">$1</a>');
            //newcontent = newcontent.replace(/```(.*?)```/g, '<div class="code-block"><code>$1</code></div>');
            if ($element.hasClass('highlight')) {

                var highlightChannel = $element.closest('.buffercontainer').find('.bufferlabel').text();
                var highlightText = $element.text();
                var highlightID = $element.attr('id');
                var highlightTime = $element.attr('data-time');
                //console.log('highlight: ' + highlightText);

                if (!pingLog.hasOwnProperty(highlightChannel)) {
                    pingLog[highlightChannel] = [];
                }
                pingLog[highlightChannel].push({
                    id: highlightID,
                    text: escapeHTML(highlightText),
                    time: highlightTime
                });

                var $pingCount = $element.closest('.buffercontainer').find('.tb-ping-count span');
                var pingValue = $pingCount.text();
                $pingCount.text(parseInt(pingValue, 10) + 1);
                //console.log(pingLog);

            }

            $contentLine.addClass('userscript');


        }
    });

    // when changing channels also insert /u/ and /r/ links as well as dismissing the read buffer.
    // Also do more line stuff
    function doLineStuff() {

        if (!$('.buffercontainer:not(.buffercontainer--hidden)').find('.tb-ping-count').length) {
            $('.buffercontainer:not(.buffercontainer--hidden) .bufferstatus .status .buttons').append('<a href="javascript:;" class="tb-ping-count"><i class="tb-ping-icon">!</i><span>0</span></a>');
        }
        $('.type_buffer_msg.chat').each(function () {
            var $this = $(this);
            var $thisContent = $this.find('.content');
            // console.log($thisContent);
            var content = $thisContent.html();
            if (!$this.hasClass('userscript') && content) {


                if ($this.attr('data-name') === 'h_d') {
                    //console.log(content);
                    var userDiscordName = content.match(/^&lt;(.*?)&gt;/)[1];
                    var $userDiscordName = $(userDiscordName);
                    $userDiscordName.addClass('buffer bufferLink author user');
                    $userDiscordName.prepend(`<img style="vertical-align:text-top" src="${discordLogo}">&nbsp;`);
                    $userDiscordName.css('color', get_color($userDiscordName.text()));

                    content = content.replace(/^(&lt;.*?&gt; ?)/, '');

                    $this.find('.authorWrap .author').replaceWith($userDiscordName);

                }


                $thisContent.contents().filter(function() {
                    return this.nodeType == 3;
                }).each(function(){
                    var $this = $(this);
                    const thistextContent = $(this).text().replace(/(?:^|[^\w])(\/(u|r)\/\w+)/g, ' <a class="link" href="https://www.reddit.com$1" target="_blank">$1</a>');
                    const $replaceNode = $(`<span>${thistextContent}</span>`);
                    $this.replaceWith($replaceNode);
                });


                // Let's log highlights
                if ($thisContent.closest('.type_buffer_msg').hasClass('highlight')) {

                    var highlightChannel = $this.closest('.buffercontainer').find('.bufferlabel').text();
                    var highlightText = $this.closest('.type_buffer_msg').text();
                    var highlightID = $this.closest('.type_buffer_msg').attr('id');
                    var highlightTime = $this.closest('.type_buffer_msg').attr('data-time');


                    if (!pingLog.hasOwnProperty(highlightChannel)) {
                        pingLog[highlightChannel] = [];
                    }

                    pingLog[highlightChannel].push({
                        id: highlightID,
                        text: escapeHTML(highlightText),
                        time: highlightTime
                    });


                    var $pingCount = $this.closest('.buffercontainer').find('.tb-ping-count span');
                    var pingValue = $pingCount.text();
                    $pingCount.text(parseInt(pingValue, 10) + 1);
                }

                $this.addClass('userscript');


            }
        });
    }

    // Let's wait for the bufferstuff to be ready.
    function waitForBufferReady() {


        if ($('#buffersContainer').is(':visible')) {
            doLineStuff();
            $('#container').append('<div id="tb-pingmenu" class="contextMenu"> NONE YOU ARE NOT POPULAR! </div>');
        } else {
            console.log('[CN] BufferContainer is not ready...');
            window.setTimeout(function () {
                waitForBufferReady();
            }, 100);
        }
    }

    waitForBufferReady();

    $body.on('click', 'a.tb-ping-count', function () {
        var $this = $(this);
        var channelName = $this.closest('.bufferstatus').find('.label').text();
        var $pingMenu = $body.find('#tb-pingmenu');

        if (pingLog.hasOwnProperty(channelName)) {
            var pinglist = pingLog[channelName];



            pinglist.sort(compareTime);
            $pingMenu.html('<ul></ul>');
            $.each(pinglist, function (key, val) {
                $pingMenu.append(`<li data-lineID="${val.id}">${val.text}</li>`);
                //console.log(val);
            });
        } else {
            $pingMenu.text('NONE YOU ARE NOT POPULAR!');
        }


        // Silly, but keeps the buffer from expanding or contracting as e.stopPropagation() doesn't work.
        $this.closest('.status').click();


        if ($pingMenu.is(':visible')) {
            $pingMenu.hide();
        } else {
            $pingMenu.show();
        }

    });

    $body.on('click', '#tb-pingmenu li', function () {
        $body.find('#tb-pingmenu').hide();
        var scrollToId = $(this).attr('data-lineid');
        $('.buffercontainer:not(.buffercontainer--hidden) .scroll').scrollTo(`#${scrollToId}`);
        $(`#${scrollToId}`).fadeOut(1000).fadeIn(1000);
    });


    $body.on('click', 'li.buffer', function () {
        $body.find('#tb-pingmenu').hide();
        doLineStuff();

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
    $body.on('keyup', function (e) {
        let $checkbox = $body.find('.markdown:visible');
        var checkboxChecked = $body.find('.markdown:visible:checked').length;

        if (e.ctrlKey && e.keyCode == 81) {
            if (checkboxChecked) {
                $checkbox.prop('checked', false);
                checkboxChecked = false;
            } else {
                $checkbox.prop('checked', true);
                checkboxChecked = true;
            }
        }
    });

    $body.delegate('[id^=bufferInputView]:visible', 'click', function () {
        var $this = $(this);
        var $checkbox = $this.closest('form').find('.markdown');
        if (!$checkbox.length) {
            $this.after('<input type="checkbox" class="markdown" name="markdown" value="markdown" checked>');
            $this.css({
                'width': 'calc(100% - 15px)',
                'display': 'inline-block'
            });
        }

        $this.on('keydown', function (e) {
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
        STICKY_KEY = 'IET.stickies',
        HIDDEN_KEY = 'IET.hideInactive',
        stickies = JSON.parse(localStorage[STICKY_KEY] || '[]'),
        hideInactive = JSON.parse(localStorage[HIDDEN_KEY] || 'false'),
        STYLE = 'style="padding: 5px 7px 0px 5px;"',
        intId;

    $('#sidebar').prepend(`<ul class="bufferList" ${STYLE}><p class="archiveToggle show tb-dont-hide" style="display: block;"><button class="tb-hide-inactive">hide inactive</button></p></ul>`);

    // wait for chann list to load
    setTimeout(function () {
        $('li.buffer:not(.deferred) span.buffer').each(function () {
            var $this = $(this),
                name = $this.prop('title'),
                network = $this.closest('.connection').find('span.label:first').text();


            $this.before(`<input type="checkbox" class="tb-sticky-chan" style="display: none" ${IsStickChannel(name, network) ? 'checked' : ' '}/>`);
        });

        $('.accountMenu__items-list:first').append('<li><a href="javascript:;" id="tb-select-sticky">Sticky chans</a></li>');
        if (hideInactive) {
            toggleInactive();
        }

        // DON'T FUCKING DOX ME EVERY TIME I TAKE A SCREENSHOT, ASSHOLES.
        $('.accountMenu__email').text($('#settingsName').val());
    }, 5000);

    $body.on('click', '#tb-select-sticky', function () {
        $body.find('.tb-sticky-chan').toggle();
    });

    function IsStickChannel(name, network) {
        var count = stickies.filter(function (sticky) {
            return sticky.channelName === name && sticky.networkName === network;
        });

        return (count.length == !0);
    }

    $body.on('click', '.tb-sticky-chan', function () {
        var $this = $(this),
            name = $this.next('.buffer').attr('title'),
            network = $this.closest('.connection').find('span.label:first').text(),
            networkChannel = {channelName: name, networkName: network};


        console.log(name);
        console.log(network);
        console.log(networkChannel);

        if ($this.prop('checked')) {

            if (!IsStickChannel(name, network)) {
                stickies.push(networkChannel);
            }

        } else {
            stickies.some(function (sticky, index) {
                if (sticky.channelName === name && sticky.networkName === network) {
                    stickies.splice(index, 1);
                }
            });
        }

        localStorage[STICKY_KEY] = JSON.stringify(stickies);
        console.log(stickies);
    });

    function hideInactiveChanns() {
        $('ul.buffers:not(.deferred) .active:not(.unread)').each(function () {
            var $this = $(this),
                name = $this.find('span.buffer').prop('title'),
                network = $this.closest('.connection').find('span.label:first').text();


            if (!IsStickChannel(name, network)) {
                $this.hide();
            }

            if ($this.hasClass('activeBadge')) $this.show();
        });

        $('ul.buffers .active.unread').show();
        $('ul.buffers .active.selected').show(); // always show the chann we're in.
    }

    function toggleInactive() {
        var $this = $('.tb-hide-inactive');

        if (!enabled) {
            // don't show other clutter.
            $('.archiveToggle.show:not(.tb-dont-hide)').hide();
            $('.disconnected').hide();
            $('#addNetwork').hide();
            $('#reorderNetworks.show').hide();

            $this.text('show all');
            intId = setInterval(hideInactiveChanns, delay);
            hideInactiveChanns();
        } else {
            $('.archiveToggle.show:not(.tb-dont-hide)').show();
            $('.disconnected').show();
            $('#addNetwork').show();
            $('#reorderNetworks.show').show();

            $this.text('hide inactive');
            clearInterval(intId);
            $('ul.buffers .active:not(.unread)').show();
        }

        //save it
        enabled = !enabled;
        localStorage[HIDDEN_KEY] = JSON.stringify(enabled);
    }

    $body.on('click', '.tb-hide-inactive', function () {
        toggleInactive();
    });
}


function inject(fn) {
    'use strict';

    function waitloop(fn) {
        var has_session = typeof(window.SESSION) !== 'undefined';
        var has_jquery = typeof(window.jQuery) !== 'undefined';

        if (has_jquery === false || has_session === false) {
            console.log('[CN] Resources are not ready...');
            window.setTimeout(function () {
                waitloop(fn);
            }, 100);
            return;
        }

        console.log('[CN] Required resources are ready, calling plugin function.');
        fn();
    }

    var wrap = `(${fn.toString()})`;

    console.log('[CN] Injecting wrapper script.');
    var script = document.createElement('script');
    script.textContent += `(${waitloop.toString()})(${wrap});`;
    document.body.appendChild(script);
    console.log('[CN] Done injecting wrapper script.');

}
inject(main);
