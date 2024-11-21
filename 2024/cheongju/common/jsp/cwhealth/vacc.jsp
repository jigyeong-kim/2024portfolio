<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kr.co.hanshinit.xwcms.cmm.util.StringUtil"%>
<%
	String key = StringUtil.nvl(request.getParameter("key"));
	String syear = StringUtil.nvl(request.getParameter("syear"));
	String smonth = StringUtil.nvl(request.getParameter("smonth"));
	String sday = StringUtil.nvl(request.getParameter("sday"));
%>
<script type="text/javascript">
<!--
function over(th) {
 th.style.backgroundColor="#F6F6F6";
}
function out(th) {
 th.style.backgroundColor="";
}

var statusmsg=""
function hidestatus(){
window.status=statusmsg
return true
}

function printWindow() {
bV = parseInt(navigator.appVersion);
if (bV >= 4) window.print();
}

function showDatesr(a){
  objForm = document.fm;
  var dateAfter = new Array('','','','','','','','','','','','','','','',''); //  몇 개월후
     for(var i=0;i<dateAfter.length;i++){
       objForm.dateAfter[i].value = "";
   }
 }
  function showDates(a){
     //var dateValue = objForm.inputDate.value.replace(/\s/g,''); // 모든 공백 문자를 제거하여야 숫자계산가능, g꼭 추가!!
     //    dateValue = dateValue.replace(/\D/g,'-'); // 핵심: 모든 숫자아닌 문자를 -로변환.
  objForm = document.fm;
 
     var dateY = objForm.syear.value.replace(/\s/g,''); // 모든 공백 문자를 제거하여야 숫자계산가능, g꼭 추가!!
         dateY = dateY.replace(/\D/g,'-'); // 핵심: 모든 숫자아닌 문자를 -로변환.
     var dateM = objForm.smonth.value.replace(/\s/g,''); // 모든 공백 문자를 제거하여야 숫자계산가능, g꼭 추가!!
         dateM = dateM.replace(/\D/g,'-'); // 핵심: 모든 숫자아닌 문자를 -로변환.
     var dateD = objForm.sday.value.replace(/\s/g,''); // 모든 공백 문자를 제거하여야 숫자계산가능, g꼭 추가!!
         dateD = dateD.replace(/\D/g,'-'); // 핵심: 모든 숫자아닌 문자를 -로변환.
   var dateValue;
     dateValue = dateY+"-"+dateM+"-"+dateD;

     var date = dateValue.split('-');
         function isDate(year,month,date){
              var yonYear;
              var dynDate;
               yonYear = ( year%4 == 0 );
               if( month == 1 || month == 3 || month == 5 || month == 7 || month == 3 || month == 8 || month == 10 || month == 12 ){
                   dynDate = 31;
               }
               else if(month == 2){ // 2월
                   dynDate = (yonYear)?29:28;
               }
               else {
                   dynDate = 30;
               }
               if(month == 2 && date > dynDate){
                   alert(date+'는 초과된 일수입니다.\n'+year+'년도의 '+month+'월은'+dynDate+'까지 입니다.');
                   return false;
               }
               return true;
         }
             // 년,월,일         - 년도의 자리수        - 달의 범위
         if( date.length != 3 || date[0].length !=4 || date[1] < 1 || date[1] > 12 ){
             alert('올바른 형식이 아닙니다.');
             return false;
         }
            // - 일의 범위및 윤년범위
         if(!isDate(date[0],date[1],date[2])){
             return false;
         }
     var dateAfter = new Array(1,2,2,4,4,6,6,9,12,15,12,18,60,72,132,144); //  몇 개월후
     for(var i=0;i<dateAfter.length;i++){
       var currentDay =  new Date(date[0],(date[1]-1),date[2]); // 핵심: 루프문 안에 있어야 함!! 에러!! date[1]를 -+연산안하고 직접입력하고 뽑아내면 12월이 0으로 됨
           currentDay.setMonth( currentDay.getMonth() + dateAfter[i] ); //주의할점 밑에 today.setMont가 아닌 today를 넣어야합니다.
		   switch(i) {
		    case 2:
		    case 4:
		    case 6:
		     currentDay.setDate( currentDay.getDate() + 7 );
		     objForm.dateAfter[i].value = currentDay.getFullYear() + '년' + (currentDay.getMonth()+1) + '월' + currentDay.getDate() +'일';
		     break;
		    default:
		     objForm.dateAfter[i].value = currentDay.getFullYear() + '년' + (currentDay.getMonth()+1) + '월' + currentDay.getDate() +'일';
		     break;
		   }
     }
	 return false;
  }
 
  function showDates2(a,b,c){
     //var dateValue = objForm.inputDate.value.replace(/\s/g,''); // 모든 공백 문자를 제거하여야 숫자계산가능, g꼭 추가!!
     //    dateValue = dateValue.replace(/\D/g,'-'); // 핵심: 모든 숫자아닌 문자를 -로변환.
   if (a != "" && b != "" && c != ""){
  objForm = document.fm;
     var dateY = a.replace(/\s/g,''); // 모든 공백 문자를 제거하여야 숫자계산가능, g꼭 추가!!
         dateY = dateY.replace(/\D/g,'-'); // 핵심: 모든 숫자아닌 문자를 -로변환.
     var dateM = b.replace(/\s/g,''); // 모든 공백 문자를 제거하여야 숫자계산가능, g꼭 추가!!
         dateM = dateM.replace(/\D/g,'-'); // 핵심: 모든 숫자아닌 문자를 -로변환.
     var dateD = c.replace(/\s/g,''); // 모든 공백 문자를 제거하여야 숫자계산가능, g꼭 추가!!
         dateD = dateD.replace(/\D/g,'-'); // 핵심: 모든 숫자아닌 문자를 -로변환.
   var dateValue;
     dateValue = dateY+"-"+dateM+"-"+dateD;
     var date = dateValue.split('-');
         function isDate(year,month,date){
              var yonYear;
              var dynDate;
               yonYear = ( year%4 == 0 );
               if( month == 1 || month == 3 || month == 5 || month == 7 || month == 3 || month == 8 || month == 10 || month == 12 ){
                   dynDate = 31;
               }
               else if(month == 2){ // 2월
                   dynDate = (yonYear)?29:28;
               }
               else {
                   dynDate = 30;
               }
               if(month == 2 && date > dynDate){
                   alert(date+'는 초과된 일수입니다.\n'+year+'년도의 '+month+'월은'+dynDate+'까지 입니다.');
                   return false;
               }
               return true;
         }
             // 년,월,일         - 년도의 자리수        - 달의 범위
         if( date.length != 3 || date[0].length !=4 || date[1] < 1 || date[1] > 12 ){
             alert('올바른 형식이 아닙니다.');
             return false;
         }
            // - 일의 범위및 윤년범위
         if(!isDate(date[0],date[1],date[2])){
             return false;
         }
     var dateAfter = new Array(1,2,2,4,4,6,6,9,12,15,12,18,60,72,132,144); //  몇 개월후
     for(var i=0;i<dateAfter.length;i++){
       var currentDay =  new Date(date[0],(date[1]-1),date[2]); // 핵심: 루프문 안에 있어야 함!! 에러!! date[1]를 -+연산안하고 직접입력하고 뽑아내면 12월이 0으로 됨
           currentDay.setMonth( currentDay.getMonth() + dateAfter[i] ); //주의할점 밑에 today.setMont가 아닌 today를 넣어야합니다.
   switch(i) {
    case 2:
    case 4:
    case 6:
     currentDay.setDate( currentDay.getDate() + 7 );
     objForm.dateAfter[i].value = currentDay.getFullYear() + '년' + (currentDay.getMonth()+1) + '월' + currentDay.getDate() +'일';
     break;
    default:
     objForm.dateAfter[i].value = currentDay.getFullYear() + '년' + (currentDay.getMonth()+1) + '월' + currentDay.getDate() +'일';
     break;
   }
     }
   document.fm.syear.value=a;
   document.fm.smonth.value=b;
   document.fm.sday.value=c;
   }
  }

