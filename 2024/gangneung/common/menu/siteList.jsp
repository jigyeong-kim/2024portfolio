<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.LinkedList" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfo" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfoService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.Menu" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.stm.service.ContentsComplate" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.stm.service.ContentsComplateService" %>

<%@ include file="./dbcp.jsp"%>
<%!

	public String getFileContents(String file) {
		
		String enter = System.getProperty("line.separator");
		
		StringBuffer buf = new StringBuffer();
		try {
			java.io.BufferedReader in = new java.io.BufferedReader( new java.io.InputStreamReader( new java.io.FileInputStream(file), "UTF-8") );
			String line = null;
			while((line = in.readLine()) != null) {
				buf.append(line);
				buf.append(enter);				
			}
			in.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return buf.toString();	
		
	}

	public String nvl(String str) {
		return ( null == str ) ? "" : str;
	}
	
	public boolean isEmpty(String str) {
		return ( null == str || "".equals(str) ) ? true : false;
	}

	public boolean regexMatches(String str, String regex) {
		
		return str.matches(regex);
		
	}
    public String listToString(List<Integer> list) {

    	StringBuffer sb = new StringBuffer();
    	
    	for( int i=0; i<list.size(); i++ ) {
    	
    		if( 0 != i ) {
    			sb.append(",");
    		}

    		sb.append(list.get(i));
    		
    	}
    	
    	return sb.toString();

    }
	
%>
<%

ServletContext servletContext = request.getSession().getServletContext();
WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);

SiteInfoService siteInfoService = (SiteInfoService)wac.getBean("siteInfoService");
MenuService menuService = (MenuService)wac.getBean("menuService");
ContentsComplateService contentsComplateService = (ContentsComplateService)wac.getBean("contentsComplateService");

SiteInfo siteInfo = new SiteInfo();
siteInfo.setSiteSe("SECT01");

List<SiteInfo> siteInfoList = siteInfoService.selectSiteInfoList(siteInfo);

Map<String, String> nosMap = contentsComplateService.selectContentsComplateMapForMenuNos();

List<Integer> menuNoList = new LinkedList<Integer>();

for( int i=0; i<siteInfoList.size(); i++ ) {
	
	String data = nosMap.get(siteInfoList.get(i).getSiteId());
	if( !isEmpty(data) ) {
		String[] arrData = data.split(",");
		for( int j=0; j<arrData.length; j++ ) {
			if( "".equals(arrData[j].trim()) ) continue;
	        menuNoList.add(Integer.parseInt(arrData[j].trim()));
		}
	}

}

HashMap<String, Integer> siteMap = getSiteListWithWork(listToString(menuNoList));

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/common/css/default.css" />
<link rel="stylesheet" href="/common/css/font.css" />
<link rel="stylesheet" href="/site/www/css/sub.css" />
</head>
<body>

<div id="contents" style="padding:0">

	<table class="table">
	<thead>
	<tr>
		<th>SITE_NM</th>
	</tr>
	</thead>
	<tbody>
	<%
		for( int i=0; i<siteInfoList.size(); i++ ) {

            Integer cnt = siteMap.get(siteInfoList.get(i).getSiteId());
            if( null == cnt ) cnt = 0;
            String cntColor = 0 == cnt ? "BLUE" : "RED";
	%>
	<tr>
		<td <%= ( 0 == cnt ) ? "style=\"background-color:#F1F1F1\"" : "" %>>
            <a href="./menuList.jsp?siteId=<%= siteInfoList.get(i).getSiteId() %>&menuTy=MNTY02" target="menuList"><%= siteInfoList.get(i).getSiteNm() %></a>
            <a href="./menuList.jsp?siteId=<%= siteInfoList.get(i).getSiteId() %>&menuTy=MNTY02&work=Y" target="menuList"><span style="color:<%= cntColor %>">(<%= cnt %>)</span></a>
        </td>
	</tr>
	<%	
		}
	%>
	</tbody>
	</table>
	
</div>

</body>
</html>