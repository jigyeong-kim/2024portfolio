console.log( 'image_skin.js' );

var enableZoomEvent = true;
var zoomRatioMobile = 1;
localSynap.getCurrentPage = function() {
	return 1;
}
localSynap.gotoHtmlPage = function(pageno) {

}

var	RATIO_NUMBERS = ratioManager();

var zoomSlider = zoomSlideManager();

var screenFit = screenFitManager();

localSynap = (function() {
	var member = {
        $image : undefined,
        $container : undefined,
        $contents : undefined,
        $innerWrap : undefined,
		originalWidth : 0,
		originalHeight : 0,
		orientation : 0	,	// 이미지가 지닌 회전 정보
		currentAngle : 0 	// 스킨에서 이미지 회전하는 현재 각도
	}

	var image = {

		sheetViewFrame : null,
		rawObj : null,

        eventScaleClick: function(e) {
			zoomSlider.setEventScaleClick(e, enableZoomEvent);
			image.resizeDesktop(RATIO_NUMBERS.getRatio());
			return false;
		},

		editZoomRatio: function(ratioToScreen) {
			// 쪽맞춤이 100%를 넘을 경우, 100%로 고정한다.
			if (ratioToScreen > 1) {
				ratioToScreen = 1;
			}
			// zoom을 활용하자
			RATIO_NUMBERS.setTargetRatio(ratioToScreen);

			zoomSlider.moveScaleTagFreely(parseInt(ratioToScreen*100));
			zoomSlider.setScaleButtonFreely(parseInt(ratioToScreen*100));
			zoomSlider.setTagText(parseInt(ratioToScreen*100));
			zoomSlider.setScaleButtonsOff();
		},

		screenFitOn: function(screenFitClick) {
			// 이미지 회전에 따라, 쪽맞춤을 위한 높이가 달라진다.
			var height = member.originalHeight;
			var width = member.originalWidth;
			if ( member.currentAngle == 90 || member.currentAngle == 270 ) {
				height = member.originalWidth;
				width = member.originalHeight;
			}

			// 쪽맞춤을 수행하는 경우
			// case 1 : 쪽맞춤 버튼 클릭 screenFitClick == true;
			// case 2 : 이미지 회전 중 이미지가 커서 쪽맞춤으로 줄이는 경우. 
			// 회전 이전 상태가 쪽맞춤(확대/축소 안한 경우)일때만 쪽맞춤한 상태로 회전된 이미지를 그리고, 확대/축소한 경우에는 비율은 그대로 회전한다.
			if ( screenFitClick 
				|| (RATIO_NUMBERS.getTargetRatio() == member.$container.height()/width) ) {
				screenFit.setOriginHeight(height);

				screenFit.fitOn(function (ratioToScreen) {
					// 마지막 배율이 그대로라면 아무것도 하지 않는다.
					if (screenFit.isFitMode()
						&& RATIO_NUMBERS.getTargetRatio() == ratioToScreen) {
						return false;
					}
					image.editZoomRatio(ratioToScreen);
				});
			}
		},

		isIOSAutoRotation: function() {
			return BROWSER.MOBILE.isIOS() && (member.orientation == 90 || member.orientation == 270);
		},

		skinReadyFunc: function() {
			member.$image = $("#image");
			member.$contents = $("#contents");
            member.$container = $("#container");
            member.$innerWrap = $("#innerWrap");

			if(localSynap.properties.isRenderServer === true && localSynap.isImageMode() === true) {
				getImageSize(localSynap.jobId, 0, 30, image.successCallback);
				member.originalWidth = image.rawObj.w;
				member.originalHeight = image.rawObj.h;
				member.$image.attr('src', localSynap.properties.contextPath + image.rawObj.path);
			}
			else {
				var imageDir = $(localSynap.properties.xmlObj).find('path_image').text();
				member.$image.attr('src', localSynap.getResultDir() + imageDir);

				var angle = parseInt($(localSynap.properties.xmlObj).find('orientation').text());
				member.orientation = angle;
				member.currentAngle = angle;
				member.originalWidth = $(localSynap.properties.xmlObj).find('width').text();
				member.originalHeight = $(localSynap.properties.xmlObj).find('height').text();

				// ios에서 이미지가 각도를 가지는 경우, 자동으로 회전하는 것으로 고려하기 위함
				if(image.isIOSAutoRotation()){
					member.currentAngle = 0;
					member.originalWidth = $(localSynap.properties.xmlObj).find('height').text();
					member.originalHeight = $(localSynap.properties.xmlObj).find('width').text();
				}
			}
			var max_width = member.originalWidth + 'px';
			if (!localSynap.isAllowCopy()) {
				stopBrowserEvent(document.body);
				var innerWrap = document.getElementById('innerWrap');
				if(innerWrap) {
					stopBrowserEvent(innerWrap);
				}
			}

			if( BROWSER.isMobile() ){
				image.skinReadyMobileFunc();
				var ratio = 1;
			}else{
				// WARN: src가 완료되어있지 않으면 아래에서 에러가 발생할 수 있다.
				image.skinReadyDesktopFunc();
				zoomSlider.init(RATIO_NUMBERS, $('#documentScale'), $('#scaleValueTag'));
                screenFit.init(RATIO_NUMBERS, $('.documentTool a'), member.$container, member.originalHeight);

				image.editZoomRatio(screenFit.getRatioToScreen());
				screenFit.fitOn();

				//IE9이하일 경우 javascript resize작동에 문제가 있어 수정
				if(BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9) {
					$('#headTitle').width(50);
					$('#headTitle').css('overflow','visible');
				}
			}
			setSnsButton(localSynap.properties.useSharedSns);
			containerSizeAdjust();
			setFullScreenClick();

			if(!BROWSER.MOBILE.isIOS() && member.orientation != 0) {
				image.translateImg();
				// 이미지가 각도를 가지고 있어서 로딩 도중 회전하는 경우, IE 8,9에서는 vml객체에 회전을 위한 속성값 설정이 필요 
				if (BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9) {
					image.checkIERotation();
				}
			}

			if (BROWSER.isMobile()) {
				image.resizeMobile();
				window.onresize = image.resizeMobile;
			} else {
				image.screenFitOn(false);
				image.resizeDesktop(RATIO_NUMBERS.getTargetRatio());

				// TODO:resizeDesktop에 인자를 넘겨주어야 한다.
				window.onresize = image.resizeDesktop;
			}

			window.onscroll = function(e){
				localSynap.onScroll && localSynap.onScroll(e);
			}
			localSynap.onLoadedBody && localSynap.onLoadedBody();

			if (localSynap.isUseRotateImg()){
				$('a.rotateClockwise').css('display', 'inline');
				$('a.rotateClockwise').on('click', function (e) {
					image.rotateImg(90);
					if (BROWSER.isMobile()){
						image.resizeMobile();
					}else {
						image.screenFitOn(false);
						image.resizeDesktop(RATIO_NUMBERS.getTargetRatio());
					}
				});
			}
		},

		skinReadyDesktopFunc: function() {
			member.$innerWrap.attr('style', 'overflow:auto;position:relative;margin:auto;vertical-align:middle;');
			member.$contents.attr('style', 'margin:auto; top:0; left:0; bottom: 0; right:0; overflow:hidden;' );
			member.$image.attr('style', 'position:absolute;');

			docKeyboardControl();
			if (localSynap.properties.isRenderServer == true) {
				setDownloadButton(localSynap.downloadUrl);
			} else {
				setDownloadButton(localSynap.properties.xmlObj);
			}
			setPrintButton();

            $('a.fit').on('click', function (e) {
                image.screenFitOn(true);
                image.resizeDesktop(RATIO_NUMBERS.getTargetRatio());
            });

		},

		skinReadyMobileFunc: function() {
			initMobile();
			member.$container.attr('style', "text-align:center; -webkit-touch-scroll: touch");
			member.$innerWrap.attr('style', "display:inline-block; vertical-align:middle; height:100%;");
			member.$contents.attr('style', " margin:auto; position: absolute; top:0; left:0; bottom: 0; right:0; width:90%; overflow:hidden;");
			member.$image.attr('style', "position: absolute; ");

			if (!localSynap.isAllowCopy() && 
					(BROWSER.VERSION.isAndroidJellyBean() || (BROWSER.MOBILE.isIOS() && BROWSER.VERSION.IOS()<=7))){
				var img = document.getElementById('image');
				if(img) {
					stopBrowserEvent(img);
					img.onload = function() {
						var src = img.getAttribute('src');
						img.removeAttribute('alt', '');
						img.removeAttribute('src', '');
						img.setAttribute('style', img.getAttribute('style') + 'background-image:url(' + src + ');background-size: 100%; background-repeat: no-repeat;');
					}
				}
			}
		},
		// 이미지의 회전 상태를 고려한 너비/높이값과 회전 중심을 맞추기 위한 top,left 값을 계산하여 설정한다. 인자로 회전된 width와 height 값이 전달된다.
		setImgProperty: function(width, height, zoomRatio){
			var rotated = member.currentAngle == 90 || member.currentAngle == 270;
			var imgWidth = width * zoomRatio;
			var imgHeight = height * zoomRatio;
			
			// member.$content는 회전 후 이미지의 너비/높이를 가지고, member.$image는 회전 전 이미지의 너비/높이를 가진다.
			member.$contents.css('width', imgWidth).css('height', imgHeight);
			if (rotated){
				$("#image").css('width', imgHeight).css('height', imgWidth);
			}else{
				$("#image").css('width', imgWidth).css('height', imgHeight);
			}

			var offsetTop = 0;
			var offsetLeft = 0;	
			if (rotated) {
				// div(member.$content)로 img(member.$image)를 감싸면서 회전 중심이 달라지기 때문에 계산으로 위치를 설정해야한다.
				offsetTop = (height-width) * zoomRatio/2;
				offsetLeft = (width-height) * zoomRatio/2;
			}

			if (!BROWSER.isMobile() && BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9) { 
				// Desktop IE 8,9 에서는 vml객체에 회전 중심 offset과 너비/높이 값을 설정한다. 
				var vml = $("#image").children()[0];
				if (vml) {
					if (rotated){
						vml.style.width = imgHeight;
						vml.style.height = imgWidth;
					}else{
						vml.style.width = imgWidth;
						vml.style.height = imgHeight;	
					}
					vml.style.top = offsetTop; 
					vml.style.left = offsetLeft;
				}
			}else{
				$("#image").css('top', offsetTop).css('left', offsetLeft);
			}
		},
		resizeMobile: function(){
			setResizeHeaderTitle();

			var rotated = member.currentAngle == 90 || member.currentAngle == 270;
			var ww = member.$container.width() * 0.9;
			var wh = member.$container.height() * 0.9;

			var rotatedWidth = 0;
			var rotatedHeight = 0;
			if (rotated){
				rotatedWidth = member.originalHeight;
				rotatedHeight = member.originalWidth;
			}else{
				rotatedWidth = member.originalWidth;
				rotatedHeight = member.originalHeight;
			}

			var imgHeight = 0;
			var imgWidth = 0 ;
			var fixWidth = rotatedWidth < ww ? rotatedWidth : ww;
			var fixHeight = rotatedHeight < wh ? rotatedHeight : wh;

			if( ww / wh < rotatedWidth/rotatedHeight ){ // 800 / 600 > 1000 / 600  // 폭맞춤 
				imgHeight = Math.ceil(rotatedHeight * (fixWidth / rotatedWidth) * zoomRatioMobile);
				imgWidth = fixWidth * zoomRatioMobile;
				member.$innerWrap.css('width', imgWidth + 5).css('min-height', imgHeight).css('min-width', '');
			}
			else{ // 쪽맞춤
				imgHeight = fixHeight * zoomRatioMobile;
				imgWidth = Math.ceil(rotatedWidth * (fixHeight / rotatedHeight)) * zoomRatioMobile + 5;
				member.$innerWrap.css('min-height', imgHeight).css('min-width', imgWidth);
			}

			// ios 웹 브라우저의 특이케이스 : 90 혹은 270 각도를 가지며 원본 이미지의 높이가 너비보다 큰 경우, 브라우저에서 자동회전하면서 이미지에 설정된 크기보다 이미지가 줄어서 나타난다.
			// 자동 회전하면서 회전된 이미지 높이를 'h' 회전된 이미지 너비 'w'로 표현할 때,
			// 회전된 이미지 영역의 높이가 1라면, 실제 이미지 높이가 h/w 만큼 줄어들고 남은 영역은 여백으로 나타난다.
			// 줄어드는 비율로 이미지가 원래 영역에 맞춰지기 위해 필요한 크기를 계산하여 설정하고, 그 상태에서 회전할 때 위치도 조정한다.
			if (image.isIOSAutoRotation() && member.originalWidth > member.originalHeight){ 
				// ios이고 이미지 각도가 90 or 270이면 originalWidth와 originalHeieght을 최초 변수값 설정 시 부터 미리 바꿔서 설정하므로, "원본 이미지 높이 > 원본 이미지 너비" 를 다음과 같이 표현한다

				member.$contents.css('width', imgWidth).css('height', imgHeight);
				if (rotated){
					member.$image.css('width', imgWidth*rotatedHeight/rotatedWidth).css('height', imgHeight);
				}else{
					member.$image.css('width', imgWidth).css('height', imgHeight*rotatedWidth/rotatedHeight);
				}

				member.$image.css('top', 0).css('left', 0);
				if (member.currentAngle == 90){
					member.$image.css('left', imgWidth-imgHeight);
				}else if(member.currentAngle == 180){
					member.$image.css('top', imgHeight-imgWidth);
				}
			}
			else{
				image.setImgProperty(imgWidth, imgHeight, zoomRatioMobile);
			}
		},
		resizeDesktop: function(zoomRatio){
			if( typeof(zoomRatio) === 'object' ) {			// 전체화면
				zoomRatio = RATIO_NUMBERS.getTargetRatio();
			} else if( typeof(zoomRatio) === 'number' ) {	// 일반화면
				zoomRatio = zoomRatio;
			} else {
				zoomRatio = screenFit.getRatioToScreen();
			}
			setResizeHeaderTitle();

			var rotated = member.currentAngle == 90 || member.currentAngle == 270;
			var rotatedWidth = 0;
			var rotatedHeight = 0;

			if (rotated){
				rotatedWidth = member.originalHeight;
				rotatedHeight = member.originalWidth;
			}else{
				rotatedWidth = member.originalWidth;
				rotatedHeight = member.originalHeight;
			}
			image.setImgProperty(rotatedWidth, rotatedHeight, zoomRatio);

			member.$innerWrap.css('height', member.$container.height())
				.css('width', member.$container.width());

			// 회전된 이미지 높이와 스킨 본문 영역의 높이를 비교하여, zoom 상태일 때를 고려한다.
			if (rotatedHeight * zoomRatio > member.$container.height()) {
				member.$contents.css("position", "relative");
			} else {
				member.$contents.css("position", "absolute");
			}
		},
		// 현재 IE 8,9 전용으로 사용됨. vml객체가 로딩된 후에야 회전 관련 속성값을 설정할 수 있다. 따라서 setinterval로 로딩시점 찾는다. 
		checkIERotation : function(){
			var count = 0;
			var timer = setInterval(function(){
				var result = image.setRotationCenter();
				if (result || count == 10){ // 10회 정도 시도한 후에 안되면 취소
					clearInterval(timer);
				}else{
					count++;
				}
			},300);
		},
		// 현재 IE 8,9 전용으로 사용됨. IE8,9 에서는 vml을 통해서 회전 중심 offset과 너비/높이 값을 설정한다. 
		setRotationCenter : function(){
			var vml = $("#image").children()[0];
			if (!vml) {
				return false;
			}

			var zoomRatio = RATIO_NUMBERS.getTargetRatio();
			vml.style.height = member.originalHeight * zoomRatio;
			vml.style.width = member.originalWidth * zoomRatio;

			if (member.currentAngle != 180){
				// 이미지를 div로 감싸면서 회전 중심이 달라지기 때문에, offset 값을 셋팅 한다.
				vml.style.top = (member.originalWidth-member.originalHeight) * zoomRatio/2;
				vml.style.left = (member.originalHeight-member.originalWidth) * zoomRatio/2;
			}
			return true;
		},
		// jpg orientation 정보가 member.orientation로 전달된다. 
		// 1(0도),3(180도),6(270도),8(90도)값은 각도 값으로 변경되어 translateImg을 통해 회전된 이미지를 지원한다.
		// 2,4,5,7 flip하는 값들은 0으로 설정되어, flip+회전된 이미지를 지원하지 않는다.
		translateImg: function() {
			var img = $("#image");
			switch(member.orientation) {
				case 180: // PI rotation
					img.rotate(180);
					break;
				case 270: // -PI/2 rotation
					img.rotate(90);
					break;
				case 90: // PI/2 rotation
					img.rotate(270);
					break;
				default:
			}
		},
		rotateImg: function(changeAngle) {
			var angle = (member.currentAngle+changeAngle) % 360;

			$("#image").rotate(angle);
			member.currentAngle = angle;
		},
		successCallback: function(key, data) {
			var obj = {
				index: 0,
				path: "",
				w: 0,
				h: 0
			};
			obj = {
				index: data[0].p,
				path: '/thumbnail/'+key+'/'+ data[0].p,
				w: data[0].w,
				h: data[0].h
			};
			if (typeof localSynap.originHeight === "undefined") {
				localSynap.originHeight = obj.h;
			}
			image.rawObj = obj;
		},
	}
	return $.extend(localSynap, image);
})();
;
// SKIN READY FUNC
$(document).ready(function() {
	if (typeof localSynap.skinReadyFunc == "function") {
		localSynap.skinReadyFunc();
	}
	else{
		alert('Error!');
	}
});