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
		originalWidth : 0,
		originalHeight : 0
	}

	var image = {

		sheetViewFrame : null,

        // TODO: pdf스킨과 같은 코드를 사용하고 있다. 업데이트 시 같이 하거나, 코드를 합치자.
        /*
          스케일바 클릭 이벤트 핸들러
          scaleIdx: 스케일바에서 클릭한 인덱스
        */
        eventScaleClick: function(e) {
            var e = e || window.event;
            var zoomIndex = e.data.scaleIdx;
			if (!enableZoomEvent){
				return false;
			}
            zoomSlider.removeFitScaleButton();
            screenFit.fitOff();
            
			enableZoomEvent = false;
			var cur_ratio = RATIO_NUMBERS.getRatio();
			var base_ratio = cur_ratio;
			
			if (zoomIndex < 0) { 
				enableZoomEvent = true;
				return false; 
			}

			var new_ratio = RATIO_NUMBERS.getValueOfZoom(zoomIndex);
			zoomSlider.moveButtonTo(zoomIndex);

			while (cur_ratio != new_ratio) 
			{
				if (cur_ratio<new_ratio){
					cur_ratio = RATIO_NUMBERS.increaseRatio();
				}else if (cur_ratio>new_ratio){
					cur_ratio = RATIO_NUMBERS.reduceRatio();
				}
			}

            RATIO_NUMBERS.setTargetRatio(cur_ratio);
            image.resizeDesktop(cur_ratio);

			enableZoomEvent = true;
            return false;
		},

		skinReadyFunc: function() {

			var imageDir = $(localSynap.properties.xmlObj).find('path_image').text();
			member.originalWidth = $(localSynap.properties.xmlObj).find('width').text();
			member.originalHeight = $(localSynap.properties.xmlObj).find('height').text();
			
			
			var max_width = member.originalWidth + 'px';
			$('#contents').attr('src', localSynap.getResultDir() + imageDir);

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
                screenFit.init(RATIO_NUMBERS, $('.documentTool a'), $('#container'), member.originalHeight);

                var ratio = screenFit.getRatioToScreen();

                RATIO_NUMBERS.setTargetRatio(ratio);
                // 쪽맞춤이 100%를 넘을 경우, 100%로 고정한다.
                if (ratio > 1) { ratio = 1; }
                zoomSlider.moveScaleTagFreely(parseInt(ratio*100));
                zoomSlider.setTagText(parseInt(ratio*100));
                zoomSlider.setScaleButtonsOff();
                zoomSlider.setScaleButtonFreely(parseInt(ratio*100));
                screenFit.fitOn();
                
			}
			containerSizeAdjust();
			setFullScreenClick();

			if (!BROWSER.isMobile()) {
				image.resizeDesktop(ratio);
				// TODO:resizeDesktop에 인자를 넘겨주어야 한다.
				window.onresize = image.resizeDesktop;
			} else {
				image.resizeMobile();
				window.onresize = image.resizeMobile;
			}

			window.onscroll = function(e){
				localSynap.onScroll && localSynap.onScroll(e);
			}
			localSynap.onLoadedBody && localSynap.onLoadedBody();
		},

		skinReadyDesktopFunc: function() {
			$('#innerWrap').attr('style', 'overflow:auto;position:relative;margin:auto;text-align:center;vertical-align:middle;');
			$("#contents").attr('style', 'margin:auto; position: absolute; top:0; left:0; bottom: 0; right:0;' );
			docKeyboardControl();
			if (localSynap.properties.isRenderServer == true) {
				setDownloadButton(localSynap.downloadUrl);
			} else {
				setDownloadButton(localSynap.properties.xmlObj);
			}
			setPrintButton();

            $('a.fit').on('click', function (e) {
                screenFit.fitOn(function (ratioToScreen) {
                    // 마지막 배율이 그대로라면 아무것도 하지 않는다.
                    if (screenFit.isFitMode()
                        && RATIO_NUMBERS.getTargetRatio() == ratioToScreen) {
                        return false;
                    }
                    // zoom을 활용하자
                    RATIO_NUMBERS.setTargetRatio(ratioToScreen);
                    if (ratioToScreen > 1) {
                        ratioToScreen = 1;
                    }
                    image.resizeDesktop(ratioToScreen);
                    zoomSlider.moveScaleTagFreely(parseInt(ratioToScreen*100));
                    zoomSlider.setScaleButtonFreely(parseInt(ratioToScreen*100));
                    
                    zoomSlider.setTagText(parseInt(ratioToScreen*100));
                    zoomSlider.setScaleButtonsOff();
                });
            });

		},

		skinReadyMobileFunc: function() {
			initMobile();
			$('#container').attr('style', "text-align:center; -webkit-touch-scroll: touch");
			$('#innerWrap').attr('style', "display:inline-block; vertical-align:middle; height:100%;");
			$("#contents").attr('style', " margin:auto; position: absolute; top:0; left:0; bottom: 0; right:0; width:90%;" );

			if (!localSynap.isAllowCopy() && 
					(BROWSER.VERSION.isAndroidJellyBean() || (BROWSER.MOBILE.isIOS() && BROWSER.VERSION.IOS()<=7))){
				var contents = document.getElementById('contents');
				if(contents) {
					stopBrowserEvent(contents);
					contents.onload = function() {
						var src = contents.getAttribute('src');
						contents.removeAttribute('alt', '');
						contents.removeAttribute('src', '');
						contents.setAttribute('style', contents.getAttribute('style') + 'background-image:url(' + src + ');background-size: 100%; background-repeat: no-repeat;');
					}
				}
			}
		},
		resizeMobile: function(){
			setResizeHeaderTitle();
			var ww = $('#container').width() * 0.9;
			var wh = $('#container').height() * 0.9;
			
			var fixWidth = member.originalWidth < ww ? member.originalWidth : ww;
			var fixHeight = member.originalHeight < wh ? member.originalHeight : wh;
			if( ww / wh < member.originalWidth / member.originalHeight ){		// 800 / 600 > 1000 / 600
				$('#innerWrap').css('width', fixWidth * zoomRatioMobile + 5).css('min-height', Math.ceil(member.originalHeight * (fixWidth / member.originalWidth) * zoomRatioMobile)).css('min-width', '');
				$('#contents').css('width', fixWidth * zoomRatioMobile).css('height', '');
			}
			else{
				$('#innerWrap').css('min-height', fixHeight * zoomRatioMobile).css('min-width', Math.ceil(member.originalWidth * (fixHeight / member.originalHeight)) * zoomRatioMobile + 5);
				$('#contents').css('height', fixHeight * zoomRatioMobile).css('width', '');
			}
		},
		resizeDesktop: function(zoomRatio){
			zoomRatio = zoomRatio ? zoomRatio : screenFit.getRatioToScreen();
			setResizeHeaderTitle();
		
			$('#innerWrap').css('width', $('#container').width()).css('height', $('#container').height());	
			$('#contents').css('height', (member.originalHeight * zoomRatio)).css('width', (member.originalWidth * zoomRatio));
		}
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

