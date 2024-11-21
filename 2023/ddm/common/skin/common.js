
// common.js
if(!window.console) {
window.console = {};
window.console.log = function(str) {};
window.console.dir = function(str) {};
}

// static variable
var preventKeydown = false;

// LocalSynap
function initLocalSynap() {
	return {
		properties: {
			allowCopy : true, // 복사 방지를 하고 싶을때 false로 설정
			allowResize : true, // 슬라이드의 크기 고정하고 싶을때 false로 설정
			allowPrint : false, // 인쇄 버튼을 추가할때 false로 설정
			isRenderServer : false, // 변환서버가 있는지 여부
			thumbnailWidth : 150, // 썸네일 크기
			mobileSlideSkinViewSetting : "multi", // 모바일기기에서 슬라이드 출력방식(single : 한 페이지씩 보기, multi : 모아보기)
			useMobileTextSearch : false, // 모바일기기 텍스트 검색 (활성화 시 스킨 성능 감소)
			usePdfText : true, // PDF텍스트 출력 여부
			webAccessibility : true, // 웹접근성 향상(PDF이미지텍스트 읽기지원용)
			useLoadingSpinner : false,
			entireWithPartialConv : false, // 부분변환으로 전체페이지를 출력할 경우 사용 : PDF/SLIDE서버 지원용
			mobileSkinHeaderHide : false, // 모바일 스킨 헤더를 사라지게 하고 싶을때
			mobileSkinHeaderTimeout : 5000, // 모바일 스킨 헤더의 타임아웃
			mobileSkinImgPageFit : true, // 모바일 스킨 이미지방식에서 가로모드일때 쪽맞춤
			useSharedSns : false,	//공유기능 사용 여부를 지정할때 true or false
			kakaoAPIKey : undefined, //공유기능에서 모바일 카카오톡api키 설정 ex)'abcdefghijklmn12021'
			kakaoScript : 'https://developers.kakao.com/sdk/js/kakao.min.js',
			preventPrint : false,	// 인쇄방지 기능 설정 
			useRotateImg : false,	// 이미지스킨에서 이미지 포맷 회전 기능 설정
			title : undefined,
			fileType : undefined,
			fileName: undefined,
			xmlObj : undefined,
			xmlUrl : undefined,
			resultDir : undefined,
			// 동적변환(PDF/SLIDE) 서버 지원용 환경변수 사용방법:
			// ex) http://localhost/hcvServer/sample.pdf/3
			//  basePath : 베이스URI. 예시에서는 "/hcvServer/"로 설정 
			//  requestContext : 이미지요청 포맷. ${id}, ${pageNum} 필수 삽입.
			//				   예시에서는 ${id}가 "sample.pdf"에, ${pageNum}이 3 에 해당함.
			//  partConvCnt : 변환서버에 요청하는 페이지 단위(기본값:10)
			basePath : "/sn3hcvServer/",
			requestContext : "${id}/${pageNum}",
			partConvCnt : 10,

			layout: "withpage",
			debug : true
		},

		topS: 0,
		rightS: 0,
		bottomS: 0,
		leftS: 0,
		isAllowCopy: function() {
			return this.properties.allowCopy;
		},

		isAllowResize: function() {
			return this.properties.allowResize;
		},

		getFileName: function() {
			return this.properties.fileName;
		},

		getFileType: function() {
			return this.properties.fileType;
		},

		getResultDir: function() {
			return this.properties.resultDir;
		},

		getBasePath: function() {
			return this.properties.basePath;
		},
		isSingleLayout: function() {
			if (localSynap.properties.layout==="single"){
				return true;
			}
			return false;
		},

		isSlide: function(){
			if (localSynap.properties.fileType==="ppt" || localSynap.properties.fileType==="pptx"){
				return true;
			}
			return false;
		},
		isImageMode: function() {
			if ( typeof localSynap.status !== "undefined" && localSynap.status.convertType === 1) {
				return true;
			} else {
				return false;
			}
		},
		getMobileHeaderNotice: function() {
			return "여기를 클릭하면 상단메뉴가 나옵니다.";
		},
		isMobileSkinImgPageFit: function() {
			return localSynap.properties.mobileSkinImgPageFit;
		},
		isUseRotateImg: function() {
			return this.properties.useRotateImg;
		}
	};
}

