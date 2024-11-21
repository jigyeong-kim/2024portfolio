<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<title>주소검색</title>
<%
	String chk = (String)request.getParameter("chk");
	if( chk == null ) chk = "";
%>

<script  type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript">
//<![CDATA[
 $(document).ready(function(){
     $("#srch_se").change(function(){
      $("span[id^='txt_']").hide();
      $("span[id='txt_"+$(this).val()+"']").show();
  });

  $("#zipTable").on("click",".font_blue",function(){

	//alert('a');
      var data = {
             "zip_code" : $(this).parents("tr").find(".zipCode").text(),
             "adres" : $(this).text()
         };

<%
	if( "2".equals(chk) ) {
%>
		window.opener.document.getElementById("zipcode").value = $(this).parents("tr").find(".zipCode").text();
		 window.opener.document.getElementById("address1").value = $(this).text();
		 window.opener.document.getElementById("address2").value = '';
<%
	} else {
%>
	 	 var post = $(this).parents("tr").find(".zipCode").text();
		 post = post.split("-");
		 window.opener.document.getElementById("post1").value = post[0];
		 window.opener.document.getElementById("post2").value = post[1];
		 window.opener.document.getElementById("add1").value = $(this).text();
		 window.opener.document.getElementById("add2").value = '';
<%
	}
%>

/*         if (opener) {
             opener.fnZipCodePopupCallBack(data);
             self.close();
         }
*/
	 window.close();
	 });

 });


 $(document).ready(function(){
     $("#srch_se").change(function(){
      $("span[id^='txt_']").hide();
      $("span[id='txt_"+$(this).val()+"']").show();
  });

  $("#zipTable").on("click",".font_blue",function(){

      var data = {
             "zip_code" : $(this).parents("tr").find(".zipCode").text(),
             "adres" : $(this).text()
         };

         if (opener) {
             opener.fnZipCodePopupCallBack(data);
             self.close();
         }
     });
 });

function makeList(xmlStr){
	var htmlStr = "";
  	$(xmlStr).find("juso").each(function(idx){
		appendHtml =
		'<tr class="bg'+(idx%2+1)+'">'
			+'<td class="zipCode">'+$(this).find("zipNo").text()+'</td>'
			+'<td><a href="#n" class="font_blue">'+$(this).find("roadAddr").text()+'</div></a><div>'+$(this).find("jibunAddr").text()+'</td>'
		+'</tr>';
		$("#zipBody").append(appendHtml);
	});
 }

function getAddr(){
  $("#zipTable").show();
	$.ajax({
		 //url :"http://10.182.60.22/addrlink/addrLinkApiJsonp.do"  //행정망
		 url :"http://www.juso.go.kr/addrlink/addrLinkApiJsonp.do"  //인터넷망
		,type:"post"
		,data:$("#form").serialize()
		,dataType:"jsonp"
		,crossDomain:true
		,success:function(xmlStr){
			if(navigator.appName.indexOf("Microsoft") > -1){
				var xmlData = new ActiveXObject("Microsoft.XMLDOM");
				xmlData.loadXML(xmlStr.returnXml)
			}else{
				var xmlData = xmlStr.returnXml;
			}
			$("#zipBody").html("");
			var errCode = $(xmlData).find("errorCode").text();
			var errDesc = $(xmlData).find("errorMessage").text();
			if(errCode != "0"){
				alert(errCode+"="+errDesc);
			}else{
				if(xmlStr != null){
					makeList(xmlData);
				}
			}
		}
	    ,error: function(xhr,status, error){
	    	alert("에러발생");
	    }
	});
}


 //]]>
</script>
<link href="/common/doro/base.css" type="text/css" rel="stylesheet"  />
<style type="text/css">
<!--
div#pop_wrap02{ width:100%; position:relative; }

div#pop_content{
	padding:12px 27px;
	display:inline-block;
}

p.adrTit{
	width:100%; height:34px;
	background:#5b89d6;
}

p.adrTit span{
	width:56px; height:16px;
	padding:8px 0 0 14px;
	display:inline-block;
}

div.bdr_gray_box{ display:inline-block; }

ul.adrList{ width:100%; }

ul.adrList li{
	padding:0 0 10px 11px;
	background:url(/common/doro/adrBul.gif) 0 5px no-repeat;
}

ul.adrList li label{ padding-right:7px;  }
ul.adrList li input.inputText{ height:20px; padding:0; }
ul.adrList li select.srch_se{ height:20px; }

div.font_11{
	padding:13px 0 0 12px;
	border:1px solid #dbdbdb;
	background:#f4f4f4;
}

