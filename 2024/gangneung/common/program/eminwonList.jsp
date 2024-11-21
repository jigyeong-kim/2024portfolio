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

  String key = (String)request.getParameter("key");
  String pageIndex = (String)request.getParameter("pageIndex");
  String jndinm = (String)request.getParameter("jndinm");
  String context = (String)request.getParameter("context");
  String method = (String)request.getParameter("method");
  String methodnm = (String)request.getParameter("methodnm");
  String wkly_event_mgt_no = (String)request.getParameter("wkly_event_mgt_no");
  String subCheck = (String)request.getParameter("subCheck");
  String ofr_pageSize = (String)request.getParameter("ofr_pageSize");
  String homepage_pbs_yn = (String)request.getParameter("homepage_pbs_yn");
  String initValue = (String)request.getParameter("initValue");
  String wkly_se_code = (String)request.getParameter("wkly_se_code");
  String countYn = (String)request.getParameter("countYn");
  String event_sj = (String)request.getParameter("event_sj");
  
  String not_ancmt_mgt_no = (String)request.getParameter("not_ancmt_mgt_no");
  String not_ancmt_se_code = (String)request.getParameter("not_ancmt_se_code");
  String title = (String)request.getParameter("title");
  String cha_dep_code_nm = (String)request.getParameter("cha_dep_code_nm");
  String countYnAC = (String)request.getParameter("countYnAC");
  String list_gubun = (String)request.getParameter("list_gubun");
  String not_ancmt_sj = (String)request.getParameter("not_ancmt_sj");
  String not_ancmt_cn = (String)request.getParameter("not_ancmt_cn");
  String dept_nm = (String)request.getParameter("dept_nm");
  String mobile_code = (String)request.getParameter("mobile_code");
  String temp = (String)request.getParameter("temp");
  
  
  
  //String url = "http://eminwon.seosan.go.kr/emwp/gov/mogaha/ntis/web/ofr/action/OfrAction.do?pageIndex=" + pageIndex + "&jndinm=" + jndinm + "&context=" + context + "&method=" + method + "&methodnm=" + methodnm + "&wkly_event_mgt_no=" + wkly_event_mgt_no + "&subCheck=" + subCheck + "&ofr_pageSize=" + ofr_pageSize + "&homepage_pbs_yn=" + homepage_pbs_yn + "&initValue=" + initValue + "&wkly_se_code=" + wkly_se_code + "&countYn=" + countYn + "&event_sj=" + event_sj + "&not_ancmt_mgt_no=" + not_ancmt_mgt_no + "&not_ancmt_se_code=" + not_ancmt_se_code + "&title=" + title + "&cha_dep_code_nm=" + cha_dep_code_nm + "&initValue=" + initValue + "&countYnAC=" + countYnAC + "&list_gubun=" + list_gubun + "&not_ancmt_sj=" + not_ancmt_sj + "&not_ancmt_cn=" + not_ancmt_cn + "&dept_nm=" + dept_nm + "&mobile_code=" + mobile_code + "&Key=" + key + "&temp=" + temp;
  String url = "http://eminwon.gangneung.go.kr/emwp/gov/mogaha/ntis/web/ofr/action/OfrAction.do?" + request.getQueryString();
  
  Document doc = Jsoup.parse(new URL(url).openConnection().getInputStream(), "UTF-8", "");

  OutputSettings outputSettings = new OutputSettings();
  outputSettings.outline(true);
  outputSettings.indentAmount(4);
  outputSettings.syntax(Syntax.xml);
  outputSettings.prettyPrint(true);
  outputSettings.charset("UTF-8");

  doc.outputSettings(outputSettings);

  Element div = doc;
  String html = "";

  if( null != div ) {

    div = div.select("body").first();
    
    Elements imgs = div.select("img");
    
        Iterator<Element> itr = imgs.iterator();
        while(itr.hasNext()) {
            Element ele = itr.next();
            String imgUrl = "http://eminwon.gangneung.go.kr" + ele.attr("src");
            ele.attr("src", imgUrl);
        }
    
    Elements heads = div.select("link");
    Iterator<Element> itr2 = heads.iterator();
    while(itr2.hasNext()) {
        Element ele2 = itr2.next();
        String ele2Href = ele2.attr("href");
        if( ele2Href.contains("emwp") ) {
            ele2.attr("href", "http://eminwon.gangneung.go.kr" + ele2Href);
        }
    }
    
    Elements heads2 = div.select("script");
    Iterator<Element> itr3 = heads2.iterator();
    while(itr3.hasNext()) {
        Element ele3 = itr3.next();
        String ele3Src = ele3.attr("src");
        if( ele3Src.contains("emwp") ) {
            ele3.attr("src", "http://eminwon.gangneung.go.kr" + ele3Src);
        }
    }

    Elements tables = div.select("table");
    tables.eq(0).remove();
    tables.eq(1).after("" +
      "<div class=\"program_search\">" + 
      "            <div class=\"search_inner clearfix\">" + 
      "                <div class=\"search_select\">" + 
      "                <span>" + 
      "                  <select name=\"Key\" title=\"검색 영역 선택\">" + 
      "                    <option value=\"B_Subject\" selected=\"\">제 목</option>" + 
      "                    <option value=\"B_Content\">내 용</option>" + 
      "                    <option value=\"B_Dept\">담당부서</option>" + 
      "                  </select>" + 
      "                </span>" + 
      "                </div>" + 
      "                <div class=\"search_text\">" + 
      "                    <span><input type=\"text\" name=\"not_ancmt_sj\" value=\"\" title=\"검색어를 입력해주세요\" placeholder=\"검색어를 입력해주세요\" onkeyPress=\"javascript:enterKey()\" /></span>" + 
      "                </div>" + 
      "                <div class=\"search_btn\">" + 
      "                    <span class=\"btn_submit\"><input type=\"submit\" onclick=\"javascript:srchList();\" value=\"검색\"/></span>" + 
      "                </div>" + 
      "            </div>" + 
      "</div>");
    tables.eq(1).remove();
    String countInfo = tables.eq(2).select("td").eq(0).text();
    String[] counts = countInfo.split(" ");
    String[] pages = counts[0].split("/");
    String total = counts[1].replaceAll("[^\\d]", "");
    tables.eq(2).after("" +
      "<div class=\"bbs_info clearfix\">" + 
      "    <div class=\"bbs_left bbs_count\">" + 
      "        <span>총 게시물  <strong>" + total + "</strong> 개</span>" + 
      "        , <span class=\"division_line\">페이지 <strong>" + pages[0] + "</strong> / " + pages[1] + "</span>" + 
      "    </div>" + 
      "</div>");
    tables.eq(2).remove();

    Elements eminwonList = tables.eq(3).select("td").eq(0).select("table").eq(0).select("tr");
    Iterator<Element> eminwonListItr = eminwonList.iterator();
    while(eminwonListItr.hasNext()) {
        Element ele = eminwonListItr.next();
        if( ele.childNodeSize() == 1 ) {
        	ele.remove();
        } else {
        	out.println(ele.html());
        }
    }

//    tables.eq(3).after(eminwonList.html());
    tables.eq(3).remove();

    html = div.html();
    html = html.replaceAll("/emwp/jsp/ofr/FileDown.jsp", "http://eminwon.gangneung.go.kr/emwp/jsp/ofr/FileDown.jsp");
    html = html.replaceAll("method=\"post\"", "method=\"get\"");

  }

