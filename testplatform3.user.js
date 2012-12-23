// ==UserScript==
// @name        testplatform3
// @namespace   testplatform3
// @include http://reddit.com/*
// @include https://reddit.com/*
// @include http://*.reddit.com/*
// @include https://*.reddit.com/*
// @require http://www.garbage-bag.nl/reddit/sticky.js
// @version     3
// ==/UserScript==

function testplatform() {
$.sticky('The page has loaded!');

function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
 }
 
 function htmlDecode(value){
  return $('<div/>').html(value).text();
}
    // toolbar
	$('.footer-parent').prepend('<div id="dcbottombar" class="">settings here <a href="#" id="pnotifiytester"><click me!</a></div>');
	
	
var lastreply = localStorage.getItem('highlightsetting') || '9999999999999999999';

$(document).on('click', '#dcbottombar', function() {
$.sticky('I can do popups!');
	});
	
function dcgetmessages() {
$.getJSON('http://www.reddit.com/message/unread.json', function(json) { 
 if (json.data.children=='') {
console.log('nope');
} else { 
console.log('yup');
for (var i in json.data.children ) { 
console.log(htmlDecode(json.data.children[i].data.body_html));
 var lastmessage = htmlDecode(json.data.children[i].data.body_html);
	
$.sticky(lastmessage);

}

}
});
}
var timer = setInterval(dcgetmessages, 60000);
dcgetmessages();



    // Load the mandatory stylesheet from Github
    $("<link/>", {
        rel: "stylesheet",
        href: "http://www.garbage-bag.nl/reddit/dcstyles.css"
    }).appendTo("head");

	
}


// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + testplatform.toString() + ')();';
    document.head.appendChild(s)
});