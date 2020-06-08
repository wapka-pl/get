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

function downloadFromJson($jsonfile, $filter = 'js')
{
    $json_string = file_get_contents($jsonfile);
//    var_dump($json_string);
    $json_array = json_decode($json_string, true);
    foreach ($json_array as $tag => $list) {
//        var_dump($tag, $list);
        foreach ($list as $id => $url) {
            $info = pathinfo($url);
//            var_dump($info);
            if ($info["extension"] === $filter) {
                $url_base64 = base64_encode($url);
                $path = 'pack' . DIRECTORY_SEPARATOR . $url_base64 . '.txt';

                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                echo $data = curl_exec($ch);
                curl_close($ch);

                file_put_contents($path, $data);
            }
        }
    }
}

function loadFromJson($jsonfile, $filter = 'js')
{
    $json_string = file_get_contents($jsonfile);
//    var_dump($json_string);
    $json_array = json_decode($json_string, true);
    $data = '';
    foreach ($json_array as $tag => $list) {
//        var_dump($tag, $list);
        foreach ($list as $id => $url) {
            $info = pathinfo($url);
//            var_dump($info);
//            $_SERVER['DOCUMENT_ROOT']
            $path = realpath('.');
            if ($info["extension"] === $filter) {
                $url_base64 = base64_encode($url);
                $path .= DIRECTORY_SEPARATOR . 'pack' . DIRECTORY_SEPARATOR . $url_base64 . '.txt';
                echo $path;
//                echo $data = ' // ' . $url;
                echo $data .= file_get_contents($path);
//                echo $data .= get_include_contents($path);
            }
        }
    }
    return $data;
}

function removeFromJson($jsonfile, $filter = 'js')
{
    $json_string = file_get_contents($jsonfile);
//    var_dump($json_string);
    $json_array = json_decode($json_string, true);
    $data = '';
    foreach ($json_array as $tag => $list) {
//        var_dump($tag, $list);

        foreach ($list as $id => $url) {

            $info = pathinfo($url);
//            var_dump($info);
            if ($info["extension"] === $filter) {
                unset($json_array[$tag][$id]);
            }
        }
    }

    return json_encode($json_array);
}

$dir = '.';
$dirs = scandir($dir);
//var_dump($_GET);
$filename = (int)key($_GET);
if (in_array($filename, $dirs)) {

    echo "//  https://get.wapka.pl/$filename.pack.js \n";

//    echo file_get_contents( "//load.jloads.com/load.js");
    echo file_get_contents("load.js");

    downloadFromJson($filename . "/" . "jloads.json", 'js');
    echo loadFromJson($filename . "/" . "jloads.json", 'js');

    echo "var json =";
    echo removeFromJson($filename . "/" . "jloads.json", "js");
//    echo file_get_contents( $filename . "/" . "jloads.json");
    echo ";";
    echo file_get_contents("debug.js");
    echo file_get_contents("loadAll.js");
}
exit();