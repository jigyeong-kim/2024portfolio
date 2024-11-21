<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.Menu" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuVO" %>
<%

	String menuNo = (String)request.getParameter("menuNo");

	ServletContext servletContext = request.getSession().getServletContext();
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
	
	MenuService menuService = (MenuService)wac.getBean("menuService");
	Menu menu = menuService.selectMenu(Integer.parseInt(menuNo));
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>NeoCMS Administrator</title>
</head>
<frameset rows="150,*" border="0">
	<frame name="getContents" src="./getContents.jsp?siteId=<%= menu.getSiteId() %>&menuNo=<%= menuNo %>" frameborder="0" scrolling="no" marginwidth="0" marginheight="0"/>
	<frame name="site" id="site" src="/<%= menu.getSiteId() %>/sub.do?key=<%= menuNo %>" style="border-left:solid 2px #A8C6EB" scrolling="auto" marginwidth="0" marginheight="0"/>
</frameset> 
<body>
frame 지원 브라우저 필요함
</body>
</html>