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

                //language
                $('.language .language_btn').on('click', function(e) {
                    var $this = $(this),
                        $Parent = $this.parent('.language'),
                        IsActive = $Parent.is('.active'),
                        $Layer = $this.siblings('.layer');
                    if(!IsActive){
                        $Parent.addClass('active');
                        $this.attr('title', '언어선택 닫기');
                        $Layer.slideDown(200);
                    } else{
                        $Parent.removeClass('active');
                        $this.attr('title', '언어선택 열기');
                        $Layer.slideUp(200);
                    };
                    e.stopPropagation();
                });
                $window.on('click',function(e){
                    $('.language').removeClass('active');
                    $('.language .language_btn').attr('title', '언어선택 닫기');
                    $('.language .layer').stop().slideUp(200);
                });


            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}
