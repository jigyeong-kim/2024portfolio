

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

		//사이드
		var $container = $('#container'),
			$side = $container.find('.side'),
			$sideDepthItem = $side.find('.depth_item'),
			$sideSpy = $side.find('.spy:last');

		$sideDepthItem.on('click.menu', function(event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target,
				IsActive = $this.is('.active');

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('side_open');
					}else{
						$html.addClass('side_open');
					}
				}

				if($this.children('.depth').length) {
					var $Depth = $this.children('.depth'),
						DepthDisplay = $Depth.css('display'),
                        $childItem = $Depth.find('.depth_item:first');
					if(DepthDisplay!=='none'){//하위메뉴가 display:none이 아니면 실행
						if(!IsActive){
							$this.removeClass('active_prev active_next');
							$this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
							$this.prev('.depth_item').addClass('active_prev');
							$this.next('.depth_item').addClass('active_next');

                            // 4차까지 한번에 열리기
                            $childItem.removeClass('active_prev active_next');
                            $childItem.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
                            $childItem.prev('.depth_item').addClass('active_prev');
                            $childItem.next('.depth_item').addClass('active_next');
						} else{
							$this.removeClass('active');
							$this.siblings('.depth_item').removeClass('active_prev active_next');

                            // 4차까지 한번에 열리기
                            $childItem.removeClass('active');
                            $childItem.siblings('.depth_item').removeClass('active_prev active_next');
						}
						event.preventDefault();
					}
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
			$sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
			$sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
		}

		//여기서부터 코드 작성해주세요

        $('.sharebox .share_btn.sns_share').on('click', function () {
           var $this = $(this),
               $list = $this.parent('.share_wrap').find('.share_list');

           if($this.parent('.share_wrap').hasClass('active')){
               $this.attr('title', 'sns 공유하기 열기').parent('.share_wrap').removeClass('active');
               $list.slideUp();
           }else{
               $this.attr('title', 'sns 공유하기 닫기').parent('.share_wrap').addClass('active');
               $list.slideDown();
           }

        });

        //서브 비주얼 설정을 위한 active 메뉴 추출
        $('.depth1_item').each(function(index,elem){
            var $this = $(this),
                $thisAnchor = $this.find('.depth1_text');
            if($this.hasClass('actived')){
                $('html').attr('data-menu-index',index);
            }
        });

        // sub > pathbox

        var $pathBox = $('.sub_head .pathbox'),
            $pathItem = $pathBox.find('.path_item');
        $pathItem.each(function () {
            var $this = $(this),
                $thisbtn = $this.find('.path_btn'),
                $thislist = $this.find('.path_selectlist');

            $thislist.closest($pathItem).addClass('has');
        });

        $('.pathbox .path_btn').on('click', function () {

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