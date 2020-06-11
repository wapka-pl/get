// get.wapka.pl / debug.js
var print_log = function (arguments) {
    var str = 'GLOG: ';
    for (var i in arguments) {
        str += arguments[i];
    }
    console.log(str);
    return str;
}
var jlogs = function () {
    print_log(arguments);
}