var modalManager = {
	createModal : function() {
		var prevHeader = document.getElementById("modalHeader");
		var prevBack = document.getElementById("modalBack");
		var prevModal = document.getElementById('modal');
		if(prevHeader || prevBack || prevModal) {
			modalManager.removeModal();
		}
		var wrapTag = document.getElementById('wrap');
		if(wrapTag === null) {
			wrapTag = document.getElementsByTagName('body')[0];
		}
		var headerTag = document.createElement('div');
		headerTag.id = 'modalHeader';
		wrapTag.appendChild(headerTag);

		var modalBack = document.createElement('div');
		modalBack.id = 'modalBack';
		wrapTag.appendChild(modalBack);
	},
	removeModal : function() {
		var wrapTag = document.getElementById('wrap');
		if(wrapTag === null) {
			wrapTag = document.getElementsByTagName('body')[0];
		}
		var modalHeader = document.getElementById('modalHeader');
		var modalBack = document.getElementById('modalBack');
		var modal = document.getElementById('modal');
		if(modalHeader) {
			wrapTag.removeChild(modalHeader);
		}
		if(modalBack) {
			wrapTag.removeChild(modalBack);
		}
		if(modal) {
			wrapTag.removeChild(modal);
		}
	},
	setContents : function(modal_cb, content_cb) {
		var modal;
	
		//modal창의 배경 호출
		if(modal_cb) {
			modal = modal_cb();
		}
	
		if(modal_cb === undefined || modal === undefined){
			//배경에 대한 레이아웃이 없을 경우 배경에 대한 div 태그를 만들어 준다.
			modal = document.createElement('div');
			modal.id = 'modal';
			var topMargin = 40;
			modal.style.height = ($(window).height() - $("#modalHeader").height() - topMargin)+'px';
			var wrapTag = document.getElementById('wrap');
			if(wrapTag === null) {
				wrapTag = document.getElementsByTagName('body')[0];
			}
			wrapTag.appendChild(modal);
		}

		//modal content layout 생성
		var modalContent = document.createElement('div');
		modalContent.className = 'popup popupM';
		modalContent.id = 'modalContent';
		modal.appendChild(modalContent);
	
		//modal창의 내용물 호출
		content_cb && content_cb(modalContent);
	},
	modalErrMsg : function(errMsg) {
		modalManager.createModal();
        modalManager.setContents(undefined, function(modalContent) {
        var pTag = document.createElement('p');
        	modalContent.appendChild(pTag);
        	pTag.id = 'h1Tag';
        	var pTagText = document.createTextNode(errMsg);
        	pTag.appendChild(pTagText);
        });
	}
}

// for view Ctrl NameSpace
function getSynapPageObject() {
	var obj = window;
	while(!(obj.localSynap) && obj != window.top) {
		try {
			if (obj.parent.localSynap) {}
		} catch(e) {
			return initLocalSynap();
		}
		obj = obj.parent;
	}
	if (obj.localSynap) {
		return obj.localSynap;
	}
	else {
		return initLocalSynap();
	}
}

var localSynap = getSynapPageObject();

// localSynap에서 설정하는 변수
// layout
// fileType

// 복사방지 스크립트 Start
function stopDefaultEvent(sEvent, el, fn) {
	if (el.addEventListener) {
		el.addEventListener(sEvent, fn);
	} else {
		if (el.attachEvent) {
			el.attachEvent("on" + sEvent, fn);
		}
	}
}

function stopEvent(e) {
	e = e || window.event;

	if (typeof e.preventDefault != "undefined") e.preventDefault();
	if (typeof e.stopPropagation != "undefined") e.stopPropagation();

	e.returnValue = false;
	return false;
}

function stopMobileTouchEvent(el) {
	if(typeof el.setAttribute != 'undefined' && el.tagName !== 'body') {
		el.setAttribute('style', el.getAttribute('style') + '-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);');
	}else if( typeof el.setAttribute != 'undefined' && el.tagName === 'body' ){
		el.setAttribute('style', el.getAttribute('style') + '-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);');
	}
}

function stopBrowserEvent(el) {
	stopDefaultEvent("selectstart", el, stopEvent);
	stopDefaultEvent("dragstart", el, stopEvent);
	stopDefaultEvent("contextmenu", el, stopEvent);
	// 모바일에서 필요한 이벤트 stopDefaultEvent("mousedown", el, stopEvent);	
	stopMobileTouchEvent(el);
}

// 복사방지 스크립트 End

// IMG ERROR
function image_error(obj) {
	obj.alt = 'Not suppported image format.';
	obj.title = 'Not suppported image format.';
	obj.style.visibility = 'hidden';
} 

