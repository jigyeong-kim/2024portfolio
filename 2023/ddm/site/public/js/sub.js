'use strict';

$(function() {
    var $window = $(window),
        $html = $('html'),
        $container = $('#container'),
        $footer = $('#footer');

    //타이틀박스
    if($('div').hasClass('box') && $('div').hasClass('basic')) {
        $html.addClass('line_remove')
    }

    $window.on('scroll', function() {
        var scrollTop = $window.scrollTop(),
            $contents = $('main.colgroup #contents');


        //태블릿, 모바일 비쥬얼 고정
        if($window.width() < 1201) {
            if(scrollTop > 0){
                $html.addClass('fixed');
            }else{
                $html.removeClass('fixed');
            }
        }

    });



});