<?php

if(!empty($_SERVER['HTTP_ORIGIN'])){
    $http_origin = $_SERVER['HTTP_ORIGIN'];
} else {
    //var_dump( $_SERVER );
    //$http_origin = $_SERVER['HTTP_REFERER'];
    $http_origin = 'http://' . $_SERVER['HTTP_HOST'];
}

header("Access-Control-Allow-Origin: $http_origin");

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Expose-Headers: Content-Length, X-JSON');
header('Access-Control-Max-Age: 86400');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, X-Auth-Token , Authorization, Access-Control-Allow-Headers, Access-Control-Expose-Headers, Access-Control-Allow-Methods');
header('Content-Type: text/javascript');
