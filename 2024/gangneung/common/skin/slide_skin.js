// slide_skin.js
console.log( 'slide_skin.js' );

$.extend(localSynap, (function() {
	var member = {
		$idxFrame: undefined,
		$slideFrame: undefined,
		frameLoader: undefined,
		path_v: 'path_xhtml',
		// 변환요청 관리 맵 (동적서버용)
		reqMap: {},
		refreshPagesByScroll: null,
		
		convRequest: function (pageIndex, callback) {
			var url = localSynap.getBasePath() + localSynap.properties.requestContext;
			url = url.replace("${id}", localSynap.properties.fileName);
			url = url.replace("${pageNum}", 1+pageIndex);
			$.ajax({
				type: "GET",
				url: url,
				dataType: "json",
				cache: false,
				error: function (xhr, status, foo) {
					console.log(status, pageIndex);
				},
				success: function (data) {
					if (data["return"] == "true") {
						callback(pageIndex, data["path"]);
					}
				},
				complete: function(data) {
				}
			});
		},

		isPrintPage: function (pageNum) {
			return localSynap.startPage <= pageNum && pageNum <= localSynap.endPage
		},
		parseXML: function(xml) {
			var $xml = $(xml);
			localSynap.infoXml = xml;
			localSynap.originalWidth = parseInt($xml.find('width').text());
			localSynap.originalHeight = parseInt($xml.find('height').text());
			localSynap.slideRatio = localSynap.originalHeight / localSynap.originalWidth;
			
			$startPage = $xml.find('startPage');
			if ($startPage.length > 0) {
				localSynap.startPage = parseInt($startPage.text());
			} else {
				localSynap.startPage = 1;
			}

			$endPage = $xml.find('endPage');
			$slideCnt = $xml.find('slide_cnt');
			if ($endPage.length > 0) {
				localSynap.endPage = parseInt($endPage.text());
			} else {
				localSynap.endPage = parseInt($slideCnt.text());
			}

			if (localSynap.properties.entireWithPartialConv == true) {
				localSynap.pageSize = $xml.find('slide').size();
			} else {
				if (localSynap.endPage - localSynap.startPage + 1 >  parseInt($slideCnt.text()) ) {
					localSynap.pageSize = parseInt($slideCnt.text());
				} else {
					localSynap.pageSize = localSynap.endPage - localSynap.startPage + 1;
				}
			}

			$xml.find('slide').each(function (index) {
				if (localSynap.properties.entireWithPartialConv == false) {
					if ( !member.isPrintPage(index + 1) ) {
						return;
					}
				}
				$this = $(this);
				localSynap.slideList.push({
					index: (parseInt($this.find('id').text()) + 1),
					title: $this.find('title').text(),
					path: encodeURI( $this.find(member.path_v).text())
				});
			});
		},

		resizeSkin: function() {
			if (BROWSER.isMobile()){
				member.resizeSkinMobile();
			}else{
				member.resizeSkinDesktop();
			}
		},

		resizeSkinDesktop: function() {
			setResizeHeaderTitle();
			var browserRatio = 1.0;
			if(!BROWSER.PC.isIE()) {
				browserRatio = 0.95;
			}
			var objScreen = $('#innerWrap');
			var wrap = objScreen.parent();
			var currentWidth = $(window).width() - (localSynap.leftPanelShow?$('#thumbnail')[0].offsetWidth:0);
			var currentHeight = $('#container').height();
			var containerWidth = $(window).width() - (localSynap.leftPanelShow?$('#thumbnail').width():0);
			var containerHeight = $(window).height() - (getHeaderHeight() * (localSynap.fullScreenMode?0:1));

			// Resize를 하지 않는 옵션 처리
			if (!localSynap.isAllowResize()) {
				objScreen.width(Math.ceil(localSynap.originalWidth*1.33));
				objScreen.height(Math.ceil(localSynap.originalHeight*1.33));

				if (currentWidth <= objScreen.width()) {
					var strLeft = objScreen.css('left');
					objScreen.css('margin-left', strLeft);
				} else {
					objScreen.css('margin-left', (currentWidth-objScreen.width()) / 2);
				}
				if (currentHeight <= objScreen.height()) {
					var strTop = objScreen.css('top');
					objScreen.css('margin-top', strTop);
				} else {
					objScreen.css('margin-top', (containerHeight-objScreen.height()) / 2);
				}
				$('#screenOuterDiv').css('margin-left','0px');				
				$('#contents').css('margin-left', member.getThumbnailWidth());
				return;
			}
			var zoomRatio = (browserRatio * currentWidth) / localSynap.originalWidth;
			 if (containerHeight / currentWidth < localSynap.originalHeight / localSynap.originalWidth) {
				zoomRatio = (browserRatio * containerHeight) / localSynap.originalHeight;
			}
			var slideWidth = localSynap.originalWidth,
			slideHeight = localSynap.originalHeight;
			if (BROWSER.PC.isIE()) {
				slideWidth = localSynap.originalWidth - 24;
				slideHeight = localSynap.originalHeight - 14;
			}

			if (BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9) {		// old-IE
				objScreen.width(localSynap.originalWidth * zoomRatio - 20);
				objScreen.height(localSynap.originalHeight * zoomRatio - 14);
				objScreen.css('margin-left', (currentWidth - (localSynap.originalWidth * zoomRatio - 20))/2).css('margin-top', (containerHeight - (localSynap.originalHeight * zoomRatio - 14))/2);
			}
			else if (BROWSER.PC.isFirefox()) {
				objScreen.width(localSynap.originalWidth * zoomRatio - 20);
				objScreen.height(localSynap.originalHeight * zoomRatio - 14);
				objScreen.css('margin-left', (currentWidth - (localSynap.originalWidth * zoomRatio - 20))/2).css('margin-top', (containerHeight - (localSynap.originalHeight * zoomRatio - 14))/2);
			}
			else {
				var resizeScaleRatio = 2;
				objScreen.width(slideWidth*resizeScaleRatio); 
				objScreen.height(slideHeight*resizeScaleRatio);
				objScreen.css('transform', 'scale(' + zoomRatio/resizeScaleRatio + ')')
					.css('margin-left', slideWidth*(zoomRatio-resizeScaleRatio)/2 + (currentWidth-slideWidth*zoomRatio)/2 + "px")
					.css('margin-top', slideHeight*(zoomRatio-resizeScaleRatio)/2 + (containerHeight-slideHeight*zoomRatio)/2 + "px");
			}
		},
		setSlideSection: function (pageIndex, successCallback) {
			var reqIndex = localSynap.properties.partConvCnt * parseInt( pageIndex / localSynap.properties.partConvCnt );
			if (member.reqMap[reqIndex] == undefined) {
				member.reqMap[reqIndex] = false;
			} else if (member.reqMap[reqIndex] == true) {
				successCallback(reqIndex, localSynap.getResultDir() + localSynap.slideList[pageIndex].path);
				return;
			} else if (member.reqMap[reqIndex] == false) {
				setTimeout(function () {
					member.setSlideSection(pageIndex, successCallback);
				}, 500);
				return;
			}

			member.convRequest(reqIndex, function (pageIndex, srcPath) {
				member.reqMap[reqIndex] = true;
				successCallback(pageIndex, srcPath);
			});
		},

		resizeSkinMobile: function() {
			// no work
		},

		readyIndexPage: function() {
			function pad(num, places) {
			  var zero = places - num.toString().length + 1;
			  return Array(+(zero > 0 && zero)).join("0") + num;
			}
			
			var $indexFrame = $('#indexFrame');
			if( $indexFrame.length === 0 ) return;
			for( var i = 0 ; i < localSynap.pageSize ; i ++ ){
				var $newFrame = $('#indexFrame>div').eq(0).clone();
				$newFrame.find('em').text(i+1);
				$newFrame.find('iframe').attr('id', 'thumb_frame_' + pad(i, 5));
				
				// 가로/세로 길이 재조정이 필요한 객체들
				$newFrame.find('.imgBox, .frameBox, iframe+div').css('width', localSynap.properties.thumbnailWidth)
					.css('height', Math.floor(localSynap.properties.thumbnailWidth / localSynap.originalWidth * localSynap.originalHeight));
				$indexFrame.append($newFrame);
				(function(index){
					$newFrame.on('click', function(e){
						localSynap.moveSlide(index);
					});
				})(i);
				
				var $elem = $newFrame.find('iframe').eq(0);

				if( BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9 || BROWSER.PC.isFirefox() ){
					$elem.css('width', localSynap.properties.thumbnailWidth).css('height', Math.floor(localSynap.properties.thumbnailWidth / localSynap.originalWidth * localSynap.originalHeight));
				}else {
					var transRatio = localSynap.properties.thumbnailWidth / (localSynap.originalWidth*2);
					$elem.width(localSynap.originalWidth*2)
						.height(localSynap.originalHeight*2)
						.css('left', -(localSynap.originalWidth*2 * (1-transRatio))/2)
						.css('top', -(localSynap.originalHeight*2 * (1-transRatio))/2)
						.css('transform', "scale(" + transRatio + "," + transRatio + ")");
				}
			}
			$('#indexFrame>div').eq(0).remove();
			
			var foo = null;
			var loadScrollTopFunc = function(e){
				var timer = false;
				if (foo !== null) {
					clearTimeout(foo);
				}
				loadSpinner('contents');
				var index = e.target.scrollTop / Math.floor(localSynap.properties.thumbnailWidth / localSynap.originalWidth * localSynap.originalHeight + 20 + 2);
				index = Math.floor(index);

				var counts = parseInt($("#indexFrame").height() / ($($("#indexFrame div")[0]).height() + 30)) + 3; // 30은 여백값
				var start = 0 < index-5 ? index - 5 : 0, end = localSynap.pageSize > index + counts ? index + counts : localSynap.pageSize;
				var $list = $('#indexFrame iframe[name="thumbFrame"]');

				if (localSynap.properties.entireWithPartialConv == true) {
					foo = setTimeout( function () {
						for( var i = start ; i < end ; i ++ ){
							member.setSlideSection(i, function (reqIndex, srcPath) {
								var $list = $('#indexFrame iframe[name="thumbFrame"]');
								var lastPageNum = reqIndex+localSynap.properties.partConvCnt > localSynap.getPageSize() ? localSynap.getPageSize() : reqIndex + localSynap.properties.partConvCnt;
								for (var index = reqIndex; index < lastPageNum; ++index) {
									$elem = $list.eq(index);
									if( !$elem.attr('src') ){
										$elem.attr('src', localSynap.getResultDir() + localSynap.slideList[index].path);
									}
								}
								removeSpinner();
							});
						}
					}, 500);
				} else {
					foo = setTimeout(function(){
						if( timer ) return;
						timer = true;
						for( var i = start ; i < end ; i ++ ){
							$elem = $list.eq(i);
							if( !$elem.attr('src') ){
								$elem.attr('src', localSynap.getResultDir() + localSynap.slideList[i].path);
							}
						}
						timer = false;
						removeSpinner();
					}, 500);
				}
			}
			/* IE8 에서 clientWidth를 두 번 구하면 값이 다르게 나와서 강제로 evaluation */
			var thumbnailWidth = document.getElementById('thumbnail').clientWidth;
			$('#indexFrame').width( document.getElementById('thumbnail').clientWidth + 'px');
			$('#thumbnail').on('scroll', loadScrollTopFunc);
			loadScrollTopFunc({target:{scrollTop:0}});
			
			//member.resizeSkinDesktop();
			$('.prNavTotal').text(localSynap.pageSize);
		},
		
		resize: function() {
			if (BROWSER.isMobile()){
				member.resizeMobile();
			}else{
				member.resizeDesktop();
			}
			member.resizeSkin();
		},
		
		resizeMobile: function() {
			var currentWidth = $(window).width(),
	 			currentHeight = $(window).height();
				currentHeight -= (getHeaderHeight());
			zoomRatio = currentWidth / localSynap.originalWidth;
			zoomRatio *= 0.95;
			
			var $frame = $('iframe[name="innerWrap"]');
			$frame.width(currentWidth);
			$frame.height(currentWidth * (localSynap.originalHeight / localSynap.originalWidth));
			
			for( var i = $frame.length - 1; i >= 0 ; i -- ){
				$($frame.get(i).contentWindow).resize();
			}
		},
		getThumbnailWidth: function() {
			var left = 0;
			if (localSynap.hasIndexFrame()) {
				left = $('.leftPanel').get(0).offsetWidth;
				if (localSynap.fullScreenMode == false) {
					left = $('.leftPanel').get(0).offsetWidth * ($('#thumbnail').css('left')=="0px"?1:0);
				}
			}
			return left;
		},
		resizeDesktop: function() {
			if (localSynap.hasIndexFrame()) {
				$('#screenOuterDiv').css('margin-left', member.getThumbnailWidth());
			}
		}
	}

	var slide = {
		curPage: 0,
		pageSize: 0,
		slideRatio: 1,
		slideList: [],
		infoXml: undefined,

		hasIndexFrame: function() {
			return member.$idxFrame && member.$idxFrame.length !== 0; 
		},

		hasSlideFrame: function() {
			return member.$slideFrame && member.$slideFrame.length !== 0; 
		},


		moveSlide: function(idx) {
			$('#inputPageNumber').val(idx+1);
			if (localSynap.hasSlideFrame()) {
				if( BROWSER.isMobile() ){
					$('.paging option').eq(idx).prop('selected', true);
				}
				if (localSynap.properties.entireWithPartialConv == true) {
					loadSpinner('contents');
					member.setSlideSection(idx, function (reqIndex, srcPath) {
						pageUrl = localSynap.getResultDir() + localSynap.slideList[idx].path;
						member.$slideFrame.attr('src', pageUrl);
					});

					removeSpinner();
				} else {
					url = localSynap.getResultDir() + localSynap.slideList[idx].path;
					if(BROWSER.adjustXhtml()) {
						url = url.replace('\.htm', '\.xhtml');
					}
					if( BROWSER.isMobile() ){
						member.$slideFrame.get(0).contentWindow.location.replace(url);
					}else{
						member.$slideFrame.attr('src', url);
					}
				}
			}
		},
		
		// mobile
		loadScroll: function(idx){
			var offset = $('#contentWrap').scrollTop();
			if( idx === undefined ){
				idx = Math.floor(offset / ($(window).width() * (localSynap.originalHeight / localSynap.originalWidth)));	
				if( offset + $('#container').innerHeight() >= $('#slideWrap')[0].scrollHeight )
					idx = localSynap.pageSize - 1;
				if( idx <= 0 )
					idx = 0;
			}
			else{
				if( idx < 0 ) idx = 0;
				if( idx >= localSynap.pageSize ) idx = localSynap.pageSize - 1;
				
				document.getElementById('contentWrap').scrollTop = $('iframe[name="innerWrap"]').eq(idx)[0].offsetTop;
			}
			$('.paging option').eq(idx).prop('selected', true);
			localSynap.curPage = idx;
			
			var iframes = document.getElementsByName("innerWrap");
			var failImagePath = 'image/common/img_loading.png';
			
			var start, end;
			if( localSynap.pageSize < 5 ){
				start = 0; end = localSynap.pageSize - 1;
			}
			else{
				start = idx - 2; end = idx + 2;
				if( start < 0 ){ start = 0; end = start + 4; }
				if( end >= localSynap.pageSize ){ end = localSynap.pageSize - 1; start = end - 4; }
			}
			
			if (member.refreshPagesByScroll !== null) {
				clearTimeout(member.refreshPagesByScroll);
			}
			member.refreshPagesByScroll = setTimeout( function () {
				for( var i = 0 ; i < start ; i ++ ){
					if( iframes.item(i).contentWindow.location.href.indexOf("about:blank") === -1 ) {
						iframes.item(i).contentWindow.location.replace("about:blank");
					}
				}
				for( var i = start ; i <= end ; i ++ ){
					if( iframes.item(i).contentWindow.location.href.indexOf("about:blank") !== -1 ){
						if (localSynap.properties.entireWithPartialConv == true) {
							member.setSlideSection(i, function (reqIndex, srcPath) {
								var lastPageNum = reqIndex+localSynap.properties.partConvCnt > localSynap.getPageSize() ? localSynap.getPageSize() : reqIndex + localSynap.properties.partConvCnt;
								var startIdx = reqIndex < start ? start : reqIndex;
								var endIdx = lastPageNum-1 > end ? end : lastPageNum-1
								for (var index = startIdx; index <= endIdx; ++index) {
									if (iframes.item(index).contentWindow.location.href.indexOf("about:blank") !== -1) {
										iframes.item(index).contentWindow.location.replace(localSynap.getResultDir() + localSynap.slideList[index].path);
									}
								}
							});
						} else {
							iframes.item(i).contentWindow.location.replace(localSynap.getResultDir() + localSynap.slideList[i].path);
						}
					}
				}
				for( var i = end + 1 ; i < localSynap.pageSize ; i ++ ){
					if( iframes.item(i).contentWindow.location.href.indexOf("about:blank") === -1 ) {
						iframes.item(i).contentWindow.location.replace("about:blank");
					}
				}
			}, 200);
		},

		// 데스크톱에서 본문 영역에 보여지는 페이지를 기준으로 curPage 변수를 설정한다. ( 뒤로가기, src 로딩시 호출됨. )
		updateAfterMove: function() {
			if(!BROWSER.isMobile()){
				var shownHref = member.$slideFrame.get(0).contentWindow.location.href, pageMoved = false;
				if( shownHref.indexOf(localSynap.slideList[localSynap.curPage].path) === -1 ){
					for( var i = 0 ; i < localSynap.slideList.length ; i ++ ){
						if( shownHref.indexOf(localSynap.slideList[i].path) !== -1 ){
							localSynap.curPage = i; pageMoved = true; break;
						}
					}
				}
				
				var selectDiv = member.$idxFrame.find('a > div.thumbnailSel')
				if (selectDiv.length) {
					selectDiv.removeClass('thumbnailSel');
				}
				if( member.$idxFrame.find('a > div').length === localSynap.pageSize ){
					member.$idxFrame.find('a > div').eq(localSynap.curPage).addClass('thumbnailSel');
				}
				
				$('#inputPageNumber').val(localSynap.curPage+1);
				
				if( localSynap.hasIndexFrame() && pageMoved ){
					localSynap.thumbnailScrollPositionFix();
					
					localSynap.onMovePage && localSynap.onMovePage();
				}
			}
			member.resizeSkin();
		},
		
		thumbnailScrollPositionFix: function(){
			var $scrollPix = $('#thumbnail').scrollTop();
			var $focusElem = member.$idxFrame.find('>div').eq(localSynap.curPage);
			var topPix = $focusElem[0].offsetTop;
			var focusHeight = $focusElem.height();
			if( !( $scrollPix <= topPix && topPix+focusHeight <= $scrollPix+$('#thumbnail').height()) ){
				$('#thumbnail').scrollTop(topPix - 12);
			}
		},

		movePrev: function() {
			if (localSynap.curPage < 1) {
				return;
			} else {
				localSynap.moveSlide(localSynap.curPage - 1);
				if( localSynap.curPage === 0 ){
					$('.navPrev').attr('src' , 'image/common/btn_pagePre_default.png').parent().css('cursor', 'default');
				}
			}
			
		},
		moveNext: function() {
			if (localSynap.curPage >= localSynap.pageSize - 1) {
				return;
			} else {
				localSynap.moveSlide(localSynap.curPage + 1);
				if( localSynap.curPage === localSynap.pageSize - 1 ){
					$('.navNext').attr('src', 'image/common/btn_pageNext_default.png').parent().css('cursor', 'default');
				}
			}
		},

		skinReadyFunc: function() {
			if( BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9 )
				member.path_v = 'path_html';
			member.parseXML(localSynap.properties.xmlObj);
			if( BROWSER.isMobile() ){
				if(  localSynap.properties.layout === "withpage" ){
					slide.skinReadyMobileFunc();
				} else{
					slide.skinReadySingleMobileFunc();
				}
			}else{
				if (localSynap.properties.isRenderServer === true) {
					setDownloadButton(localSynap.downloadUrl);
				} else {
					setDownloadButton(localSynap.properties.xmlObj);
				}
				setPrintButton();
				
				if( localSynap.properties.layout === "withpage" ){
					slide.skinReadyDesktopFunc();
				}else{
					slide.skinReadySingleDesktopFunc();
				}
			}
			containerSizeAdjust();
			setFullScreenClick();
		},

		skinReadySingleDesktopFunc: function(){
			// 싱글 페이지
			$('#thumbnail').css('display', 'none');
			$('.withPageOnly').css('display', 'none');
			localSynap.leftPanelShow = false;
			$('#leftPanel_hidden').css('display', 'none');

			var url = localSynap.getResultDir() + localSynap.properties.fileName + '.htm';
			if(BROWSER.adjustXhtml()) {
				url = url.replace('\.htm', '\.xhtml');
			}
			document.getElementById('innerWrap').contentWindow.location.replace(url);
			
			if( BROWSER.VERSION.IE() <= 9 ){
				$('#innerWrap').attr('allowTransparency', 'true').css('display:block; width:100%;');
			}
			$('#innerWrap').on('load', function(e){
				$('#innerWrap').height(e.target.contentWindow.document.body.scrollHeight);
			});
			// IE9에서 스크롤바 생성을 위한 코드.
			$('#container').css('overflow-y', 'auto');
		},
		skinReadyDesktopFunc: function() {
			member.$idxFrame = $('#indexFrame');
			member.$slideFrame = $('iframe[name="innerWrap"]');
			
			if (localSynap.hasIndexFrame() && localSynap.fullScreenMode === false) {
				var left = document.getElementById('thumbnail').clientWidth;
				localSynap.leftPanelShow = true;
			}
			else{
				var left = 0;
				localSynap.leftPanelShow = false;
			}
			
			// 보여줄 thumbnail이 없으면 thumbnail열어주는 버튼도 화면에서 가린다.
			if( !localSynap.hasIndexFrame() ){
				$('#leftPanel_hidden').css('display', 'none');
			}
			$('#contentWrap').width($('body').width() - left).css('left', left);
		
			if (!localSynap.isAllowResize()) {
				$('#contents').css('top','0px');
				$('#contents').css('left','0px');
				$('#contents').css('right','0px');
				$('#contents').css('overflow','auto');
				$('#contents').css('position','absolute');
				if (BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9) {
					$('#contents').css('height','100%');
				}else{
					$('#contents').css('bottom','0px');
				}
			}
			// 화면에 슬라이드 번호 표시하는 태그의 텍스트 지정
			$('#totalPageNumber').text(localSynap.pageSize);
			$('#inputPageNumber').attr('value', '1').on('click', function(){
				this.select();
			}).on('keydown', function(event){
				if( event.which === 13 ){		// enter
					try{
						var movePageNum = parseInt($('#inputPageNumber').val()) - 1;
						if( movePageNum >= localSynap.pageSize || movePageNum < 0 || isNaN(movePageNum) )
							throw new Error("wrong Number");
						localSynap.moveSlide( movePageNum );
					}catch(e){
						$('#inputPageNumber').val( localSynap.curPage + 1 );
					}
				}
			}).on('blur', function(){
				setTimeout(function(){
					$('#inputPageNumber').val(localSynap.curPage + 1);
				}, 300);
			});

			$('.navPrev').on('mouseover',function(event){
				var $target = $( event.target );
				if( localSynap.curPage === 0 ){
					$target.parent().css('cursor', 'default');
					$target.attr('src' , 'image/common/btn_pagePre_default.png');
				}
				else{
					$target.parent().css('cursor', 'pointer');
					$target.attr('src' , 'image/common/btn_pagePre.png');
				}
			}).on('mouseout',function(event){
				var $target = $( event.target );
				$target.attr('src' , 'image/common/btn_pagePre_default.png');
			});
			$('.navNext').on('mouseover',function(event){
				var $target = $(event.target);
				if( localSynap.curPage === localSynap.pageSize - 1){
					$target.parent().css('cursor', 'default');
					$target.attr('src', 'image/common/btn_pageNext_default.png');
				}
				else{
					$target.parent().css('cursor', 'pointer');
					$target.attr('src', 'image/common/btn_pageNext.png');
				}
			}).on('mouseout', function(event){
				var $target = $( event.target );
				$target.attr('src', 'image/common/btn_pageNext_default.png');
			});
			
			slideKeyboardControl();

			
			setResizeHeaderTitle();
			
			
			setTimeout(function(){
				member.readyIndexPage();
			}, 0);

			window.onresize = member.resize;
			member.resize();

			$('#slideJumpButton').on('click', function(e){
				try{
					var movePageNum = parseInt($('#inputPageNumber').val()) - 1;
					if( movePageNum >= localSynap.pageSize || movePageNum < 0 || isNaN(movePageNum) )
						throw new Error("wrong Number");
					localSynap.moveSlide( movePageNum );
				}catch(e){
					$('#inputPageNumber').val( localSynap.curPage + 1 );
				}
			});
			
			$('#navPrevBtn').on('click', function(e){
				localSynap.movePrev();
			});
			$('#navNextBtn').on('click', function(e){
				localSynap.moveNext();
			});

			if (localSynap.hasIndexFrame()){
				$('a.closeBtn').on('click', function(e) {
					e.preventDefault();
					localSynap.leftPanelShow = false;
					$('#thumbnail').animate({ left: -$('#thumbnail').width() },
					  function() {
							$(window).resize();
						});
				});
				$('a.openThumbnail').on('click', function(e){
					e.preventDefault();
					localSynap.leftPanelShow = true;
					
					$('#thumbnail').animate({ left: 0 },
					  function() {
							$(window).resize();
						});
				});
			}
			localSynap.moveSlide(0);
			
			if (localSynap.isAllowCopy && !localSynap.isAllowCopy()) {
				localSynap.killCopyHtml();
			}
		},
		skinReadySingleMobileFunc: function() {
			initMobile();
			
			// single page 모바일은 항상 모아보기 설정
			var newFrame = '<iframe id="innerWrap" class="innerWrap" scrolling="no" frameborder="0" title="content" style=" background-image:url(' + "'"+"image/common/img_loading.png'" + '); background-repeat:no-repeat; background-position: center center;" src="' + localSynap.getResultDir() + localSynap.properties.fileName + '.xhtml' + '"/>';
			var $iframe = $('#slideWrap').append(newFrame);
			
			$('#innerWrap').on('load', function(e){
				$('#slideWrap').height(e.target.contentWindow.document.body.scrollHeight);
			});
			
			$('.withPageOnly').css('display', 'none');
		},
		skinReadyMobileFunc: function() {
			initMobile();
			
			if( localSynap.properties.mobileSlideSkinViewSetting === "multi" ){
				$('#wrap > #page_btn').css('display', 'none');
			}
			else{
				localSynap.loadScroll = localSynap.moveSlide;
			}
			var windowWidth = $(window).width();
			var windowHeight = $(window).width() * (localSynap.originalHeight / localSynap.originalWidth);
			
			if( localSynap.properties.mobileSlideSkinViewSetting === "multi" ){
				for( var i = 0 ; i < localSynap.pageSize ; i ++ ){
					var newFrame = '<iframe id="slide' + (i+1) + '" class="innerWrap" name="innerWrap" scrolling="no" frameborder="0" title="content" style=" background-image:url(' + "'"+"image/common/img_loading.png'" + '); background-repeat:no-repeat; background-position: center center; " />';
					var $iframe = $('#slideWrap').append(newFrame);
				}
			} else{
				var newFrame = '<iframe name="innerWrap" class="innerWrap" scrolling="no" frameborder="0" title="content" />';
				$('#slideWrap').append(newFrame);
			}
			
			member.$slideFrame = $('iframe[name="innerWrap"]');
			
			member.$slideFrame.css('width', windowWidth + 'px').css('height', windowHeight + 'px');

			window.onresize = member.resize;

			$(localSynap.infoXml).find('slide').each( function(index, elem) { 
				$('.paging>select').append('<option>' + $(elem).find('id').text() + '</option>');
			} );
			
			
			$('.paging').append(' / ' + localSynap.getPageSize());
			$('.paging > select').change(function(){
				$("select option:selected").each(function(){
					localSynap.loadScroll( $(this).index() );
				});
			});
			
			$('.btn_pre').on('click', function (e) {
				e.preventDefault();
				localSynap.loadScroll(localSynap.curPage-1);
			});
			$('.btn_next').on('click', function (e) {
				e.preventDefault();
				localSynap.loadScroll(localSynap.curPage+1);
			});
			
			localSynap.loadScroll(0);
			
			
			$('#contentWrap').scroll(function(){
				localSynap.loadScroll();
			});
		}
	}
	return slide;
})());

