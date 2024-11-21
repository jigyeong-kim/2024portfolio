function fn_getAjax( url, dataType, fnName) {
	$.ajax({
		cache      : false,
		type        : "GET",
		url           : url,
		dataType : dataType,
		error       : function( request, status, error ) { alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); },
		success   : fnName
	});
}

function fn_popWindow( url, name, style) {
	window.open(url, name, style);
}