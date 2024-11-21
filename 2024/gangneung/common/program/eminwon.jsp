<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ page import="java.net.MalformedURLException" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.LinkedHashMap" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.Set" %>
<%@ page import="java.util.regex.Matcher" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.net.URL" %>
<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.nodes.Attribute" %>
<%@ page import="org.jsoup.nodes.Attributes" %>
<%@ page import="org.jsoup.nodes.Document" %>
<%@ page import="org.jsoup.nodes.Document.OutputSettings" %>
<%@ page import="org.jsoup.nodes.Document.OutputSettings.Syntax" %>
<%@ page import="org.jsoup.nodes.Element" %>
<%@ page import="org.jsoup.select.Elements" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.StringUtil" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.5, minimum-scale=1.0, user-scalable=yes" />
<meta name="keywords" content="강릉시청" />
<meta name="description" content="" />
<link rel="stylesheet" href="/common/css/default.css" />
<link rel="stylesheet" href="/common/css/font.css" />
<link rel="stylesheet" href="/common/css/common.css" />
<link rel="stylesheet" href="/site/www/css/main_layout.css" />
<!--[if lt IE 9]><script src="/common/js/html5.js"></script><![endif]-->
<title>강릉시청</title>
<style type="text/css">
body{background:none;}
</style>
</head>
<body>

<%

	String method = request.getMethod();
	if(method.equalsIgnoreCase("GET")) {

		String code = StringUtil.htmlSpecialChars(StringUtil.unXPath((String)request.getParameter("code")));

		String url = "http://eminwon.gangneung.go.kr/emwp/gov/mogaha/ntis/web/ofr/action/OfrAction.do?method=selectListOfrNotAncmtMini&methodnm=selectListOfrNotAncmtHomepage&jndinm=OfrNotAncmtEJB&context=NTIS&homepage_pbs_yn=Y&subCheck=Y&initValue=Y&ofr_pageSize=3&not_ancmt_se_code=" + code;

		Document doc = Jsoup.parse(new URL(url).openConnection().getInputStream(), "UTF-8", "");

		OutputSettings outputSettings = new OutputSettings();
		outputSettings.outline(true);
		outputSettings.indentAmount(4);
		outputSettings.syntax(Syntax.xml);
		outputSettings.prettyPrint(true);
		outputSettings.charset("UTF-8");

		doc.outputSettings(outputSettings);

		Element div = doc;

		String script = div.select("script").html();

%>


<script>function search(){var f=document.form1;var chker=f.initValue.value;if(chker=="Y")return;f.target="_self";f.action="http://eminwon.gangneung.go.kr/emwp/gov/mogaha/ntis/web/ofr/action/OfrAction.do";f.method.value='selectListOfrNotAncmtMini';f.methodnm.value='selectListOfrNotAncmtHomepage';f.submit();}
function searchDetail(not_ancmt_mgt_no){var f=document.form1;f.not_ancmt_mgt_no.value=not_ancmt_mgt_no;f.action="http://eminwon.gangneung.go.kr/emwp/gov/mogaha/ntis/web/ofr/action/OfrAction.do";f.method.value="selectOfrNotAncmtMini";f.methodnm.value="selectOfrNotAncmtRegst";if(f.not_ancmt_se_code.value=="02"){pop=window.open("about:blank","viewDetail","toolbar=no,location=no,diretories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=545,height=466");f.target="viewDetail";}else{pop2=window.open("about:blank","viewDetail2","toolbar=no,location=no,diretories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=545,height=466");f.target="viewDetail2";}
f.submit();}</script>

<%
  if( null != div ) {

    div.select("body").removeAttr("onload");
%>
<ul class="board_list">
<%
    Elements dd = div.getAllElements();

    for( Element e : dd ) {
      if( "li".equals(e.tagName()) ) {
        String href = e.select("a").attr("href");
        href = href.replaceAll("&", "&amp;");
%>  <li><a href="<%= href %>"><%= e.select("a").html() %></a><span class="date"><%= e.select("span").html() %></span></li><%
      }
    }
%>
    <!-- <li class="list_empty">등록된 게시물이 없습니다.</li>-->
</ul>
<%
  }
%>

<form name="form1" method="post" onsubmit="return false;">
<input type="hidden" name="pageIndex" value=''>
<input type="hidden" name="jndinm"  value="OfrNotAncmtEJB">
<input type="hidden" name="context" value="NTIS">
<input type="hidden" name="method"  value="">
<input type="hidden" name="methodnm" value="">
<!-- 시군구 페이지에 맞게 커스터마이징 된 JSP페이지 여부(Y/N) 설정 반드시 해줘야 함. -->
<input type="hidden" name="subCheck" value="Y">
<input type="hidden" name="not_ancmt_mgt_no" value="">
<input type="hidden" name="homepage_pbs_yn" value="Y">
<input type="hidden" name="ofr_pageSize" value="5">
<input type="hidden" name="initValue"  value="Y">
<input type="hidden" name="not_ancmt_se_code" value="<%= code %>">
<input type="hidden" name="cha_dep_code_nm" value="">
<input type="hidden" name="countYn" value="Y">
</form>

<% } else { %>

	잘못된 요청 입니다.

<% } %>

</body>
</html>
