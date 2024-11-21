
var remote_url = "/";

/**
 * null check
 */
function isEmpty(str) {
	if(str == "" || str == null || str == undefined){
		return true;
	}else{
		return false;
	}
};

//null to empty
function fnNullToEmpty(val){
	if(val == null || val == "null"){
		return "";
	}else{
		return val;
	}
}

/**
 * null to empty
 * date : 2020.03.30
 */
function fnNullToDash(val){
	if(val == null || val == "null"){
		return "-";
	}else{
		return val;
	}
}

/**
 * 공통 Form 객체 값을 json 형태의 변수로 변경
 */
$.fn.formSerialize = function() {
	var arrayData, objectData;
		
    arrayData = this.serializeArray();
    objectData = {};
    $.each(arrayData, function() {
        var value;
        if (this.value != null) {
            value = this.value;
        } else {
            value = '';
        }
        
        if (objectData[this.name] != null) {
            if (!objectData[this.name].push) {
                objectData[this.name] = [ objectData[this.name] ];
            }

            objectData[this.name].push(value);
        } else {
            objectData[this.name] = value;
        }
    });
    
    return objectData;
};

/**
 * java.util.StringTokenizer 구현
 */
function StringTokenizer(str, key){
    this.original = str;
    this.sentence = str;
    this.parseKey = key;
    this.accessPoint = 0;
    this.tokens = this.sentence.split(this.parseKey);

    this.hasMoreTokens = function(){
        if(this.tokens.length > this.accessPoint){
            return true;
        }else{
            return false;
        }
    };

    this.nextToken = function(){
        if(this.hasMoreTokens()){
            this.accessPoint++;
            return this.tokens[this.accessPoint-1];
        }else{
            return null;
        }
    };
};

/**
 * 숫자열을 3자리마다 "," 표 찍기
 */
function formatMoney(strNumber,mode){
	strNumber = strNumber + "";
	if (!strNumber || strNumber == "null" || strNumber == null || strNumber == "" || strNumber == "undefined" || strNumber == undefined) return ""; 
	
    var nLength;
    var i=0,j=0;
    var strResult='';
    if(mode=='INSERT'){
    	//소수점 자르기
    	var dotStr = "";
    	if (strNumber.indexOf(".") != -1) {
    		dotStr = strNumber.substring(strNumber.indexOf("."), strNumber.indexOf(".")+3);//소수점 둘째자리까지
    		strNumber = strNumber.substring(0, strNumber.indexOf(".")); 
    	}
    	
    	nLength=strNumber.length;

		j=0;
        for(i=nLength-1;i>=0;i--){
            j++;
            strResult=strNumber.substring(i,i+1)+strResult;
            if(j%3==0 && i>0){
                strResult=','+strResult;
            }
        }
        
        strResult = strResult + dotStr;
    }else if( mode=='DELETE'){
    	
    	nLength=strNumber.length;
    	
        for(i=nLength-1;i>=0;i--){
            if(strNumber.substring(i,i+1)!=','){
                strResult=strNumber.substring(i,i+1)+strResult;
            }
        }
    }
    return strResult;
}

/**
 * java.lang.String.endsWith() 구현
 */
