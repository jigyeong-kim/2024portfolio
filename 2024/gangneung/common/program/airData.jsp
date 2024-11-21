<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.api.ApiService" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.List" %>
<%@ page import="javax.annotation.Resource" %>
<%

    ServletContext servletContext = request.getSession().getServletContext();
    WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);

    ApiService airDataService = (ApiService)wac.getBean("airDataService");

    List<HashMap<String, String>> resultMapList = airDataService.getApiData();

    for( int i=0; i<resultMapList.size(); i++ ) {

        HashMap<String, String> resultMap = resultMapList.get(i);
        out.println(resultMap + "<br/>");

    }

    airDataService.insertData(resultMapList);

    ApiService weatherDataService = (ApiService)wac.getBean("weatherDataService");

    List<HashMap<String, String>> resultMap = weatherDataService.getApiData();
    weatherDataService.insertData(resultMap);

%>