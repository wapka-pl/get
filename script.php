<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// https://get.wapka.pl/script.php?1

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
    echo "loadAll(json, success, error)";
}

