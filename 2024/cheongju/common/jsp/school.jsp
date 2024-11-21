<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="hui" uri="http://www.hanshinit.co.kr/jstl/ui"%>

<%@ page import="java.util.*" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@	page import="kr.co.hanshinit.xwcms.cop.horse.service.*" %>

<%
try {
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	HorseExprnService horseExprnService = (HorseExprnService)wac.getBean("horseExprnService");
	
	HorseExprnSchool horseExprnSchool = new HorseExprnSchool();
	horseExprnSchool.setSchoolClass(request.getParameter("horseExprnSchul"));
	horseExprnSchool.setSearchKrwd(request.getParameter("searchKrwd"));
	request.setAttribute("HorseExprnSchool", horseExprnSchool);
	
	List<HorseExprnSchool> list = new ArrayList<HorseExprnSchool>();
	list = horseExprnService.selectHorseExprnSchoolList(horseExprnSchool);
	
	request.setAttribute("HorseExprnSchoolList", list);

}catch(Exception e) {

}
%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<title>학교 리스트 조회</title>
<link rel="stylesheet" href="/site/www_2019/css/sub2.css" />
<!--
<link rel="stylesheet" href="/common_2018/css/default.css" />
<link rel="stylesheet" href="/site/www_2019/css/font.css" />
<link rel="stylesheet" href="/site/www_2019/css/common3.css" />
<link rel="stylesheet" href="/common/css/board.css" />
<link rel="stylesheet" href="/site/www_2019/css/template.css" />
<link rel="stylesheet" href="/site/www_2019/css/sub_content.css" />
-->
<link rel="stylesheet" href="<c:url value='/common/cjac/js/jquery-ui-1.12.1.custom/jquery-ui.css'/>">
<script type="text/javascript" src="<c:url value='/common/cjac/js/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/common/cjac/js/jquery-ui-1.12.1.custom/jquery-ui.min.js'/>"></script>
</head>
<script>
function init(nm,cls){
	var url = 'http://localhost:8080/www/addHorseExprnReqstView.do?key=21293';
	opener.schoolCallBack(nm,cls);
	window.close();
}
</script>
<body>
<form:form commandName="HorseExprnSchool" name="HorseExprnSchoolForm"  action="" method="get">
	<label for="searchKrwd">학교명</label> <form:input path="searchKrwd" />
	<span class="button black"><input type="submit" value="검색" /></span>
</form:form>
	<table class="table">
	<caption>학교 리스트 선택 - 학교명, 주소, 구분, 선택</caption>
	<colgroup>
	<col />
	<col />
	<col style="width:18%;" />
	<col style="width:16%;" />
</colgroup>
		<thead>
			<tr>
				<th scope="col">학교명</th>
				<th scope="col">주소</th>
				<th scope="col">구분</th>
				<th scope="col">선택</th>
			</tr>
		</thead>
		<tbody>
			<c:choose>
				<c:when test="${fn:length(HorseExprnSchoolList) > 0 }">
					<c:forEach var="result" items="${HorseExprnSchoolList }" varStatus="idx">
						<tr>
							<td>${result.schoolNm }</td>
							<td>${result.schoolAddr }</td>
							<td class="text_center">${result.schoolClass }</td>
							<td class="text_center"><button type="button" class="button" onclick="init('${result.schoolNm}','${result.schoolClass }');">선택</button></td>
						</tr>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<tr>
						<td colspan="4">조회된 데이터가 없습니다.</td>
					</tr>
				</c:otherwise>
			</c:choose>
		</tbody>
	</table>
</body>
</html>