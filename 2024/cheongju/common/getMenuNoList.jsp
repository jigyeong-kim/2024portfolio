<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@
	taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %><%@
	taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %><%@
	page import="java.util.List" %><%@
	page import="java.util.ArrayList" %><%@
	page import="org.springframework.web.context.WebApplicationContext"%><%@
	page import="org.springframework.web.context.support.WebApplicationContextUtils" %><%@
	page import="kr.co.hanshinit.xwcms.sym.sit.sii.service.*"%><%@
	page import="kr.co.hanshinit.xwcms.sym.sit.mnu.service.*"%><%
try {
	String siteId = org.apache.commons.lang.StringUtils.defaultIfEmpty(request.getParameter("siteId"), "");
	if(!"".equals(siteId)) {
		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
		SiteInfoService siteInfoService = (SiteInfoService)wac.getBean("siteInfoService");
		SiteInfo siteInfo = siteInfoService.selectSiteInfo(siteId);
		if(siteInfo != null) {
			MenuService menuService = (MenuService)wac.getBean("menuService");
			List<Integer> menuNoList = menuService.selectMenuNoList(siteId);
			request.setAttribute("menuNoList", menuNoList);
		}
	}
}
catch(Exception e) {
	System.out.println("Connection Exception occurred");
}
%>[<c:forEach var="k" items="${menuNoList}" varStatus="mstt"><c:if test="${mstt.index gt 0}">,</c:if>${k}</c:forEach>]