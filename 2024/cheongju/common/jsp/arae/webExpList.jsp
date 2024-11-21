<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*,
				java.sql.*,
				java.text.*,
				javax.servlet.http.*,
				java.util.*,
				java.text.SimpleDateFormat,
				java.util.Date"
%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%!
	public Integer toInt(String x){
		int a = 0;
		try{
			a = Integer.parseInt(x);
		}catch(Exception e){}
		return a;
	}
%>

<%
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy");
	String year = formatter.format(new java.util.Date());
	String serchDepNm  = (String)request.getParameter("serchDepNm") != null ? (String)request.getParameter("serchDepNm") : "";
	String serchDbizNm = (String)request.getParameter("serchDbizNm") != null ? (String)request.getParameter("serchDbizNm") : "";
	String searchFldCd = (String)request.getParameter("searchFldCd") != null ? (String)request.getParameter("searchFldCd") : "";
	String searchYear = (String)request.getParameter("searchYear") != null ? (String)request.getParameter("searchYear") : "";
	String searchFisFgCd = (String)request.getParameter("searchFisFgCd") != null ? (String)request.getParameter("searchFisFgCd") : "";
	String searchStartExpdAmt = (String)request.getParameter("searchStartExpdAmt") != null ? (String)request.getParameter("searchStartExpdAmt") : "";
	String searchEndExpdAmt = (String)request.getParameter("searchEndExpdAmt") != null ? (String)request.getParameter("searchEndExpdAmt") : ""; 

	String DB_URL = "jdbc:cubrid:10.10.30.82:33000:cjcity:::?charset=utf-8"; //real
	String DB_USER = "dba"; // Account ID
	String DB_PWD  = "qwe123"; // Account PW
	
	Connection conn = null;
	PreparedStatement pstmtList = null; 
	PreparedStatement pstmtCnt = null;
	PreparedStatement pstmtFis = null;
	PreparedStatement pstmtFld = null;
	ResultSet rsList = null; //결과 (리스트)
	ResultSet rsCnt = null; //결과 (페이징)
	ResultSet rsFis = null; //select box 데이터가져오기(회계구분)
	ResultSet rsFld = null; //select box 데이터가져오기(분야별)
	
	Class.forName("cubrid.jdbc.driver.CUBRIDDriver"); //Cubrid
	
	conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PWD);
	
	StringBuffer query1 = new StringBuffer();
	
	query1.append("	SELECT COUNT(*) cnt			 \n");
	query1.append("	FROM CJ_TECURRAMT			 \n");
	query1.append("		WHERE 1=1	\n");
		
	if( !"".equals(serchDepNm) ){
		query1.append("	AND DEPT_NM LIKE '%"+ serchDepNm +"%' \n");
	}
	
	if( !"".equals(serchDbizNm) ){
		query1.append("	AND DBIZ_NM LIKE '%"+ serchDbizNm +"%' \n");
	}
	
	if( !"".equals(searchFldCd) ){
		query1.append("	AND FLD_CD ='"+ searchFldCd +"'	\n");
	}
	
	if( !"".equals(searchFisFgCd) ){
		query1.append("	AND FIS_FG_CD ='"+ searchFisFgCd +"'	\n");
	}
	
	if( !"".equals(searchYear) ){
		query1.append("	AND FIS_YEAR ='"+ searchYear +"'	\n");
	}
		
	if( !"0".equals(searchStartExpdAmt) && !"0".equals(searchEndExpdAmt) && !"".equals(searchStartExpdAmt) && !"".equals(searchEndExpdAmt) ){
		query1.append("	AND EXPD_AMT BETWEEN '"+ searchStartExpdAmt +"' AND '"+ searchEndExpdAmt +"'	\n");
	} 
	
	else if( !"0".equals(searchStartExpdAmt) && !"".equals(searchStartExpdAmt) ){
		query1.append("	AND EXPD_AMT <='"+ searchStartExpdAmt +"'	\n");
	}
	
	 else if( !"0".equals(searchEndExpdAmt)  && !"".equals(searchEndExpdAmt) ){
		query1.append("	AND EXPD_AMT >='"+ searchEndExpdAmt +"'	\n");
	} 
	query1.append("		ORDER BY FIS_FG_CD ASC, DEPT_CD ASC   \n");
	
	pstmtCnt = conn.prepareStatement(query1.toString());
	rsCnt = pstmtCnt.executeQuery();
		
	int totalCnt = 0;
	if(rsCnt.next()){
		 totalCnt = rsCnt.getInt("cnt"); //총 레코드 수
	}
	
	int pageno = toInt(request.getParameter("pageno"));
	if(pageno<1){//현재 페이지
		pageno = 1;
	}
	int total_record = totalCnt;		   //총 레코드 수
	int page_per_record_cnt = 10;  //페이지 당 레코드 수
	int group_per_page_cnt =10;     //페이지 당 보여줄 번호 수											

	int record_end_no = pageno*page_per_record_cnt;				
	int record_start_no = record_end_no-(page_per_record_cnt-1);
	if(record_end_no>total_record){
		record_end_no = total_record;
	}
										   
	int total_page = total_record / page_per_record_cnt + (total_record % page_per_record_cnt>0 ? 1 : 0);
	if(pageno>total_page){
		pageno = total_page;
	}

	int group_no = pageno/group_per_page_cnt+( pageno%group_per_page_cnt>0 ? 1:0);
	
	int page_eno = group_no*group_per_page_cnt;		
	
	int page_sno = 0;
	if(page_eno > 0) {
		page_sno = page_eno-(group_per_page_cnt-1);	
	}
	if(page_eno>total_page){		
		page_eno=total_page;
	}
	
	int prev_pageno = page_sno-group_per_page_cnt;  // <<  *[이전]* [21],[22],[23]... [30] [다음]  >>
				
	int next_pageno = page_sno+group_per_page_cnt;	// <<  [이전] [21],[22],[23]... [30] *[다음]*  >>

	if(prev_pageno<1){		
		prev_pageno=1;
	}
	if(next_pageno>total_page){		
		next_pageno=total_page/group_per_page_cnt*group_per_page_cnt+1; 		
	}

	StringBuffer query2 = new StringBuffer();
	
	query2.append("	SELECT T.*, ROWNUM RNUM FROM( 			\n");
	query2.append("		SELECT 	\n");
	query2.append("			 FIS_YEAR 		\n");
	query2.append("			,FIS_FG_NM 		\n");
	query2.append("			,DEPT_NM 		\n");
	query2.append("			,PBIZ_NM 		\n");
	query2.append("			,UBIZ_NM 		\n");
	query2.append("			,DBIZ_NM 		\n");
	query2.append("			,SUBSD_BGT_FG_NM 		\n");
	query2.append("			,TO_NUMBER(NVL(NATN_CURR_AMT, 0)) AS NATN_CURR_AMT 		\n");
	query2.append("			,TO_NUMBER(NVL(SIDO_CURR_AMT, 0)) AS SIDO_CURR_AMT 		\n");
	query2.append("			,TO_NUMBER(NVL(SIGUNGU_CURR_AMT, 0)) AS SIGUNGU_CURR_AMT \n");
	query2.append("			,TO_NUMBER(NVL(EXPD_AMT, 0)) AS EXPD_AMT 		\n");
	query2.append("			,FLD_NM		\n");
	query2.append("			,TO_NUMBER(NVL(COMPO_AMT, 0)) AS COMPO_AMT 		\n");
	query2.append("			,TO_NUMBER(NVL(FORWD_AMT, 0)) AS FORWD_AMT   	\n");
	query2.append("			,TO_NUMBER(NVL(CHNG_AMT, 0)) AS CHNG_AMT      	\n");
	query2.append("			,TO_NUMBER(NVL(ETC_AMT, 0)) AS ETC_AMT 		\n");
	query2.append("			,TO_NUMBER(NVL(	NATN_CURR_AMT,0) + NVL(SIDO_CURR_AMT,0) + NVL(SIGUNGU_CURR_AMT,0)) AS TOTAL	\n");
	query2.append("			,TO_NUMBER(NVL(	NATN_CURR_AMT,0) + NVL(SIDO_CURR_AMT,0) + NVL(SIGUNGU_CURR_AMT,0) - NVL(EXPD_AMT,0)) AS RTOTAL \n");
	query2.append("		FROM CJ_TECURRAMT \n");
	query2.append("		WHERE 1=1	\n");
	if( !"".equals(serchDepNm) ){
		 query2.append(" AND DEPT_NM LIKE '%"+ serchDepNm +"%' \n");
	}
	
	if( !"".equals(serchDbizNm)){
		query2.append("	AND DBIZ_NM LIKE '%"+ serchDbizNm +"%' \n");
	} 

	if( !"".equals(searchFldCd) ){
		query2.append("	AND FLD_CD ='"+ searchFldCd +"' \n"); //분야별
	}
	
	if( !"".equals(searchFisFgCd) ){
		query2.append("	AND FIS_FG_CD ='"+ searchFisFgCd +"'	\n");
	}
	
	if( !"".equals(searchYear) ){
		query2.append("	AND FIS_YEAR ='"+ searchYear +"'	\n");
	}
	
	if( !"0".equals(searchStartExpdAmt) && !"0".equals(searchEndExpdAmt) && !"".equals(searchStartExpdAmt) && !"".equals(searchEndExpdAmt)){
		query2.append("	AND EXPD_AMT BETWEEN '"+ searchStartExpdAmt +"' AND '"+ searchEndExpdAmt +"'	\n");
	} 
	
	else if( !"0".equals(searchStartExpdAmt) && !"".equals(searchStartExpdAmt) ){
		query2.append(" AND EXPD_AMT <='"+ searchStartExpdAmt +"'	\n");
	}
	
	 else if( !"0".equals(searchEndExpdAmt) && !"".equals(searchEndExpdAmt)){
		query2.append("	AND EXPD_AMT >='"+ searchEndExpdAmt +"'	\n");
	} 
		
	query2.append("		ORDER BY FIS_FG_CD ASC, DEPT_CD ASC \n");
	query2.append("		) T WHERE ROWNUM BETWEEN '"+ record_start_no +"' AND '"+ record_end_no +"' \n");
	
	pstmtList = conn.prepareStatement(query2.toString());
	rsList = pstmtList.executeQuery();

		
	StringBuffer query3 = new StringBuffer();
	
	query3.append("	SELECT DISTINCT	\n");
	query3.append("	 	 (FIS_FG_CD)			\n");
	query3.append(" 	, FIS_FG_NM	\n");
	query3.append(" FROM CJ_TECURRAMT 		\n");
	query3.append(" WHERE FIS_YEAR='"+year+"' 		\n");
	query3.append(" ORDER BY FIS_FG_CD ASC 		\n");
	
	pstmtFis = conn.prepareStatement(query3.toString());
	rsFis = pstmtFis.executeQuery();
	
	StringBuffer query4 = new StringBuffer();
	
	query4.append("	SELECT DISTINCT	\n");
	query4.append("	 	 (FLD_CD)			\n");
	query4.append(" 	,FLD_NM 		\n");
	query4.append(" FROM CJ_TECURRAMT 		\n");
	query4.append(" WHERE FIS_YEAR='"+year+"' 		\n");
	query4.append(" ORDER BY FLD_CD ASC 		\n");
	
	pstmtFld = conn.prepareStatement(query4.toString());
	rsFld = pstmtFld.executeQuery();
	
	
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="UTF-8" lang="UTF-8">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="keywords" content="세출현황" />
<meta name="description" content="세출현황" />
<link rel="stylesheet" type="text/css" href="css/tax.css" />
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-latest.min.js"></script>
<!--[if lt IE 7]>
<script type="text/javascript" src="js/unitpngfix.js"></script>
<![endif]-->
<title>세부사업별 및 세출내역</title>
<script type="text/javascript">
//<![CDATA[
       
