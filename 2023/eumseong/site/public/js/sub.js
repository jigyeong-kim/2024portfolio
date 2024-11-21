

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
						DepthDisplay = $Depth.css('display');
					if(DepthDisplay!=='none'){//하위메뉴가 display:none이 아니면 실행
						if(!IsActive){
							$this.removeClass('active_prev active_next');
							$this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
							$this.prev('.depth_item').addClass('active_prev');
							$this.next('.depth_item').addClass('active_next');
						} else{
							$this.removeClass('active');
							$this.siblings('.depth_item').removeClass('active_prev active_next');
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


		$('.tab_menu').not($('.prettyprint').children()).each(function() {
			var li_length = $(this).children('ul').find('li').length;
			$(this).addClass('divide'+li_length);
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

        //템플릿 탭메뉴

        $('.template_tab').not($('.prettyprint').children()).each(function(index, element){
            var $tabButton = $(element).find('.tab_link'),
                tabAllCheck = $tabButton.is('.tab_all'),/*전체보기 탭메뉴 유무*/
                $tabContent = $(element).find('.tab_content');

            $tabButton.click(function() {

                var index = $tabButton.index(this),
                    IsTabAll = $(this).is('.tab_all');

                $(this).attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_link').removeAttr('title');
                if (tabAllCheck){
                    if (IsTabAll) {
                        $tabContent.addClass('active');
                    } else {
                        $tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
                    };
                } else if (!tabAllCheck){
                    $tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
                }
            });
        });

        /* 레이어팝업 */
        $('.popup_btn').on('click', function () {
            var $this = $(this),
                $wrap = $this.parent('.popup_wrap'),
                $box_wrap = $wrap.find('.popup_box_wrap');

            $box_wrap.addClass('active').attr('title', '팝업창 열림');
        });
        $('.popup_close_btn').on('click', function () {
            var $this = $(this),
                $box_wrap = $this.closest('.popup_box_wrap');
            $box_wrap.removeClass('active').attr('title', '팝업창 닫힘');
        });

        /*템플릿 가짜 셀렉트*/
        $('.select_box .select_btn').on('click', function(){
            var $this = $(this),
                $MyParent = $this.parent('.select_box'),
                IsActive = $MyParent.is('.active'),
                $List = $this.siblings('.select_list');
            if (!IsActive) {
                $MyParent.addClass('active');
                $List.slideDown();
                $this.attr('title', '하위메뉴닫기');
            } else {
                $MyParent.removeClass('active');
                $List.slideUp();
                $this.attr('title', '하위메뉴열기');
            }
        });

        $('.select_box .select_list .select_anchor').on('click', function (){
            var $this = $(this),
                $MyParent = $this.parent('li'),
                IsActive = $MyParent.is('.active'),
                ThisText = $this.text(),
                $OtherParents = $MyParent.siblings('li'),
                $SelectBox = $this.parents('.select_box'),
                $Layer = $this.parents('.select_list'),
                $SelectBtn = $Layer.siblings('.select_btn');
            $SelectBox.removeClass('active');
            $SelectBtn.text(ThisText).attr('title', '하위메뉴열기');
            $Layer.slideUp();
        });

        // 스텝 자동 높이
        function stepAutoHeight(){
            var $step = $container.find('.step_box'),
                $stepList = $step.find('.step_list'),
                $stepItem = $stepList.find('.step_item');

            $stepList.each(function (index, element) {
                if($window.width() > 640){
                    var $element = $(element),
                        $elementStepItem = $element.find('.step_item'),
                        height = 0,
                        width = 0,
                        count;
                    if($element.parents('.step_box')){
                        $($elementStepItem, element).each(function (index){
                            var $this = $(this),
                                thisWidth = $this.width(),
                                thisHeight = $this.height();

                            if (thisWidth > width){
                                width = thisWidth;
                            }
                            if (thisHeight > height){
                                height = thisHeight;
                            }

                            count = index + 1;
                        }).height(height);
                    }
                    //$element.closest('.step_box').addClass('length' + count);
                }
            });
        }
        stepAutoHeight();
        $window.on('resize', function(){
            stepAutoHeight();
        });

        // .sub_type3 > path_box(문화관광)

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

        // 청수년수련원 시설안내 상단 슬라이드 컨텐츠
        var $slide = $('.top_slide_box .slide_list');
            $slide.slick({
                autoplay : false,
                dots:false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                prevArrow : $('.top_slide_box .slide_control .prev'),
                nextArrow : $('.top_slide_box .slide_control .next'),
                pauseOnDotsHover : true,
                swipe:false,
                draggable:false,
                fade:true,
                total : $('.top_slide_box .countbox .total'),
                current : $('.top_slide_box .countbox .current'),
                responsive : [
                    {
                        breakpoint: 1001,
                        settings  : {
                            draggable   : true,
                            swipe       : true,
                        }
                    }
                ]
            });



        $window.on('screen:tablet screen:phone', function(event) {
        	//모바일에서 담당자정보 위치이동
			//$('.manager_box').clone().appendTo('.satisfaction');
        });
    });
})(jQuery);