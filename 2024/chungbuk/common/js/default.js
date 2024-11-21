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
	
	if(frm[fieldNm]) {
		console.log('fn_isEmpty form field ' + fieldNm + 'exist...');
		return ( !Trim(frm[fieldNm].value) ) ? true : false;
	} else {
		console.log('fn_isEmpty form field ' + fieldNm + 'not exist...');
		return false;
	}	
}

function fnDatepickerSetting(elementId){
	var clareCalendar = {
			closeText : "닫기",
			monthNamesShort: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
			dayNamesMin: ["일","월","화","수","목","금","토"],
			weekHeader: "Wk",
			dateFormat: "yy-mm-dd", //형식(20120303)
			autoSize: false, //오토리사이즈(body등 상위태그의 설정에 따른다)
			changeMonth: true, //월변경가능
			changeYear: true, //년변경가능
			showMonthAfterYear: true, //년 뒤에 월 표시
			buttonImageOnly: true, //이미지표시
			buttonText: "", //버튼 텍스트 표시
			buttonImage: "/neo/images/btn_calendar.gif", //이미지주소
			showOn: "both", //엘리먼트와 이미지 동시 사용(both,button)
			yearRange: "1950:2020" //1950년부터 2020년까지
			};
	
	if(elementId != null && elementId != ""){
		$("#"+elementId).datepicker(clareCalendar);
		
		$("#"+elementId).keyup(function(){
			var value = this.value;

			if(event.keyCode != 16 && event.keyCode != 33 && event.keyCode != 34 && event.keyCode != 35 && event.keyCode != 36 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 45){
				this.value = fnReplaceDate(value);
			}
		});
	}else{
		$("#startDate").datepicker(clareCalendar);
		$("#endDate").datepicker(clareCalendar);
		
		$("#startDate, #endDate").keyup(function(){
			var value = this.value;
			
			if(event.keyCode != 16 && event.keyCode != 33 && event.keyCode != 34 && event.keyCode != 35 && event.keyCode != 36 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 45)
			{
				this.value = fnReplaceDate(value);
			}
		});
	}
	$("img.ui-datepicker-trigger").attr("style","width:28px; vertical-align:middle; cursor:pointer;"); //이미지버튼 style적용
}

function fnDatepickerSetting2(elementId, minDay, week, year, month, day){
	// 신청일 기준 "내일"부터 "다음달 말일"까지 선택 가능
	// maxDate(다음달 말일 구하기)
	// 이번달 최대일자 - 현재날짜 = 나머지      ex) 2019년 11월 19일 기준 --> 30 - 19 = 11 
	// maxDate = 나머지 + 다음달 최대일자   ex) 11 + 31 = 42
	var date1 = ((new Date(year, month, 0)).getDate() - (new Date(year, month, day)).getDate());
	var date2 = (new Date(year, month+1, 0)).getDate();
	var maxDate = date1 + date2;
	
	var clareCalendar = {
			closeText : "닫기",
			monthNamesShort: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
			dayNamesMin: ["일","월","화","수","목","금","토"],
			weekHeader: "Wk",
			dateFormat: "yy-mm-dd", //형식(20120303)
			autoSize: false, //오토리사이즈(body등 상위태그의 설정에 따른다)
			changeMonth: true, //월변경가능
			changeYear: true, //년변경가능
			showMonthAfterYear: true, //년 뒤에 월 표시
			buttonImageOnly: true, //이미지표시
			buttonText: "", //버튼 텍스트 표시
			buttonImage: "/neo/images/btn_calendar.gif", //이미지주소
			showOn: "both", //엘리먼트와 이미지 동시 사용(both,button)
			yearRange: "2018:2030", //2018년부터 2030년까지
			beforeShowDay: function(date) {
				var day = date.getDay(); // 0, 1, 2, 3, 4, 5, 6
				
				// 요일(week)가 한개인 경우
				if (week.length == 1) {
					return [(day == week)];
				} else {
					var wSplit = week.split(',');
					for (var i = 0; i < wSplit.length; i++) {
						if ($.inArray(wSplit[i],wSplit) != -1) {
							return [(day == wSplit[i] || day == wSplit[i+1] || day == wSplit[i+2] || day == wSplit[i+3] || day == wSplit[i+4] || day == wSplit[i+5])];
						}
					}
				}
			},
			minDate: minDay,	// minDay = 1, 신청당일 선택불가
			maxDate : maxDate,		//최대 30일 까지 선택 가능
			nextText: '다음 달', // next 아이콘의 툴팁.
			prevText: '이전 달', // prev 아이콘의 툴팁.
			};
	
	if(elementId != null && elementId != ""){
		$("#"+elementId).datepicker(clareCalendar);
		
		$("#"+elementId).keyup(function(){
			var value = this.value;

			if(event.keyCode != 16 && event.keyCode != 33 && event.keyCode != 34 && event.keyCode != 35 && event.keyCode != 36 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 45){
				this.value = fnReplaceDate(value);
			}
		});
	}else{
		$("#startDate").datepicker(clareCalendar);
		$("#endDate").datepicker(clareCalendar);
		
		$("#startDate, #endDate").keyup(function(){
			var value = this.value;
			
			if(event.keyCode != 16 && event.keyCode != 33 && event.keyCode != 34 && event.keyCode != 35 && event.keyCode != 36 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 45)
			{
				this.value = fnReplaceDate(value);
			}
		});
	}
	$("img.ui-datepicker-trigger").attr("style","width:26px; vertical-align:middle; cursor:pointer;"); //이미지버튼 style적용
}