function checkPhoneNumber(phonenum){
	var regPhone = /(01[0|1|6|9|7])[-](\d{3}|\d{4})[-](\d{4}$)/g;
	if(regPhone.test(phonenum)){
		return true;
	}else{
		alert('잘못된 휴대폰 번호입니다.');
		return false;
	}
}

function reqLocationInfoText() {
	try {
		
		/** 전화번호 */
		var phoneNumber = document.getElementById('telNumber');
		
		/** 폰번호 입력 확인 */
		if(phoneNumber.value == undefined || phoneNumber.value == null || phoneNumber.value == "") {
			alert("전화번호를 입력해 주세요.");
			return;
		}
 
        if((checkPhoneNumber(phoneNumber.value))==false){
           console.log('phoneNumber Regax filter');
           return;
        }
		
		/** TODO 전화번호 유효 여부 */
		
		/** 문자 전송 요청 확인 */
		var reqConfirm = confirm('"주소, 전화번호, 지도 URL" 정보를 전화번호 ' + phoneNumber.value + '으로 문자 전송하시겠습니까?');
		
		if(reqConfirm == false) {
			return;
		}
		
		/** XMLHttpRequest */
		var xmlHttpRequest = new XMLHttpRequest();
		
		xmlHttpRequest.onload = function() {
			if(xmlHttpRequest.status === 200) {				
				const obj = JSON.parse(xmlHttpRequest.response);
				if(obj.state == 'ok') {
					alert('"주소, 전화번호, 지도 URL" 정보를 문자로 전송하였습니다.');
					/** 전화번호 초기화 */
					phoneNumber.value = '';
				} else {
					alert(obj.msg);
				}				
			} else {
				console.log(xmlHttpRequest.status);
			}
		}
		
		xmlHttpRequest.onerror = function() {
			console.log("error");
			console.log(this);
		}
		
		xmlHttpRequest.responseType = 'json';
		xmlHttpRequest.open("POST", "/www/locationToPhone.do", true);
		
		xmlHttpRequest.send("phoneNumber="+phoneNumber.value);		
	} catch (e) {
		console.error(e);
	}
}

const autoHyphen2 = (target) => {
	 target.value = target.value
	   .replace(/[^0-9]/g, '')
	  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
	}