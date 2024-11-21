<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.StringUtil" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.Menu" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuService" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="java.util.LinkedList" %>
<%@ page import="java.util.List" %>
<%!

    public String getPath(String path) {

        StringBuffer sbNavi = new StringBuffer("");
        if( !StringUtil.isEmpty(path) ) {
            String[] arrNavi = path.split("\\^");
            if( null != arrNavi ) {
                for( int j=0; j<arrNavi.length; j++ ) {
                    if( StringUtil.isEmpty(arrNavi[j]) ) continue;
                    String[] arrMenuInfo = arrNavi[j].split("\\|");
                    if( null == arrMenuInfo || arrMenuInfo.length < 2) continue;
                    if( !StringUtil.isEmpty(sbNavi.toString()) ) {
                        sbNavi.append(" > ");
                    }
                    sbNavi.append(arrMenuInfo[2]);
                }
            }
        }

        return sbNavi.toString();

    }

%>
<%

    String siteId = (String)request.getParameter("siteId");

    ServletContext servletContext = request.getSession().getServletContext();
    WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);

    MenuService menuService = (MenuService)wac.getBean("menuService");
    Menu menu = new Menu();
    menu.setSiteId(siteId);
    List<Menu> menuInfoList = menuService.selectMenuList(menu);

    List<Menu> menuList = new LinkedList<Menu>();
    int menuInfoListCo = menuInfoList.size();
    for( int i=0; i<menuInfoListCo; i++ ) {
        Menu menuInfo = menuInfoList.get(i);
        String menuTy = menuInfo.getMenuTy();
        if( null == menuTy ) continue;
        if( menuInfo.getMenuLevel() == 0 ) continue;
        menuList.add(menuInfo);
    }

%>
{
"siteId" : "<%= siteId %>",
"menuInfoList" : [
<%
    int co = 0;
    int menuListCo = menuList.size();
    for( int i=0; i<menuListCo; i++ ) {
        Menu menuInfo = menuList.get(i);
%>
<% if( i != 0 ) { %>,<% } %>{
"menuNo" : <%= menuInfo.getMenuNo() %>,
"menuNm" : "<%= menuInfo.getMenuNm() %>",
"menuPath" : "<%= getPath(menuInfo.getNavi()) %>",
"menuUrl" : "<%= menuInfo.getMenuUrl() %>",
"menuTy" : "<%= menuInfo.getMenuTy() %>",
"menuSortCode" : "<%= menuInfo.getMenuSortCode() %>",
"menuLevel" : <%= menuInfo.getMenuLevel() %>,
"menuShowAt" : "<%= "Y".equals(menuInfo.getMenuShowAt()) ? "true" : "false" %>"
}
<%
        co++;
    }
%>
],
"menuInfoListCo" : <%= co %>
}