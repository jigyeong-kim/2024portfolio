<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.util.List" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="egovframework.com.cmm.LoginVO" %>
<%@ page import="kr.co.hanshinit.xwcms.SearchCriteria" %>
<%@ page import="kr.co.hanshinit.xwcms.HtmlUtil"%>
<%@ page import="kr.co.hanshinit.xwcms.SessionUtil"%>
<%@ page import="kr.co.hanshinit.xwcms.DateUtil" %>
<%@ page import="kr.co.hanshinit.xwcms.BbsInfo" %>
<%@ page import="kr.co.hanshinit.xwcms.BbsNttService" %>
<%@ page import="kr.co.hanshinit.xwcms.BbsNttVO" %>
<%
WebApplicationContext wac = null;
String bbsMenuNo = request.getParameter("bbsMenuNo");
String bbsNo = request.getParameter("bbsNo");
String nttSize = request.getParameter("nttSize");

try {
	wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	BbsNttService bbsNttService = (BbsNttService)wac.getBean("bbsNttService");

	List<BbsNttVO> bbsNttList = bbsNttService.selectBbsMiniList(Integer.valueOf(bbsNo),Integer.valueOf(nttSize),null,null);	// 새소식
	request.setAttribute("bbsNttList", bbsNttList);
	request.setAttribute("bbsMenuNo", bbsMenuNo);
}
catch(Exception e) {
	System.out.println("Connection Exception occurred");
}
%>
	<c:if test="${not empty bbsNttList and fn:length(bbsNttList) gt 0}">
	<ul>
		<c:forEach var="r" items="${bbsNttList}" varStatus="rstt">
		<li>
			<a href="/${siteId}/selectBbsNttView.do?bbsNo=${r.bbsNo}&amp;nttNo=${r.nttNo}&amp;key=${bbsMenuNo}"><c:out value="${r.nttSj}"/></a>
			<c:if test="${param.useTimeAt eq 'Y'}">
			<time datetime="<c:out value="${tsu:dateFormat(r.frstRegisterPnttm, 'yyyyMMddHHmmss', 'yyyy-MM-dd')}"/>"><c:out value="${tsu:dateFormat(r.frstRegisterPnttm, 'yyyyMMddHHmmss', 'yyyy-MM-dd')}"/></time>
			</c:if>
		</li>
		</c:forEach>
	</ul>
	<c:if test="${param.useMoreAt eq 'Y'}">
	<a href="/${siteId}/sub.do?key=${bbsMenuNo}" class="more">더보기</a>
	</c:if>
	</c:if>