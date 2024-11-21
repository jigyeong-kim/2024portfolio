<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="kr.co.hanshinit.xwcms.site.service.SiteService" %>
<%@	page import="kr.co.hanshinit.xwcms.sym.sit.sii.service.SiteInfo" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
SiteInfo siteInfo = null;
try {
	String siteId = request.getParameter("siteId");
	if(siteId != null) {
		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
		SiteService siteService = (SiteService)wac.getBean("siteService");	
		siteInfo = siteService.getSiteInfo(request, siteId);
	}
	
	if(siteInfo == null) {
		response.sendRedirect("/common/block.do");
		return;
	}
}
catch(Exception e) {
	
}
request.setAttribute("siteInfo", siteInfo);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="title" content="Page printing-${siteInfo.siteNm}" />
<meta name="author" content="${siteInfo.siteAuthr}" />
<meta name="keywords" content="${siteInfo.siteKwrd}" />
<meta name="description" content="${siteInfo.siteDc}" />
<title>Page printing-${siteInfo.siteNm}</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" type="text/css" href="/common/css/print.css" />
<link rel="stylesheet" type="text/css" href="css/sub.css" />
<script type="text/javascript" src="/common/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript"> 
//<![CDATA[
window.onload = function() {
 	var content = jQuery('#contents', window.opener.document).html();
 	var RegExpTag = /href="(.*?)"/gi;
	content = content.replace(RegExpTag,"");
	jQuery('#contents').html(content);
	
	jQuery('#sub_title').html('SUB TITLE');
	var paths = jQuery('#menu_path', window.opener.document).html();
	jQuery('#paths_h1').html(paths);
}
 
function printArea() {
	beforePrint();
	window.print();
	afterPrint();
}
 
var initBody;
function beforePrint() {
	initBody = document.body.outerHTML;
	document.body.innerHTML = document.getElementById('bodys').outerHTML;
}
function afterPrint() {
	document.body.innerHTML = initBody;
}
 
setTimeout (function () {
	beforePrint();
	window.print();
	afterPrint();
},1000);	
//]]>
</script>
 
</head>
<body>
<div class="contetns" id="bodys">
	<h1><span id="paths_h1"></span>Print</h1>
	<div id="contents"></div> 
</div>


<div class="comm_btn text_center"><button onclick="printArea()"><span>Print</span></button><button onclick="window.close();"><span>Close</span></button></div>
</body>
</html>

