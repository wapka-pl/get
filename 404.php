PAGE IS NOT EXISTING
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<hr/><br>";
echo('REQUEST_URI');
var_dump($_SERVER['REQUEST_URI']);
echo "<hr/><br>";
echo('GET');
var_dump($_GET);
//die;
$safe_pages = ["json", "b64", "script", "js"];
echo "only this is possible: " . implode(" ", $safe_pages);
exit();
