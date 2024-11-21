<%@page import="kr.co.hanshinit.xwcms.PropResource"%>
<%@ page contentType = "text/html; charset=utf-8" %>
<%@ page import="kr.co.hanshinit.xwcms.HtmlUtil"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

	<% String con_html = "/repository/" + request.getAttribute("siteId") + "/contents/" + request.getAttribute("key") + ".html";
	if(HtmlUtil.isExistFile(request, con_html)) { %>
	<c:set var="progHeaderFile" value="/repository/${siteId}/contents/${key}.html"/>
	<c:import var="progHeaderContent" url="${progHeaderFile}" charEncoding="UTF-8" />
	<c:out value="${progHeaderContent}" escapeXml="false" />
	<%	} %>
