(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Lijn = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || from);
    }

    var Lijn = /** @class */ (function () {
        function Lijn(text, width) {
            if (width === void 0) { width = 6; }
            this.text = text;
            this.width = width;
            this.sequence = Lijn.getSequence(Lijn.getCode(this.text));
            this.boxes = Lijn.getGrid(this.sequence, this.width);
            this.VLines = Lijn.getVLines(this.boxes);
            this.HLines = Lijn.getHLines(this.boxes);
        }
        Lijn.getCharCode = function (char) {
            if (char in Lijn.charCodes)
                return Lijn.charCodes[char];
            return Lijn.charCodes.DEFAULT;
        };
        Lijn.getCode = function (str) {
            return str
                .toUpperCase()
                .split('')
                .reduce(function (acc, val) {
                return acc + Lijn.getCharCode(val);
            }, '')
                .split('')
                .map(function (x) { return +x; });
        };
        Lijn.getSequence = function (code) {
            var seq = [];
            code.forEach(function (c) {
                var temp = new Array(c);
                temp.fill(0);
                temp[temp.length - 1] = 1;
                seq.push.apply(seq, temp);
            });
            return seq;
        };
        Lijn.getGrid = function (sequence, width) {
            if (width === void 0) { width = 6; }
            var colCounter = 0;
            var row = [];
            var grid = [];
            for (var i = 0; i < sequence.length; i++) {
                if (row.length >= width) {
                    grid.push(__spreadArray([], row));
                    row.length = 0;
                    ++colCounter;
                }
                if ((colCounter & 1) === 0) {
                    row.push(sequence[i], 0);
                }
                else {
                    row.push(0, sequence[i]);
                }
            }
            while (row.length < width) {
                row.push(0);
            }
            grid.push(__spreadArray([], row));
            return grid;
        };
        Lijn.getVLines = function (grid) {
            var lines = [];
            var vlines = [];
            var width = grid[0].length;
            lines.length = 0;
            for (var i = 0; i < width; i++) {
                lines.push(i & 1);
            }
            vlines.push(__spreadArray([], lines));
            lines.length = 0;
            for (var i = 0; i < width; i++) {
                lines.push(Number(grid[0][i] === 1));
            }
            vlines.push(__spreadArray([], lines));
            grid.forEach(function (row, index) {
                if (index === grid.length - 1)
                    return;
                lines.length = 0;
                for (var i = 0; i < width; i++) {
                    lines.push(Number(row[i] === 1 || grid[index + 1][i] === 1));
                }
                vlines.push(__spreadArray([], lines));
            });
            lines.length = 0;
            for (var i = 0; i < width; i++) {
                lines.push(Number(grid[grid.length - 1][i] === 1));
            }
            vlines.push(__spreadArray([], lines));
            lines.length = 0;
            for (var i = 0; i < width; i++) {
                lines.push(1 - (i & 1));
            }
            vlines.push(__spreadArray([], lines));
            return vlines;
        };
        Lijn.getHLines = function (grid) {
            var lines = [];
            var hlines = [];
            var width = grid[0].length;
            hlines.push(new Array(width + 1).fill(1));
            grid.forEach(function (row) {
                lines.length = 0;
                lines.push(Number(row[0] === 0));
                for (var i = 1; i < width; i++) {
                    lines.push(Number(row[i] === 0 && row[i - 1] === 0));
                }
                lines.push(Number(row[width - 1] === 0));
                hlines.push(__spreadArray([], lines));
            });
            hlines.push(new Array(width + 1).fill(1));
            return hlines;
        };
        Object.defineProperty(Lijn.prototype, "debug", {
            get: function () {
                return this.sequence;
            },
            enumerable: false,
            configurable: true
        });
        Lijn.prototype.draw = function () { };
        Lijn.charCodes = { DEFAULT: '0' };
        return Lijn;
    }());

    var def = {
        A: '111',
        B: '112',
        C: '113',
        D: '121',
        E: '122',
        F: '123',
        G: '131',
        H: '132',
        I: '133',
        J: '211',
        K: '212',
        L: '213',
        M: '221',
        N: '222',
        O: '223',
        P: '231',
        Q: '232',
        R: '233',
        S: '311',
        T: '312',
        U: '313',
        V: '321',
        W: '322',
        X: '323',
        Y: '331',
        Z: '332',
        DEFAULT: '333'
    };
    var huff3 = {
        DEFAULT: '11',
        ' ': '12',
        E: '13',
        T: '22',
        A: '23',
        O: '31',
        I: '33',
        N: '111',
        S: '113',
        R: '121',
        H: '122',
        D: '211',
        L: '212',
        U: '213',
        C: '321',
        M: '322',
        F: '323',
        Y: '1122',
        W: '1123',
        G: '1231',
        P: '1232',
        B: '1233',
        V: '11211',
        K: '11212',
        X: '112132',
        Q: '112133',
        J: '1121311',
        Z: '1121312',
    };

    var charCodes = /*#__PURE__*/Object.freeze({
        __proto__: null,
        def: def,
        huff3: huff3
    });

    Lijn.charCodes = def;

    exports.charCodes = charCodes;
    exports.generator = Lijn;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
