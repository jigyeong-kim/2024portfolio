// TODO: localSynap func 
// TODO: mobile용과 desktop용 동작을 염두해야함

// Header
function isHeader(){
	if ($('#header').length==0){
		return false;
	}else{
		return true;
	}
}
function getHeaderWidth(){
	if (isHeader()){
		return $('#header').width();
	}else{
		return 0;
	}
}
function setHeaderWidth(w){
	if (isHeader()){
		$('#header').width(w);
	}
}
function getHeaderHeight(){
	if (isHeader()){
		return $('#header').height();
	}else{
		return 0;
	}
}
// HeaderWrap
function getHeaderWrapHeight(){
	return $('#headerWrap').height();
}
// Footer
function isFooter(){
	if ($('#footerWrap').length==0){
		return false;
	}else{
		return true;
	}
}	
function getFooterHeight(){
	if (isFooter()){
		return $('#footerWrap').height();
	}else{
		return 0;
	}
}

$.fn.toggleCss = function(css, val1) {
	cur_val = this.css(css);
	if (parseInt(cur_val, 10) == 0) {
		this.css(css, val1);
	} else {
		this.css(css, 0);
	}
	return this;
}

/////////////////////////////////////////////////////////// 데스크탑 Start

/////////////////////////////////////////////////////////// 데스크탑 End

/////////////////////////////////////////////////////////// 모바일 start
function initMobile(){
	if( BROWSER.MOBILE.isIOS() ){
		$('.btn_close').show();
		$('.btn_close').on('click', function(e){
			e.preventDefault();
			window.close();
		});
	}
	if (BROWSER.GRAPHIC.isHeaderAbsoluteUse()) {
		// 2015.05.12 header 조절 없도록. 안드로이드는 absolute, iOS는 fixed로
		$('#headerWrap').css('position', 'absolute');
		$('#header').css('position', 'absolute');
		$('#header').css('width', '100%');
		if (localSynap.properties.mobileSkinHeaderHide){
			$('#header_hidden').css('position', 'absolute');
			$('#header_hidden').css('width', '100%');
		}
	}	
	// 스킨헤더 UX 선택
	$('#header').addClass('header_common');	
	if (localSynap.properties.mobileSkinHeaderHide){ // 숨기기
		$('#header').addClass('header_slideup');
		$('#header_hidden').addClass('header_common');
		$('#header_hidden').addClass('header_hide_div');
		
		$('#header_hidden').on('click', function(e){
			e.preventDefault();
			localSynap.TitleShow = true;
			$('#header').animate({ height: "90px" });
			
			if (localSynap.headerTimer !== null) {
				clearTimeout(localSynap.headerTimer);
			}			
			localSynap.headerTimer = setTimeout(function(){
				localSynap.TitleShow = false;
				$('#header').animate({ height: "0" });
			}, localSynap.properties.mobileSkinHeaderTimeout);
		});
		$('#header_hidden').click();
		$('#header_hidden').append('<div id="notice"><p>'+localSynap.getMobileHeaderNotice()+'</p></div>');
		setTimeout(function(){
			if (BROWSER.VERSION.isAndroidKitKat()){
				$('#notice').css('color','#354052').css('display','none');
			}else{
				$('#notice').remove();
			}
		}, (localSynap.properties.mobileSkinHeaderTimeout*3));
	}else{ // 고정
		$('#header').addClass('header_fix');
	}	
	// 노트3는 버튼 absolute해야함
	if (BROWSER.MOBILE.isGalaxyNote3() || BROWSER.VERSION.IOS() == 7) {
		$('.btn_pre').css('position', 'absolute');
		$('.btn_next').css('position', 'absolute');
	}
	if ($('.select1').length > 0 && (localSynap.getFileType() === "xls" || localSynap.getFileType() === "xlsx")){
		// #DEFECT-2501 select1도 absolute로 해서 크기가 클때 밀리지 않게 해야함.	
		if (BROWSER.MOBILE.isGalaxyNote3() || BROWSER.VERSION.IOS() == 7) {
			$('.select1').css('position', 'absolute');
		}
		// 글씨가 길어지는 것은 셀에서만 발생
		// TODO : headLogo 태그가 존재하지 않을때, headRight 태그가 존재하지 않을때 예외처리
		// FIXME : 60 은 의미있는 숫자로 부여합니다.
		//var w = $(window).width() - $('#headLogo')[0].clientWidth - $('#headRight')[0].clientWidth - 60;
		var w = $(window).width() - $('#headLogo').width() - $('#headRight').width() - 60;
		$('.select1').css('max-width',w);
		// CSS에는 고정값으로 되어있지만
		// 문자열이 길어지면 arrow가 겹치는 문제가 발생하므로
		// 최대너비에 비례하게 설정한다.
		// [PRJAM-5262] 10%만 줬더니 최대문자열에서 겹치므로 15%로 한다. 
		$('.select1').css('padding-right', w * 0.15 );
	}
}

