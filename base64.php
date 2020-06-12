<?php
// https://get.wapka.pl/js.php?1
// https://get.wapka.pl/js/1
// https://get.wapka.pl/1.js
include_once('header/js.php');

function get_include_contents($filename)
{
    if (is_file($filename)) {
        ob_start();
        include($filename);
        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }
    return false;
}

function saveUrlFile($url)
{
    $url_base64 = base64_encode($url);
    $path = 'pack' . DIRECTORY_SEPARATOR . $url_base64 . '.txt';

    echo "\n //" . $path;
    echo "\n //" . file_exists($path);

    if (file_exists($path)) {
        return true;
    }

    $url_info = parse_url($url);
    $download = $url;
    if (empty($url_info['scheme'])) {
        $download = 'https:' . $url;
    }
    echo "\n //" . $download;

    $ch = curl_init($download);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $data = curl_exec($ch);
    curl_close($ch);

    file_put_contents($path, $data);
}

function loadUrlFile($url, $data = '')
{
    $url_base64 = base64_encode($url);
    $path = realpath('.');
    $path .= DIRECTORY_SEPARATOR . 'pack' . DIRECTORY_SEPARATOR . $url_base64 . '.txt';
//    echo $path;
//                echo $data = ' // ' . $url;
    $data .= "\n";
    $data .= " // $url \n";
    $data .= file_get_contents($path);
//                echo $data .= get_include_contents($path);
    return $data;
}

function downloadFromJsonArray($json_array, array $filter = ['js'])
{
//    var_dump($json_array);
//    die;
    foreach ($json_array as $tag => $list) {
//        var_dump($tag, $list);
        foreach ($list as $id => $url) {
            $info = pathinfo($url);
//            var_dump($info);
            if (in_array($info["extension"], $filter)) {
                saveUrlFile($url);
            }
        }
    }
}

function loadFromJsonArray(array $json_array, array $filter = ['js'])
{
    $data = '';
    foreach ($json_array as $tag => $list) {
//        var_dump($tag, $list);
        foreach ($list as $id => $url) {
            $info = pathinfo($url);
//            var_dump($info);
//            $_SERVER['DOCUMENT_ROOT']
            if (in_array($info["extension"], $filter)) {
                $data = loadUrlFile($url, $data);
            }
        }
    }
    return $data;
}

function removeFromJsonFile($jsonfile, $filter = 'js')
{
    $json_string = file_get_contents($jsonfile);
//    var_dump($json_string);
    $json_array = json_decode($json_string, true);
//    var_dump('removeFromJsonFile',$json_array);
//    die;
    $json_array = removeFromJsonArray($json_array, $filter);

    return json_encode($json_array, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}


function removeFromJsonArray(array $json_array, array $filter = ['js'])
{
//    var_dump('removeFromJsonArray',$json_array);
//    die;
    foreach ($json_array as $tag => $list) {
//        var_dump($tag, $list);
        $taglist = [];
        foreach ($list as $id => $url) {

            $info = pathinfo($url);
//            var_dump($info);
            if (in_array($info["extension"], $filter)) {
//                unset($json_array[$tag][$id]);
            } else {
                $taglist[] = $json_array[$tag][$id];
            }
        }
        $json_array[$tag] = $taglist;
    }
    return $json_array;
}

//http://localhost/base64.php?b64=ICAgICAgICB7CiAgICAgICAgICAgICJib2R5IiA6IFsKICAgICAgICAgICAgICAgICJodHRwczovL2xvZ28uamxvYWRzLmNvbS82L2NvdmVyLnBuZyIKICAgICAgICAgICAgICAgICJodHRwczovL2FwcC53YXBrYS5wbC9odG1sL2NyZWF0ZS5odG1sIiwKICAgICAgICAgICAgICAgICJodHRwczovL2FwcC53YXBrYS5wbC9qcy9jcmVhdGUuanMiCiAgICAgICAgICAgIF0KICAgICAgICB9
//http://localhost/base64.php?b64=ICAgICAgICB7CiAgICAgICAgICAgICJib2R5IiA6IFsKICAgICAgICAgICAgICAgICJodHRwczovL2xvZ28uamxvYWRzLmNvbS82L2NvdmVyLnBuZyIsCiAgICAgICAgICAgICAgICAiaHR0cHM6Ly9hcHAud2Fwa2EucGwvaHRtbC9jcmVhdGUuaHRtbCIsCiAgICAgICAgICAgICAgICAiaHR0cHM6Ly9hcHAud2Fwa2EucGwvanMvY3JlYXRlLmpzIgogICAgICAgICAgICBdCiAgICAgICAgfQ==

if (empty($_GET['b64'])) {
    include("404.php");
}

$json_base64 = $_GET['b64'];
//var_dump($json_base64);
$json_string = base64_decode($json_base64);

// clean white spaces
//$json_string = preg_replace('/\s\s+/', ' ', $json_string);
$json_string = preg_replace('/\s+/', '', $json_string);
echo "// $json_string \n";
//var_dump($json_string);
//die;
//$json_array = json_decode($json_string);
$json_array = json_decode($json_string, true);

if (empty($json_array)) {
    echo "JSON FORMAT PROBLEM";
    die;
}
//$json_array = json_decode($json_string, true);
//var_dump($json_array);
//die;
//function isJson(){
//
//}

$dir = '.';
$dirs = scandir($dir);
//var_dump($_GET);

echo "//  https://get.wapka.pl/b64 \n";
//echo file_get_contents("debug.js");
//    echo file_get_contents( "//load.jloads.com/load.js");
echo file_get_contents("load.js");
echo "\n";


echo "var json =";
$json_array_without_js = removeFromJsonArray($json_array, ['js', 'css']);
echo json_encode($json_array_without_js, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
echo ";";
echo "\n";

echo file_get_contents("loadAll.js");

//$jsonfile = $filename . "/" . "jloads.json";
//$json_string = file_get_contents($jsonfile);
//$json_array = json_decode($json_string, true);

downloadFromJsonArray($json_array, ['js']);
echo loadFromJsonArray($json_array, ['js']);
echo "\n";

downloadFromJsonArray($json_array, ['css']);
$css = loadFromJsonArray($json_array, ['css']);
$css = str_replace('"', "'", $css);
echo "\n";
require("css.php");
echo "\n";

exit();