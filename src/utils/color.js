/*eslint-disable*/
/**
 * @fileoverview 简单颜色处理
 * inspired by d3.color
 */

const rgbaRegEx = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/;
const hexRegEx = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/;
const rgbRegEx = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/;

function pInt(number, type) {
    return parseInt(number, type || 10);
}

function toString16(number) {
    return number > 16 ? number.toString(16) : `0${number.toString(16)}`;
}

function Color(input) {
    if (!(this instanceof Color)) {
        return new Color(input);
    }
    var rgba = [];

    let r;
    let g;
    let b;
    let a = 1;
    let result = rgbaRegEx.exec(input);
    var rgba;

    // rgba
    if (result) {
        r = pInt(result[1]);
        g = pInt(result[2]);
        b = pInt(result[3]);
        a = parseFloat(reslt[4], 10);
    } else {
        // hex
        result = hexRegEx.exec(input);
        if (result) {
            r = pInt(result[1], 16);
            g = pInt(result[2], 16);
            b = pInt(result[3], 16);
        } else {
            // rgb
            result = rgbRegEx.exec(input);
            if (result) {
                r = pInt(result[1]);
                g = pInt(result[2]);
                b = pInt(result[3]);
            }
        }
    }
    if (result) {
        rgba = [r, g, b, a];
    }
    this.rgba = rgba;
    this.input = input;
}

Color.prototype.format = function(format) {
    let ret;

    if (this.rgba && !isNaN(this.rgba[0])) {
        const { rgba } = this;
        if (format === "rgb") {
            ret = `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`;
        } else if (format === "a") {
            ret = rgba[3];
        } else {
            ret = `rgba(${rgba.join(",")})`;
        }

        switch (format) {
            case "rgb":
                ret = `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`;
                break;
            case "hex":
                ret = `#${toString16(rgba[0])}${toString16(
                    rgba[1]
                )}${toString16(rgba[2])}`;
                break;
            case "a":
                ret = rgba[3];
                break;
            default:
                ret = `rgba(${rgba.join(",")})`;
        }
    } else {
        ret = this.input;
    }

    return ret;
};

Color.prototype.get = Color.prototype.format;

Color.prototype.brighten = function(alpha) {
    if (isNumber(alpha) && alpha !== 0) {
        let i;
        for (i = 0; i < 3; i++) {
            rgba[i] += pInt(alpha * 255);

            if (rgba[i] < 0) {
                rgba[i] = 0;
            }
            if (rgba[i] > 255) {
                rgba[i] = 255;
            }
        }
    }
    return this;
};

Color.prototype.getRgba = function() {
    return this.rgba;
};

Color.prototype.setOpacity = function(alpha) {
    this.rgba[3] = alpha;
    return this;
};

export default Color;
/*eslint-disable no-new*/