function initSingle() {
	$('#headerWrap').css('position', 'absolute').css('z-index', 10000000000);
	$('#header').css('position', 'absolute');
	if ($('#fullScreenToolBar').length>0){
		$('#fullScreenToolBar').css('position','absolute');
	}
}

function setResizeHeaderTitle(){
	if ($('#headTitle').length > 0){
		var window_w = $(window).width() - $('#headLogo').width() - $('.navigation').width() - 60;
		// FIXME : -60은 의미있는 숫자로 부여합니다.
		$('#headTitle').width(window_w);
	}
}

function setDownloadButton(obj) {
	var url;
	if ($('#downloadBtn').length!=0){
		if(typeof obj==="string") {
			url = obj;
		} else {
			url = $(obj).find('downUrl') && $(obj).find('downUrl').text();
		}
		var $href = $('#downloadBtn');
		if( !url ){
			$href.css('display', 'none');
		}
		else{
			$href.attr('href', url).css('display', 'initial');
		}
	}
}

function printWordIframe(){
	if (BROWSER.PC.isChrome()) {
		$('#innerWrap').focus();
		frames[0].print();
	}else{
		var frm = document.getElementById("innerWrap").contentWindow;
		frm.focus();
		frm.print();
	}
}

function setPrintButton(arg) {
	if (localSynap.properties.isRenderServer){
		// 4.5.0 에서 인쇄기능 미지원으로 변경됨
		/*
		$('#printBtn').attr('href', 
						'javascript:api.printDocFromServer(\'' + localSynap.jobId + '\',\'' + localSynap.properties.contextPath + '\')'
						);
		*/
		$('#printBtn').css('display', 'none');
	}else{
		// 브라우저 인쇄 사용
		if(localSynap.properties.allowPrint && (localSynap.getFileType() === "doc" || localSynap.getFileType() === "docx" || localSynap.getFileType() === "hwp2k" || localSynap.getFileType() === "hwp97" || localSynap.getFileType() === "txt" || localSynap.getFileType() === "hwpml")){
			$('#printBtn').attr('href', 'javascript:printWordIframe()');
		}
		else{
			$('#printBtn').css('display', 'none');
		}
	}
}

function afterSingle() {
	var doc_w = $(document).width();
	if (localSynap.isSingleLayout()){
		if (doc_w > $('#headerWrap').width()){
			$('#headerWrap').width(doc_w);
		}
	}else{
		if ( BROWSER.GRAPHIC.isDrawCanvas() && (doc_w>$('#headerWrap').width())) { // Android 2.3.6
			$('#headerWrap').width(doc_w);
		}
	}
}

/////////////////////////////////////////////////////////// 모바일 End

/** FullScreen 관련 시작 **/