div.font_11 span{
	width:100%; padding-bottom:20px;
	display:inline-block;
}

.colorB,.colorB a{ color:#1f4ead; }

div.adrTb{
	width:100%; margin-top:30px;
	border-top:2px solid #666;
}

div.adrTb table{ width:100%; }

div.adrTb table th{
	padding:11px 0 9px;
	background:#f8f8f8;
	color:#1f4ead; font-weight:bold;
	border-bottom:1px solid #d6d6d6;
}

div.adrTb table td{
	padding:11px 0 9px;
	border-bottom:1px solid #d6d6d6;
}

div.adrTb table td.zipCode{
	padding: 0 5px;
	text-align:center;
	border-right:1px solid #d6d6d6;
}

div.adrTb table td a{
	padding-left:10px;
	display:inline-block;
}

div.pd_t_20{
	width:36px; padding:7px 5px;
	text-align:center;
	position:absolute; top:0; right:0;
}

div.pd_t_20 a{ color:#fff; font-weight:bold; }

//-->
</style>
</head>
<body>
<form name="form" id="form" method="post" onsubmit="javascript:getAddr(); return false;">
<div id="pop_wrap02">
    <p class="adrTit"><span><img src="/common/doro/adrTit.gif" alt="주소검색"/></span></p>
	<div id="pop_content">
    <div class="bdr_gray_box">
        <ul class="adrList">
			<!--
			<li>
				<label for="srch_se"><img src="/common/doro/adrTxt1.gif" alt="검색구분"/></label>
				<select id="srch_se" class="input_select" style="width:180px;"  title="주소 검색 구분 선택">
					<option value="road">도로명+건물번호</option>
					<option value="dong">동(읍/면/리)명+지번</option>
					<option value="oldpost">구 지번</option>
				</select>
			</li>
			-->
			<li>
				<input type="hidden" name="confmKey" id="confmKey" style="width:250px;" value="bnVsbDIwMTQxMTI2MTU1NDQ3"/>
				<input type="hidden" name="currentPage" value="1"/>
				<input type="hidden" name="countPerPage" value="10"/>
				<label for="keyword"><img src="/common/doro/adrTxt2.gif" alt="검색어"/></label>
				<input type="text" name="keyword" id="keyword" class="inputText" style="width:180px;" title="주소 검색 단어 입력"/>
				<span class="btn_23"><a href="#none" onclick="getAddr();"><img src="/common/doro/adrBtn.gif" alt="검색"/></a></span>
			</li>
        </ul>
      </div>
                <div class="pd_5"></div>
                <div class="bdr_gray_box font_11">
                    <span id="txt_road">* 검색방법 : 도로명(~로.~길)+건물번호<br/>
                          ☞"<b>경기도 수원시 장안구 조원로 18 XXX</b>"일 경우<br/>
                          예)도로명 건물번호 => <b>조원로 18</b>
                    </span>
                    <span id="txt_dong" style="display: none;">* 검색방법 : 동(읍/면/리)명+지번<br/>
                          ☞"<b>경기도 수원시 장안구 조원동 495 XXX</b>"일 경우<br/>
                          예)동명 번지 => <b>조원동 495</b>
                    </span>
                    <span id="txt_oldpost" style="display: none;">* 검색방법 : 구 지번 (읍/면/동/건물명 등 검색어 입력)<br/>
                          ☞"<b>서울특별시 강남구 대치2동 은마아파트 1~13동</b>"일 경우<br/>
                          예)읍/면/동/건물명 => <b>은마아파트</b>
                    </span>
                    <span>※ 도로명주소가 검색되지 않는 경우는<br/>
                    <strong class="colorB">행정안전부 새주소 안내시스템(<a href="http://juso.go.kr" target="_blank" title="새창으로 열림">http://juso.go.kr</a>)</strong>에서 확인 하시기 바랍니다.
                    </span>
                </div>
                <div class="pd_10"></div>
                <div class="adrTb" style="width:100%; height:370px; overflow:auto;">
                <table id="zipTable" border="0" cellspacing="0" class="boardList" summary="검색결과로 우편번호 주소 안내">
				<caption>주소검색결과</caption>
                    <thead>
                        <tr>
                            <th scope="col">우편번호</th>
                            <th scope="col">주소</th>
                        </tr>
                    </thead>
                    <tbody id="zipBody">
                    </tbody>
                </table>
                </div>

    <div class="pd_t_20 txt_r"><span class="btn strong"><a href="#none" onclick="self.close();">닫기</a></span></div>
    </div>
</div>
</form>
</body>
</html>