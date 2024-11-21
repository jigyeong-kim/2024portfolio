/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function() {

	function stripHtml(value) {
		// remove html tags and space chars
		return value.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ')
		// remove numbers and punctuation
		.replace(/[0-9.(),;:!?%#$'"_+=\/-]*/g,'');
	}
	jQuery.validator.addMethod("maxWords", function(value, element, params) {
	    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length < params;
	}, jQuery.validator.format("Please enter {0} words or less."));

	jQuery.validator.addMethod("minWords", function(value, element, params) {
	    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
	}, jQuery.validator.format("Please enter at least {0} words."));

	jQuery.validator.addMethod("rangeWords", function(value, element, params) {
	    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params[0] && value.match(/bw+b/g).length < params[1];
	}, jQuery.validator.format("Please enter between {0} and {1} words."));

})();

jQuery.validator.addMethod("alphanumeric", function(value, element) {
	return this.optional(element) || /^\w+$/i.test(value);
}, "영문과 숫자만 입력하세요.");

jQuery.validator.addMethod("alphaupper", function(value, element) {
    return this.optional(element) || /^[A-Z]+$/.test(value);
}, "영문자(대문자)만 입력하세요.");

jQuery.validator.addMethod("alphauppernumeric", function(value, element) {
    return this.optional(element) || /^[A-Z0-9_]+$/.test(value);
}, "영문자(대문자), 숫자, _ 만 입력하세요.");

jQuery.validator.addMethod("alphabetic", function(value, element) {
    return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
}, "영문자만 입력하세요.");

jQuery.validator.addMethod("alphalower", function(value, element) {
    return this.optional(element) || /^[a-z]+$/.test(value);
}, "영문자(소문자)만 입력하세요.");

jQuery.validator.addMethod("directory", function(value, element) {
    return this.optional(element) || /^[\/?a-z]+$/.test(value);
}, "영문 또는 슬래시('/')만 입력하세요.");

jQuery.validator.addMethod("phone", function(value, element) {
    return this.optional(element) || /^[\-?\d]+$/.test(value);
}, "숫자 또는 대시('-')만 입력하세요. (02-111-2222)");

jQuery.validator.addMethod("nowhitespace", function(value, element) {
    return this.optional(element) || /^\S+$/i.test(value);
}, "공백문자 없이 입력하세요.");

jQuery.validator.addMethod("notnull", function(value, element, param) {
    // check if dependency is met
    if(!this.depend(param, element))
        return "dependency-mismatch";
    switch(element.nodeName.toLowerCase()) {
    case 'select':
        // could be an array for select-multiple or a string, both are fine this
        // way
        var val = $(element).val();
        return val && val.length > 0;
    case 'input':
        if(this.checkable(element))
            return this.getLength(value, element) > 0;
    default:
        return $.trim(value).length > 0;
    }
}, "필수 입력항목입니다.");

jQuery.validator.addMethod("lessThen", function(value, element, param) {

    return value <= $(param[0]).val();

}, "{1}의 값은 {2}의 값 보다 작아야 합니다.");

jQuery.validator.addMethod("juminno", function(value, element) {

    var result = true;
    if(!value) {
        return true;
    }

    var resNo = value.replace("-", "");
    if(resNo.length < 13) {
        return false;
    }
    for(i = 0, sum = 0; i < 12; i++) {
        sum += (((i % 8) + 2) * (resNo.charAt(i) - "0"));
    }

    sum = 11 - (sum % 11);
    sum = sum % 10;
    if(sum != resNo.charAt(12)) {
        return false;
    }

    return this.optional(element) || result;
}, "올바른 주민등록번호를 입력하세요.");

jQuery.validator.addMethod("contains", function(value, element, param) {

    var result = true;
    if(!value) {
        return true;
    }

    var compareValue = eval(param);

    for( var i = 0; i < compareValue.length; i++) {
        if(value == compareValue[i]) {
            result = true;
            break;
        }
    }

    return this.optional(element) || result;
}, "{0} 값 중에서 입력하세요.");

jQuery.validator.addMethod("requirefrom", function(value, element, param) {

    var val = $("[name='" + param[0] + "']:checked").val();
    if(!val) {
        return true;
    }

    if(val == param[1]) {
        if(this.checkable(element)) {
            var checkedValue = $(element).filter(':checked').val();
            if(!checkedValue) {
                return false;
            }
        } else {
            var val = $(element).val();
            if(val =="") {
                return false;
            }
        }
    }
    return true;

}, "{2} 선택시 필수 입력항목입니다.");

/**
 * Return true if the field value matches the given format RegExp
 *
 * @example jQuery.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
 * @result true
 *
 * @example jQuery.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
 * @result false
 *
 * @name jQuery.validator.methods.pattern
 * @type Boolean
 * @cat Plugins/Validate/Methods
 */
jQuery.validator.addMethod("pattern", function(value, element, param) {
   return this.optional(element) || param.test(value);
}, "Invalid format.");

