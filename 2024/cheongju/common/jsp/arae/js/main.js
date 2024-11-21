
//popupzone


//2014-05-01 추가
jQuery(function($){
	$('.contents_btn, .contents_btn img').click(function(event){
		//alert('a');
		var $target=$(event.target);
		if($target.is('.btn_home, .btn_home img')){ //중앙일때
			$('#contnets_box .con').stop().animate({left:[496,'easeInOutExpo']},700);
			$('#right_contents .all, #left_contents .all').css({'display':'block'});
			$('#right_contents .right_con_box2, #left_contents .left_con_box2, .middle_contents .all, #left_contents .btn_home, #right_contents .btn_home').css({'display':'none'});
			$('#right_btn_h').removeClass(); 
		}else if($target.is('.home_left, .home_left img, .lb_btn')){ //왼쪽일때
			$('#contnets_box .con').stop().animate({left:[1512,'easeInOutExpo']},700);
			$('#left_contents .all, #right_contents .right_con_box2, #right_contents .btn_home').css({'display':'none'});
			$('#left_contents .left_con_box2, #left_contents .btn_home, .middle_contents .all, #right_contents .all').css({'display':'block'});
			$('#right_btn_h').removeClass(); 
		}else if($target.is('.home_right, .home_right img, .rb_btn')){ //오른쪽일때
			$('#contnets_box .con').stop().animate({left:[-520,'easeInOutExpo']},700);
			$('#right_contents .all, #left_contents .left_con_box2, #left_contents .btn_home').css({'display':'none'});
			$('#right_contents .right_con_box2, #left_contents .all, .middle_contents .all, #right_contents .btn_home').css({'display':'block'});
			$('#right_btn_h').addClass("btn_on");
		};
		return false;
	});
});

 
(function($){	
	$.fn.PopupZone = function(options) {
		
		var settings = {
			prevBtn : '',
			nextBtn : '',
			playBtn : '',
			waitingTime : ''
		};
		
		$.extend(settings, options);
		settings.areaDiv = this;
		settings.prevBtn = $(settings.prevBtn);
		settings.nextBtn = $(settings.nextBtn);
		settings.playBtn = $(settings.playBtn);
		
		settings.cnt = settings.areaDiv.find('li').length;		
		settings.waitingTime = parseInt(settings.waitingTime);
		settings.nowNum = 0;
		settings.moveFlag = true; 
		settings.moveType;
		settings.setTimeOut;
		var status=true;
		
		function emptySetting() {
			settings.areaDiv.find('.count').html(settings.nowNum+1);
			settings.areaDiv.find('li').hide();
		}
		function setRolling(aniFlag) {
			if(!settings.moveFlag){
				if(settings.moveType=="next" || settings.moveType == null){ 
					settings.nowNum++;
					if(settings.nowNum == settings.cnt) settings.nowNum = 0;
				} else if(settings.moveType=="prev") {
					settings.nowNum--;
					if(settings.nowNum < 0) settings.nowNum = (settings.cnt-1);
				}
			}			
			emptySetting();
			
			if(aniFlag) settings.areaDiv.find('li').eq(settings.nowNum).show();
			else settings.areaDiv.find('li').eq(settings.nowNum).fadeIn('normal');
			 // 기본 : aniFlag 설정 없으면 fade 효과 - 조정
			
			aniFlag = false;
			settings.moveFlag = false;
			if(status){
				settings.setTimeOut= setTimeout(setRolling , settings.waitingTime);
			}
		}
		function playRolling(){
			if(status){
				clearTimeout(settings.setTimeOut);
				settings.playBtn.find('img').attr('src',"images/main/popup_btn_play.gif");
				settings.playBtn.find('img').attr('alt',"팝업 롤링 재생");
				status = false;
			}else{
				settings.playBtn.find('img').attr('src',"images/main/popup_btn_stop.gif");
				settings.playBtn.find('img').attr('alt',"팝업 롤링 정지");
				status = true;
				setRolling();
			}
			return false;
		}
		function prevRolling(){
			clearTimeout(settings.setTimeOut);
			settings.moveType = "prev";
			setRolling();
			return false;
		}
		function nextRolling() {
			clearTimeout(settings.setTimeOut);
			settings.moveType = "next";
			setRolling();
			return false;
		}
		setRolling();
		settings.prevBtn.click(prevRolling);
		settings.nextBtn.click(nextRolling);
		settings.playBtn.click(playRolling);
		
	};

})(jQuery);

