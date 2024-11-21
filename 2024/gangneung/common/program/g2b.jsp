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
<%

  String url = "http://www.g2b.go.kr:8101/ep/adjust/instBidCdList.do?gigwanCode=4200000";

  Document doc = Jsoup.parse(new URL(url).openConnection().getInputStream(), "EUC-KR", "");

  OutputSettings outputSettings = new OutputSettings();
  outputSettings.outline(true);
  outputSettings.indentAmount(4);
  outputSettings.syntax(Syntax.xml);
  outputSettings.prettyPrint(true);
  outputSettings.charset("UTF-8");

  doc.outputSettings(outputSettings);

  Element div = doc;

%>
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
    <script src="/common/js/bidLink.js"></script>
</head>
<body>

<%

  if( null != div ) {

    Elements trs = div.select(".results table tr");

%>
<ul class="board_list">
<%

    int i = 0;

    for( Element tr : trs ) {

      if( i == 0 || i > 3 ) {
        i++;
        continue;
      }

      Elements tds = tr.select("td");
      String title = tds.eq(3).text();
      String href = tds.eq(2).select("a").attr("href");
%>
    <li><a href="<%= href %>"><%= title %></a></li>
<%
        
      i++;

    }

%>
</ul>
<%

  }

%>

</body>
</html>
