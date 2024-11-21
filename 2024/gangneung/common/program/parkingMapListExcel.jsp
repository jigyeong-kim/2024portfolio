<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>


<%
    String excelNm = java.net.URLEncoder.encode("교통정보센터관리목록.xls","UTF-8");
    
    response.setHeader("Content-Type","application/vnd.ms-excel;charset=UTF-8");
    response.setHeader("Content-Disposition", "attachment; filename="+excelNm); 
    response.setHeader("Content-Description", "JSP Generated Data"); 
    response.setHeader("Content-Transfer-Encoding","binary;");
%>

<!DOCTYPE html>
<html lang="ko">
<head>
<title><c:out value="${menuInfo.cntntsNm}"/> 목록</title>
<meta name="decorator" content="<c:out value="${menuInfo.siteId}"/>" />
<script type="text/javascript" src="/common/js/calendar.js"></script>
<script type="text/javascript" src="<c:url value='/cmm/validator.do'/>"></script>
<link rel="stylesheet" href="/common/css/board.css" />
<script type="text/javascript" src="/common/js/default.js"></script>
<script type="text/javascript" src="/common/js/board.js"></script> 
</head>
<body>

	<table class="bbs_default list" data-rwdb="yes">
<%-- 	<colgroup>
        <col style="width:100px"/>
        <col style="width:230px"/>
        <col style="width:100px"/>
        <col style="width:120px"/>
        <col style="width:30px"/>
        <col style="width:30px"/>
	</colgroup> --%>
		<tr>
			<th scope="col">번호</th>
			<th scope="col">구분</th>
<%-- <!-- 			<th scope="col">읍면동구분</th> --> --%>
			<th scope="col">시설명</th>
			<th scope="col">주소</th>
			<th scope="col">표시여부</th>
		</tr>
	
	<c:set var="currentPageStartNo" value="${fn:escapeXml(paginationInfo.currentPageStartNo)}" />
	<c:forEach var="resMapList" items="${parkingMapList}">
	
		<c:if test="${resMapList.locType ne 'PDR'}">
		<tr>
			<td><c:out value="${currentPageStartNo}"/></td>
			<td><c:out value="${locTypMap[resMapList.locType]}"/></td>
			<%-- <td><c:out value="${emdSeMap[result.locEmdse]}"/></td> --%>
			<td><a href="parkingMapDetailView.do?key=<c:out value="${param.key}"/>&amp;locNo=<c:out value="${resMapList.locNo}"/>"><span><c:out value="${resMapList.locNm}"/></span></a></td>
			<td class="text_left"><c:out value="${resMapList.locRaddr}"/></td>
			<td>
				<c:choose><c:when test="${resMapList.showAt eq 'Y'}">표시함</c:when><c:otherwise>표시안함</c:otherwise></c:choose>
			</td>
		</tr>
		<c:set var="currentPageStartNo" value="${fn:escapeXml(currentPageStartNo-1)}" />
		</c:if>
	</c:forEach>
	<c:if test="${empty parkingMapList}">
		<tr>
			<td colspan="10">등록된 정보가 없습니다.</td>
		</tr>
	</c:if>
		<tr>
			<td colspan="5">
				<span>총 <strong><c:out value="${paginationInfo.totalRecordCount}"/></strong> 건</span>
				, <span class="division_line">페이지 <strong><c:out value="${paginationInfo.currentPageNo}"/></strong> / <c:out value="${paginationInfo.totalPageCount}"/></span>
			</td>
		</tr>
	</table>
</body>
</html>