function searchFrmSubmit() {
	document.searchFrm.action="http://www.cheongju.go.kr/common/jsp/arae/webExpList.jsp";
	document.searchFrm.elements["pageno"].value = 1;
	document.searchFrm.submit();
}

function searchFrmReset() { 
	document.searchFrm.reset();
	document.searchFrm.serchDepNm.value = "";
	document.searchFrm.serchDbizNm.value = "";

}

function goPage(pageNo) {
	document.searchFrm.action="http://www.cheongju.go.kr/common/jsp/arae/webExpList.jsp";
	document.searchFrm.elements["pageno"].value = pageNo;
	document.searchFrm.submit();
}

//]]>
</script>

</head>
<body id="section1">
<div class="header">
	<div class="header_left">
		<div class="logo">
			<a href="http://www.cheongju.go.kr/www/index.do" target="_blank" title="청주시청 새창으로 가기"><img src="images/common/logo.gif" alt="청주시 일등경제 으뜸청주" /></a>
		</div>
		<a href="http://www.cheongju.go.kr/common/jsp/arae/webRevList.jsp" target="_self" title="재정정보공개 가기"><span class="h1_title">재정정보공개</span></a>
	</div><!-- header_left -->
	<div class="lnb">
		<ul>
			<li><a href="http://www.cheongju.go.kr/common/jsp/arae/webRevList.jsp">세입현황</a></li>
			<li class="on"><a href="http://www.cheongju.go.kr/common/jsp/arae/webExpList.jsp">세부사항 및 세출현황</a></li>
		</ul>
	</div><!-- lnb -->
