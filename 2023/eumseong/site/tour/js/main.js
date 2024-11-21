(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        // 비주얼
        var $visual_box = $('.visual_box'),
            $visual_slide = $visual_box.find('.visual_list'),
            $visual_dot = $visual_box.find('.visual_dot'),
            $visual_control = $visual_box.find('.visual_control');

        $visual_slide.slick({
            autoplay: false,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 2000,
            centerMode: false,
            arrows: false,
            dots: false,
            asNavFor: $visual_dot,
        });
        $visual_dot.slick({
            autoplay: true,
            vertical: true,
            autoplaySpeed: 5000,
            slidesToScroll: 1,
            asNavFor: $visual_slide,
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            prevArrow : $visual_control.find('.prev_btn'),
            nextArrow : $visual_control.find('.next_btn'),

            //추가 기능
            autoArrow : $visual_control.find('.auto'),
            pauseText : '정지',
            playText : '재생',

            total : $visual_control.find('.total'),
            current : $visual_control.find('.current'),
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            responsive: [ // 반응형 웹 구현 옵션
                {
                    breakpoint: 800,
                    settings: {
                        autoplay: false,
                    }
                },
            ]
        });

        // 음성축제
        var $festival_box = $('.festival_box'),
            $festival_slide = $festival_box.find('.festival_list'),
            $festival_dot = $festival_box.find('.festival_dot'),
            $festival_arrow = $festival_box.find('.festival_arrow'),
            $festival_mini_slide = $festival_box.find('.festival_waiting_slide');

        $festival_slide.slick({
            autoplay: false,
            //speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            fade: true,
            prevArrow : $festival_arrow.find('.prev_btn'),
            nextArrow : $festival_arrow.find('.next_btn'),
            // asNavFor: $festival_dot,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        asNavFor: $festival_dot,
                    }
                },
            ]
        });

        $festival_mini_slide.slick({
            autoplay : false,
            dots : false,
            swipe : false,
            draggable : false,
            initialSlide: 1,
            arrows:false,
        });

        $festival_dot.slick({
            //autoplay: true,
            //autoplaySpeed: 1000,
            swipe : false,
            //speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth: true,
            asNavFor: $festival_slide,
            dots: false,
            arrows: false,
            //centerMode: false,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 3,
                        centerMode: true,
                    }
                }, {
                    breakpoint: 801,
                    settings: {
                        slidesToShow: 3,
                        variableWidth: false,
                        centerMode: true,
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 3,
                        centerMode: true,
                    }
                },
            ]
        });

        $('.festival_waiting_slide .waiting_item').on('click', function() {
            var visualListNo = $(this).closest('.slick-slide').index(),
                visualdot = $festival_slide.siblings('.festival_control').find('.festival_dot .slick-slide');

            $festival_slide.slick('slickGoTo', visualListNo - 1);
            $festival_mini_slide.slick('slickGoTo', visualListNo);

            visualdot.find('.dot_item').removeClass('on');
            visualdot.eq(visualListNo - 1).find('.dot_item').addClass('on');

            //console.log(visualListNo);
        });

        $festival_mini_slide.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var visualdot = $festival_slide.siblings('.festival_control').find('.festival_dot .slick-slide');

            $festival_slide.slick('slickGoTo', currentSlide);

            visualdot.find('.dot_item').removeClass('on');
            visualdot.eq(currentSlide).find('.dot_item').addClass('on');

            //console.log(currentSlide);


        });

        $festival_slide.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var visualdot = $festival_slide.siblings('.festival_control').find('.festival_dot .slick-slide');

            $festival_mini_slide.slick('slickGoTo', nextSlide + 1);

            visualdot.find('.dot_item').removeClass('on');
            visualdot.eq(nextSlide).find('.dot_item').addClass('on');

            //console.log(nextSlide);
        });

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);