%>

<html lang="ko">
<head> 
  <title>고시공고</title> 
  <link rel="stylesheet" href="/common/css/common.css" /> 
  <link rel="stylesheet" href="/common/css/template.css" /> 
  <link rel="stylesheet" href="/common/css/program.css" /> 
  <link rel="stylesheet" href="/site/www/css/common.css" /> 
  <link rel="stylesheet" href="/common/css/default.css" /> 
  <script type="text/javascript" src="/emwp/js/cmm/jsp/calendar.js"></script> 
  <script type="text/javascript" src="/emwp/js/cmm/jsp/common.js"></script> 
  <script type="text/javascript" src="/emwp/js/common.js"></script> 
  <script language="javascript">    

    function isEtcChar(value) {
       var _etcValue   = '~`!@#$%%^&*()-_=+\|[{]};:\'\",<.>/?';
        var j;
        for(j=0;j<_etcValue.length;j++)
            if(value == _etcValue.charAt(j)) {
                return true;
            }
        return false;
    }

//-------------------------------------------------------------------
// 설명   : 초기화
//-------------------------------------------------------------------
    function init() {
        var f = document.form1;
        var ck = 'gov.mogaha.ntis.cmm.util.Page@5e92ca6d';
        if(ck=="null"){
            srchList();
        }
        
    }
//-------------------------------------------------------------------
// 설명   : 고시공고 목록 조회
//-------------------------------------------------------------------   
    function search(){
        var f = document.form1;
        var str = f.not_ancmt_sj.value;

        if(str != null && str != ''){
           var len = str.length;
           if(len > 0 ){
              for(var i=0;i<len;i++){
                 if(isEtcChar(str.charAt(i))){
                    alert('특수문자 입력할 수 없습니다');
                    f.not_ancmt_sj.focus();
                    return;
                 }
              }
           }
        }
 
        f.target = "_self";
        f.action = "/common/program/eminwonList.jsp";   
        f.method.value   = 'selectListOfrNotAncmt'; //Action
        f.methodnm.value = 'selectListOfrNotAncmtHomepage';
        f.submit(); 
    }           
//-------------------------------------------------------------------
// 설명   : 검색버튼 클릭시 페이지정보 초기화 하고 조회
//-------------------------------------------------------------------
    function srchList(){
         document.form1.pageIndex.value="";    //페이지 인덱스 초기화
         search();
    }
//-------------------------------------------------------------------
// 설명   : 페이지 이동시 조회
//-------------------------------------------------------------------
    function goPage() {
        search();
    }
//-------------------------------------------------------------------
// 설명   : 고시공고 상세내용 조회
//-------------------------------------------------------------------       
    function searchDetail(not_ancmt_mgt_no) {
        
        var f = document.form1;
        f.not_ancmt_mgt_no.value = not_ancmt_mgt_no ;
        f.target = "_self";
        f.action = "/common/program/eminwonView.jsp";   
        f.method.value   = 'selectOfrNotAncmt'; //Action
        f.methodnm.value = 'selectOfrNotAncmtRegst';
        f.submit();         
        
    }
//-------------------------------------------------------------------
// 설명   : 엔터 눌렀을 때, 검색버튼 클릭시와 같은 기능 
//-------------------------------------------------------------------
    function enterKey(){
        var key = event.keyCode; 
        if( key == 13 ){ 
            srchList();
        }
    }  

        </script>
</head>
<body>

<%= html %>

</body>
</html>