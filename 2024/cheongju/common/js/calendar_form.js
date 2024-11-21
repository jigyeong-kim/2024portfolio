$(document).ready(function() { 
	var calIframeStr = "<div id=\"lWidget\" style=\"position:absolute;display:none;z-index:1000;\">";
	calIframeStr += "<iframe id=\"wWidget\" name=\"wWidget\" src=\"about:blank\" style=\"width:0;height:0;\" scrolling=\"no\" frameborder=\"0\" title=\"달력\"></iframe>";
	calIframeStr += "</div>";

	$('body').prepend(calIframeStr);
});




var objCal;
function getCalendar(event, objName, syear, smonth, str) {
	var id,
		name,
		inputYear = parseInt(objName.value.substring(0, 4), 10),
		inputMonth = parseInt(objName.value.substring(5, 7), 10),
		inputDay = parseInt(objName.value.substring(8, 10), 10);

	//유효성 검사
	if(!objName.value.match(/^\d{4}-\d{2}-\d{2}$/) || inputMonth > 12) {
		objName.value = "";
		inputYear = "";
		inputMonth = "";
		inputDay = "";
	}

	if(!str) {
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
			
			//매개변수가 공백이면
			if(!syear) {
				syear = '';
			}
			
			//value값이 있으면
			if(inputYear) {
				syear = inputYear;
			}
			
			//매개변수가 공백이면
			if(!smonth) {
				smonth = '';
			}

			//value값이 있으면
			if(inputMonth) {
				smonth = inputMonth;
			}

			self.eval(name).location.replace('/common/calendar.html?syear=' + syear + '&smonth=' + smonth);

			//iframe 로드후
			$("#" + name).load(function() {
				var $this = $(this),
					$iframeContents = $this.contents(),
					$td = $iframeContents.find("td"),
					$day = $iframeContents.find("a"),
					$next = $iframeContents.find("#month_next"),
					$prev = $iframeContents.find("#month_prev"),
					$yearWrap = $iframeContents.find(".year_wrap"),
					yearWrapText = $yearWrap.text(),
					calendarYear = parseInt(yearWrapText.substring(0, 4), 10),
					calednarMonth = parseInt(yearWrapText.substring(6, 8), 10);
				
				function active() {
					if(inputYear == calendarYear && inputMonth == calednarMonth) {
						$td.removeClass("active");
						$td.eq($td.length - $day.length + inputDay - 1).addClass("active");
					}
				}
				
				active();

				//갱신
				function renewal() {
					$iframeContents = $this.contents();
					$td = $iframeContents.find("td");
					$next = $iframeContents.find("#month_next");
					$next.on("click", renewal);
					$prev = $iframeContents.find("#month_prev");
					$prev.on("click", renewal);
					$day = $iframeContents.find("a");
					$yearWrap = $iframeContents.find(".year_wrap");
					yearWrapText = $yearWrap.text();
					calendarYear = parseInt(yearWrapText.substring(0, 4), 10);
					calednarMonth = parseInt(yearWrapText.substring(6, 8), 10);
					active();
				}

				$next.on("click", renewal);
				$prev.on("click", renewal);
			});
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