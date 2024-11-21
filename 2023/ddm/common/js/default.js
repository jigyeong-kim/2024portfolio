// 오른쪽 공백 제거
function Rtrim( str ) {
	var src = new String(str);
	var tmp = new String();
	var i,lastnum, len = src.length;
	for(i = len;i >= 0;i--) {
		tmp = src.substring(i,i-1);
		if (tmp != ' ' ) {
			lastnum = i;
			break;
		}
	}
	tmp = src.substring(0,lastnum);
	return tmp;
}

// 왼쪽 공백 제거
function  Ltrim( str ) {
	var src = new String( str );
	var tmp = new String();
	var i,firstnum, len = src.length;
	for(i = 0;i < len ;i++) {
		tmp = src.substring(i,i+1);
		if (tmp != ' ' ) {
			firstnum = i;
			break;
		}
	}
	tmp = src.substring(firstnum);
	return tmp;
}

// 양쪽 공백 제거
function Trim( str ) {
	var src = new String(str);
	var tmp = new String();
	tmp = Ltrim(Rtrim(str));
	return tmp;
}

// 날짜 체크
function isYYYYMMDD(y, m, d) { 
	switch (m) { 
	case 2: 
		if (d > 29) return false; 
		if (d == 29)
			if ((y % 4 != 0) || (y % 100 == 0) && (y % 400 != 0)) return false; 
		break; 
	case 4: 
	case 6: 
	case 9: 
	case 11: 
		if (d == 31) return false; 
	} 
	return true; 
} 

// 숫자유무
function isNumeric(s) { 
	for (i=0; i<s.length; i++) { 
		c = s.substr(i, 1); 
		if (c < "0" || c > "9") return false; 
	} 
	return true; 
}

function fn_isRadioChecked( frm, fieldNm) {
	var flag = false;
	for( var LoopI=0; LoopI<frm[fieldNm].length; LoopI++ ) {
		if( frm[fieldNm][LoopI].checked == true ) {
			flag = true;
			break;
		}
	}
	return flag;
}

function fn_setFocus( frm, fieldNm ) {
	frm[fieldNm].focus();
}

function fn_getMessage( fieldType, label ) {
	var msg = "";
	if( fieldType == "SELECT" ) {
		msg = label + "(을)를 선택 해주세요.";
	} else if( fieldType == "INPUT" ) {
		msg = label + "(을)를 입력 해주세요.";
	}
	return msg;
}

function fn_isEmpty( frm, fieldNm ) {
	return ( !Trim(frm[fieldNm].value) ) ? true : false;
}

function numberKeyPress(e) {
	var key;
	
	if(window.event)
		key = window.event.keyCode; //IE
	else
		key = e.which; //firefox
	
	// backspace or delete or tab
	var event;
	if (key == 0 || key == 8 || key == 46 || key == 9 || key == 13){
		event = e || window.event;
		if (typeof event.stopPropagation != "undefined") {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
		
		return;
	}
	
	if (key < 48 || (key > 57 && key < 96) || key > 105  || e.shiftKey) {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	}
}

function strTrim(str) {
	str	+= '';
	return str.replace(/^\s*|\s*$/g, '');
}

//function findDoro(){
//	var pop = window.open("/common/jusoPopup.jsp","pop","width=570,height=420, scrollbars=yes, resizable=yes");
//}

function jusoCallBack(roadFullAddr, roadAddrPart1, addrDetail, roadAddrPart2, engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn, emdNm){
	
	if ( $('#rdnmadr').length > 0 ) {
		var rdnmadr = roadAddrPart1 + ' ' + addrDetail;
		var adres = jibunAddr + ' ' + addrDetail;
		
		$('#rdnmadr').val(rdnmadr);
		$('#adres').val(adres);

	} else {
		$('#zip').val(zipNo);
		$('#adres').val(roadAddrPart1 + ' ' + roadAddrPart2);
		$('#detailAdres').val(addrDetail);

		if( $("#emdSe").length > 0 ) {
			$("select[name='emdSe'] option:contains('"+emdNm+"')").attr("selected", "selected");﻿
		}
		
		if( $("#lat").length > 0 && $("#lng").length > 0 ) {
			fn_crdntAdresSearch();
		}
	}
}

//다음 우편번호 찾기
function findDoro() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var addr = ''; // 주소 변수
			var extraAddr = ''; // 참고항목 변수

			//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				addr = data.roadAddress;
			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				addr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
			if(data.userSelectedType === 'R'){
				// 법정동명이 있을 경우 추가한다. (법정리는 제외)
				// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
				if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
					extraAddr += data.bname;
				}
				// 건물명이 있고, 공동주택일 경우 추가한다.
				if(data.buildingName !== '' && data.apartment === 'Y'){
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
				if(extraAddr !== ''){
					extraAddr = ' (' + extraAddr + ') ';
				}
				// 조합된 참고항목을 해당 필드에 넣는다.
				document.getElementById("detailAdres").value = extraAddr;
			
			} else {
				document.getElementById("detailAdres").value = '';
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById("zip").value = data.zonecode;
			document.getElementById("adres").value = addr;
			// 커서를 상세주소 필드로 이동한다.
			document.getElementById("detailAdres").focus();
			
			if( $("#lat").length > 0 && $("#lng").length > 0 ) {
				fn_crdntAdresSearch();
			}
		}
	}).open();
}