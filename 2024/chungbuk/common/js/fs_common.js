$(document).ready(function() {

	//건너뛰기 포커스이동
	$(".skip_nav:eq(0)").click(function(){
		$("#fs_container_wrap").attr("tabindex", -1).focus();
	});
	$(".skip_nav:eq(1)").click(function(){
		$("#fs_top_menu").attr("tabindex", -1).focus();
	});
	$(".skip_nav:eq(2)").click(function(){
		$("#fs_footer").attr("tabindex", -1).focus();
	});

	//메뉴 %자동조절
	var sp = 180;
	var snb_menu_Width = 100/$('ul.lnb > li').length;
	//$('ul.lnb > li').css('width',snb_menu_Width+'%'); //메뉴 개수에 따라 %자동조절

/*
	//전체메뉴(접근성 기능 포함)
	function chk(){
		if(cc == 1){
			$(".fs_top_menu ul.lnb > li > ul").stop(true,false).show(400);
		}else{
			$(".fs_top_menu ul.lnb > li > ul").stop(true,false).hide(400);
		}
	}
	//마우스가 들어갔을때
	$('.fs_top_menu > ul.lnb > li').mouseover(function(){
		setTimeout(chk);
		cc = 1;
		$(this).addClass('on');
	});
	//마우스가 나갔을때
	$('.fs_top_menu').mouseout(function(){
		setTimeout(chk);
		cc = 0;
		$('.fs_top_menu ul.lnb li').removeClass('on');
	});
	//포커스가 들어갔을때
	$('.fs_top_menu ul.lnb li a').focus(function(){
		setTimeout(chk);
		cc = 1;
		$(this).parent().parent().addClass('on');
	});
	//포커스가 나갔을때
	$('.fs_top_menu ul.lnb li a').blur(function(){
		setTimeout(chk);
		cc = 0;
		$('.fs_top_menu ul.lnb li').removeClass('on');
	});
*/

	//개별메뉴(접근성 기능 포함) : 개별메뉴로 변경시 fs_layout.css의 fs_top_menu 배경을 lnb_layer01로 옮겨준다
	$(".fs_top_menu .lnb li").mouseenter(function(){
		$(this).find(".lnb_layer01").stop(true,false).slideDown(0,"easeOutExpo");
		$(this).addClass("on");
	});
	$(".fs_top_menu .lnb li").mouseleave(function(){
		$(this).find(".lnb_layer01").stop(true,false).slideUp(0,"easeOutExpo");
		$(this).removeClass("on");
	});
	$(".fs_top_menu .lnb li").focusin(function(){
		$(this).find(".lnb_layer01").stop(true,false).slideDown(0,"easeOutExpo");
		$(this).addClass("on");
	});
	$(".fs_top_menu .lnb li").focusout(function(){
		$(this).find(".lnb_layer01").stop(true,false).slideUp(0,"easeOutExpo");
		$(this).removeClass("on");
	});

	// 랭귀지
	// 언어 슬라이드 박스 열기
	$(".lang_off").click(function(event){
		$(".lang_cont").stop(true,false).slideToggle();
		event.preventDefault();
	});
	

	/* 2020-09-18 : 충북도청 외국어 메인 언어선택박스 열때 title="열기/닫기" 생성 */
	/* by JINHO SON */  
	$(".global_btn .lang_off").on('click', function(event) {
		var $this = $(this);
		if(!$this.hasClass('on')) {
			$this.attr('title', '닫기').addClass('on').addClass('active');
		} else {
			$this.attr('title', '열기').removeClass('on').removeClass('active');
		}
		event.preventDefault();
	});

	//태블릿,모바일 메뉴열기
	$(".mbtn_box .menu_open").click(function(){
		$("body").toggleClass("overflow_y");
		$(this).toggleClass("on");

		$(".fs_mtop_menu").stop(true,false).slideToggle(0);
		$(".fs_mtop_menu").html($(".fs_top_menu").html());

		menu_mo();

		$(window).resize(function (){
			// width값을 가져오기
			var width_size = window.outerWidth;

			// 800 이하인지 if문으로 확인
			if (width_size <= 1024) {
				menu_mo();

			}else{
				$(".fs_mtop_menu").hide();
				$("body").removeClass("overflow_y");
				$(".menu_open").removeClass("on");
			}
		})
		$(window).load(function (){
			// width값을 가져오기
			var width_size = window.outerWidth;

			// 800 이하인지 if문으로 확인
			if (width_size <= 1024) {
				menu_mo();
			}else{
				$(".fs_mtop_menu").hide();
				$("body").removeClass("overflow_y");
				$(".menu_open").removeClass("on");
			}
		})
		return false;
	});

	//맨위로
	$(".btn_top").hide();
	$(window).scroll(function(){
		if($(window).scrollTop() > 200){
			$(".btn_top").show(0);
		}else{
			$(".btn_top").hide(0);
		}
	});

	//맨위로가기
	$(".btn_top").click(function(){
		$("html, body").animate({scrollTop:0},{duration:800,easing:"easeInOutExpo"});
		return false;
	});

	//애니메이션 효과(참고:https://github.com/daneden/animate.css)
	//메인
	$('.main_visual_text .sta,.main_visual_text .stb,.main_visual_text .stc').addClass('animated fadeInDown');
	$('.main_visual_text .vis_img_icon,.main_visual_text .vis_img_btn').addClass('animated fadeInUp');
	$('.main_visual_text .vis_img_bg').addClass('animated zoomIn');
	//서브
	$('.snb_vis_box h2').addClass('animated fadeInUp');
	$('.snb_vis_box span,.con_header h3').addClass('animated fadeInDown');

	//탭메뉴 %자동조절
	var tap_menu_Width = 100/$('ul.tap_btn > li').length;
	$('ul.tap_btn > li').css('width',tap_menu_Width+'%'); //메뉴 개수에 따라 %자동조절

	//탭메뉴 %자동조절
	var tap_menu_Width2 = 180/$('ul.tap_btn2 > li').length;
	$('ul.tap_btn2 > li').css('width',tap_menu_Width2+'%'); //메뉴 개수에 따라 %자동조절

	//탭메뉴 %자동조절
	var tap_menu_Width3 = 400/$('ul.tap_btn3 > li').length;
	$('ul.tap_btn3 > li').css('width',tap_menu_Width3+'%'); //메뉴 개수에 따라 %자동조절

	//레프트메뉴
	menu_left();

	//검색
	$(".login_open").click(function(){
		$(".search").stop(true,false).slideToggle();
		
		$(window).resize(function (){
			// width값을 가져오기
			var width_size = window.outerWidth;

			// 800 이하인지 if문으로 확인
			if (width_size <= 1024) {
				$(".search").hide();

			}else{
				$(".search").show();
			}
		})
		$(window).load(function (){
			// width값을 가져오기
			var width_size = window.outerWidth;

			// 800 이하인지 if문으로 확인
			if (width_size <= 1024) {
				$(".search").hide();
			}else{
				$(".search").show();
			}
		})
	});



	//status_map
	$('.status_map').addClass('status_map1').find('li:first-child a.tit').addClass('on').next('.cont').show();
	$('.status_map a.tit').click(function(){
		var status_map_this=$(this).parents('li').index(),
				status_map_num=status_map_this+1;		
		$('.status_map').removeClass().addClass('status_map').find('.tit').removeClass('on').next('.cont').hide();
		$('.status_map').addClass('status_map'+status_map_num);
		$(this).addClass('on').next('.cont').show();
			return false;
	});

});