if (BROWSER.isMobile()) {

}else {
localSynap = (function() {
	var private = {
		toggleFullScreen: function () {
			$('.fullScreenOnly').toggle(!localSynap.fullScreenMode);
			$('.normalScreenOnly').toggle(localSynap.fullScreenMode);
			localSynap.fullScreenMode = !localSynap.fullScreenMode;
			return localSynap.fullScreenMode;
		},

		toggleFS: function() {
			if (localSynap.getFileType() !== "pdf"){
				if (localSynap.isSlide()){
					$('#container').toggleCss('top', localSynap.topS+'px').toggleCss('bottom', localSynap.bottomS+'px');
				}else{
					$('#container').toggleCss('padding-top', localSynap.topS+'px').toggleCss('padding-bottom', localSynap.bottomS+'px'); 
				}
			}
			private.toggleFullScreen();
			if (localSynap.isSlide() || localSynap.getFileType() === "image"){
				$(window).resize();
			} else if (localSynap.getFileType() === "pdf"){
				resizeView();
			}
			return false;
		}
	};

	var public = {
		fullScreenMode: false,
		prevThumbOpen: true,
		goFullScreen: (function() {
			if (BROWSER.isMobile()) {
				return function() {
				};
			}
			else {
				return function() {
					if (!BROWSER.PC.isIE()) {
						// TODO: get Document Element API to common.js or format.js
						if (parseInt(($("#thumbnail").css('left'))) < 0) {
							localSynap.prevThumbOpen = false;
						} else {
							localSynap.prevThumbOpen = true;
						}
						$('.closeBtn').click();
					} else {
						localSynap.fullScreenMode = true;
						$('.normalScreenOnly').hide();
						$('.fullScreenOnly').show();
					}
					$('#documentScale').removeClass('normalScaleTop').addClass('fullscreenScaleTop');
					$('#container').css('top', 0).css('bottom', 0);
					$(window).resize();
					return false;
				};
			}
		})(),
		exitFullScreen: (function() {
			if (BROWSER.isMobile()) {
				return function() {
				};
			}
			else {
				return function () {
					if (!BROWSER.PC.isIE()) {
						if (localSynap.prevThumbOpen === true) {
							$('.openThumbnail').click();
						} else {
							$('.closeBtn').click();
						}
					} else {
						localSynap.fullScreenMode = false;
						$('.fullScreenOnly').hide();
						$('.normalScreenOnly').show();
					}
					containerSizeAdjust();
					$('#documentScale').removeClass('fullscreenScaleTop').addClass('normalScaleTop');
					localSynap.thumbnailScrollPositionFix && localSynap.thumbnailScrollPositionFix();
					$(window).resize();
					return false;
				};
			}
		})()
	};

	return $.extend(localSynap, public);
})();

	$(document).ready(function() {
		if (!BROWSER.PC.isIE()) {

			document.addEventListener("fullscreenchange", function () {
				localSynap.fullScreenMode = document.fullscreen;
			    if (localSynap.fullScreenMode) {
                    localSynap.goFullScreen();
                } else {
                    localSynap.exitFullScreen();
                }
			}, false);
			document.addEventListener("mozfullscreenchange", function () {
				localSynap.fullScreenMode = document.mozFullScreen;
				if (localSynap.fullScreenMode) {
                    localSynap.goFullScreen();
                } else {
                    localSynap.exitFullScreen();
                }
			}, false);
			document.addEventListener("webkitfullscreenchange", function () {
				localSynap.fullScreenMode = document.webkitIsFullScreen;
				if (localSynap.fullScreenMode) {
                    localSynap.goFullScreen();
                } else {
                    localSynap.exitFullScreen();
                }
			}, false);
		}
	});
}
/** 데스크탑용 FullScreen 관련 끝 **/
function setFullScreenClick(){
	if( BROWSER.isMobile() ){
	}else{
		var showFullScreen = function () {
				$('#documentScale').removeClass('normalScaleTop').addClass('fullscreenScaleTop');
				$('#container').css('top', 0).css('bottom', 0);
		};
		var closeFullScreen = function () {
				containerSizeAdjust();
				$('#documentScale').removeClass('fullscreenScaleTop').addClass('normalScaleTop');
				localSynap.thumbnailScrollPositionFix && localSynap.thumbnailScrollPositionFix();
		};
		if (!BROWSER.PC.isIE()) {
			document.addEventListener("fullscreenchange", function () {
				if (document.fullscreenElement != null) {
					showFullScreen();
				} else {
					closeFullScreen();
				}
				$(window).resize();
			});
		}
		$('#fullScreenBtn').on('click', function () {
            var docElm = top.document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen(); 
			} else {
				localSynap.fullScreenMode = true;
				$('.normalScreenOnly').hide();
				$('.fullScreenOnly').show();
				showFullScreen();
				$(window).resize();
			}
        });
		$(document).delegate('#exitFullScreenBtn', 'click', function () {
			var docElm = document;
			if (docElm.cancelFullScreen) {
				docElm.cancelFullScreen();
			} else if (docElm.mozCancelFullScreen) {
				docElm.mozCancelFullScreen();
			} else if (docElm.webkitCancelFullScreen) {
				docElm.webkitCancelFullScreen();
			} else if (docElm.msExitFullscreen) {
				docElm.msExitFullscreen();
			} else {
				localSynap.fullScreenMode = false;
				$('.fullScreenOnly').hide();
				$('.normalScreenOnly').show();
				closeFullScreen();
				$(window).resize();
			}
		}); 
		
		
		$('.exitscreen img').on('mouseover', function(){
			$(this).removeClass('mouseOut').addClass('mouseOn');
		}).on('mouseout', function(){
			$(this).removeClass('mouseOn').addClass('mouseOut');
		}).addClass('mouseOut');
	}
}
/** FullScreen 관련 끝 **/