// 슬라이드, pdf
function slideKeyboardControl(){
	document.onkeydown = function(event) {
		event = event || window.event;
		if (BROWSER.PC.isIE()) {
			keyCode = event.keyCode;
		} else {
			keyCode = event.which;
		}
		switch(keyCode) {
			case 37:case 38: case 33:
				if (!preventKeydown) 
					localSynap.movePrev();
				break;
			case 34: case 39: case 40:
				if (!preventKeydown) 
					localSynap.moveNext();
				break;
			case 36:
				localSynap.moveSlide(0);
				break;
			case 35:
				localSynap.moveSlide(localSynap.pageSize - 1);
				break;
		}
		if (typeof localSynap.onKeyDown==="function"){
			localSynap.onKeyDown(event);
		}
	};
}

// 슬라이드외의 포맷
function docKeyboardControl(){
	document.onkeydown = function(event) {
		event = event || window.event;
		if (BROWSER.PC.isIE()) {
			keyCode = event.keyCode;
		} else {
			keyCode = event.which;
		}
		if (typeof localSynap.onKeyDown==="function"){
			localSynap.onKeyDown(event);
		}
	};
}

function loadSpinner(targetId, pageClassName){
	$('.loading_spinner').remove();
		
	var opts = {
	  lines: 11 // The number of lines to draw
	, length: 0 // The length of each line
	, width: 12 // The line thickness
	, radius: 30 // The radius of the inner circle
	, scale: 1.25 // Scales overall size of the spinner
	, corners: 0.5 // Corner roundness (0..1)
	, color: '#435c85' // #rgb or #rrggbb or array of colors
	, opacity: 0.25 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 5 // Rounds per second
	, trail: 65 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	, className: 'spinner' // The CSS class to assign to the spinner
	, top: '50%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: false // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'absolute' // Element positioning
	}
	var target = document.createElement('div'); target.setAttribute('id', 'div_page'); target.setAttribute('class', 'inner loading_spinner ' + pageClassName);
	document.getElementById(targetId).appendChild(target);
	var spinner = new Spinner(opts).spin(target);
}

function removeSpinner(){
	$('.loading_spinner').remove();
}

// 문자열을 HTML특수문자로 변환해준다.
function encodeHTML(str) {
    var el = document.createElement("div");
    el.innerText = el.textContent = str;
    str = el.innerHTML;
    return str;
}

function getPtToPx(size_pt){
	return (size_pt * (96/72));
}

function getPxToPt(size_px){
	return (size_px * (72/96));
}

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

// convert array value to UTF8 String
function arrToString(arr) {
	if (!arr) {
		return arr;
	}
	var result = "";
	var c1, c2, c3, c4, shift;
	for (var i = 0; i < arr.length;) {
		c1 = arr[i++];
		shift = c1 >> 4;
		if (shift < 8) {
			result += String.fromCharCode(c1);
		} else if (shift == 12 || shift == 13) {
			c2 = arr[i++];
			result += String.fromCharCode(((c1 & 0x1F) << 6) | (c2 & 0x3F));
		} else if (shift == 14) {
			c2 = arr[i++];
			c3 = arr[i++];
			result += String.fromCharCode(
				((c1 & 0x0F) << 12) |
				((c2 & 0x3F) << 6) |
				((c3 & 0x3F) << 0)
			);
		} else if(shift == 15){ // surrogate 
			c2 = arr[i++];
			c3 = arr[i++];
			c4 = arr[i++];
			result += String.fromCodePoint(
				((c1 & 0x07) << 18) |
				((c2 & 0x3F) << 12) |
				((c3 & 0x3F) << 6) |
				(c4 & 0x3F)
			);
		}
	}
	return result;
}

localSynap.preventPrint = function preventPrint() {
	if (localSynap.properties.preventPrint === true) {	
		
		var head = document.getElementsByTagName('head')[0];

		if (head != null){
			var style_tag = document.createElement('style');
			style_tag.type = 'text/css';

			if (BROWSER.PC.isIE() && BROWSER.VERSION.IE()<=9) {
				style_tag.styleSheet.cssText = "@media print{ body { display:none; } }"
			}else {
				style_tag.textContent = "@media print{ body { display:none; } }"
			}
			head.appendChild(style_tag);
		}
	}
}

// 스킨 사용 유무에 상관 없이 인쇄방지 동작을 지원하기 위하여, 특이케이스로 common.js에서 함수를 호출하게 되었습니다.
// 왠만하면 common.js에서는 공통으로 사용되는 함수를 정의만하고, 다른 스크립트에서 호출하도록 합시다.   
$(document).ready(function(){
	localSynap.preventPrint();
});
	
// 유닛테스트용
if (typeof exports !== "undefined") {
    exports.localSynap = localSynap;
	exports.initLocalSynap = initLocalSynap;
	exports.modalManager = modalManager;
}
