(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        // sub > path_box

        var $pathBox = $('.sub_head .path_box'),
            $pathItem = $pathBox.find('.path_item');
        $pathItem.each(function () {
            var $this = $(this),
                $thisbtn = $this.find('.path_btn'),
                $thislist = $this.find('.path_selectlist');

            $thislist.closest($pathItem).addClass('has');
        });

        $('.path_box .path_btn').on('click', function () {

            var $this = $(this),
                $parent = $this.parent('.path_item'),
                $silbing = $this.siblings('.path_selectlist');

            $parent.siblings('.path_item').removeClass('active').attr('title', '열기').find('.path_selectlist').slideUp();

            if($parent.hasClass('active')){
                $parent.removeClass('active').attr('title', '열기');
                $silbing.slideUp();
            }else{
                $parent.addClass('active').attr('title', '닫기').siblings('.path_item').removeClass('active').attr('title', '열기');
                $silbing.slideDown();
            }
        });

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);