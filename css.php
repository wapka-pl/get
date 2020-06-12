var css = '<?php GLOBAL $css; echo $css; ?>';
var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
// This is required for IE8 and below.
style.styleSheet.cssText = css;
} else {
style.appendChild(document.createTextNode(css));
}



