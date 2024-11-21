<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfo" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfoService" %>

<%

    ServletContext servletContext = request.getSession().getServletContext();
    WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);

    SiteInfoService siteInfoService = (SiteInfoService)wac.getBean("siteInfoService");
    List<SiteInfo> siteInfoList = siteInfoService.selectSiteInfoList(new SiteInfo());

    int siteInfoListCo = siteInfoList.size();

%>
{
"siteInfoCo" : <%= siteInfoListCo %>,
"siteInfoList" : [
<%
    for( int i=0; i<siteInfoListCo; i++ ) {
        SiteInfo siteInfo = siteInfoList.get(i);
%>
{
"siteId" : "<%= siteInfo.getSiteId() %>",
"siteNm" : "<%= siteInfo.getSiteNm() %>",
"dfltSiteAt" : "<%= siteInfo.getDfltSiteAt() %>",
"actvtyAt" : "<%= siteInfo.getActvtyAt() %>",
"menuInfoListUrl" : "/common/wpMenuInfoList.jsp?siteId=<%= siteInfo.getSiteId() %>"
}<%= i < (siteInfoListCo-1) ? "," : "" %>
<% } %>
]
}