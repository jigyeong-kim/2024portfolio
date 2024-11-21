// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img) {
	var $tab,$tab_btn;
	var tabid=tab, n=num-1, btn_img=img;

	$tab = $(tabid+'> ul > li');
	$tab_btn = $(tabid+'> ul > li > a');

	$tab_btn.siblings().hide();
	$tab.eq(n).addClass('active');
	$tab.eq(n).children('a').siblings().show();

	if(btn_img =='img'){
		var btn = $tab.eq(n).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab_btn.on("click",function(event){
		var realTarget = $(this).attr('href');

		if(realTarget != "#"){
			return
		}
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}
		$tab_btn.removeAttr('title').siblings().hide();
		$tab_btn.parent().removeClass('active');

		$(this).attr('title', '하위메뉴 열림').siblings().show();
		$(this).parent().addClass('active');

		event.preventDefault();
	});
}

function tabOrg(tabid,a,img) {
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  > li');
	$tab_btn = $(tabid+' .tab_item > li > a');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);

	$tab.eq(num-1).addClass('active');
	$obj_view.show();

	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}

		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active');
		$tab.eq(this_eq).addClass('active');

		$obj.hide();
		$(tabid+' .tab_obj.n'+(this_eq+1)).show();

		event.preventDefault ();
	});
}

$(document).ready(function(){
	//이미지 롤오버 
	 $('.overimg').mouseover(function (){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_off.','_on.'));
		
	 }).mouseout(function(){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_on.','_off.'));
	 });
	 
	 try {
	 	jsSuwonWeather();
	 	jsSuwonFineDust10();
	 }catch(e){}
});

'use strict';

