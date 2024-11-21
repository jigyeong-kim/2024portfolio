<%@ page language="java" pageEncoding="UTF-8"%>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.xwcms.CmmIdGnrService" %>
<%
	WebApplicationContext wac = null;
	String prefix = request.getParameter("prefix");
	String tblNm = request.getParameter("tblNm");
	String idNm = request.getParameter("idNm");
	String sIdLen = request.getParameter("idLen");
	String padStr = request.getParameter("padChar");
	char padChar = '0';
	if(prefix == null) {
		prefix = "";
	}
	if(tblNm == null) {
		tblNm = "CMMN";
	}
	if(idNm == null) {
		idNm = "GEN_ID";
	}
	if(padStr == null || padStr.length() != 1) {
		padStr = "0";
	}
	padChar = padStr.charAt(0);
	
	int idLen = 10;
	try {
		if(sIdLen != null && org.apache.commons.lang.StringUtils.isNumeric(sIdLen)) {
			idLen = Integer.parseInt(sIdLen);
		}
	} catch(Exception e) {
		idLen = 10;
	}
	
	String pk = "";
	try {		
		
		wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
		CmmIdGnrService idGnrService = (CmmIdGnrService)wac.getBean("cmmIdGnrService");
		
    	idGnrService.setProperties(prefix, idLen, padChar, tblNm+"_"+prefix);
		pk = idGnrService.getNextStringId();		
	}
	catch(Exception e) {
		System.out.println("Connection Exception occurred");
	}
	request.setAttribute(idNm, pk);
%>