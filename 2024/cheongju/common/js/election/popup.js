
/**
 * str이 공백문자인지 판단한다.
 *
 * 아래의 경우는 모두 true이다.
 *
 * str = null
 * str = ""
 * str = "    "(공백문자로만 이루어진 경우)
 */
String.prototype.isBlank = function () { return patBlank.test(this); }
var patBlank = /^\s*$/i;

/**
 * isBlank(str)와 반대
 */
String.prototype.isNotBlank = function() { return !this.isBlank(); }

/**
 * 가변길이 변수를 지원하는 팝업창 스크립트
 *
 * href : 새창에 띄울 페이지 주소
 * winName : 새창이름
 * wLen : 새창의 폭
 * hLen : 새창의 높이
 * useScroll : 스크롤바의 표시여부(y/n/Y/N)
 * xPos : 새창의 x좌표
 * yPos : 새창의 y좌표
 */
function popWin(href, winName, wLen, hLen, useScroll, xPos, yPos) {
	var newWin;
	var _winName = "blankWin";
	var _wLen = 100;
	var _hLen = 100;
	var _useScroll = "no";
	var _xPos;
	var _yPos;
	var strWindowFeatures;

	try {
		if(arguments[0]) { if(href.isBlank()) return null; }
		if(arguments[1] && winName.isNotBlank()) {
			_winName = winName;
		}
		if(arguments[2]) {
			if(typeof(wLen) == "number") {
				_wLen = wLen;
			} else if((typeof(wLen) == "string") && wLen.isNotBlank() && wLen.isInt()) {
				_wLen = parseInt(wLen, 10);
			}
		}
		if(arguments[3]) {
			if(typeof(hLen) == "number") {
				_hLen = hLen;
			} else if((typeof(hLen) == "string") && hLen.isNotBlank() && hLen.isInt()) {
				_hLen = parseInt(hLen, 10);
			}
		}
		if(arguments[4]) {
			if((typeof(useScroll) == 'string') && useScroll.isNotBlank() && useScroll.toUpperCase() == "Y") {
				_useScroll = "yes";
			}
		}
		if(arguments[5]) {
			if(typeof(xPos) == "number") {
				_xPos = xPos;
			} else if((typeof(xPos) == "string") && xPos.isNotBlank() && xPos.isInt()) {
				_xPos = parseInt(xPos, 10);
			} else {
				_xPos = (window.screen.width / 2) - (_wLen / 2);
			}
		} else {
			_xPos = (window.screen.width / 2) - (_wLen / 2);
		}
		if(arguments[6]) {
			if(typeof(yPos) == "number") {
				_yPos = yPos;
			} else if((typeof(yPos) == "string") && yPos.isNotBlank() && yPos.isInt()) {
				_yPos = parseInt(yPos, 10);
			} else {
				_yPos = (window.screen.height / 2) - (_hLen / 2);
			}
		} else {
			_yPos = (window.screen.height / 2) - (_hLen / 2);
		}
		strWindowFeatures = "width=" + _wLen + "px" +
			",height=" + _hLen + "px" +
			",left=" + _xPos +
			",top=" + _yPos +
			",scrollbars=" + _useScroll +
			",status=yes,location=no,resizable=no,toolbar=no,menubar=no,directories=no";
		newWin = window.open(href, _winName, strWindowFeatures);
		if(newWin) {
			newWin.focus();
		} else {
			alert("팝업이 차단되었습니다.");
		}
	} catch (e) {
		alert(dumpException(e));
	}
	return newWin;
}


function submit1() {
	var fmt1 = /^\s\s*$/;

	if(document.refForm.name.value == "" || fmt1.exec(document.refForm.name.value)){
			alert('성명을 입력하여 주십시오');
			document.refForm.name.focus();
			return false;
	}
	if(document.refForm.birthday.value == "" || fmt1.exec(document.refForm.birthday.value)){
			alert('생년월일를 입력하여 주십시오');
			document.refForm.birthday.focus();
			return false;
	}


	document.refForm.submit();
}

function submit2() {
	var fmt1 = /^\s\s*$/;


	if(document.refForm.joomin.value == "" || fmt1.exec(document.refForm.joomin.value)){
			alert('주민번호 뒤 3자리를 입력하여 주십시오');
			document.refForm.joomin.focus();
			return false;
	}

	document.refForm.submit();
}

function submit3() {

	document.refForm.submit();
}



function AddSubmit() {
	var fmt1 = /^\s\s*$/;

	if(document.registerForm.name.value == "" || fmt1.exec(document.registerForm.name.value)){
			alert('성명을 입력하여 주십시오');
			document.registerForm.name.focus();
			return false;
	}
	if(document.registerForm.birthday.value == "" || fmt1.exec(document.registerForm.birthday.value)){
			alert('생년월일를 입력하여 주십시오');
			document.registerForm.birthday.focus();
			return false;
	}
	if(document.registerForm.tel.value == "" || fmt1.exec(document.registerForm.tel.value)){
			alert('연락처를 입력하여 주십시오');
			document.registerForm.tel.focus();
			return false;
	}
	if(document.registerForm.email.value == "" || fmt1.exec(document.registerForm.email.value)){
			alert('이메일를 입력하여 주십시오');
			document.registerForm.email.focus();
			return false;
	}
	if(document.registerForm.title.value == "" || fmt1.exec(document.registerForm.title.value)){
			alert('제목을 입력하여 주십시오');
			document.registerForm.title.focus();
			return false;
	}
	if(document.registerForm.contents.value == "" || fmt1.exec(document.registerForm.contents.value)){
			alert('내용을 입력하여 주십시오');
			document.registerForm.contents.focus();
			return false;
	}

	alert("이의 신청이 접수 되었습니다.");
	document.registerForm.submit();
}

function updateSubmit() {
	var fmt1 = /^\s\s*$/;

	if(document.form1.contents2.value == "" || fmt1.exec(document.form1.contents2.value)){
			alert('처리 내용을 입력하여 주십시오');
			document.form1.contents2.focus();
			return false;
	}

	document.form1.submit();
}