//모바일 메뉴
function menu_mo(){

	$('ul.lnb > li').removeAttr("style"); 
	$(".fs_mtop_menu .bgc").css("display","none");
	$(".fs_mtop_menu .lnb > li > a").hasClass("on");
	$(".fs_mtop_menu .lnb li > a").removeClass("on");
	$(".fs_mtop_menu .lnb li:eq(0) > a").addClass("on");
	$(".fs_mtop_menu .lnb li:eq(0) > .bgc").show();
	$(".fs_mtop_menu .lnb > li > a").click(function(e) { e.preventDefault(); });//링크 안걸리게
	$(".fs_mtop_menu .lnb li ul li a.dep3").click(function(e) { e.preventDefault(); });//링크 안걸리게

	$(".fs_mtop_menu .lnb li > a").on("click",function(e){

		$(".fs_mtop_menu .lnb_layer02").stop(true,false).hide();
		$(".fs_mtop_menu .lnb li ul li a").removeClass("on");

		if($("+.bgc",this).attr('class') == undefined) {

			if($("+.lnb_layer02",this).css("display") == "none"){
				$(".fs_mtop_menu .lnb_layer02").stop(true,false).hide();
				$("+.lnb_layer02",this).stop(true,false).show();
				$(".fs_mtop_menu .lnb > li > .bgc > ul > li a").removeClass("on");
				$(this).addClass("on");
			}
			
		} else {
			if($("+.bgc",this).css("display") == "none"){
				$(".fs_mtop_menu .bgc").stop(true,false).hide();
				$("+.bgc",this).stop(true,false).show();
				$(".fs_mtop_menu .lnb > li > a").removeClass("on");
				$(this).addClass("on");
			}
		}

	});

	$(".fs_mtop_menu").scroll(function(){
		if($(".fs_mtop_menu").scrollTop() < 30){
			$(".mbtn_box .menu_open").css("margin-top","0");
			//alert("bb");
		}else{
			$(".mbtn_box .menu_open").css("margin-top","-94px");
		}
	});

	$(".mg4").click(function(){
		$(".mglobal_box .global_btn .lang_cont").stop(true,false).slideToggle();
	});
};

