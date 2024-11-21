<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.http.Cookie" %>
<%

    String url = (String)request.getParameter("url");
    String value = java.net.URLEncoder.encode("http://www.gangneung.go.kr", "utf-8");
    Cookie cookie = new Cookie("frame_domain", value);
    cookie.setMaxAge(0);
    cookie.setPath("/");
    cookie.setDomain(".epeople.go.kr");
    response.addCookie(cookie);
%>
<iframe src="<%= url %>" width="100%" height="100%" scrolling="no" frameborder="0" title="외부 프로그램 아이프레임"></iframe>