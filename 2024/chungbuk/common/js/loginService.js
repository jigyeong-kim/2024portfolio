$(document).ready(function(){
	var startdate = "2022111609";  
	var enddate = "2022111620";   
	         
	var now = new Date();   //현재시간
	         
	year = now.getFullYear();   //현재시간 중 4자리 연도
	month = now.getMonth()+1;   //현재시간 중 달. 달은 0부터 시작하기 때문에 +1 
	if((month+"").length < 2){
	    month="0"+month;   //달의 숫자가 1자리면 앞에 0을 붙임.
	}
	date = now.getDate();      //현재 시간 중 날짜.
	if((date+"").length < 2){
	    date="0"+date;      
	}
	hour = now.getHours();   //현재 시간 중 시간.
	if((hour+"").length < 2){
	hour="0"+hour;      
	}
	today = year + "" + month + "" + date+ "" +hour;      //오늘 날짜 완성.
	// 시간비교
	if ((eval(today) >= eval(startdate)) && ((eval(today) <= eval(enddate))))  {  
		fn_loginService();
	}
});

function fn_loginService(){
	alert('<홈페이지 로그인 서비스 일시중단 안내>\n로그인 서버 점검에 따라 로그인 서비스가 일시중단 될수 있습니다.\n○ 중단일시: 2022. 11. 17.(목) 18:00 ~ 21:00 (3시간)');
}
