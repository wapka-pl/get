<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// https://get.wapka.pl/json.php?1

$filename = key($_GET);
if($filename === integer){
    echo file_get_contents( $filename . "/" . "jloads.json");
}
//var_dump($_GET);
