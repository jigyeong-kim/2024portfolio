<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.net.URLEncoder" %>
<%

  String nm = (String)request.getParameter("nm");
  String convertNm = "";
  if( null != nm ) {

    convertNm = URLEncoder.encode(nm).replaceAll("\\+", "%20");

  }

%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
    <title>URLEncoder</title>
</head>
<body>


<form name="encoder" action="./encoder.jsp">

<input type="text" name="nm" value="" style="width:400px"/>
<input type="submit" value="변환"/>

</form>

<h1><%= convertNm %></h1>

</body>
</html>