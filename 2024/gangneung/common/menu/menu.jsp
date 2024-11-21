<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>NeoCMS Administrator</title>
<script>
	function fn_refresh() {
	console.log("111");
	console.log(document.readyState);
		if(document.readyState == "complete") {
			console.log("새로고침");
		}
	}
</script>
</head>
<frameset cols="300,*" border="0">
	<frame name="menuList" src="./menuList.jsp?siteId=www&menuTy=MNTY02" style="border-left:solid 2px #A8C6EB" scrolling="auto" marginwidth="10" marginheight="10"/>
	<frame name="contentsFrame" src="" style="border-left:solid 2px #A8C6EB" scrolling="auto" marginwidth="0" marginheight="0"/>
</frameset> 
<body onload="fn_refresh()">
frame 지원 브라우저 필요함
</body>
</html>