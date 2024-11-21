<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.sms.service.SmsService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.sms.service.SmsDetailSearchVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.sms.service.SmsDetail" %>
<%@ page import="kr.co.hanshinit.NeoCMS.tag.pagination.NeoPaginationInfo" %>

<%

    ServletContext servletContext = request.getSession().getServletContext();
    WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);

    SmsService smsService = (SmsService)wac.getBean("smsService");

    SmsDetailSearchVO smsDetailSearchVO = new SmsDetailSearchVO();
    smsDetailSearchVO.setYyyymm("202003");
    
    int totCnt = smsService.selectSmsDetailTotCnt(smsDetailSearchVO);
    NeoPaginationInfo neoPaginationInfo = smsDetailSearchVO.getNeoPaginationInfo(totCnt);
    List<SmsDetail> smsDetailList = smsService.selectSmsDetailList(smsDetailSearchVO);

    int smsDetailListCo = smsDetailList.size();
    out.println(smsDetailListCo);
%>