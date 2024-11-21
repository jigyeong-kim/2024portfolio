<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
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
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.stm.service.ContentsComplateService" %>
<%@ include file="../menu/dbcp.jsp"%>
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

   public String nullToEmpty(String str) {
     if( null == str ) return "";
     if( "null".equals(str) ) return "";
     return str;
   }
    
   public String toTyNm(String str) { 
      if( "MNTY02".equals(str) ) {
        return "콘텐츠";
      } else if( "MNTY03".equals(str) ) {
        return "게시판";
      } else if( "MNTY04".equals(str) ) {
        return "프로그램";
      } else if( "MNTY05".equals(str) ) {
        return "내부파일";
      } else if( "MNTY06".equals(str) ) {
          return "링크";
      } else {
        return "";
      }
   }

   public String toShow(String str) { 
      if( "Y".equals(str) ) {
        return "표시함";
      } else if( "N".equals(str) ) {
        return "<span style=\"color:red\">표시안함</span>";
      } else {
        return "";
      }
   }

%>
<%

    String siteId = nvl((String)request.getParameter("siteId"));
    String[] arrMenuTy = request.getParameterValues("menuTy");

     ServletContext servletContext = request.getSession().getServletContext();
     WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
     
     MenuService menuService = (MenuService)wac.getBean("menuService");
     SiteInfoService siteInfoService = (SiteInfoService)wac.getBean("siteInfoService");
     ContentsComplateService contentsComplateService = (ContentsComplateService)wac.getBean("contentsComplateService");

     List<SiteInfo> siteInfoList = siteInfoService.selectSiteInfoList(new SiteInfo());

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

     if( isEmpty(menuTyPattern) ) {
        menuTyPattern = "(MNTY02|MNTY03|MNTY04|MNTY05|MNTY06)";
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
<script>
  function fn_download() {
      window.location = "./down.jsp?siteId=<%= siteId %>&menuTy=";
  }
</script>
<style>
    #contents .table thead th {padding:10px;}
    #contents button {border:solid 1px #CCC; padding:0 10px; background-color:#F1F1F1; height: 26px;}
	.opertorCmmn { background-color:#f36a6a; color:#fff; padding:2px 5px; border-radius:2px; font-size:13px; }
	.opertorPm { background-color:#539CD9; color:#fff; padding:2px 5px;  border-radius:2px; font-size:13px;}
	.opertorPlner { background-color:#98B73A; color:#fff; padding:2px 5px; border-radius:2px; font-size:13px; }
	.opertorDesigner { background-color:#fb883c; color:#fff; padding:2px 5px; border-radius:2px; font-size:13px; }
	.opertorPublisher { background-color:#c880de; color:#fff; padding:2px 5px; border-radius:2px; font-size:13px;}
	.opertorDeveloper { background-color:#4cb8dc; color:#fff; padding:2px 5px; border-radius:2px; font-size:13px; }
</style>
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
    function fn_complate(menuNo) {
        var url = "/neo/contentsAcptnc.do?siteId=<%= siteId %>&menuNo=" + menuNo;
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
        var url = "/neo/contentsInAcptnc.do?siteId=<%= siteId %>&menuNo=" + menuNo;
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
            line.css("background-color", "#CCC");
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
          tmpTop = "-300px";
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
  function fn_toggleOpn(id) {
      
      var opn = $("#opn_" + id),
        flag = opn.attr("flag");
      
      if( "open" === flag ) {
    	  opn.hide();
    	  opn.attr("flag", "close");
      } else if( "close" === flag ) {
    	  opn.show();
    	  opn.attr("flag", "open");
      }
      
  }
  function fn_opnFormView(id) {
	  $("#opnForm_" + id).show();
	  $("#opnView_" + id).hide();
  }
  function fn_opnSave(id) {
	  var frm = $("#of_" + id).serializeArray();
      var url = "/neo/updateContentsOpinion.do";
      $.ajax({
          type     : "POST",
          url      : url,
          dataType : "json",
          data     : frm,
          cache    : false,
          error    : function( request, status, error ) { alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); },
          success  : fn_opnResult
      });
  }
  function fn_opnResult(data, status) {
      if( !data ) {
          onError(data, status);
          return;
      }
      var siteId = data.siteId,
          menuNo = data.menuNo,
          opinion = data.opinion,
          result = data.result;
      if( '00' === result ) {
    	  opinion = opinion.replaceAll("|?|", '"');
    	  $("#opnCn_" + menuNo).html(opinion);
          $("#opnForm_" + menuNo).hide();
          $("#opnView_" + menuNo).show();
      } else {
          onError(data, status);
          return;
      }
  }
  String.prototype.replaceAll = function(str1, str2) {
	  var org = this;
	  while( org.indexOf(str1) > -1 ) {
		  org = org.replace(str1, str2);
	  }
	  return org;
  }
</script>
</head>
<body>
<div id="contents" style="padding:10px">

    <div class="clearfix">
        <form name="menuSearchForm" method="get" action="./menu.jsp" style="float:left">
        <fieldset>
            <legend>메뉴 검색</legend>
        <select name="siteId">
          <option value="">사이트 선택</option>
      <% for( int i=0; i<siteInfoList.size(); i++ ) { %>
          <option value="<%= siteInfoList.get(i).getSiteId() %>" <%= (siteInfoList.get(i).getSiteId().equals(siteId) ) ? "selected=\"selected\"" : "" %>><%= siteInfoList.get(i).getSiteNm() %></option>
      <% } %>
        </select>
            <input type="checkbox" name="menuTy" id="mnty02" value="MNTY02" <%= (regexMatches("MNTY02", menuTyPattern) ? "checked=\"checked\"" : "" ) %>><label for="mnty02">콘텐츠</label>
            <input type="checkbox" name="menuTy" id="mnty03" value="MNTY03" <%= (regexMatches("MNTY03", menuTyPattern) ? "checked=\"checked\"" : "" ) %>><label for="mnty03">게시판</label>
            <input type="checkbox" name="menuTy" id="mnty04" value="MNTY04" <%= (regexMatches("MNTY04", menuTyPattern) ? "checked=\"checked\"" : "" ) %>><label for="mnty04">프로그램</label>
            <input type="checkbox" name="menuTy" id="mnty05" value="MNTY05" <%= (regexMatches("MNTY05", menuTyPattern) ? "checked=\"checked\"" : "" ) %>><label for="mnty05">내부파일</label>
            <input type="checkbox" name="menuTy" id="mnty06" value="MNTY06" <%= (regexMatches("MNTY05", menuTyPattern) ? "checked=\"checked\"" : "" ) %>><label for="mnty06">링크</label>
            <input type="submit" value="검색" style="border:solid 1px #CCC; padding:0 10px; background-color:#F1F1F1; height: 26px;"/>
        </fieldset>
        </form>

        <form name="menuSearchForm2" method="get" action="./down.jsp">
        <fieldset>
            <legend>메뉴 검색</legend>
         <input type="hidden" name="siteId" value="<%= siteId %>"/>
         <% if(regexMatches("MNTY02", menuTyPattern)) { %>
         <input type="hidden" name="menuTy" value="MNTY02"/>
         <% } %>
         <% if(regexMatches("MNTY03", menuTyPattern)) { %>
         <input type="hidden" name="menuTy" value="MNTY03"/>
         <% } %>
         <% if(regexMatches("MNTY04", menuTyPattern)) { %>
         <input type="hidden" name="menuTy" value="MNTY04"/>
         <% } %>
         <% if(regexMatches("MNTY05", menuTyPattern)) { %>
         <input type="hidden" name="menuTy" value="MNTY05"/>
         <% } %>
         <% if(regexMatches("MNTY06", menuTyPattern)) { %>
         <input type="hidden" name="menuTy" value="MNTY06"/>
         <% } %>
               &nbsp; <input type="submit" value="엑셀저장" style="border:solid 1px #CCC; padding:0 10px; background-color:#F1F1F1; height: 26px;"/>
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
    <thead>
    <tr>
        <th class="first">메뉴번호</th>
        <th>메뉴명</th>
        <th>기존 URL</th>
      <th>경로</th>
      <th>유형</th>
      <th>숨김여부</th>
      <th>검수</th>
      <!-- 
      <th>부서코드</th>
      <th>담당부서</th>
      <th>담당자코드</th>
      <th>담당자</th>
      <th>문의처</th>
       -->
       <th>의견</th>
    </tr>
    </thead>
    <tbody>
    <%

    HashMap<String, String> contentsOpinionMap = contentsComplateService.selectContentsOpinionMap(siteId);
    
    Map<String, String> nosMapSite = contentsComplateService.selectContentsComplateMapForMenuNos();
    String data = nosMapSite.get(siteId);
    java.util.HashMap<String, String> map = new java.util.HashMap<String, String>();

    if( !isEmpty(data) ) {
        String[] arrData = data.split(",");
        for( int i=0; i<arrData.length; i++ ) {
            if( "".equals(arrData[i].trim()) ) continue;
            map.put(arrData[i].trim(), "Y");
        }
    }
    
    Map<String, String> nosMapSite2 = contentsComplateService.selectContentsAcptncMapForMenuNos();
    String data2 = nosMapSite2.get(siteId);
    java.util.HashMap<String, String> map2 = new java.util.HashMap<String, String>();

    if( !isEmpty(data2) ) {
        String[] arrData = data2.split(",");
        for( int i=0; i<arrData.length; i++ ) {
            if( "".equals(arrData[i].trim()) ) continue;
            map2.put(arrData[i].trim(), "Y");
        }
    }
    
    
      int no=0;
        for( int i=0; i<menuList.size(); i++ ) {
            if( regexMatches(menuList.get(i).getMenuTy(), menuTyPattern) ) {
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
            
            String chk2 = "N";
            if( null != map2.get(String.valueOf(menuList.get(i).getMenuNo())) ) 
                chk2 = "Y";
            
            String opinion = contentsOpinionMap.get(String.valueOf(menuList.get(i).getMenuNo()));
            
    %>
    <tr id="<%= menuList.get(i).getMenuNo() %>" chk="<%= chk2 %>" <%= "Y".equals(chk2) ? "style=\"background-color:#CCC\"" : "" %>>
       <td class="first text_right"><%= menuList.get(i).getMenuNo() %></td>
       <td <%= "Y".equals(chk) ? "style=\"background-color:#F1F1F1\"" : "" %>><a href="<%= menuList.get(i).getMenuUrl() %>" title="새창" target="_blank"><%= menuList.get(i).getMenuNm() %></a></td>
       <td class="text_center">
       <% if( !StringUtil.isEmpty(menuList.get(i).getLegacyUrl()) ) { %>
        <a href="<%= menuList.get(i).getLegacyUrl() %>" target="_blank" title="새창">링크</a>
        <% } %>
        </td>
       <td><a href="<%= menuList.get(i).getMenuUrl() %>" title="새창" target="_blank"><%= naviPath %></a></td>
       <td class="text_center"><%= toTyNm(menuList.get(i).getMenuTy()) %></td>
       <td class="text_center"><%= toShow(menuList.get(i).getMenuShowAt()) %></td>
       <td class="text_center"><button type="button" onclick="checkContents('<%= menuList.get(i).getMenuNo() %>');">검수</button></td>
       <!-- 
       <td><%= nullToEmpty(menuList.get(i).getDeptCode()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getDeptNm()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getEmplCode()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getEmplNm()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getEmplTelno()) %></td>
        -->
        <td class="text_center"><button <%= !StringUtil.isEmpty(opinion) ? "style=\"background-color:RED; color:#FFF\"" : "" %> type="button" onclick="fn_toggleOpn('<%= menuList.get(i).getMenuNo() %>');">의견</button></td>
    </tr>
    <tr id="opn_<%= menuList.get(i).getMenuNo() %>" flag="close" style="display:none">
        <td colspan="7" class="first" >
            <div id="opnView_<%= menuList.get(i).getMenuNo() %>">
                <div id="opnCn_<%= menuList.get(i).getMenuNo() %>">
<%
if( !StringUtil.isEmpty(opinion) ) {
	opinion = opinion.replaceAll("공통","<span class=\"opertorCmmn\">공통</span>");
	opinion = opinion.replaceAll("PM","<span class=\"opertorPm\">PM</span>");
	opinion = opinion.replaceAll("피엠","<span class=\"opertorPm\">피엠</span>");
	opinion = opinion.replaceAll("기획자","<span class=\"opertorPlner\">기획자</span>");
	opinion = opinion.replaceAll("기획팀","<span class=\"opertorPlner\">기획팀</span>");
	opinion = opinion.replaceAll("디자이너","<span class=\"opertorDesigner\">디자이너</span>");
	opinion = opinion.replaceAll("디팀","<span class=\"opertorDesigner\">디팀</span>");
	opinion = opinion.replaceAll("퍼블리셔","<span class=\"opertorPublisher\">퍼블리셔</span>");
	opinion = opinion.replaceAll("퍼블팀","<span class=\"opertorPublisher\">퍼블팀</span>");
	opinion = opinion.replaceAll("프로그래머","<span class=\"opertorDeveloper\">프로그래머</span>");
	opinion = opinion.replaceAll("개발자","<span class=\"opertorDeveloper\">개발자</span>");
	opinion = opinion.replaceAll("개발팀","<span class=\"opertorDeveloper\">개발팀</span>");
	opinion = StringUtil.nl2br(opinion);
} else {
	opinion = "";
}
%>
                    <%= opinion %>
	            </div>
                <div class="text_center">
                    <button type="button" onclick="fn_opnFormView('<%= menuList.get(i).getMenuNo() %>');">수정</button>
                </div>
            </div>
            <div id="opnForm_<%= menuList.get(i).getMenuNo() %>" style="display:none">
                <form name="opnForm" id="of_<%= menuList.get(i).getMenuNo() %>" action="./updateContentsOpinion.do">
                <input type="hidden" name="siteId" value="<%= siteId %>"/>
                <input type="hidden" name="menuNo" value="<%= menuList.get(i).getMenuNo() %>"/>
                <textarea name="opinion" style="width:100%; height:160px"><%= StringUtil.isEmpty(contentsOpinionMap.get(String.valueOf(menuList.get(i).getMenuNo()))) ? "" : contentsOpinionMap.get(String.valueOf(menuList.get(i).getMenuNo())) %></textarea>
                <div class="text_center" style="margin-top:10px">
                    <button type="button" onclick="fn_opnSave('<%= menuList.get(i).getMenuNo() %>');">수정완료</button>
                </div>
                </form>
            </div>
        </td>
    </tr>
<%
            no++;
            }

        }

        if( 0 == no ) {

    %>
    <tr>
        <td colspan="10" class="text_center">검색 결과가 없습니다.</td>
    </tr>
    <%
            }

    %>
    </tbody>
    </table>

</div>
<%

  } else {
  }

%>

</body>
</html>