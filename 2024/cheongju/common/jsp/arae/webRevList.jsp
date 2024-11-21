<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*,
				java.sql.*,
				java.text.*,
				javax.servlet.http.*,
				java.util.*,
				java.text.SimpleDateFormat,
				java.util.Date"
%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
	
	String DB_URL = "jdbc:cubrid:10.10.30.82:33000:cjcity:::?charset=utf-8"; //real
	String DB_USER = "dba"; // Account ID
	String DB_PWD  = "qwe123"; // Account PW

	Connection conn = null;
	PreparedStatement pstmtList = null;
	PreparedStatement pstmtCnt = null;
	ResultSet rsList = null;
	ResultSet rsCnt = null;
	
		String searchYear = (String)request.getParameter("searchYear") != null ? (String)request.getParameter("searchYear") : "";
		Class.forName("cubrid.jdbc.driver.CUBRIDDriver"); //Cubrid

		conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PWD);
		StringBuffer query1 = new StringBuffer();
		query1.append("	SELECT COUNT(*) cnt			 \n");
		query1.append("	FROM CJ_REVDESC	 \n");
		query1.append("			WHERE FIS_YEAR= to_char(sysdate, 'yyyy')  \n");
		query1.append("			AND DEL_YN = 'N'  \n");
		if( !"".equals(searchYear) ){
			query1.append("	AND FIS_YEAR ='"+ searchYear +"'	\n");
		}
		query1.append("	ORDER BY FIS_FG_CD ASC		 \n");
		
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

		query2.append("	SELECT T.*, ROWNUM RNUM FROM(			 \n");
		query2.append("	SELECT LIST_B.FIS_FG_CD, LIST_B.FIS_FG_NM  \n");
		query2.append("	, TO_NUMBER(NVL(LIST_B.ACCUM_AMT, 0)) AS ACCUM_AMT  \n");
		query2.append("	, TO_NUMBER(NVL(LIST_A.DAY_INC_AMT, 0)) AS DAY_INC_AMT  \n");
		query2.append("	, TO_NUMBER(NVL(LIST_A.DAY_EXC_RESTO_AMT, 0)) AS DAY_EXC_RESTO_AMT  \n");
		query2.append("	, TO_NUMBER(NVL(LIST_A.DAY_ACCT_RV_AMT, 0)) AS DAY_ACCT_RV_AMT  \n");
		query2.append("	, TO_NUMBER(NVL(LIST_A.DIFF, 0)) AS DIFF  \n");
		query2.append("	, TO_NUMBER((NVL(LIST_B.ACCUM_AMT, 0) + (NVL(LIST_B.DAY_INC_AMT, 0) - NVL(LIST_B.DAY_EXC_RESTO_AMT, 0) - NVL(LIST_B.DAY_ACCT_RV_AMT, 0)))) AS TOTAL    \n");
		query2.append("	, LIST_B.LOCAL_GOV_CD, LIST_B.SEQ, LIST_B.REV_CD, LIST_B.TRANSM_DATE, LIST_B.DEL_YN, LIST_B.FIS_YEAR \n");
		query2.append("	, TO_CHAR(TO_TIMESTAMP(LIST_B.YMD,'YYYYMMDD'),'YYYY.MM.DD') AS YMD, LIST_B.REV_CD_NM  \n");
		query2.append("	FROM(  \n");
		query2.append("		SELECT SUB.FIS_FG_CD, SUB.FIS_FG_NM, SUB.DAY_INC_AMT, SUB.DAY_EXC_RESTO_AMT, SUB.DAY_ACCT_RV_AMT  \n");
		query2.append("			,(SUB.DAY_INC_AMT - SUB.DAY_EXC_RESTO_AMT - SUB.DAY_ACCT_RV_AMT) AS DIFF  \n");
		query2.append("			,SUB.REV_CD  \n");
		query2.append("		FROM(  \n");
		query2.append("			SELECT FIS_FG_CD, FIS_FG_NM, REV_CD,  \n");
		query2.append("				SUM(DAY_INC_AMT) AS DAY_INC_AMT, SUM(DAY_EXC_RESTO_AMT) AS DAY_EXC_RESTO_AMT,  \n");
		query2.append("				SUM(DAY_ACCT_RV_AMT) AS DAY_ACCT_RV_AMT  \n");
		query2.append("			FROM CJ_REVDESC A \n");
		query2.append("			WHERE FIS_YEAR= to_char(sysdate, 'yyyy')  \n");
		query2.append("			AND DEL_YN = 'N'  \n");
		query2.append("			AND SEQ = (SELECT MAX(SEQ) FROM CJ_REVDESC WHERE FIS_FG_CD = A.FIS_FG_CD AND YMD = A.YMD)  \n");
		query2.append("			GROUP BY FIS_FG_CD, FIS_FG_NM, REV_CD  \n");
		query2.append("			ORDER BY FIS_FG_CD, REV_CD ASC) SUB \n");
		query2.append("	     ) LIST_A,   \n");
		query2.append("	     (SELECT FIS_FG_CD, FIS_FG_NM, ACCUM_AMT, DAY_INC_AMT, DAY_EXC_RESTO_AMT, DAY_ACCT_RV_AMT \n");
		query2.append("	    		,LOCAL_GOV_CD, SEQ, REV_CD, TRANSM_DATE, DEL_YN, FIS_YEAR, YMD, REV_CD_NM \n");
		query2.append("	      FROM CJ_REVDESC A  \n");
		query2.append("			WHERE FIS_YEAR= to_char(sysdate, 'yyyy')  \n");
		query2.append("			AND DEL_YN = 'N'  \n");
		query2.append("	      AND SEQ = (SELECT MAX(SEQ) FROM CJ_REVDESC WHERE FIS_FG_CD = A.FIS_FG_CD AND YMD = A.YMD) \n");
		query2.append("	      AND YMD = (SELECT MAX(YMD) FROM CJ_REVDESC WHERE FIS_FG_CD = A.FIS_FG_CD)  \n");
		query2.append("	      ) LIST_B  \n");
		query2.append("	WHERE LIST_A.REV_CD(+) = LIST_B.REV_CD AND LIST_A.FIS_FG_CD(+) = LIST_B.FIS_FG_CD  \n");
		query2.append("	ORDER BY LIST_A.FIS_FG_CD, LIST_A.REV_CD ASC  \n");
		query2.append("		) T WHERE ROWNUM BETWEEN '"+ record_start_no +"' AND '"+ record_end_no +"' \n");
			   	
		pstmtList = conn.prepareStatement(query2.toString());
		rsList = pstmtList.executeQuery();
		
		
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="keywords" content="세입현황" />
<meta name="description" content="세입현황 " />
<link rel="stylesheet" type="text/css" href="css/tax.css" />
	<title>세입현황</title>
	<script type="text/javascript"> 
		function goPage(pageNo) {
			document.searchFrm.action="http://www.cheongju.go.kr/common/jsp/arae/webRevList.jsp";
			document.searchFrm.elements["pageno"].value = pageNo;
			document.searchFrm.submit();
		}
	</script>
