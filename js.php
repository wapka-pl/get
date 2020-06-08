<?php
// https://get.wapka.pl/js.php?1
// https://get.wapka.pl/js/1
// https://get.wapka.pl/1.js
include_once('header/js.php');

$dir    = '.';
$dirs = scandir($dir);

$filename = (int) key($_GET);
echo $filename;

if(in_array($filename, $dirs)){
//    echo file_get_contents( "//load.jloads.com/load.js");
    echo file_get_contents( "load.js");
    echo "var json =";
    echo file_get_contents( $filename . "/" . "jloads.json");
    echo ";";
    echo file_get_contents( "debug.js");
    echo file_get_contents( "loadAll.js");
}

