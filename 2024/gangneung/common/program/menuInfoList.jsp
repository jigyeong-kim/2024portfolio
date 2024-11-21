<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.MenuService" %>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.sit.mnu.service.Menu" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.StringUtil" %>
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
                    sbNavi.append(arrMenuInfo[1]);
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

    int menuInfoListCo = menuInfoList.size();

%>
{
"siteId" : "<%= siteId %>",
"menuInfoList" : [
{
    "menuNm" : "메인 페이지",
    "menuPath" : "메인 페이지",
    "menuUrl" : "/<%= siteId %>/index.do",
    "menuTy" : "MNTY02",
    "menuShowAt" : "true"
}
<%
    int co = 0;
    for( int i=0; i<menuInfoListCo; i++ ) {
        Menu menuInfo = menuInfoList.get(i);
        String menuTy = menuInfo.getMenuTy();
        if( null == menuTy ) continue;
        if( !"MNTY02".equals(menuTy) && !"MNTY03".equals(menuTy)
                && !"MNTY04".equals(menuTy) && !"MNTY05".equals(menuTy) && !"MNTY06".equals(menuTy) ) continue;
%>
,{
"menuNm" : "<%= menuInfo.getMenuNm() %>",
"menuPath" : "<%= getPath(menuInfo.getNavi()) %>",
"menuUrl" : "<%= menuInfo.getMenuUrl() %>",
"menuTy" : "<%= menuInfo.getMenuTy() %>",
"menuShowAt" : "<%= "Y".equals(menuInfo.getMenuShowAt()) ? "true" : "false" %>"
}
<%
        co++;
    }
%>
],
"menuInfoListCo" : <%= co %>
}