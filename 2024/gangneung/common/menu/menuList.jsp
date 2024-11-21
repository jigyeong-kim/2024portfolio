<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.LinkedList" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfo" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfoService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.Menu" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.stm.service.ContentsComplate" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.stm.service.ContentsComplateService" %>
<%@ include file="./dbcp.jsp"%>
<%!

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
    public String listToString(List<Integer> list) {

    	StringBuffer sb = new StringBuffer();
    	
    	for( int i=0; i<list.size(); i++ ) {
    	
    		if( 0 != i ) {
    			sb.append(",");
    		}

    		sb.append(list.get(i));
    		
    	}
    	
    	return sb.toString();

    }
%>
<%

	request.setCharacterEncoding("UTF-8");

	String siteId = (String)request.getParameter("siteId");
	String searchMenuNm = nvl((String)request.getParameter("searchMenuNm"));
	String[] arrMenuTy = request.getParameterValues("menuTy");
    String work = nvl((String)request.getParameter("work"));

	String menuTyPattern = "";
	if( null != arrMenuTy ) {
		menuTyPattern += "(";
		for( int i=0; i<arrMenuTy.length; i++ ) {
			if( 0 != i ) {
				menuTyPattern += "|";
			}
			menuTyPattern += arrMenuTy[i];
		}
		menuTyPattern += ")";
	}

	ServletContext servletContext = request.getSession().getServletContext();
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
	
	SiteInfoService siteInfoService = (SiteInfoService)wac.getBean("siteInfoService");
	MenuService menuService = (MenuService)wac.getBean("menuService");
	ContentsComplateService contentsComplateService = (ContentsComplateService)wac.getBean("contentsComplateService");
	
	SiteInfo siteInfo = new SiteInfo();
	siteInfo.setSiteSe("SECT01");

	List<SiteInfo> siteInfoList = siteInfoService.selectSiteInfoList(siteInfo);

	Map<String, String> nosMapSite = contentsComplateService.selectContentsComplateMapForMenuNos();
	List<Integer> menuNoListSite = new LinkedList<Integer>();

	for( int i=0; i<siteInfoList.size(); i++ ) {
		
		String data = nosMapSite.get(siteInfoList.get(i).getSiteId());
		if( !isEmpty(data) ) {
			String[] arrData = data.split(",");
			for( int j=0; j<arrData.length; j++ ) {
				if( "".equals(arrData[j].trim()) ) continue;
				menuNoListSite.add(Integer.parseInt(arrData[j].trim()));
			}
		}

	}
	HashMap<String, Integer> siteMap = getSiteListWithWork(listToString(menuNoListSite));
	
	Map<String, String> nosMap = contentsComplateService.selectContentsComplateMapForMenuNos();

	List<Menu> menuList = null;
	
	if( !isEmpty(searchMenuNm) ) {
		MenuVO menuVO = new MenuVO();
		menuVO.setFirstIndex(0);
		menuVO.setLastIndex(1000000);
		menuVO.setSearchKrwd(searchMenuNm);
		menuVO.setSiteId(siteId);
		menuList = menuService.selectMenuSearchList(menuVO);
	} else {
		Menu menu = new Menu();
		menu.setSiteId(siteId);
		menuList = menuService.selectMenuList(menu);
	}
	
	String data = nosMap.get(siteId);
	java.util.HashMap<String, String> map = new java.util.HashMap<String, String>();
	
	if( !isEmpty(data) ) {
		String[] arrData = data.split(",");
		for( int i=0; i<arrData.length; i++ ) {
			if( "".equals(arrData[i].trim()) ) continue;
			map.put(arrData[i].trim(), "Y");
		}
	}

    HashMap<Integer, String> menuListHiddenMap = getMenuListHidden(siteId);
    siteInfo = siteInfoService.selectSiteInfo(siteId);
    
    HashMap<Integer, String> newMap = new HashMap<Integer, String>();
    /*
    newMap.put(1112,"Y");
    newMap.put(1114,"Y");
    newMap.put(187,"Y");
    newMap.put(1123,"Y");
    newMap.put(1124,"Y");
    newMap.put(1137,"Y");
    newMap.put(1311,"Y");
    newMap.put(1156,"Y");
    newMap.put(1155,"Y");
    newMap.put(1269,"Y");
    newMap.put(1160,"Y");
    newMap.put(1162,"Y");
    newMap.put(1270,"Y");
    newMap.put(1164,"Y");
    newMap.put(1167,"Y");
    newMap.put(1168,"Y");
    newMap.put(1169,"Y");
    newMap.put(1063,"Y");
    newMap.put(1175,"Y");
    newMap.put(1271,"Y");
    newMap.put(1273,"Y");
    newMap.put(1274,"Y");
    newMap.put(1275,"Y");
    newMap.put(1276,"Y");
    newMap.put(1277,"Y");
    newMap.put(1189,"Y");
    newMap.put(1190,"Y");
    newMap.put(1191,"Y");
    newMap.put(1192,"Y");
    newMap.put(1194,"Y");
    newMap.put(1278,"Y");
    newMap.put(1279,"Y");
    newMap.put(1280,"Y");
    newMap.put(1281,"Y");
    newMap.put(1282,"Y");
    newMap.put(1283,"Y");
    newMap.put(1195,"Y");
    newMap.put(1177,"Y");
    newMap.put(1178,"Y");
    newMap.put(1180,"Y");
    newMap.put(1181,"Y");
    newMap.put(1182,"Y");
    newMap.put(1183,"Y");
    newMap.put(1290,"Y");
    newMap.put(1295,"Y");
    newMap.put(1314,"Y");
    newMap.put(1239,"Y");
    newMap.put(1240,"Y");
    newMap.put(1245,"Y");
    newMap.put(1246,"Y");
    newMap.put(1247,"Y");
    newMap.put(1248,"Y");
    newMap.put(1249,"Y");
    newMap.put(1317,"Y");
    newMap.put(1251,"Y");
    newMap.put(1252,"Y");
    newMap.put(1298,"Y");
    newMap.put(1299,"Y");
    newMap.put(1256,"Y");
    newMap.put(1257,"Y");
    newMap.put(1261,"Y");
    newMap.put(1262,"Y");
    newMap.put(1263,"Y");
    */
