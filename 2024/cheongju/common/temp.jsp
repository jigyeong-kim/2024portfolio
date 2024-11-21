<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.math.*,java.util.*, java.io.*,javax.servlet.*" %>

<%
String userid=(String) request.getSession().getAttribute("userId");
%>

<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
<title>::테스트::</title>
</head>
<body>
<div id="wrapper">
	<div id="header">
		<h1>
			<%=userid%>
		</h1>
	</div>
	
</div>
</body>
</html>