$(document).ready(function(){
	 $('#main_pop').PopupZone({
		prevBtn : '.pop_btn_Prev', 
		nextBtn : '.pop_btn_Next',
		playBtn : '.pop_btn_Play',
		waitingTime : '5000'

	});
});






//소식 롤링
$(function() {
	var $clubIdx = 1;
	var $clubwidth =340;
	var $clubview =1;
	var $clubSize = $('#news  ul.news_list  li').size();
	var $clubpst = 0;

	$('#news  ul.control  .control_left a').click(function() {
		if( $clubIdx > 1 ) {
				$clubpst = $clubpst + $clubwidth;
				$('#news  ul.news_list').animate(  { left : $clubpst },  1000);
				$clubIdx--;
		} else {
			//alert('처음입니다.');
		}				
	});

	$('#news  ul.control .control_right a').click(function() {
		if(  $clubIdx <= $clubSize-$clubview ) {
				$clubpst = -$clubwidth * $clubIdx;
				$('#news ul.news_list ').animate(  { left : $clubpst },  1000);
				$clubIdx++;
		} else {
			//alert('마지막입니다.');
		}
	});
});

/* 메인 이미지 롤링 */
var m_bn_count=0;
var m_bn_p_click_check= 0;

function m_bn_init(){
    var $j=jQuery;
    m_bn_count = $j("#slider > li").size();
    
    $j("#slider").css({"height":"540px", "overflow":"hidden"});
    
    //$j("#m_bn_p").click(function(){m_bn_p_click();return false;});  
    //$j("#m_bn_s").click(function(){m_bn_s_click();return false;});
    $j("#m_bn_r").click(function(){m_bn_r_click();return false;});
    $j("#m_bn_l").click(function(){m_bn_l_click();return false;});
    
    m_bn_p_click();
}

function m_bn_p_click(){
    var $j=jQuery;  
    var setwidth = $j("#slider > li").eq(0).width();
    
    if(m_bn_p_click_check == 0){
        m_bn_p_click_check = 1;
        $j("#slider > li").eq(0).clone().appendTo($j("#slider"));
        $j("#slider").animate({
                left:-setwidth
            }
            ,5000
            ,function(){
                $j("#slider > li").eq(0).remove();
                $j("#slider").css({"left":"0px"});
                m_bn_p_click_check = 0;
                m_bn_p_click();
            }
        );
    }
}

function m_bn_s_click(){
    var $j=jQuery;
    var count = $j("#slider > li").size();
    m_bn_p_click_check = 0;
    $j("#slider").stop();
    $j("#slider").css({"left":"0px"});
    if(m_bn_count < count){
        $j("#slider > li:last").remove();
    }
}

function m_bn_r_click(){
    var $j=jQuery;
    m_bn_s_click();
    $j("#slider > li").eq(0).clone().appendTo($j("#slider"));
    $j("#slider > li").eq(0).remove();
}

function m_bn_l_click(){
    var $j=jQuery;
    m_bn_s_click();
    $j("#slider > li:last").clone().prependTo($j("#slider"));
    $j("#slider > li:last").remove();
}