</div><!-- header -->
<div class="wrap">
	<div class="sub_head">
		<div class="sub_title">
			<h2>세출현황</h2>
		</div><!-- sub_title -->
	</div><!-- sub_head -->

<form name="searchFrm" id="searchFrm" action="common/jsp/arae/webExpList.jsp" method="post"> 
<input type="hidden" name="pageno" value="1" />
<div class="box0 margin_t_30 margin_b_30">
	<div class="box1 search">
		
		<table class="table_t1 total_search" summary="검색">
		<caption>검색</caption>
		<colgroup>
			<col width="15%" />
			<col width="26%" />
			<col width="15%" />
			<col width="29%" />
			<col width="15%" />
		</colgroup>
		<tbody>
			<tr>
				<th scope="row">회계년도</th>
				<td>
					<%=year %>
				</td>
				<th scope="row">회계구분</th>
				<td>
					<select id="searchFisFgCd" name="searchFisFgCd" style="margin-left:5px;">
					
						<option value ="">선택하세요</option>
						<% while(rsFis.next()){ %>
							<option value ="<%=rsFis.getString("FIS_FG_CD") %>" <% if(rsFis.getString("FIS_FG_CD").equals(searchFisFgCd)){%> selected="selected"<%}%> ><%=rsFis.getString("FIS_FG_NM") %> </option>
						<%}%>
					</select>  
				</td>
				<td rowspan="3" class="text_center">
					<ul class="search_btn">
						<li><a href="javascript:searchFrmSubmit();" class="btn_blue">검색</a></li>
						<li><a href="javascript:searchFrmReset();" class="btn_white">초기화</a></li>
					</ul>
				</td>
			</tr>
			<tr>
				<th scope="row">부서명</th>
				<td><input type="text" name="serchDepNm" id="serchDepNm" value="<%=serchDepNm%>" /></td>
				<th scope="row">세부사업명</th>
				<td><input type="text" name="serchDbizNm" id="serchDbizNm" value="<%=serchDbizNm%>" /></td>
			</tr>
			<tr>
				<th scope="row">분야별</th>
				<td> 
					<select id="searchFldCd" name="searchFldCd">
						<option value ="">선택하세요</option>
						<% while(rsFld.next()){ %>
							<option value="<%=rsFld.getString("FLD_CD")%>" <% if(rsFld.getString("FLD_CD").equals(searchFldCd)){%> selected="selected"<%}%> ><%=rsFld.getString("FLD_NM")%></option>	
						<%}%>
						
					</select>
				</td>
				<th scope="row">지출액</th>
				<td>
					<select id="searchStartExpdAmt" name="searchStartExpdAmt">
						<option value="0" <% if("0".equals(searchStartExpdAmt)){%> selected="selected"<%}%>>0원</option>
						<option value="100000" <% if("100000".equals(searchStartExpdAmt)){%> selected="selected"<%}%>>10만원</option>
						<option value="1000000" <% if("1000000".equals(searchStartExpdAmt)){%> selected="selected"<%}%>>100만원</option>
						<option value="10000000" <% if("10000000".equals(searchStartExpdAmt)){%> selected="selected"<%}%>>1,000만원</option>
						<option value="100000000" <% if("100000000".equals(searchStartExpdAmt)){%> selected="selected"<%}%>>1억원</option>
						<option value="1000000000" <% if("1000000000".equals(searchStartExpdAmt)){%> selected="selected"<%}%>>10억원</option>
						<option value="10000000000" <% if("10000000000".equals(searchStartExpdAmt)){%> selected="selected"<%}%>>100억원</option>
					</select>
					~ 
					<select id="searchEndExpdAmt" name="searchEndExpdAmt">
						<option value="0" <% if("0".equals(searchEndExpdAmt)){%> selected="selected"<%}%>>0원</option>
						<option value="50000" <% if("50000".equals(searchEndExpdAmt)){%> selected="selected"<%}%>>5만원</option>
						<option value="100000" <% if("100000".equals(searchEndExpdAmt)){%> selected="selected"<%}%>>10만원</option>
						<option value="1000000" <% if("1000000".equals(searchEndExpdAmt)){%> selected="selected"<%}%>>100만원</option>
						<option value="10000000" <% if("10000000".equals(searchEndExpdAmt)){%> selected="selected"<%}%>>1,000만원</option>
						<option value="100000000" <% if("100000000".equals(searchEndExpdAmt)){%> selected="selected"<%}%>>1억원</option>
						<option value="1000000000" <% if("1000000000".equals(searchEndExpdAmt)){%> selected="selected"<%}%>>10억원</option>
						<option value="10000000000" <% if("10000000000".equals(searchEndExpdAmt)){%> selected="selected"<%}%>>100억원</option>
					</select>
					
				</td>
			</tr>
			</tbody>
		</table>
		</div>
		</div>
		<div class="text_right">
		 총 게시물	<span class="em_red"><%=totalCnt %></span><span class="margin_l_20">페이지</span> <span class="em_red"><%=pageno %>/<%=total_page %></span><span class="margin_l_20">(단위 : 원)</span>
		</div>
	<table class="table_t1" summary="세출현황">
	<caption>세출현황</caption>
	<colgroup>
		<col width="4%" />
		<col width="5%" />
		<col width="8%" />
		<col width="15%" />
		<col width="4%" />
		<col width="7%" />
		<col width="6%" />
		<col width="7%" />
		<col width="7%" />
		<col width="7%" />
		<col width="5%" />
		<col width="5%" />
		<col width="4%" />
		<col width="5%" />
		<col width="6%" />
		<col width="5%" />
	</colgroup>
	<thead>
		<tr>
			<th scope="col" rowspan="3">번호</th>
			<th scope="col" rowspan="3">회계<br />구분</th>
			<th scope="col" rowspan="3">부서명</th>
			<th scope="col" rowspan="3">세부사업명</th>
			<th scope="col" rowspan="3">사업<br />구분</th>
			<th scope="colgroup" colspan="8">예산현액</th>
			<th scope="col" rowspan="3">지출액</th>
			<th scope="col" rowspan="3">집행잔액</th>
			<th scope="col" rowspan="3">분야</th>
		</tr>
		<tr>
			<th scope="colgroup" colspan="4">계</th>
			<th scope="col" rowspan="2">편성액</th>
			<th scope="col" rowspan="2">이월액</th>
			<th scope="col" rowspan="2">예산<br />변경</th>
			<th scope="col" rowspan="2">수입<br />대체<br />경비</th>
		</tr>
		<tr>
			<th scope="col">소계</th>
			<th scope="col">국비</th>
			<th scope="col">도비</th>
			<th scope="col">시군구비</th>
		</tr>
	</thead>		
	<tbody class="text_right">		
