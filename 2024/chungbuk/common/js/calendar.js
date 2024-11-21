$(document).ready(function() { 
	var calIframeStr = "<div id=\"lWidget\" style=\"position:absolute;display:none;z-index:1000;\">";
	calIframeStr += "<iframe id=\"wWidget\" name=\"wWidget\" src=\"about:blank\" style=\"width:0;height:0;\" scrolling=\"no\" frameborder=\"0\" title=\"달력\"></iframe>";
	calIframeStr += "</div>";

	$('body').prepend(calIframeStr);
});




var objCal;
function getCalendar(objName, syear, smonth, str) {

	var id , name;
	if (str == null || str == undefined || str=="undefined"){
		str = "Widget";
	}
	id ="l" + str;
	name = "w" + str;
	var win = document.getElementsByName(name)[0];

	objCal = objName;

	with(document.getElementById(id)) {

		if(style.display == "block") {
			style.display = "none";
		} else {
			var left = getAbsLeft(objName)-2;
			var top = getAbsTop(objName) + 30;
			win.width = "244";
			win.height = "290";
			win.style.width= "244px";
			win.style.height= "290px";
			style.display = "block";
			$(document).ready(function() {

				if ( 460 > document.body.clientWidth) {
					var term = (document.body.clientWidth - win.width )/2;
					left =  term;
				}

			});
			style.left = left + "px";
			style.top = top + "px";
			if (syear == null || syear == undefined || syear == "undefined"){
				syear = '';
			}
			if (smonth == null || smonth == undefined || smonth == "undefined"){
				smonth = '';
			}
			self.eval(name).location.replace('/common/calendar.html?syear=' + syear + '&smonth=' + smonth);

		}
	}

}

function setDate(date,str) {
	var id ="";
	if (str == null || str == undefined || str=="undefined"){
		id="lWidget";
	}else{
		id ="l" + str;
	}
	objCal.value = date;
	document.getElementById(id).style.display="none";
}

function getAbsTop(obj) {
	return (obj.offsetParent==null)? 0 : obj.offsetTop+getAbsTop(obj.offsetParent);
}

function getAbsLeft(obj) {
	return (obj.offsetParent==null)? 0 : obj.offsetLeft+getAbsLeft(obj.offsetParent);
}

function findPos(obj) {
    var curLeft = curTop = 0;

    if (obj.offsetParent) {
         do {
             curLeft += obj.offsetLeft;
             curTop += obj.offsetTop;
         } while (obj = obj.offsetParent);
    }

    return {'left': curLeft, 'top': curTop};
}