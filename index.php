<?php
// https://get.wapka.pl/json.php?1
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
var_dump($_SERVER['REQUEST_URI']);
die;
#remove the directory path we don't want
$request  = str_replace("/envato/pretty/php/", "", $_SERVER['REQUEST_URI']);

#split the path by '/'
$params     = split("/", $request);
$safe_pages = array("json", "script", "thread");

if(in_array($params[0], $safe_pages)) {
    include($params[0].".php");
} else {
    include("404.php");
}