<%
	while(rsList.next()){
		//long R_TOTAL = rsList.getLong("NATN_CURR_AMT") + rsList.getLong("SIDO_CURR_AMT") + rsList.getLong("SIGUNGU_CURR_AMT"); /* 소계 */
		//long R_MRR = R_TOTAL - rsList.getLong("EXPD_AMT");/* 집행잔액 */
		//int num1 = (totalCnt-((pageno-1)*page_per_record_cnt)); 
%>

			<tr>
				<td class="text_center"><%=rsList.getInt("RNUM") %></td>   <%--번호  --%>
				<td class="text_center"><%=rsList.getString("FIS_FG_NM")%></td><%--회계구분  --%>
				<td class="text_center"><%=rsList.getString("DEPT_NM")%></td><%--부서명  --%>
				<td class="text_left"><%=rsList.getString("DBIZ_NM")%></td><%--세부사업명  --%>
				<td class="text_center"><%=rsList.getString("SUBSD_BGT_FG_NM")%></td> <%-- 사업구분  --%>
				<td><fmt:formatNumber><%=rsList.getString("TOTAL")%></fmt:formatNumber></td><%-- 소계 --%>
				<td><fmt:formatNumber><%=rsList.getLong("NATN_CURR_AMT")%></fmt:formatNumber></td><%-- 국비  --%>
				<td><fmt:formatNumber><%=rsList.getLong("SIDO_CURR_AMT")%></fmt:formatNumber></td><%-- 도비 --%>
				<td><fmt:formatNumber><%=rsList.getLong("SIGUNGU_CURR_AMT")%></fmt:formatNumber></td><%-- 시군구비 --%>
				<td><fmt:formatNumber><%=rsList.getLong("COMPO_AMT")%></fmt:formatNumber></td><%-- 편성액 --%>
				<td><fmt:formatNumber><%=rsList.getLong("FORWD_AMT")%></fmt:formatNumber></td><%-- 이월액 --%>
				<td><fmt:formatNumber><%=rsList.getLong("CHNG_AMT")%></fmt:formatNumber></td><%-- 변경금액(예산변경) --%>
				<td><fmt:formatNumber><%=rsList.getLong("ETC_AMT")%></fmt:formatNumber></td><%-- 수입대체경비 --%>
				<td><fmt:formatNumber><%=rsList.getLong("EXPD_AMT")%></fmt:formatNumber></td><%-- 지출액  --%>
				<td><fmt:formatNumber><%=rsList.getString("RTOTAL")%></fmt:formatNumber></td><%-- 집행잔액 --%>
				<td class="text_center"><%=rsList.getString("FLD_NM")%></td><%-- 분야명 --%>
			</tr>
<%
	}

	if(total_record == 0) {
%>
			<tr class="text_center">
				<td colspan="16">조회된 값이 없습니다.</td>
			</tr>
<%
	}
