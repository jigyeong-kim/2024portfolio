<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.LinkedList" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.Menu" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfo" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfoService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.stm.service.ContentsComplate" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.stm.service.ContentsOpinion" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.StringUtil" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.FileMngUtil" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.stm.service.ContentsComplateService" %>
<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.nodes.Attribute" %>
<%@ page import="org.jsoup.nodes.Attributes" %>
<%@ page import="org.jsoup.nodes.Document" %>
<%@ page import="org.jsoup.nodes.Document.OutputSettings" %>
<%@ page import="org.jsoup.nodes.Document.OutputSettings.Syntax" %>
<%@ page import="org.jsoup.nodes.Element" %>
<%@ page import="org.jsoup.select.Elements" %>
<%@ include file="../menu/dbcp.jsp"%>
<%!

    class ElementData {
	
	    private String html;
	    public void setHtml(String html) {
	    	this.html = html;
	    }
	    public String getHtml() {
	    	return html;
	    }
	
    }

    public String getFileContents(String file) {
        
        String enter = System.getProperty("line.separator");
        
        StringBuffer buf = new StringBuffer();
        try {
            java.io.BufferedReader in = new java.io.BufferedReader( new java.io.InputStreamReader( new java.io.FileInputStream(file), "UTF-8") );
            String line = null;
            while((line = in.readLine()) != null) {
                buf.append(line);
                buf.append(enter);              
            }
            in.close();
        } catch(Exception e) {
            e.printStackTrace();
        }
        return buf.toString();  
        
    }

    public String nvl(String str) {
        return ( null == str ) ? "" : str;
    }
    
    public boolean isEmpty(String str) {
        return ( null == str || "".equals(str) ) ? true : false;
    }

    public boolean regexMatches(String str, String regex) {
        
        return str.matches(regex);
        
    }

   public String nullToEmpty(String str) {
     if( null == str ) return "";
     if( "null".equals(str) ) return "";
     return str;
   }
   
   public List<ElementData> getElements(String filePath, String selector) {
	   
	   List<ElementData> result = new LinkedList<ElementData>();
	   
	   String contents = getFileContents(filePath);
	   
	   Document doc = Jsoup.parseBodyFragment(contents);
	   /*
       OutputSettings outputSettings = new OutputSettings();
       outputSettings.outline(true);
       outputSettings.indentAmount(4);
       outputSettings.syntax(Syntax.xml);
       outputSettings.prettyPrint(true);
       outputSettings.charset("UTF-8");
       doc.outputSettings(outputSettings);
	   */

	   Elements div = doc.select(selector);
	   
	   if( div.size() == 0 ) {
		   return null;
	   } else {
		   for( Element e : div ) {
			   ElementData elementData = new ElementData();
			   elementData.setHtml(e.outerHtml());
			   result.add(elementData);
		   }
	   }
	   
	   return result;
	   
   }
   
%>
<%

    String siteId = nvl((String)request.getParameter("siteId"));
    String selector = nvl((String)request.getParameter("selector"));

    ServletContext servletContext = request.getSession().getServletContext();
    WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
     
    MenuService menuService = (MenuService)wac.getBean("menuService");
    SiteInfoService siteInfoService = (SiteInfoService)wac.getBean("siteInfoService");
    ContentsComplateService contentsComplateService = (ContentsComplateService)wac.getBean("contentsComplateService");

    List<SiteInfo> siteInfoList = siteInfoService.selectSiteInfoList(new SiteInfo());

    String menuTyPattern = "";
    if( isEmpty(menuTyPattern) ) {
       menuTyPattern = "(MNTY02)";
    }
     
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>메뉴</title>
<link rel="stylesheet" href="/common/css/default.css" />
<link rel="stylesheet" href="/common/css/font.css" />
<link rel="stylesheet" href="/site/www/css/sub.css" />
<script type="text/javascript" src="/common/js/jquery-1.11.1.min.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shCore.js"></script>
<link rel=stylesheet type=text/css href="/neo/syntaxhighlighter/styles/shCoreDefault.css">
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushAS3.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushBash.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushCpp.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushCSharp.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushCss.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushDelphi.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushDiff.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushGroovy.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushJava.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushJavaFX.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushJScript.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushPerl.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushPhp.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushPlain.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushPowerShell.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushPython.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushRuby.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushScala.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushSql.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushVb.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shBrushXml.js"></script>
<script type=text/javascript src="/neo/syntaxhighlighter/scripts/shLegacy.js"></script>
<style type=text/css>
.syntaxhighlighter { overflow-y: hidden !important; }
</style>
<script type="text/javascript">
    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.defaults['gutter'] = true;
    SyntaxHighlighter.defaults['tab-size'] = 4;
    SyntaxHighlighter.defaults['first-line'] = 1;
    SyntaxHighlighter.defaults['auto-links'] = false;
    SyntaxHighlighter.defaults['wrap-lines'] = true;
    SyntaxHighlighter.all();
