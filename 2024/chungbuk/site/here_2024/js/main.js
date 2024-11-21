'use strict';

function splittingTextDelay (object, speed, delay_speed) {
	var splitLength = $(object).find('.char').length;
	for (var i=0; i<splitLength; i++) {
		if (  $(object).data('css-property') == 'animation' ) {
			$(object).find('.char').eq(i).css('animation-delay',delay_speed+(i*speed)+'s');
		}else if( $(object).data('css-property') == 'transition' ) {
			$(object).find('.char').eq(i).css('transition-delay',delay_speed+(i*speed)+'s');
		}
	}
}

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
                    $('.search_panel').hide();
                    window.mode = 'mobile';
                });

                //여기서부터 코드 작성해주세요

                // 대기질 탭
                var $airTab = $('.air_tab_wrap'),
                    $airButton = $airTab.find('.tab_btn'),
                    $airContent = $airTab.find('.air_tabbox');

                $airButton.click(function (e) {

                    var $this = $(this),
                        thisTitle = $this.text(),
                        index = $this.parent('.tab_item').index();

                    console.log(index);
                    $airButton.parent().removeAttr('title').removeClass("active");
                    $this.parent().addClass("active").attr('title',thisTitle +' 열림');

                    $airContent.eq(index).addClass('active').attr('title', thisTitle +' 열림').siblings('.air_tabbox').removeClass('active').removeAttr('title');

                });

                // 대기질 지도
                $('.imagebox img[usemap]').rwdImageMaps();//이미지맵 반응형 실행(반응형일때 사용)
                $('.real_time .air_tabbox .layerbox .layer .layerlist').scrollbar();
                var $focusPoint;
                $('.real_time .air_tabbox .imagebox area').on('click', function(event) {
                    console.log("air quality map event 1");
                    var $this = $(this),
                        thisIndex = $this.index(),
                        MyTitle = $this.attr('alt'),
                        $iconbox = $this.parent('map').siblings('.iconbox'),
                        $layer = $this.parents('.imagebox').siblings('.layerbox'),
                        $layerTitle = $layer.find('.title'),
                        $layerlistbox = $layer.find('.scroll-content');
                    $focusPoint = $this;
                    $layerTitle.text(MyTitle);
                    $layerlistbox.empty().append('<ul class="clearfix"></ul>');
                    $iconbox.find('.iconitem[data-area="'+thisIndex+'"]').each(function(){
                        var $this = $(this),
                            thisColor = $this.attr('data-color'),
                            thisValue = $this.attr('data-value'),
                            thisArea = $this.find('em').text(),
                            thisDatatext = $this.find('i').text(),
                            $thisTabContent = $this.parents('.air_tabbox'),
                            thisindex = $thisTabContent.index() - 1,
                            $thisTabBtn = $thisTabContent.siblings('.air_tab_scroll').find('.tab_item').eq(thisindex).find('.tab_btn'),
                            ThisLabel = $thisTabBtn.text();
                        var sourceHtml = '<li class="'+thisColor+'"><div class="areatitlebox"><div class="areatitle"><em>'+thisArea+'</em><i>'+thisDatatext+'</i></div></div><div class="text">'+ThisLabel+' : '+thisValue+'</div>';
                        $layerlistbox.find('ul.clearfix').append(sourceHtml);

                    });
                    $layer.addClass('active').fadeIn(function () {
                        $(this).find('.close').focus();
                    });
                    event.preventDefault();
                });
                $('.real_time .air_tabbox .imagebox .iconbox .iconitem').on('click', function(event) {
                    console.log("air quality map event 2");
                    var $this = $(this),
                        MyArea = $this.attr('data-area'),
                        MyTitle = $this.find('.area').text(),
                        $iconbox = $this.parent('.iconbox'),
                        $layer = $this.parents('.imagebox').siblings('.layerbox'),
                        $layerTitle = $layer.find('.title'),
                        $layerlistbox = $layer.find('.scroll-content');
                    $focusPoint = $this;
                    $layerTitle.text(MyTitle);
                    $layerlistbox.empty().append('<ul class="clearfix"></ul>');
                    $iconbox.find('.iconitem[data-area="'+MyArea+'"]').each(function(){
                        var $this = $(this),
                            thisColor = $this.attr('data-color'),
                            thisValue = $this.attr('data-value'),
                            thisArea = $this.find('em').text(),
                            thisDatatext = $this.find('i').text(),
                            $thisTabContent = $this.parents('.air_tabbox'),
                            thisindex = $thisTabContent.index() - 1,
                            $thisTabBtn = $thisTabContent.siblings('.air_tab_scroll').find('.tab_item').eq(thisindex).find('.tab_btn'),
                            ThisLabel = $thisTabBtn.text();
                        var sourceHtml = '<li class="'+thisColor+'"><div class="areatitlebox"><div class="areatitle"><em>'+thisArea+'</em><i>'+thisDatatext+'</i></div></div><div class="text">'+ThisLabel+' : '+thisValue+'</div>';
                        $layerlistbox.find('ul.clearfix').append(sourceHtml);
                    });
                    $layer.addClass('active').fadeIn(function () {
                        $(this).find('.close').focus();
                    });
                    event.preventDefault();
                });
                $('.real_time .air_tabbox .layerbox .close').on('click', function(event) {
                    console.log("air quality map event 3");
                    var $this = $(this),
                        $layer = $this.parents('.layerbox');
                    $layer.removeClass('active').fadeOut();
                    $focusPoint.focus();
                    //event.preventDefault();
                });
				// $('.airquality .listbox ul.list li.item .tabbtn').on('click', function(event) {
				// 	console.log("air quality map event 4");
				// 	var $this = $(this),
				// 		$MyParent = $this.parent('li.item'),
				// 		ParentIndex = $MyParent.index(),
				// 		$OtherParents = $MyParent.siblings('li.item'),
				// 		$OtherBtns = $OtherParents.find('.tabbtn'),
				// 		IsActive = $MyParent.is('.active'),
				// 		$IMG = $this.siblings('.imagebox').find('img[usemap]');
				// 	if(!IsActive){
				// 		$('.airquality .listbox ul.list li.item').removeClass('active_prev');
				// 		$OtherParents.removeClass('active');
				// 		$OtherBtns.removeAttr('title');
				// 		$MyParent.addClass('active');
				// 		$this.attr('title', '선택됨');
				// 		$IMG.rwdImageMaps();
				// 		if(ParentIndex==0){
				// 			$('.airquality .listbox').addClass('first');
				// 		} else {
				// 			$('.airquality .listbox').removeClass('first');
				// 			$MyParent.prev('li.item').addClass('active_prev');
				// 		}
				// 	}
				// });

                // 대기질 경보제 슬릭
                var $air_box = $('.air_warning_box'),
                    $air_slide = $air_box.find('.warning_list'),
                    $air_control = $air_box.find('.warning_control');

                $air_slide.slick({
                    //autoplay: true,
                    //fade: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow : $air_control.find('.prev_btn'),
                    nextArrow : $air_control.find('.next_btn'),

                    // 추가 기능
                    autoArrow : $air_control.find('.auto'),
                    pauseText : '정지',
                    playText : '재생',
                });

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}