</head>
	<body id="section1">
	<div class="header">
		<div class="header_left">
			<h1 class="logo">
				<a href="http://www.cheongju.go.kr/www/index.do" target="_blank" title="청주시청 새창으로 가기"><img src="images/common/logo.gif" alt="청주시 일등경제 으뜸청주" /></a>
			</h1>
			<a href="http://www.cheongju.go.kr/common/jsp/arae/webRevList.jsp" target="_self" title="재정정보공개 가기"><span class="h1_title">재정정보공개</span></a>
		</div><!-- header_left -->	
		<div class="lnb">
			<ul>
				<li class="on"><a href="http://www.cheongju.go.kr/common/jsp/arae/webRevList.jsp">세입현황</a></li>
				<li><a href="http://www.cheongju.go.kr/common/jsp/arae/webExpList.jsp">세부사항 및 세출현황</a></li>
			</ul>
		</div><!-- lnb -->
	</div>
	<div class="wrap">
	<div class="sub_head">
		<div class="sub_title">
			<h2>세입현황</h2>
		</div><!-- sub_title -->
	</div><!-- sub_head -->
	
	<form name="searchFrm" id="searchFrm" action="common/jsp/arae/webRevList.jsp" method="post">
	<input type="hidden" name="pageno" value="1" /> 
	<div class="box0 margin_t_30">
		<div class="box1"> 
		<p><strong>▣  금일 세입현황 전일누계, 당일수입액, 당일과오납반환액, 당일과목경정액은 명일 <span class="em_red">오전 11시</span>에 업데이트 됩니다.</strong></p>
		</div>
	</div>
	<div class="margin_t_30">
		<div class="text_right">
			<span class="margin_l_20">(단위 : 원)</span>
		</div>
	<table style="margin-bottom:0;" class="table_t1" summary="세입현황">
	<caption>세입현황</caption>
	<colgroup>
		<col width="17%" />
		<col width="13%" />
		<col width="12%" />
		<col width="12%" />
		<col width="12%" />
		<col width="13%" />
		<col width="11%" />
	</colgroup>
	<thead>
		<tr>
			<th scope="col">회계구분명</th>
			<th scope="col">세입코드명</th>
			<th scope="col">전일누계</th>
			<th scope="col">당일수입액</th>
			<th scope="col">당일과오납반환액</th>
			<th scope="col">당일과목경정액</th>
			<th scope="col">최종합계</th>
			<th scope="col">일자</th>
		</tr>
	</thead>
		
	<tbody class="text_right">	
			<% while(rsList.next()){ %>
			<tr>
				<th scope="row"><%=rsList.getString("FIS_FG_NM")%></th><%--회계구분  --%>
				<th scope="row"><%=rsList.getString("REV_CD_NM")%></th><%--회계코드명  --%>
				<td><fmt:formatNumber><%=rsList.getLong("ACCUM_AMT")%></fmt:formatNumber></td><%-- 전일누계  --%>
				<td><fmt:formatNumber><%=rsList.getLong("DAY_INC_AMT")%></fmt:formatNumber></td> <%-- 당일수입액  --%>
				<td><fmt:formatNumber><%=rsList.getLong("DAY_EXC_RESTO_AMT")%></fmt:formatNumber></td> <%-- 당일과오납반환액  --%>
				<td><fmt:formatNumber><%=rsList.getLong("DAY_ACCT_RV_AMT")%></fmt:formatNumber></td> <%-- 당일과목경정액  --%>			
				<td><fmt:formatNumber><%=rsList.getLong("TOTAL")%></fmt:formatNumber></td> <%-- 최종합계  --%>	
				<td class="text_center"><%=rsList.getString("YMD")%></td><%-- 일자  --%>	
			</tr>
			<%
			}
				
			if(total_record == 0) {
			%>
			<tr class="text_center">
				<td colspan="8">금일 조회된 값이 없습니다.</td>
			</tr>
			<%
				}
			%>
	</tbody>
	</table>
	</div>
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
</body>	
</html>