%>
	</tbody>
	</table>
	</form>

	<div class="page text_center">
	<ul>
	<%
		if(total_record > 0) {
			if(pageno > page_per_record_cnt) {
	%>
	<li><a href="javascript:goPage('1')"><img src="images/common/btn_prev1.gif" alt="맨앞으로" /></a></li>
	<li><a href="javascript:goPage('<%=prev_pageno%>')"><img src="images/common/btn_prev2.gif" alt="이전으로" /></a></li>
	<%
		}
	%> 
	<%for(int i =page_sno;i<=page_eno;i++){%>
		<li><a href="javascript:goPage('<%=i %>')" class="num">
			<%if(pageno == i){ %>
				<span class="on"><%=i %></span>
			<%}else{ %>
				<%=i %>
			<%} %>
		</a>
		</li> 
	<%} %>
	
	<%
		if(page_eno < total_page) {
	%>
	<li><a href="javascript:goPage('<%=next_pageno%>')" ><img src="images/common/btn_next2.gif" alt="다음으로" /></a></li>
	<li><a href="javascript:goPage('<%=total_page %>')"><img src="images/common/btn_next1.gif" alt="맨뒤으로" /></a></li>
	<%
		}
	}
	%>
	</ul>
	</div>

	<div class="footer_navi clearfix">
			<ul>
				<li class="first"><a href="http://www.cheongju.go.kr/www/contents.do?key=592" target="_blank" title="주요기능안내 새창으로 열기">주요기능안내</a></li>
				<li><a href="http://www.cheongju.go.kr/www/contents.do?key=586" target="_blank" title="저작권보호정책 새창으로 열기">저작권보호정책</a></li>
				<li><a href="http://www.cheongju.go.kr/www/contents.do?key=587" target="_blank" title="개인정보처리방침 새창으로 열기">개인정보처리방침</a></li>
				<li><a href="http://www.cheongju.go.kr/www/mailingReqst.do?key=583" target="_blank" title="메일링신청 새창으로 열기">메일링신청</a></li>
				<li><a href="http://www.cheongju.go.kr/www/contents.do?key=593" target="_blank" title="뷰어다운로드 새창으로 열기">뷰어다운로드</a></li>
					<li><a href="http://www.cheongju.go.kr/www/download/cj_numbers.pdf" target="_blank" title="파일 다운로드">행정전화번호부</a></li>
				<li><a href="http://www.cheongju.go.kr/www/sub.do?key=589" target="_blank" title="사이트맵 새창으로 열기">사이트맵</a></li>
			</ul>
	</div>
	<div class="footer_info">
			<address>
			[28542] 충청북도 청주시 상당구 상당로 155 (북문로3가) 대표전화 : 043-201-0001
			</address>
			<p class="copy">Copyright ⓒ 1998-2014 Cheongju City. All Rights Reserved.</p>
			<p class="warning">본 웹사이트에 게시된 이메일 주소가 자동수집되는 것을 거부하며, 위반시 “정보통신망법”에 의해 처벌됨을 유념하시기 바랍니다.</p>
	</div>


</div>
</body>
</html>