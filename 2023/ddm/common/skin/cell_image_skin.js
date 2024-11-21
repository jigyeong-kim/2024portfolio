// cell_image_skin.js
console.log( 'cell_image_skin.js' );
var defaultDPI = 96;
var enableScrollEvent = true;
var enableZoomEvent = true;
var LIMIT_NUMBER = 999999;

var enableMockDebug = false;

$.extend(localSynap, (function() {
	var member = {
		// jQuery객체에 접근하기 위한 변수(성능관련)
		$cellFrame: undefined,
		// 화면에 표시되는 영역을 관리하는 변수
		arrPageShowList: [],
		// webaccess표시여부
		didWebaccess: {},

		convertServerUri : localSynap.properties.contextPath,
		offsetGetImageSize : 30,
		cellPieceWidth : 1000,   // 셀의 부분 조각으로 렌더링시 기본 너비(데스크탑과 모바일의 기본값은 다르다.)
		cellPieceHeight : 1000,  // 셀의 부분 조각으로 렌더링시 기본 높이
		sheetWidth : 0,
		sheetHeight : 0,
		iframe_margin : 8,

		parseImgData : function(key, dpi) {
			dpi = dpi || defaultDPI;
			var sheetIdx = localSynap.curPage - 1; // sheetno
			// 이미지 사이즈는 초기에만 호출하고, 차후에 동적로딩에서 재보정 하든지 한다.
			member.getImageSize(key, sheetIdx, dpi);
		},

		// 이미지 요청하여 받아오는 함수
		getImagePath: function(row, col){
			if (localSynap.jobId != undefined) {
				return member.convertServerUri + localSynap.objList[row][col].path;
			}else{
				return localSynap.getResultDir()+encodeURI(localSynap.objList[row][col].path);
			}
		},		
		eventDesktopScroll : function (event) {
			//len = localSynap.pageSize;
			console.log('eventDesktopScroll');
			if (enableScrollEvent) {
                member.updatePageFocus();
			}
			enableScrollEvent = true;
			localSynap.onScroll && localSynap.onScroll(event);
		},

		getImageSize : function (key, pageIdx, dpi) {
			pageIdx = (typeof pageIdx !== "undefined") ? pageIdx : 0;
			dpi = (typeof dpi !== "undefined") ? dpi : defaultDPI;
			var obj = {
				index: 0,
				path: "",
				w: 0,
				h: 0
			};
			var url = member.convertServerUri + '/dimension/' + key
                + '/' + pageIdx + '?dpi=' + dpi;
			$.ajax({
				type: "GET",
				url: url,
				async: false,  // dimension은 스킨 진행전에 필수적으로 호출해야하므로, sync로 한다.
				dataType: "json",
				error: function(data){
					//alert('error')
				},
				complete : function(data){
					//alert('complate')
				},
				success:function(data) {
					$.each(data, function (idx, elem) {
						if (typeof localSynap.objList[elem.p] != "undefined") return;
						member.sheetWidth = elem.w;
						member.sheetHeight = elem.h;

						// 전체 페이지를 자른상태에서의 index 범위를 계산합니다.
						colSize = Math.ceil(member.sheetWidth/member.cellPieceWidth);
						rowSize = Math.ceil(member.sheetHeight/member.cellPieceHeight);
						lastColWidth = ((member.sheetWidth%member.cellPieceWidth)==0)?member.cellPieceWidth:member.sheetWidth%member.cellPieceWidth;
						lastRowHeight = ((member.sheetHeight%member.cellPieceHeight)==0)?member.cellPieceHeight:member.sheetHeight%member.cellPieceHeight;

						cell.countColumn = colSize;
						cell.countRow = rowSize;
						cell.lastColWidth = lastColWidth;
						cell.lastRowHeight = lastRowHeight;
						
						for (var row=0; row<rowSize; row++) {
							localSynap.objList[row] = new Array();							
							for (var col=0; col<colSize; col++) {
								var width = member.cellPieceWidth;
								var height = member.cellPieceHeight;
								
								if(row==(cell.countRow-1)) {
									height = cell.lastRowHeight;
								}
								if(col==(cell.countColumn-1)) {
									width = cell.lastColWidth;
								}
								obj_cell = {
									path: '/thumbnail/'+key+'/'+ (pageIdx) + '?dpi=' + defaultDPI + '&x=' + (col*member.cellPieceWidth+1) + '&y=' + (row*member.cellPieceHeight+1)+ '&w=' + width + '&h=' + height,
									w: width,
									h: height,
									loded: false
								};
								localSynap.objList[row][col] = obj_cell;
							}
						}
					});
				}
			});
		},
		/*
		// 본문영역의 alt에 페이지텍스트를 넣어주는 함수
		setForWebaccess: function (pageIndex) {
			if ( localSynap.properties.webAccessibility == false ) {
				return false;
			}
			if ( !pdfSearch.$pageTextObj[pageIndex] ) {
				var xmlPath = localSynap.getTextXmlPath(pageIndex);
				pdfSearch.parsePlainTextXml(xmlPath, pageIndex, function (pageIndex, plainText) {
					// 썸네일alt추가
					$('#page'+pageIndex).attr('title', plainText);
				});
			} else {
				$('#page'+pageIndex).attr('title', pdfSearch.getPlainText(pageIndex));
			}
			return true;
		},*/
		
		iframeScroll: function(){
			console.log('iframe scroll');
		},
		initEvent: function() {
			if (BROWSER.isMobile()){
				member.initEventMobile();
			} else {
				member.initEventDesktop();
			}
			if (localSynap.hasCellFrame()){
				if( BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9){
					$(window).scroll(member.eventDesktopScroll);
				}else{
					$(document).scroll(member.eventDesktopScroll);
				}
			}			
		},

		initEventDesktop: function() {
			$(document).delegate('#searchBoxBtn', 'click', function () {
				$('#searchBox').toggleClass('activePop');
				$('#searchText').focus();
			});
			$(document).delegate('#searchText', 'focus', function (event) {
				preventKeydown = true;
			});
			$(document).delegate('#searchText', 'focusout', function (event) {
				preventKeydown = false;
			});
			$(document).delegate('#searchText', 'keydown', function (event) {
				if(event.keyCode==13) {
					prev = false;
					if (event.shiftKey) {
						prev = true;
					}
					//console.log("search enter", prev);
					pdfSearch.search($('#searchText').val(), prev);
				}
			});
			$(document).delegate('#prevSearchTextButton', 'click', function () {
				try{
					var targetText = $('#searchText').val();
					pdfSearch.search(targetText, true);
				} catch(e) {
					//console.log("no search result");
				}
			});
			$(document).delegate('#nextSearchTextButton', 'click', function () {
				try{
					var targetText = $('#searchText').val();
					pdfSearch.search(targetText, false);
				} catch(e) {
					//console.log("no search result");
				}
			});

			$(document).keydown(function(e) {
				// Ctrl + F
				if (e.ctrlKey && e.keyCode == 70 ) {
					e.preventDefault();
					$box = $('#searchBox');
					$input = $('#searchText');
					if ($box.hasClass('activePop') == true) {
						if ($input.get(0) == document.activeElement) {
							$box.toggleClass('activePop');
						}
					} else {
						$box.toggleClass('activePop');
					}
					$input.focus();
				}
			});

		},
		initEventMobile: function() {
			$(window).on("orientationchange",function(){
				if ( BROWSER.MOBILE.isGalaxyNote3() ) {
					$('#wrap').css('height', $(window).height() - $('#header').height());
				}
			});
		},
		createCellCSSElement: function (totalWidth, itemWidth, lastItemWidth, height, lastItemHeight) {
			var cellDivArea = $("#cellCommonDiv");
			cellDivArea.css('width', totalWidth);
			cellDivArea.css('height', height);
			cellDivArea.css('clear', 'both');
			cellDivArea.css('overflow', 'hidden');
			cellDivArea.css('background-color', '#FF0000');
		},		
		createCellImgElement: function (row, col, width, height, colSize) {
			// Element만 만든다. 실제 그리는 것은 drawCell에서 한다.
			var x = col*member.cellPieceWidth;
			var y = row*member.cellPieceHeight;
			
			if($('#cellpage' + row + '_'+ col).length!=0){
				return '';
			}
			var failImagePath = 'image/common/img_loading.png';
			var html= '<div id="cellpage' + row + '_' + col + '" name="cellpage' + row + '_' + col +'" style="width:' + width + 'px;height:' + height + 'px;float:left;">';
			html += '<img id="piece' + row + '_' + col +'" name="piece' + row + '_' + col + '" style="background-position: 50% 50%; background-repeat: no-repeat; background-image: url('
				+ failImagePath  + ');width:' + width + 'px;height:'+ height + 'px;user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-drag:none;-webkit-user-select:none;-ms-user-select:none;" src="" onerror="image_error(this,' + row + ',' + col + ')" onload="onLoadImg(this,'+ row + ',' + col + ',' + width + ',' + height +',' + colSize + ')" title="" alt="" />';
			html += '</div>';
			return html;
		},	
		// 한줄단위 이미지를 감쌀 Div를 생성
		createCellRowElement: function (itemWidth, lastItemWidth, height, colSize, rowIdx, colIdx) {
			var html = '<div class="CellCommonDiv"';
			html+= ' style="width:' + member.sheetWidth + 'px;height:' + height + 'px;clear:both; overflow:hidden;"';
			html+= '>';
			for (var i=colIdx; i<colSize; i++) {
				var currWidth = itemWidth;
				if(i==colSize-1) {
					currWidth = lastItemWidth;
				}
				html+= member.createCellImgElement(rowIdx, i, currWidth, height, colSize);
			}
			html+= '</div>';
			return html;
		},	
		resize: function() {
			if (BROWSER.isMobile()){
			}else{
				member.resizeDesktop();
			}
		},
		
		resizeDesktop: function() {
			setResizeHeaderTitle(); // #DEFECT-2580 title resize를 위해 호출
		},

        updatePageFocus: function () {
			cell.imageReload('piece', member.arrPageShowList);
        }
    };

	var cell = {
		curPage: 1,
		FILENAME: encodeURI(localSynap.getFileName()),
		pageSize: 0,  // api.js 에서도 pageSize를 설정해주는데, 여기에서 덮어씌우는건 아닌가?
		pxToPtRatio: undefined,
		scrollTopValue: 0,
		//loadedImgCount: 0,
		countColumn: 0,
		countRow: 0,
		lastColWidth: 0,
		lastRowHeight: 0,
		// 배율이 적용된 페이지정보 리스트. 주로 사용되는 객체
		objList: [],
		init_row: 0,
		refreshTimer: null,
		/*INIT_IMAGE_LIMIT: 10, // 동적로딩 갯수. LIMIT_NUMBER로 설정하면 동적로딩을 하지 않는다.
		highlightQueue: null,
		*/
        /*
          스케일바 클릭 이벤트 핸들러
          scaleIdx: 스케일바에서 클릭한 인덱스
        */
		// 셀 이미지 위에 생성할 텍스트를 가져온다.
		parseTextXmlWithKey: function (rowIdx, colIdx, width, height, pageIdx) {
			key = localSynap.jobId;
			var xmlUrl = member.convertServerUri +'/thumbnailxml/'+key+'/'+(localSynap.curPage-1)+'?dpi='+defaultDPI+'&x=' + (colIdx*member.cellPieceWidth+1) + '&y=' + (rowIdx*member.cellPieceHeight+1)+ '&w=' + width + '&h=' + height;

			// mock 서버의 경우
			if(enableMockDebug) {
				xmlUrl = member.convertServerUri +'/thumbnailxml/'+key+'/'+ (localSynap.curPage-1)+'/' + rowIdx + '_' + colIdx;
			}

			var startX = colIdx*member.cellPieceWidth+1;
			var startY = rowIdx*member.cellPieceHeight+1;
			var endX = colIdx*member.cellPieceWidth+1+width;
			var endY = rowIdx*member.cellPieceHeight+1+height;
            // 한번 출력한 텍스트를 지우지 않으므로, existCallback을 넣을필요가 없다.
            pdfSearch.loadTextXmlAsync(xmlUrl, pageIdx,
                                       undefined,
			                           function () {
	                                       var pageArea = $("#cellpage" + rowIdx + "_" + colIdx);
                                           // 8 means : iframe margin 8px
	                                       pageArea.append(pdfSearch.getSpanString(pageIdx, member.iframe_margin, member.iframe_margin));
			                           },
                                       startX, startY, endX, endY, true);

		},		

		hasCellFrame: function() {
			if (typeof member.$cellFrame != "undefined") {
				return member.$cellFrame.length>0; 
			} else {
				return false;
			}
		},
		getImagePath: function (row, col) {
			return member.getImagePath(row, col);
		},
		curDrawArea: function(obj) {
			var startX = $(document).scrollLeft();
			var startY = $(document).scrollTop();
			var endX = $(window).width() + startX;
			var endY = $(window).height() + startY;	
			obj.startCol = Math.floor(startX/member.cellPieceWidth);
			obj.startRow = Math.floor(startY/member.cellPieceHeight);
			obj.endCol = Math.ceil(endX/member.cellPieceWidth);
			obj.endRow = Math.ceil(endY/member.cellPieceHeight);
			// 앞으로 좀 더 빨리 그리도록  좀 더 호출한다.
			obj.endCol++;
			obj.endRow++;
			if(obj.endCol >= cell.countColumn) {
				obj.endCol = cell.countColumn;
			}
			if(obj.endRow >= cell.countRow) {
				obj.endRow = cell.countRow;
			}
			console.log('x='+endX+',y='+endY+',c='+obj.endCol+',r='+obj.endRow+',ph='+member.$cellFrame.height()+',wt='+$(window).scrollTop());	
		},
		
		// 초기 생성 페이지 갯수만큼 div와 img를 생성한다.
		createInitialContentDivs: function () {
			// 전체 페이지를 자른상태에서의 index 범위를 계산합니다.
			colSize = Math.ceil(member.sheetWidth/member.cellPieceWidth);
			rowSize = Math.ceil(member.sheetHeight/member.cellPieceHeight);
			lastColWidth = ((member.sheetWidth%member.cellPieceWidth)==0)?member.cellPieceWidth:member.sheetWidth%member.cellPieceWidth;
			lastRowHeight = ((member.sheetHeight%member.cellPieceHeight)==0)?member.cellPieceHeight:member.sheetHeight%member.cellPieceHeight;

			cell.countColumn = colSize;
			cell.countRow = rowSize;
			cell.lastColWidth = lastColWidth;
			cell.lastRowHeight = lastRowHeight;
			
   			// 필요한 CSS를 미리 만들어 놓는다.
			member.createCellCSSElement(member.sheetWidth, member.cellPieceWidth, lastColWidth, member.cellPieceHeight, lastRowHeight);
			
			var obj = {startCol:0, startRow:0, endCol:0, endRow:0};
			cell.curDrawArea(obj);
			// iOS는 스크롤을 못잡아서 처음부터 엘레멘트를 모두 만든다.
			if (BROWSER.isMobile() && BROWSER.MOBILE.isIOS()){
				cell.init_row = cell.countRow;
			}else{
				cell.init_row = obj.endRow;
			}
			localSynap.loadDiv(0, cell.init_row);
			member.updatePageFocus();			
		},
		// 초기 생성 페이지 외의 div와 img를 생성한다.
		createContentDivs: function (s_row, e_row) {
			for(var row=s_row; row<e_row; row++) {			
				var currHeight = member.cellPieceHeight;
				if(row==cell.countRow-1) {
					currHeight = cell.lastRowHeight;
				}
				$('#sheet').append( member.createCellRowElement(member.cellPieceWidth, cell.lastColWidth, currHeight, cell.countColumn, row, 0) );
			}
		},		

		loadDiv: function(s_row, e_row) {
			// 행이 많을 경우 한꺼번에 로딩하면 freezing됨. 0.1초 단위로 나눠서 로딩
			clearTimeout(cell.refreshTimer);
			if (e_row > cell.countRow){
				e_row = cell.countRow;
			}
			localSynap.createContentDivs(s_row, e_row);
			if (e_row < cell.countRow){
				cell.refreshTimer = setTimeout(function () {
					localSynap.loadDiv(e_row, e_row +cell.init_row);
				}, 100);
			}
		},

		// 범위 외 페이지는 이미지를 숨긴다.
		// TODO: display:none 과 src제거의 성능비교가 필요함
		refreshShowList: function (objName, startCol, startRow, endCol, endRow, arrShowList) {
			while(arrShowList.length > 0) {
				var obj_show = arrShowList.shift();
				if ((obj_show.row_idx >= startRow && obj_show.row_idx <=endRow)
				&& (obj_show.col_idx >= startCol && obj_show.col_idx <=endCol)){
					// 이미 보여지고 있으니 삭제하지 않고 배열에서만 뺀다.
				}else{
					if (!localSynap.objList[obj_show.row_idx][obj_show.col_idx].loded){
						document.getElementById(objName+(obj_show.row_idx)+'_'+(obj_show.col_idx)).src = "";
					}
				}
			}
		},
		// 동적로딩
		// + img태그의 src를 삽입한다.
		imageReload: function (objName, arrShowList) {
			var obj = {startCol:0, startRow:0, endCol:0, endRow:0};
			cell.curDrawArea(obj);
			// var pageIndex = pageNum-1;
			// var startIdx = parseInt(pageIndex-(cell.maxShowCnt/2)); // 기준의 절반 앞부터
			// startIdx = startIdx < 0 ? 0: startIdx;

			// var endIdx = startIdx + cell.maxShowCnt;
			// endIdx = endIdx >= localSynap.pageSize ? localSynap.pageSize-1 : endIdx;

			// // 텍스트출력큐에 넣는다.
			// pdfSearch.textOutputQueue.push(pageIndex);

			// 표시범위 가장자리를 벗어났을 때에만 다음 루틴으로 넘어간다.
			// 썸네일은 그냥 페이지마다 수행한다.
				// if (arrShowList[1] < pageIndex && pageIndex < arrShowList[arrShowList.length - 2]) {
					// //console.log('imageReload() pass ', pageNum);
					// return;
				// }
			cell.refreshShowList(objName, obj.startCol, obj.startRow, obj.endCol, obj.endRow, arrShowList);

			for(var row=obj.startRow; row<obj.endRow; row++) {
				for(var col=obj.startCol; col<obj.endCol; col++) {	
					elImg = document.getElementById(objName+(row)+'_'+(col));
					// 재변환 적용
					imgpath = member.getImagePath(row, col);
					if (elImg!=null){
						if (elImg.src==null || elImg.src.indexOf(imgpath) < 0) {
							elImg.src = imgpath;
						}
						//중앙정렬이 안되어서 주석처리 elImg.style.display = 'block';
						var obj_show = {row_idx:row, col_idx:col};
						arrShowList.push(obj_show);
					}
					/*if ( member.didWebaccess[i] === undefined ) {
						member.didWebaccess[i] = true;
						member.setForWebaccess(i);
					}*/
				}
			}
		},

		skinReadyFunc: function() {
			window.onresize = member.resize;
			//if (localSynap.isAllowCopy && !localSynap.isAllowCopy()) {
			//	localSynap.killCopyHtml();
			//}			
			localSynap.pageSize = localSynap.status.pageNum;
			if( BROWSER.isMobile() ){
				cell.skinReadyMobileFunc();
			}else{
				cell.skinReadyDesktopFunc();
				setResizeHeaderTitle();
				//IE9이하일 경우 javascript resize작동에 문제가 있어 수정
				if(BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9) {
					$('#headTitle').width(50);
					$('#headTitle').css('overflow','visible');
				}
			}
			setSnsButton(localSynap.properties.useSharedSns);
			containerSizeAdjust();
			setFullScreenClick();
			if (typeof localSynap.updateAfterMove == "function") {
				localSynap.updateAfterMove();
			}			
			localSynap.onLoadedBody && localSynap.onLoadedBody();
		},

		skinReadyDesktopFunc: function() {
			docKeyboardControl();
			member.$cellFrame = $('#sheet');
			member.parseImgData(localSynap.jobId);

			setDownloadButton(localSynap.downloadUrl);
			setPrintButton();
			member.initEvent();
            
            // 본문영역 설정
			localSynap.createInitialContentDivs();
			//member.arrangePageTextAsync();
		},

		skinReadyMobileFunc: function() {
			//initMobile();
			member.$cellFrame = $('#sheet');
			member.parseImgData(localSynap.jobId, 0);
		
			member.initEvent();
			
			// 초기 div를 먼저 생성한다.
			localSynap.createInitialContentDivs();
		},
		showlist: function (){
			//console.log(member.arrPageShowList);
		}
	}
	return cell;
})());

