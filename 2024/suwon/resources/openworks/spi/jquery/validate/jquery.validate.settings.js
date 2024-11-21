/*
 * validate의 기본 속성을 재정의 한다.
 */
$.validator.defaults.errorElement = "p";
$.validator.defaults.errorPlacement = function(error, element) {
    error.appendTo($(element).parent());
};