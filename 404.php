PAGE NOT EXIST
<?php
var_dump($_SERVER['REQUEST_URI'], $_GET);
die;

$safe_pages = ["json", "script", "js"];
echo "only this is possible: " . implode(" ", $safe_pages);
