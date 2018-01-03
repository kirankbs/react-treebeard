"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sequence = exports.Option = exports.EqOption = exports.None = exports.Some = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Some = exports.Some = function Some(x) {
    return {
        map: function map(f) {
            return Some(f(x));
        },
        flatMap: function flatMap(f) {
            return f(x);
        },
        fold: function fold(ifEmpty, f) {
            return f(x);
        }
    };
};

var None = exports.None = {
    map: function map(f) {
        return None;
    },
    flatMap: function flatMap(f) {
        return None;
    },
    fold: function fold(ifEmpty, f) {
        return ifEmpty();
    }
};

var EqOption = exports.EqOption = function EqOption(x, y) {
    return (0, _stringify2.default)(x.fold(function (_) {}, function (_) {
        return _;
    })) === (0, _stringify2.default)(y.fold(function (_) {}, function (_) {
        return _;
    }));
};

var Option = exports.Option = function Option(x) {
    return x === undefined || x === null ? None : Some(x);
};

var sequence = exports.sequence = function sequence(listOfOptions) {
    return Option(listOfOptions.reduce(function (a, b) {
        return b.fold(function (_) {
            return a;
        }, function (x) {
            return [].concat((0, _toConsumableArray3.default)(a), [x]);
        });
    }, []));
};