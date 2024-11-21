<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<style>
.true {background:url('/common/images/sub/btn_17037_01.gif') no-repeat; cursor: pointer; color:#fff; padding:5px 13px; border:0px; vertical-align: middle;}
.false {background:url('/common/images/sub/btn_17037_02.gif') no-repeat; cursor: pointer; padding:5px 13px; border:0px; vertical-align: middle;}
div .button {float:right;}
input {width:210px; margin:0px 0px 5px 35px;}
.indent {font-size:12px;}
</style>
<script type="text/javascript">
//<![CDATA[
	function checked(value){
		if(value == 'true'){
			opener.document.getElementById('post_aditfield1').value = document.getElementById('aditfield1').value;
			opener.document.getElementById('pwform').submit();
			window.close();
		}else{
			window.close();
		}
	}
//]]>
</script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>게시물 상세내용 조회</title>
</head>
<body>
<div style="width:500px; height:186px;">
	<img src="/common/images/sub/pop_17037_bg.gif" alt="게시물 상세정보 조회"  onclick="javascript:window.close();" /><br />
		<div style="border:1px solid #ccc; padding:20px 35px 50px;">
		<label for="aditfield1" style="font-size:18px; color:#1266c2; font-weight:600; vertical-align: middle;">관리자 비밀번호 입력</label><input type="password" name="aditfield1" id="aditfield1" value="" /><br />
		<p class="indent">※ 게시물 답변을 위한 관리자 비밀번호를 입력하세요.
		<div class="button">
		<button class="true" onclick="javascript:checked('true');" value="확인" >확인</button>
		<button class="false" onclick="javascript:checked('false');" value="취소">취소</button>
		</div>
		</div>

</div>
</body>
</html>