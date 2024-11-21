/**
 * @author (주)한신정보기술 퍼블리셔팀 서정한
 * @since 2020-02
 * @version 1.0.0
 */
(function($) {
	'use strict';

    var $window = tag.$window = $(window),
        $document = tag.$document = $(document),
        $html = tag.$html = $('html'),
        $head = tag.$head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

	$(function() {

		$window.on('screen:wide.menu screen:web.menu', function(event) {
			window.mode = 'pc';
		});

		$window.on('screen:tablet.menu screen:phone.menu', function(event) {
			window.mode = 'mobile';
		});

		//사이드
		var container = {},
			$container = $('#container'),
			side = container.side = {},
			$side = side.$element = $container.find('.side'),
			$sideDepthItem = side.$depthItem = $side.find('.depth_item'),
			$sideSpy = side.$spy = $side.find('.spy:last');

		$sideDepthItem.on('click.menu', function(event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target;

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('side_open');
					}else{
						$html.addClass('side_open');
					}
				}

				if($this.children('.depth').length) {
					$this.toggleClass('active').siblings('.depth_item').removeClass('active');
					event.preventDefault();
				}
			}

			event.stopPropagation();
		}).each(function(index, element) {
			var $element = $(element);

			if($element.children('.depth').length) {
				$element.addClass('has');
			}else{
				$element.addClass('solo');
			}
		});

		if($sideSpy.length) {
			$html.addClass('side_open');
			$sideSpy.parents('.depth_item').addClass('active');
		}
		
		//sns
		$('.addons ul li.list.snsbox .addons_btn').on('click', function(){
			var $this = $(this),
				$ParentBox = $this.parent('.snsbox'),
				$layer = $this.siblings('.layer'),
				IsActive = $ParentBox.is('.active');
			if(!IsActive){
				$this.attr('title', '하위메뉴 닫기');
				$layer.animate({
					width: "show"
				}, 250);
				$ParentBox.addClass('active');
			} else{
				$ParentBox.removeClass('active');
				$this.attr('title', '하위메뉴 열기');
				$layer.animate({
					width: "hide"
				}, 250);
			};
		});

        $('table.table.responsive').not($('.prettyprint').children()).each(function() {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
		});

	});
})(window.jQuery);