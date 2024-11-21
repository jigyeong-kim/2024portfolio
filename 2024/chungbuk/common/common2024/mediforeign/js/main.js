
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
                $window.on('screen:wide screen:web', function(event) {
                    window.mode = 'pc';
                });

                $window.on('screen:tablet screen:phone', function(event) {
                    window.mode = 'mobile';
                });


                //여기서부터 코드 작성해주세요

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
                    $visual_control = $visual_box.find('.visual_control'),
                    $visual_dot = $visual_control.find('.visual_dot');

                $visual_slide.slick({
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    autoplaySpeed:5000,
                    speed:1000,
                    pauseOnHover: false,
                    appendDots:$visual_dot,
                    customPaging: function(slider, i) {
                        var pageNumber = (i + 1).toString().padStart(2, '0');
                        return '<button>' + pageNumber + '</button>';
                    },

                    // 추가 기능
                    autoArrow : $visual_control.find('.auto'),
                    pauseText : '정지',
                    playText : '재생',

                });

                // 로딩 바
                $visual_slide.on('afterChange',function(){
                    $(".progress_bar .gage").addClass('pro-ani');
                });
                $visual_slide.on('beforeChange',function(){
                    $(".progress_bar .gage").removeClass('pro-ani');
                });


                //투어 슬릭
                var $tour_box = $('.tour_wrap'),
                    $tour_text = $tour_box.find('.tour_content'),
                    $tour_slide = $tour_box.find('.tour_list'),
                    $tour_clone = $tour_slide.clone(),
                    $tour_control = $tour_box.find('.tour_control');

                $tour_text.slick({
                    swipe: false,
                    arrows: false,
                    draggable : false,
                    dots: false,
                    fade: true,
                });
                $tour_slide.slick({
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    dots: false,
                    asNavFor: $tour_text,

                    prevArrow : $tour_control.find('.prev_btn'),
                    nextArrow : $tour_control.find('.next_btn'),
                });

                $tour_slide.after($tour_clone);
                $tour_clone.find('a.tour_link').each(function() {
                    $(this).removeAttr('href').replaceWith($('<div>', {
                        class: $(this).attr('class'),
                        style: $(this).attr('style')
                    }));
                });

                $tour_clone.addClass('sub_list').slick({
                    swipe: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    draggable : false,
                    initialSlide: 1,
                    dots: false,
                    focusOnSelect: true,

                    // responsive: [
                    //     {
                    //         breakpoint: 1001,
                    //         settings: 'unslick',
                    //     },
                    // ]
                });


                $tour_control.find('.prev_btn').click(function(){
                    $tour_clone.slick('slickPrev');
                });

                $tour_control.find('.next_btn').click(function(){
                    $tour_clone.slick('slickNext');
                });

                $tour_slide.on('swipe', function(event, slick, direction) {
                    if (direction === 'left') {
                        $tour_clone.slick('slickNext');
                    } else if (direction === 'right') {
                        $tour_clone.slick('slickPrev');
                    }
                });

                // $tour_slide.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                //
                //     $tour_clone.slick('slickGoTo', nextSlide + 1);
                // });

                $('.tour_list:not(.sub_list)').mouseenter(function(){
                    var $textWrapper = $('<span>', {class: 'more_text'}).html('view more');
                    var $cursor = $("<div>", {class: 'more_cursor'}).append($textWrapper);
                    $('body').append($cursor);
                    $('.tour_link .m_more_btn').hide();
                }).mousemove(function(event){
                    $('.more_cursor').css({
                        top: event.pageY - 70,
                        left: event.pageX - 70
                    });
                }).mouseleave(function(){
                    $('.more_cursor').remove();
                    $('.tour_link .m_more_btn').show();
                });
            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}
