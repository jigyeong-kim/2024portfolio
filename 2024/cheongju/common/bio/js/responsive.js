/*
	만든이 : 권정현
	
	//계정이력
	2016년 03월 30일 - ie7 & ie8 체크 함수 추가, responsive 분기처리 플러그인 최초생성
	2016년 04월 11일 - 최초로드 넓이, 리사이즈 넓이, 최초로드 높이, 리사이즈 높이 각 분기처리함수에 매개변수 추가
	2016년 04월 14일 - trigger 네임스페이스 추가
	2016년 04월 22일 - 플러그인 중복복제 방지
	2016년 05월 20일 - 미디어쿼리와 $(window).width()의 미스매칭 수정
*/

var responsiveDuplicate = 0;

//ie9 console error fix
function consoleLog(comment) {
	window.console && console.log(comment);
}

//ie7 & ie8 체크 함수
function ieLimit() {
	//제한대상이라면 true 제한대상이 아니면 false
	if(navigator.appVersion.indexOf("MSIE 8.") == -1 && navigator.appVersion.indexOf("MSIE 7.") == -1) {
		return false;
	}else{
		return true;
	}
}

//자바스크립트 외부파일 검사(if ie까지 검사가능)
function jsCheck(name) {
	var str = $("html").html().toLowerCase();
	var pattern1 = /<script/g;
	var pattern2 = /<\/script>/g;
	var arr1 = new Array();
	var arr2 = new Array();
	var arr3 = new Array();
	var i = 0;
	
	//패턴 검사
	while(pattern1.test(str) == true) {
		arr1[i] = pattern1.lastIndex;
		//consoleLog("첫번째 : " + pattern1.lastIndex);
		while(pattern2.test(str) == true) {
			arr2[i] = pattern2.lastIndex;
			//consoleLog("두번째 : " + pattern2.lastIndex);
			break;
		}
		i++;
	}
	
	//짝검사
	if(arr1.length == arr2.length) {
		//글자 변환
		for(var j=0; j<arr1.length; j++) {
			arr3[j] = "<script" + str.substring(arr1[j], arr2[j]);
			//consoleLog(arr1[j], arr2[j]);
		}

		//스크립트 검사
		for(var k=0; k<arr3.length; k++) {
			if(arr3[k].indexOf(name) != -1) {
				return true;
			}
		}

	}else{
		consoleLog('짝이 맞지 않습니다.');
	}
}

(function($){
	$.fn.responsive = function(check) {
		var $target = $(this);

		//중복실행하거나 $target이 존재하지 않을때
		if(responsiveDuplicate || $target.length <= 0) return;

		var oldState = "";
		var firstWidth = $(window).width();
		var firstHeight = $(window).height();

		if(check == undefined || check.length <= 0) { //매개변수에 아무것도없거나 글자가 1개라도 없을때
			consoleLog('IE7, IE8 함수실행 여부를 확인해주세요.');
			return;
		}else if(check.toLowerCase() != "y" && check.toLowerCase() != "n") { //y,n이 둘다 아니라면
			consoleLog('y 또는 n을 넣어 주세요.');
			return;
		}else if(check.toLowerCase() == "n" && ieLimit()) { //n이 맞으면서 ie7,ie8일때
			$(window).on("resize.lowIE", function(firstWidth, firstHeight) {
				var winWidth = $(this).width();
				var winHeight = $(this).height();
				
				lowIEAll(firstWidth, winWidth, firstHeight, winHeight);
			});

			$(window).trigger("resize.lowIE");
			lowIEInit(firstWidth, firstHeight);
			$target.addClass("low_ie");
			return;
		}

		function divide(state) {
			var nowState = state.toString();

			if(nowState == oldState) {
				return false;
			}else{
				$target.removeClass(oldState);
				$target.addClass(nowState);
				consoleLog("현재상태 : " + nowState);

				oldState = nowState;
				return true;
			}
		}
		
		$(window).on("resize.responsive", function(){
				//IE7,8 window.innerWidth 지원불가
				if(ieLimit()) {
					var winWidth = $(this).width();
				}else{
					var winWidth = window.innerWidth;
				}

				var winHeight = $(this).height();
				
				all(firstWidth, winWidth, firstHeight, winHeight);

				if(winWidth >= 1200) {
					if(!divide("wide")) return false;
					wide(firstWidth, winWidth, firstHeight, winHeight);
				}else if(winWidth >= 1000 || winWidth >= 801) {
					if(!divide("web")) return false;
					web(firstWidth, winWidth, firstHeight, winHeight);
				}else if(winWidth >= 800 || winWidth >= 641) {
					if(!divide("tablet")) return false;
					tablet(firstWidth, winWidth, firstHeight, winHeight);
				}else if(winWidth >= 640 || winWidth >= 0) {
					if(!divide("mobile")) return false;
					mobile(firstWidth, winWidth, firstHeight, winHeight);
				}
		});
		
		//함수 초기실행
		$(window).trigger("resize.responsive");

		//복제방지
		responsiveDuplicate = 1;
	}
})(jQuery);