</script>
</head>
<body>
<div id="contents" style="padding:10px">

    <div class="clearfix">
        <form name="menuSearchForm" method="get" action="./finder.jsp" style="float:left">
        <fieldset>
            <legend>검색</legend>
        <select name="siteId">
          <option value="">사이트 선택</option>
      <% for( int i=0; i<siteInfoList.size(); i++ ) { %>
          <option value="<%= siteInfoList.get(i).getSiteId() %>" <%= (siteInfoList.get(i).getSiteId().equals(siteId) ) ? "selected=\"selected\"" : "" %>><%= siteInfoList.get(i).getSiteNm() %></option>
      <% } %>
        </select>
            <input type="text" name="selector" id="selector" value="<%= selector %>"/>
            <input type="submit" value="검색" style="border:solid 1px #CCC; padding:0 10px; background-color:#F1F1F1; height: 26px;"/>
        </fieldset>
        </form>
    </div>

<%


  if( !isEmpty(siteId) ) {

        Menu menu = new Menu();
        menu.setSiteId(siteId);

     List<Menu> menuList = menuService.selectMenuList(menu);

%>
    <table class="table">
    <colgroup>
        <col width="80"/>
        <col/>
        <col width="120"/>
    </colgroup>
    <thead>
    <tr>
		<th class="first">번호</th>
		<th>경로</th>
		<th><button type="button" id="buttonAll" style="background-color:#000; color:#FFF; padding:5px 12px;" flag="N">열기</button></th>
    </tr>
    </thead>
    <tbody>
    <%

    for( int i=0; i<menuList.size(); i++ ) {
        if( regexMatches(menuList.get(i).getMenuTy(), menuTyPattern) ) {
        	if( "Y".equals(menuList.get(i).getMenuShowAt()) ) {
            String naviPath = "";
            String navi = menuList.get(i).getNavi();
	        if( null != navi ) {
	            String[] arrNavi = navi.split("\\^");
	            if( null != arrNavi ) {
	                for( int j=0; j<arrNavi.length; j++ ) {
	                    if( isEmpty(arrNavi[j]) ) continue;
	                    String[] arrMenuInfo = arrNavi[j].split("\\|");
	                    if( null == arrMenuInfo ) continue;
	                    naviPath += arrMenuInfo[1] + " &gt; ";
	                }
	            }
	        }
	        
	        String filePath = FileMngUtil.getRealPath("/repository/" + menuList.get(i).getSiteId() + "/contents/" + menuList.get(i).getMenuNo() + ".html");
	        if( FileMngUtil.isExistsFile(filePath) ) {
	        
	        	List<ElementData> result = getElements(filePath, selector);
	            if( null != result ) {

	            	int elementDataSize = result.size();
    %>
    <tr style="background-color:#333; color:#FFF">
       <td class="first text_right"><%= menuList.get(i).getMenuNo() %></td>
       <td><a href="<%= menuList.get(i).getMenuUrl() %>" title="새창" target="_blank" style="color:#FFF"><%= naviPath %></a></td>
       <td class="text_center"><button type="button" style="background-color:#FFF; color:#000; padding:5px 12px;" flag="N" menuNo="<%= menuList.get(i).getMenuNo() %>">열기</button></td>
    </tr>
    <tr style="display:none;" id="src_<%= menuList.get(i).getMenuNo() %>" class="source">
        <td class="text_right first"><%= elementDataSize %></td>
        <td colspan="2">

<% for( int j=0; j<elementDataSize; j++ ) { %>

<div style="width:100%; border:solid 1px #000;">
<pre class="brush:xml">
<%= result.get(j).getHtml() %>
</pre>
</div>

<% } %>
        </td>
    </tr>
<%
	            }
	        }
        }
    }
    }
%>
    </tbody>
    </table>
<%
    }
%>
</div>
<script>
$(document).ready(function(){
	$("table tbody button").on("click", function(){
		var menuNo = $(this).attr("menuNo"),
		  flag = $(this).attr("flag");
		if( "N" === flag ) {
			$("#src_" + menuNo).show();
			$(this).attr("flag", "Y");
			$(this).text("닫기");
		} else {
			$("#src_" + menuNo).hide();
			$(this).attr("flag", "N");
			$(this).text("열기");
		}
	});
	
	$("#buttonAll").on("click", function(){
		
		var flag = $(this).attr("flag"),
		  buttonTbody = $("table tbody button"),
		  buttonFlag, buttonText;
		
		if( "N" === flag ) {
            $(".source").show();
            buttonFlag = "Y";
            buttonText = "닫기";
        } else {
            $(".source").hide();
            buttonFlag = "N";
            buttonText = "열기";
        }
		
        $(this).attr("flag", buttonFlag);
        $(this).text(buttonText);
        buttonTbody.attr("flag", buttonFlag);
        buttonTbody.text(buttonText);
		
	});
});
</script>
</body>
</html>