function containerSizeAdjust(){
	$('#container').css('top', getHeaderHeight() + 'px').css('bottom', getFooterHeight() + 'px');
	if( $('#container').height() === 0 ){		// bottom : 0 style이 적용되지 않는 경우 (ex Android kitkat webview)
		$('#container').height( window.innerHeight - getHeaderHeight() );
		fn = window.onresize;
		window.onresize = function(){
			fn();
			$('#container').height( window.innerHeight - getHeaderHeight() );
		}
	}
}

function getInnerHeight() {
	var h;
	if (BROWSER.MOBILE.isAndroid()){
		h = screen.height;
	}else{
		h = window.innerHeight;
	}	
	return h;
}

/*window.onbeforeunload = function(e){
	if (typeof localSynap.jobId != "undefined" && typeof localSyanp.properties.contextPath != "undefined" ) {
		var url = localSyanp.properties.contextPath +'/status/close';
		$.ajax({
			type: 'GET',
			async: true,
			url: url,
			dataType: 'xml',
			success: function(xmlDoc){
			},
			error: function(error){
			}
		});
	}
}*/


var zoomSlideManager = function () {
	var member = {
		btnHeight: undefined,
		tabRange: undefined,
		$slideBar: undefined,
		$scaleTag: undefined,

        ratioManager: undefined,
        createButtons: function () {
            if (member.ratioManager === undefined
                || member.tabRange === undefined
                || member.$slideBar === undefined) {
                console.error("zoom button creation error");
                return false;
            }
            for (var idx = 0; idx < member.ratioManager.getRatioCnt(); ++idx) {
                var topVal = (member.ratioManager.getRatioCnt() - 1 - idx) * member.tabRange + 10;
                var $scaleBtn = $("<a href='#' class='bar' style='top:"+ topVal +"px;'"
                                  + " title='"+ member.ratioManager.getValueOfZoom(idx) * 100+"%' />");
                $scaleBtn.click({
                    scaleIdx: idx
                }, localSynap.eventScaleClick);
                member.$slideBar.append($scaleBtn);
            }
            member.$scaleBtns = member.$slideBar.children("a");
            return true;
        },
        // 버튼사이의 value값에 대한 적절한 오프셋값을 찾는다.
        // 리턴값 : maxIdx, innerOffset
        getProperOffset: function (value) {
            for (var i = 0; i < member.ratioManager.getRatioCnt(); ++i) {
                var times = member.ratioManager.getValueOfZoom(i) * 100;
                if (value <= times) {
                    var maxIdx = i;
                    var maxVal = times;
                    break;
                }
            }
            // 최대 선택가능한 배율값과 입력된 배율값의 차이
            var gapVal = maxVal - value;
            if (maxIdx == 0 || maxIdx == member.ratioManager.getRatioCnt() - 1) {
                gapVal = 0;
            }
            // 배율버튼 상한값
            var upperBound = member.ratioManager.getValueOfZoom(maxIdx) * 100;

            // 배율버튼 하한값
            if (maxIdx <= 0) {
                var lowerBound = member.ratioManager.getValueOfZoom(maxIdx-1) * 100;                    
            } else {
                var lowerBound = member.ratioManager.getValueOfZoom(0) * 100;
            }
            // 버튼사이에서 배율값이 비례적으로 위치하게 계산한다.
            var innerOffset = member.tabRange * gapVal / (upperBound - lowerBound);
            return {
                maxIdx: maxIdx,
                innerOffset: innerOffset
            };
        }
	}
	var manager = {
        /* 스케일바 초기화함수
           ratioManager: 비율관리자(ratioManager 인스턴스)
           $slideBar: 스케일바 jquery객체
           $scaleTag: 스케일바 현재배율 표시태그 jquery객체
        */
		init: function (ratioManager, $slideBar, $scaleTag) {
			member.$slideBar = $slideBar || $("#documentScale");
            member.$scaleTag = $scaleTag || $("#scaleValueTag");
            member.ratioManager = ratioManager || RATIO_NUMBERS;
            if (member.$slideBar == undefined
                || member.$scaleTag == undefined
                || member.ratioManager == undefined) {
                console.error("zoom init params error");
            }
            
			// FIXME: 버튼 높이를 구해야 한다. 여기서는 렌더링 전이라 높이값이 0이다. 어떻게 구하지?
			member.btnHeight = 6;
            member.barHeight = member.$slideBar.height() - 20 - member.btnHeight;  // 20은 실제bar의 offset높이
			member.tabRange = parseInt(member.barHeight / (member.ratioManager.getRatioCnt() - 1));
            if (!member.createButtons()) return false;
            
            var curIndex = member.ratioManager.getCurrentIndex();
            this.moveButtonTo(curIndex);
            
			// [PRJAM-5346] 탭커서가 줌슬라이더에 있을 때, 엔터를 입력하면 아이콘이 어디론가 날아가버리므로, 사용하는 키 외에는 막는다.
			$(document).delegate('.bar', 'keydown', function (event) {
				if (event.keyCode == 9) { // 탭은 허용
				} else {
					// 이외의 키는 모두 막는다.
					event.preventDefault();
				}
			});
		},
		// zoomIndex를 입력받고, 버튼 이동과 관련된 연산을 수행한다.
		moveButtonTo: function (scaleIdx) {
            this.moveScaleTag(scaleIdx);
            this.setTagText(member.ratioManager.getValueOfZoom(scaleIdx) * 100);
            this.setScaleButtonOn(scaleIdx);
		},
		getBarOffsetTop: function () {
			return member.$slideBar.offset().top;
		},
		getBarHeight: function () {
			return member.$slideBar.height();
		},
		getTabRange: function () {
			return member.tabRange;
		},
        // scale텍스트를 수정한다.
        setTagText: function (value) {
            member.$scaleTag.text(value + "%");
        },
        // scale버튼 모양을 모두 비활성화 한다.
        setScaleButtonsOff: function () {
            member.$scaleBtns.removeClass("on");
        },
        // scale버튼모양을 활성화한다.
        setScaleButtonOn: function (index) {
            this.setScaleButtonsOff();
            $(member.$scaleBtns[index]).addClass("on");
        },
        setScaleButtonFreely: function (value) {
            $('#fitScaleBtn').remove();
            var btn = "<a class=\"bar on\" id=\"fitScaleBtn\" href=\"#\" title=\""+value+"%\" onclick=\"return false;\" />";
            member.$slideBar.append($(btn));
            member.$fitScaleBtn = $('#fitScaleBtn');
            this.moveScaleFreely(value, member.$fitScaleBtn);
        },
        removeFitScaleButton: function () {
            member.$fitScaleBtn.remove();
        },
        // target을 value값에 적절한 위치로 옮긴다.
        moveScaleFreely: function (value, $target) {
            // 원본이 화면보다 작을 경우, 원본크기를 반환한다.
            if (value > 100) {
                value = 100;
            }
            var maxVal = member.ratioManager.getValueOfZoom(0) * 100;
			var maxIdx = 0;
            if (value < maxVal) {
                maxIdx = 0;
                innerOffset = 0;
            } else if (value > member.ratioManager.getValueOfZoom(member.ratioManager.getRatioCnt()-1)*100) {
                maxIdx = member.ratioManager.getRatioCnt()-1;
                innerOffset = 0;
            } else {
                ret = member.getProperOffset(value);
                maxIdx = ret.maxIdx;
                innerOffset = ret.innerOffset;
            }
            // 전체 오프셋
            // 3은 버튼위치를 정확하게 하기 위한 값(버튼높이의 1/2)
            var tagOffset = member.$slideBar.offset().top - $target.height()/2 + 3
                + member.$scaleBtns[maxIdx].offsetTop + innerOffset;
            
	        $target.offset({top:tagOffset});
        },
        // scale태그를 해당인덱스로 이동한다. 인덱스는 ratioManager의 인덱스를 따른다.
        moveScaleTag: function (index) {
			var btnOffsetTop = member.$slideBar.offset().top - 6
                + member.$scaleBtns[index].offsetTop;
			member.$scaleTag.offset({top:btnOffsetTop});
        },
        // scale태그를 값을 업데이트하고, 값에 따라 자유롭게 이동한다.
        moveScaleTagFreely: function (value) {
            this.moveScaleFreely(value, member.$scaleTag);
        }
	}
	return manager;
}


