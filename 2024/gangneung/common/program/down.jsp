<%
  request.setCharacterEncoding("UTF-8");
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.Menu" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfo" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.sii.service.SiteInfoService" %>
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
        return "C";
      } else if( "MNTY03".equals(str) ) {
        return "B";
      } else if( "MNTY04".equals(str) ) {
        return "P";
      } else if( "MNTY05".equals(str) ) {
        return "INNER";
      } else if( "MNTY06".equals(str) ) {
          return "L";
      } else {
        return "";
      }
   }

   public String toShow(String str) { 
      if( "Y".equals(str) ) {
        return "표시함";
      } else if( "N".equals(str) ) {
        return "표시안함";
      } else {
        return "";
      }
   }

%>
<%

	response.resetBuffer();
	response.reset();
	response.setContentType("application/vnd.ms-excel");
	response.setHeader("ContentType","application/vnd.ms-excel; charset=UTF-8");
  response.setHeader("Content-Transper-Encoding", "binary");
	response.setHeader("Content-Disposition", "attachment;filename=menu.xls;"); 
	response.setHeader("Content-type", "file/unknown"); 
	response.setHeader("Content-Description:", "JAVA Generated Data"); 
	response.setHeader("Pragma","no-cache;");
	response.setHeader("Expires","-1");
	response.setHeader("Cache-Control","cache, must-revalidate");
	response.flushBuffer();
	
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
        menuTyPattern = "(MNTY02|MNTY03|MNTY04|MNTY05|MNTY06)";
     }
     
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <title>메뉴</title>
</head>
<body>


<%


  if( !isEmpty(siteId) ) {

		Menu menu = new Menu();
		menu.setSiteId(siteId);

     List<Menu> menuList = menuService.selectMenuList(menu);

%>
	<table border="1">
	<thead>
	<tr>
		<th>메뉴번호</th>
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
       <td><%= menuList.get(i).getMenuNo() %></td>
       <td><%= menuList.get(i).getMenuNm() %></td>
       <td><%= naviPath %></td>
       <td><%= toTyNm(menuList.get(i).getMenuTy()) %></td>
       <td><%= toShow(menuList.get(i).getMenuShowAt()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getDeptCode()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getDeptNm()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getEmplCode()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getEmplNm()) %></td>
       <td><%= nullToEmpty(menuList.get(i).getEmplTelno()) %></td>
    </tr>
<%
            no++;
			}

		}

        if( 0 == no ) {

    %>
    <tr>
        <td colspan="10">검색 결과가 없습니다.</td>
    </tr>
    <%
            }

	%>
	</tbody>
	</table>

<%

  } else {
  }

%>

</body>
</html>