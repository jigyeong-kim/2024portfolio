
function setDate(date,str) {
    var id ="";
    if (str == null || str == undefined || str=="undefined"){
        id="lWidget";
    }else{
        id ="l" + str;
    }
    if(date){
        objCal.value = date;
    }
    $(objCal).removeClass(activeClass).focus();
    closeCal();
}

function getAbsTop(obj) {
    return (obj.offsetParent == null)? 0 : obj.offsetTop+getAbsTop(obj.offsetParent);
}

function getAbsLeft(obj) {
    return (obj.offsetParent == null)? 0 : obj.offsetLeft+getAbsLeft(obj.offsetParent);
}

function findPos(obj) {
    var curLeft = curTop = 0;

    if (obj.offsetParent) {
        do {
            curLeft += obj.offsetLeft;
            curTop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }

    return {"left": curLeft, "top": curTop};
}

function addWidget(){
    var hasWidget = $("body").find("#lWidget").length;
    if(hasWidget === 0){
        var calIframeStr = "<div id=\"lWidget\" style=\"position:absolute;z-index:1000;\">";
        calIframeStr += "<iframe id=\"wWidget\" name=\"wWidget\" src=\"about:blank\" title=\"달력\"></iframe>";
        calIframeStr += "</div>";
        $("body").append(calIframeStr);
    }else{
        return
    }
}

function closeCal() {
    var elem = document.getElementById("lWidget");
    elem.parentNode.removeChild(elem);
}
function removeActiveClass(obj) {
    $("input[type='text']").not(obj).removeClass(activeClass);
}

var objCal;
var activeClass ="obj-active";
function getCalendar(objName, syear, smonth, str) {

    if( !objName){
        alert("getCalendar(document.bbsNttForm.start_date)와 같이 입력 필드 정보를 추가 하세요.");
        return;
    }
    addWidget();
    var id , name;
    if (str == null || str == undefined || str=="undefined"){
        str = "Widget";
    }
    id ="l" + str;
    name = "w" + str;
    var win = document.getElementsByName(name)[0];

    objCal = objName;

    with(document.getElementById(id)) {
        removeActiveClass(objName);

        if( $(objName).hasClass(activeClass) ) {
            return;
        } else {
            var left = getAbsLeft(objName);
            var top = getAbsTop(objName) + 30;
            win.width = "244";
            win.height = "320";
            win.style.width= "244px";
            win.style.height= "320px";
            $(document).ready(function() {
                if ( 460 > document.body.clientWidth) {
                    var term = (document.body.clientWidth - win.width )/2;
                    left =  term;
                }
            });
            style.left = left + "px";
            style.top = top + "px";

            if (syear == null || syear == undefined || syear == "undefined"){
                syear = "";
            }
            if (smonth == null || smonth == undefined || smonth == "undefined"){
                smonth = "";
            }
            self.eval(name).location.replace("/common/calendar.html?syear=" + syear + "&smonth=" + smonth);
        }

        $(objName).addClass(activeClass);

    }
}

var toggle   = "[data-button='dropdown'], [data-dropdown='true']";
var Dropdown = function (element) {
    $(element).on("click.p-dropdown", this.toggle);

};

Dropdown.prototype.toggle = function (e) {
    var $parent  = $(this).parent(),
        options = $(this).data(),
        isActive = $parent.hasClass("open");
    dropdownClear();

    if (options.position && !$parent.hasClass(options.position)){
        $parent.addClass(options.position);
    }
    if (options.arrow && !$parent.hasClass("arrow")){
        $parent.addClass("arrow");
    }
    if (options.width){

        var width_target = options.width_target;
        if(!options.width_target){
            width_target = "p-dropdown__list";
        }
        $parent.find("." + width_target).css("width", options.width);
    }
    if (!isActive) {
        if (e.isDefaultPrevented()) { return; }
        $parent.toggleClass("open");   //탭메뉴등 다른 active className과 중복 피해를 위해 open 사용
    }
    return false;
};

/**
 * clear
 */
function dropdownClear() {
    $(toggle).each(function () {
        var $parent       = $(this).parent(),
            relatedTarget = { relatedTarget: $(this) };
        if (!$parent.hasClass("open")) { return; }
        $parent.removeClass("open").trigger("hidden.dropdown", relatedTarget);
    });
}

$(document)
.on("click.p-dropdown", dropdownClear)
.on("click.p-dropdown", toggle, Dropdown.prototype.toggle);



/**
 *  브라우저 버전 체크 및 ie8 class 추가
 * */
function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else
        return 99; //It is not IE
}

/**
 *  하위 ie8이하 브라우저 checkbox, radio 영역 class 추가
 * */

if (GetIEVersion() === 9) {
    $("body").addClass("ie9");
}
if (GetIEVersion() <= 8) {
    $("body").addClass("ie8");
}


/**
 *  className .svg 추가시  svg inline 화
 * */
$(function(){
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');


        jQuery.get(imgURL, function(data) {
            var $svg = jQuery(data).find('svg');

           if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }

            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            $svg = $svg.removeAttr('xmlns:a');

            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            //width
            if($img.attr('height') || $img.attr('width')){
                if($img.attr('width')){
                    $svg.attr('width', $img.attr('width'))
                } else{
                    $svg.removeAttr('width')
                }
                //height
                if($img.attr('height')){
                    $svg.attr('height', $img.attr('height'))
                } else{
                    $svg.removeAttr('height')
                }
            }

            if($img.attr('data-svg-color')){
                $svg.find('path').attr('fill', $img.attr('data-svg-color'))
            }
            $img.replaceWith($svg);
        }, 'xml');

    });
});




$(function(){
    var showToggle = function(element, options) {
        $element            = $(element);
        this.element        = element;
        this.options        = options;
        $element.on('click mouseenter',  $.proxy(this.show, this));
        $element.on('click.close mouseleave',  $.proxy(this.hide, this));
        //$originalinput.on('change',  $.proxy(this.change, this));
    };
    showToggle.prototype.show = function(){
        $target = $(this.options.target);
        $target.show();
    };
    showToggle.prototype.hide = function(){
        $target = $(this.options.target);
        $target.hide();
    };
    function showTogglePlugin(option){
        var $this = $(this);
        var data  = $this.data('button');
        var options = typeof option === 'object' && option;
        $this.data('map', (data = new showToggle(this, options)));
        if (typeof option === 'string') data[option]()
    }
    $.fn.showToggle             =  showTogglePlugin;

    $(window).on("load",function(){
        $("[data-button=\"showToggle\"]").each(function () {
            var $this = $(this);   //버튼
            var option = $this.data();
            showTogglePlugin.call($this, option);
        });
    });
});




/**
 * jquery.mask.js
 * @version: v1.14.15
 * @author: Igor Escobar
 * https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
 * https://igorescobar.github.io/jQuery-Mask-Plugin/docs.html
*/