var screenFitManager = function () {
    var member = {
        fitMode: false,
        $fitBtn: undefined,
        ratioToScreen: undefined,
        ratioMng: undefined,
        originHeight: undefined
    };

    var fitModule = {
        // 초기화 함수
        // ratioManager : 비율매니저 인스턴스
        // targetFrame : 본문 표시 영역 jQuery Object (ex. $("#contents"))
        // originHeight : 원본페이지의 세로높이
        init: function (ratioManager, $fitBtn, targetFrame, originHeight) {
            member.originHeight = originHeight;
            member.targetFrame = targetFrame;
            member.ratioMng = ratioManager;
            member.$fitBtn = $fitBtn;
            member.ratioToScreen = member.targetFrame.height() / member.originHeight;
            if (originHeight <= 0) {
                console.error("FitModule init failed.");
            }
        },
        // 원본대비 화면맞춤 비율을 가져온다.
        getRatioToScreen: function () {
            if (!member.ratioToScreen) {
                console.error("FitModule not initialized");
            }
            return member.ratioToScreen ;
        },
        // 쪽맞춤버튼을 활성화/비활성화 한다.
        setFitButtonOn: function (value) {
            if (value) {
                member.$fitBtn.addClass("on");
            } else {
                member.$fitBtn.removeClass("on");
            }
        },
        // 쪽맞춤을 활성화시킨다.
        // callback함수를 받아, 후처리를 수행한다.
        fitOn: function (callback) {
            member.ratioToScreen = member.targetFrame.height() / member.originHeight;
            member.fitMode = true;
            callback && callback(this.getRatioToScreen());
        },
        // 쪽맞춤 비활성화 상태로 셋팅한다.
        fitOff: function () {
            member.fitMode = false;
        },
        // 쪽맞춤모드 확인용
        isFitMode: function () {
            return member.fitMode;
        }
    };

    return fitModule;
}

