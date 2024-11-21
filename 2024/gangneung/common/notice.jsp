<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.gosiNtt.service.GosiNtt" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.gosiNtt.service.GosiNttSearchVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.gosiNtt.service.GosiNttService" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="java.util.List" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.DateUtil" %>
<%@ page import="kr.co.hanshinit.NeoCMS.tag.pagination.NeoPaginationInfo" %>
<%

    ServletContext servletContext = request.getSession().getServletContext();
    WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);

    GosiNttService gosiNttService = (GosiNttService)wac.getBean("gosiNttService");

    int key = 263;
    int pageUnit = 20;
    String searchGosiSe = "01,04,06";

    // 페이징 처리
    GosiNttSearchVO gosiNttSearchVO = new GosiNttSearchVO();
    gosiNttSearchVO.setKey(key);
    gosiNttSearchVO.setPageUnit(pageUnit);
    gosiNttSearchVO.setSearchGosiSe(searchGosiSe);

    int totCnt = gosiNttService.selectGosiNttTotCnt(gosiNttSearchVO);
    NeoPaginationInfo neoPaginationInfo = gosiNttSearchVO.getNeoPaginationInfo(totCnt);

    // 목록 조회
    List<GosiNtt> gosiNttList = gosiNttService.selectGosiNttList(gosiNttSearchVO);

%>
{
    "title" : "고시/공고",
    "date" : "<%= DateUtil.getNowDateTime("yyyy-MM-dd HH:mm:ss")%>",
    "link" : "https://www.gn.go.kr/www/sub.do?key=263",
    "item" : [
<%
    int gosiNttListCnt = gosiNttList.size();
    for( int i=0; i<gosiNttListCnt; i++ ) {
        GosiNtt gosiNtt = gosiNttList.get(i);
%>
    <% if( i != 0 ) { %>,<% } %>{
            "title" : "<%= gosiNtt.getNttSj() %>",
            "link" : "https://www.gn.go.kr/www/selectGosiNttView.do?key=<%= key %>&searchGosiSe=<%= searchGosiSe %>&gosiNttNo=<%= gosiNtt.getGosiNttNo() %>",
            "creator" : "<%= gosiNtt.getDeptNm() %>",
            "date" : "<%= DateUtil.toDateFormat(gosiNtt.getRegistDe(), "yyyyMMdd", "yyyy-MM-dd") %>"
        }
<%
    }
%>
    ]
}