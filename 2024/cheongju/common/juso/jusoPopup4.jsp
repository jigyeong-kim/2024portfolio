<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<% 
	//request.setCharacterEncoding("UTF-8");  //�ѱ۱����� �ּ�����
	String inputYn = request.getParameter("inputYn"); 
	String roadFullAddr = request.getParameter("roadFullAddr"); 
	String roadAddrPart1 = request.getParameter("roadAddrPart1"); 
	String roadAddrPart2 = request.getParameter("roadAddrPart2"); 
	String engAddr = request.getParameter("engAddr"); 
	String jibunAddr = request.getParameter("jibunAddr"); 
	String zipNo = request.getParameter("zipNo"); 
	String addrDetail = request.getParameter("addrDetail"); 
	String admCd    = request.getParameter("admCd");
	String rnMgtSn = request.getParameter("rnMgtSn");
	String bdMgtSn  = request.getParameter("bdMgtSn");

	String fieldNm  = request.getParameter("fieldNm");
%>
</head>
<script language="javascript">
function init(){
	var url = location.href;
	var confmKey = "bnVsbDIwMTQxMTI2MTU1NDQ3";
	var inputYn= "<%=inputYn%>";
	if(inputYn != "Y"){
		document.form.confmKey.value = confmKey;
		document.form.returnUrl.value = url;
		document.form.action="http://www.juso.go.kr/addrlink/addrLinkUrl.do"; //���ͳݸ�
		//document.form.action="http://10.182.60.22/addrlink/addrLinkUrl.do"; //�������
		document.form.submit();
	}else{
		opener.jusoCallBack4("<%=fieldNm%>","(<%=zipNo%>) <%=roadAddrPart1%> <%=addrDetail%>");
		window.close();
	}
}
</script>
<body onload="init();">
	<form id="form" name="form" method="post">
		<input type="hidden" id="confmKey" name="confmKey" value=""/>
		<input type="hidden" id="returnUrl" name="returnUrl" value=""/>
	</form>
</body>
</html>