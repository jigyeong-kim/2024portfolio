<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="kr.co.hanshinit.xwcms.cmm.util.StringUtil" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>

<%
	
	Calendar currentCalendar = Calendar.getInstance();
	String strYear = Integer.toString(currentCalendar.get(Calendar.YEAR));
	
	String noParam = StringUtil.nvl((String)request.getParameter("noParam"));
	if( !StringUtil.isEmpty(noParam) ) {
%>
<script>
	$(function(){
		$('#contents').find('iframe').eq(0).attr('src',
			$('#contents').find('iframe').eq(0).attr('src')+'&noParam=<%= noParam %>');
	});
</script>
<%
	}
%>
<iframe title="청주시청 고시공고 프레임" src="https://eminwon.cheongju.go.kr/emwp/jsp/ofr/OfrNotAncmtLSub.jsp?not_ancmt_se_code=01,04,05&amp;yyyy=2018" style="width:720px; height:1000px;"></iframe>

<!-- 이전게시판URL-->
<ul class="site_link_box_btn">
    <li><a href="http://old.cheongju.go.kr/board/iframe/list.do?boardId=319&amp;categoryId=3" title="이전자료보기(청주시)" target="_blank" class="blue_btn"><span class="winicon">이전자료보기(청주시)</span></a></li>
</ul>


