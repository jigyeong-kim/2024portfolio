'use strict';

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            var $window = $(window);
            $(function() {

                //여기서부터 코드 작성해주세요

                // visual 슬라이드

                var $slide_box = $('.visual_slide');
                $slide_box.each(function (){

                    var $this = $(this),
                        $slide = $this.find('.visual_list'),
                        $progressBar = $('.progress');
                    $slide.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                        var calc = ( (nextSlide + 1) / (slick.slideCount) ) * 100;

                        $progressBar
                            .css('width', calc + '%')
                            .attr('aria-valuenow', calc );

                        //$progressBarLabel.text( calc + '% completed' );
                    });
                    $slide.slick({
                        swipe : true,
                        draggable : true,
                        slidesToShow : 3,
                        slidesToScroll: 1,
                        dots : false,
                        autoplay:true,
                        prevArrow : $('.visual_wrap .slide_control .prev'),
                        nextArrow : $('.visual_wrap .slide_control .next'),

                        //variableWidth: true,

                        //추가 기능
                        autoArrow : $('.visual_wrap .slide_control .auto'),
                        pauseText : '정지',
                        playText : '재생',


                        responsive: [
                            {
                                breakpoint: 1431,
                                settings: {
                                    slidesToShow : 2,
                                }
                            },{
                                breakpoint: 1201,
                                settings: {
                                    slidesToShow : 3,
                                    variableWidth: true,
                                }
                            },{
                                breakpoint: 1001,
                                settings: {
                                    variableWidth: true,
                                }
                            }
                            ]
                    });
                });


                // 빠른 컨설팅 예약

                $('.select_box').on('click', function () {
                    var $this = $(this),
                        $listBox = $this.siblings('.select_list'),
                        $list = $listBox.find('ul'),
                        $parent = $this.parent('.select_wrap');

                    if($parent.hasClass('active')){
                        $parent.removeClass('active');
                        $list.slideUp();
                        $this.attr('title', '목록 열기');
                    }else{
                        $parent.addClass('active');
                        $parent.siblings('.select_wrap').removeClass('active').find('.select_list ul').slideUp().parent('.select_list').siblings('.select_box').attr('title', '목록 열기');
                        $list.slideDown();
                        $this.attr('title', '목록 닫기');
                    }
                });
                $('.select_btn').on('click', function () {
                    var $this = $(this),
                        newText = $this.text(),
                        $listBox = $this.closest('.select_list'),
                        $list = $listBox.find('ul'),
                        $parent = $listBox.parent('.select_wrap'),
                        $selectBox = $listBox.siblings('.select_box'),
                        selectText = $selectBox.find('span');
                    if($(window).width() < 641){
                        $selectBox.text(newText);
                        $list.slideUp();
                        $parent.removeClass('active');
                        $this.attr('title', '목록 열기');
                    }else{
                        //$selectBox.createElement('span');
                        selectText.text(newText);
                        $list.slideUp();
                        $parent.removeClass('active');
                        $this.attr('title', '목록 열기');
                    }
                });
                
                
                // 프로그램 슬라이드
                
                var $program_slide_box = $('.program_slide');
                $program_slide_box.each(function (){

                    var $this = $(this),
                        $slide = $this.find('.slide_list');
                    $slide.slick({
                        swipe : true,
                        draggable : true,
                        slidesToShow : 3,
                        slidesToScroll: 1,
                        dots : false,
                        autoplay:true,
                        prevArrow : $('.program_box .slide_control .prev'),
                        nextArrow : $('.program_box .slide_control .next'),

                        //추가 기능
                        autoArrow : $('.program_box .slide_control .auto'),
                        pauseText : '정지',
                        playText : '재생',

                        responsive: [
                            {
                                breakpoint: 1431,
                                settings: {
                                    slidesToShow : 2,
                                }
                            },{
                                breakpoint: 1001,
                                settings: {
                                    swipeToSlide: true,
                                    variableWidth: true,
                                }
                            }]
                    });
                });

                //팝업 슬라이드
                var $popup_slide_box = $('.popup_slide');
                $popup_slide_box.each(function (){

                    var $this = $(this),
                        $slide = $this.find('.popup_list');
                    $slide.slick({
                        swipe : true,
                        draggable : true,
                        dots : false,
                        autoplay:true,
                    });
                });

                //미디어 슬라이드
                var $media_slide_box = $('.media_slide');
                $media_slide_box.each(function (){

                    var $this = $(this),
                        $slide = $this.find('.slide_list');
                    $slide.slick({
                        swipe : true,
                        draggable : true,
                        dots : false,
                        autoplay:false,
                    });
                });

                //포토갤러리 슬라이드
                var $photo_slide_box = $('.photo_slide');
                $photo_slide_box.each(function (){

                    var $this = $(this),
                        $slide = $this.find('.slide_list');
                    $slide.slick({
                        swipe : true,
                        slidesToShow : 2,
                        slidesToScroll: 1,
                        draggable : true,
                        dots : false,
                        autoplay:true,
                        // infinite: false,
                        prevArrow : $('.photo_box .slide_control .prev'),
                        nextArrow : $('.photo_box .slide_control .next'),
                        //centerMode : false,
                        //centeredSlides: false,
                        //centerPadding : '290px',

                        responsive: [
                            {
                                breakpoint: 1001,
                                settings: {
                                    variableWidth: true,
                                }
                            }
                            ]
                    });
                });

                //스크롤 애니메이션 시작
                $(window).on('scroll', function(){
                    var scrollTop = $(window).scrollTop(),
                        winBottom = scrollTop + $(window).height(),
                        $section = $('.scroll_ani');
                    $section.each(function(){
                        var $this = $(this),
                            thisTop = $this.offset().top;
                        if(winBottom > (thisTop + 50)){
                            $this.attr('data-on', 'on');
                        }
                        if(winBottom < (thisTop - 50)){
                            $this.attr('data-on', 'off');
                        }
                    });
                });


                $window.on('screen:wide screen:wesb', function(event) {

                });

                $window.on('screen:tablet screen:phone', function(event) {

                });

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}