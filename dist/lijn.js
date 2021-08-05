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

    function getCharCode(char, codes) {
        return codes[char] || codes.DEFAULT;
    }
    function getCode(str, codes) {
        return str
            .toUpperCase()
            .split('')
            .reduce(function (acc, val) {
            return acc + getCharCode(val, codes);
        }, '');
    }
    function getSequence(code) {
        var seq = [];
        code
            .split('')
            .map(function (x) { return +x; })
            .forEach(function (c) {
            var temp = new Array(c);
            temp.fill(0);
            temp[temp.length - 1] = 1;
            seq.push.apply(seq, temp);
        });
        return seq;
    }
    function getGrid(sequence, width) {
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
            row.push(0, 0);
        }
        grid.push(__spreadArray([], row));
        return grid;
    }
    function getVLines(grid) {
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
    }
    function getHLines(grid) {
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
    }

    var Lijn = /** @class */ (function () {
        function Lijn(text, width) {
            if (width === void 0) { width = 6; }
            this.text = text;
            this.width = width;
            this.sequence = getSequence(getCode(this.text, Lijn.charCodes));
            this.boxes = getGrid(this.sequence, this.width);
            this.VLines = getVLines(this.boxes);
            this.HLines = getHLines(this.boxes);
        }
        Lijn.prototype.SVG = function (svgprops) {
            var SVGProps = Object.assign(Lijn.svgPreset, svgprops);
            console.log(SVGProps);
            var viewboxWidth = 2 * SVGProps.padding + (this.boxes.length + 2) * SVGProps.boxWidth;
            var viewboxHeight = 2 * SVGProps.padding + this.boxes[0].length * SVGProps.boxWidth;
            return "\n      <svg\n        width=\"" + viewboxWidth + "\"\n        height=\"" + viewboxHeight + "\"\n        viewBox=\"0 0 " + viewboxWidth + " " + viewboxHeight + "\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        fill=\"" + SVGProps.fillColor + "\"\n        stroke=\"" + SVGProps.strokeColor + "\"\n        stroke-linecap=\"" + SVGProps.strokeCap + "\"\n        stroke-width=\"" + SVGProps.strokeWidth + "\"\n      >\n        <rect\n          x=\"0\"\n          y=\"0\"\n          width=\"" + viewboxWidth + "\"\n          height=\"" + viewboxHeight + "\"\n          stroke=\"none\"\n        />\n        <g transform=\"translate(" + SVGProps.padding + " " + SVGProps.padding + ")\">\n          <g>\n            " + this.HLines.map(function (col, i) {
                return col
                    .map(function (line, j) {
                    return line === 1
                        ? "<line\n                        x1=\"" + i * SVGProps.boxWidth + "\"\n                        y1=\"" + j * SVGProps.boxWidth + "\"\n                        x2=\"" + (i + 1) * SVGProps.boxWidth + "\"\n                        y2=\"" + j * SVGProps.boxWidth + "\"\n                      />"
                        : '';
                })
                    .join('\n');
            }).join('\n') + "\n          </g>\n          <g>\n            " + this.VLines.map(function (col, i) {
                return col
                    .map(function (line, j) {
                    return line === 1
                        ? "<line\n                        x1=\"" + i * SVGProps.boxWidth + "\"\n                        y1=\"" + j * SVGProps.boxWidth + "\"\n                        x2=\"" + i * SVGProps.boxWidth + "\"\n                        y2=\"" + (j + 1) * SVGProps.boxWidth + "\"\n                      />"
                        : '';
                })
                    .join('\n');
            }).join('\n') + "\n          </g>\n        </g>\n      </svg>\n    ";
        };
        Lijn.charCodes = { DEFAULT: '0' };
        Lijn.svgPreset = {
            boxWidth: 0,
            padding: 0,
            strokeWidth: 0,
            strokeCap: 'butt',
            fillColor: 'currentColor',
            strokeColor: 'currentColor',
        };
        return Lijn;
    }());

    var _default$1 = {
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
        DEFAULT: '333',
    };
    var small = {
        E: '11',
        T: '12',
        A: '21',
        O: '22',
        I: '31',
        N: '14',
        S: '23',
        R: '32',
        H: '41',
        D: '131',
        L: '24',
        U: '42',
        C: '132',
        M: '34',
        F: '43',
        Y: '133',
        W: '331',
        G: '44',
        P: '134',
        B: '332',
        V: '334',
        K: '3331',
        X: '3333',
        Q: '33321',
        J: '3334',
        Z: '33322',
        DEFAULT: '33323',
    };

    var charCodes = /*#__PURE__*/Object.freeze({
        __proto__: null,
        _default: _default$1,
        small: small
    });

    var _default = {
        boxWidth: 24,
        strokeWidth: 12,
        fillColor: '#FD4400',
        strokeColor: 'white',
        padding: 24,
        strokeCap: 'square',
    };
    var githubDimmed = {
        boxWidth: 32,
        strokeWidth: 10,
        fillColor: '#22272e',
        strokeColor: '#4171ad',
        padding: 48,
        strokeCap: 'round',
    };
    var githubDimmedAlt = {
        boxWidth: 32,
        strokeWidth: 10,
        fillColor: '#2D333B',
        strokeColor: '#347D39',
        padding: 48,
        strokeCap: 'round',
    };

    var svgPresets = /*#__PURE__*/Object.freeze({
        __proto__: null,
        _default: _default,
        githubDimmed: githubDimmed,
        githubDimmedAlt: githubDimmedAlt
    });

    Lijn.charCodes = _default$1;
    Lijn.svgPreset = _default;

    exports.charCodes = charCodes;
    exports.generator = Lijn;
    exports.svgPresets = svgPresets;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
