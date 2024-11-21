<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="kr.co.hanshinit.xwcms.pum.PumDao"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.HashMap"%>
<%@page import="org.springframework.web.context.WebApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="java.math.*,java.util.*,png.*,java.io.*,javax.servlet.*" %>
<%
	ServletContext ctx = pageContext.getServletContext();
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(ctx);
	PumDao dao = (PumDao) wac.getBean("pumDao");
	String pumId="";
	String titleId="";
	pumId=request.getParameter("pumId");
	if(pumId==null){
		pumId="1";
	}
	Iterator pumItr = dao.getPumList().iterator();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<title>청주시 등산로안내 서비스</title>
<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=EUC-KR" />
<meta name="keywords" content="" />
<meta name="description" content="" />
<link type="text/css" rel="stylesheet" href="/static/pum/css/total_style.css" />
 

<script type="text/javascript">
function viewMap(pum_id, div) {
	document.getElementById("map").src = "/app3/pum/dmap.jsp?pum_id="+pum_id+"&div="+div;
}
</script>
</head>

<body id="sub">

	 <div id="header">
		<p class="top"><a href="./main.jsp"><img src="/static/pum/images/intro_btn.gif" alt="첫화면으로" /></a></p>
		<ul id="menu">
		
<%--상단메뉴구성--%>
<%
	String div = "";
	HashMap data = null;
	String pumIdtmp="";
	while(pumItr.hasNext()) {
		data = (HashMap) pumItr.next();
		if (!StringUtils.equals(div, (String) data.get("div"))) {
%>
			<li<%
			pumIdtmp=""+data.get("pum_id");
			if(pumIdtmp.equals(pumId.trim())){
				%> class="on"<%
				titleId=pumId;
			}
			%>><a href="/app3/pum/pum.jsp?pumId=<%= data.get("pum_id") %>"><span><%= data.get("div") %></span></a></li>
<%
		} 
		div = (String) data.get("div");
	}
%>
		<%-- 
			
			<li><a href="#"><span>백화산</span></a></li>
			<li><a href="#"><span>상당산성</span></a></li>
			<li><a href="#"><span class="he">것대,<br />낙가산</span></a></li>
			<li><a href="#"><span>구룡산</span></a></li>
			<li><a href="#"><span>매봉산</span></a></li>
			<li><a href="#"><span>부모산</span></a></li>
			<li><a href="#"><span class="he">양병산<br />(운천공원)</span></a></li>
			<li><a href="#"><span>선도산</span></a></li>
			<li><a href="#"><span class="he">잠두봉<br />공원</span></a></li>
			<li><a href="#"><span>명심공원</span></a></li> --%>
		</ul>
	 </div>

	 <div id="container">
		<div id="leftmenu">
			<ul>
				<li><p><img src="/static/pum/images/left_title<%if(StringUtils.length(titleId) == 1){%>0<%} %><%= titleId %>.gif" alt="" /></p>
					<ul class="menu">
					
<%--좌측메뉴구성--%>
<%
	div = "";
	data = null;
	boolean nextbreak=false;
	pumItr = dao.getPumList().iterator();
	
	while(pumItr.hasNext()) {
		data = (HashMap) pumItr.next();
		pumIdtmp=""+data.get("pum_id");
		if(Integer.parseInt(pumIdtmp)>=Integer.parseInt(pumId))
		if (!StringUtils.equals(div, (String) data.get("div"))) {
			if(nextbreak){
				break;
			}

			if(pumIdtmp.equals(pumId)){
				nextbreak=true;
			}

			%>
			<li><a href="javascript:viewMap('<%= data.get("pum_id") %>','')"><%= data.get("title") %>. <%= data.get("section") %> (<%= data.get("km") %>km)</a></li>
			<%
		}else{
		
%>
<li><a href="javascript:viewMap('<%= data.get("pum_id") %>','')"><%= data.get("title") %>. <%= data.get("section") %> (<%= data.get("km") %>km)</a></li>
<%
		}
		div = (String) data.get("div");
	}
%>
<!-- 
					
					
					
						
						<li><a href="#">한솔초교 ↔ 정상 (1km)</a></li>
						<li><a href="#">산남주공4단지 ↔ 정상 (0.4km)</a></li>
						<li><a href="#">한마음 2차APT ↔ 정상 (0.6km)</a></li> 
						<li><a href="#">우편집중국 ↔ 정상 (1km)</a></li>
						<li><a href="#">두산한솔 ↔ 정상 (0.9km)</a></li>
						<li><a href="#">서우APT ↔ 정상 (0.8km)</a></li>
						<li><a href="#">원당맨션 ↔ 정상 (0.8km)</a></li>
						<li><a href="#">부강그린맨션 ↔ 정상 (0.5km)</a></li>
						<li><a href="#">화암사 ↔ 정상 (0.5km)</a></li>
						<li><a href="#">매봉상생태육교 ↔ 정상 (0.5km)</a></li> -->
					</ul>
				</li>
			</ul>
		</div>
		<div id="contents">
			<div><iframe id="map" src="/app3/pum/dmap.jsp?pum_id=<%=pumId %>&div=" width="764px" height="658px" scrolling="no" frameborder="0"></iframe></div>
		</div>
	 </div>

	 <p class="subfooter">
	우)360-700 충청북도 청주시 상당구 상당로 155 (북문로3가) 청주시청 대표전화 043-201-2114<br />
	Copyright ⓒ 1998-2010 Cheongju City. All Rights Reserved. 
	</p>

</body>
</html>
