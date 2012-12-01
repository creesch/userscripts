// ==UserScript==
// @name Reddit de clutter
// @namespace redditdeclutter
// @description Somechanges to reddit
// @include http://reddit.com/*
// @include https://reddit.com/*
// @include http://*.reddit.com/*
// @include https://*.reddit.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version dev
// @grant GM_addStyle
// ==/UserScript==

GM_addStyle((<><![CDATA[
.link.odd {
    overflow:hidden !important;
    margin:0px !important;
    padding:5px !important;
    border:1px solid #EAEAEA !important;
	border-bottom:0px !important;
    background-color:#FAFAFA !important;    
}

.link.even {
    overflow:hidden !important;
    margin:0px !important;
    padding:5px !important;
    border:1px solid #EAEAEA !important;
	border-bottom:0px !important;
    background-color:#f5f5f5 !important;    
}


.thumbnail{
    height:50px !important;

}
.thumbnail img{
    max-height:50px !important;

}


.link .tagline {
    opacity: 0.5 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
    
    margin-left:20px !important;
}

.link .tagline:hover {
    opacity: 1 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
    
    margin-left:20px !important;
} 

.link .flat-list.buttons {
    opacity: 0.5 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
    
    margin-left:20px !important;

  }
.link .flat-list.buttons:hover {
    opacity: 1 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
    
    margin-left:20px !important;

}

.link .midcol {
    opacity: 0.2 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
}

.link .midcol:hover .score {
    opacity: 0.2 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
}

.link .midcol:hover {
    opacity: 0.8 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
}

.link .midcol:hover .score {
    opacity: 0.3 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
}

.side:hover {
    opacity: 1 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
}

.side {
    opacity: 0.6 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
}

.link .thumbnail {
    opacity: 0.6 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
}

.link:hover .thumbnail {
    opacity: 1 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
}

.link .rank {
    display:none;
}


]]></>).toString());

