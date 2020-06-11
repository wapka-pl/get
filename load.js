const JLOADS_VERSION='1.0.3';
// load.js
if (typeof log !== 'function') {

    var print_log = function (arguments) {
        var str = ':: ';
        for (var i in arguments) {
            str += arguments[i];
            str += ', ';
        }
        console.log(str);
        return str;
    }
    var log = function () {
        return print_log(arguments);
        // arguments[0] === 'Load' || print_log();
    }

}

if (typeof err !== 'function') {

    var print_error = function (arguments) {
        var str = ':: ';
        for (var i in arguments) {
            str += arguments[i];
            str += ', ';
        }
        console.error(str);
        return str;
    }
    var err = function () {
        return print_error(arguments);
        // arguments[0] === 'Load' || print_log();
    }

}

// PUBLIC
var elem = document.body;

var mapFunction = {
    'js': 'js',
    'css': 'css',
    'css2': 'css',
    'css3': 'css',
    'png': 'img',
    'bmp': 'img',
    'jpg': 'img',
    'gif': 'img',
    'htm': 'html',
    'html': 'html',
    'html5': 'html'
}

log('exist?','getFileExtension');
/**
 *
 * @param filename
 * @returns {string}
 */
function getFileExtension(filename) {
    return filename.split("?")[0].split("#")[0].split('.').pop();
}

log('exist?','getFunctionName');
/**
 *
 * @param url
 * @param map
 * @returns {*}
 */
function getFunctionName(url, map) {
    const f = 'getFunctionName';

    var ext = getFileExtension(url)
    log(f, ' url ', url);
    log(f, ' map ', map);
    var result = map[ext];

    if (isEmpty(result)) {
        throw new Error('key or Value Is Empty or Key not exits in Map');
    }
    return result;
}

log('exist?','loadAll');
/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
function loadAll(json, success, error, mapFunction) {
    const f = 'loadAll';

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            log('loadAll loaded ', data);
        };
        error = function (data) {
            err('loadAll !loaded ', data);
        };
    }

    if (typeof mapFunction !== 'object') {
        // Configuration
        mapFunction = {
            'js': 'js',
            'css': 'css',
            'css2': 'css',
            'css3': 'css',
            'png': 'img',
            'bmp': 'img',
            'jpg': 'img',
            'gif': 'img',
            'htm': 'html',
            'html': 'html',
            'html5': 'html'
        }
    }
    log(' loadAll', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


    var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    log('loadAll getOne ', ' elem ', elem, !isEmpty(elem));

    var jloads = new Load(elem, success, error);

    if (Object.keys(json).length === 1) {
        var i = Object.keys(json)[0];
        getOne(jloads, json[i], i, mapFunction, success, error)
    } else {
        for (var i in json) {
            var object = json[i];
            getOne(jloads, object, i, mapFunction, success, error)
        }
    }
    // success(json);

    return jloads;
}

