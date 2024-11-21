function web_menu(a){
	//상단메뉴
	var lnb = $('#lnb'),
		depth1 = $(".top1menu");
		
	depth1.find(" > li > div").addClass('top2m');
	depth1.find("ul ul").hide();

	var depth2 = $('.top1menu .top2m'),
		lnbBg= $(".top2mbg"),
		//lnbLeave = $(".visual .btn_number button:first, .gnb li:last a, .side_menu ul li:first a"),
		lnbLeave = $("#container a,#container button"),
		SiteImg = $('.site_img');

	depth2.hide();
	SiteImg.hide();

	lnb.css("left","");
	depth1.find(" > li > a").off();
	depth1.find(" ul > li a").off();

	var dep1_length = depth1.find(" > li").size();
	//var $depLast_length = depth1.find(" > li:nth-child("+dep1_length+")  li").size();
	//depth1.find(" > li:nth-child("+dep1_length+")  li:nth-child("+$depLast_length+")").addClass('last');

	var dep2_h = 0;
	for (i=1;i <= dep1_length;i++) {
		top2m_h = depth1.find(" > li:nth-child("+i+") .top2m").height();
		if(dep2_h < top2m_h){
			dep2_h = top2m_h;
		}
		depth1.find("> li:nth-child("+i+") .top2m").addClass('m'+i);
	}
	depth2.find("div").css("height", dep2_h);
	lnbBg.css("height", dep2_h+3);
	SiteImg.css("height", dep2_h+1);

	depth1.find(" > li > a").on('mouseenter focusin',function(event){
		event.preventDefault ();
		depth2.stop().slideDown();
		lnbBg.stop().slideDown();
		depth1.addClass('on');
		SiteImg.stop().slideDown();
	});

	lnb.mouseleave(function(){
		depth2.stop().slideUp();
		lnbBg.stop().slideUp();
		depth1.removeClass('on');
		SiteImg.stop().slideUp();
	});

	depth1.find(" > li").on('mouseenter focusin',function(event){
		$(this).addClass('hover');
	});
	
	depth1.find(" > li").on('mouseleave focusout',function(event){
		$(this).removeClass('hover');
	});

	//lnb 벗어나면 닫기
	lnbLeave.focusin(function(){
		depth2.stop().slideUp();
		lnbBg.stop().slideUp();
		depth1.removeClass('on');
		depth2.prev('a.hover').removeClass('hover');
		SiteImg.stop().slideUp();
	});

};

function mobile_menu(a){
	//상단메뉴
	var depth1 = $(".top1menu"),
		dep1_length = depth1.find(" > li").size(),
		depLast_length = depth1.find(" > li:nth-child("+dep1_length+")  li").size();

	depth1.find(" > li > div").addClass('top2m');
	depth1.off();
	depth1.find(" > li > a").off();
	depth1.find(" ul > li a").off();

	$(".top1menu .top2m, .top1menu .top2m div").css("height","auto");
	
	depth1.find(" >  li > a").on('click',function(event){
		event.preventDefault ();
		var m_open=$(this).hasClass('active');
		if(m_open==true){
			$(this).siblings().slideUp();
			$(this).removeClass('active');
		}else{
			depth1.find(" > li > div ").stop().slideUp();
			depth1.find(" a ").removeClass('active');
			$(this).siblings().slideDown();
			$(this).addClass('active')
		}
	});

	depth1.find(" ul > li a ").on('click',function(event){
		var depth3_has=$(this).siblings("ul").size();
		if(depth3_has>0){
			event.preventDefault();
		}
		var m_open=$(this).hasClass('active');
		if(m_open==true){
			$(this).siblings().slideUp();
			$(this).removeClass('active');
		}else{
			depth1.find(" ul ul").stop().slideUp();
			depth1.find(" ul a").removeClass('active');
			$(this).siblings().slideDown();
			$(this).addClass('active')
		}
	});
}

$(document).ready(function(){
	var lnb = $('#lnb'),
		m_nav_open = $('.lnb_m_nav'),
		m_nav_close = $('.mask, .lnb_close button'),
		mask = $( '.mask' ),
		gnb_m = $('.gnb'),
		bodyFrame = $( 'body, html' );
	 	m_nav_display=false;

	m_nav_open.click(function() {
		var h = $(window).height();
		lnb.animate(  { right : 0 },  500);
		bodyFrame.css("overflow",'hidden');
		mask.show();
		gnb_m.addClass('mobile_gnb');
	});
	m_nav_close.click(function() {
		lnb.animate(  { right : -300 },  500);
		bodyFrame.css('overflow', '' );
		mask.hide();
		gnb_m.removeClass('mobile_gnb');
	});
});

$(function () {
	$(window).on({
		load: function () {
			if ($(window).width() > 1000) {
				web_menu();
			}
			else {

				mobile_menu();
			}
		},
		resize: function () {
			if ($(window).width() > 1000) {
				web_menu();
			}
			else {

				mobile_menu();
			}
		}
	});
});