<% if( !StringUtil.isEmpty(syear) ) { %>
$(document).ready(function(){
	showDates(document.fm);
});
<% } %>
//-->  
</script>

<form method="get" name="fm" id="fm" action="./contents.do" onSubmit="return showDates(this);">
   <fieldset>
    <legend>예방접종 </legend>
    <input type="hidden" name="key" id="key" value="<%= key %>"/>
        <div class="cts_2093_sch">
            <div>
                <p class="title"><img src="images/contents/cts_2093_sch_title.gif" alt="우리아기 예방접종 날짜알기" /></p>
                <ul class="bu">
                    <li>아이에게 필요한 예방접종일을 간편하게 알려드립니다.</li>
                    <li>아기의 양력생일을 입력하시고 계산하기 버튼을 누르세요.</li>
                </ul>
                <ul class="date">
                    <li><input type="text" name="syear" id="syear" maxlength="4" value="<%= syear %>"/> <label for="syear">년</label>
                    <li class="sel">
                        <select name="smonth" id="smonth" title="월선택">
						<% for( int i=1; i<=12; i++ ) { %>
                            <option value="<%= i %>" <%= String.valueOf(i).equals(smonth) ? "selected=\"selected\"" : "" %>><%= i %></option>
						<% } %>
                      </select>
                       <label for="smonth">월</label>
                    </li>
                    <li class="sel">
                        <select name="sday" id="sday" title="일선택">
						<% for( int i=1; i<=31; i++ ) { %>
                            <option value="<%= i %>" <%= String.valueOf(i).equals(sday) ? "selected=\"selected\"" : "" %>><%= i %></option>
						<% } %>
                      </select>
                       <label for="sday">일</label>
                    </li>
                </ul>
                <p>
                    <span><input type="image" src="images/contents/cts_2093_sch_btn.gif" alt="계산하기" /></span>
                    <span><a href="./contents.do?key=<%= key %>"><img src="images/contents/cts_2093_sch_btn2.gif" alt="다시하기" /></a></span>
                </p>
            </div>
        </div><!-- //cts_2093_sch -->

