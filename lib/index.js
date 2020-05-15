(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    var BASE;
    (function (BASE) {
        BASE[BASE["TWO"] = 2] = "TWO";
        BASE[BASE["TEN"] = 10] = "TEN";
    })(BASE = exports.BASE || (exports.BASE = {}));
    var UNITS = (_a = {},
        _a[BASE.TWO] = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
        _a[BASE.TEN] = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        _a);
    function toFixed(value, n) {
        var m = Math.pow(10, n);
        return Math.round(value * m) / m;
    }
    function parseBytes(value, base) {
        if (base === void 0) { base = BASE.TEN; }
        var bytes = Number(value);
        var absValue = Math.abs(bytes);
        var step = base === BASE.TWO
            ? 1024 // Math.pow(2, 10)
            : 1000; // Math.pow(10, 3)
        if (!Number.isFinite(absValue)) {
            throw new TypeError("value can not be used as a finite number");
        }
        var i;
        if (absValue === 0)
            i = 0;
        else {
            i =
                base === BASE.TWO
                    ? Math.floor(Math.log2(absValue) / 10)
                    : Math.floor(Math.log10(absValue) / 3);
        }
        var j = Math.min(i, UNITS[base].length - 1);
        var v = toFixed(absValue / Math.pow(step, j), 2);
        return {
            value: absValue === 0 ? 0 : v * (value / absValue),
            unit: UNITS[base][j],
        };
    }
    exports.parseBytes = parseBytes;
    function readableBytes(bytes, base) {
        if (base === void 0) { base = BASE.TEN; }
        var _a = parseBytes(bytes, base), value = _a.value, unit = _a.unit;
        return value + " " + unit;
    }
    exports.default = readableBytes;
});
