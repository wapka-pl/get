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
$filename = $_SERVER['REQUEST_URI'];
$filename = replace_first("index.php", "", $filename);
$filename = replace_first("/", "", $filename);
#split the path by '/'

$params = explode('.', $filename);
$id = $_GET[$params[0]] = $params[0];
//var_dump($id, $filename, $params, $_GET);
//die;
$safe_pages = ["json", "script", "pack.js", "js", "b64"];
//$last_key = count($params) - 1;
//$extension = $params[$last_key];
$extension = replace_first($id . ".", "", $filename);
if (strlen($extension) > 20 && strpos($extension, 'b64/') !== false) {
    $params = explode('b64/', $extension);
    $_GET['b64'] = $params[1];
//    var_dump($extension);
//    var_dump($_GET);
    include("base64.php");
}
//ewogICJoZWFkIjogWwogICAgIi8vY29kZS5qcXVlcnkuY29tL3VpLzEuMTIuMS9qcXVlcnktdWkubWluLmpzIiwKICAgICIvL3N0YWNrcGF0aC5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjQuMS9jc3MvYm9vdHN0cmFwLm1pbi5jc3MiLAogICAgIi8vY29kZS5qcXVlcnkuY29tL2pxdWVyeS0zLjUuMS5taW4uanMiLAogICAgIi8vc3RhY2twYXRoLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzQuNC4xL2pzL2Jvb3RzdHJhcC5taW4uanMiLAogICAgIi8vbG9hZC5qbG9hZHMuY29tL2Nzcy9waW5rLmNzcyIKICBdLAogICIjaW1hZ2UiOiBbCiAgICAiLy9sb2dvLmpsb2Fkcy5jb20vNi9jb3Zlci5wbmciCiAgXQp9
//die;
if (in_array($extension, $safe_pages)) {
    include($extension . ".php");
} else {
    include("404.php");
}