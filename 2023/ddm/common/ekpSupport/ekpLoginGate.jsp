<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% if(request.getHeader("user-agent").indexOf("MSIE") != -1 ) response.setContentType("text/html"); %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.StringUtil" %>
<html>
<head>
    <title>민원알림</title>
</head>
<body>
<%
    request.setCharacterEncoding("UTF-8");

    String id = StringUtil.getString(request.getParameter("id"), "");
    String status = StringUtil.getString(request.getParameter("status"), "");
    String seq    = StringUtil.getString(request.getParameter("seq"), "");

    if(id.equals("") || status.equals("") || !status.equals("ekpLogin")){
        out.println("아이디가 없거나 정상적인 접근이 아닙니다");
    }else{
        response.sendRedirect("/neo/epkLogin.do?id="+id+"&status="+status+"&seq="+seq);
    }
%>
</body>
</html>