function endsWith(str, checker){
    if(str!=null && checker!=null && str.length > checker.length){
        if(str.substr(str.length-checker.length).toUpperCase() == checker.toUpperCase()){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

/**
 * java.lang.String.startsWith() 구현
 */
function startsWith(str, checker){
    if(str!=null && checker!=null && str.length > checker.length){
        if(str.toUpperCase().substr(0,checker.toUpperCase().length) == checker.toUpperCase()){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

/**
 * 쿠키 값 등록
 */
function addCookie(cName, cValue, cDay){
	var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

/**
 * 쿠키 값 얻기
 */
function getCookie(cName){
	cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
    	start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
     return unescape(cValue);
}

/**
 * flash Tag 작성
 */
function flashTagWrite(url, width, height){
    var str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"';
        str+= ' width='+width+' height='+height+'>';
        str+= '<param name="movie" value="'+url+'" />';
        str+= '<param name="quality" value="high" />';
        str+= '<param name="wmode" value="transparent">';
        str+= '<embed src="'+url+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="620" height="58">';
        str+= '</embed></object>';
    document.write(str);
}
function flashWrite(flashStr){
    document.write(flashStr);
}
function flashInnerWrite(target, flashStr){
    document.getElementById(target).innerHTML = flashStr;
}

/**
 * 정규식으로 문자열중 주민등록 번호 패턴 검사
 */
function textInRegistCode(str){
    var format = "[0-9]{6}(-|.|)[1|2|3|4]{1}[0-9]{6}";
    if (str.search(format) != -1) {
        return true;
    }
    return false;
}

/**
 * 문자열에 한글문자가 하나라도 있는지 검사

    var format = "[ㄱ-힣]";
    if (value.search(format) != -1) {
        return true; 
    }
    return false;

 */
function strInKrChar(value){
    for ( var nindex = 0; nindex < value.length; nindex++) {
        str2 = value.charAt(nindex);
        if (( str2 >= 'ㄱ' && str2 <= '힣' )){
            return true;
        }
    }
    return false;
}

/**
 * 정규식으로 문자열이 영문 대소 문자와 숫자로만 구성됬는지 패턴검사
 */
function strInNumNEn(value){
    if(value==null || value.length < 1) return true;
    var temp = value;
    while(temp.indexOf("\\")>-1){
        temp = temp.substr(temp.indexOf("\\")+1);
    }
    temp = temp.replace("[","");
    temp = temp.replace("]","");
    var format = "[^\._A-Za-z0-9]{1,}";
    
    if(temp.search(format) != -1){
        return true; 
    }else{
        return false;
    }
}

/**
 * 정규식으로 문자열에 숫자가 들어있는지 검사
 */

function strInNum(value){
    var format = "^[0-9]";

    if (value.search(format) != -1) {
        return true;
    }
    return false;
}

/**
 * 정규식으로 문자열에 특정문자가 들어있는지 검사
 */

function strInStr(value,pattern){
    var format = pattern;

    if (value.search(format) != -1) {
        return true;
    }
    return false;
}

/**
 * 정규식으로 문자열이 이메일로 유효한지 패턴검사
 */
function checkEmail(email){
    var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
    var check=/@[\w\-]+\./;
    var checkend=/\.[a-zA-Z]{2,3}$/;

    if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){
        return false;
    }else{
        return true;
    }
}

/**
 * 정규식으로 문자열이 일반전화번호로 유효한지 패턴검사
 */
function isPhoneNumber(value){ 
    var format = "^[0-9]\{2,3\}-[0-9]\{3,4\}-[0-9]\{4\}$";

    if (value.search(format) != -1) {
        return true;
    }
    return false;
}

/**
 * 정규식으로 문자열이 헨드폰번호로 유효한지 패턴검사
 */
function isMobileNumber(value){
    var format = "^[0-9]\{3\}-[0-9]\{3,4\}-[0-9]\{4\}$";
    if (value.search(format) != -1) {
        return true;
    }
    return false;
}

/**
 * 정규식으로 문자열에 HTML Tag가 있는지 패턴검사
 */
function strInTag(value){
    value = value.replace("<","<");
    value = value.replace(">",">");
    //var format = "<[^>|[0-9a-zA-Z]]*>";
    var format = "<*[0-9a-zA-Z]*>";
    if (value.search(format) != -1) {
        return true;
    }
    return false;
}

/**
 * 정규식으로 문자열에 HTML SCRIPT TAG가 있는지 패턴검사
 */
function strInScriptTag(name){
    var target = null;
    if(document.getElementById(name)!=null){
        target = document.getElementById(name);
    }else if(eval("document."+name)!=null){
        target = eval("document."+name);
    }else if(document.all[name]!=null){
        target = document.all[name];
    }
    if(target == null) return false;
    value = target.value.replace("<","<");
    value = target.value.replace(">",">");
    var format = "<*[[Ss][Cc][Rr][Ii][Pp][Tt]]*>";
    if (target.value.search(format) != -1) {
        return true;
    }
    return false;
} 

/**
 * 숫자체크 얼럿
 */
function validateOnlyNumber(from) {
	var str;
	for ( var i = 0; i < from.value.length; i++) {
		str = from.value.charCodeAt(i);
		if (str < 48 || str > 57) {
		$.jqAlertAutoClose("숫자만 입력이 가능합니다.",500);
			from.value = "";
			from.select();
			return false;
		}
	}
	return true;
}

/**
 * Event가 발생한 Html 객체의 window 세로 위치 얻기
 */
function getRealOffsetTop(o) {
    return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0;
}

/**
 * Event가 발생한 Html 객체의 window 가로 위치 얻기
 */
function getRealOffsetLeft(o) {
    return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0;
}


/**
 * 게시판 첨부파일 사용시 선택한 파일 확장명 검사
 */

function attachInvalidCheck(name){
    var target = null;
    if(document.getElementById(name)!=null){
        target = document.getElementById(name);
    }else if(eval("document."+name)!=null){
        target = eval("document."+name);
    }else if(document.all[name]!=null){
        target = document.all[name];
    }
    if(target!=null){
        if(target.value!=null && target.value.length>0){
            var invalid = new Array("ZIP","HWP","TXT","TEXT","PDF","DOC","RTF","PPT","XLS","AVI","WMV","WAV","WMA","ASF","MPG","MPEG","JPG","JPEG","GIF","BMP","PNG","SWF");
            var isValid = false;
            for(var k=0 ; k < invalid.length ; k++) {
                if (target!=null && endsWith(target.value, invalid[k])) {
                    isValid = true;
                }
            }
            return isValid;
        }else{
            return true;
        }
    }else{
        return true;
    }
}

/**
 * 배열 목록에서 랜덤하게 순서 정렬
 */
function ArraySort(arr){
    return arr.sort( 
        function(){
            return Math.random()*3-2;
        }
    );
}

/**
 * XMLHttpRequest 가 사용 가능한지 확인
 */ 
function initRequest(url) {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

/**
 * XMLHttpRequest 가 사용 가능한지 확인
 */
function isXMLHttpRequest() {
    if (window.XMLHttpRequest && navigator.appName.indexOf("Internet Explorer") < 0) {
        return true;
    } else if (window.ActiveXObject) {
        return false;
    }
    return false;
}

/**
 * XMLHttpRequest를 인스턴스 객체에서 참조할 경우 사용
 */
function getDefaultXMLHttpRequest (strUrl){
    var req = initRequest(strUrl);
    if(req==null){
        $.jqAlert("AJAX 사용 가능한 웹브라우저가 아닙니다.");
        return null;
    }else{
        req.onreadystatechange = function(){
            // 본래 이곳에서 XML 파싱등의 처리를 해야 하나 마지막 라인 return req 를 통해 사용하는 인스턴스 객체에서 사용토록 처리한다.
        };
        if(isXMLHttpRequest()){
            req.overrideMimeType('text/xml');
        }
        req.open("GET", strUrl, true);
        req.send(null);
        return req;
    }
}


/**
 * String Format 
 * 예) 'Hello {0}!'.format(name)
 */
String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

/**
 * Method: fnCheckViewToString
 * STRING, DATE형태에 따른 포맷형식을 리턴한다.
 * 
 * Parameters:
 * pStr - {String}
 * 포맷변경 할 변수
 * 
 * pType - {String}
 * 변경할 포맷(STRING, DATE)
 * 
 * Returns:
 * {<String>}
 */
function fnCheckViewToString(pStr, pType) {

	var rtnStr = "";

	switch (pType) {
	case "STRING":
		if (pStr != null && pStr != "null" && pStr != "")
			rtnStr = pStr;
		break;
	case "DATE":
		if (pStr != null && pStr.indexOf('-') != -1) {//yyyy-mm-dd
			rtnStr = pStr;
		} else if (pStr != null && pStr.length > 6) {//yyyymmdd
			rtnStr = pStr.substring(0, 4) + "-" + pStr.substring(4, 6)
					+ "-" + pStr.substring(6, 8);
		} else if (pStr != null && pStr.length > 4) {//yyyymm
			rtnStr = pStr.substring(0, 4) + "-" + pStr.substring(4, 6);
		} else if (pStr != null) {//yyyy
			rtnStr = pStr;
		}
		break;
	}

	return rtnStr;
}


/**
 * 이미지 가져오기
 */
function getImageResource(objDiv, url, atchFileId, fileSn) {
	$('#img_AtchFile').remove();
	var strUrl = url + "?atchFileId=" + atchFileId + "&fileSn=" + fileSn;
	$("<img id='img_AtchFile'>").attr('src', strUrl).appendTo(objDiv);
}


/**
 * 큰 이미지 가져오기
 */
function getBigImageResource(objDiv, url, atchFilePath) {
	$('#img_BigAtchFile').remove();
	var strUrl = url + "?atchFilePath=" + atchFilePath;
	$("<img id='img_BigAtchFile'>").attr('src', strUrl).appendTo(objDiv);
}

/**
 * @param popDivId
 * @param subPopDivId
 * @param closeFunciton
 */
function setPagePopupDiv(popDivId, subPopDivId, closeFunciton, argTitle) {
	
	var strDiv ="";
	strDiv 	+= "<div id='" + popDivId + "' style='display:none'>";
	
	strDiv 	+= "<!-- pop_wrap -->";
	strDiv 	+= "<div id='pop_wrap'>";
	strDiv 	+= "	<!-- pop_header -->";
	strDiv 	+= "	<div id='pop_header'>";
	strDiv 	+= "		<h3>" + argTitle +"</h3>";
	strDiv 	+= "	</div>";
	
	strDiv 	+= "	<!-- pop_container -->";
	strDiv 	+= "	<div id='pop_container'>";	
	strDiv 	+= "		<div id='pop_content'></div>";
	strDiv 	+= "	</div>";				
	strDiv 	+= "	<!-- //pop_container -->";
	strDiv 	+= "	<!-- pop_footer -->";
	strDiv 	+= "		<div id='pop_footer'><p><a href='javascript:window.close();'><img src='/images/btn_close.gif' alt='닫기'></a></p></div>";	
	strDiv 	+= "	<!-- //pop_footer -->";
	strDiv 	+= "</div>";
	strDiv 	+= "<!-- //pop_wrap -->";
	 strDiv 	+= "</div>";
	
	
	
	document.write(strDiv);
	$("#" + popDivId + " #pop_wrap #pop_container #pop_content").append($("#" + subPopDivId));
}


/**
 * 메인 DIV팝업 오픈
 */
function openDivDialogPopup(popDivId, argWidth, argHeight, mod, posW, posH, url) {
	var argModal = true;
	
	try {if (mod != null) argModal = mod;} catch(exception) {}
	$("body").append("<div id='"+popDivId+"'></div>");
	$("#" + popDivId).load(url);
	$("#" + popDivId).dialog({width:argWidth,height:argHeight,modal:argModal,position:{ my: "left+"+posW+" top+"+posH, at: "left+"+posW+" top+"+posH, of: window, collision: "none" }});
}

/**
 * 메인 DIV팝업 닫기
 */
function closeDivDialogPopup(popDivId,cookieAt){
	$("#" + popDivId).dialog("close");
	$("#" + popDivId).dialog("destroy").remove();
	if(cookieAt == "Y"){
		addCookie("STOPVEW_ESTBS_AT_"+popDivId, cookieAt,1);
	}
}

/**
 * 광역시/시군구 코드 Select Box 설정
 * @param objSelectNm : 처음 조회되는 Select Box
 * @param searchType : BRTC_CODE(광역시도) , SIGNGU_CODE(시군구)
 * @param brtcCode : 광역시도코드
 * @param strValue : 광역시도/시군구 선택 코드값
 * @param subObjSelectNm : 2번째 조회될 Select Box (시군구)
 * @param subStrValue : 2번째 조회될 Select Box 선택값 (시군구)
 * @param bEmpty : 선택하세요 지정 여부
 * @param strEmpty : 선택하세요 외의 문자지정 (예:--전체--) 지정 여부
 */
function getSelectBrtcSisngn(objSelectNm, searchType, brtcCode, strValue, subObjSelectNm, subStrValue, bEmpty, strEmpty) {
	var url = remote_url + "hws/com/cde/selectBrtcSisngn.do?com_searchType=" + searchType + "&com_brtcCode=" +  brtcCode;
	var firstCode = "";
	
	var arrObjSelectNm = objSelectNm.split(",");
	$.ajax({
        type: "GET",
        url: url,
        async: false,
        success : function(data) { 
        	var nRow = 0;
        	
        	for (var i = 0; i < arrObjSelectNm.length; i++) {
        		$("#" + arrObjSelectNm[i]).find("option").remove().end();
        		
        		if (bEmpty == true) {
        			if(strEmpty != null && strEmpty != ""){
        				$("#" + arrObjSelectNm[i]).append("<option value=''>"+strEmpty+"</option>");
        			}else{
            			$("#" + arrObjSelectNm[i]).append("<option value=''>선택</option>");
        			}
        		}
        	}
        	        	   
        	$.each( data.result, function( key, data ) {
        		if (nRow == 0) firstCode = data.code;
        		
        		for (var i = 0; i < arrObjSelectNm.length; i++) {
        			$("#" + arrObjSelectNm[i]).append("<option value='" + data.code + "'>" + data.value + "</option>");
            	}        		        	
        		nRow++;
    		});
        	
        	// Select Box Value 값 설정
        	if (strValue != null && strValue != "") {
        		for (var i = 0; i < arrObjSelectNm.length; i++) {
        			$("#" + arrObjSelectNm[i]).val(strValue);
        			
        			if ($("#" + arrObjSelectNm[i]).val() != "" && $("#" + arrObjSelectNm[i]).val() != null)
        				firstCode = $("#" + arrObjSelectNm[i]).val();
            	}           		
        	}
        	
        	// 하위의 시군구 자동 설정
        	if (subObjSelectNm != null && subObjSelectNm != "") {
        		if (bEmpty == true && (strValue == null || strValue == "")) {
        			var arrSubObjSelectNm = subObjSelectNm.split(",");
        			
        			for (var i = 0; i < arrObjSelectNm.length; i++) {
        				$("#" + arrSubObjSelectNm[i]).find("option").remove().end();
        				if(strEmpty != null && strEmpty != ""){
            				$("#" + arrSubObjSelectNm[i]).append("<option value=''>"+strEmpty+"</option>");
            			}else{
            				$("#" + arrSubObjSelectNm[i]).append("<option value=''>선택</option>");
            			}
        			}
        		} else {
        			getSelectBrtcSisngn(subObjSelectNm, "SIGNGU_CODE", firstCode, subStrValue, "", "", bEmpty,strEmpty);
        		}
        	}
        }
    });
}

/**
 * 광역시/시군구 코드 Select Box 설정
 * @param objSelectNm : 처음 조회되는 Select Box
 * @param searchType : BRTC_CODE(광역시도) , SIGNGU_CODE(시군구)
 * @param brtcCode : 광역시도코드
 * @param strValue : 광역시도/시군구 선택 코드값
 * @param subObjSelectNm : 2번째 조회될 Select Box (시군구)
 * @param subStrValue : 2번째 조회될 Select Box 선택값 (시군구)
 * @param bEmpty : 선택하세요 지정 여부
 * @param strEmpty : 선택하세요 외의 문자지정 (예:--전체--) 지정 여부
 * SIGNGU_SE가 3일 경우에도 조회 가능한 function
 */
function getSelectBrtcSisngnSeAll(objSelectNm, searchType, brtcCode, strValue, subObjSelectNm, subStrValue, bEmpty, strEmpty) {
	var url = remote_url + "hws/com/cde/selectBrtcSisngnSeAll.do?com_searchType=" + searchType + "&com_brtcCode=" +  brtcCode;
	var firstCode = "";
	
	var arrObjSelectNm = objSelectNm.split(",");
	$.ajax({
        type: "GET",
        url: url,
        async: false,
        success : function(data) { 
        	var nRow = 0;
        	
        	for (var i = 0; i < arrObjSelectNm.length; i++) {
        		$("#" + arrObjSelectNm[i]).find("option").remove().end();
        		
        		if (bEmpty == true) {
        			if(strEmpty != null && strEmpty != ""){
        				$("#" + arrObjSelectNm[i]).append("<option value=''>"+strEmpty+"</option>");
        			}else{
            			$("#" + arrObjSelectNm[i]).append("<option value=''>선택</option>");
        			}
        		}
        	}
        	        	   
        	$.each( data.result, function( key, data ) {
        		if (nRow == 0) firstCode = data.code;
        		
        		for (var i = 0; i < arrObjSelectNm.length; i++) {
        			$("#" + arrObjSelectNm[i]).append("<option value='" + data.code + "'>" + data.value + "</option>");
            	}        		        	
        		nRow++;
    		});
        	
        	// Select Box Value 값 설정
        	if (strValue != null && strValue != "") {
        		for (var i = 0; i < arrObjSelectNm.length; i++) {
        			$("#" + arrObjSelectNm[i]).val(strValue);
        			
        			if ($("#" + arrObjSelectNm[i]).val() != "" && $("#" + arrObjSelectNm[i]).val() != null)
        				firstCode = $("#" + arrObjSelectNm[i]).val();
            	}           		
        	}
        	
        	// 하위의 시군구 자동 설정
        	if (subObjSelectNm != null && subObjSelectNm != "") {
        		if (bEmpty == true && (strValue == null || strValue == "")) {
        			var arrSubObjSelectNm = subObjSelectNm.split(",");
        			
        			for (var i = 0; i < arrObjSelectNm.length; i++) {
        				$("#" + arrSubObjSelectNm[i]).find("option").remove().end();
        				if(strEmpty != null && strEmpty != ""){
            				$("#" + arrSubObjSelectNm[i]).append("<option value=''>"+strEmpty+"</option>");
            			}else{
            				$("#" + arrSubObjSelectNm[i]).append("<option value=''>선택</option>");
            			}
        			}
        		} else {
        			getSelectBrtcSisngnSeAll(subObjSelectNm, "SIGNGU_CODE", firstCode, subStrValue, "", "", bEmpty,strEmpty);
        		}
        	}
        }
    });
}


/**
 *읍면동명 조회
 */
function getSelectEmdCode(objSelectNm, remote_url, brtcCode, signguCode, bEmpty, strEmpty) {
	var url = remote_url + "hws/com/cde/selectEmdCode.do?com_brtcCode=" + brtcCode + "&com_signguCode=" + signguCode;
	if(isEmpty(bEmpty)){
		bEmpty = false;
	}else{
		bEmpty = true;
		if(isEmpty(strEmpty)){
			strEmpty = "선택";
		}
	}
	
	$.ajax({
        type: "GET",
        url: url,
        async: false,
        success : function(data) {
        	$('#' + objSelectNm).find('option').remove().end();
        	if (bEmpty == true) {
    			$("#" + objSelectNm).append("<option value=''>"+strEmpty+"</option>");
    		}
        	$.each( data.result, function( key, data ) {
        		$("#" + objSelectNm).append("<option value='" + data.code + "'>" + data.value + "</option>");
    		});
        }
    });
}

/**
 *읍면동명 조회(리제외)
 */
function getSelectEmdElseLiCode(objSelectNm, remote_url, brtcCode, signguCode, bEmpty, strEmpty) {
	var url = remote_url + "hws/com/cde/selectEmdElseLiCode.do?com_brtcCode=" + brtcCode + "&com_signguCode=" + signguCode;
	if(isEmpty(bEmpty)){
		bEmpty = false;
	}else{
		bEmpty = true;
		if(isEmpty(strEmpty)){
			strEmpty = "선택";
		}
	}
	
	$.ajax({
        type: "GET",
        url: url,
        async: false,
        success : function(data) {
        	$('#' + objSelectNm).find('option').remove().end();
        	if (bEmpty == true) {
    			$("#" + objSelectNm).append("<option value=''>"+strEmpty+"</option>");
    		}
        	$.each( data.result, function( key, data ) {
        		$("#" + objSelectNm).append("<option value='" + data.code + "'>" + data.value + "</option>");
    		});
        }
    });
}

/**
 *도로명 조회
 */
function getSelectRdnmCode(objSelectNm, brtcCode, signguCode, detailCode) {
	var url = remote_url + "hws/com/cde/selectRdnmCode.do?com_brtcCode=" + brtcCode + "&com_signguCode=" + signguCode + "&com_detailCode=" +  detailCode;
	$.ajax({
        type: "GET",
        url: url,
        async: false,
        success : function(data) {
        	
        	$("#" + objSelectNm).find("option").remove().end();
        	if(data.result.length == 0){
        		$("#" + objSelectNm).append("<option value=''>도로명이 없습니다</option>");
        	}
        	$.each( data.result, function( key, data ) {
        		$("#" + objSelectNm).append("<option value='" + data.code + "'>" + data.value + "</option>");
    		});
        }
    });
}

/**
 * 도로명 select box 초기화 처리 함수
 * @param objSearchNm : 도로명 검색 키워드 select box
 * @param objSelectNm : 도로명 코드 select box
 * @param flag : 도로명 초성조회 초기화 여부
 */
function getSelectRdnmCodeReset(objSearchNm, objSelectNm, flag) {
	
	if(flag == null || flag == true){
		$("#" + objSearchNm).val("");
	}
	$("#" + objSelectNm).find("option").remove().end();
	$("#" + objSelectNm).append("<option value=''>선택</option>");
}

/**
 *공통코드 조회
 */
function getComDetailCode(objSelectNm, remote_url, groupCode,buffer1Value, buffer2Value, bEmpty, strEmpty) {
	var url = remote_url + "hws/com/cde/selectComCodeDetail.do?com_groupCode=" + groupCode+"&buffer1_value="+buffer1Value+"&buffer2_value="+buffer2Value;
	if(isEmpty(bEmpty)){	
		bEmpty = false;
	}else{
		bEmpty = true;
		if(isEmpty(strEmpty)){
			strEmpty = "선택";
		}
	}
	
	$.ajax({
        type: "GET",
        url: url,
        async: false,
        success : function(data) {
        	$('#' + objSelectNm).find('option').remove().end();
        	if (bEmpty == true) {
    			$("#" + objSelectNm).append("<option value=''>"+strEmpty+"</option>");
    		}        	
        	$.each( data.resultList, function( key, data ) {
        		$("#" + objSelectNm).append("<option value='" + data.detailCode + "'>" + data.detailCodeNm + "</option>");
    		});
        }
    });
}

/**
 * 임대세부유형 Select Box 설정
 * @param objSelectNm : 조회되는 Select Box
 * @param buffer1_value : 임대유형 공통 그룹코드
 * @param buffer2_value : 임대유형 세부코드
 * @param bEmpty : 선택하세요 지정 여부
 */
function getSelectRentDetailTy(objSelectNm, buffer1Value, buffer2Value, bEmpty) {
	
	var url = remote_url + "hws/com/cde/selectRentDetailTy.do?buffer1_value=" + buffer1Value + "&buffer2_value=" +  buffer2Value;
	var arrObjSelectNm = objSelectNm.split(",");
	
	$.ajax({
        type: "GET",
        url: url,
        async: false,
        success : function(data) {
        	var nRow = 0;
        	
        	for (var i = 0; i < arrObjSelectNm.length; i++) {
        		$("#" + arrObjSelectNm[i]).find("option").remove().end();
        		
        		if (bEmpty == true) {
        			$("#" + arrObjSelectNm[i]).append("<option value=''>선택</option>");
        		}
        	}
        	        	   
        	$.each( data.result, function( key, data ) {
        		
        		for (var i = 0; i < arrObjSelectNm.length; i++) {
        			$("#" + arrObjSelectNm[i]).append("<option value='" + data.code + "'>" + data.value + "</option>");
            	}        		        	
        		nRow++;
    		});
        }
    });
}

/**
 * 사용자유형 설정
 * @param objClassNm : 삽입할 DIV의 클래스 명
 * @param tySe : 사용자유형 구분
 */
var gCallFnNm = null;

function getUserTy(objClassNm, tySe, objHiddenNm, callFnNm, userTyIdHouse, hideCode) {
	
	var url = remote_url + "hws/com/cde/selectUserTy.do?ty_se="+tySe;
	var str = "";
	var hideCodeList = new Array();
	
	if(!isEmpty(callFnNm)){
		gCallFnNm = callFnNm;
	}else{
		gCallFnNm = "";
	}
	
	$.ajax({
        type: "GET",
        url: url,
        async: false,
        success : function(data) {
        	str += "<ul><li><a id='emptyUserTy' href=";
        	str += "javascript:setUserTy('emptyUserTy');>";
        	str += "전체</a></li>";
        	
        	$.each( data.result, function( key, data ) {
        		if(!isEmpty(hideCode)){
        			hideCodeList = hideCode.split(",");
        			for (var i = 0; i < hideCodeList.length; i++) {
        				if(data.code != hideCodeList[i]){
        					str += "<li>";
        	        		str += "<a id='"+data.code+"' href=";
        	        		str += "javascript:setUserTy('"+data.code+"');>";
        	        		str += data.value+"</a></li>";
        				}
        			}
        		}else{
            		str += "<li>";
            		str += "<a id='"+data.code+"' href=";
            		str += "javascript:setUserTy('"+data.code+"');>";
            		str += data.value+"</a></li>";
        		}
    		});
        	
        	str += "</ul>";
        	
        	$("."+objClassNm).prepend(str);
        	
    		if(!isEmpty(userTyIdHouse)){
    			if(!isEmpty(hideCode)){
        			hideCodeList = hideCode.split(",");
        			for (var i = 0; i < hideCodeList.length; i++) {
        				if(userTyIdHouse == hideCodeList[i]){
        					$("#emptyUserTy").addClass("on");
        	    			$("#"+objHiddenNm).val("");
        				}else{
        					$("#"+userTyIdHouse).addClass("on");
                			
                			if(userTyIdHouse != "emptyUserTy"){
                				$("#"+objHiddenNm).val(userTyIdHouse);
                			}else{
                				$("#"+objHiddenNm).val("");
                			}
        				}
        			}
        		}else{
        			$("#"+userTyIdHouse).addClass("on");
        			
        			if(userTyIdHouse != "emptyUserTy"){
        				$("#"+objHiddenNm).val(userTyIdHouse);
        			}else{
        				$("#"+objHiddenNm).val("");
        			}
        		}
    		}else{
    			$("#emptyUserTy").addClass("on");
    			$("#"+objHiddenNm).val("");
    		}
        	
        }
    });
}

/**
 * 사용자유형 클릭
 */
function setUserTy(tyId) {
	$(".tap_userType a").removeClass("on");
	$("#"+tyId).addClass("on");
	if(tyId != "emptyUserTy"){
		$("#searchTyId").val(tyId);
	}else{
		$("#searchTyId").val("");
	}
	if(!isEmpty(gCallFnNm)){
		gCallFnNm("1");
	}
}

/**
 * 새창 팝업화면 호출 함수
 * @param url
 * @param argWidth
 * @param argHeight
 * @param mod
 * @returns
 */
function comPopUrlGetDialogOpen(url, argWidth, argHeight, mod, popName, resize) {	
	var retWindow;
	var isResize = "no";
	if (mod == true) {
		window.showModalDialog(url, self, "dialogWidth:" + argWidth + "px; dialogHeight:" +argHeight + "px statusbar:no; toolbar:no; menubar:no; addressbar:no; titlebar:no; addressbar:no");
	} else {
		if (resize) isResize = "yes";
		retWindow = window.open(url, popName, "height=" +argHeight + ",width=" + argWidth + ",toolbar=no,directories=no,status=no, linemenubar=no,scrollbars=no,resizable=" + isResize);
	}
	
	//창닫기시 리턴벨류
	window.returnValue = "closeOk";
	
	return retWindow;
}

/**
* jq얼럿
* 
*
*$.jqAlert("YES",{width:"200px"});
*$.jqAlert(message,{option}, function() { method });
*
* */
$.jqAlert = function (msg, options, callback) {
	
    var $messageBox = $.parseHTML('<div id="alertBox"></div>');
    
    if(options == null || options == "undefined"){options = {};}
    if(options.title == null){ options.title = "";}
    if(options.autoOpen == null){ options.autoOpen = true;} 
    if(options.draggable == null){ options.draggable = true;} 
    if(options.modal == null){ options.modal = true;} 
    if(options.width == null){ options.width = "auto";} 
    if(options.height == null){ options.height = "auto";} 
    if(options.resizable == null){ options.resizable = false;}
    if(options.show == null){ options.show = "";}
    if(options.hide == null){ options.hide = "";}
    
    $("body").append($messageBox);

    $($messageBox).dialog({
        open: $($messageBox).append(msg),
        title: options.title,
        autoOpen: options.autoOpen,
        draggable: options.draggable,
        modal: options.modal,
        minHeight:40,
        minWidth:200,
        maxWidth:800,
        maxHeight:800,
        width : options.width,
        height : options.height,
        resizable: options.resizable,
        show : options.show,
        hide: options.hide,
        buttons: {
            확인: function(){
            	$(this).dialog("close");
            	$(this).dialog("destroy").remove();
            	if( callback ) callback(true);
            }
        }
    });
};

/**
* jq얼럿 자동닫기
* 
*$.jqAlert("YES",500,{width:'200px'});
* */
$.jqAlertAutoClose = function (msg, time, options) {
    var $messageBox = $.parseHTML('<div id="autoCloseAlertBox"></div>');
    
    if(time == null){time = 1000;}
    if(options == null || options == "undefined"){options = {};}
    if(options.title == null){ options.title = "";}
    if(options.autoOpen == null){ options.autoOpen = true;} 
    if(options.draggable == null){ options.draggable = true;} 
    if(options.modal == null){ options.modal = true;} 
    if(options.width == null){ options.width = "auto";} 
    if(options.height == null){ options.height = "auto";} 
    if(options.resizable == null){ options.resizable = true;} 
    if(options.show == null){ options.show = "";}
    if(options.hide == null){ options.hide = "";}
    
    $("body").append($messageBox);

    $($messageBox).dialog({
    	open: function(event, ui) {
    		$($messageBox).append(msg);
    		$($messageBox).append("<br /><br />");
    	    setTimeout(function(){
    	        $('#autoCloseAlertBox').dialog('close');    
    	        $('#autoCloseAlertBox').dialog("destroy").remove();
    	    }, time);
    	},
        title: options.title,
        autoOpen: options.autoOpen,
        draggable: options.draggable,
        modal: options.modal,
        minHeight:40,
        minWidth:200,
        maxWidth:800,
        maxHeight:800,
        width : options.width,
        height : options.height,
        resizable: options.resizable,
        show : options.show,
        hide: options.hide,
        buttons: {}
    });
};

/**
* jq컨펌
* 
*
* $.when($.jqConfirm("YES OR NO?")).then(function(status){if(status == "Yes") {
    	$.jqAlert("YES",{width:'200px'});
    }else{
        $.jqAlert("NO");
    }});
* */
$.jqConfirm = function (msg, options) {
    var $confirmBox = $.parseHTML('<div id="confirmBox"></div>');
    var def = $.Deferred();
    
    if(options == null || options == "undefined"){options = {};}
    if(options.title == null){ options.title = "";}
    if(options.autoOpen == null){ options.autoOpen = true;} 
    if(options.draggable == null){ options.draggable = true;} 
    if(options.modal == null){ options.modal = true;} 
    if(options.width == null){ options.width = "auto";} 
    if(options.height == null){ options.height = "auto";} 
    if(options.resizable == null){ options.resizable = true;}
    if(options.show == null){ options.show = "";} 
    if(options.hide == null){ options.hide = "";}
    
    $("body").append($confirmBox);

    $($confirmBox).dialog({
        open: $($confirmBox).append(msg),
        title: options.title,
        autoOpen: options.autoOpen,
        draggable: options.draggable,
        modal: options.modal,
        minHeight:40,
        minWidth:200,
        maxWidth:800,
        maxHeight:800,
        width : options.width,
        height : options.height,
        resizable: options.resizable,
        show : options.show,
        hide: options.hide,
        buttons: {
            확인: function(){
            	$(this).dialog("close");
            	$(this).dialog("destroy").remove();
            	def.resolve("Yes");
            },
		    취소: function(){
		    	$(this).dialog("close");
		    	$(this).dialog("destroy").remove();
            	def.resolve("No");
		    }
        }
    });
    
    return def.promise();
};

/**
 * 달력(한글설정)
 * 
 * $("#searchBgnDe").datepicker({});
 * $('.ui-datepicker-trigger').css('margin-left','4px'); 
 * 
 * */
$(function() {
    $.datepicker.regional['ko'] = {
    	   closeText: '닫기',
     	   prevText: '이전',
     	   nextText: '다음',
     	   currentText: '오늘',
     	   monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
     	   monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
     	   dayNames: ['일','월','화','수','목','금','토'],
     	   dayNamesShort: ['일','월','화','수','목','금','토'],
     	   dayNamesMin: ['일','월','화','수','목','금','토'],
     	   dateFormat: 'yymmdd',
     	   showMonthAfterYear: true,
     	   showOn:'both',
     	   buttonText: '',
     	   buttonImage: '/images/portal/content/btn_cal.gif',
     	   buttonImageOnly: true,
     	   changeMonth: true,
     	   changeYear: true
                };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
    
    
});

/**
 * 프로그레시브바 시작
 * 
 * */
function showProgress() {

    $("#progressbar").css('display', 'inline');
    $("#progressbar").dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: false,
        resizeable : false,
        width : 200,
        height : 200
    });
 
    $('#progressbar').dialog('open');
    
    //창 UI수정
    $(".ui-widget-content").css('border', 'none');
    $(".ui-widget-content").css('background', 'none');
    $(".ui-widget-header").css('display', 'none');
    
	startSpinner();
}
function startSpinner() {
    var opts = {
    		lines: 10, // The number of lines to draw
    		  length: 15, // The length of each line
    		  width: 7, // The line thickness
    		  radius: 12, // The radius of the inner circle
    		  color: '#FFFFFF',
    		  speed: 1.4, // Rounds per second
    		  trail: 0, // Afterglow percentage
    		  shadow: false, // Whether to render a shadow
    		  top: '0%', // Top position relative to parent
    		  left: '50%' 
    };
 
    var target = document.getElementById('progressbar');
    if (target) {
	    if (gSpinner == null) {
	        gSpinner = new Spinner(opts).spin(target);
	    }
    }
}

/**
 * 프로그레시브바 중지
 * 
 * */
function hideProgress() {
	stopSpinner();
	
	if( $("#progressbar").hasClass('ui-dialog-content') ){
		$('#progressbar').dialog('close');
	}
    
	$("#progressbar").css('display', 'none');
	$(".ui-widget-header").css('display', 'block');
}
function stopSpinner() {
  if (gSpinner != null) {
      gSpinner.stop();
      gSpinner = null;
  }
}

/**
* AJAX 오류 메세지
*/
function returnAjaxError(response, textStatus, errorThrown){
	var errMsg = "";
	if (textStatus == "error" || !response.responseText) {
    	if(response.status == "903"){
    		errMsg = getBizErrorMsg(response.responseText); 
    	}else if(response.status == "0") {
    		errMsg = "서버와의 통신이 끊어졌습니다.";
    	}else{
    		errMsg = response.responseText;
    	}
    	$.jqAlert(errMsg);
	}else{
		//테스트중 ...ajax로 .do호출시 권한이 없을때 로그인페이지로 자동 이동시 제이쿼리 권한에러발생
		$.jqAlert(response.responseText); //중복로그인 에러페이지등 사용가능
        //location.href = remote_url + "hws/portal/main/loginUsrView.do?login_error=1";
    }
}
function getBizErrorMsg(retValue) {
	var errMsgFirtIndex = retValue.lastIndexOf("<div id=\"err_message\" style=\"display:none\">");
	var errMsgLastIndex = retValue.lastIndexOf("</div>");
	var errMessage = retValue.substring(errMsgFirtIndex, errMsgLastIndex).replace("<div id=\"err_message\" style=\"display:none\">", "").replace("</div>", "");
	return errMessage;
}

/**
* pathname으로 현재 메뉴정보 가지고 오기
*/
function getProgrmInfo(pathName,menuList) {
	for (var i = menuList.length - 1; i > -1; i--) {	
		var menuInfo = menuList[i].split("|");
		if(pathName == menuInfo[1]){
			return menuInfo[0]+"|"+menuInfo[1]+"|"+menuInfo[2]+"|"+menuInfo[3]+"|"+menuInfo[4]+"|"+menuInfo[5]+"|"+menuInfo[6]+"|"+menuInfo[7];
		}
	}
}

/**
* 메뉴아이디로 상위메뉴아이디 가지고 오기
*/
function getUpperProgrmId(id,menuList) {
	for (var i = 0; i < menuList.length; i++) {	
		var menuInfo = menuList[i].split("|");
		if(id == menuInfo[0]){
			return menuInfo[2];
		}
	}
}

/**
* 화면확대축소
*/
var Browser = { a : navigator.userAgent.toLowerCase() };    
	Browser = { mozilla5 : Browser.a.indexOf('mozilla/5.0') != -1,
			    mozilla4 : Browser.a.indexOf('mozilla/4.0') != -1 };    

/*기본 Zoom*/
var nowZoom = 1.0;
var m4NowZoom = 100;
/*최대 Zoom*/
var maxZoom = 1.4;
var m4MaxZoom = 120;
/*최소 Zoom*/
var minZoom = 0.6;
var m4MinZoom = 80;
/*조절 비율*/
var setZoom = 0.1;
var m4SetZoom = 5;
/*확대 DIV*/
var divId = "sub_content";
/*기본 높이*/
var DefaultHeight;
/*신규 높이*/
var reHeight;

var zoomUp = function() {
    if(nowZoom == 1.0){
    	DefaultHeight = $("#"+divId).css("height").replace("px","");
    }
    if( Browser.mozilla4 ) {
    	if( m4NowZoom < m4MaxZoom ) {
            m4NowZoom += m4SetZoom;
            
            $("#"+divId).css("position","relative");
            $("#"+divId).css("zoom",m4NowZoom + "%");
    	}else{
            $.jqAlert('최대 확대입니다.');
        }
        
    }else {
        if( nowZoom < maxZoom ) {
            nowZoom += setZoom;
            reHeight = Number(DefaultHeight) * Number(nowZoom);
            
            $("#"+divId).css("height",reHeight+"px");
            $("#"+divId).css("transform-origin","top");
            $("#"+divId).css("transform","scale("+nowZoom+")");
        	 
        }else{
            $.jqAlert('최대 확대입니다.');
        }
    }
};

var zoomDown = function() {
    if(nowZoom == 1.0){
    	DefaultHeight = $("#"+divId).css("height").replace("px","");
    }
    if( Browser.mozilla4 ) {
    	if( m4NowZoom > m4MinZoom ) {
            m4NowZoom -= m4SetZoom;
            
            $("#"+divId).css("position","relative");
            $("#"+divId).css("zoom",m4NowZoom + "%");
    	}else{
            $.jqAlert('최소 축소입니다.');
        }
        
    }else {
        if( nowZoom > minZoom ) {
            nowZoom -= setZoom;
            reHeight = Number(DefaultHeight) * Number(nowZoom);
            
            $("#"+divId).css("height",reHeight+"px");
            $("#"+divId).css("transform-origin","top");
            $("#"+divId).css("transform","scale("+nowZoom+")");
        	 
        }else{
            $.jqAlert('최소 축소입니다.');
        }
    }
};

/**
* 콘텐츠 서브유틸 세팅
* 
* setUtilZone("print|zoom");
* 
*/
function setUtilZone(subUtil,esntlId,programUrl) {
	
	if(!isEmpty(subUtil)){
		var inStr = "<ul>";
		var strSplit = subUtil.split("|");
		
		for (var i = 0; i < strSplit.length; i++) {	
			if(i == strSplit.length-1){
				inStr += "<li class='last'>";
			}else{
				inStr += "<li>";
			}
			
			if(strSplit[i] == "print"){
				inStr += "<a href='#' class='pageprint' onclick='javascript:fnPrint();'>화면인쇄</a></li>";
			}
			if(strSplit[i] == "zoom"){
				inStr += "확대 <a href='javascript:zoomUp();'><img src='/images/portal/content/btn_txadd.gif' alt='글자크게' /></a><a href='javascript:zoomDown();'><img src='/images/portal/content/btn_txdec.gif' alt='글자작게' /></a></li>";
			}
			if(strSplit[i] == "sns"){
				inStr += "<a href=\"javascript:sendSNS('fb');\"><img src='/images/portal/content/ico_facebook.gif' alt='페이스북' /></a>&nbsp;";
				inStr += "<a href=\"javascript:sendSNS('tw');\"><img src='/images/portal/content/ico_twitter.gif' alt='트위터' /></a></li>";
			}
			if(strSplit[i] == "wordDic"){
				inStr += "<a href='javascript:fnWordDicPop();' class='btn_whelp'>용어 도움말</a></li>";
			}
			if(strSplit[i] == "myAtt"){
				inStr += "<a href=\"javascript:insertMyAtt('"+programUrl+"');\" class=\"myAtt\"><img src=\"/images/portal/content/ico_starOff.png\" alt=\"관심정보\" /> 관심</a></li>";
			}
		}
		
		inStr += "</ul>";
		
		$(".sub_util").html(inStr);
		
		if(!isEmpty(esntlId)){
			$.ajax({
		        type: "GET",    
		        url: "/hws/portal/usr/selectUserIntrstContentYn.do",   
		        data: {esntlId:esntlId,programUrl:programUrl,intrstSe:"CONT"},
		        dataType: "JSON",
		        async: true,
		        success : function(data) {
		        	if(data.result > 0){
		        		$(".myAtt img").attr("src",remote_url + "images/portal/content/ico_starOn.png");
		        	}else{
		        		$(".myAtt img").attr("src",remote_url + "images/portal/content/ico_starOff.png");
		        	}
		        },
		    	error:function(response, textStatus, errorThrown){
		           	returnAjaxError(response, textStatus, errorThrown);
		        }
		    });
		}
	}
}

/**
* 엑셀, csv 다운로드
* 
* getFileDown("csv","formNm","url")
* 
*/
function getFileDown(gb,formNm,url) {
	
	if(gb=="xls"){
		$("#"+formNm).attr("action",url,"method","post").submit();
	}else if(gb=="csv"){
		$("#"+formNm).attr("action",url,"method","post").submit();
	}else{
		$.jqAlertAutoClose("오류가 발생했습니다.");
	}
}		


/**
* 화면인쇄
* 
*/
function fnPrint(){
	window.print();
}
    
    
/**
* ROW SPAN
* 
*/
(function($){
	$.fn.rowspan = function(colIdx){
		return this.each(function(){
			var that;
			$('tbody > tr',this).each(function (row){
				$('td:eq('+colIdx+')', this).each(function (col){    					
					if($(this).html() == $(that).html()){
						rowspan = $(that).attr("rowSpan");
						if(rowspan == undefined){
							$(that).attr("rowSpan", 1);
							rowspan = $(that).attr("rowSpan");
						}
						rowspan = Number(rowspan)+1;
						$(that).attr("rowSpan", rowspan);
						$(this).remove();
					}else{
						that = this;
					}
					that = (that == null)? this : that;
				});
			});
		});
	};
	})(jQuery);

/**
* 팝업창 띄우기
*/
function OpenPopup(url, width, height, target, option) {

	if (!option) {
		var option = "scrollbars=yes,left=0,top=0";
	}
	
	if ( navigator.userAgent.toLowerCase().indexOf("safari")!=-1 ) {
		height+=3;
	}
	
	var viewpage = window.open(url, target, option+',width='+width+',height='+height);
	viewpage.focus();
}

/**
* 글자 길이 체크
*/
function StringSize (s) {
	var i;
	var len = 0;
	for ( i=0 ; i<s.length; i++) {
		if ( s.charCodeAt(i) > 255 ) {
			//len ++;
			len += 2;
		} else {
			len ++;
		}
	}
	return len;
}

/**
 * 공통 SNS 링크
 */
function sendSNS(sns_gb){
	var getContextPath = $(location).attr("protocol")+"//"+$(location).attr("host");
	var url = '';
	var localHref = document.location.href;
	var title = $('title').text();
	
	if(sns_gb == 'fb') {
				
		var w = 804;
		var h = 574;
		url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(localHref);
		var g=(screen.width)?(screen.width-w)/2:0;
		var n=(screen.height)?(screen.height-h)/2:0;
		
		OpenPopup(url, w, h, "_blank", "top="+n+",left="+g + ",location=no,resize=yes,scrollbars=yes,resizable=yes");
	} else if(sns_gb == 'tw') {
		
		url = "https://twitter.com/share" + "?url=" + encodeURIComponent(localHref) + "&amp;text=" + encodeURIComponent(' : 마이홈포털'+ " \n");
		
		var w = 640;
		var h = 400;
		var g=(screen.width)?(screen.width-w)/2:0;
		var n=(screen.height)?(screen.height-h)/2:0;
		OpenPopup(url, w, h, "_blank", "top="+n+",left="+g + ",location=no,resize=yes,scrollbars=yes,resizable=yes");
		//window.open(link);
		/*
		var httpObject = false;
		if(window.ActiveXObject) {
			httpObject = new ActiveXObject("Microsoft.XMLHTTP");
		} else if(window.XMLHttpRequest) {
			httpObject = new XMLHttpRequest();
		}
		
		if(httpObject) {
			httpObject.open("GET", "/SNS/makeShortenUrl?url="+encodeURIComponent(localHref), true);
			httpObject.onreadystatechange = function() {
				if(httpObject.readyState == 4) {
					var w = 640;
					var h = 400;
					var g=(screen.width)?(screen.width-w)/2:0;
					var n=(screen.height)?(screen.height-h)/2:0;
					
					var text = encodeURIComponent(title + " \n" + httpObject.responseText);
					url = "https://twitter.com/intent/tweet?text=" + text;
					OpenPopup(url, w, h, "_blank", "top="+n+",left="+g + ",location=no,resize=yes,scrollbars=yes,resizable=yes");
				}
			};
			httpObject.send(null);			
		}*/
	} else if(sns_gb == 'yz') {
		var w = 450;
		var h = 400;
		var g=(screen.width)?(screen.width-w)/2:0;
		var n=(screen.height)?(screen.height-h)/2:0;
		
		url = "http://yozm.daum.net/api/popup/post?prefix=" + encodeURI(title) + "&link=" + encodeURI(localHref);
		OpenPopup(url, w, h, "_blank", "top="+n+",left="+g + ",location=no,resize=yes,scrollbars=yes,resizable=yes");
	} else if(sns_gb == 'nt') {
		jQuery.getScript('http://api.nateon.nate.com/js/note/note_common_v2_0.min.js');
		enc_note='X4vK-D_8SHRfmodZ9thd-c9rxorJ1pzhwsaVF9eo074JFKuqRS9wD1MsCyjrzn-4fGiygy-KPOyaDC1LGOB70f7aOSMJJ691SRSQc0NjQBc';
		send_note();
	} else if(sns_gb == 'cy'){
		
		var w = 400;
		var h = 360;
		url = "http://csp.cyworld.com/nadoo.php?url=" + encodeURIComponent(localHref);
		
		OpenPopup(url, w, h, "_blank", "resize=noscrollbars=no,resizable=no");
	} else if(sns_gb == 'wb'){
		var w = 450;
		var h = 400;
		url = "http://v.t.sina.com.cn/share/share.php?title="+encodeURIComponent(title) + "&url=" + encodeURIComponent(localHref);
		var g=(screen.width)?(screen.width-w)/2:0;
		var n=(screen.height)?(screen.height-h)/2:0;
		
		OpenPopup(url, w, h, "_blank", "top="+n+",left="+g + ",location=no,resize=yes,scrollbars=yes,resizable=yes");
	}
}


/**
 * AJAX PAGING
 * fnAjaxPaging("pageDiv", curPageNo, totCnt, "fnSearch");
 */
function fnAjaxPaging(tgtPageId, curPageNo, totCnt, scriptMethod, pageSize, recordCountPerPage){
	curPageNo = parseInt(curPageNo);
	var firstPageNo = 1;
	if(isEmpty(pageSize)){ 
		pageSize = 10;
	}
	if(isEmpty(recordCountPerPage)){ 
		recordCountPerPage = 10;
	}
	var totalPageCount = Math.floor((parseInt(totCnt)-1)/recordCountPerPage) + 1;
	var firstPageNoOnPageList = Math.floor((curPageNo-1)/pageSize)*pageSize + 1;
	var lastPageNo = totalPageCount;
	var lastPageNoOnPageList = firstPageNoOnPageList + pageSize - 1;
	var previousPageLabel = "";
	var firstPageLabel = "";
	var pageLabel = "";
	var lastPageLabel = "";
	var nextPageLabel = "";
	
	if(lastPageNoOnPageList > totalPageCount){
		lastPageNoOnPageList = totalPageCount;
	}
	
	if(totalPageCount > pageSize){
		if(firstPageNoOnPageList > pageSize){
			previousPageLabel = "<li><a id=\"page_first_a\" href=\"javascript:"+scriptMethod+"('"+(firstPageNoOnPageList-1)+"')\">이전</a></li>";
        }else{
        	previousPageLabel = "<li><a id=\"page_first_a\" href=\"javascript:"+scriptMethod+"('"+firstPageNo+"')\">이전</a></li>";
        }
		firstPageLabel = "<li id=\"page_first\"><a href=\"javascript:"+scriptMethod+"('"+firstPageNo+"')\">처음</a></li>";
	}
	
	for(var i=firstPageNoOnPageList;i<=lastPageNoOnPageList;i++){
		if(i==curPageNo){
			pageLabel += "<li><a class='on' href=\"javascript:"+scriptMethod+"('"+i+"')\">"+i+"</a></li>";
    	}else{
    		pageLabel += "<li><a href=\"javascript:"+scriptMethod+"('"+i+"')\">"+i+"</a></li>";
    	}
    }
	if(totalPageCount > pageSize){
		if(lastPageNoOnPageList < totalPageCount){
        	nextPageLabel = "<li><a id=\"page_last_a\" href=\"javascript:"+scriptMethod+"('"+(firstPageNoOnPageList+pageSize)+"')\">다음</a></li>";
        }else{
        	nextPageLabel = "<li><a id=\"page_last_a\" href=\"javascript:"+scriptMethod+"('"+lastPageNo+"')\">다음</a></li>";  	
        }
		lastPageLabel = "<li id=\"page_last\"><a href=\"javascript:"+scriptMethod+"('"+lastPageNo+"')\">끝</a></li>";
	}
	var pagingStr = firstPageLabel+previousPageLabel+pageLabel+nextPageLabel+lastPageLabel;

	$("#"+tgtPageId+" > UL").html(pagingStr);
}

/**
 * 용어 도움말 팝업창 생존여부를 위한 전역변수 선언. 
 */ 
var wordDicPop = "";

/** 
 * 용어 도움말 팝업 호출 함수
 * param : 용어도움말에서 검색을 할 용어명 
 * param이 없으면 Default 값인 'ㄱ' 자음 검색 조건으로 용어도움말 창을 띄워줌.
*/
function fnWordDicPop(param){
	
	var url = remote_url + "hws/portal/wrd/selectWordDicView.do";			

	if(isEmpty(wordDicPop)){				
		
		if(!isEmpty(param)){

		  wordDicPop = window.open("", "WordDicPop","width=455px , height = 700px, scrollbars=yes");	
			
		  var content = "";	    
	    
	      content += "<form id=\"wordDicForm\" method=\"POST\" target=\"WordDicPop\" action=\"" + url + "\">";
		  content += "<input type=\"hidden\" id=\"wordDicParam\" name=\"wordDicParam\" value=\"" + param + "\" />";					
		  content += "</form>";
	    		  
		  $("body").prepend(content);		
					  
	      $("#wordDicForm").submit();
					
		  // 팝업 띄워 주고 해당 div 삭제
		  $("#wordDicForm").remove();
		  
		}else{
		
		  wordDicPop = window.open(url, "WordDicPop","width=455px , height = 700px, scrollbars=yes");
		  
		}
		
		wordDicPop.focus();
		wordDicPop = "";
		
	}else{
		
		if(!isEmpty(param)){
			wordDicPop.fnSetSearch(param);	
		}else{
			wordDicPop.fnSetSearch("");
		}
		
		wordDicPop.focus();
		wordDicPop = "";
		
	}		
}

function replaceAll(str, searchStr, replaceStr) {
	if (!str) return "";
    return str.split(searchStr).join(replaceStr);
}

function leadingZeros(n, dgts) {
	var zero = "";
	n = n.toString();

  	if (n.length < dgts) {
    	for (var i = 0; i < dgts - n.length; i++)
      		zero += "0";
  	}
  	return zero + n;
}

// 파일 확장자 체크
function uploadFileExtCheck(param){
	var datas = [];
	var bool = false;
	
	var noDataRow = $(".noDataRow");
	
	if(noDataRow.eq(0).find("TD") > 1){
		noDataRow.each(function(){
			var filename = noDataRow.children().eq(1).text();
			datas.push(filename);
		});
		$.ajax({
			type: "POST",    
			url: "/jfile/checkFileExt.do", 
			traditional : true,
			data:  { 
				datas :datas,
				extension : param == undefined ? "" : param 
			},
			dataType: "JSON",
			async: false,
			success : function(json){
				bool = true;
			},
			error:function(response, textStatus, errorThrown){
				hideProgress();
				returnAjaxError(response, textStatus, errorThrown);
			}
		});
	}
	
	/*
	if($(".fileItem.insertFileItem").length > 0 ){
		$(".fileItem.insertFileItem").each(function(){
			var filename = $(this).children(".first").children().text();
			datas.push(filename);
		});
		$.ajax({
			type: "POST",    
			url: "/jfile/checkFileExt.do", 
			traditional : true,
			data:  { 'datas' :datas},
			dataType: "JSON",
			async: false,
			success : function(json){
				bool = true;
			},
			error:function(response, textStatus, errorThrown){
				hideProgress();
				returnAjaxError(response, textStatus, errorThrown);
			}
		});
	}
	*/
	else{
		bool = true;
	}
	return bool;
}
