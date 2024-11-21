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

        // rowgroup1
        var $visual_box = $('.visual_box'),
            $visual_slide = $visual_box.find('.visual_list'),
            $visual_control = $visual_box.find('.visual_control');

        $visual_slide.slick({
            fade: true,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 8000,
            prevArrow : $visual_control.find('.prev_btn'),
            nextArrow : $visual_control.find('.next_btn'),
            dots: true,
            appendDots : $visual_control.find('.visual_dots'),
        });

        // 알림마당

        // 공지사항 탭
        var $noticeTab = $('.notice_wrap'),
            $noticeButton = $noticeTab.find('.tab_btn'),
            $noticeContent = $noticeTab.find('.notice_box');

        $noticeButton.click(function (e) {

            var $this = $(this),
                thisTitle = $this.text(),
                // index = parseInt($this.attr('data-index'));
                index = $this.parent('.tab_item').index();

                console.log(index);
                $noticeButton.parent().removeAttr('title').removeClass("active");
                $this.parent().addClass("active").attr('title',thisTitle +' 열림');

                $noticeContent.eq(index).addClass('active').attr('title',  '열림').siblings('.notice_box').removeClass('active').removeAttr('title');

        });

        // 여행지소개
        var $travel_box = $('.travel_wrap'),
            $travel_slide = $travel_box.find('.travel_list'),
            $travel_arrow = $travel_box.find('.travel_control'),
            $travel_past_slide = $travel_box.find('.travel_past_slide'),
            $travel_next_slide = $travel_box.find('.travel_next_slide'),
            $travel_dot = $travel_box.find('.travel_dot');

        $travel_slide.slick({
            autoplay: false,
            //speed: 200,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            fade: true,
            prevArrow : $travel_arrow.find('.prev_btn'),
            nextArrow : $travel_arrow.find('.next_btn'),
            // asNavFor: $travel_dot,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        asNavFor: $travel_dot,
                        arrows: false,
                    }
                },
            ]
        });

        $travel_past_slide.slick({
            autoplay : false,
            dots : false,
            swipe : false,
            draggable : false,
            initialSlide: -1,
            arrows:false,
            variableWidth: false,
            infinite: true,
        });

        $travel_next_slide.slick({
            autoplay : false,
            dots : false,
            swipe : false,
            draggable : false,
            initialSlide: 1,
            arrows:false,
            variableWidth: false,
            infinite: true,
        });

        $travel_dot.slick({
            //autoplay: true,
            //autoplaySpeed: 1000,
            swipe : false,
            //speed: 1000,
            slidesToShow: 6,
            slidesToScroll: 1,
            variableWidth: true,
            asNavFor: $travel_slide,
            dots: false,
            arrows: false,
            //centerMode: false,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 3,
                        centerMode: true,
                        arrows: true,
                    }
                }
            ]
        });

        $('.travel_past_slide .waiting_item').on('click', function() {
            var visualListNo = $(this).closest('.slick-slide').index(),
                visualdot = $travel_dot.find('.slick-slide');

            $travel_past_slide.slick('slickGoTo', visualListNo - 2);
            $travel_slide.slick('slickGoTo', visualListNo - 1);
            $travel_next_slide.slick('slickGoTo', visualListNo);

            visualdot.find('.dot_item').removeClass('on');
            visualdot.eq(visualListNo - 1).find('.dot_item').addClass('on');

            console.log(visualListNo);
        });

        $('.travel_next_slide .waiting_item').on('click', function() {
            var visualListNo = $(this).closest('.slick-slide').index(),
                visualdot = $travel_dot.find('.slick-slide');

            $travel_past_slide.slick('slickGoTo', visualListNo - 2);
            $travel_slide.slick('slickGoTo', visualListNo - 1);
            $travel_next_slide.slick('slickGoTo', visualListNo);

            visualdot.find('.dot_item').removeClass('on');
            visualdot.eq(visualListNo - 1).find('.dot_item').addClass('on');

            //console.log(visualListNo);
        });


        // $travel_next_slide.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        //     var visualdot = $travel_dot.find('.slick-slide');
        //
        //     $travel_slide.slick('slickGoTo', currentSlide);
        //     $travel_past_slide.slick('slickGoTo', currentSlide - 1);
        //
        //     visualdot.find('.dot_item').removeClass('on');
        //     visualdot.eq(currentSlide).find('.dot_item').addClass('on');
        //
        //     //console.log(currentSlide);
        // });

        $travel_slide.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var visualdot = $travel_dot.find('.slick-slide');

            $travel_past_slide.slick('slickGoTo', nextSlide - 1);
            $travel_next_slide.slick('slickGoTo', nextSlide + 1);

            visualdot.find('.dot_item').removeClass('on');
            visualdot.eq(nextSlide).find('.dot_item').addClass('on');

            //console.log(nextSlide);
        });

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);