localSynap.getPageSize = function() {
	return localSynap.pageSize;
}

localSynap.getCurrentPage = function() {
	return localSynap.curPage + 1;
}

localSynap.movePage = function(pageno) {
	localSynap.moveSlide(pageno-1);
}

localSynap.killCopyHtml = function() {
	stopBrowserEvent(document.body);
	
	var innerWrap = document.getElementById('innerWrap');
	if (innerWrap){
		stopBrowserEvent(innerWrap);
		innerWrap.onload = function() {
			stopBrowserEvent(innerWrap.contentWindow.document);
		};
		if(BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 8) {
			innerWrap.onreadystatechange = function(){
				if (innerWrap.readyState == "loaded" || innerWrap.readyState == "complete"){
					stopBrowserEvent(innerWrap.contentWindow.document);
				}
			};
		}		
	}
}

// SKIN READY FUNC
$(document).ready(function() {
	if (typeof localSynap.skinReadyFunc === "function") {
		localSynap.skinReadyFunc();
	}
});
function loadSpinner(pageClassName, callback){
	if ($('.loading_spinner').length > 0) {
		return;
	}
	
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
		, speed: 1 // Rounds per second
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
	document.getElementById('container').appendChild(target);
	var spinner = new Spinner(opts).spin(target);
	callback && callback();
}

function removeSpinner(){
	setTimeout(function(){
		$('.loading_spinner').remove();
	}, 50);
}



