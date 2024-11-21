
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        /* 탭메뉴 */
        var $tabWrap = $('.tab_wrap');
        $tabWrap.each(function () {
            var $this = $(this),
                $tabList = $this.find('.tab_list'),
                $tabItem = $tabList.find('.tab_item'),
                tabIndex = $tabItem.length;

            if(tabIndex >= 5){
                $tabList.addClass('col5');
            }else if(tabIndex < 5){
                $tabList.addClass('col' + tabIndex);
            }
            console.log(tabIndex);
        });

        $('.tab_wrap.temp_tab .tab_link').on('click', function () {
            var $this = $(this),
                $parent = $this.parent('.tab_item'),
                $content = $this.closest('.tab_wrap').find('.tab_content'),
                index = $parent.index();

            $parent.addClass('on').attr('title', '선택됨').siblings('.tab_item').removeClass('on').attr('title', '');
            $content.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
            console.log(index);
        });

        $window.on('screen:tablet screen:phone', function(event) {
            
        });
    });
})(jQuery);