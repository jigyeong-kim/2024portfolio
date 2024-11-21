
// word_body.js
console.log( 'word_body.js');

localSynap = (function() {
	pageLoader = function () {
		this.curHeight = 0;
		this.pageSize = 1; // 총 페이지 수
		this.list =new Array();
		this.cnt = 0;
		this.header=0;
		this.footer=0;
		
		this.fileNum = 1; // 렌더링된 파일수
		this.parent_node_name = '#content_body';
		this.div_page_name = 'div_page';
		this.pagebreaker = function (div) {
			this.curHeight = 0;
			var clone = this.header.clone()
			$(clone).find('.pagenumber').text(this.pageSize);
			$(div).append(clone);
			for(i=0; i<this.cnt; i++) {
				$(div).append(this.list[i]);
			}
			clone = this.footer.clone();
			$(clone).find('.pagenumber').text(this.pageSize);
			$(div).append(clone);
			this.cnt = 0;
			this.pageSize++;
			$(this.parent_node_name).append(div);
			$(this.parent_node_name).append('<div class="pagebreaker">&#160;</div>');
			div = document.createElement('div');
			$(div).attr('id', this.div_page_name);
			$(div).attr('class', 'inner page');
			return div;
		}
		
		this.getPtToPx = function (size_pt){
			return (size_pt * (96/72));
		}
		
		this.getPxToPt = function (size_px){
			return (size_px * (72/96));
		}
		
		this.makePage = function (p, div) {
			var currentFontSize = this.getPxToPt(parseInt(p.css('font-size')));
			var pHeight = this.getPxToPt(parseInt(p.outerHeight(true)));

			var oldCurHeight = this.curHeight;
			if( p[0].tagName == 'DIV' ) {
				if( p.css('position') == 'absolute' ) {
					pHeight = 0;
				}
				if( p.css('z-index') != 'auto' && p.css('z-index') != 0 ) {
					pHeight = 0;
				}
			}
			this.curHeight += pHeight;
			if( localSynap.bodyHeight <= this.curHeight && oldCurHeight > localSynap.bodyHeight/2 ) {
				div = this.pagebreaker(div);
				this.curHeight += pHeight;
			}
			if (BROWSER.PC.isIE()) {
				this.list[this.cnt++] = $(p[0].outerHTML);
			} else {
				this.list[this.cnt++] = p;
			}
			return div;
		}
		
		this.appendContent = function (contents) {
			$('#hidden_section').append(contents);
			$('#hidden_section').css('display', '');
			if( this.header == 0 ) {
				
				this.header = $('#hidden_section > #synap_word_header');
				$(this.header).find('.pagenumber').text(1);
				$(this.header).find('.totalnumber').text(1);
				$(this.header).removeAttr('style');
			}
			if( this.footer == 0 ) {
				this.footer = $('#hidden_section > #synap_word_footer');
				$(this.footer).find('.pagenumber').text(1);
				$(this.footer).find('.totalnumber').text(1);
				$(this.footer).removeAttr('style');
			}
			var div = document.createElement('div');
			$(div).attr('id', this.div_page_name);
			$(div).attr('class', 'inner page');
			
			var hidden_section_name;
			if (localSynap.getFileType()==='hwp97'){
				hidden_section_name = '#hidden_section >  #div_page';
			}else{
				hidden_section_name = '#hidden_section';
			}
			var self_obj = this;
			$(hidden_section_name).children().each( function() {
				var p = $(this);
				if( p[0].tagName == 'STYLE'  || p[0].tagName == 'META' || p[0].tagName == 'TITLE') {
					p.remove();
				} else {
					if( p[0].className == 'pagebreaker' ) {
						div = self_obj.pagebreaker(div);
						p.remove();
					}else{
						div = self_obj.makePage(p, div);
						p.remove();
					}
				}
			});
			if( this.fileNum == localSynap.filesPageCount && this.cnt > 0 ) {
				$(this.header).find('.pagenumber').text(this.pageSize);
				$(div).append(this.header);
				for(i=0; i<this.cnt; i++) {
					$(div).append(this.list[i]);
				}
				$(this.footer).find('.pagenumber').text(this.pageSize);
				$(div).append(this.footer);
				$(this.parent_node_name).append(div);
				$('.totalnumber').text(this.pageSize);
			}
			$('#hidden_section').css('display', 'none');
		}
		
		this.iFrameForceReflow = function(){ // 스킨용
			if ($('#innerWrap') != null){
				var h = $('#innerWrap').height();
				$('#innerWrap').height(h + 1);
				$('#innerWrap').height(  h  );
			}
		}
		
		this.loadPageLast = function (){
			removeSpinner();
			if (BROWSER.isMobile()){
				if (BROWSER.VERSION.isAndroidICS()){
					setTimeout('localSynap.imageFinish();', 800);
				}
				if( BROWSER.VERSION.isAndroidJellyBean() ){  // 스킨용
					this.iFrameForceReflow();
				}
				member.changeAndroid2Footer();
			}
			localSynap.completed = 1;
			localSynap.onLoadedBody && localSynap.onLoadedBody();
		}
		
		this.setFocusBody = function () {
			// for keyboard navigation
			if(!BROWSER.isMobile()) {
				var innerWrap = window.parent.document.getElementById('innerWrap');
				// TODO : IE7에서 contentDocument를 contentWindow.document로 똑같이 쓸 수 있다.
				if (innerWrap && innerWrap.contentDocument){
					var innerBody = innerWrap.contentDocument.getElementsByTagName('body')[0];
					innerWrap.focus();
					innerBody.focus();
				}
			}
		}
	}
	
	var member = {
		reTry : 0,
		isAppend : 1,
		refreshTimer : null,
		pageLoader: undefined,
		fileExt : '.htm',

		_replaceAll : function (str, searchStr, replaceStr) {
			return str.split(searchStr).join(replaceStr);
		},

		changeAndroid2Footer : function () {
			if (typeof localSynap.resize =='function'){
				localSynap.resize(); // 다 그리고 난 후에 브라우저가 header를 다시 그릴 수 있도록 해야함
			}
			// type이 싱글일 경우
			if ( BROWSER.GRAPHIC.isDrawCanvas() ) { // Android 2.3.6
				initSingle();
				afterSingle(); 
			}
		},

		loadPageAlreadyMake : function () {
			clearTimeout(member.refreshTimer);
			if( member.isAppend == 1 && member.pageLoader.fileNum <= localSynap.filesPageCount ){
				member.isAppend = 0;
				fileName = localSynap.getFileResultDir().split('/').pop()+'/'+member.pageLoader.fileNum + member.fileExt;
                if( BROWSER.MOBILE.isIOS() && BROWSER.VERSION.IOS() <= 7 ){
					fileName = localSynap.getResultDir() + fileName;
				}
				$.ajax(encodeURI(fileName),
					{
					dataType : 'html',
					success : function(contents) {
						if(member.pageLoader.fileNum==localSynap.filesPageCount) {
							for(var lx=14; lx<32; lx++) {
								if(contents.substr(contents.length-lx, 7)=="</body>") {
									contents = contents.substring(0, contents.length-lx);
									break;
								}
							}
						}
						if (BROWSER.isMobile() && BROWSER.GRAPHIC.isNotIFrame()){
							var findStr = localSynap.getFileName()+'.files';
							contents = member._replaceAll(contents, findStr, localSynap.getFileResultDir());
						}
						try {
							$(member.pageLoader.parent_node_name).append(contents); // Todo... parent_node 입력받고 있음
							$('p.synap-single-line-display').each(function(index, elem){
								var $pp = $('#hidden_section').prepend(elem.cloneNode(true));
								var doubleLineHeight = $pp.outerHeight() * 2 - 1;	// IE 1Line : 26, 2Line : 51 case fix

								$(elem).removeClass('synap-single-line-display');
								$pp.empty();

								var initHeight = $(elem).outerHeight();
								if( initHeight < doubleLineHeight) return;
								
								var s = parseFloat($(elem).find('span').css('letter-spacing')), e = -1;
								while( $(elem).outerHeight() >= doubleLineHeight && e > -30){
									e *= 2;
									$(elem).find('span').css('letter-spacing', s + e + 'pt');
								}
								if( $(elem).outerHeight() == initHeight ){		// Single-line view fail
									console.log && console.log('single-line-process Error');
									$(elem).find('span').css('letter-spacing', s + 'pt');
									return;
								}

								var mid = (s+e)/2.0;
								while( s - mid > 0.05 ){
									$(elem).find('span').css('letter-spacing', mid + 'pt');
									
									if( $(elem).outerHeight() < doubleLineHeight ){
										e = mid;
									}else{
										s = mid;
									}
									mid = (s+e) / 2;
								}
								$(elem).find('span').css('letter-spacing', e + 'pt');
							});
							member.isAppend = 1;
							member.pageLoader.fileNum++;
							member.pageLoader.setFocusBody();
						}catch(e){
							member.isAppend = 1;
							console.log('error='+e);
						}
						if(member.pageLoader.fileNum>=localSynap.filesPageCount) {
							member.refreshTimer = setTimeout('localSynap.loadPage();', 1000);
						}else{
							loadSpinner('page1');
							member.refreshTimer = setTimeout('localSynap.loadPage();', 500);
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						member.isAppend = 1;
						if(member.pageLoader.fileNum>=localSynap.filesPageCount) {
							member.refreshTimer = setTimeout('localSynap.loadPage();', 1000);
						}else{
							member.refreshTimer = setTimeout('localSynap.loadPage();', 500);
						}
					}
				});
			} else if (member.pageLoader.fileNum == (localSynap.filesPageCount+1)){
				member.pageLoader.fileNum++;
				member.pageLoader.pageSize = localSynap.filesPageCount;
				member.pageLoader.loadPageLast();
			}
		},
		
		loadPageMake : function () {
			clearTimeout(member.refreshTimer);
			if( member.isAppend == 1 && member.pageLoader.fileNum <= localSynap.filesPageCount ){
				member.isAppend = 0;
				fileName = localSynap.getFileResultDir().split('/').pop()+'/'+member.pageLoader.fileNum + member.fileExt;
				if( BROWSER.MOBILE.isIOS() && BROWSER.VERSION.IOS() <= 7 ){
					fileName = localSynap.getResultDir() + fileName;
				}
				$.ajax(encodeURI(fileName),
				{
					dataType : 'html',
					success : function(contents) {
						if(member.pageLoader.fileNum==localSynap.filesPageCount) {
							for(var lx=14; lx<32; lx++) {
								if(contents.substr(contents.length-lx, 7)=="</body>") {
									contents = contents.substring(0, contents.length-lx);
									break;
								}
							}
						}
						if (BROWSER.isMobile() && BROWSER.GRAPHIC.isNotIFrame()){
							var findStr = localSynap.getFileName()+'.files';
							contents = member._replaceAll(contents, findStr, localSynap.getFileResultDir());
						}
						try {
							member.pageLoader.appendContent(contents);
							member.isAppend = 1;
							member.pageLoader.fileNum++;
							member.pageLoader.setFocusBody();
							// PRJAM-4316 이미지 복사방지
							localSynap = getSynapPageObject();
							if(!typeof properties == "undefined" && !localSynap.isAllowCopy()) {
								if(BROWSER.isMobile()) {
									$((member.pageLoader.parent_node_name+' img[src]')).each(function() {
										var src = this.getAttribute('src');
										this.removeAttribute('alt', '');
										this.removeAttribute('src', '');
										this.setAttribute('style', this.getAttribute('style') + ';background-image:url(' + src + ');');
										this.style.backgroundSize = this.style.width + " " + this.style.height;
									});
								}
							}
						}catch(e){
							member.isAppend = 1;
							member.reTry++;
							console.log('error='+e);
						}
						if (member.reTry<10){
							if(member.pageLoader.fileNum>=localSynap.filesPageCount) {
								member.refreshTimer = setTimeout('localSynap.loadPage();', 1000);
							}else{
								loadSpinner('page');
								member.refreshTimer = setTimeout('localSynap.loadPage();', 500);
							}
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						member.isAppend = 1;
						if(member.pageLoader.fileNum>=localSynap.filesPageCount) {
							member.refreshTimer = setTimeout('localSynap.loadPage();', 1000);
						}else{
							member.refreshTimer = setTimeout('localSynap.loadPage();', 500);
						}
					}
				});
			} else if (member.pageLoader.fileNum == (localSynap.filesPageCount+1)){
				member.pageLoader.fileNum++;
				member.pageLoader.loadPageLast();
			}
		},
		init: function() {
			if (member.pageLoader == undefined) {
				member.pageLoader= new pageLoader();
			}
			if(BROWSER.adjustXhtml()) {
				member.fileExt = '.xhtml';
			}
			docKeyboardControl();
		}
	}

	var wordbody = {
		completed : 0,
		start : function(){
			member.init();
			wordbody.loadPage();
		},

		loadPage : function(){
			if (localSynap.getFileType()==='hwp2k'){
				member.loadPageAlreadyMake();
			}else{
				member.loadPageMake();
			}
		},
		imageFinish : function (){
			var newp = document.createElement('p');
			$(newp).text('0');
			$(newp).css('color','#c0c0c0');
			$('body').append(newp);
		},
		getPageSize : function (){
			return member.pageLoader.pageSize;
		}
	}
	return $.extend(localSynap, wordbody);
})();

function getUrlExt(url){
	var strUrl = url.substr(url.lastIndexOf('/') + 1);
	var extName = strUrl.substr(strUrl.lastIndexOf(".")+1, strUrl.length);
	return extName;
}
function getUrlName(url){
	var strUrl = url.substr(url.lastIndexOf('/') + 1);
	return strUrl;
}
function getUrlNameExceptExt(url){
	var strUrl = url.substr(url.lastIndexOf('/') + 1);
	var strName = strUrl.substr(0, strUrl.lastIndexOf("."));
	return strName;
}

function getUrlDir(url){
	var strUrl = url.substr(0, url.lastIndexOf('/')+1);
	return strUrl;
}

function getXml(fileName) {
	xmlUrl = fileName + '.xml';
	$.ajax({
		type: 'GET',
		async: false,
		url: xmlUrl,
		dataType: 'xml',
		success: parseXML
	});
};

function parseXML(xml) {
	localSynap.infoXml = xml;
	localSynap.fileType = $(localSynap.infoXml).find('file_type').text();
	localSynap.fileName = $(localSynap.infoXml).find('file_name').text();
	
	localSynap.pageSize = 0;
	localSynap.filesPageCount = parseInt($(localSynap.infoXml).find('filespage_cnt').text());
	localSynap.pageHeight = parseInt($(localSynap.infoXml).find('height').text());
	localSynap.pageWidth = parseInt($(localSynap.infoXml).find('width').text());
	localSynap.pageMarginTop = parseInt($(localSynap.infoXml).find('margin_top').text());
	localSynap.pageMarginBottom = parseInt($(localSynap.infoXml).find('margin_bottom').text());
	localSynap.pageMarginLeft = parseInt($(localSynap.infoXml).find('margin_left').text());
	localSynap.pageMarginRight = parseInt($(localSynap.infoXml).find('margin_right').text());
	
	localSynap.bodyHeight = localSynap.pageHeight - localSynap.pageMarginTop - localSynap.pageMarginBottom;
	localSynap.bodyWidth = localSynap.pageWidth - localSynap.pageMarginLeft - localSynap.pageMarginRight;
}

function loadSpinner(pageClassName){
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
	document.getElementById('content_body').appendChild(target);
	var spinner = new Spinner(opts).spin(target);
}

function removeSpinner(){
	$('.loading_spinner').remove();
}

function replaceDocument(fileNameOnly, extName) {
	if (BROWSER.adjustXhtml() && extName=="htm") {
		document.location.replace(fileNameOnly+".view.xhtml");
	} else if (BROWSER.adjustHtml() && extName=="xhtml") {
		document.location.replace(fileNameOnly+".view.htm");
	}
}

localSynap.contentReadyFunc = function() {
	window.onscroll = function(e){
		localSynap.onScroll && localSynap.onScroll(e);
	}
		
	if (typeof localSynap.properties.xmlObj == "undefined") { // view.htm을 직접 호출하는 경우
		var viewFileName = getUrlName(document.location.pathname); //xxx.hwp.view.htm
		var extName = getUrlExt(document.location.pathname); // htm
		var viewFileNameOnly = getUrlNameExceptExt(viewFileName); //xxx.hwp.view
		var fileNameOnly = getUrlNameExceptExt(viewFileNameOnly); //xxx.hwp

		replaceDocument(fileNameOnly, extName);
		getXml(fileNameOnly);
		localSynap.getFileName = function() {
			return localSynap.fileName;
		}
		localSynap.getFileType = function() {
			return localSynap.fileType;
		}
		localSynap.getFileResultDir = function(){
			return (getUrlDir(document.location.pathname) + localSynap.fileName + '.files');
		}
	}else{
		parseXML(localSynap.properties.xmlObj);
	}
	localSynap.start();
}

// DOCUMENT READY FUNC
$(document).ready(function() {
	localSynap.contentReadyFunc();
});
