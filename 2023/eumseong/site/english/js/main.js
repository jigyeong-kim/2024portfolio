(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    function splittingTextDelay(object, speed, delay_speed) {
        var splitLength = $(object).find('.char').length;
        for (var i = 0; i < splitLength; i++) {
            if ($(object).data('css-property') == 'animation') {
                $(object).find('.char').eq(i).css('animation-delay', delay_speed + (i * speed) + 's');
            } else if ($(object).data('css-property') == 'transition') {
                $(object).find('.char').eq(i).css('transition-delay', delay_speed + (i * speed) + 's');
            }
        }
    }

    $(function() {

        // 텍스트 애니메이션

        Splitting();

        var $splittingTxt = $('.split_ani');
        $splittingTxt.each(function () {
            splittingTextDelay(this, $(this).data('speed'), $(this).data('speed-delay'));
        });

        var $splittingTxt = $('.festival_ani');
        $splittingTxt.each(function () {
            splittingTextDelay(this, $(this).data('speed'), $(this).data('speed-delay'));
        });

        //스크롤 애니메이션 시작
        $(window).on('scroll', function(){
            var scrollTop = $(window).scrollTop(),
                winBottom = scrollTop + $(window).height(),
                $section = $('.scroll_ani');
            $section.each(function(){
                var $this = $(this),
                    thisTop = $this.offset().top;
                if(winBottom > (thisTop + 100)){
                    $this.attr('data-on', 'on');
                }
                if(winBottom < (thisTop - 50)){
                    $this.attr('data-on', 'off');
                }
            });
        });

        // 비주얼

        var $visual_box = $('.visual_box'),
            $visual_slide = $visual_box.find('.visual_list'),
            $visual_control = $visual_box.find('.visual_control');

        $visual_slide.slick({
            fade: true,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 7500,
            prevArrow : $visual_control.find('.prev_btn'),
            nextArrow : $visual_control.find('.next_btn'),
            dots: false,

            //추가 기능
            total : $visual_control.find('.total'),
            current : $visual_control.find('.current'),
            // responsive: [ // 반응형 웹 구현 옵션
            //     {
            //         breakpoint: 800,
            //         settings: {
            //             autoplay: false,
            //         }
            //     },
            // ]
        });

        // rowgroup3 tourism

        var $tourism_box = $('.tourism_wrap'),
            $tourism_slide = $tourism_box.find('.tourism_list'),
            $tourism_dot = $tourism_box.find('.tourism_dot');

        $tourism_slide.slick({
            autoplay: false,
            fade: true,
            infinite: true,
            dots: false,
            arrows: false,
            asNavFor: $tourism_dot,
        });
        $tourism_dot.slick({
            infinite: true,
            autoplay: true,
            vertical: true,
            centerMode: true,
            slidesToScroll: 1,
            asNavFor: $tourism_slide,
            dot: false,
            arrows: false,
            focusOnSelect: true,
        });

        // rowgoupr4 festival

        var $festival_box = $('.festival_wrap'),
            $festival_slide = $festival_box.find('.festival_list'),
            $festival_dot = $festival_box.find('.festival_dot'),
            $festival_control = $festival_box.find('.festival_control');

        $festival_slide.slick({
            autoplay: false,
            fade: true,
            infinite: true,
            dots: false,
            arrows: false,
            asNavFor: $festival_dot,
        });
        $festival_dot.slick({
            infinite: true,
            autoplay: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            asNavFor: $festival_slide,
            dot: false,
            focusOnSelect: true,

            prevArrow : $festival_control.find('.prev_btn'),
            nextArrow : $festival_control.find('.next_btn'),

            // responsive: [ // 반응형 웹 구현 옵션
            //     {
            //         breakpoint: 1401,
            //         settings: {
            //             slidesToShow: 3,
            //         }
            //     },
            // ]
        });

        var $culture_box = $('.culture_wrap'),
            $culture_slide = $culture_box.find('.culture_list'),
            $culture_control = $culture_box.find('.culture_control');

        $culture_slide.slick({
            autoplay: true,
            infinite: true,
            slidesToScroll: 1,
            variableWidth: true,
            // arrows: false,
            prevArrow : $culture_control.find('.prev_btn'),
            nextArrow : $culture_control.find('.next_btn'),
            dots: false,

            // responsive: [ // 반응형 웹 구현 옵션
            //     {
            //         breakpoint: 800,
            //         settings: {
            //             autoplay: false,
            //         }
            //     },
            // ]
        });

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);