try {
	this.mode = '';
	
	//제이쿼리가 있으면
	this.jQuery = this.jQuery || undefined;

	if(jQuery) {
		//$ 중복방지
		(function($) {
			//태그객체
			$.tag = {
				wdw : $(window),
				dcmt : $(document),
				html : $('html'),
				head : $('head')
			};

			$(function() {
				//1차메뉴에서 작은텍스트분리
				/* 1차메뉴에서 텍스트 앞부분 개발로 처리 어려우면 스크립트로 처리 : 주석 풀어주세요!!
				var $depth1_item = $('.lnbbox .nav .depth1_item');
				$depth1_item.each(function(){
					var $this = $(this),
						$depth1_text = $this.find('.depth1_text'),
						$depth1_text_span = $depth1_text.find('span'),
						TextOfdepth1 = $depth1_text_span.text(),
						res = TextOfdepth1.split(' ');
					$depth1_text_span.empty();
					for ( var i in res ) {
						if(i==0){
							$depth1_text_span.append('<em>'+res[i]+'</em>');
						} else{
							$depth1_text_span.append(' '+res[i]);
						};
					};
				});
				*/
					
				var $nav = $('.nav'),
					navMenuType = parseInt($nav.attr('data-menu-type'), 10) || 1,
					navOption = {
						cut : {},
						namespace : 'menu'
					};

				$.tag.wdw.on('responsive.common', function(event) {
					//wide, web, tablet, phone분기에 걸렸을때
					if($.inArray(event.state, event.setting.rangeProperty) > -1) {
						var menuEvent = 'click',
							menuType = 4;
						
						//wide 또는 web일때
						if(event.state === 'wide' || event.state === 'web') {
							menuEvent = 'mouse';
							menuType = navMenuType;
						}
						
						//현재 메뉴 이벤트와 분기에 따른 메뉴 이벤트가 다를때
						if(navOption.event !== menuEvent) {
							//메뉴가 셋팅되어 있을때 파괴
							if($nav.hasClass('menu_initialized')) {
								$nav.menu('destroy');
							}
							
							//메뉴 이벤트 변경
							navOption.event = menuEvent;

							//data-menu-type변경하고 새로운메뉴 생성 후 data-menu-type복귀
							$nav.attr('data-menu-type', menuType).menu(navOption).attr('data-menu-type', navMenuType);
						}
					}

					if(event.state == 'wide' || event.state == 'web') {
						mode = 'pc';
						
						$('.lnbbox').removeAttr('style');

					}else if(event.state == 'tablet') {
						mode = 'tablet';
					}else if(event.state == 'phone') {
						mode = 'mobile';
					};
					
					if(event.state == 'wide') {
						
					};
					if(event.state == 'web') {
						
					};

					//태블릿 || 모바일
					if(event.state == 'tablet' || event.state == 'phone') {
						$('.search_close, .sitemap_close').trigger('click');
					};
					
				});
				
				//모바일메뉴실행
				try{
				    $('.lnbbox').slideAndSwipe();
				}catch(e){}
				$('.lnb_open, .lnb_close').on('click.common', function(event) {
					if(mode == 'tablet' || mode == 'mobile') {
						$.tag.html.removeClass('menu_active');
						$('.search_close, .sitemap_close').trigger('click');
						event.preventDefault();
					}
				});
				$('.lnb_close').on('click.common', function(event) {
					if(mode == 'tablet' || mode == 'mobile') {
						$('.familybigbox .closebox button').trigger('click');
						event.preventDefault();
					}
				});

			});
			$.tag.dcmt.on('ready.common', function(event) {
			   $.responsive({
					range : {
						wide : {
							horizontal : {
								from : 9999,
								to : 1361
							}
						},
						web : {
							horizontal : {
								from : 1360,
								to : 1001
							}
						},
						tablet : {
							horizontal : {
								from : 1000,
								to : 641
							}
						},
						phone : {
							horizontal : {
								from : 640,
								to : 0
							}
						}
					},
					lowIE : {
						property : ['web']
					},
					inheritClass : false
				});
			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}

(function($) {
	'use strict';
	window.element = {};

	$(function() {

		var $html = $('html');
		var $header = element.$header = $('#header');

		var $sitemap = $header.find('.sitemap'),
			$sitemapOpen = $header.find('.lnb_open'),
			$sitemapClose = $header.find('.sitemap_close');

		var $familybigbox = $header.find('.familybigbox'),
			$familyboxOpen = $header.find('.falilysite a'),
			$familyboxClose = $familybigbox.find('.closebox button');

		$sitemapOpen.on('click', function(event) {
			if(!$('body').hasClass('tablet') && !$('body').hasClass('phone')){
				$sitemap.toggleClass('active');
				$html.toggleClass('sitemap_active');
				$search.find('.search_close').trigger('click');
			}
			return false;
		});
		$sitemapClose.on('click', function(event) {
			$sitemap.removeClass('active');
			$html.removeClass('sitemap_active');
			return false;
		});

		$familyboxOpen.on('click', function(event) {
			$familybigbox.toggleClass('active');
			$html.toggleClass('familybox_active');
			$header.find('.sitemap_close').trigger('click');
			$header.find('.search_close').trigger('click');
			$familybigbox.find('a:eq(0)').focus();
			return false;
		});
		$familyboxClose.on('click', function(event) {
			$familybigbox.removeClass('active');
			$html.removeClass('familybox_active');
			$familyboxOpen.focus();
			return false;
		});
		
		//상세검색 팝업
        $(".form_popup_btn").click(function () {
            $(".form_popup").show();
            $(".mask").show();
            $(".popup_title").attr('tabindex', '0').focus();
            return false;
        });

        $(".form_popup .close_btn").click(function () {
            $(".form_popup").hide();
            $(".mask").hide();
            $(".sample_btn").focus();
            return false;
        });
        
        //상세검색 메뉴
        // variables
        var accordionBtn = $('.accordionTitle');
        accordionBtn.on('click', function (event) {
            var textObj = $(this).next();

            if ($(this).attr('title') === '하위메뉴 열림') {
                $(this).removeAttr('title');  // title 속성 제거
            } else {
                $(this).attr('title', '하위메뉴 열림');  // title 속성 추가
            }
            textObj.toggleClass('show');
            event.preventDefault();
        });

        $.datepicker.setDefaults({
            dateFormat: 'yy-mm-dd'
            , showButtonPanel: true
            , dayNames: ['일', '월', '화', '수', '목', '금', '토']
            , dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
            , dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
            , monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월']
            , monthNamesShort: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월']
            , prevText: '이전 달'
            , nextText: '다음 달'
            , showMonthAfterYear: true
            , yearSuffix: '년'
            , minDate: 0
           });
        $('.datepicker_ui').datepicker({
            onSelect: function(date, obj){
                $('[name="q_startDt"]').val(date);
                $('.q_startDt_text').html(date);
            }
        });
        
        $('[name="q_edu_categoryCode"]').bind('change', function(){
            if($(this).is(':checked')){
                if($(this).attr('id') == 'q_categoryCode_tedu_all'){
                    $('[name="q_edu_categoryCode"][id!="q_categoryCode_tedu_all"]').removeAttr('checked');
                }else{
                    $('[id="q_categoryCode_tedu_all"]').removeAttr('checked');
                }
            }
        });
        $('[name="q_faci_cateCode"]').bind('change', function(){
            if($(this).is(':checked')){
                if($(this).attr('id') == 'q_cateCode_tfaci_all'){
                    $('[name="q_faci_cateCode"][id!="q_cateCode_tfaci_all"]').removeAttr('checked');
                }else{
                    $('[id="q_cateCode_tfaci_all"]').removeAttr('checked');
                }
            }
        });
        $('[name="q_sfaci_cateCode"]').bind('change', function(){
            if($(this).is(':checked')){
                if($(this).attr('id') == 'q_cateCode_tsfaci_all'){
                    $('[name="q_sfaci_cateCode"][id!="q_cateCode_tsfaci_all"]').removeAttr('checked');
                }else{
                    $('[id="q_cateCode_tsfaci_all"]').removeAttr('checked');
                }
            }
        });
        $('[name="q_share_cateCode"]').bind('change', function(){
            if($(this).is(':checked')){
                if($(this).attr('id') == 'q_cateCode_tshare_all'){
                    $('[name="q_share_cateCode"][id!="q_cateCode_tshare_all"]').removeAttr('checked');
                }else{
                    $('[id="q_cateCode_tshare_all"]').removeAttr('checked');
                }
            }
        });
        $('[name="q_pre_bookingTypes"]').bind('change', function(){
            if($(this).is(':checked')){
                if($(this).attr('id') == 'q_pre_bookingTypes_all'){
                    $('[name="q_pre_bookingTypes"][id!="q_pre_bookingTypes_all"]').removeAttr('checked');
                }else{
                    $('[id="q_pre_bookingTypes_all"]').removeAttr('checked');
                }
            }
        });
        $('[name="q_to_guCode"]').bind('change', function(){
            if($(this).is(':checked')){
                if($(this).attr('id') == 'q_guCode_tgu_all'){
                    $('[name="q_to_guCode"][id!="q_guCode_tgu_all"]').removeAttr('checked');
                }else{
                    $('[id="q_guCode_tgu_all"]').removeAttr('checked');
                }
            }
        });
	});
})(window.jQuery);