$(document).ready(function(){
	
	var bannerAuto=null;
	var bannerDirect="left"; 

	function rightBanner(){
		$(".banner_img").stop().animate(   
			{left:"-=130px"},0,function(){
					var $bannerObj=$(".banner_img li:first").clone(true);
					$(".banner_img li:first").remove(); 
					$(".banner_img").css("left",0); 
					$(".banner_img").append($bannerObj);
			} 
		)
			if(bannerAuto)clearTimeout(bannerAuto);
			bannerAuto=setTimeout(rightBanner,3000)
	}

	function leftBanner(){
		$(".banner_img").stop().animate(
			{left:"0px"},0,function(){
					var $bannerObj=$(".banner_img li:last").clone(true);
					$(".banner_img li:last").remove(); 
					$(".banner_img").css("left","-130px"); 
					$(".banner_img").prepend($bannerObj);
			} 
		)
			
			if(bannerAuto)clearTimeout(bannerAuto);
			bannerAuto=setTimeout(rightBanner,3000) 
	}
	

	$(document).ready(function(){
	
	bannerAuto=setTimeout(rightBanner,3000) 


		$leftB=$(".banner_control .prev_banner a");
		$rightB=$(".banner_control .next_banner a");
		$pauseB=$(".banner_control .pause_banner a");
		$bannerP_btn=$(".banner_control .pause_banner a img")
		var bPlay = false;

		$leftB.click(function(){
			if (bPlay == true){	
			clearTimeout(bannerAuto); 
			}else{			
			bannerDirect="left"
			clearTimeout(bannerAuto);
			leftBanner();
			return false;
			}
		})

		$rightB.click(function(){
			if (bPlay == true){	
			clearTimeout(bannerAuto); 
			}else{			
			bannerDirect="right"
			clearTimeout(bannerAuto);
			rightBanner();
			return false;
			}
		});


		$pauseB.click(function(){	
			if (bPlay == false){	
			clearTimeout(bannerAuto); 
			$bannerP_btn.attr("src","images/main/banner_play.gif");
			$bannerP_btn.attr("alt","배너재생");
			bPlay = true;
			}else{			
			bPlay = false;
			$bannerP_btn.attr("src","images/main/banner_stop.gif");
			$bannerP_btn.attr("alt","배너정지");
			bannerAuto=setTimeout(rightBanner,1500) 
			}
		});

});
});

$(document).ready(function(){
	
	var banner2Auto=null;
	var banner2Direct="left"; 

	function rightBanner2(){
		$("#sub_pop .pop_list").stop().animate(   
			{left:"-=130px"},0,function(){
					var $sub_popObj=$("#sub_pop .pop_list li:first").clone(true);
					$("#sub_pop .pop_list li:first").remove(); 
					$("#sub_pop .pop_list").css("left",0); 
					$("#sub_pop .pop_list").append($sub_popObj);
			} 
		)
			if(banner2Auto)clearTimeout(banner2Auto);
			banner2Auto=setTimeout(rightBanner2,3000)
	}

	function leftBanner2(){
		$("#sub_pop .pop_list").stop().animate(
			{left:"0px"},0,function(){
					var $sub_popObj=$("#sub_pop .pop_list li:last").clone(true);
					$("#sub_pop .pop_list li:last").remove(); 
					$("#sub_pop .pop_list").css("left","-130px"); 
					$("#sub_pop .pop_list").prepend($sub_popObj);
			} 
		)
			
			if(banner2Auto)clearTimeout(banner2Auto);
			banner2Auto=setTimeout(rightBanner2,3000) 
	}
	

	$(document).ready(function(){
	
	banner2Auto=setTimeout(rightBanner2,3000) 


		$sub_leftP=$(".pop_ctrl .sub_pop_btn_Prev");
		$sub_rightP=$(".pop_ctrl .sub_pop_btn_Next");
		$sub_pauseP=$(".pop_ctrl .sub_pop_btn_Play");
		$sub_pop_P_btn=$(".pop_ctrl .sub_pop_btn_Play img")
		var sub_pPlay = false;

		$sub_leftP.click(function(){
			if (sub_pPlay == true){	
			clearTimeout(banner2Auto); 
			}else{			
			banner2Direct="left"
			clearTimeout(banner2Auto);
			leftBanner2();
			}
		});

		$sub_rightP.click(function(){
			if (sub_pPlay == true){	
			clearTimeout(banner2Auto); 
			}else{			
			banner2Direct="right"
			clearTimeout(banner2Auto);
			rightBanner2();
			return false;
			}
		});


		$sub_pauseP.click(function(){	
			if (sub_pPlay == false){	
			clearTimeout(banner2Auto); 
			$sub_pop_P_btn.attr("src","images/main/sub_popup_btn_play.gif");
			$sub_pop_P_btn.attr("alt","배너재생");
			sub_pPlay = true;
			}else{			
			sub_pPlay = false;
			$sub_pop_P_btn.attr("src","images/main/sub_popup_btn_stop.gif");
			$sub_pop_P_btn.attr("alt","배너정지");
			banner2Auto=setTimeout(rightBanner2,1500) 
			}
		});

});
});