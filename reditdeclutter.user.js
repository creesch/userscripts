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
./*HEADER SECTION*/
#header{

-webkit-border-radius: 3px !important;
-moz-border-radius: 3px !important;
border-radius: 3px !important;

} 

/* Content */

.link.odd {
    overflow:hidden !important;
    margin:0px !important;
    padding:5px !important;
    border:1px solid #EAEAEA !important;
	border-bottom:0px !important;
    background-color:#FAFAFA !important;
    
    min-height: 70px;
    position: relative !important;


}

.link.even {
    overflow:hidden !important;
    margin:0px !important;
    padding:5px !important;
    border:1px solid #EAEAEA !important;
	border-bottom:0px !important;
    background-color:#f5f5f5 !important;    
    min-height: 70px;
    position: relative !important;
}


.link .tagline {

    margin-left:25px !important;

    opacity: 0.5 !important;
    -moz-transition-property : opacity; /* FireFox */
    -webkit-transition-property : opacity; /* Safari / Chrome */
    -o-transition-property : opacity; /* Opera */
    transition-property : opacity; /* W3C */
    
    
    -moz-transition-duration : 0.4s; /* FireFox */
    -webkit-transition-duration :  0.4s; /* Safari / Chrome */
    -o-transition-duration :  0.4s; /* Opera */
    transition-duration :  0.4s; /* W3C */
 

}

.link .tagline:hover {

    margin-left:25px !important;
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
    
    margin-left:25px !important;

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
    
    margin-left:25px !important;

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

.link.last-clicked {
    background: rgba(255,255,255,0.5) !important;
}

    .link a.thumbnail {
        margin-right: 12px !important;
        width: 60px !important;
        max-height: 50px !important;

    }

        .link .thumbnail  {
            border: 3px solid #FFF !important;
            box-shadow: rgba(0,0,0,0.2) 0 0 8px !important;
            position: absolute !important;
            right: 0px !important;
        }
 
        a.madeVisible {
            border: 3px solid #FFF !important;
            box-shadow: rgba(0,0,0,0.2) 0 0 8px !important;
        }

        .thing .title.loggedin {
            color: #369 !important;
            font-size: 18px !important;
            line-height: 22px !important;
            text-indent: 155px;
            text-shadow: #FFF 0 1px 0 !important;
            transition: 0.5s ease all;
        }

p.title {
width: 90%;
}

/* 
.side:hover {
    opacity: 1 !important;
    -moz-transition-property : opacity; 
    -webkit-transition-property : opacity; 
    -o-transition-property : opacity; 
    transition-property : opacity; 
    
    
    -moz-transition-duration : 0.4s; 
    -webkit-transition-duration :  0.4s; 
    -o-transition-duration :  0.4s; 
    transition-duration :  0.4s; 
}

.side {
    opacity: 0.6 !important;
    -moz-transition-property : opacity; 
    -webkit-transition-property : opacity; 
    -o-transition-property : opacity; 
    transition-property : opacity; 
    
    
    -moz-transition-duration : 0.4s; 
    -webkit-transition-duration :  0.4s; 
    -o-transition-duration :  0.4s; 
    transition-duration :  0.4s; 
}
 */
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



/* TEST  */


.side {
background: url('http://i.imgur.com/b3YJ3.png') 0px 0px no-repeat !important;

display: block !important;
padding: 5px !important;
margin-top: 3px !important;
height: 100% !important;
}

.side:hover * {
opacity: 1 !important;

    -moz-transition-property : opacity; 
    -webkit-transition-property : opacity; 
    -o-transition-property : opacity; 
    transition-property : opacity; 
      
    -moz-transition-duration : 0.5s; 
    -webkit-transition-duration :  0.5s; 
    -o-transition-duration :  0.5s; 
    transition-duration :  0.5s; 

	}

.side * {
opacity: 0 !important;

    -moz-transition-property : opacity; 
    -webkit-transition-property : opacity; 
    -o-transition-property : opacity; 
    transition-property : opacity; 
      
    -moz-transition-duration : 0.5s; 
    -webkit-transition-duration :  0.5s; 
    -o-transition-duration :  0.5s; 
    transition-duration :  0.5s; 

}

.side:hover{

background-image: none !important;
background: rgba(255, 255, 255, 0.9) !important;
border: 1px solid #bbb !important;
-webkit-border-radius: 3px !important;
-moz-border-radius: 3px !important;
border-radius: 3px !important;
display: block !important;
margin-top: 3px !important;
padding: 5px !important;

}

ul.content { 
margin-left: 2px !important;
margin-right: 2px !important;
}




]]></>).toString());

