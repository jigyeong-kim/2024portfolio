
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

                var $visual_wrap = $('.visual_wrap'),
                    $visual_slide = $visual_wrap.find('.visual_img_list'),
                    $visual_clone = $visual_slide.clone(),
                    $visual_text = $visual_wrap.find('.visual_text_wrap'),
                    $progressBar = $visual_wrap.find('.progress_bar');

                $visual_slide.slick({
                    fade: true,
                    arrows: true,
                    asNavFor: $visual_text,
                    autoplay: true,
                    dots: false,
                    autoplaySpeed: 3000,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                });

                $visual_clone.addClass('visual_clone_list').slick({
                    autoplay: true,
                    swipe: false,
                    arrows: false,
                    draggable: false,
                    initialSlide: -1,
                    dots: false,
                    asNavFor: $visual_slide,
                    autoplaySpeed: 3000,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                });
                $visual_slide.after($visual_clone);

                $visual_text.slick({
                    fade: true,
                    arrows: false,
                    dots: false,
                    asNavFor: $visual_slide,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    swipe: false,
                    draggable: false,
                });

                $visual_slide.find('.slick-prev').click(function(){
                    $visual_clone.slick('slickPrev');
                });

                $visual_slide.find('.slick-next').click(function(){
                    $visual_clone.slick('slickNext');
                });

                $visual_slide.on('swipe', function(event, slick, direction) {
                    if (direction === 'left') {
                        $visual_clone.slick('slickNext');
                    } else if (direction === 'right') {
                        $visual_clone.slick('slickPrev');
                    }
                });

                $visual_slide.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                    var calc = ( (nextSlide + 1) / (slick.slideCount) ) * 100;

                    $progressBar
                        .css('width', calc + '%')
                        .attr('aria-valuenow', calc + '%' )
                        .text( calc + '%' );
                });

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