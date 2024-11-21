<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="kr.co.hanshinit.xwcms.cmm.util.StringUtil" %>
<%
	String noParam = StringUtil.nvl((String)request.getParameter("noParam"));
	if( !StringUtil.isEmpty(noParam) ) {
%>
<script type="text/javascript">
	$(function(){
		$('#contents').find('iframe').eq(0).attr('src',
			$('#contents').find('iframe').eq(0).attr('src')+'&noParam=<%= noParam %>');
	});
</script>
<%
	}
%>
<iframe title="입법예고연계 의 프레임" src="http://eminwon.cheongju.go.kr/emwp/jsp/ofr/OfrNotAncmtLSub.jsp?not_ancmt_se_code=03" style="width:720px; height:1000px;"></iframe>