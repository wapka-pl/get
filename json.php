<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

// https://get.wapka.pl/json.php?1
// https://get.wapka.pl/json/1
// https://get.wapka.pl/1.json
include_once('header/json.php');

$dir    = '.';
$dirs = scandir($dir);

$filename = (int) key($_GET);
if(in_array($filename, $dirs)){
    echo file_get_contents( $filename . "/" . "jloads.json");
}
exit();