//레프트 메뉴
function menu_left(){

	$(".snb_menu .dep2").hide();
	$(".snb_menu .dep1 li a.dep3").click(function(e) { e.preventDefault(); });//링크 안걸리게
	$(".snb_menu .dep1 > li > a.dep3.on").parent().find(".dep2").show();

	$(".snb_menu .dep1 > li > a").click(function(){
		$(".snb_menu .dep1 > li .dep2").slideUp();
		$(".snb_menu .dep1 > li > a").removeClass("on");

		if(!$(this).next().is(":visible"))
		{
			$(this).next().slideDown();
			$(this).addClass("on");

			$(".snb_menu .dep1 > li > .dep2 > li a").click(function(){
				$(".snb_menu .dep1 > li > .dep2 > li a").removeClass("on");
				$(this).addClass("on");
			});
		}

	})

};

//하단배너
function banner(){

	//banner
	var bannerAuto=null;
	var bannerDirect="left";

	function rightBanner(){
		$(".banner ul").stop().animate(
			{left:"-=130px"},0,function(){
					var $bannerObj=$(".banner ul li:first").clone(true);
					$(".banner ul li:first").remove();
					$(".banner ul").css("left",0);
					$(".banner ul").append($bannerObj);
			} 
		)
			if(bannerAuto)clearTimeout(bannerAuto);
			bannerAuto=setTimeout(rightBanner,3000)
	}

	function leftBanner(){
		$(".banner ul").stop().animate(
			{left:"0px"},0,function(){
				var $bannerObj=$(".banner ul li:last").clone(true);
				$(".banner ul li:last").remove();
				$(".banner ul").css("left",0);
				$(".banner ul").prepend($bannerObj);
			} 
		)
			if(bannerAuto)clearTimeout(bannerAuto);
			bannerAuto=setTimeout(rightBanner,3000)
	}
	
	
	bannerAuto=setTimeout(rightBanner,3000)

	$rightB=$(".bn_ctrl .bn_next");
	$leftB=$(".bn_ctrl .bn_prev");
	$pauseB=$(".bn_ctrl .bn_stop");
	var bPlay = false;

	$leftB.click(function(){
		/*if (bPlay == true){
		clearTimeout(bannerAuto);
		}else{*/
		bannerDirect="left"
		clearTimeout(bannerAuto);
		$pauseB.attr("class","bn_stop").html("배너일시정지");
		leftBanner();
		return false;
		/*}*/
	});

	$rightB.click(function(){
		/*if (bPlay == true){
		clearTimeout(bannerAuto);
		}else{*/
		bannerDirect="right"
		clearTimeout(bannerAuto);
		$pauseB.attr("class","bn_stop").html("배너일시정지");
		rightBanner();
		return false;
		/*}*/
	});


	$pauseB.click(function(){
		if (bPlay == false){
		clearTimeout(bannerAuto);
		$pauseB.attr("class","bn_play").html("배너재생");
		bPlay = true;
		}else{
		bPlay = false;
		$pauseB.attr("class","bn_stop").html("배너일시정지");
		bannerAuto=setTimeout(rightBanner,1500) 
		}
	});

	$(".banner ul li a").bind("mouseover focusin", function(){
		clearTimeout(bannerAuto);
		/*$bannerP_btn.attr("src","images/main/btn_banner_play.gif");
		$bannerP_btn.attr("alt","배너재생");*/
	});
	$(".banner ul li a").bind("mouseleave focusout", function(){
		bPlay = false;
		/*bannerAuto=setTimeout(rightBanner,1500) 
		$bannerP_btn.attr("src","images/main/btn_banner_stop.gif");
		$bannerP_btn.attr("alt","배너일시정지");*/
	});

}

//주소복사
function copy_clip(curl, title){
	var IE = (window.clipboardData)?true:false;
	if(IE) {
		window.clipboardData.setData("Text", curl);
		alert("현재 페이지 URL이 복사되었습니다.");
	}
	else {
		prompt("현재페이지 URL입니다. Ctrl+C를 눌러 클립보드에 복사하세요.", curl);
	}
}

//print
function size_open_win(url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable, location) { 
	toolbar_str = toolbar ? 'yes' : 'no'; 
	menubar_str = menubar ? 'yes' : 'no'; 
	statusbar_str = statusbar ? 'yes' : 'no'; 
	scrollbar_str = scrollbar ? 'yes' : 'no'; 
	resizable_str = resizable ? 'yes' : 'no'; 
	location_str = location ? 'yes' : 'no'; 
	window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str+',location='+location_str); 
} 

function goLogin() {
	var mobile_keys = new Array('iPhone','iPod','Android','BlackBerry','Windows Phone','Windows CE','LG','MOT','SAMSUNG','SonyEricsson','Nokia');
	if(document.URL.match('move_pc_screen')) mobile_keys = null; // URL 파라메타에 'move_pc_screen' 가 포함되어 있을땐 적용안함
	for(i in mobile_keys) {
		if(navigator.userAgent.match(mobile_keys[i]) != null) {
			document.location.href = '/sso/business.jsp?siteId=m';
			return false;
		}
	}

	document.location.href = '/sso/business.jsp?siteId=www';
	return false;
}