<h2>기본접종 및 권장접종</h2>

<div class="indent cts_2093_table">
    <table class="table_t1" summary="기본접종 및 권장접종에 대한 연령별 접종내용,접종일자 정보를 제공합니다.">
        <caption>기본접종 및 권장접종 표</caption>
        <colgroup>
            <col />
            <col width="*" />
            <col width="30%" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col">연령</th>
                <th scope="col">접종내용</th>
                <th scope="col">접종일자</th>
            </tr>
        </thead>
        <tbody class="text_center">
            <tr>
                <td scope="row">0 - 1주</td>
                <td>B형간염 1차</td>
                <td>출생후 1주일 이내</td>
            </tr>
            <tr>
                <td scope="row">0 - 1개월</td>
                <td>BCG (3주~4주), B형간염 2차</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value=""  title="BCG (3주~4주), B형간염 2차" />
                </td>
            </tr>
            <tr>
                <td scope="row">2개월</td>
                <td>DTaP/소아바미 1차</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="DTaP/소아바미 1차" />
                </td>
            </tr>
            <tr>
                <td scope="row">2개월</td>
                <td>뇌수막염, 폐구균 1차</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="뇌수막염, 폐구균 1차" />
                </td>
            </tr>
            <tr>
                <td scope="row">4개월</td>
                <td>DTaP/소아마비 2차</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="DTaP/소아마비 2차" />
                </td>
            </tr>
            <tr>
                <td scope="row">4개월</td>
                <td>뇌수막염, 폐구균 2차</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="뇌수막염, 폐구균 2차" />
                </td>
            </tr>
            <tr>
                <td scope="row">6개월</td>
                <td>B형간염3차, DTaP/소아마비 3차</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="B형간염3차, DTaP/소아마비 3차" />
                </td>
            </tr>
            <tr>
                <td scope="row">6개월</td>
                <td>뇌수막염, 폐구균 3차</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="뇌수막염, 폐구균 3차" />
                </td>
            </tr>
            <tr>
                <td scope="row">9개월</td>
                <td>빈혈검사</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="빈혈검사" />
                </td>
            </tr>
            <tr>
                <td scope="row">12개월</td>
                <td>수두, MMR(홍역,볼거리,풍진)</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="수두, MMR(홍역,볼거리,풍진)" />
                </td>
            </tr>
            <tr>
                <td scope="row">15개월</td>
                <td>뇌수막염 추가, 폐구균 추가</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="뇌수막염 추가, 폐구균 추가" />
                </td>
            </tr>
            <tr>
                <td scope="row">12 - 36개월</td>
                <td>일본뇌염, 1~2주간격 2회,1년뒤추가</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="일본뇌염, 1~2주간격 2회,1년뒤추가" />
                </td>
            </tr>
            <tr>
                <td scope="row">18개월</td>
                <td>DTaP 추가</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="DTaP 추가" />
                </td>
            </tr>
            <tr>
                <td scope="row">4 - 6세</td>
                <td>DTaP/소아마비 추가, MMR(홍역,볼거리,풍진)</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="DTaP/소아마비 추가, MMR(홍역,볼거리,풍진)" />
                </td>
            </tr>
            <tr>
                <td scope="row">6세</td>
                <td>일본뇌염(6세)</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="일본뇌염(6세)" />
                </td>
            </tr>
            <tr>
                <td scope="row">11 - 12세</td>
                <td>성인용 Td</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="성인용 Td" />
                </td>
            </tr>
            <tr>
                <td scope="row">12세</td>
                <td>일본뇌염</td>
                <td>
                <input type="text" name="dateAfter" id="dateAfter" readonly="readonly" value="" title="일본뇌염" />
                </td>
            </tr>
        </tbody>
    </table>
</div>

   </fieldset> 
</form>

<h2>기본접종 및 권장접종</h2>
<div class="indent">
    <table class="table_t1" summary="기본접종 및 권장접종에 대한 연령별 접종내용 정보를 제공합니다.">
        <caption>기본접종 및 권장접종 표</caption>
        <colgroup>
            <col width="20%" />
            <col width="40%" />
            <col width="*" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col">연령</th>
                <th scope="col" colspan="2">접종내용</th>
            </tr>
        </thead>
        <tbody class="text_center">
            <tr>
                <td scope="row">6개월 이후</td>
                <td>독감</td>
                <td>4주이상 간격 2회, 이후 매년 1회</td>
                </tr>
                <tr>
                <td scope="row">12개월 이후</td>
                <td>A형간염</td>
                <td>6-12개월 간격으로 2회</td>
                </tr>
                <tr>
                <td scope="row">2세 이후</td>
                <td>장티푸스</td>
                <td>1회 접종 후 3년마다 추가</td>
            </tr>
        </tbody>
    </table>
</div>