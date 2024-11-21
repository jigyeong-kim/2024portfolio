
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

                // 비주얼 슬라이드
                var $visual_slide = $('.visual_wrap .visual_list');
                $visual_slide.slick({
                    //기본
                    autoplay : true,
                    slidesToShow : 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    fade: false,
                    autoplaySpeed:7000,
                    speed:1200,

                    //추가 기능
                    appendDots: $visual_slide.parent('.visual_wrap').find('.visual_content .visual_control .visual_dot'),

                    autoArrow : $visual_slide.parent('.visual_wrap').find('.visual_content .visual_control .auto'),
                    pauseText : '정지',
                    playText : '재생',
                });

                // 홍보갤러리
                var $gallery_wrap = $('.gallery_wrap'),
                    $gallery_list = $gallery_wrap.find('.gallery_list'),
                    $gallery_nav = $gallery_wrap.find('.gallery_nav .nav_list'),
                    $gallery_nav_item = $gallery_nav.find('.nav_item');

                $gallery_list.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: $gallery_nav,
                });
                $gallery_nav.slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: $gallery_list,
                    dots: false,
                    centerMode: false,
                    focusOnSelect: true,
                    prevArrow : $gallery_nav.siblings('.gallery_control').find('.prev'),
                    nextArrow : $gallery_nav.siblings('.gallery_control').find('.next'),
                    variableWidth: true,
                    autoplay : true,

                    //추가 기능
                    autoArrow : $gallery_nav.siblings('.gallery_control').find('.auto'),
                    pauseText : '정지',
                    playText : '재생',
                });

                $gallery_nav_item.click(function() {
                    var galleryListNo = $(this).closest('.slick-slide').index();
                    $gallery_list.slick('slickGoTo', galleryListNo - 1);
                    $gallery_nav.slick('slickGoTo', galleryListNo);

                    console.log(galleryListNo);
                });

                $gallery_nav.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                    var slideNo = $(this).index();
                    $gallery_list.slick('slickGoTo', currentSlide);
                });
                $gallery_list.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                    $gallery_nav.slick('slickGoTo', nextSlide + 1);
                });


                //테스트 슬라이드 시작
                // var $LeftList = $('.gallery_list'),
                //     $LeftItem = $LeftList.find('.gallery_item'),
                //     $LeftCloneItem = $LeftItem.clone(),
                //     LeftLength = $LeftItem.length;
                // var $RightList = $('.gallery_nav');
                // if(LeftLength > 3){
                //     $LeftList.slick({
                //         //기본
                //         autoplay : false,
                //         dots : false,
                //         draggable : true,
                //         swipe : true,
                //         swipeToSlide : true,
                //         slidesToShow : 1,
                //         slidesToScroll : 1,
                //         variableWidth : false,
                //         infinite: true,
                //         arrows : false,
                //         asNavFor : $RightList
                //     });
                //     for(var i=1; i<LeftLength; i++ ){
                //         $RightList.append($LeftCloneItem.eq(i));
                //         $RightList.append($LeftCloneItem.eq(0));
                //     }
                //     $RightList.slick({
                //         //기본
                //         autoplay : true,
                //         dots : false,
                //         draggable : true,
                //         swipe : true,
                //         swipeToSlide : true,
                //         slidesToShow : 3,
                //         slidesToScroll : 1,
                //         variableWidth : false,
                //         infinite: true,
                //         arrows : true,
                //         prevArrow : $('.control_box .prev'),
                //         nextArrow : $('.control_box .next'),
                //         autoArrow : $('.control_box .auto'),
                //         pauseText : '정지',
                //         playText : '재생',
                //         responsive : [{}],
                //         asNavFor : $LeftList
                //     });
                // }
                // if(LeftLength <= 3){
                //     $LeftList.slick({
                //         //기본
                //         autoplay : false,
                //         dots : false,
                //         draggable : true,
                //         swipe : true,
                //         swipeToSlide : true,
                //         slidesToShow : 1,
                //         slidesToScroll : 1,
                //         variableWidth : false,
                //         infinite: true,
                //         arrows : false,
                //         asNavFor : $RightList
                //     });
                //     for(var i=1; i<LeftLength; i++ ){
                //         $RightList.append($LeftCloneItem.eq(i));
                //     }
                //     $RightList.slick({
                //         //기본
                //         autoplay : true,
                //         dots : false,
                //         draggable : true,
                //         swipe : true,
                //         swipeToSlide : true,
                //         slidesToShow : 3,
                //         slidesToScroll : 1,
                //         variableWidth : false,
                //         infinite: true,
                //         arrows : true,
                //         prevArrow : $('.control_box .prev'),
                //         nextArrow : $('.control_box .next'),
                //         autoArrow : $('.control_box .auto'),
                //         pauseText : '정지',
                //         playText : '재생',
                //         responsive : [{}],
                //         asNavFor : $LeftList
                //     });
                // }
                //테스트 슬라이드 끝

                $window.on('screen:wide screen:web', function(event) {

                });

                $window.on('screen:tablet screen:phone', function(event) {

                });

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}