<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.gosiNtt.service.GosiNttService" %>
<%

    String gosiSe = request.getParameter("gosiSe");

    ServletContext servletContext = request.getSession().getServletContext();
    WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);

    GosiNttService gosiNttService = (GosiNttService)wac.getBean("gosiNttService");
    gosiNttService.collectGosiNttList(gosiSe);

%>