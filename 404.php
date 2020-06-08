PAGE IS NOT EXISTING
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

var_dump($_SERVER['REQUEST_URI'], $_GET);
//die;
$safe_pages = ["json", "script", "js"];
echo "only this is possible: " . implode(" ", $safe_pages);
