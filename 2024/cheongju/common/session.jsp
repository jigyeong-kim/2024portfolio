<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Arrays" %>
<%@ page import="java.util.Enumeration" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<%

StringBuffer parameter = new StringBuffer();

Enumeration ee = request.getSession().getAttributeNames();
while(ee.hasMoreElements()) {
	String name = (String)ee.nextElement();
	parameter.append(name).append(" : ").append(request.getSession().getAttribute(name)).append("\n");
}

out.println(parameter.toString());

%>

<%
out.println("<font color=red size=5>Session Get</font><br><p>");
out.println("Container ID : " + System.getProperty("jvmid") + "<br>");
out.println("Session ID : " + session.getId() + "<br>");
out.println("Session Get : " + (String) session.getAttribute("id") + "<br><p>");

out.println("Session Timeout : " + session.getMaxInactiveInterval() + " sec.<br>");
out.println("Session Timeout : " + session.getMaxInactiveInterval()/60 + " min.<br>");
out.println("Session Timeout : " + (double)session.getMaxInactiveInterval()/3600 + " hour.<br><p>");
out.println("session.getLastAccessedTime() : " + new java.util.Date(session.getLastAccessedTime()).toString() + "<br>");
out.println("session.getCreationTime() : " + new java.util.Date(session.getCreationTime()).toString() + "<br>");

out.println("session. userid : " +  (String)session.getAttribute("userId") + "<BR>");

//request.getSession().session.setAttibute("test","test");

//out.println("session. test : " +  (String)session.getAttribute("test") + "<BR>");

%>

</body>
</html>