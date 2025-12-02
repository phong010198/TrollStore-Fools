const version = 'V1.0.2';

function setHeaderValue(e, a, d) {
    var r = a.toLowerCase();
    if (r in e) {
        e[r] = d;
    } else {
        e[a] = d;
    }
}

var modifiedHeaders = $request.headers;

setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

$done({
    headers: modifiedHeaders
});