<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	if( request.getMethod().equals("POST") ) {
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>주소검색 팝업창</title>
</head>
<body>
	<script type="javascript">
		alert("잘못된 접근 입니다.");
		window.history.back();
	</script>
</body>
</html>
<%
	} else {
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>주소검색 팝업창</title>
	<%
		request.setCharacterEncoding("UTF-8");  //한글깨지면 주석제거
		//request.setCharacterEncoding("EUC-KR");  //해당시스템의 인코딩타입이 EUC-KR일경우에
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
	%>
</head>
<script language="javascript">
	function init(){
		var url = location.href;
		var confmKey = "U01TX0FVVEgyMDE2MDkwNDExNDMxODE1MDYz";

		var inputYn= "<%=inputYn%>";
		if(inputYn != "Y"){
			document.form.confmKey.value = confmKey;
			document.form.returnUrl.value = url;
			document.form.action="https://www.juso.go.kr/addrlink/addrLinkUrl.do"; //인터넷망
			document.form.submit();
		}else{
			opener.jusoCallBack("<%=roadFullAddr%>","<%=roadAddrPart1%>","<%=addrDetail%>","<%=roadAddrPart2%>","<%=engAddr%>","<%=jibunAddr%>","<%=zipNo%>", "<%=admCd%>", "<%=rnMgtSn%>", "<%=bdMgtSn%>");
			window.close();
		}
	}
</script>
<body onload="init();">
<form id="form" name="form" method="post">
	<input type="hidden" id="confmKey" name="confmKey" value=""/>
	<input type="hidden" id="returnUrl" name="returnUrl" value=""/>
	<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 START-->
	<!--
    <input type="hidden" id="encodingType" name="encodingType" value="EUC-KR"/>
     -->
	<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 END-->
</form>
</body>
</html>
<%
	}
%>