<?php

// https://get.wapka.pl/json.php?1

$filename = key($_GET);
if($filename === integer){
    echo file_get_contents( $filename . "/" . "jloads.json");
}
//var_dump($_GET);
