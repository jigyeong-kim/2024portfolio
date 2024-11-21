<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- Google Map 사용 인증키를 googleMapKey에 삽입하세요 -->
<script type="text/javascript" src="http://ncpms.rda.go.kr/npmsAPI/api/openapiFore.jsp?googleMapKey=AIzaSyCAB7T0Uvnxtneb4l4_7qbD_syk01ZjM5o"></script>
<script type="text/javascript"> 
    npmsJ(document).ready(function() {
		//예측지도 Open API
        setNpmsOpenApiKey( "2013efab6225e54a68b9a3fa7b970051d3e8" );//국가농작물 병해충관리시스템에서 발급받은 인증키
        setNpmsOpenApiServiceCode( "SVC31" );//서비스코드 
        setNpmsOpenApiProxyUrl("http://www.cheongju.go.kr/common/farming/fore_ajax_callback.jsp");//Call Back URL : 제공하는 callBack 페이지를 서버에 배포후 해당 경로를 적용

		//예측지도 생성시 focus를 줄 지역을 셋팅
		setRegion( "청주시" , 9 ); // 위치 지정, 도단위는 8, 시군 단위는 9 , 지역명을 한글로 입력
		
		//예측지도 호출
        actionMapInfo( "defaultTag" ,"<%=request.getParameter("fore_pest_code")%>" , "<%=request.getParameter("fore_pest_ymd")%>");
    });
</script>
</head>
<body>	
	<!-- 예측지도가 생성될 태그(태그 id는 위 자바스크립트의 actionMapInfo 펑션과 일치해야 함) -->
	<div id="defaultTag"></div>
</body>
</html>