var ratioManager = function (){
	var member = {
		// 배율에 대한 비례값 (변환서버용)
		standardRatio: 1,
		numbers : [0.25, 0.5, 1, 1.5, 2],
		// numbers 의 인덱스. 시작
		curIndex : 1		
	}

	var manager = {
		increaseRatio : function(){
			if (0 <= member.curIndex && member.curIndex < (member.numbers.length-1)) {
				++member.curIndex;
			}
		    return member.numbers[member.curIndex];
		},
		reduceRatio : function() {
			if (0 < member.curIndex && member.curIndex <= (member.numbers.length-1)) {
				--member.curIndex;
			}
    		return member.numbers[member.curIndex];
		},
		setRatioIndex : function(_ratio) {
			for (var i=0; i<member.numbers.length; i++) {
				if (member.numbers[i] == _ratio) {
					member.curIndex = i;
					break;
				}
			}
		},
		setStandardRatio : function (value) {
			member.standardRatio = value;
		},
		getRatioForText : function () {
			return member.numbers[member.curIndex] * member.standardRatio;
		},
		getRatio : function () {
            return member.numbers[member.curIndex];
		},
        // 변경할 비율을 셋팅한다.
        setTargetRatio : function (value) {
            member.targetRatio = value;
        },
        // 변경할 비율을 가져온다.
        getTargetRatio : function () {
            // 모바일은 배율변경이 없으므로, 무조건 1로 한다.
            if (BROWSER.isMobile()) {
                return 1;
            }
            return member.targetRatio || this.getRatio();
        },
		getValueOfZoom : function (index) {
			if (index >= member.numbers.length) {
				value = member.numbers[member.numbers.length-1];
			} else if (index < 0) {
				value = member.numbers[0];
			} else {
				value = member.numbers[index];
			}
			return value;
		},
		getRatioCnt : function () {
			return member.numbers.length;
		},
		getCurrentIndex : function () {
			return member.curIndex;
		}
	}
	return manager;
};
// IE8이하에 없어서 구현한다
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0); i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}