localSynap.getPageSize = function() {
	return localSynap.pageSize;
}

localSynap.getCurrentPage = function() {
	if (localSynap.curPage < 1) {
		return 1;
	} else {
		return localSynap.curPage;
	}
}


function image_retry(obj_name, row, col)
{
	$(obj_name).attr('src' , localSynap.getImagePath(row, col)).attr('onclick', '');
}

function image_error(obj, row, col)
{
	$(obj).attr('onclick', 'image_retry('+obj.name+','+row+','+col+')');
}

/*

function append_text_async(xmlObj) {
	var index = xmlObj.index;
	var $page = localSynap.$pages[index];
	if (localSynap.properties.usePdfText === false) { return; }	
	if (localSynap.$pageAreas[index].find("span").length == 0 && pdfSearch.$pageTextObj[index] ) {
		
		var $pageArea = localSynap.$pageAreas[index];
		// spanString을 만드는 도중, 텍스트출력큐에 내용이 들어오면
		// 다른페이지를 출력해야 할 때, 바로 종료한다.
		var lastQueueIndex = pdfSearch.textOutputQueue.length-1;
		if (pdfSearch.textOutputQueue.length > 0 
			&& pdfSearch.textOutputQueue[lastQueueIndex] != index
			&& pdfSearch.textOutputQueue[lastQueueIndex-1] != index) {
			//console.log("append span break!!!!!");
			return false;
		}
		if (BROWSER.PC.isIE() && BROWSER.VERSION.IE() <= 9) {
			localSynap.appendSpanTags(index);
		} else {
			$pageArea.append(localSynap.getText(index));
		}
	}
}
*/

