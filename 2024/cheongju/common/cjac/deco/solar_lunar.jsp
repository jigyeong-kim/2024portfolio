<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	try {
	String S_HOLIDAY = "#0101#0301#0405#0505#0508#0515#0606#0715#0815#1003#1009#1225#";
	String L_HOLIDAY = "#0101#0408#0815#";

	String s_today = kr.co.hanshinit.xwcms.support.NeoCMS.cmm.util.DateUtil.getNowDateTime("yyyyMMdd");
	String l_today = kr.co.hanshinit.xwcms.support.NeoCMS.cmm.util.DateUtil.getLunarFromSolar(s_today);

	s_today = org.apache.commons.lang.StringUtils.substring(s_today, 4, 8);
	l_today = org.apache.commons.lang.StringUtils.substring(l_today, 4, 8);

	String eventClassName = "";
	if(org.apache.commons.lang.StringUtils.contains(S_HOLIDAY, "#"+s_today+"#")) {
		eventClassName = " event_s_" + s_today; 
	}
	else if(org.apache.commons.lang.StringUtils.contains(L_HOLIDAY, "#"+l_today+"#")){
		eventClassName = " event_l_" + l_today;
	}
	request.setAttribute("eventClassName", eventClassName);
} 
catch(Exception e) {
	
}
%>	