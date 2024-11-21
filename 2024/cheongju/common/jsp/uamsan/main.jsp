<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="net.cjcity.pum.PumDao"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.HashMap"%>
<%@page import="org.springframework.web.context.WebApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<title>청주시 등산로안내 서비스</title>
<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=EUC-KR" />
<meta name="keywords" content="" />
<meta name="description" content="" />
<link type="text/css" rel="stylesheet" href="/static/pum/css/total_style.css" />
<%@ include file="/WEB-INF/view/common/scripts.jsp"%>
<script type="text/javascript" src="/static/pum/script/jcarousellite_1.0.1.js"></script>
 
<script type="text/javascript">
$(document).ready(function(){
	$("#main_button").jCarouselLite({
		visible: 4,
	    auto: 1000,
	    speed: 200,
        start: 0,
        scroll: 1,
	    circular: false,
		autoRun:false,
	    btnNext: ".rightbtn",
	    btnPrev: ".leftbtn",
			overStop:true
		//,
	    //btnStop: ".stop",
	    //btnStart: ".start"
	});
});
</script>
</head>

<body id="body">

	<div id="intro">
		<p><img src="/static/pum/images/copy.png" alt="녹색수도 청주 등산로안내 시스템" /></p>
		<div class="main">
			<div id="main_button">
				<ul>
					<li><a href="/app3/pum/pum.jsp?pumId=1"><img src="/static/pum/images/img01.png" alt="우암산" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=11"><img src="/static/pum/images/img02.png" alt="백화산" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=15"><img src="/static/pum/images/img03.png" alt="상당산성" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=19"><img src="/static/pum/images/img04.png" alt="것대,낙가산" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=24"><img src="/static/pum/images/img05.png" alt="구룡산" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=30"><img src="/static/pum/images/img06.png" alt="매봉산" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=41"><img src="/static/pum/images/img07.png" alt="부모산" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=48"><img src="/static/pum/images/img08.png" alt="양병산(운천공원)" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=49"><img src="/static/pum/images/img09.png" alt="선도산" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=51"><img src="/static/pum/images/img10.png" alt="잠두봉공원" /></a></li>
					<li><a href="/app3/pum/pum.jsp?pumId=52"><img src="/static/pum/images/img11.png" alt="명심공원" /></a></li>
				</ul>
			</div>
			<div>
				<a href="#" class="leftbtn"><img src="/static/pum/images/left_btn.png" alt="이전" /></a>
				<a href="#" class="rightbtn"><img src="/static/pum/images/right_btn.png" alt="다음" /></a>
			</div>
		</div>
	</div>

	<div class="footer">
	<!--<p class="btn"><a href="#"><img src="/static/pum/images/btn.png" alt="책자 다운로드" /></a></p>-->
	<p>우)360-700 충청북도 청주시 상당구 상당로 155 (북문로3가) 청주시청 대표전화 043-201-2114<br />
	Copyright ⓒ 1998-2010 Cheongju City. All Rights Reserved. </p>
	</div>

	 

</body>
</html>
