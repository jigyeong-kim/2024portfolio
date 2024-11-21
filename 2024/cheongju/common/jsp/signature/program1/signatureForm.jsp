<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.sql.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="/www/js/jquery-1.8.3.min.js"></script>
<title>온라인서명</title>
</head>
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
</style>

<body>
<script type="text/javascript">
	
	//온라인 서명 validate 체크
	function validateSignature(obj)
	{
		var chkName = obj.name.value; //성명
		var chkAddress = obj.address.value; //주소
		var chkTel = obj.tel.value; //전화번호
		var chkSignLen = obj.chk.length; //개인정보 수집동의 체크
		var chkSignValue;
		
		//성명 체크
		if( chkName == "") {
			alert("성명을 입력하여 주십시오.");
			obj.name.focus();
			return false;
		}
		
		if(chkAddress == "" && chkTel == "") {
			alert("주소(동선택) 또는 전화번호를 입력하여 주십시오.");
			obj.address.focus();
			return false;
		}
		
		/*
		//주소 체크
		if( chkAddress == "") {
			alert("주소를 입력하여 주십시오.");
			obj.address.focus();
			return false;
		}
		
		//전화번호 체크
		if( chkTel == "") {
			alert("전화번호를 입력하여 주십시오.");
			obj.tel.focus();
			return false;
		}
		*/
		
		//개인정보 수집/이용 동의 체크
		for( var i = 0; i < chkSignLen; i++) {
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
		if( confirm("온라인 서명 신청 하시겠습니까?") ) {
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

<div class="text_center margin_b_20 m_box_s"> <img src="/www/images/contents/cts_7649_tit_img.gif" alt="서울외곽순환고속도로 북부구간 통행료 인하를 위한 서명운동에 적극 동참해 주세요" /></div>
<h2>중부권 동·서 내륙철도건설 사업개요</h2>
<ul class="bu">
  <li>서해안에서 동해안까지 철도로 연결하는 대규모 국책사업입니다</li>
  <li>건설지역 : 서산~당진~예산~아산~천안~청주~괴산~문경~예천~영주~봉화~울진<br/>  ※ 청주시 통과 예상지역 : 오창, 청주공항, 내수, 미원</li>
</ul>
<div class="text_center margin_b_20 margin_t_20  m_box_s"> <img src="/www/images/contents/cts_7649_img.jpg" alt="서울외곽순환고속도로 북부구간 통행료" /></div>
<h2>중부권 동·서 내륙철도건설사업 필요성</h2>
<p class="indent">중부권 동·서 내륙철도 건설사업은 지역 균형발전과 효율적인 국토개발 측면에서 꼭 필요한 철도사업입니다.</p>
<h3>개발효과</h3>
<ul class="bu">
  <li>청주국제공항 활성화 및 오창역 등 신설에 따른 지역개발 효과</li>
  <li>서해안 신 산업벨트와 동해안 관광벨트 연결</li>
  <li>내륙산간지역 동·서 간 신규 개발 축 형성</li>
  <li>충남·충북·경북도청 소재지 연계로 광역 행정축 형성</li>
</ul>
<h2>중부권 동·서 내륙철도 건설사업 추진을 위해서는, 국가 철도망 구축계획 반영을 필요로 합니다</h2>
<!--div class="indent">
<table border="1" class="table_t1" summary="북부구간과 남부구간 요금체계 안내">
  <caption>
  요금체계 안내
  </caption>
  <thead>
    <tr>
      <th scope="col">구 분</th>
      <th scope="col">북부구간</th>
      <th scope="col">남부구간</th>
    </tr>
  </thead>
  <tbody class="text_center">
    <tr>
      <th scope="row">㎞당 요금체계</th>
      <td>㎞당 132원(2.6배)</td>
      <td>㎞당 50원 </td>
    </tr>
    <tr>
      <th scope="row">나들목(IC)요금 </th>
      <td>모든 나들목에서 요금징수</td>
      <td>무료 </td>
    </tr>
    <tr>
      <th scope="row">할인혜택</th>
      <td>할인혜택 없음</td>
      <td>출·퇴근 및 야간 최고 50%할인</td>
    </tr>
</table>
</div-->


<!--div class="box_tit">
  <div class="box"> <span><em class="em_blue">&lt;부당한 일&gt; 남부구간의 2.6배 높은 요금 + 모든 나들목의 유료 + 출퇴근 할인제 전무 = 북부시민 희생요구</em></span> <br />
    북부구간 통행료 인하를 통한 도로의 본래적 기능을 되찾고 재정구간(남부구간)과 동일한 할인제도 및 나들목 무료화를 통해 차별적으로 적용되고 있는 부당함을 개선하기 위해 아래의 사항에 대해 촉구 서명합니다. <br />
    <strong> - 첫째, 북부구간을 남부구간과 동일하게 재정구간으로 전환, 동일한 도로의 동일한 요금적용</strong><br />
    &nbsp;&nbsp;‣ 민자계약해지 후 정부가 직접 인수할 경우 약 1조3천억원의 이익과 요금인하로 가계경제는 향상<br />
    <strong>- 둘째, 지선영업소(나들목)의 요금징수를 폐지하고 무료개방을 실시(일산대교 요금인하 포함)</strong><br />
    <strong>- 셋째, 북부구간 이용자의 희생을 요구하는 국민연금관리공단(대주주)의 잘못된 인식을 개선</strong><br />
    &nbsp;&nbsp;‣ 요금을 인하할 경우 국민연금 가입자 전체에게 피해가 간다는 주장 (북부구간 이용자는 모든 국민)<br />
    <span><em class="em_blue">※ 위의 사안이 해결되도록 추진하는 15개 자치단체 및 국회와 시민단체의 활동을 지원합니다.</em></span>
  </div>
</div-->


<!----- 개인정보 수집/이용  및 제공에 관한 동의 자세히 보기 버튼 -->

<div class="text_center">
<em class="large">중부권 동·서 내륙철도 건설사업, 국가계획 반영 및 추진 촉구 20만 청주시민 서명 운동</em><br />
 <a href="./downloadBbsFile.do?atchmnflNo=26055"><img src="/www/images/contents/btn_bogi.jpg" alt="개인정보 수집/이용  및 제공에 관한 동의 자세히 보기" class="margin_b_10 margin_t_10"/></a><br />
<em class="em_b_black">서명참여기간 : 2016. 3. 21 ~ 12. 31</em>
</div>


<%
	//참여완료 시 보여주는 이미지
	if(complate.equals("Y")) {
%>
	<div class="text_center">
		<img src="/www/images/contents/cts_7649_img2.jpg" alt="감사합니다 서명이 완료되었ㅅ브니다. 50만청주시민 서명운동에 동참해 주셔서 감사합니다." />
	</div>
<%
	} else { //참여전 보여주는 신청 폼
%>
	<div class="right margin_r_20">
	<span><em class="em_red">※ 주소는 동까지만 기재</em></span><br />
	<span><em class="em_red">※ 주소와 전화번호 둘 중 하나만 기재</em></span>
</div>
<div class="text_left">
<em class="large">[온라인 서명부]</em>
</div>
	<form name="signatureForm" id="signatureForm" method="post" action="/common/jsp/signature/program1/signatureProc.jsp">
		<table class="txt">
			<tr>
				<td bgcolor='#dbdbdb' width="19%">1.성명</td>
				<td style="padding:5px;"><input type="text" id="name" name="name" title="성명 입력" style="width:550px;"/></td>
			</tr>
		</table>
		
		<br />

		<table class="txt">
			<tr>
				<td bgcolor='#dbdbdb' width="17.5%">2.주소(동 선택)</td>
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
					</select>
					<span><em class="em_red">※ 타지역 주민은 직접입력 선택</em></span>
				</td>
			</tr>
		</table>
		
		<br />
		<table class="txt">
			<tr>
				<td bgcolor='#dbdbdb' width="19%">3.전화번호</td>
				<td style="padding:5px;"><input type="text" id="tel" name="tel" title="전화번호 입력" style="width:550px;"/></td>
			</tr>
		</table>
	
		<br />
		<table class="txt">
			<tr>
				<td bgcolor='#dbdbdb'>4.개인정보 수집/이용 및 제공에 관한 동의("동의"에 체크하셔야 서명이 완료됩니다.)</td>
			</tr>
		</table>
		1)
		<input type="radio" name="chk" id="chkY" value="Y">
		동의 
		<div class="dot_line"></div>
		2)
		<input type="radio" name="chk" id="chkN" value="N">
		미동의
		<div class="line"></div>
		
		<span class="site_link_box_btn margin_b_50">
			<div class="text_center">
<%
	SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
	DateFormat sdFormat = new SimpleDateFormat("yyyyMMddHHmmss");

	//현재일자
	java.util.Date n_Date = new java.util.Date(); //Date 형
	long l_today = n_Date.getTime();              //long 형(비교용)
	String s_today = sdFormat.format(n_Date);     //String 형(출력용)

	//시작일자
	java.util.Date s_Date = format.parse("20160321000000"); //Date 형
	long l_s_Date = s_Date.getTime();                 //long 형(비교용)
	String s_s_Date = sdFormat.format(s_Date);        //String 형(출력용)

	//종료일자
	java.util.Date e_Date = format.parse("20161231235959"); //Date 형
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
					<strong>지금은 온라인 서명신청 기간이 아닙니다.<br>(2016-03-21 ~ 2016-12-31)</strong>
				</span>
<%
	}
%>
			</div>
		</span>
	</form>
<%
	}
%>

<%-- 슈퍼관리자와 부서관리자는 엑셀저장 버튼 보여줌--%>
<c:if test="${_ROLE_TYPE_ eq 'ROLE_MANAGER'||_ROLE_TYPE_ eq 'ROLE_ADMIN'}">
	<a class="download_btn" title="엑셀 다운로드[새창]" target="_blank" href="/common/jsp/signature/program1/signatureExcel.jsp"><span class="downicon">서명리스트 엑셀저장</span></a>
</c:if>

</body>
</html>