/*
var cleanSpans = function (pageIndex) {
	//console.log('cleanSpan() start', pageIndex);
	startTime = new Date();
	len = localSynap.pageSize;
	for (var targetIdx = 0; targetIdx < len; ++targetIdx) {
		// find가 너무 자주 수행되므로, 캐싱한다면 성능향상이 기대된다.
		$spans = localSynap.$pageAreas[targetIdx].find('span');
		if( $spans.length === 0) {
			continue;
		}
		//if (targetIdx < pageIndex-1 || targetIdx > pageIndex+2) {
		if (targetIdx != pageIndex) {
			//console.log('cleaning ', targetIdx);
			// 성능개선요소
			//pa = document.getElementById('page-area'+targetIdx);
			//imgTag = pa.firstChild;
			//pa.innerHTML = imgTag.outerHTML;
			$spans.remove();
		}
	}
	endTime = new Date();
	//console.log('cleanSpan() finish ', pageIndex, " ", endTime.getTime() - startTime.getTime());
}
*/
// SKIN READY FUNC
$(document).ready(function() {
	if (typeof localSynap.skinReadyFunc == "function") {
		localSynap.skinReadyFunc();
	}
});

var onLoadImg = function(obj, row, col, width, height, colSize){
	// 서버이미지변환기/PDF는 페이지별로 텍스트XML을 파싱하고, 처리한다.
	var index = row*colSize + col;
	if (typeof localSynap.jobId !== "undefined") {
		if (localSynap.properties.usePdfText == true) {
			localSynap.parseTextXmlWithKey(row, col, width, height, index);
		}
		localSynap.objList[row][col].loded = true;
		$(obj).attr('alt', '');
		$(obj).attr('title', '');
		
	}
}


function loadSpinner(pageClassName, callback){
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
	document.getElementById('container').appendChild(target);
	var spinner = new Spinner(opts).spin(target);
	callback && callback();
}

function removeSpinner(){
	setTimeout(function(){
		$('.loading_spinner').remove();
	}, 50);
}



