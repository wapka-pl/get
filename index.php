<?php
// https://get.wapka.pl/json.php?1

$dir    = '.';
$dirs = scandir($dir);

$filename = (int) key($_GET);
if(in_array($filename, $dirs)){
    echo file_get_contents( $filename . "/" . "jloads.json");
}
