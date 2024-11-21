/*  게시판 */
function addCellHeader(table) {
    if (!table) {
        return false;
    }
    //console.log(table);
    var trs = table.getElementsByTagName('tr');
    var trsChild;
    var grid = {};
    var cells;

    for (var i = 0, cntI = trs.length; i < cntI; i++) {
        if (!grid[i]) {
            grid[i] = {};
        }
        trsChild = trs.item(i).childNodes;
        cells = 0;
        for (var j = 0, cntJ = trsChild.length; j < cntJ; j++) {
            if (trsChild[j].nodeType == 1) {
                grid[i][cells++] = trsChild[j];
            }
        }
    }

    var cellHeader = '';
    for (row in grid) {
        if (row == 0) {
            continue;
        }
        for (cell in grid[row]) {
            if (cell == 0) {
                continue;
            }
            //cellHeader = grid[0][cell].innerHTML + ' - ' + grid[row][0].innerHTML
            cellHeader = grid[0][cell].innerHTML + '：' ;
            grid[row][cell].setAttribute('data-cell-header', cellHeader);
        }
    }
}

$( document ).ready(function() {
    var bbsTableRwdb   = $("table[data-rwdb='yes']");
    if(bbsTableRwdb.length > 0){
        var thisTable = bbsTableRwdb.attr('class').replace(/ /g, '.');
            if(navigator.appVersion.indexOf("MSIE 7.")==-1 && navigator.appVersion.indexOf("MSIE 8.")==-1) {
                addCellHeader(document.querySelector('.'+ thisTable));
            }
    }
});



/* faq */
function faqList(list) {
    var faqList = $(list).find(".list > dt");
    var faqBtn_Qpen = faqList.find("button");

    faqBtn_Qpen.on("click", function () {

        var item = $(this).parent('dt');

        if (item.hasClass('active')) {
            item.removeClass("active");
            item.next("dd").slideUp('fast');
        }
        else {
            faqList.not(item).each(function () {
                $(this).removeClass("active");
                $(this).next("dd").slideUp('fast');
            });
            item.addClass("active");
            item.next("dd").slideDown('fast');
        }
    });
}

//2020-07-17 서정한 추가 올림픽파크 FAQ 닫기버튼 https://www.gn.go.kr/olympicpark/selectBbsNttList.do?bbsNo=682&key=4218
$(function () {
	$('.bbs_faq .list > dd .bbs_faq_btn .close').on('click', function(){
		var $this = $(this),
			$ParentDD = $this.parents('dd'),
			$ParentDT = $ParentDD.prev('dt');
		$ParentDT.removeClass('active');
		$ParentDD.slideUp('fast');
	});
});

$(function () {
    var faq   = $("[data-list='faq']");

    if(faq.length > 0) {
        var list = faq.attr('class').replace(/ /g, '.');
        $(window).on({
            load: function () {
                faqList('.'+ list)
            }
        });
    }
});

$(function () {
    var gallerItem = $(".bbs_gallery .list  a");
    gallerItem.on('mouseenter',function () {
        $(this).find('.photo').addClass("hover");
    });
    gallerItem.on('mouseleave',function () {
        $(this).find('.photo').removeClass("hover");
    });
});


// 동영상 체크
function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else
        return 99; //It is not IE
}

function checkIE(ver,seletor) {
    var ver = ver,
        seletor = seletor;

    if (GetIEVersion() <= ver) { //IE브라우전 체크 버전보다 작으면
        $(seletor + " video").remove();
    } else{
        $(seletor + " object").remove();
    }
}

function popUpCommonSimple( path , winName , widthSize , heightSize ){
	var winHandle;
	var topPoint = (window.screen.height-heightSize)/2;
	var leftPoint = (window.screen.width-widthSize)/2;
	if(winHandle)winHandle.close();
	 winHandle = window.open( path , winName, "width="+ widthSize +", height=" + heightSize + ", status=0, location=0, menubar=0, toolbar=0, scrollbars=auto, help=0, hide=0, center=yes, left=" + leftPoint + ", top=" + topPoint );
	if(winHandle==null){
	   alert("사용자 설정에 의해 팝업이 차단되었습니다. \n\n자세한 내용을 보시려면 [도구]-[인터넷옵션]-[개인정보] 화면에서 팝업차단 체크를 해제하여 주십시오."); 
	}else{
	 winHandle.focus();
	}
	return winHandle;
}

function popUpCommonSimpleScroll( path , winName , widthSize , heightSize, scrollbars ){
	var winHandle;
	var topPoint = (window.screen.height-heightSize)/2;
	var leftPoint = (window.screen.width-widthSize)/2;
	
	if(winHandle)winHandle.close();
	
	if(gfn_isNull(scrollbars)) scrollbars = "auto";
	
	try {
		winHandle = window.open( path , winName, "width="+ widthSize +", height=" + heightSize + ", location=no, status=no, menubar=no, toolbar=no, scrollbars=" + scrollbars + ", help=no, hide=no, center=yes, left=" + leftPoint + ", top=" + topPoint );
		winHandle.focus();
	} catch(e) {
		alert("사용자 설정에 의해 팝업이 차단되었습니다. \n\n자세한 내용을 보시려면 [도구]-[인터넷옵션]-[개인정보] 화면에서 팝업차단 체크를 해제하여 주십시오.");
	}
	
	return winHandle;
}

var jusoSelector = {};

