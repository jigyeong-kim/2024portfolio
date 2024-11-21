<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.sql.*"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<script src="/www/js/jquery-1.8.3.min.js"></script>
<style>
.txt{width:700px;margin:5px 0px; padding:5px; color:#464646;font-weight:bold; font-size:14px; text-align:left;}

.dot_line { clear: both; margin: 5px;  border-bottom: 1px dashed #c0c0c0; }
.line { clear: both; margin: 15px 0px 15px 0px; border-bottom: 2px solid #0072d2; }

.large {color:#464646;font-weight:bold; font-size:16px;}
.em_b_black{color:#464646;font-weight:bold;}
.blue_btn span.voticon {vertical-align: top;background: url('/common/images/sub/btn_ok_icon.png') no-repeat right center;font-weight: bold;padding: 2px 30px 2px 10px;}
a:visited {text-decoration: none;}
a:link {text-decoration: none;}
a {text-decoration: none;}
.table_t1 th, td {
    padding: 6px 10px 5px;
    border: 1px solid #d9d9d9;
}
.privacyBox {border: 1px solid #ebebeb;line-height: 23px;margin-top: 15px;}
.privacyBox .txtZone {padding: 22px 0 22px 30px;height: 302px;overflow-y: scroll;}
.privacyBox p.agree {background: #f5f5f5;border-top: 1px solid #ebebeb;text-align: center;padding: 16px 0 19px;}
</style>
<title>온라인서명</title>
</head>
<body>
<script>
	//온라인 서명 validate 체크
	function validateSignature(obj)
	{
		var chkName = obj.name.value; //성명
		var chkAddress = obj.address.value; //주소
		var chkSignLen = obj.chk.length; //개인정보 수집동의 체크
		var chkSignValue;

		//성명 체크
		if(chkName == "") {
			alert("성명을 입력하여 주십시오.");
			obj.name.focus();
			return false;
		}

		if(chkAddress == "") {
			alert("주소(동선택)를 입력하여 주십시오.");
			obj.address.focus();
			return false;
		}
		
		
		//개인정보 수집/이용 동의 체크
		for(var i = 0; i < chkSignLen; i++) {
			if(obj.chk[i].checked == true) {
				chkSignValue = obj.chk[i].value;
				break;
			}
		}
		
		//미동의 체크 및 체크안했을 때
		if(chkSignValue == "N" || chkSignValue == undefined) {
			alert("개인정보 수집/이용 및 제공에 관한 '동의'에 체크하십시오.");
			obj.chk[0].focus();
			return false;
		}
		
		//확인 창 띄움
		if(confirm("온라인 서명 신청 하시겠습니까?")) {
			obj.submit();
		}
	}
	
	//주소(동선택) 선택 시
	function check_dong() {
		if ($('#address_list').val() != "" && $('#address_list').val() != "self") {
			$('#address').val($('#address_list').val());
			$('#address').attr("readonly", "readonly");
		} else if ($('#address_list').val() == "self") {
			$('#address').val('');					
			$('#address').removeAttr("readonly");
			$('#address').focus();
		} else if ($('#address_list').val()=="") {
			$('#address').val('');
			$('#address').attr("readonly", "readonly");
		}
	}
</script>

<%
	//참여완료 구분
	String complate = (String)request.getParameter("complate") != null ? (String)request.getParameter("complate") : "";
%>

<div class="text_center margin_b_20 m_box_s">
<img src="/site/www_2018/images/contents/cts_20105_img.jpg" alt="직지 바로알기 30만 범시민 서명운동 안내문" />


	<div class="text_center">
	   <a href="http://www.cheongju.go.kr/www/download/jikji30.pdf" target="_blank" title="새창" class="btn download">직지 원본 전시를 위한 30만 범시민 서명운동 서명부</a>
	</div>
 
</div>


<%
	//참여완료 시 보여주는 이미지
	if(complate.equals("Y")) {
%>
	<div class="text_center">
		<img src="/site/www_2018/images/contents/cts_20105_img2.jpg" alt="감사합니다 서명이 완료되었습니다. 30만 범시민 서명운동에 동참해 주셔서 감사합니다." />
	</div>
<%
	} else { //참여전 보여주는 신청 폼
%>
	<form name="signatureForm" id="signatureForm" method="post" action="/common/jsp/signature/program3/signatureProc.jsp">
		<div class="privacyBox">
			<script>
			//<![CDATA[
			$(function() {
				$("#txtZone1").attr("tabindex", "0");
			});
			//]]>
			</script>
		<div class="txtZone" id="txtZone1" tabindex="0">
			<h3>개인정보의 수집 및 이용 목적(개인정보보호법 제15조)</h3>
			<p class="indent">청주시에서는 개인정보보호법 제15조 제1항(개인정보의 수집 및 이용), 동법 시행령 제16조에 따라, 직지 원본 전시에 대한 청주 시민의 염원을 프랑스 국립도서관에 전달하기 위하여 개인정보를 수집하고 있습니다. </p>
			<ul class="bu">
			   <li>수집 항목 : 읍면동까지의 주소, 이름, 본인의 서명</li>
			   <li> 개인정보의 보유 · 이용 기간 및 파기 방법
				   <ul>
					  <li>보유 기간 : 2018. 6. 18. ~ 2018. 8. 17. </li>
					  <li>보관 방법 : 서명부는 청주시 고인쇄박물관 문서고에서 보관하다가, 서명운동 완료 후, <em class="em_red">프랑스국립도서관에 전달 예정</em></li>
					  <li>파기 방법 : 서명부를 제외, 서명운동 중 수집된 개인정보가 담긴 전자 파일은 재생할 수 없는 방법을 사용하여 삭제, 종이자료는 분쇄하거나 소각 </li>
				   </ul>
			   </li>
			   <li>동의 거부 권리 안내
				   <ul>
					  <li>개인정보 수집 · 이용 동의를 거부할 수 있습니다 . 다만 , 이 경우 설문조사 참여가 제한됩니다. </li>
				   </ul>
			   </li>
			</ul>
			<p><em class="em_b_red">※ 수집된 개인정보는 위 목적 이 외의 용도로는 이용되지 않으며 , 제 3 자에게 제공하지 않습니다.</em></p>
		</div>
							
							
							<p class="agree">
								<input type="radio" name="chk" id="chkY" value="Y" title="동의">
								<label for="chkY">동의</label>
								<input  type="radio" name="chk" id="chkN" value="N" title="미동의" style="margin-left:30px;">
								<label for="chkN">미동의</label>
							</p>
		</div><!--privacyBox 끝-->

							<p><em class="center">※ 개인정보 수집/이용 및 제공에 관한 동의("동의"에 체크하셔야 서명이 완료됩니다.)</em></p>
		<div class="text_left margin_t_20">
		<h3>온라인 서명부</h3>
		</div>
		<table class="txt" style="width:100%;">
			<tr>
				<td style="width:19%;background-color:#dbdbdb;">1. 성명</td>
				<td style="padding:5px;"><input type="text" id="name" name="name" title="성명 입력" style="width:80%;"/></td>
			</tr>
		</table>
		
		<br />

		<table class="txt" style="width:100%;">
			<tr>
				<td style="width:18%;background-color:#dbdbdb;">2. 주소(동 선택)</td>
				<td style="padding:5px;">
					<input type="text" id="address" name="address" title="주소(동)" style="width:150px;" readonly="readonly"/>
					<select name="address_list" id="address_list" onchange="check_dong(this)" title="주소(동 선택)">
						<option value="">= 동 선택 =</option>
						<option value="self">직접입력</option>
<%

	//동리스트 추출
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;

	try{
		String site_nm = "";
		
		//실섭
		String url = "jdbc:cubrid:10.10.30.82:34000:XWCMS:::?charset=UTF-8";
		String id = "dba";
		String pw = "qwe123";
		
		/*
		//테섭
		String url = "jdbc:cubrid:192.168.0.81:30000:XWCMS:::?charset=UTF-8";
		String id = "dba";
		String pw = "qwe123";
		*/
		Class.forName("cubrid.jdbc.driver.CUBRIDDriver");                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
		conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
		//동 리스트 쿼리
		String sql = "SELECT site_nm FROM tn_site_info WHERE site_se IN ('SECT06','SECT07','SECT08','SECT09') ORDER BY site_se,frst_register_pnttm";        // sql 쿼리
		stmt = conn.createStatement();
		rs = stmt.executeQuery(sql); //쿼리를 실행한다.
		
		while(rs.next()){
			site_nm = rs.getString("site_nm");
%>
			<option value="<%=site_nm%>"><%=site_nm%></option>
<%
		}

	} catch(Exception e) {                                                    // 예외가 발생하면 예외 상황을 처리한다.
		
		System.out.println("Connection Exception occurred");
	
	} finally {                                                            // 쿼리가 성공 또는 실패에 상관없이 사용한 자원을 해제 한다. (순서중요)

		if(stmt != null) try{stmt.close();}catch(SQLException sqle){}            // Statement 객체 해제
		if(conn != null) try{conn.close();}catch(SQLException sqle){}            // Connection 해제
		if(rs != null) try{rs.close();}catch(SQLException sqle){}                // ResultSet 해제

	}
	
%>
					</select><br>
					<span><em class="em_red" style="margin-left:10px;">※ 타지역 주민은 직접입력 선택하고, </em>주소는 동까지만 기재</span>
				</td>
			</tr>
		</table>
		<div class="line"></div>
		
		<div class="site_link_box_btn margin_b_50">
			<div class="text_center">
<%
	SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
	DateFormat sdFormat = new SimpleDateFormat("yyyyMMddHHmmss");

	//현재일자
	java.util.Date n_Date = new java.util.Date(); //Date 형
	long l_today = n_Date.getTime();              //long 형(비교용)
	String s_today = sdFormat.format(n_Date);     //String 형(출력용)

	//시작일자
	java.util.Date s_Date = format.parse("20180618090000"); //Date 형
	long l_s_Date = s_Date.getTime();                 //long 형(비교용)
	String s_s_Date = sdFormat.format(s_Date);        //String 형(출력용)

	//종료일자
	java.util.Date e_Date = format.parse("20180817235959"); //Date 형
	long l_e_Date = e_Date.getTime();                 //long 형(비교용)
	String s_e_Date = sdFormat.format(e_Date);        //String 형(출력용)
	if( l_today >= l_s_Date && l_today <= l_e_Date){
%>				
				<!--a href="#n" onclick="validateSignature(document.signatureForm); return false;"><img src="/www/images/contents/btn_ok.jpg" alt="신청완료" /></a-->
				
<a href="#n" onclick="validateSignature(document.signatureForm); return false;" class="blue_btn"><span class="voticon">신청완료</span></a>

<%
	} else {
%>
				<br>
				<span>
					<strong>지금은 온라인 서명신청 기간이 아닙니다.<br>(2018. 6. 18. ~ 2018. 8. 17.)</strong>
				</span>
<%
	}
%>
			</div>
		</div>
	</form>
<%
	}
%>

<%-- 슈퍼관리자와 부서관리자는 엑셀저장 버튼 보여줌--%>
<c:if test="${_ROLE_TYPE_ eq 'ROLE_MANAGER'||_ROLE_TYPE_ eq 'ROLE_ADMIN' || _ROLE_TYPE_ eq 'ROLE_EMPL'}">
	<a href="/common/jsp/signature/program3/signatureExcel.jsp"  target="_blank" title="새창" class="btn download">서명리스트 엑셀 다운로드</a>
</c:if>

</body>
</html>
