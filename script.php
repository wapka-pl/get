<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// https://get.wapka.pl/script.php?1


if(!empty($_SERVER['HTTP_ORIGIN'])){
    $http_origin = $_SERVER['HTTP_ORIGIN'];
} else {
    //var_dump( $_SERVER );
    //$http_origin = $_SERVER['HTTP_REFERER'];
    $http_origin = 'http://' . $_SERVER['HTTP_HOST'];
}

header("Access-Control-Allow-Origin: $http_origin");

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Expose-Headers: Content-Length, X-JSON');
header('Access-Control-Max-Age: 86400');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, X-Auth-Token , Authorization, Access-Control-Allow-Headers, Access-Control-Expose-Headers, Access-Control-Allow-Methods');
header('Content-Type: text/javascript');



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
    echo file_get_contents( "loadAll.js");
}