log('exist?',' getOne');
/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 */
function getOne(jloads, object, i, mapFunction, success, error) {
    const f = 'loadAll getOne';

    log(f, ' jloads.getTarget() ', jloads.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (i === 'head' || !isEmpty(jloads.getTarget())) {
    log(f, ' object i ', object, i);
    if (i === 'head') {
        loadContentByUrls(jloads, object, mapFunction, success, error);
        success(jloads.getTarget());
    } else if (i === 'body') {
        log(f, ' wait for body i ', i);
        log(f, ' wait for body target ', jloads.getTarget());
        document.addEventListener("DOMContentLoaded", function () {
            ReadyHtml(object, i, mapFunction, success, error);
        });
    } else {
        log(f, ' wait for element i ', i);
        log(f, ' wait for element target ', jloads.getTarget());

        try {
            // set up the mutation observer
            var observer = new MutationObserver(function (mutations, me) {
                // `mutations` is an array of mutations that occurred
                // `me` is the MutationObserver instance
                // var canvas = document.getElementById('my-canvas');
                var canvas = document.querySelectorAll(i)[0] || document.querySelectorAll(i)
                if (canvas) {
                    // callback executed when canvas was found
                    ReadyHtml(object, i, mapFunction, success, error);
                    me.disconnect(); // stop observing
                    return;
                }
            });

            // start observing
            observer.observe(document, {
                childList: true,
                subtree: true
            });

        } catch (e) {
            // log(f, ' ERROR elem ', elem);
            log(f, ' getOne ERROR e ', e);
            error(e);
        }
    }
    // error(elem);
}

log('exist?',' loadContentByUrls');
/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
function loadContentByUrls(jloads, object, mapFunction, success, error) {

    const f = 'loadAll loadContentByUrls';

    log(f, ' isArray object, elem, mapFunction', object, isArray(object), mapFunction);

    if (isArray(object)) {
        var url = '';
        for (var id in object) {
            log(f, ' isArray', ' id ', id);
            url = object[id];
            log(f, ' isArray', ' url ', url);

            if (typeof url === 'string') {
                try {
                    const funcName = getFunctionName(url, mapFunction);
                    log(f, ' funcName ', funcName);
                    // log(funcName, url, elem);
                    jloads[funcName](url);
                    success(url);
                } catch (e) {
                    // log(f, ' ERROR elem ', elem);
                    log(f, ' ERROR e ', e);
                    error(e);
                }

                // jloads.js([url]);
                // elem.appendChild(url, funcName);
            }
        }
    } else {
        log(f, ' isArray ERROR object', object);
        error(object);
    }
}

log('exist?','ReadyHtml');
/**
 *
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 * @returns {*}
 * @constructor
 */
function ReadyHtml(object, i, mapFunction, success, error) {
    const f = 'loadAll ReadyHtml';

    log(f, ' i ', i);
    var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    log(f, ' elem ', elem);

    var jloads = new Load(elem, success, error);

    if (!isEmpty(elem)) {
        loadContentByUrls(jloads, object, mapFunction, success, error);
        success(elem);
    } else {
        waitForElementToDisplay(i, 200, function (i){
            var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
            var jloads = new Load(elem, success, error);
            loadContentByUrls(jloads, object, mapFunction, success, error);
        });
        // error(elem);
    }
}

log('exist?','waitForElementToDisplay');
/**
 *
 * @param selector
 * @param time
 * @param callback
 * @returns {*}
 */
function waitForElementToDisplay(selector, time, callback) {
    const f = 'waitForElementToDisplay';
    log(f, ' selector ', selector);
    if (document.querySelector(selector) != null) {
        // alert("The element is displayed, you can put your code instead of this alert.")
        return callback(selector);
    } else {
        setTimeout(function () {
            waitForElementToDisplay(selector, time, callback);
        }, time);
    }
}
// xhr.js
/**
 * @returns {boolean}
 */
function getXHRObject() {
    var xhrObj = false;
    try {
        xhrObj = new XMLHttpRequest();
    } catch (e) {
        var progid = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
            'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        for (var i = 0; i < progid.length; ++i) {
            try {
                xhrObj = new ActiveXObject(progid[i]);
            } catch (e) {
                continue;
            }
            break;
        }
    } finally {

        return xhrObj;
    }
}
// is-empty.js
/**
 *
 * @param val
 * @returns {boolean}
 */
function isEmpty(val) {
    return val == null ||
        typeof val === 'undefined' ||
        (typeof val === 'string' && val.length < 1) ||
        (typeof val === 'object' &&
            (
                !(
                    (typeof val.innerText !== 'undefined' && val.innerText.length !== 0) ||
                    (typeof val.innerHTML !== 'undefined' && val.innerHTML.length !== 0)
                )
                &&
                (Object.keys(val).length === 0)
            )
        )
        // (typeof val !== 'boolean')
        ;
}

//
// function isEmpty(obj) {
//     for (var prop in obj) {
//         if (obj.hasOwnProperty(prop)) {
//             return false;
//         }
//     }
//
//     return JSON.stringify(obj) === JSON.stringify({});
// }
// has-domain.js
/**
 * @param url
 * @returns {boolean}
 */
var hasDomain = function (url) {
    return url.indexOf('//') === 0 || url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
}
//time.js
var time = Date.now || function () {
    return +new Date;
};
// get-target.js
if (typeof log !== 'function') {
    const log = console.log;
}

/**
 *
 * @param target
 * @returns {HTMLHeadElement}
 */
function getTarget(target) {
    const f = 'getTarget';

    // log(f, ' target ', target);
    if (isEmpty(target)) {
        target = document.getElementsByTagName('head')[0];
        log(f, ' isEmpty HEAD ', target, typeof target, target.innerHTML !== 'undefined',  target.innerHTML.length, Object.keys(target));
        if (isEmpty(target)) {
            target = document.body;
            log(f, ' isEmpty BODY ', target);
        }
    }
    log(f, ' target: ', target);

    return target;
}
// e.js
if (typeof log !== 'function') {
    const log = console.log;
}

if (typeof warning !== 'function') {
    var warning = err;
}
/**
 *
 * @param selector
 * @param area
 * @param error
 * @param success
 * @returns {E}
 * @constructor
 */
var E = function (selector, area, error, success) {



    this.cfg = {};
    this.cfg.area = document;
    this.cfg.selector = selector;
    this.cfg.exist = false;


    this.success = function (elem) {
        log(this.constructor.name, " Element func success(): ", elem);
    };

    this.error = function (elem) {
        warning(this.constructor.name, "! Element func error(): ", elem);
    };

    if (typeof this.cfg.selector !== 'string') {
        warning(this.constructor.name, "! Element selector: ", elem);
    }

    if (typeof success === 'function') {
        this.success = success;
    }

    if (typeof error === 'function') {
        this.error = error;
    }

    var self = this;


    self.selector = function (selector) {
        self.cfg.selector = selector;
        return self;
    }

    self.first = function (error, success) {
        if (typeof success !== 'function') {
            success = self.success;
        }
        if (typeof error !== 'function') {
            error = self.error;
        }
        if (typeof self.cfg.selector !== 'string') {
            self.cfg.exist = false;
            error();
        }
        const elem = document.querySelector(self.cfg.selector);

        log(this.constructor.name, ' first self.cfg.selector ', self.cfg.selector);
        log(this.constructor.name, ' first elem ', elem);

        if (elem !== null) {
            self.cfg.exist = true;
            success(elem);
            return elem;
        } else {
            self.cfg.exist = false;
            error();
        }

        return elem;
    }

    self.all = function (error, success) {
        if (typeof success !== 'function') {
            success = self.success;
        }
        if (typeof error !== 'function') {
            error = self.error;
        }

        const elem = document.querySelectorAll(self.cfg.selector);

        log(this.constructor.name, ' all self.cfg.selector ', self.cfg.selector);
        log(this.constructor.name, ' all elem ', elem);

        if (elem !== null) {
            self.cfg.exist = true;
            success(elem);
        } else {
            self.cfg.exist = false;
            error(elem);
        }

        return elem;
    }

    return self;
};
// include-script.js
/**
 *
 * @param url
 * @param target
 * @param success
 * @param error
 * @returns {HTMLScriptElement}
 */
function includeScript(url, target, success, error) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.defer = 'defer';
    // scriptTag.async = 'async';
    scriptTag.type = 'text/javascript';

    scriptTag.onerror = error;
    scriptTag.onload = success;
    scriptTag.onreadystatechange = success;

    return getTarget(target).appendChild(scriptTag);
}
// include-style.js
/**
 *
 * @param url
 * @param target
 * @param success
 * @param error
 * @returns {HTMLLinkElement}
 */
