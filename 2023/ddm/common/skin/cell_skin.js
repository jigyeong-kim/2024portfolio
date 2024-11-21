// cell_skin.js
console.log( 'cell_skin.js' );

if(localSynap.properties.useLoadingSpinner){
	loadSpinner('container', '');
}

localSynap = (function() {
	var member = {
		path_v: 'path_xhtml',
		$sheetViewFrame: undefined,
		naviPos: -1,
		bResize: false,

		moveNavi: function() {
			var x = 0;
			if( member.naviPos === 0 ){
				$(".tabMoveFirst,.tabMovePrev").css('cursor', 'default');
			}else{
				$(".tabMoveFirst,.tabMovePrev").css('cursor', 'pointer');
			}
			if( $('.cellSheetList .cellTab').length-1 <= member.naviPos ){
				$(".tabMoveNext,.tabMoveLast").css('cursor', 'default');
			}else{
				$(".tabMoveNext,.tabMoveLast").css('cursor', 'pointer');
			}
			$('.cellSheetList .cellTab').each(function() {
				if(x < member.naviPos) {
					$(this).hide();
				}
				else {
					$(this).show();
				}
				x++;
			});
		},

		getImageCount : function (key) {
			var imageCount = -1;
			
			imageCount = localSynap.status.pageNum || localSynap.pageSize;
			return imageCount;
		},
		appendSheetName : function(idx, sheetTitle) {
			var value = '';
			if (BROWSER.isMobile()) {
				value = '<option value="' + idx + '">' + sheetTitle + '</option>';
			}else {
				value = '<a href="javascript:localSynap.moveSheet(' + idx + ');" class="cellTab" target="innerWrap" title="' + sheetTitle + '" tabindex="8"><span>' + sheetTitle + '</span></a>';
			}
			$('.cellSheetList').append(value);			
		},
		parseImage: function(key) {
			// pagesize를 읽어서 시트 정보를 넣어야 한다.
			localSynap.pageSize = parseInt(member.getImageCount(key));

			for(var i=0; i<localSynap.pageSize; i++) {
				var sheetTitle = localSynap.getTitle(key, i);
				if(sheetTitle === "") {
					sheetTitle = "Sheet " + (i+1);
				}
				member.appendSheetName((parseInt(i)+1), sheetTitle);
			}
			if (BROWSER.isMobile()){
				$('.cellSheetList').change(function() {
					localSynap.moveSheet($('.cellSheetList').val());
				});
			}
		},
		
		createContents: function () {
			$.each(localSynap.sheetList, function(index, sheet) {
				member.appendSheetName((parseInt(index)+1), sheet.title);				
			});
			if (BROWSER.isMobile()) {
				$('.cellSheetList').change(function() {
					localSynap.moveSheet($('.cellSheetList').val());
				});
			}
		},
		
		isImageMode: function(){
			return (localSynap.properties.isRenderServer && localSynap.status.convertType == 1);
		},
		killCopyHtml: function() {
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
		},

		resize: function() {
			if (!BROWSER.isMobile()) {
				setResizeHeaderTitle();
			}
		}
	}

	var localSynapCell = {
		curPage: -1,
		pageSize: 0,
		infoXml: undefined,
		sheetList: [],
		
		parseXML: function(xml) {
			localSynap.infoXml = xml;
			var totalSheets = $(xml).find('sheet_cnt').text();
			localSynap.pageSize = parseInt(totalSheets);
			var flag = 0;
			$(xml).find('sheet').each(function() {
				var strTitle = $(this).find('title').text();
				if (localSynap.isSingleLayout() || strTitle != ""){ // 숨김시트는 포함하지 않음
					localSynap.sheetList.push({
						index: (parseInt($(this).find('id').text())),
						title: $(this).find('title').text(),
						path: encodeURI( $(this).find(member.path_v).text())
					});
				}
			});
		},
		
		getTitle : function (key, sheetIdx) {
			var titleText = "";
			$.ajax({
				type: "GET",
				url: localSynap.properties.contextPath + '/title/' + key + '/' + sheetIdx,
				async: false,
				dataType: "text",
				error: function(data){
					alert('getTitle error');
				},
				complete : function(data){
				},
				success:function(data) {
                    // 서버에서는 문자열을 그대로 보내주므로, HTML특수문자 처리를 위해 변환한다.
					titleText = encodeHTML(data);
				}
			});
			return titleText;
		},

		updateAfterMove: function(sheetIndex) {
			console.log('updateAfterMove');
			if (BROWSER.isMobile()) {
				$('.cellSheetList option').eq(parseInt(localSynap.curPage)-1).prop('selected', true);
			}
			else {
				if( sheetIndex !== undefined ){
					for( var i = 0 ; i < localSynap.sheetList.length ; i ++ ){
						if( localSynap.sheetList[i].index === sheetIndex ){
							localSynap.curPage = i + 1; break;
						}
					}
				}
					
				
				
				if ($('.cellSheetList > a').size() != 0) {
					$('.cellSheetList .on').toggleClass('on');
					$('.cellSheetList > a:nth-child(' + parseInt(localSynap.curPage) + ') span').toggleClass('on');
				}
			}
		},

		moveScroll: function(pageNum) {	
			var sheetTitles = member.$sheetViewFrame.get(0).contentDocument.getElementById("content").getElementsByTagName("h1");
			var offset = sheetTitles[pageNum-1].offsetTop;
			var scrollManager;
			if ( BROWSER.MOBILE.isIOS() ){
				scrollManager = window;		// ios에서는 최상위 window에서 스크롤 조작
			}else{
				scrollManager = member.$sheetViewFrame.get(0).contentWindow;
			}	 
			scrollManager.scrollTo(0,offset);	
		},
		
		// 시트 이동. 1부터 시작
		moveSheet: function(newSheet) {
			var href = "";
			if(member.isImageMode()) {
				href = "cell_image_skin.html?sheet=" + (newSheet-1);
			}else{
				href = localSynap.getResultDir() + localSynap.sheetList[newSheet-1].path;
			}
			localSynap.curPage = newSheet;
			
			if( BROWSER.isMobile() ){
				member.$sheetViewFrame.get(0).contentDocument.location.replace(href);
			}else{
				member.$sheetViewFrame.attr("src", href);
			}
						
			localSynap.onMovePage && localSynap.onMovePage();
		},

		// 본문안에서 하이퍼링크이동시 사용하는 함수. 0부터 시작함
		moveByLink: function(Page,Url) {
			localSynap.moveSheet(Page+1);
		},
		
		bodyReadySkinFunc: function() {
			removeSpinner();
		},

		skinReadyFunc: function() {
			if( BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9 )
				member.path_v = 'path_html';

			// icon setting
			if (localSynap.properties.fileType.toLowerCase() === "csv") {
				$('#iconImage').attr('src', 'image/header/icon_format_CSV.png');
			}

			docKeyboardControl();
			member.$sheetViewFrame = $('#innerWrap');
			if (!localSynap.isAllowCopy()) {
				member.killCopyHtml();
			}

			if(member.isImageMode()) {
				member.parseImage(localSynap.jobId);
				setDownloadButton(localSynap.downloadUrl);
			} else {
				localSynap.parseXML(localSynap.properties.xmlObj);
				member.createContents();
				if (localSynap.properties.isRenderServer) {
					setDownloadButton(localSynap.downloadUrl);	
				} else {
					setDownloadButton(localSynap.properties.xmlObj);	
				}
			}
			localSynap.moveSheet(1);
			setPrintButton();
			setSnsButton(localSynap.properties.useSharedSns);

			member.naviPos = 0;
			member.moveNavi();
			
			if (BROWSER.isMobile()){
				initMobile();

				if (localSynap.isSingleLayout()) {
					$('.paging').remove();
				}
				
				if (BROWSER.MOBILE.isAndroid()) {
					$('#cellContent').css('overflow', 'hidden');
				}

				window.addEventListener('load', function() {
					setTimeout(function() {
						window.scrollTo(0, 1);
					}, 1000);
				});
			} 
			else {
				if (localSynap.isSingleLayout()) {
					$('#footerWrap').remove();
				}

				$('.tabMoveFirst').click(function(event) {
					member.naviPos = 0;
					member.moveNavi();
				});
				$('.tabMovePrev').click(function(event) {
					if(member.naviPos > 0) {
						member.naviPos--;
					}
					member.moveNavi();
				});
				$('.tabMoveNext').click(function(event) {
					if(member.naviPos < localSynap.pageSize - 1){
						member.naviPos++;
					}
					member.moveNavi();
				});
				$('.tabMoveLast').click(function(event) {
					member.naviPos = localSynap.pageSize - 1;
					member.moveNavi();
				});
				member.resize(); // #DEFECT-2580 title resize를 위해 호출

				//IE9이하일 경우 javascript resize작동에 문제가 있어 수정
				if(BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9) {
					$('#headTitle').width(50);
					$('#headTitle').css('overflow','visible');
				}
			}
			window.onresize = member.resize;
			containerSizeAdjust();
			setFullScreenClick();
		}
	}

	return $.extend(localSynap, localSynapCell);
})();

// CELL API
localSynap.cell = (function() {
	var cell = {
	}
	return cell;
})();

localSynap.getPageSize = function() {
	return localSynap.pageSize;
}

localSynap.getCurrentPage = function() {
	return localSynap.curPage;
}

localSynap.movePage = function(inputPage) {
	if (inputPage == undefined || isNaN(inputPage)) {
		return ;
	}
	
	var pageno = parseInt(inputPage);
	if (pageno < 1) {
		pageno = 1;
	}
	if (pageno > localSynap.pageSize) {
		pageno = localSynap.pageSize;
	}
		
	if (localSynap.isSingleLayout()) {
		localSynap.moveScroll(pageno);
	}else {
		localSynap.moveSheet(pageno);
	}
}

// SKIN READY FUNC
$(document).ready(function() {
	if (typeof localSynap.skinReadyFunc === "function") {
		localSynap.skinReadyFunc();
	}
});
