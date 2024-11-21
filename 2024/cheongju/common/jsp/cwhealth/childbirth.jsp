<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kr.co.hanshinit.xwcms.cmm.util.StringUtil"%>
<%
	String key = StringUtil.nvl(request.getParameter("key"));
	String year = StringUtil.nvl(request.getParameter("year"));
	String month = StringUtil.nvl(request.getParameter("month"));
	String day = StringUtil.nvl(request.getParameter("day"));
%>
<script type="text/javascript"> 
var winopts =
"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=630,height=450"
function product(filename){
  winname = "temp"
  smallwindow = window.open(filename,winname,winopts)
  if (navigator.appVersion.indexOf("(X11") != -1 ||
    navigator.appVersion.indexOf("(Mac") != -1)
       smallwindow = window.open(filename,winname,winopts)
}
// general purpose function to see if an input value has been entered at all
function isEmpty(inputStr) {
 if (inputStr == "" || inputStr == null) {
   return true
 }
 return false
}
// general purpose function to see if a suspected numeric input
// is a positive integer
function isNumber(inputStr) {
 for (var i = 0; i < inputStr.length; i++) {
   var oneChar = inputStr.charAt(i)
   if (oneChar < "0" || oneChar > "9") {
     return false
   }
 }
 return true
}
// function to determine if value is in acceptable range for this application
function inRangeDay(inputStr) {
 num = parseInt(inputStr)
 if (num < 1 || num > 31) {
   return false
 }
 return true
}
// function to determine if value is in acceptable range for this application
function inRangeYear(inputStr) {
 num = parseInt(inputStr)
 if (num < 1900 || num > 3000) {
   return false
 }
 return true
}
// Master value validator routine for year
function isValidYear(inputStr) {
 if (isEmpty(inputStr)) {
   alert("해당 년도를 기록해 주세요.")
   document.dates.year.focus();
   return false
 } else {
   if (!isNumber(inputStr)) {
     alert("데이터를 바르게 넣어 주세요.")
     return false
   } else {
     if (!inRangeYear(inputStr)) {
       alert("해당 년도 범위가 잘못 입력되었습니다.")
       return false
     }
   }
 }
 return true
}
// Master value validator routine for day
function isValidDay(inputStr) {
 if (isEmpty(inputStr)) {
   alert("해당 일자를 기록해 주세요.")
   return false
 } else {
   if (!isNumber(inputStr)) {
     alert("데이터를 바르게 넣어 주세요.")
     return false
   } else {
     if (!inRangeDay(inputStr)) {
       alert("해당 일자의 범위가 잘못 입력되었습니다.")
       return false
     }
   }
 }
 return true
}
function makeArray(n) {
 this.length = n
 for (var i=1; i <= n; i++)
   this[i] = null
   return this
}
var maxday = new makeArray(12)
maxday[1] = 31
maxday[2] = 28
maxday[3] = 31
maxday[4] = 30
maxday[5] = 31
maxday[6] = 30
maxday[7] = 31
maxday[8] = 31
maxday[9] = 30
maxday[10] = 31
maxday[11] = 30
maxday[12] = 31
var monthname = new makeArray(12)
monthname[1] = "1월"
monthname[2] = "2월"
monthname[3] = "3월"
monthname[4] = "4월"
monthname[5] = "5월"
monthname[6] = "6월"
monthname[7] = "7월"
monthname[8] = "8월"
monthname[9] = "9월"
monthname[10] = "10월"
monthname[11] = "11월"
monthname[12] = "12월"
var adddays = new makeArray(7)
adddays[1] = 14
adddays[2] = 35
adddays[3] = 70
adddays[4] = 84
adddays[5] = 161
adddays[6] = 189
adddays[7] = 280
// Calculate the date string
function calcNewDate(year,month,day,adddays) {
 newday = eval(day) + adddays
 newmonth = month + 1
 newyear = eval(year)
 var max
 for (var i = 0; i < 12; i++) {
   if (newmonth == 2 && (newyear % 4) == 0) {
  max = 29
   } else
  max = maxday[newmonth]
   if (newday > max) {
  newday = newday - max
  newmonth = newmonth + 1
  if (newmonth > 12) {
    newyear = newyear + 1
    newmonth = 1
  }
   }
   else
  break
 }
 var datestring = newyear + "년 " + monthname[newmonth] + " " + newday + "일"
 return datestring
}
// Get the date entered and calculate the rest of the dates
function calc(form) {
 f = document.dates;
 day = f.day.value
 year = f.year.value
 monthnum = f.month.selectedIndex
 if (isValidDay(day)) {
   if (isValidYear(year)){
  f.conception.value = calcNewDate(year,monthnum,day,adddays[1])
  f.beginrisk.value = calcNewDate(year,monthnum,day,adddays[2])
  f.endrisk.value = calcNewDate(year,monthnum,day,adddays[3])
  f.beginorgan.value = calcNewDate(year,monthnum,day,adddays[2])
  f.endorgan.value = calcNewDate(year,monthnum,day,adddays[3])
  f.endfirst.value = calcNewDate(year,monthnum,day,adddays[4])
  f.preemies.value = calcNewDate(year,monthnum,day,adddays[5])
  f.endsecond.value = calcNewDate(year,monthnum,day,adddays[6])
  f.duedate.value = calcNewDate(year,monthnum,day,adddays[7])
   }
 }
 return false;
}
  function showDatesr(a){
  f = document.dates;
  f.conception.value = "";
  f.beginrisk.value = "";
  f.endrisk.value = "";
  f.beginorgan.value = "";
  f.endorgan.value = "";
  f.endfirst.value = "";
  f.preemies.value = "";
  f.endsecond.value = "";
  f.duedate.value = "";
 }
