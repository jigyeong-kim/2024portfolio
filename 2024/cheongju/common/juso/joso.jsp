<script type="text/JavaScript" src="/www/js/jquery-1.11.1.min.js"></script>
<script language="javascript">
function getAddr(){
$.ajax({
	url :"http://www.juso.go.kr/addrlink/addrLinkApiJsonp.do"
,type:"post"
,data:$("#form").serialize()
,dataType:"jsonp"
,crossDomain:true
,success:function(xmlStr){
if(navigator.appName.indexOf("Microsoft") > -1){ //ie경우에만
var xmlData = new ActiveXObject("Microsoft.XMLDOM");
xmlData.loadXML(xmlStr.returnXml)
}else{
var xmlData = xmlStr.returnXml;
}
$("#list").html("");
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
function makeList(xmlStr){
var htmlStr = "";
htmlStr += "<table>";
$(xmlStr).find("juso").each(function(){
htmlStr += "<tr>";
htmlStr += "<td>"+$(this).find('roadAddr').text() +"</td>";
htmlStr += "<td>"+$(this).find('roadAddrPart1').text() +"</td>";
htmlStr += "<td>"+$(this).find('roadAddrPart2').text() +"</td>";
htmlStr += "<td>"+$(this).find('jibunAddr').text() +"</td>";
htmlStr += "<td>"+$(this).find('engAddr').text() +"</td>";
htmlStr += "<td>"+$(this).find('zipNo').text() +"</td>";
htmlStr += "<td>"+$(this).find('admCd').text() +"</td>";
htmlStr += "<td>"+$(this).find('rnMgtSn').text() +"</td>";
htmlStr += "<td>"+$(this).find('bdMgtSn').text() +"</td>";
htmlStr += "</tr>";
});
htmlStr += "</table>";
$("#list").html(htmlStr);
}

function enterSearch() {
var evt_code = (window.netscape) ? ev.which : event.keyCode;
if (evt_code == 13) {
event.keyCode = 0;
getAddr();
}
}
</script>
<body>
<form name="form" id="form" method="post">
<input type="hidden" name="currentPage" value="1"/>
<input type="hidden" name="countPerPage" value="10"/>
<input type="hidden" name="confmKey" id="confmKey" value="bnVsbDIwMTQxMTI2MTU1NDQ3"/>
검색어 : <input type="text" name="keyword"/>
</form>
<input type="button" onClick="getAddr();" value="검색"/>
<div id="list"></div>

</body>