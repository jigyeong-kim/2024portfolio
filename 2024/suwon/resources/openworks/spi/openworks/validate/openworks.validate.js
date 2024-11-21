/*
 * 기본 적으로 값이 없는 경우 필수 조건(requiredValidator, notnullValidator)으로만
 * 검증하며, 이외는 값이 있는 경우에만 검증을 한다.
 * 
 * 즉! 값이 없는 경우는 기본적으로는 모두 검증결과가 참이다.
 */
(function($) {
    $.extend($.fn, {
        alphabeticValidator : function() {
            var value = this.val();
            if(!value) {
                return true;
            }

            return /^[a-zA-Z]+$/i.test(value);
        },
        alphalowerValidator : function() {
            var value = this.val();
            if (!value) {
                return true;
            }

            return /^[a-z]+$/.test(value);
        },
        alphaupperValidator : function() {
            var value = this.val();
            if (!value) {
                return true;
            }

            return /^[A-Z]+$/.test(value);
        },
        alphanumericValidator : function() {
            var value = this.val();
            if (!value) {
                return true;
            }

            return /^[a-zA-Z\d]+$/.test(value);
        },
        containsValidator : function(values) {
            var value = this.val();
            if(!value) {
                return true;
            }

            var compareValue = eval(values);

            for( var i = 0; i < compareValue.length; i++) {
                if(value == compareValue[i]) {
                    return true;
                }
            }

            return false;
        },
        dateValidator : function(date) {
            var value = this.val();
            if(!value) {
                return true;
            }

            return !/Invalid|NaN/.test(new Date(value));
        },
        emailValidator : function() {
            var value = this.val();
            if(!value) {
                return true;
            }

            return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value);
        },
        juminnoValidator : function() {
            var value = this.val();

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

            return true;
        },
        maxlengthValidator : function(max) {
            var value = this.val();
            if(!value) {
                return true;
            }

            if(value.length >= max) {
                return false;
            }

            return true;
        },
        minlengthValidator : function(min) {
            var value = this.val();
            if(!value) {
                return true;
            }

            if(value.length <= min) {
                return false;
            }

            return true;
        },
        rangelengthValidator : function(min, max) {
            var value = this.val();
            if(!value) {
                return true;
            }

            var valueLength = value.length;

            if(min && valueLength < min) {
                return false;
            }
            if(max > 0 && valueLength > max) {
                return false;
            }

            return true;
        },
        digitsValidator : function() {
            var value = this.val();
            if (!value) {
                return true;
            }

            return /^\d+$/.test(value);
        },
        numberValidator : function() {
            var value = this.val();
            if (!value) {
                return true;
            }

            return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
        },
        maxValidator : function(max) {
            var value = this.val();
            if(!value) {
                return true;
            }

            var intValue;
            try {
                intValue = new Number(value);
            } catch(e) {
                return false;
            }

            if(intValue >= max) {
                return false;
            }

            return true;
        },
        minValidator : function(min) {
            var value = this.val();
            if(!value) {
                return true;
            }

            var intValue;
            try {
                intValue = new Number(value);
            } catch(e) {
                return false;
            }

            if(min && intValue < min) {
                return false;
            }

            return true;
        },
        rangeValidator : function(min, max) {
            var value = this.val();
            if(!value) {
                return true;
            }

            var intValue;
            try {
                intValue = new Number(value);
            } catch(e) {
                return false;
            }

            if(min && intValue <= min) {
                return false;
            }
            if(max > 0 && intValue >= max) {
                return false;
            }

            return true;
        },
        regexpValidator : function(regexp) {
            var value = this.val();
            if(!value) {
                return true;
            }
            var exp = eval("/" + regexp + "/");

            return exp.test(value);
        },
        notnullValidator : function() {

            var valueSize = getLength(this);
            if(valueSize > 0) {
                return true;
            }

            return false;
        },
        requiredValidator : function() {

            var valueSize = getLength(this);
            if(valueSize > 0) {
                return true;
            }

            return false;
        },
        requirefromValidator : function(name, value, desc) {

            var val = $("[name='" + name + "']:checked").val();
            if(!val) {
                return true;
            }

            if(val == value) {
                var checkedValue = this.filter(':checked').val();
                if(!checkedValue) {
                    return false;
                }
            }
            return true;
            return false;

        },
        sizeValidator : function(min, max) {

            var valueSize = getLength(this);

            if(valueSize > 0) {
                if(min && valueSize < min) {
                    return false;
                }
                if(max > 0 && valueSize > max) {
                    return false;
                }
            }

            return true;
        },
        urlValidator : function() {
            var value = this.val();
            if (!value) {
                return true;
            }

            return /(http|https|ftp):\/\/[^\s^\.]+(\.[^\s^\.]+)*/.test(value);
        },
        nowhitespaceValidator : function() {
            var value = this.val();
            if (!value) {
                return true;
            }

            return /^\S+$/i.test(value);
        }
	});
})(jQuery);

/**
 * 대상 항목의 타입에 따라서 길이를 구한다.
 */
var getLength = function(elem) {

    var valueSize = 0;

    if(elem.is("input") && (elem.attr("type") == "checkbox" || elem.attr("type") == "radio")) {
        valueSize = elem.filter(":checked").length;
    } else if(elem.is("select")) {
        valueSize = $("option:selected", elem).length;
        if(valueSize == 1 && elem.val() == "") {
            valueSize = valueSize - 1;
        }
    } else {
        var value = elem.val();

        if(value != "" && !value) {
            alert("오류 : " + elem.selector + " 속성을 찾을 수 없습니다.");
            return valueSize;
        } else {
            valueSize = value.length;
        }
    }

    return valueSize;
};
