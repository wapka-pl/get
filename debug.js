// filtering logs source
var print_log = function (arguments) {
    var str = 'LOG: ';
    for (var i in arguments) {
        str += arguments[i];
    }
    console.log(str);
    return str;
}
var log = function () {
    // console.log(arguments);
    print_log(arguments);
    // arguments[0] === 'Load' || print_log();
}