%>    
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/common/css/default.css" />
<link rel="stylesheet" href="/common/css/font.css" />
<link rel="stylesheet" href="/site/www/css/sub.css" />
<script type="text/javascript" src="/common/js/jquery-1.11.1.min.js"></script>
<script>
	function checkContents( menuNo ) {
		var line = $("#" + menuNo);
		if( "N" === line.attr("chk") ) {
			fn_complate(menuNo);
		} else {
			fn_incomplate(menuNo);
		}
	}
	function checkMenu() {
		var lineList = $("#contents table tbody tr"),
			i = 0, data = "";
		for( i=0; i<lineList.length; i++ ) {
			if( typeof(lineList.eq(i).attr("id")) === "undefined" ) continue;
			if( "Y" === lineList.eq(i).attr("chk") ) {
				data += lineList.eq(i).attr("id") + "|";
			}
		}
		saveMenu('<%= siteId %>', data);
	}
	function saveMenu( siteId, data ) {
		var url = "./saveMenuCheck.jsp?siteId=" + siteId + "&data=" + data;
		$.ajax({
			type     : "GET",
			url      : url,
			cache    : false,
			error    : function( request, status, error ) { alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); },
			success  : saving
		});
	}
	function fn_complate(menuNo) {
		var url = "/neo/contentsComplate.do?siteId=<%= siteId %>&menuNo=" + menuNo;
		$.ajax({
			type     : "GET",
			url      : url,
			dataType : "json",
			cache    : false,
			error    : function( request, status, error ) { alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); },
			success  : fn_complateResult
		});		
	}
	function fn_incomplate(menuNo) {
		var url = "/neo/contentsInComplate.do?siteId=<%= siteId %>&menuNo=" + menuNo;
		$.ajax({
			type     : "GET",
			url      : url,
			dataType : "json",
			cache    : false,
			error    : function( request, status, error ) { alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); },
			success  : fn_incomplateResult
		});
	}
	function onError(data, status) {
		alert("오류!");
	}
	function fn_complateResult(data, status) {
		
		if( !data ) {
			onError(data, status);
			return;
		}

		var siteId = data.siteId,
			menuNo = data.menuNo,
			result = data.result;
		
		if( '00' === result ) {
			var line = $("#" + menuNo);
			line.css("background-color", "#F1F1F1");
			line.attr("chk","Y");
		} else {
			onError(data, status);
			return;
		}
		
	}
	function fn_incomplateResult(data, status) {
		
		if( !data ) {
			onError(data, status);
			return;
		}

		var siteId = data.siteId,
			menuNo = data.menuNo,
			result = data.result;
		
		if( '00' === result ) {
			var line = $("#" + menuNo);
			line.css("background-color", "#FFF");
			line.attr("chk","N");
		} else {
			onError(data, status);
			return;
		}
		
	}
	function saving() {
		console.log("저장됨!")
	}

  function fn_clickMenu(id) {
    $("a").removeClass("blink");
    $("#" + id).addClass("blink");
  }
  function fn_toggleSite() {
	  
	  var siteList = $("#siteList"),
	  	flag = siteList.attr("flag"),
	  	btnSiteToggle = $("#btnSiteToggle"),
	  	tmpTop, tmpFlag, tmpBtnNm;
	  
	  if( "open" === flag ) {
		  tmpTop = "-400px";
		  tmpFlag = "close";
		  tmpBtnNm = "사이트 목록 열기";
	  } else if( "close" === flag ) {
		  tmpTop = "0px";
		  tmpFlag = "open";
		  tmpBtnNm = "사이트 목록 닫기";
 	  }
	  
	  siteList.css("top",tmpTop);
	  siteList.attr("flag", tmpFlag);
	  //btnSiteToggle.text(tmpBtnNm);
	  
  }
  /*
  $(document).ready(function() {
  	$("#btnSiteToggle").on("focusout", function(){
  		fn_toggleSite();
  	});
  });
  */