(function (factory, jQuery, Zepto) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery || Zepto);
    }

}(function ($) {
    'use strict';

    var Mask = function (el, mask, options) {

        var p = {
            invalid: [],
            getCaret: function () {
                try {
                    var sel,
                        pos = 0,
                        ctrl = el.get(0),
                        dSel = document.selection,
                        cSelStart = ctrl.selectionStart;

                    // IE Support
                    if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
                        sel = dSel.createRange();
                        sel.moveStart('character', -p.val().length);
                        pos = sel.text.length;
                    }
                    // Firefox support
                    else if (cSelStart || cSelStart === '0') {
                        pos = cSelStart;
                    }

                    return pos;
                } catch (e) {}
            },
            setCaret: function(pos) {
                try {
                    if (el.is(':focus')) {
                        var range, ctrl = el.get(0);

                        // Firefox, WebKit, etc..
                        if (ctrl.setSelectionRange) {
                            ctrl.setSelectionRange(pos, pos);
                        } else { // IE
                            range = ctrl.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', pos);
                            range.moveStart('character', pos);
                            range.select();
                        }
                    }
                } catch (e) {}
            },
            events: function() {
                el
                .on('keydown.mask', function(e) {
                    el.data('mask-keycode', e.keyCode || e.which);
                    el.data('mask-previus-value', el.val());
                    el.data('mask-previus-caret-pos', p.getCaret());
                    p.maskDigitPosMapOld = p.maskDigitPosMap;
                })
                .on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour)
                .on('paste.mask drop.mask', function() {
                    setTimeout(function() {
                        el.keydown().keyup();
                    }, 100);
                })
                .on('change.mask', function(){
                    el.data('changed', true);
                })
                .on('blur.mask', function(){
                    if (oldValue !== p.val() && !el.data('changed')) {
                        el.trigger('change');
                    }
                    el.data('changed', false);
                })
                // it's very important that this callback remains in this position
                // otherwhise oldValue it's going to work buggy
                .on('blur.mask', function() {
                    oldValue = p.val();
                })
                // select all text on focus
                .on('focus.mask', function (e) {
                    if (options.selectOnFocus === true) {
                        $(e.target).select();
                    }
                })
                // clear the value if it not complete the mask
                .on('focusout.mask', function() {
                    if (options.clearIfNotMatch && !regexMask.test(p.val())) {
                       p.val('');
                   }
                });
            },
            getRegexMask: function() {
                var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

                for (var i = 0; i < mask.length; i++) {
                    translation = jMask.translation[mask.charAt(i)];

                    if (translation) {

                        pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
                        optional = translation.optional;
                        recursive = translation.recursive;

                        if (recursive) {
                            maskChunks.push(mask.charAt(i));
                            oRecursive = {digit: mask.charAt(i), pattern: pattern};
                        } else {
                            maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
                        }

                    } else {
                        maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                    }
                }

                r = maskChunks.join('');

                if (oRecursive) {
                    r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
                         .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
                }

                return new RegExp(r);
            },
            destroyEvents: function() {
                el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
            },
            val: function(v) {
                var isInput = el.is('input'),
                    method = isInput ? 'val' : 'text',
                    r;

                if (arguments.length > 0) {
                    if (el[method]() !== v) {
                        el[method](v);
                    }
                    r = el;
                } else {
                    r = el[method]();
                }

                return r;
            },
            calculateCaretPosition: function() {
                var oldVal = el.data('mask-previus-value') || '',
                    newVal = p.getMasked(),
                    caretPosNew = p.getCaret();
                if (oldVal !== newVal) {
                    var caretPosOld = el.data('mask-previus-caret-pos') || 0,
                        newValL = newVal.length,
                        oldValL = oldVal.length,
                        maskDigitsBeforeCaret = 0,
                        maskDigitsAfterCaret = 0,
                        maskDigitsBeforeCaretAll = 0,
                        maskDigitsBeforeCaretAllOld = 0,
                        i = 0;

                    for (i = caretPosNew; i < newValL; i++) {
                        if (!p.maskDigitPosMap[i]) {
                            break;
                        }
                        maskDigitsAfterCaret++;
                    }

                    for (i = caretPosNew - 1; i >= 0; i--) {
                        if (!p.maskDigitPosMap[i]) {
                            break;
                        }
                        maskDigitsBeforeCaret++;
                    }

                    for (i = caretPosNew - 1; i >= 0; i--) {
                        if (p.maskDigitPosMap[i]) {
                            maskDigitsBeforeCaretAll++;
                        }
                    }

                    for (i = caretPosOld - 1; i >= 0; i--) {
                        if (p.maskDigitPosMapOld[i]) {
                            maskDigitsBeforeCaretAllOld++;
                        }
                    }

                    // if the cursor is at the end keep it there
                    if (caretPosNew > oldValL) {
                      caretPosNew = newValL * 10;
                    } else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
                        if (!p.maskDigitPosMapOld[caretPosNew])  {
                          var caretPos = caretPosNew;
                          caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
                          caretPosNew -= maskDigitsBeforeCaret;
                          if (p.maskDigitPosMap[caretPosNew])  {
                            caretPosNew = caretPos;
                          }
                        }
                    }
                    else if (caretPosNew > caretPosOld) {
                        caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
                        caretPosNew += maskDigitsAfterCaret;
                    }
                }
                return caretPosNew;
            },
            behaviour: function(e) {
                e = e || window.event;
                p.invalid = [];

                var keyCode = el.data('mask-keycode');

                if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
                    var newVal = p.getMasked(),
                        caretPos = p.getCaret();

                    // this is a compensation to devices/browsers that don't compensate
                    // caret positioning the right way
                    setTimeout(function() {
                      p.setCaret(p.calculateCaretPosition());
                    }, $.jMaskGlobals.keyStrokeCompensation);

                    p.val(newVal);
                    p.setCaret(caretPos);
                    return p.callbacks(e);
                }
            },
            getMasked: function(skipMaskChars, val) {
                var buf = [],
                    value = val === undefined ? p.val() : val + '',
                    m = 0, maskLen = mask.length,
                    v = 0, valLen = value.length,
                    offset = 1, addMethod = 'push',
                    resetPos = -1,
                    maskDigitCount = 0,
                    maskDigitPosArr = [],
                    lastMaskChar,
                    check;

                if (options.reverse) {
                    addMethod = 'unshift';
                    offset = -1;
                    lastMaskChar = 0;
                    m = maskLen - 1;
                    v = valLen - 1;
                    check = function () {
                        return m > -1 && v > -1;
                    };
                } else {
                    lastMaskChar = maskLen - 1;
                    check = function () {
                        return m < maskLen && v < valLen;
                    };
                }

                var lastUntranslatedMaskChar;
                while (check()) {
                    var maskDigit = mask.charAt(m),
                        valDigit = value.charAt(v),
                        translation = jMask.translation[maskDigit];

                    if (translation) {
                        if (valDigit.match(translation.pattern)) {
                            buf[addMethod](valDigit);
                             if (translation.recursive) {
                                if (resetPos === -1) {
                                    resetPos = m;
                                } else if (m === lastMaskChar && m !== resetPos) {
                                    m = resetPos - offset;
                                }

                                if (lastMaskChar === resetPos) {
                                    m -= offset;
                                }
                            }
                            m += offset;
                        } else if (valDigit === lastUntranslatedMaskChar) {
                            // matched the last untranslated (raw) mask character that we encountered
                            // likely an insert offset the mask character from the last entry; fall
                            // through and only increment v
                            maskDigitCount--;
                            lastUntranslatedMaskChar = undefined;
                        } else if (translation.optional) {
                            m += offset;
                            v -= offset;
                        } else if (translation.fallback) {
                            buf[addMethod](translation.fallback);
                            m += offset;
                            v -= offset;
                        } else {
                          p.invalid.push({p: v, v: valDigit, e: translation.pattern});
                        }
                        v += offset;
                    } else {
                        if (!skipMaskChars) {
                            buf[addMethod](maskDigit);
                        }

                        if (valDigit === maskDigit) {
                            maskDigitPosArr.push(v);
                            v += offset;
                        } else {
                            lastUntranslatedMaskChar = maskDigit;
                            maskDigitPosArr.push(v + maskDigitCount);
                            maskDigitCount++;
                        }

                        m += offset;
                    }
                }

                var lastMaskCharDigit = mask.charAt(lastMaskChar);
                if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
                    buf.push(lastMaskCharDigit);
                }

                var newVal = buf.join('');
                p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
                return newVal;
            },
            mapMaskdigitPositions: function(newVal, maskDigitPosArr, valLen) {
              var maskDiff = options.reverse ? newVal.length - valLen : 0;
              p.maskDigitPosMap = {};
              for (var i = 0; i < maskDigitPosArr.length; i++) {
                p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
              }
            },
            callbacks: function (e) {
                var val = p.val(),
                    changed = val !== oldValue,
                    defaultArgs = [val, e, el, options],
                    callback = function(name, criteria, args) {
                        if (typeof options[name] === 'function' && criteria) {
                            options[name].apply(this, args);
                        }
                    };

                callback('onChange', changed === true, defaultArgs);
                callback('onKeyPress', changed === true, defaultArgs);
                callback('onComplete', val.length === mask.length, defaultArgs);
                callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
            }
        };

        el = $(el);
        var jMask = this, oldValue = p.val(), regexMask;

        mask = typeof mask === 'function' ? mask(p.val(), undefined, el,  options) : mask;

        // public methods
        jMask.mask = mask;
        jMask.options = options;
        jMask.remove = function() {
            var caret = p.getCaret();
            if (jMask.options.placeholder) {
                el.removeAttr('placeholder');
            }
            if (el.data('mask-maxlength')) {
                el.removeAttr('maxlength');
            }
            p.destroyEvents();
            p.val(jMask.getCleanVal());
            p.setCaret(caret);
            return el;
        };

        // get value without mask
        jMask.getCleanVal = function() {
           return p.getMasked(true);
        };

        // get masked value without the value being in the input or element
        jMask.getMaskedVal = function(val) {
           return p.getMasked(false, val);
        };

       jMask.init = function(onlyMask) {
            onlyMask = onlyMask || false;
            options = options || {};

            jMask.clearIfNotMatch  = $.jMaskGlobals.clearIfNotMatch;
            jMask.byPassKeys       = $.jMaskGlobals.byPassKeys;
            jMask.translation      = $.extend({}, $.jMaskGlobals.translation, options.translation);

            jMask = $.extend(true, {}, jMask, options);

            regexMask = p.getRegexMask();

            if (onlyMask) {
                p.events();
                p.val(p.getMasked());
            } else {
                if (options.placeholder) {
                    el.attr('placeholder' , options.placeholder);
                }

                // this is necessary, otherwise if the user submit the form
                // and then press the "back" button, the autocomplete will erase
                // the data. Works fine on IE9+, FF, Opera, Safari.
                if (el.data('mask')) {
                  el.attr('autocomplete', 'off');
                }

                // detect if is necessary let the user type freely.
                // for is a lot faster than forEach.
                for (var i = 0, maxlength = true; i < mask.length; i++) {
                    var translation = jMask.translation[mask.charAt(i)];
                    if (translation && translation.recursive) {
                        maxlength = false;
                        break;
                    }
                }

                if (maxlength) {
                    el.attr('maxlength', mask.length).data('mask-maxlength', true);
                }

                p.destroyEvents();
                p.events();

                var caret = p.getCaret();
                p.val(p.getMasked());
                p.setCaret(caret);
            }
        };

        jMask.init(!el.is('input'));
    };

    $.maskWatchers = {};
    var HTMLAttributes = function () {
        var input = $(this),
            options = {},
            prefix = 'data-mask-',
            mask = input.attr('data-mask');

        if (input.attr(prefix + 'reverse')) {
            options.reverse = true;
        }

        if (input.attr(prefix + 'clearifnotmatch')) {
            options.clearIfNotMatch = true;
        }

        if (input.attr(prefix + 'selectonfocus') === 'true') {
           options.selectOnFocus = true;
        }

        if (notSameMaskObject(input, mask, options)) {
            return input.data('mask', new Mask(this, mask, options));
        }
    },
    notSameMaskObject = function(field, mask, options) {
        options = options || {};
        var maskObject = $(field).data('mask'),
            stringify = JSON.stringify,
            value = $(field).val() || $(field).text();
        try {
            if (typeof mask === 'function') {
                mask = mask(value);
            }
            return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
        } catch (e) {}
    },
    eventSupported = function(eventName) {
        var el = document.createElement('div'), isSupported;

        eventName = 'on' + eventName;
        isSupported = (eventName in el);

        if ( !isSupported ) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] === 'function';
        }
        el = null;

        return isSupported;
    };

    $.fn.mask = function(mask, options) {
        options = options || {};
        var selector = this.selector,
            globals = $.jMaskGlobals,
            interval = globals.watchInterval,
            watchInputs = options.watchInputs || globals.watchInputs,
            maskFunction = function() {
                if (notSameMaskObject(this, mask, options)) {
                    return $(this).data('mask', new Mask(this, mask, options));
                }
            };

        $(this).each(maskFunction);

        if (selector && selector !== '' && watchInputs) {
            clearInterval($.maskWatchers[selector]);
            $.maskWatchers[selector] = setInterval(function(){
                $(document).find(selector).each(maskFunction);
            }, interval);
        }
        return this;
    };

    $.fn.masked = function(val) {
        return this.data('mask').getMaskedVal(val);
    };

    $.fn.unmask = function() {
        clearInterval($.maskWatchers[this.selector]);
        delete $.maskWatchers[this.selector];
        return this.each(function() {
            var dataMask = $(this).data('mask');
            if (dataMask) {
                dataMask.remove().removeData('mask');
            }
        });
    };

    $.fn.cleanVal = function() {
        return this.data('mask').getCleanVal();
    };

    $.applyDataMask = function(selector) {
        selector = selector || $.jMaskGlobals.maskElements;
        var $selector = (selector instanceof $) ? selector : $(selector);
        $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
    };

    var globals = {
        maskElements: 'input,td,span,div,time,em',
        dataMaskAttr: '*[data-mask]',
        dataMask: true,
        watchInterval: 300,
        watchInputs: true,
        keyStrokeCompensation: 10,
        // old versions of chrome dont work great with input event
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
        watchDataMask: false,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            '0': {pattern: /\d/},
            '9': {pattern: /\d/, optional: true},
            '#': {pattern: /\d/, recursive: true},
            'A': {pattern: /[a-zA-Z0-9]/},
            'S': {pattern: /[a-zA-Z]/}
        }
    };

    $.jMaskGlobals = $.jMaskGlobals || {};
    globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

    // looking for inputs with data-mask attribute
    if (globals.dataMask) {
        $.applyDataMask();
    }

    setInterval(function() {
        if ($.jMaskGlobals.watchDataMask) {
            $.applyDataMask();
        }
    }, globals.watchInterval);
}, window.jQuery, window.Zepto));

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-canvas-cssgrid_cssgridlegacy-flexbox-inputtypes-svg-video-setclasses !*/
!function(e,t,n){function o(e,t){return typeof e===t}function a(){var e,t,n,a,r,s,i;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],t=C[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(a=o(t.fn,"function")?t.fn():t.fn,r=0;r<e.length;r++)s=e[r],i=s.split("."),1===i.length?Modernizr[i[0]]=a:(!Modernizr[i[0]]||Modernizr[i[0]]instanceof Boolean||(Modernizr[i[0]]=new Boolean(Modernizr[i[0]])),Modernizr[i[0]][i[1]]=a),w.push((a?"":"no-")+i.join("-"))}}function r(e){var t=b.className,n=Modernizr._config.classPrefix||"";if(x&&(t=t.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),x?b.className.baseVal=t:b.className=t)}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):x?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function i(e,t){return!!~(""+e).indexOf(t)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function c(e,t){return function(){return e.apply(t,arguments)}}function u(e,t,n){var a;for(var r in e)if(e[r]in t)return n===!1?e[r]:(a=t[e[r]],o(a,"function")?c(a,n||t):a);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(t,n,o){var a;if("getComputedStyle"in e){a=getComputedStyle.call(e,t,n);var r=e.console;if(null!==a)o&&(a=a.getPropertyValue(o));else if(r){var s=r.error?"error":"log";r[s].call(r,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else a=!n&&t.currentStyle&&t.currentStyle[o];return a}function f(){var e=t.body;return e||(e=s(x?"svg":"body"),e.fake=!0),e}function y(e,n,o,a){var r,i,l,c,u="modernizr",d=s("div"),p=f();if(parseInt(o,10))for(;o--;)l=s("div"),l.id=a?a[o]:u+(o+1),d.appendChild(l);return r=s("style"),r.type="text/css",r.id="s"+u,(p.fake?p:d).appendChild(r),p.appendChild(d),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(t.createTextNode(e)),d.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",c=b.style.overflow,b.style.overflow="hidden",b.appendChild(p)),i=n(d,e),p.fake?(p.parentNode.removeChild(p),b.style.overflow=c,b.offsetHeight):d.parentNode.removeChild(d),!!i}function m(t,o){var a=t.length;if("CSS"in e&&"supports"in e.CSS){for(;a--;)if(e.CSS.supports(d(t[a]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var r=[];a--;)r.push("("+d(t[a])+":"+o+")");return r=r.join(" or "),y("@supports ("+r+") { #modernizr { position: absolute; } }",function(e){return"absolute"==p(e,null,"position")})}return n}function v(e,t,a,r){function c(){d&&(delete z.style,delete z.modElem)}if(r=o(r,"undefined")?!1:r,!o(a,"undefined")){var u=m(e,a);if(!o(u,"undefined"))return u}for(var d,p,f,y,v,g=["modernizr","tspan","samp"];!z.style&&g.length;)d=!0,z.modElem=s(g.shift()),z.style=z.modElem.style;for(f=e.length,p=0;f>p;p++)if(y=e[p],v=z.style[y],i(y,"-")&&(y=l(y)),z.style[y]!==n){if(r||o(a,"undefined"))return c(),"pfx"==t?y:!0;try{z.style[y]=a}catch(h){}if(z.style[y]!=v)return c(),"pfx"==t?y:!0}return c(),!1}function g(e,t,n,a,r){var s=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+$.join(s+" ")+s).split(" ");return o(t,"string")||o(t,"undefined")?v(i,t,a,r):(i=(e+" "+k.join(s+" ")+s).split(" "),u(i,t,n))}function h(e,t,o){return g(e,n,n,t,o)}var w=[],C=[],T={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=T,Modernizr=new Modernizr,Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var b=t.documentElement,x="svg"===b.nodeName.toLowerCase();Modernizr.addTest("audio",function(){var e=s("audio"),t=!1;try{t=!!e.canPlayType,t&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("canvas",function(){var e=s("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("video",function(){var e=s("video"),t=!1;try{t=!!e.canPlayType,t&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t});var P=s("input"),S="search tel url email datetime date month week time datetime-local number range color".split(" "),_={};Modernizr.inputtypes=function(e){for(var o,a,r,s=e.length,i="1)",l=0;s>l;l++)P.setAttribute("type",o=e[l]),r="text"!==P.type&&"style"in P,r&&(P.value=i,P.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(o)&&P.style.WebkitAppearance!==n?(b.appendChild(P),a=t.defaultView,r=a.getComputedStyle&&"textfield"!==a.getComputedStyle(P,null).WebkitAppearance&&0!==P.offsetHeight,b.removeChild(P)):/^(search|tel)$/.test(o)||(r=/^(url|email)$/.test(o)?P.checkValidity&&P.checkValidity()===!1:P.value!=i)),_[e[l]]=!!r;return _}(S);var E="Moz O ms Webkit",$=T._config.usePrefixes?E.split(" "):[];T._cssomPrefixes=$;var k=T._config.usePrefixes?E.toLowerCase().split(" "):[];T._domPrefixes=k;var N={elem:s("modernizr")};Modernizr._q.push(function(){delete N.elem});var z={style:N.elem.style};Modernizr._q.unshift(function(){delete z.style}),T.testAllProps=g,T.testAllProps=h,Modernizr.addTest("cssgridlegacy",h("grid-columns","10px",!0)),Modernizr.addTest("cssgrid",h("grid-template-rows","none",!0)),Modernizr.addTest("flexbox",h("flexBasis","1px",!0)),a(),r(w),delete T.addTest,delete T.addAsyncTest;for(var A=0;A<Modernizr._q.length;A++)Modernizr._q[A]();e.Modernizr=Modernizr}(window,document);


if (navigator.appVersion.indexOf("MSIE 8.") == -1) {
    //파일 업로드
    $(function(){
        var fileupload = function(btn, options) {
            $element            = $(btn);
            this.element        = btn;
            this.options        = options;
            this.clearselector  = ".clear";
            $region             = $element.closest(this.options.parent);
            $originalinput      = $region.find(this.options.original);
            $clearbtn           = $region.find(this.clearselector);

            $clearbtn.on('click.cancle',  $.proxy(this.clear, this));
            $originalinput.on('change',  $.proxy(this.change, this));

        };

        fileupload.prototype.change = function(){
            var $element            = this.element,
                $region             = $element.closest(this.options.parent),
                $originalinput      = $region.find(this.options.original),
                $showinput          = $region.find(this.options.showfilename),
                $clearbtn           = $region.find(this.clearselector);

            if(window.FileReader){ // modern browser
                filename = this.filestrip($originalinput[0].files[0].name);
                if($originalinput[0].files.length > 1){
                    var filelength = $originalinput[0].files.length - 1;
                }
            } else { // old IE
                filename = $originalinput.val().split('/').pop().split('\\').pop(); // 파일명만 추출
            }
            if(filelength) {
                filename = filename + " 외 " + filelength
            }
            // 추출한 파일명 삽입
            $clearbtn.addClass("active");
            $showinput.html(filename);
        };

        fileupload.prototype.filestrip = function(name){
            var stripNumber;
            if($(window).width() < 640 && $(window).width() >= 420){
                stripNumber = 45;
            }
            else if($(window).width() < 419 && $(window).width() >= 400){
                stripNumber = 30;
            }else if($(window).width() < 400){
                stripNumber = 21;
            }

            if (name.length > stripNumber) {
                return name.substr(0, stripNumber/3) + ' ... ' + name.substr(name.length-8, name.length);
            }
            return name;
        };

        fileupload.prototype.clear = function(){
            var $element            = this.element,
                $region             = $element.closest(this.options.parent),
                $originalinput      = $region.find(this.options.original),
                $showinput          = $region.find(this.options.showfilename),
                $clearbtn           = $region.find(this.clearselector);

            $originalinput.replaceWith( $originalinput.val('').clone( true ) );
            $showinput.empty();
            $clearbtn.removeClass("active");
        };
        function checkFileupload(option){
                var $this = $(this);
                var data  = $this.data("upload");
                var options = typeof option === 'object' && option;
                if (!data) $this.data('upload', (data = new fileupload(this, options)));
                if (typeof option === 'string') data[option]()

        }
        $(window).on("load",function(){
            $("[data-button=\"upload\"]").each(function () {
                var $this = $(this);   //버튼
                var option = $this.data();
                checkFileupload.call($this, option);
            });
        });
        $(".p-upload__file--hidden").on("focus",function(){
            $(this).closest(".p-upload").addClass("focus");
        });
        $(".p-upload__file--hidden").on("blur",function(){
            $(this).closest(".p-upload").removeClass("focus");
        });

    });
}


//chekcbox  전체 선택, 해제
$(function(){
    var checkedall = function(el, options) {
        $element            = $(el);
        this.element        = el;
        this.options        = options;
        this.checkBtn       =  $element.find(this.options.checkallid);  //전체선택 checkbox
        this.checkItemName  = 'input[name=\"' + this.options.checkname +'\"]';
        this.checkItem      = $element.find(this.checkItemName); //각 checkbox name
        this.checkItemNum   = this.checkItem.length;

        this.checkBtn.on('change',  $.proxy(this.changeall, this));
        this.checkItem.on('change',  $.proxy(this.changeitem, this));
    };

    checkedall.prototype.changeall = function(){
        this.checkItem .prop('checked', this.checkBtn.prop("checked"));
        var checkItemStatus = $(this.checkItem).is(":checked");
        if(this.options.visibletarget){
            this.displayTarget(checkItemStatus);
        }
    };

    checkedall.prototype.changeitem = function(){

        this.checkedItem = $(this.element).find(this.checkItemName + ":checked").length;
        //checkItem 체크, 해제 되면
        if(false === this.checkItem.prop("checked")){
            this.checkBtn.prop('checked', false);
        }

        if( this.checkedItem > 0 &&  this.checkedItem < this.checkItemNum){ //checkedItem 1개이상 체크되면
            this.checkBtn.prop('checked', false);
            this.targetStatus = true;
        }
        else if (this.checkedItem === this.checkItemNum ){ //checkedItem 모두 체크되면
            this.checkBtn.prop('checked', true);
            this.targetStatus = true;
        }
        else{
            this.checkBtn.prop('checked', false);  //checked 없으면
            this.targetStatus = false;
        }

        if(this.options.visibletarget){
            this.displayTarget(this.targetStatus);
        }
    };


    checkedall.prototype.displayTarget = function(visible){
        var visibleStatus = $(this.options.visibletarget).is(":visible");
        if(visible === true){
            if(!visibleStatus){
                $(this.options.visibletarget).show();
            }
        } else{
            if(visibleStatus) {
                $(this.options.visibletarget).hide();
            }
        }
    };

    function checkAll(option){
        var $this = $(this);
        var data  = $this.data("select");
        var options = typeof option === 'object' && option;

        if (data) $this.data('select', (data = new checkedall(this, options)));
        if (typeof option === 'string') data[option]()

    }
    $(window).on("load",function(){
        $("[data-select=\"checkall\"]").each(function () {
            var $this = $(this);   //버튼
            var option = $this.data();
            checkAll.call($this, option);
        });
    });


});






$(function(){
    var CreateMap = function(element, options) {
        this.init(element, options)
    };
    CreateMap.DEFAULTS = {
        level : 3,
        draggable : true,
        zoomable : true,
        typecontrol : false
    };
    CreateMap.prototype.init = function(element, options){
        this.element        = $(element);
        this.options        = options;
        this.addMarker();
    };
    CreateMap.prototype.addMarker = function(){
        var mapContainer = this.element[0],
            mapOption = {
                center: new daum.maps.LatLng(this.options.lat, this.options.lng), // 지도의 중심좌표
                level: this.options.level // 지도의 확대 레벨
            };

        var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        map.setDraggable(this.options.draggable); //지도  drag 제어
        map.setZoomable(this.options.zoomable);   //지도 확대,축소 제어

        if(this.options.typecontrol) {
            var mapTypeControl = new daum.maps.MapTypeControl();
            map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

            var zoomControl = new daum.maps.ZoomControl();
            map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
        }

        var imageSrc = '/common/images/program/map_marker.png',
            imageSize = new daum.maps.Size(32, 42), // 마커이미지의 크기
            imageOption = {offset: new daum.maps.Point(13, 42)}; // 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정

        // 마커가 표시될 위치
        var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new daum.maps.LatLng(this.options.lat, this.options.lng);


        // 마커를 생성
        var marker = new daum.maps.Marker({
            position: markerPosition,
            image: markerImage
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);

        if(this.options.title || this.options.info ){
            var customOverlay = new daum.maps.CustomOverlay({
                position: markerPosition
            });

            var content = document.createElement('div');
            content.className = "p-map-info";


            var title = document.createElement('div');
            title.className ="p-map-info__title";
            title.appendChild(document.createTextNode(this.options.title));
            content.appendChild(title);

            if(this.options.info){
                var info = document.createElement('div');
                info.className ="p-map-info__content";
                info.appendChild(document.createTextNode(this.options.info));
                content.appendChild(info);

                content.className = "p-map-info p-map-info--multi";
            }
            customOverlay.setContent(content);
            customOverlay.setMap(map);
        }
    };

    function checkMapPlugin(option){
        var $this = $(this);
        var data  = $this.data('map');
        //var options = typeof option === 'object' && option;
        var options = $.extend({}, CreateMap.DEFAULTS, $this.data(), typeof option === 'object' && option);
        $this.data('map', (data = new CreateMap(this, options)));
        if (typeof option === 'string') data[option]()
    }
    $.fn.checkMap             = checkMapPlugin;

    $(window).on("load",function(){
        $("[data-map=\"map\"]").each(function () {
            var $this = $(this);   //버튼
            var option = $this.data();
            checkMapPlugin.call($this, option);
        });
    });

});


$(function() {
    var Modal = function(btn, options) {
        this.options            = options;
        this.$body              = $(document.body);
        this.$button            = $(btn);
        this.href = this.$button.attr("href");
        this.$element           = $(this.options.target || (this.href && this.href.replace(/.*(?=#[^\s]+$)/, ""))); //button-target or a href
        this.backdropselector   = "modal__backdrop";
        this.widthtselector    = "modal__body";
        this.heightselector    = "modal__content";
        this.isShown            = null;
    };

    Modal.DEFAULTS = {
        backdrop    : true,
        show        : true,
        keyboard    : true,
        width: 600
    };

    Modal.prototype.show = function () {
        var element = this.$element,
            modalBtn = this.button,
            modalBodyWidth = this.options.width;

        this.isShown = true;
        this.$body.addClass("modal__open");
        $("html").addClass("modal__open");

        //크기 조정 및 보이기
        this.setSize();
        element.show();

        var transition = element.hasClass("fade");
        if (transition) {
            element[0].offsetWidth; // force reflow
        }

        element.addClass("active");

        //모달 뒤 검은 배경
        if(this.options.backdrop){
            this.backdrop();
        }

        //닫기 버튼
        element.on('click.close', '[data-close=\'modal\']', $.proxy(this.hide, this));

        $(document)  //  모달 포커스 이동
        .off("focusin.modal") // guard against infinite focus loop
        .on("focusin.modal", function (e) {
            if (element[0] !== e.target && !element.has(e.target).length) {
                element.trigger("focus");
            }
        });

        this.escape();

        //브라우저 리사이즈
        this.resize();
    };

    Modal.prototype.hide = function(e){
        var element = this.$element,
            backdrop = "." + this.backdropselector,
            modalbtn = this.$button ;

        this.isShown = false;

        if (e) e.preventDefault();
        element.hide().removeClass("active");
        $(document.body).removeClass("modal__open");
        $("html").removeClass("modal__open");

        element.find(backdrop).remove();
        modalbtn.trigger("focus");

        this.escape()
        //this.resize()
    };

    //검은 배경
    Modal.prototype.backdrop = function(){
        var element = this.$element,
            backdrop = $("<div class='" + this.backdropselector + "'></div>")
        .prependTo(element)
        .css("height", 0)
        .css("height", element[0].scrollHeight)
        .on("click", $.proxy(this.hide, this));
        
    };
    Modal.prototype.adjustBackdrop = function () {
        this.$element.find("."+this.backdropselector)
        .css('height', 0)
        .css('height', this.$element[0].scrollHeight)
    };
    Modal.prototype.setSize = function (width, height) {
        var element = this.$element,
            modalWidth = this.options.width,
            modalHeight = this.options.height;

        if( modalWidth > $(window).width() ){
            modalWidth = $(window).width() - 50;
        }
        element.find("." + this.widthtselector).css({
            width : modalWidth
        });

        if(modalHeight){
            element.find("." + this.heightselector).css({
                height : modalHeight
            });
        }
    };

    Modal.prototype.resize = function(){
         if (this.isShown) {
            $(window).on('resize.modal', $.proxy(this.adjustBackdrop, this))
        } else {
            $(window).off('resize.modal')
        }
    };

    Modal.prototype.escape = function () {

        if (this.isShown && this.options.keyboard) {
            this.$element.on('keyup', $.proxy(function (e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown')
        }
    };

    function modalPlugin(option){
        return this.each(function(){
            var $this = $(this);
            var data  = $this.data("modal");
            var href = $this.attr("href");
            var $target = $($this.attr("data-target") || (href && href.replace(/.*(?=#[^\s]+$)/, ""))); // strip for ie7

            var options = $.extend({}, Modal.DEFAULTS, $this.data(), $target.data(), typeof option === 'object' && option);
            if (!data) {
               $this.data("modal", (data = new Modal(this, options)));
            }
            if (typeof option === "string") {
                data[option]()
            }
            else if (options.show) {
                data.show()
            }
        });
    }


    $.fn.madalPop             = modalPlugin;

    $(document).on("click.modal", "[data-button='modal']",function(e){
        e.preventDefault();
        var $this = $(this);   //버튼
        var option = $this.data();

        if ($this.is("button") || $this.is("a")) {
            e.preventDefault();
        }

        modalPlugin.call($this, option);

    });

});


//new windows open
$(function(){
    var OpenWindow = function(element, options) {
        this.init(element, options)
    };
    OpenWindow.DEFAULTS = {
        resizable: "no",
        scrollbars: "yes",
        status: "yes",
        width: 1000,
        height: 650
    };

    OpenWindow.prototype.init = function(element, options){
        this.element        = $(element);
        this.options        = options;
        if(this.options.url){
            this.href       = this.options.url;
        } else{
            this.href        = this.element.attr("href");
        }
        var setWindow, windowLeft, windowTop;

        if(this.options.left){
            windowLeft = this.options.left;
        } else{
            var popWidth  = this.options.width; // 파업사이즈 너비
            var winWidth  = window.innerWidth || document.body.clientWidth;  // 현재창의 너비
            var winX      = window.screenX || window.screenLeft || 0;// 현재창의 x좌표
            windowLeft = winX + (winWidth - popWidth) / 2;
        }

        if(this.options.top){
            windowTop= this.options.top
        } else{
            var popHeight = this.options.height; // 팝업사이즈 높이
            var winHeight = window.innerHeight || document.body.clientHeight ; // 현재창의 높이
            var winY      = window.screenY || window.screenTop || 0; // 현재창의 y좌표
            windowTop = winY + (winHeight - popHeight) / 2;
        }

        setWindow = "menubar=no, ";
        setWindow += "location=no, ";
        setWindow += "resizable=" + this.options.resizable + ", ";
        setWindow += "scrollbars=" + this.options.scrollbars + ", ";
        setWindow += "status=" + this.options.status + ", ";
        setWindow += "width=" + this.options.width + ", ";
        setWindow += "height=" + this.options.height + ", ";
        setWindow += "left=" + windowLeft + ", ";
        setWindow += "top=" + windowTop;

        windowObjectReference = window.open(this.href, "", setWindow);

    };

    function openwindowPlugin(option){
        var $this = $(this);
        var data  = $this.data('openwindow');
        //var options = typeof option === 'object' && option;
        var options = $.extend({}, OpenWindow.DEFAULTS, $this.data(), typeof option === 'object' && option);
        $this.data('openwindow', (data = new OpenWindow(this, options)));
        if (typeof option === 'string') data[option]()
    }
    $.fn.checkOpenWindow             = openwindowPlugin;


    $(document).on("click", "[data-button='openwindow']",function(e){
        e.preventDefault();
        var $this = $(this);   //버튼
        var option = $this.data();
        if ($this.is("button") || $this.is("a")) {
            e.preventDefault();
        }
        openwindowPlugin.call($this, option);
    });
});

$(function() {
    var createProgress = function (el, options) {
        var setDefault = {
            percent               : "0",
            duration              : 1000,
            color                 : "#fff"
        };
        this.element = el;
        this.options = $.extend({},setDefault,options);
        this.animated(this.element);
    };
    createProgress.prototype.animated = function (el) {
        this.element = $(el);
        this.element.animate({
           width: this.options.percent + '%'
        }, this.options.duration, function() {
            /* complate */
        });
    };
    function progressPlugin(option){
        return this.each(function(){

            var $this = $(this);
            var data  = $this.data("progress");
            var options = typeof option === "object" && option;
            if (data) {
                $this.data("progress", (data = new createProgress(this, options)));
            }
        });
    }
    $.fn.barAnimated    = progressPlugin;

    $(window).on("load",function(e){
        $("[data-progress=\"animated\"]").each(function () {
            var allprogress = $(this);
            var data = allprogress.data();
            progressPlugin.call(allprogress,data);
        });
    });
});


/**
 * circle_progress
 * */
$(function() {
    var createChartCircle = function (el, options) {
        var setDefault = {
            percent               : 0,
            size                : 100,
            svgclassname        : "chart-circle__item",
            emptyclassName      : "chart-circle__background",
            emptyfill           : "#e9e9e9",
            valueclassname      : "chart-circle__value",
            valuefill           : "#00acc1",
            viewbox             : "0 0 33.83098862 33.83098862",
            cx                  : "16.91549431",
            strokewidth         : 3,
            r                   : "15.91549431"
        };
        this.element = el;
        this.firstChild = el.firstChild;
        this.options = $.extend({},setDefault,options);
        this.createSvg();
        this.createCircle(this.options.emptyclassName, this.options.emptyfill);
        this.createCircle(this.options.valueclassname, this.options.valuefill, this.options.percent - this.options.strokewidth);
    };
    /** svg 생성 * */
    createChartCircle.prototype.createSvg = function() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        setAttributes(this.svg, {
            "class" : this.options.svgclassname,
            "width" : "100%",
            "height" : "100%",
            "viewBox" : this.options.viewbox
        });
        this.element.insertBefore(this.svg, this.firstChild);
    };
    /** circle 생성 * */
    createChartCircle.prototype.createCircle = function(classname, color, percent) {
        this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        setAttributes(this.circle, {
            "class" : classname,
            "stroke-width" : this.options.strokewidth,
            "stroke" : color,
            "cx" : this.options.cx,
            "cy" : this.options.cx,
            "r" : this.options.cx - (this.options.strokewidth / 2)
        });

        if(percent)  setAttributes(this.circle, {"stroke-dasharray" : percent + ", 100"});

        this.svg.appendChild(this.circle);
    };
    /** 속성 추가 * */
    function setAttributes(el, attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function ChartCirclePlugin(option){
        return this.each(function(){
            var $this = $(this);
            var data  = $this.data("chart-circle");
            var options = typeof option === "object" && option;

            if (!data) {
                $this.data("chart-circle", (data = new createChartCircle(this, options)));
            }
        });
    }

    $.fn.ChartCircle             = ChartCirclePlugin;

    if ($('.chart-circle').length) {
        $("[data-progress=\"circle\"]").each(function () {
            var allChartCircle = $(this);
            var data = allChartCircle.data();
            ChartCirclePlugin.call(allChartCircle,data);

        });
    }
});






/**
 * 출처 : https://github.com/jonathantneal/svg4everybody
 * svg sprite를 위한  symbol, use IE 브라우저 지원 javascript
 * */
!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }; // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                xhr._embeds.push({
                                    parent: parent,
                                    svg: svg,
                                    id: id
                                }), // prepare the xhr ready state change event
                                loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});


$(function(){
    svg4everybody();
});



//TabMenu
$(function(){
    var tab = function (element) {
        this.element = $(element);
    };
    tab.prototype.show = function () {
        var $this    = this.element,
            $ul      = $this.closest("ul"),
            $target,
            $targetGroup,
            selector = $this.attr("href");
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""); // strip for ie7

        if ($this.parent("li").hasClass("active")) {
            return;
        }
        $target = $(selector);
        $targetGroup = $(selector).parent().closest("div");

        this.activate($this.closest("li"), $ul, "> .active");
        this.activate( $target, $targetGroup, ".p-tab__body.active");
    };

    tab.prototype.activate = function (element, container, cts) {
        var $active    = container.find(cts);
        if ($active.hasClass("p-tab__body--slide")) {
            $active
                .stop()
                .hide()
                .attr("title","숨김")
                .removeClass("active")
                .end();
            element
                .stop()
                .attr("title","열림")
                .slideDown(500, function () {
                    $(this).addClass("active");
                });
        }
        else if ($active.hasClass("fade")) {
            $active
                .stop()
                .hide()
                .attr("title","숨김")
                .removeClass("active")
                .end();
            element
                .stop()
                .attr("title","열림")
                .fadeIn(300, function () {
                    $(this).addClass("active");
                });
        }
        else {
            $active
                .removeClass("active")
                .attr("title","숨김")
                .end();
            element
                .addClass("active")
                .attr("title","열림");
        }
    };

    $(document).on("click", "[data-button='tab']", function (e) {
        if( !$(this).data("url") ){
            e.preventDefault();
            $(this).each(function () {
                var $this, data, option;
                $this = $(this);
                data = $this.data("tab");
                option = "show";
                if (!data) {
                    $this.data("tab", (data = new tab(this)));
                }

                if (typeof option === "string") {
                    data[option]();
                }
                this.options = $this.data();
                if(this.options.dropdown){
                    Dropdown(); // tab 내  dropdown 실행
                }
            });
        }
    });
});



//Accordion
$(function(){
    var Accordion = function (element,option,options) {
        this.element = $(element);
        this.option = option;
        this.options = options;
    };

    Accordion.prototype.show = function () {
        var $this    = this.element,
            selector = $this.attr("href"),
            $target = $(selector);
        if(this.options.arange){
            this.openToggle(this.options.arange);
            return;
        }
        if ($this.hasClass("active")) {
           this.disabled($this);
           this.disabled($target, "display");
           return;
        }
        this.activate($this);
        this.activate($target, "display");
    };

    Accordion.prototype.activate = function (element, display) {
        element.addClass("active");
        if(display){
            element.show();
            element.attr("title","확장됨");
        }

    };
    Accordion.prototype.disabled = function (element, display) {
        element.removeClass("active");
        if(display){
            element.hide();
            element.attr("title","축소됨");
        }
    };
    Accordion.prototype.openToggle= function (status) {
        var $target    = $(this.options.parent).find('[data-accordion]');
        $target.each(function () {
            var active = $(this).attr("href");

            if(status === "open"){
                $(this).addClass("active");
                $(active)
                .addClass("active")
                .show()
                .attr("title","확장됨");
            } else{
                $(this).removeClass("active");
                $(active)
                .removeClass("active")
                .hide()
                .attr("title","축소됨");
            }
        });
    };
    $(document).on("click", "[data-accordion]", function (e) {
        e.preventDefault();
        $(this).each(function () {
            var $this = $(this);
            var data  = $this.data("accordion");
            var option = "show";
            var options = $this.data();
            if (!data) {
                $this.data("accordion", (data = new Accordion(this, option, options)));
            }
            if (typeof option === "string") {
                data[option]();
            }
            this.options = $this.data();
        });

    });
});


$(function() {
    var tableElement = function(table, options){
        var setDefault = {
            tabletype: "scroll",
            breakparent : "#container",
            addheadelement : "add-head",
            addwrapclass : "table-responsive",
            target: window,
            breakpoint : 640,
            breakstatus : false
        };
        this.element = $(table);
        this.options = $.extend({},setDefault,options);

        this.element.addClass(this.options.tabletype);
        this.$target = $(this.options.target)
        .on("resize", $.proxy(this.tableCheck, this));
        this.tableCheck();
    };

    tableElement.prototype.getState = function() {
        if($(window).innerWidth() > this.options.breakpoint){
            return "notRwd";
        } else {
            return "applyRwd";
        }
    };

    tableElement.prototype.getWidth = function() {
        this.element
        .css("width", this.options.breakpoint)
        .closest("." + this.options.addwrapclass).addClass("active")
        .addClass("mobile");
        this.options.breakstatus = true;
    };
    tableElement.prototype.removeWidth = function() {
        this.element
        .css("width", "")
        .closest("." + this.options.addwrapclass).removeClass("active")
        .removeClass("mobile");
        this.options.breakstatus = false;
    };

    tableElement.prototype.getWrap = function(classname) {
        var wrapElement = this.element,
            wrapClassName =  classname,
            addClassTarget;
        if(!wrapClassName) {
            wrapClassName = this.options.addwrapclass;
        }
        addClassTarget = wrapElement.closest("." + wrapClassName);
        if(!addClassTarget[0]) {
            wrapElement.wrap("<div class='" + wrapClassName + "' />");
        }
    };

    tableElement.prototype.getIcon = function() {
        addClassTarget = this.element.closest("." +this.options.addwrapclass);
        var hasClassName = this.hasClassName(addClassTarget, this.options.scrollguide);

        if(this.options.scrollguide ){
            var scrollBottomPosition =  ( this.element.offset().top  - $(window).outerHeight() ) <= $(window).scrollTop(),
                scrollTopPosition =   this.element.offset().top >= $(window).scrollTop();

            if (scrollBottomPosition && scrollTopPosition ) {
                if(!hasClassName){
                    addClassTarget
                    .removeClass("bounceout")
                    .addClass("bouncein " + this.options.scrollguide);
                    //아이콘 표시후 숨기기
                    bounceTime = setTimeout($.proxy(function(){
                        this.bounceIcon();
                    }, this),3000);
                }
            }else{
                this.removeIcon()
            }
        }
    };
    tableElement.prototype.bounceIcon = function() {
        addClassTarget = this.element.closest("." +this.options.addwrapclass);
        if(this.options.scrollguide){
            addClassTarget
            .removeClass("bouncein")
            .addClass("bounceout");
        }
    };

    tableElement.prototype.removeIcon = function() {
        if(this.options.scrollguide){
            addClassTarget = this.element.closest("." +this.options.addwrapclass);
            var hasClassName = this.hasClassName(addClassTarget, this.options.scrollguide);
            if(hasClassName){
                addClassTarget.removeClass(this.options.scrollguide);
            }

        }
    };

    tableElement.prototype.hasClassName = function(el, className) {
        var name = el.hasClass(className);
        return name;
    };

    tableElement.prototype.getSimple = function() {
        var trs = this.element.find('tr');
        var trsChild;
        var grid = {};
        var cells;


        trs.each(function(index,item){
            if (!grid[index]) {
                grid[index] = {};
            }
            trsChild = item.childNodes;
            cells = 0;
            for (var j = 0, cntJ = trsChild.length; j < cntJ; j++) {
                if(trsChild[index]){
                    grid[index][cells++] = trsChild[j];
                }

            }
            var tds = $(item).find("td");
            tds.wrapInner( "<span class='tds'></span>")  //셀내용 span 감싸기
        });

        var cellHeader = "";
        for (row in grid) {
            if (row == 0) {
                continue;
            }
            for (cell in grid[row]) {
                if (cell == 0) {
                    continue;
                }
                var cellHeader =  $(grid[0][cell]).html();
                var insertCellHeader = "<span class=" + this.options.addheadelement + ">" + cellHeader + "</span>";
                var insertCellHeader = "<span class=" + this.options.addheadelement + ">" + cellHeader + "</span>"; //두번처리 이유 : 한번의 경우 min.js 적용시 표시안됨
                $(insertCellHeader).prependTo(grid[row][cell]); //모바일 th추가건으로 인한 로딩 시간차 발생시 제거 여부 판단 필요

            }
        }

    };

    tableElement.prototype.removeSimple = function(){
        this.element.find("." + this.options.addheadelement).remove();
        var tds = this.element.find(".tds");
        tds.contents().unwrap( ".tds")  //셀내용 span 감싸기

    };


    tableElement.prototype.tableCheck = function() {
        var tableStatus = this.getState();

        if(this.tableStatus !== tableStatus) {
            this.tableStatus = tableStatus;

            switch (this.options.tabletype) {
                case "simple" :
                    if (this.tableStatus === "applyRwd") {
                        this.getSimple();
                        this.element.addClass("mobile");
                    } else {
                        this.removeSimple();
                        this.element.removeClass("mobile");
                    }
                    break;
                case "block" :
                    if (this.tableStatus === "applyRwd") {
                        this.element.addClass("mobile");
                    } else {
                        this.element.removeClass("mobile");
                    }
                    break;
                default :
                    this.getWrap();  // table 감싸기 / className 전달
                    if( this.tableStatus === "applyRwd") {
                        this.getWidth(); // table width  추가
                        this.getIcon();
                        $(window).on('scroll', $.proxy(this.getIcon, this));

                    } else {
                        this.removeWidth();
                        this.removeIcon()
                    }
                    break;
            }
        }
    };

    function tableRwd(option){
        return this.each(function(){
            var $this = $(this);
            var data  = $this.data("rwd");
            var options = typeof option === "object" && option;

            if (!data) {
                $this.data("rwd", (data = new tableElement(this, options)));
            }
        });
    }


    $.fn.tableRwd             = tableRwd;

    if (navigator.appVersion.indexOf("MSIE 8.") === -1) {
        $(window).on("load",function(e){
            $("[data-table=\"rwd\"]").each(function () {
                var allTableRwd = $(this);
                var data = allTableRwd.data();
                tableRwd.call(allTableRwd,data);
            });
        });
    }
});



/* Hover - add/remove Class  */
$(function(){
    var manageButton =  {
        body : $("tr"),
        buttons : $(".manage__show, .manage__body"),
        activeClass : "active"
    };

    manageButton.buttons.each(function(i){
        var area = manageButton.buttons.eq(i).closest(manageButton.body);

        var buttonHeight = area.outerHeight();
        $(this).css({height : buttonHeight-1});

        $(this).hover(function () {
            area.stop(true,true).addClass(manageButton.activeClass);
        }, function () {
            area.stop(true,true).removeClass(manageButton.activeClass);
        });
    });
});


$(function() {
    var Tooltip = function (element, options) {
        this.init("tooltip", element, options)
    };

    Tooltip.DEFAULTS = {
        placement: "top",
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        container: false,  //툴팁을 특정 요소에 넣을 것인지 지정
        viewport: {
            selector: "body",
            padding: 0
        }
    };

    Tooltip.prototype.init = function (type, element, options) {
        this.enabled   = true;
        this.type      = type;
        this.$element  = $(element);
        this.options   = this.getOptions(options);
        this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);

        var triggers = this.options.trigger.split(" ");

        for (var i = triggers.length; i--;) {
            var trigger = triggers[i];

            if (trigger !== "manual") {
                var eventIn  = trigger === "hover" ? "mouseenter" : "focusin";
                var eventOut = trigger === "hover" ? "mouseleave" : "focusout";

                this.$element.on(eventIn  + "." + this.type, this.options.selector, $.proxy(this.enter, this));
                this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
            }
        }
        if(this.options.selector) {
            //data-selector 있으면
            this._options = $.extend({}, this.options, { trigger: "manual", selector: "" });
        } else{
            this.fixTitle()
        }
    };

    Tooltip.prototype.getDefaults = function () {
        return Tooltip.DEFAULTS
    };

    //옵션과 기본옵션 머지
    Tooltip.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);

        return options
    };


    Tooltip.prototype.getDelegateOptions = function () {
        var options  = {};
        var defaults = this.getDefaults();

        this._options && $.each(this._options, function (key, value) {
            if (defaults[key] !== value) options[key] = value
        });

        return options
    };

    Tooltip.prototype.enter = function (obj) {
        var self = $(obj.currentTarget).data(this.type);  //선택(?)한 이벤트 버튼 =>  target : 이벤트 받는곳 / currentTarget : 이벤트리스너를 받았던 곳

        self.hoverState = "in";
        if (self.hoverState === "in") {
            self.show()
        }
    };

    Tooltip.prototype.leave = function (obj) {

        var self = $(obj.currentTarget).data(this.type);

        self.hoverState = "out";

        if (self.hoverState === "out") {
           self.hide()
        }


    };

    Tooltip.prototype.show = function () {
        var e = $.Event("show." + this.type);  //tooltip show 이벤트, 대상은 버튼

        if (this.hasContent() && this.enabled) {  //표시할 내용이 있는지, 표시 여부 설정이 되어 있는지


            var that = this;
            var $tip = this.tip(); //tooltip 으로 표시될 영역 요소 생성 => $(this.options.template) 생성
            var tipId = this.getUID(this.type); ////aria role, describedby 값(id) 생성을 위한 랜덤 수 생성

            this.setContent();  //ata-original_title 값 가져옴

            $tip.attr("id", tipId);  // tooltip에 aria용 id적용
            this.$element.attr("aria-describedby", tipId); // 버튼에  aria-describedby id값 적용
            // 위치 지정 - 
            var placement = this.options.placement;

            var autoToken = /\s?auto?\s?/i;
            var autoPlace = autoToken.test(placement); //위치값에 auto 가 있는지 확인
            if (autoPlace) placement = placement.replace(autoToken, "") || "top";  // auto와 동시 사용된 위치 정보

            $tip
            .detach() //중복요소 제거
            .css({ top: 0, left: 0, display: "block" })
            .addClass(placement)
            .data(this.type, this);

            //툴팁 표시할 내용
            if(this.options.container){   //툴팁을 특정 요소에 넣을 것이면
                $tip.appendTo(this.options.container)
               
            } else{
                $tip.insertAfter(this.$element);  //버튼요소 뒤에 툴팁 요소 추가
            }

            var pos          = this.getPosition();
            var actualWidth  = $tip[0].offsetWidth;  //tooltip 크기
            var actualHeight = $tip[0].offsetHeight;

            if (autoPlace) {  //auto 일때
                var orgPlacement = placement;
                var $container   = this.options.container ? $(this.options.container) : this.$element.parent();
                var containerDim = this.getPosition($container);
                
                placement = placement === "bottom" && pos.bottom + actualHeight > containerDim.bottom ? "top"    :
                placement === "top"    && pos.top    - actualHeight < containerDim.top    ? "bottom" :
                placement ==="right"  && pos.right  + actualWidth  > containerDim.width  ? "left"   :
                placement === "left"   && pos.left   - actualWidth  < containerDim.left   ? "right"  :
                placement;

                $tip
                .removeClass(orgPlacement)
                .addClass(placement)
            }

            //툴팀 표시 위치 계산 됨 - left, top 위치 값
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

            this.applyPlacement(calculatedOffset, placement);

        }
    };

    Tooltip.prototype.applyPlacement = function (offset, placement) {
        var $tip   = this.tip();
        var width  = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;

        // getBoundingClientRect에는 차이가 있기 때문에 수동으로 여백을 읽는다.
        var marginTop = parseInt($tip.css("margin-top"), 10);
        var marginLeft = parseInt($tip.css("margin-left"), 10);

        // ie8 / 9에 대한 NaN을 확인.
        if (isNaN(marginTop))  marginTop  = 0;
        if (isNaN(marginLeft)) marginLeft = 0;

        offset.top  = offset.top  + marginTop;
        offset.left = offset.left + marginLeft;

        // $.fn.offset 은 픽셀을 반올림 하지 않음
        $.offset.setOffset($tip[0], $.extend({
            using: function (props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                })
            }
        }, offset), 0);


        $tip.addClass("active");

        // tip을 새 offset에 배치하면 tip의 크기가 자동으로 조정되는지 확인
        var actualWidth  = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;

        if (placement === "top" && actualHeight !== height) {
            offset.top = offset.top + height - actualHeight;
        }

        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

        if (delta.left) offset.left += delta.left;
        else offset.top += delta.top;

        var isVertical          = /top|bottom/.test(placement);  //top,bottom 이면 true
        var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
        var arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";

        $tip.offset(offset);


        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
    };

    Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
        this.arrow()
        .css(isHorizontal ? "left" : "top", 50 * (1 - delta / dimension) + "%")
        .css(isHorizontal ? "top" : "left", "")
    };

    Tooltip.prototype.setContent = function () {
        var $tip  = this.tip();
        var title = this.getTitle();

        $tip.find(".tooltip-inner")["text"](title);
        $tip.removeClass("fade in top bottom left right active")

        //tip-inner maxwidth 지정
        if(this.options.maxwidth){
            $tip.find(".tooltip-inner").css({
                maxWidth: this.options.maxwidth
            });
        }

    };

    Tooltip.prototype.hide = function (callback) {
        var that = this;
        var $tip = this.tip();
        var e    = $.Event("hide." + this.type);

        function complete() {
            if (that.hoverState !== "in") $tip.detach();
            that.$element
            .removeAttr("aria-describedby")
            .trigger("hidden." + that.type);
            callback && callback()
        }

        this.$element.trigger(e);

        if (e.isDefaultPrevented()) return;

        $tip.removeClass("active");

        complete();

        this.hoverState = null;

        return this
    };

    // title이 있는 경우에는 data-original_title을 title내용을 표시.
    // title 사용시 data-original_title 속성 없어도 됨.
    Tooltip.prototype.fixTitle = function () {
        var $e = this.$element;
        if ($e.attr("title") || typeof (this.options.original_title) !== "string") {
            $e.attr("data-original_title", $e.attr("title") || "").attr("title", "")
        }

    };

    //data-original_title 값 가져옴
    Tooltip.prototype.hasContent = function () {
        return this.getTitle()
    };

    //요소의 크기, 여백, xy
    Tooltip.prototype.getPosition = function ($element) {
        $element   = $element || this.$element;

        var el     = $element[0];
        var isBody = el.tagName === "BODY";

        var elRect    = el.getBoundingClientRect();   //ie9부터 지원하며 요소의 크기, 상하와우 여백, x,y를 가져온다  //ie9부터 지원됨

        if (elRect.width == null) {
            // ie8 이하는 수동으로 width, height 계산한다.
            elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
        }
        var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset();
        var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
        var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null;

        return $.extend({}, elRect, scroll, outerDims, elOffset)
    };

    //툴팀 표시 위치 계산 : pos - 버튼요소, actual~ - 툴팁 크기
    Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
        return placement === "bottom" ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
                placement === "top"    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
                placement === "left"   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
                /* placement === "right" */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

    };

    //영역을 벗어나면 위치 변경
    Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
        var delta = { top: 0, left: 0 };
        if (!this.$viewport) return delta;

        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
        var viewportDimensions = this.getPosition(this.$viewport);

        if (/right|left/.test(placement)) {
            var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll;
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            if (topEdgeOffset < viewportDimensions.top) { // top overflow
                delta.top = viewportDimensions.top - topEdgeOffset
            } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
            }
        } else {
            var leftEdgeOffset  = pos.left - viewportPadding;
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
            if (leftEdgeOffset < viewportDimensions.left) { // left overflow
                delta.left = viewportDimensions.left - leftEdgeOffset
            } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
            }
        }

        return delta
    };

    Tooltip.prototype.getTitle = function () {
        var title;
        var $e = this.$element;
        title = $e.attr("data-original_title");
        if(!title){
            title = this.options.original_title;
        }
        return title
    };

    //aria role, describedby 값(id) 생성을 위한 랜덤 수 생성
    Tooltip.prototype.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 1000000);
        while (document.getElementById(prefix));
        return prefix
    };

    //tooltip 표시 영역 요소 생성 => this.options.template
    Tooltip.prototype.tip = function () {
        return (this.$tip = this.$tip || $(this.options.template))
    };

    Tooltip.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"))
    };

    Tooltip.prototype.toggle = function (e) {

        var self = this;
        if (e) {
            self = $(e.currentTarget).data(this.type);
            if (!self) {
                self = new this.constructor(e.currentTarget);
                //self = new this.constructor(e.currentTarget, this.getDelegateOptions());
                $(e.currentTarget).data(this.type, self)
            }
        }
        if (self.tip().hasClass("active")) {
            self.leave(self)
        } else {
            self.enter(self)
        }
    };
    function tooltipPlugin(option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data("tooltip");
            var options = typeof option === "object" && option;
            if (!data) {
                $this.data("tooltip", (data = new Tooltip(this, options)));
            }

        })
    }

    $.fn.tooltip             = tooltipPlugin;
    $.fn.tooltip.Constructor = Tooltip;  //popover와 연계


    //Popover
    var Popover = function (element, options) {
        this.init('popover', element, options)
    };

    if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');

    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'hover focus',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-title"></div><div class="popover-content"></div></div>'
    });


    // popOver - tooltip 연결
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);

    Popover.prototype.constructor = Popover;

    Popover.prototype.getDefaults = function () {
        return Popover.DEFAULTS
    };

    Popover.prototype.setContent = function () {
        var $tip    = this.tip();
        var title   = this.getTitle();
        var content = this.getContent();

        $tip.find('.popover-title')["text"](title);
        $tip.find('.popover-content').children().detach().end()["text"](content);
        $tip.removeClass('fade top bottom left right in active');

        // IE8 지원을 위해 수동으로 체크
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();


        //tip max-width 지정
        if(this.options.maxwidth){
            $tip.css({
                maxWidth: this.options.maxwidth
            });
        }

    };

    Popover.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };

    Popover.prototype.getContent = function () {
        var $e = this.$element;

        return $e.attr('data-content') || (typeof this.options.content === 'function' ?
                this.options.content.call($e[0]) :
                this.options.content)
    };

    Popover.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
    };

    Popover.prototype.tip = function () {
        if (!this.$tip) this.$tip = $(this.options.template);
        return this.$tip
    };

    function popoverPulgin(option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('popover');
            var options = typeof option === 'object' && option;

            //if (!data && option === 'destroy') return;
            if (!data) $this.data('popover', (data = new Popover(this, options)));
            if (typeof option === 'string') data[option]()

        })
    }

    $.fn.popover             = popoverPulgin;
    $.fn.popover.Constructor = Popover;

    /*
    * tootip/popover
    */
    $(window).on("load",function(e){
        $("[data-button=\"tooltip\"]").each(function () {
            if($(this).is('a')) {
                $(this).on("click",function(e){
                    e.preventDefault();
                });
            }
            var allTooltip = $(this);
            var data = allTooltip.data();
            tooltipPlugin.call(allTooltip,data);

        });
    });

    $(window).on("load",function(e){
        $("[data-button=\"popover\"]").each(function () {
            if($(this).is('a')) {
                $(this).on("click",function(e){
                    e.preventDefault();
                });
            }
            var allPopover = $(this);
            var data = allPopover.data();
            popoverPulgin.call(allPopover,data);
        });

    });

});



