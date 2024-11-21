<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%

	String encoding = "UTF-8";
	String siteId = (String)request.getParameter("siteId");
	String menuNo = (String)request.getParameter("menuNo");

%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<title>콘텐츠 가져오기</title>
	<script type="text/javascript" src="/common/js/jquery-1.11.1.min.js"></script>
	<script>
		function checkContents( menuNo ) {
			var line = $("#" + menuNo);
			if( "N" === line.attr("chk") ) {
				line.css("background-color", "#F1F1F1");
				line.attr("chk","Y");
			} else {
				line.css("background-color", "#FFF");
				line.attr("chk","N");
			}
			checkMenu();
		}
		function checkMenu() {
			var lineList = $("#contents table tbody tr"),
				i = 0, data = "";
			for( i=0; i<lineList.length; i++ ) {
				if( typeof(lineList.eq(i).attr("id")) === "undefined" ) continue;
				if( "Y" === lineList.eq(i).attr("chk") ) {
					data += lineList.eq(i).attr("id") + "|";
				}
			}
			
		}
		function saveMenu( siteId, data ) {
			var url = "./saveMenuCheck.jsp?siteId=" + siteId + "&data=" + data;
			$.ajax({
				type     : "GET",
				url      : url,
				cache    : false,
				error    : function( request, status, error ) { alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); },
				success  : saving
			});
		}
		function saving() {
			console.log("저장됨!")
		}
		var convertType = "0";
		function getContents(type) {
			convertType = type;
			var frm = $("#convertForm").serialize();
			$.ajax({
				type: "POST",
				url: "http://cop.hanshinit.co.kr/common/getContents.jsp",
				cache: false,
				data: frm,
				error: onError,
				success: onSuccess
			});
		}
		function onSuccess(data, status) {
			$("#cntntsCn").val(data);
			if( convertType === "0" ) {
				fn_previewContents();
			} else {
				var frm = $("#previewForm").serialize();
				$.ajax({
					type: "POST",
					url: "./saveContents.jsp",
					cache: false,
					data: frm,
					error: onError,
					success: function() {
						alert("저장완료!");
						parent.site.location.href = "/<%= siteId %>/sub.do?key=<%= menuNo %>";
					}
				});
			}
		}
		function onError(data, status) {
			alert("오류!");
		}
	 	function fn_previewContents() {
	 		$("#previewForm").submit();
	 	}
	</script>
</head>
<body>

<form id="previewForm" name="previewForm" action="/<%= siteId %>/previewContents.do" method="post" target="_blank">

	<input id="siteId" name="siteId" type="hidden" value="<%= siteId %>"/>
	<input id="menuNo" name="menuNo" type="hidden" value="<%= menuNo %>"/>
	<input type="hidden" id="cntntsCn" name="cntntsCn"/>

</form>

<form name="convertForm" id="convertForm" method="post" action="http://cop.hanshinit.co.kr/common/getContents.jsp" onsubmit="return getContents(this)">
<input type="hidden" name="type" value="url"/>
<table border="1">
<tr>
	<th><label for="url">URL</label></th>
	<td>
		<input type="text" name="url" id="url" style="width:500px" value=""/>
		<label for="encoding">인코딩</label>
		<select name="encoding" id="encoding">
			<option value="EUC-KR" <% if( "EUC-KR".equals(encoding) ) { %>selected="selected"<% } %>>EUC-KR</option>
			<option value="UTF-8" <% if( "UTF-8".equals(encoding) ) { %>selected="selected"<% } %>>UTF-8</option>
		</select>
	</td>
</tr>
<tr>
	<th><label for="selector">본문 셀렉터</label></th>
	<td colspan="2"><input type="text" name="selector" id="selector" style="width:500px" value="div #contents"/></td>
</tr>
<tr>
    <th>요소 제거</th>
    <td colspan="2">
        <input type="checkbox" name="removep" id="removep" value="Y"/><label for="removep">테이블에 P요소 제거</label>
        <input type="checkbox" name="removebr" id="removebr" value="Y"/><label for="removebr">테이블에 BR요소 제거</label>
    </td>
</tr>
<tr>
    <th>테이블 자간 공백 제거</th>
    <td colspan="2">
        <input type="checkbox" name="removeSpace" id="removeSpace" value="Y"/><label for="removeSpace">제거</label>
        <input type="text" name="removeSpaceSelector" placeholder="테이블 숫자 입력(0부터 시작), 쉼표로 구분하여 여러개 지정 가능" value="" style="width:360px"/>
        <input type="text" name="removeSpaceField" placeholder="필드 숫자 입력(0부터 시작), 쉼표로 구분하여 여러개 지정 가능" style="width:400px" value=""/>
    </td>
</tr>
</table>
<button type="button" onclick="getContents('0');">변환 미리보기</button>
<button type="button" onclick="getContents('1');">변환 후 저장</button>
</form>

</body>
</html>