function includeStyle(url, target, success, error) {
    var link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';

    link.onerror = error;
    link.onload = success;
    link.onreadystatechange = success;

    return getTarget(target).appendChild(link);
}
// TODO: replce path to id name and check if ID exist
// FASTEST loading:
// https://www.oreilly.com/library/view/even-faster-web/9780596803773/ch04.html
// include-html.js
if (typeof log !== 'function') {
    const log = console.log;
}

/**
 *
 * @param url
 * @param target
 * @param replace
 * @param success
 * @param error
 * @returns {includeHtml|boolean}
 */
function includeHtml(url, target, replace, success, error) {
    const f = 'includeHtml';
    if (typeof replace === 'number' && replace === 1) {
        replace = true;
    }

    if (typeof success !== 'function') {
        success = function () {
            log(f, ' success ', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            log(f, ' error ', "Page not found.");
        }
    }
    log(f, ' url ', url);

    if (url) {
        /* Make an HTTP request using the attribute value as the url name: */
        var xhrObj = getXHRObject();
        // xhrObj.setRequestHeader("Content-Type","text/html; charset=UTF-8");
        // xhrObj.setRequestHeader("Content-Type","multipart/form-data; boundary=something");
        xhrObj.onreadystatechange = function () {

            log(f, ' getXHRObject target: ', target);

            if (this.readyState == 4) {
                // document.onload =
                loadHtmlByStatus(this.status, this.responseText, target, success, error);

                /* Remove the attribute, and call this function once more: */
                // includeHtml(url, success, error);
            }
        }
        xhrObj.open("GET", url, true);
        // xhrObj.responseType = 'text';
        xhrObj.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhrObj.send();
        /* Exit the function: */
        return this;
    }
    return false;

}

function loadHtmlByStatus(status, responseText, target, success, error) {
    const f = 'loadHtmlByStatus';

    log(f, ' includeHtml waiting for DOM tree ', target, getTarget(target));

    if (status == 200) {
        log(f, ' includeHtml loaded HTML: ', responseText, target, getTarget(target));
        getTarget(target).insertAdjacentHTML('beforeend', responseText);
        return success(this);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "includeHtml Page not found.";
        return error(this, status);
    }
    return error(this);
}
// include-image.js
if (typeof log !== 'function') {
    const log = console.log;
}
/**
 *
 * @param url
 * @param target
 * @param replace
 * @param success
 * @param error
 * @returns {boolean|*}
 */
const includeImage = function (url, target, replace, success, error) {
    const f = 'includeImage';

    log(f, ' includeImg url: ', url);
    // JLOADS_DEBUG || log('el', el);

    let img = new Image;
    img.onload = function () {
        log(f, "include Image onload url: ", url);
        log(f, "include Image replace: ", replace);

        if (typeof replace === 'number' && replace === 1) {
            replace = true;
        }
        // JLOADS_DEBUG || log('typeof self.cfg.replace', typeof self.cfg.replace);
        log(f, "include Image replace: ", replace);


        if (replace) {
            log(f, 'includeImage elmnt firstChild: ', elmnt.firstChild);
            elmnt.removeChild(elmnt.firstChild);
            // let element = document.getElementById("top");
            // while (element.firstChild) {
            //     element.removeChild(element.firstChild);
            // }
        }
        getTarget(target).appendChild(img);
    };

    return img.src = url;  // erst nach dem Event Listener!
}
// load.js
if (typeof log !== 'function') {
    const log = console.log;
}
/**
 * @param target
 * @param success
 * @param error
 * @returns {Load}
 * @constructor
 */
var Load = function (target, success, error) {

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        throw new TypeError('Object success called on non-object');
    }

    this.success = success;
    this.error = error;


    this.cfg = {};
    this.cfg.env = {};
    this.cfg.env_id = 0;
    this.cfg.domain = {};
    this.cfg.target = target;
    this.cfg.delay = 0;
    this.cfg.cache = 1;
    this.cfg.replace = 0;


    var self = this;


    this.env = function (domain, name, callback) {
        self.cfg.env_id++;
        self.cfg.env[self.cfg.env_id] = {};
        self.cfg.env[self.cfg.env_id]['domain'] = domain;
        self.cfg.env[self.cfg.env_id]['name'] = name;
        self.cfg.env[self.cfg.env_id]['exist'] = callback;

        return self;
    };

    self.hasEnv = function () {
        return typeof self.cfg.env === 'object' && typeof self.cfg.env[1] !== 'undefined';
    };

    self.hasDomain = function () {
        return !isEmpty(self.getDomain());
    };

    self.getEnv = function (url) {
        log(this.constructor.name, '.getEnv() url: ', url);

        if (hasDomain(url)) {
            log(this.constructor.name, ' url has now own domain: ', url);
            return {
                'domain': ''
            };
        }
        if (self.hasEnv()) {
            log(this.constructor.name, ' url has env:', self.cfg.env);
            for (var index in self.cfg.env) {
                if (self.cfg.env.hasOwnProperty(index)) {
                    log(this.constructor.name, '.getEnv() function check: ', self.cfg.env[index]['name']);

                    var callback = self.cfg.env[index]['exist'];
                    if (typeof callback === 'function' && callback(self)) {
                        log(this.constructor.name, '.getEnv() url use env: ', self.cfg.env[index]['name']);
                        return self.cfg.env[index];
                    }
                }
            }
        }
        if (self.getDomain()) {
            log(this.constructor.name, '.getEnv() cfg domain exist ', self.cfg.domain);
            return {
                'domain': self.getDomain()
            };
        }

        // Has own domain ENV OR DOMAIN not exist
        return {
            'domain': ''
        };
    };

    // this.getEnvById = function (env_id) {
    //
    //     if (typeof self.cfg.env !== 'function' && (typeof self.cfg.env !== 'object' || self.cfg.env === null)) {
    //         throw new TypeError('Object self.cfg.env called on non-object');
    //     }
    //
    //     return self.cfg.env[env_id];
    // };


    self.getDomain = function () {
        // log(this.constructor.name, '.getDomain() self.cfg.domain',
        //     self.cfg.domain, typeof self.cfg.domain === 'object' , Object.keys(self.cfg.domain).length === 0);

        if (isEmpty(self.cfg.domain)) {
            log(this.constructor.name, '.getDomain() isEmpty');
            return false;
        }

        for (var index in self.cfg.domain) {

            log(this.constructor.name, '.getDomain() function check: ', index, self.cfg.domain);
            return self.cfg.domain[index];
/*
            if (self.cfg.domain.hasOwnProperty(index)) {
                console.log('self.cfg.', self.cfg, self.cfg.domain, index);
                // var callback = self.cfg.domain[index]['exist'];
                // if (typeof callback === 'function' && callback()) {
                //     log(this.constructor.name, '.getDomain() url use env:', self.cfg.domain[index]);
                return self.cfg.domain[index];
                // }
            }
            */

        }
        log(this.constructor.name, '.getDomain() for not');
        return false;
    };

    self.addDomain = function (domain, id) {
        var obj = {}
        if (isEmpty(id)) {
            id = time();
        }
        obj[id] = domain;
        Object.assign(self.cfg.domain, obj);

        log(this.constructor.name, '.addDomain() cfg domain', self.cfg.domain);
        log(this.constructor.name, '.addDomain() cfg getDomain()', self.getDomain());

        // self.cfg.domain = domain;
        return self;
    };

    self.domain = function (domain, id) {
        return self.addDomain(domain, id);
    };



    self.target = function (target) {
        self.cfg.target = target;
        return self;
    };
    self.getTarget = function () {
        return self.cfg.target;
    };

    self.delay = function (delay) {
        self.cfg.delay = delay;
        return this;
    };


    self.cache = function (cache) {
        self.cfg.cache = cache;
        return self;
    };
    self.cacheOff = function () {
        self.cfg.cache = 0;
        return self;
    };
    self.cacheOn = function () {
        self.cfg.cache = 1;
        return self;
    };
    self.hasCache = function () {
        return typeof self.cfg.cache === 'number' && self.cfg.cache !== 1;
    };
    self.getSuffix = function () {
        var suffix = '';
        if (self.hasCache()) {
            suffix = '?' + time();
        }
        return suffix;
    };
    self.getEnvDomain = function (url) {
        return self.getEnv(url).domain;
    };
    self.getEnvUrl = function (url) {
        return self.getEnvDomain(url) + url + self.getSuffix();
    };


    self.replace = function (replace) {
        self.cfg.replace = replace;
        return self;
    };
    self.replaceOff = function () {
        self.cfg.replace = 0;
        return self;
    };
    self.replaceOn = function () {
        self.cfg.replace = 1;
        return self;
    };


    self.loadJs = function (url, target, success, error) {

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                log(this.constructor.name, ' js url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                log(this.constructor.name, ' js script_url ', script_url);

                try {
                    if (last) {
                        var exe = includeScript(script_url, target, success, error);
                    } else {
                        var exe = includeScript(script_url, target);
                    }
                    log(this.constructor.name, ' js ', script_url, exe);
                } catch (err) {
                    err('! js ', script_url, err);
                    error();
                }
            }
        } else {
            includeScript(self.getEnvUrl(url), target, success, error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };
    self.js = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    log(this.constructor.name, ' js delayed ', self.cfg.delay, url);
                    self.loadJs(url, self.cfg.target, self.success, self.error);
                },
                self.cfg.delay
            );
        } else {
            log(this.constructor.name, ' js url ', url);
            self.loadJs(url, self.cfg.target, self.success, self.error);
        }
        return self;
    };
    self.javascript = self.js;
    self.script = self.js;


    self.loadCss = function (url, target, success, error) {

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);

            for (var i in url) {
                // log(this.constructor.name, ' url:', url, i, url[i]);

                var script_url = self.getEnvUrl(url[i]);
                log(this.constructor.name, ' loadCss script_url ', script_url);

                try {
                    var exe = includeStyle(script_url, target, success, error);
                    log(this.constructor.name, ' loadCss exe ', exe);
                } catch (err) {
                    err('!load CSS ', script_url, err);
                }
            }
        } else {
            includeStyle(self.getEnvUrl(url), target, success, error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };

    self.css = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    log(this.constructor.name, ' css delayed ', self.cfg.delay, url);
                    self.loadCss(url, self.cfg.target, self.success, self.error);
                },
                self.cfg.delay
            );
        } else {
            log(this.constructor.name, ' css loaded ', url);
            self.loadCss(url, self.cfg.target, self.success, self.error);
        }
        return self;
    };
    self.style = self.css;



    self.html = function (url) {
        log(this.constructor.name, ' self.cfg.delay ', self.cfg.delay);

        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    log(this.constructor.name, ' html delayed ', self.cfg.delay, url);
                    self.loadHtml(url);
                },
                self.cfg.delay
            );
        } else {
            log(this.constructor.name, ' html url ', url);
            self.loadHtml(url);
        }
        return self;
    };

    self.loadHtml = function (url) {
        log(this.constructor.name, ' self.cfg.target ', self.cfg.target);

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                log(this.constructor.name, ' html url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                log(this.constructor.name, ' html script_url ', script_url);

                try {
                    // if (last) {
                        var exe = includeHtml(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // } else {
                    //     var exe = includeHtml(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // }
                    log(this.constructor.name, ' html ', script_url, exe);
                } catch (err) {
                    err('! html ', script_url, err);
                    error();
                }
            }
        } else {
            includeHtml(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };



    self.img = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    log(this.constructor.name, ' image delayed', self.cfg.delay, url);
                    self.loadImage(url);
                },
                self.cfg.delay
            );
        } else {
            log(this.constructor.name, ' image loaded ', url, self.cfg.delay);
            self.loadImage(url);
        }
        return self;
    };

    self.loadImage = function (url, target, replace, success, error) {

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);

            for (var i in url) {

                var script_url = self.getEnvUrl(url[i]);
                log(this.constructor.name, ' img url[i]', url[i]);

                try {
                    var exe = includeImage(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    log(this.constructor.name, ' img ', script_url, exe);
                } catch (err) {
                    err('! img ', script_url, err);
                }
            }
        } else {
            includeImage(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }
        return self;
    };



    return self;
};
// is-array.js
/**
 *
 * @param val
 * @returns {boolean}
 */
function isArray(val) {
    return val !== null ||
        (typeof val === 'object' && Object.keys(val).length > 0)
        ;
}
