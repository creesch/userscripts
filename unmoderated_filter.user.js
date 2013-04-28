var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name Reddit unmoderated filter
// @namespace redditunmoderated
// @description Some various changes to reddit
// @include http://www.reddit.com/r/mod/about/unmoderated*
// @include http://*.reddit.com/r/mod/about/unmoderated*
// @include http://reddit.com/r/mod/about/unmoderated*
// @version 1.1
// ==/UserScript==
 
 
function unmoderatedfilter() {
 
//
// Enter the subs below
//
var filtersubs=["technology"];
   
   
if( location.pathname.match(/\/about\/(?:unmoderated)\/?/) ){
    $('<li><a href="javascript:;"  class="test-on">filter</a></li>').appendTo('#header-bottom-left').click(filter);
}
 
function filter(){
   
    $('.thing').each(function() {
   
    var subname = $(this).children('.entry').children('.tagline').children('a.subreddit').text();
 
    if ($.inArray(subname, filtersubs) != -1) {
    $(this).css('display', 'none');
    }
 
 
        });
 
    }
	

function addScroll()
{
$("body").append("<p id=\\"loading\\" style=\\"display:none;position: fixed; bottom: 10px; font-size: large; background: none repeat scroll 0% 0% red;\\">Loading</p>");
(function($){
		$.fn.endlessScroll = function(options){
		
		var defaults = {
			bottomPixels: 50,
			fireOnce: true,
			fireDelay: 150,
			loader: "<br />Loading...<br />",
			data: "",
			insertAfter: "div:last",
			resetCounter: function(){ return false; },
			callback: function(){ return true; },
			ceaseFire: function(){ return false; }
		};
		
		var options = $.extend(defaults, options);
		var firing       = true;
		var fired        = false;
		var fireSequence = 0;
		if(options.ceaseFire.apply(this) === true)
		{
			firing = false;
		}
		
		if (firing === true)
		{
			$(window).scroll(function(){
				if ($(document).height() - $(window).height() <= $(window).scrollTop() + options.bottomPixels)
				{
					if ((options.fireOnce == false || (options.fireOnce == true && fired != true)))
					{
						if(options.resetCounter.apply(this) === true)
						{
							fireSequence = 0;
						}
						
						fired = true;
						fireSequence++;
						$(options.insertAfter).after("<div id=\\"endless_scroll_loader\\">" + options.loader + "</div>");
						if (typeof options.data == "function")
						{
							data = options.data.apply(this);
						}
						else
						{
							data = options.data;
						}
						if (data !== false)
						{
							$("div#endless_scroll_loader").remove();
							$(options.insertAfter).after("<div id=\\"endless_scroll_data\\">" + data + "</div>");
							$("div#endless_scroll_data").hide().fadeIn();
							$("div#endless_scroll_data").removeAttr("id");
							var args = new Array();
							args[0] = fireSequence;
							options.callback.apply(this, args);
							if (options.fireDelay !== false || options.fireDelay !== 0)
							{
								
								$("body").after("<div id=\\"endless_scroll_marker\\"></div>");
								$("div#endless_scroll_marker").fadeTo(options.fireDelay, 1, function(){
									$(this).remove();
									fired = false;
								});
							}
							else
							{
								fired = false;
							}
						}
					}
				}
			});
		}
	};
	})(jQuery);
var working=true;
$(document).endlessScroll({
				bottomPixels: 450,
				fireDelay: 10,
				callback: function(p){
			$("#loading").show();
if(working)
{working=false;			
$.get($("p.nextprev a[rel$=next]")[0].href,
function(data)
{$("[id=siteTable]:last").append($(data).find("[id=siteTable]:last").html());
$("p.nextprev a[rel$=next]")[0].href=$(data).find("p.nextprev a[rel$=next]")[0].href;
working=true;$("#loading").hide();
});
}}
			});
}
if($("p.nextprev a[rel$=next]").length>0)
addScroll();	
	
   
}
 
// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + unmoderatedfilter.toString() + ')();';
    document.head.appendChild(s)
});