function calc2(a,b,c) {
 f = document.dates;
 day = c
 year = a
 monthnum = eval(b - 1);
 if (isValidDay(day)) {
   if (isValidYear(year)){
  f.conception.value = calcNewDate(year,monthnum,day,adddays[1])
  f.beginrisk.value = calcNewDate(year,monthnum,day,adddays[2])
  f.endrisk.value = calcNewDate(year,monthnum,day,adddays[3])
  f.beginorgan.value = calcNewDate(year,monthnum,day,adddays[2])
  f.endorgan.value = calcNewDate(year,monthnum,day,adddays[3])
  f.endfirst.value = calcNewDate(year,monthnum,day,adddays[4])
  f.preemies.value = calcNewDate(year,monthnum,day,adddays[5])
  f.endsecond.value = calcNewDate(year,monthnum,day,adddays[6])
  f.duedate.value = calcNewDate(year,monthnum,day,adddays[7])
   }
 }
 document.dates.year.value=a;
 document.dates.month.value=b;
 document.dates.day.value=c;
}

<% if( !StringUtil.isEmpty(year) ) { %>
$(document).ready(function(){
	calc(document.dates);
});
<% } %>
</script>


<form id="dates" name="dates" method="get" action="./contents.do" onSubmit="return calc(this);">
   <fieldset>
    <legend>출산예정일 </legend>
	<input type="hidden" name="key" id="key" value="<%= key %>"/>
        <div class="cts_5596_sch">
            <div>
                <p class="title"><img src="/site/cwhealth/images/contents/cts_5596_title.png" alt="출산예정일 알아보기" /></p>
                <ul class="bu">
                    <li>우리아이가 언제 태어날지 궁금하시죠?</li>
                    <li>마지막 월경시작일을 입력하시고 계산하기 버튼을 눌러보세요.</li>
                    <li>출산예정일 뿐만 아니라 아이에게 중요한 기간들을 알려드립니다. </li>
                </ul>
                <ul class="date">
                    <li><input type="text" name="year" id="year" class="text" maxlength="4" value="<%= year %>" /> <label for="year">년</label>
                    <li class="sel">
                        <select name="month" id="month" title="월선택">
						<% for( int i=1; i<=12; i++ ) { %>
                            <option value="<%= i %>" <%= String.valueOf(i).equals(month) ? "selected=\"selected\"" : "" %>><%= i %></option>
						<% } %>           
                      </select>
                       <label for="smonth">월</label>
                    </li>
                    <li class="sel">
                        <select name="day" id="day" title="일선택">
						<% for( int i=1; i<=31; i++ ) { %>
                            <option value="<%= i %>" <%= String.valueOf(i).equals(day) ? "selected=\"selected\"" : "" %>><%= i %></option>
						<% } %>        
                      </select>
                       <label for="sday">일</label>
                    </li>
                </ul>
                <p>
                    <span><input type="image" src="/site/cwhealth/images/contents/cts_2093_sch_btn.gif" alt="계산하기" /></span>
                    <span><a href="./contents.do?key=<%= key %>"><img src="/site/cwhealth/images/contents/cts_2093_sch_btn2.gif" alt="다시하기" /></a></span>
                </p>
            </div>
        </div><!-- //cts_2093_sch -->

