<?php

// https://get.wapka.pl/json.php?1
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function replace_first($needle, $replace, $haystack)
{
    $newstring = $haystack;
    $pos = strpos($haystack, $needle);
    if ($pos !== false) {
        $newstring = substr_replace($haystack, $replace, $pos, strlen($needle));
    }
    return $newstring;
}


#remove the directory path we don't want
//$request = $_SERVER['REQUEST_URI'];
//$request = str_replace("/", "", $_SERVER['REQUEST_URI']);
$filename = replace_first("/", "", $_SERVER['REQUEST_URI']);
#split the path by '/'

$params = explode('.', $filename);
$id = $_GET[$params[0]] = $params[0];
//var_dump($request, $params, $_GET);
//die;
$safe_pages = ["json", "script", "pack.js", "js"];
//$last_key = count($params) - 1;
//$extension = $params[$last_key];
$extension = replace_first($id . ".", "", $filename);
if (in_array($extension, $safe_pages)) {
    include($extension . ".php");
} else {
    include("404.php");
}