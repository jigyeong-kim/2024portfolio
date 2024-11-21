<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.xwcms.sym.sit.mnu.service.MenuService" %>
<%@ page import="kr.co.hanshinit.xwcms.sym.sit.mnu.service.Menu" %>
<%@ page import="kr.co.hanshinit.xwcms.sym.sit.mnu.service.MenuVO" %>
<%@ page import="kr.co.hanshinit.xwcms.sym.sit.sii.service.SiteInfo" %>
<%@ page import="kr.co.hanshinit.xwcms.sym.sit.sii.service.SiteInfoService" %>
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
			System.out.println("Connection Exception occurred");
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
        return "C";
      } else if( "MNTY03".equals(str) ) {
        return "B";
      } else if( "MNTY04".equals(str) ) {
        return "P";
      } else if( "MNTY05".equals(str) ) {
        return "INNER";
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
        menuTyPattern = "(MNTY02|MNTY03|MNTY04|MNTY05)";
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
</head>
<body>
<script>
  function fn_download() {
      window.location = "./down.jsp?siteId=<%= siteId %>&menuTy=";
  }
</script>
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
      			<input type="submit" value="엑셀저장" style="border:solid 1px #CCC; padding:0 10px; background-color:#F1F1F1; height: 26px;"/>
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
      <th>경로</th>
      <th>유형</th>
      <th>숨김여부</th>
      <th>부서코드</th>
      <th>담당부서</th>
      <th>담당자코드</th>
      <th>담당자</th>
      <th>문의처</th>
	</tr>
	</thead>
	<tbody>
	<%
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

	%>
	<tr>
       <td class="first"><%= menuList.get(i).getMenuNo() %></td>
       <td><a href="<%= menuList.get(i).getMenuUrl() %>" title="새창" target="_blank"><%= menuList.get(i).getMenuNm() %></a></td>
       <td><a href="<%= menuList.get(i).getMenuUrl() %>" title="새창" target="_blank"><%= naviPath %></a></td>
       <td><%= toTyNm(menuList.get(i).getMenuTy()) %></td>
       <td><%= toShow(menuList.get(i).getMenuShowAt()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getDeptCode()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getDeptNm()) %></td>

       <td><%= nullToEmpty(menuList.get(i).getEmpCode()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getEmpNm()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getEmpTelno()) %></td>

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

</div>
</body>
</html>