<h2>의사를 방문하여 아기 상태를 보고 출산 방법을 선택하세요</h2>

<div class="indent cts_5596_table">
    <table class="table_t1" summary="임신날짜별 안내.">
        <caption>임신</caption>
        <colgroup>
            <col width="60%" />
        </colgroup>
              <tbody class="text_center">
            <tr>
                <th scope="row"> 엄마의 임신일(마지막 월경 첫째날로부터 약2주뒤)</th>
				<td><input type="text" id="conception" name="conception" style="width:120px; border:none;" readonly="readonly" value="" title="엄마의 임신일(마지막 월경 첫째날로부터 약2주뒤)"></td>
			</tr>
			<tr>
                <th scope="row">아기에게 가장 위험한 시기 (임신 5~10주 사이) 	에서 까지</th>
				<td>
					<input type="text" id="beginrisk" name="beginrisk" style="width:120px; border:none;" readonly="readonly" value="" title="아기에게 가장 위험한 시기 (임신 5~10주 사이)">
					에서
					<input type="text" id="endrisk" name="endrisk" style="width:120px; border:none;" readonly="readonly" value="" title="아기에게 가장 위험한 시기 (임신 5~10주 사이)">
					까지
				</td>
			</tr>
			<tr>
                <th scope="row">아기에게 가장 중요한 장기가 생성되는 시기</th>
				<td><input type="text" id="beginorgan" name="beginorgan" style="width:120px; border:none;" readonly="readonly" value="" title="아기에게 가장 중요한 장기가 생성되는 시기"> 까지</td>
			</tr>
			<tr>
                <th scope="row">아기에게 기타 주요 장기가 생성되는 시기 </th>
				<td><input type="text" id="endorgan" name="endorgan" style="width:120px; border:none;" readonly="readonly" value="" title="아기에게 기타 주요 장기가 생성되는 시기"></td>
			</tr>
			<tr>	
                <th scope="row">유산이 줄어드는 시기 (12-27 주) 	</th>
				<td><input type="text" id="endfirst" name="endfirst" style="width:120px; border:none;" readonly="readonly" value="" title="유산이 줄어드는 시기 (12-27 주)"></td>
			</tr>
			<tr>
                <th scope="row">만일 미숙아라도 이기간 이후 태어나면 생존확률이 높다 </th>
				<td><input type="text" id="preemies" name="preemies" style="width:120px; border:none;" readonly="readonly" value="" title="만일 미숙아라도 이기간 이후 태어나면 생존확률이 높다"></td>
			</tr>
			<tr>
                <th scope="row">임신3기가 시작되는 시일 (27 주) </th>
				<td><input type="text" id="endsecond" name="endsecond" style="width:120px; border:none;" readonly="readonly" value="" title="임신3기가 시작되는 시일 (27 주)"></td>
			</tr>
			<tr>
                <th scope="row">출산 예정일 </th>
				<td><input type="text" id="duedate" name="duedate" style="width:120px; border:none;" readonly="readonly" value="" title="출산 예정일"></td>
			</tr>
			<tr>
                </td>
            </tr>
        </tbody>
    </table>
</div>

   </fieldset> 
</form>