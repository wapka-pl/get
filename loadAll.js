var success = function (data) {
    if (typeof data.target !== 'undefined' && typeof data.target.src !== 'undefined') {
        // js
        console.log('SUCCESS loaded', data.target.src);
    } else if (typeof data.responseURL !== 'undefined') {
        // html
        console.log('SUCCESS loaded', data.responseURL);
    } else {
        // others
        console.log('SUCCESS loaded', data);
    }
};

var error = function (data) {
    console.error('!loaded', data);
};

loadAll(json, success, error);