function fn_postCodeSearch(zipcodeId,addressId,detailAddressId)
{
	jusoSelector.zipcodeId = zipcodeId;
	jusoSelector.addressId = addressId;
	jusoSelector.detailAddressId = detailAddressId;
	var path = "/common/juso/jusoPopup.jsp";
	popUpCommonSimple( path , 'postcode', 460,450 );
}

function jusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn){
	document.getElementById(jusoSelector.zipcodeId).value = zipNo;
	document.getElementById(jusoSelector.addressId).value = roadAddrPart1 + roadAddrPart2;
	document.getElementById(jusoSelector.detailAddressId).value = addrDetail;
}

function fn_deleteBbsNtt( url ) {
	if( confirm("삭제하시겠습니까?") ) {
		window.location = url;
	}
}

function fn_sendTwitter( url ) {
	window.open( url, "twitter", "" );
}

function fn_sendFacebook( url ) {
	window.open( url, "facebook", "" );
}

function fn_validateBbsNttComment( frm ) {
	if( !frm.commentCn.value ) {
		alert("댓글 내용을 입력해주세요.");
		return false;
	}
	return true;
}

function fn_deleteBbsNttComment( url ) {
	if( confirm("댓글을 삭제하시겠습니까?") ) {
		window.location = url;
	}
}

function fn_changeDept(select, id) {
	var option = select.options[select.selectedIndex],
		value = option.value;
		text = option.text.trim();
	if( !value ) {
		document.getElementById(id).value = "";
	} else {
		document.getElementById(id).value = text;
	}
}

//Jquery Ajax Json 전송
function gfn_jqueryAjaxJsonSend(url, jsonData, method, async, errCallBack, sucessCallBack) {
	var objAjax = $.ajax({
		type        : method,
		url         : url,
		data        : jsonData,
		async       : async,
		error       : errCallBack,
		success     : sucessCallBack
	});
	
	return objAjax;
}

//20180820 add code start

//=================================================
//Null값 체크
//=================================================
function gfn_isNull(value) {

if("OBJECT"     == (typeof value).toUpperCase()) return false;
if("BOOLEAN"    == (typeof value).toUpperCase()) return false;
if(value == "") return true;
if(value == null) return true;
if(value == undefined) return true;

//if((typeof value).toUpperCase() == "OBJECT") return false;

	return false;
}

//=================================================
//브라우저 종류 반환
//=================================================
function gfn_getBrowser() {
	var returnBrowser = "";
	var Browser = {
		    chk : navigator.userAgent.toLowerCase()
		}
		  
		Browser = {
		    ie : Browser.chk.indexOf('msie') != -1,
		    ie6 : Browser.chk.indexOf('msie 6') != -1,
		    ie7 : Browser.chk.indexOf('msie 7') != -1,
		    ie8 : Browser.chk.indexOf('msie 8') != -1,
		    ie9 : Browser.chk.indexOf('msie 9') != -1,
		    ie10 : Browser.chk.indexOf('msie 10') != -1,
		    ie_trident : Browser.chk.indexOf('trident') != -1,
		    opera : !!window.opera,
		    safari : Browser.chk.indexOf('safari') != -1,
		    safari3 : Browser.chk.indexOf('applewebkir/5') != -1,
		    mac : Browser.chk.indexOf('mac') != -1,
		    chrome : Browser.chk.indexOf('chrome') != -1,
		    firefox : Browser.chk.indexOf('firefox') != -1
		}
		  
		if (Browser.chrome) {
			returnBrowser = "chrome";		// 크롬
		} else if(Browser.firefox) {
			returnBrowser = "firefox";		// 파이어폭스
		} else if(Browser.mac) {
			returnBrowser = "mac";			// Mac
		} else if(Browser.safari || Browser.safari3) {
			returnBrowser = "safari";		// 사파리
		} else if(Browser.opera) {
			returnBrowser = "opera";		// 오페라
		} else {
			returnBrowser = "msie";			// 익스플로러
		}
	return returnBrowser;
}

//=================================================
//팝업창 호출
//=================================================
function gfn_windowResize(objWindow, widthSize, heightSize, addWidthSize, addHeightSize) {
	var	objDocument;
	var marginWidth;
	var marginHeight;
	
	// 객체가 Null인지 체크
	if(gfn_isNull(objWindow)) return false;
	
	// 기본값 설정
	objDocument 	= $(objWindow.document);
	objBody 		= $(objWindow.document.body);
	
	// widthSize 값이 존재하는지 체크
	if(gfn_isNull(widthSize))		widthSize		= objBody.prop("scrollWidth");
	
	// heightSize 값이 존재하는지 체크
	if(gfn_isNull(heightSize)) 		heightSize		= objBody.prop("scrollHeight");
	
// addWidthSize 값이 존재하는지 체크
if(gfn_isNull(addWidthSize))    addWidthSize    = 0;

// addHeightSize 값이 존재하는지 체크
if(gfn_isNull(addHeightSize))   addHeightSize   = 0;

	//브라우저 별로 addSize 설정
	if("msie" == gfn_getBrowser()) {
	    addHeightSize = addHeightSize + 20;
	} else {
	    addHeightSize = addHeightSize + 50;
	}
	
	// 모달인지 체크
	if(!gfn_isNull(objWindow.dialogArguments) && "msie" == gfn_getBrowser()) {
		objWindow.dialogWidth	= (widthSize	+ addWidthSize	)	+ "px";
		objWindow.dialogHeight 	= (heightSize 	+ addHeightSize )	+ "px";
	} else {
		objWindow.resizeTo(widthSize + addWidthSize, heightSize + addHeightSize);
	}
	
	return true;
}

//20180820 add code end