</script>
<style>
/* for MS계열 브라우저 */
@keyframes blink {
 0% {color: #FFF;}
 50% {color: #000;}
}
 
/* for Chrome, Safari */
@-webkit-keyframes blink {
 0% {color: #FFF;}
 50% {color: #000;}
}
 
/* blink CSS 브라우저 별로 각각 애니메이션을 지정해 주어야 동작한다. */
.blink {
 animation: blink 1s step-end infinite;
 -webkit-animation: blink 1s step-end infinite;
}

</style>
</head>
<body>

<div id="contents" style="padding:0">

	<div id="siteList" flag="close" style="position:fixed; top:-400px; left:0px; width:100%; background-color:#FFF;">
		<table class="table">
		<thead>
		<tr>
			<th>사이트 목록</th>
		</tr>
		</thead>
		<tbody>
		<%
			for( int i=0; i<siteInfoList.size(); i++ ) {
	
	            Integer cnt = siteMap.get(siteInfoList.get(i).getSiteId());
	            if( null == cnt ) cnt = 0;
	            String cntColor = 0 == cnt ? "BLUE" : "RED";
		%>
		<tr>
			<td <%= ( 0 == cnt ) ? "style=\"background-color:#F1F1F1\"" : "" %>>
	            <a href="./menuList.jsp?siteId=<%= siteInfoList.get(i).getSiteId() %>&menuTy=MNTY02"><%= siteInfoList.get(i).getSiteNm() %></a>
	            <a href="./menuList.jsp?siteId=<%= siteInfoList.get(i).getSiteId() %>&menuTy=MNTY02&work=Y"><span style="color:<%= cntColor %>">(<%= cnt %>)</span></a>
	        </td>
		</tr>
		<%	
			}
		%>
		</tbody>
		</table>
		<button id="btnSiteToggle" type="button" onclick="fn_toggleSite()" style="width:100%; height:30px; background-color:#26a7e2; margin-bottom:5px; color:#FFF;"><%= siteInfo.getSiteNm() %></button>
	</div>

	<div style="margin-top:40px">
		<form name="menuSearchForm" method="get" action="./menuList.jsp">
		<fieldset>
			<legend>메뉴 검색</legend>
			<input type="hidden" name="siteId" value="<%= siteId %>"/>
			<input type="hidden" name="work" value="<%= work %>"/>
			<input type="checkbox" name="menuTy" id="mnty02" value="MNTY02" <%= (regexMatches("MNTY02", menuTyPattern) ? "checked=\"checked\"" : "" ) %>><label for="mnty02">콘텐츠</label>
			<input type="checkbox" name="menuTy" id="mnty03" value="MNTY03" <%= (regexMatches("MNTY03", menuTyPattern) ? "checked=\"checked\"" : "" ) %>><label for="mnty03">게시판</label>
			<input type="checkbox" name="menuTy" id="mnty04" value="MNTY04" <%= (regexMatches("MNTY04", menuTyPattern) ? "checked=\"checked\"" : "" ) %>><label for="mnty04">프로그램</label>
			<input type="checkbox" name="menuTy" id="mnty05" value="MNTY05" <%= (regexMatches("MNTY05", menuTyPattern) ? "checked=\"checked\"" : "" ) %>><label for="mnty05">내부파일</label>
			<input type="text" name="searchMenuNm" value="<%= searchMenuNm %>" style="width:200px" placeholder="메뉴명 입력"/>
			<input type="submit" value="검색" style="border:solid 1px #CCC; padding:0 10px; background-color:#F1F1F1"/>
		</fieldset>
		</form>
	</div>

	<table class="table">
	<thead>
	<tr>
		<th>번호</th>
		<th>메뉴명</th>
	</tr>
	</thead>
	<tbody>
	<%
		int no = 0;
		for( int i=0; i<menuList.size(); i++ ) {
			if( regexMatches(menuList.get(i).getMenuTy(), menuTyPattern) ) {
				
				if( "N".equals(menuList.get(i).getMenuShowAt()) ) continue;

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
				
				String chk = "N";
				if( null != map.get(String.valueOf(menuList.get(i).getMenuNo())) ) 
					chk = "Y";

                boolean display = false;
                if( "Y".equals(work) ) {
                    if( "N".equals(chk) ) {
                        display = true;
                    } else {
                        display = false;
                    }
                } else {
                    display = true;
                }

                if( display ) {

                    String hiddenIcon = "";
                    String hiddenStyle = "";
                    boolean hiddenFlag = false;
                    if( null != menuListHiddenMap.get(menuList.get(i).getMenuNo()) && "Y".equals(menuListHiddenMap.get(menuList.get(i).getMenuNo())) ) {
                        hiddenIcon = "_x";
                        hiddenStyle = "style=\"color:#AAA;\"";
                        hiddenFlag = true;
                    }

                    boolean newMenu = false;
                    if( "Y".equals(nvl(newMap.get(menuList.get(i).getMenuNo()))) ) {
                    	newMenu = true;
                    }
                    
	%>
	<tr id="<%= menuList.get(i).getMenuNo() %>" chk="<%= chk %>" <%= ( "Y".equals(chk) ) ? "style=\"background-color:#F1F1F1\"" : "" %>>
<!--		<td><a href="<%= menuList.get(i).getMenuUrl() %>" target="_blank" title="새창"><img src="/neo/images/icon_<%= menuList.get(i).getMenuTy() %>.gif"/></a> <a href="./contentsFrame.jsp?menuNo=<%= menuList.get(i).getMenuNo() %>" target="contentsFrame" title="<%= naviPath %>"><%= menuList.get(i).getMenuNm() %></a></td>
-->
    <% if( hiddenFlag ) { %>
		<td <%= newMenu ? "style=\"background-color:#26a7e2\"" : "" %>><del><a href="#" onclick="checkContents('<%= menuList.get(i).getMenuNo() %>'); return false;" <%= hiddenStyle %>><%= menuList.get(i).getMenuNo() %></a></del></td>
    <% } else { %>
		<td <%= newMenu ? "style=\"background-color:#26a7e2\"" : "" %>><a href="#" onclick="checkContents('<%= menuList.get(i).getMenuNo() %>'); return false;" <%= hiddenStyle %>><%= menuList.get(i).getMenuNo() %></a></td>
    <% } %>
		<td>
        <a href="<%= menuList.get(i).getMenuUrl() %>" target="_blank" title="새창"><img src="/neo/images/icon_<%= menuList.get(i).getMenuTy() %><%= hiddenIcon %>.gif"/></a>
    <% if( "MNTY03".equals(menuList.get(i).getMenuTy()) || "MNTY04".equals(menuList.get(i).getMenuTy()) ) { %>
        <a href="/<%= menuList.get(i).getSiteId() %>/contents.do?key=<%= menuList.get(i).getMenuNo() %>" target="contentsFrame" onclick="fn_clickMenu('menuNm_<%= menuList.get(i).getMenuNo() %>');"><img src="/neo/images/icon_MNTY02<%= hiddenIcon %>.gif"/></a> 
    <% } %>
    <% if( isEmpty(menuList.get(i).getLegacyUrl()) ) { %>
<!--        <img src="/neo/images/icon_MNTY06_x.gif"/>-->
    <% } else { %>
        <a href="<%= menuList.get(i).getLegacyUrl() %>" target="contentsFrame" onclick="fn_clickMenu('menuNm_<%= menuList.get(i).getMenuNo() %>');"><img src="/neo/images/icon_MNTY06.gif"/></a> 
    <% } %>
        <a href="<%= menuList.get(i).getMenuUrl() %>" target="contentsFrame" id="menuNm_<%= menuList.get(i).getMenuNo() %>" onclick="fn_clickMenu('menuNm_<%= menuList.get(i).getMenuNo() %>');" title="<%= naviPath %>" <%= hiddenStyle %>><%= menuList.get(i).getMenuNm() %></a>
      </td>
	</tr>
	<%	
    				no++;

                }

			}

		}

        if( 0 == no ) {
            if( "Y".equals(work) && isEmpty(searchMenuNm) ) {
    %>
    <tr>
        <td colspan="2" class="text_center">
            <img src="./good.jpg" alt="참! 잘했어요"/>
        </td>
    </tr>
    <%
            } else {
    %>
    <tr>
        <td colspan="2" class="text_center">검색 결과가 없습니다.</td>
    </tr>
    <%
            }
        }

	%>
	</tbody>
	</table>

</div>

</body>
</html>