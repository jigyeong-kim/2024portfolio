// <!-- <![CDATA[

// Project: Dynamic Date Selector (DtTvB) - 2006-03-16
// Script featured on JavaScript Kit- http://www.javascriptkit.com
// Code begin...
// Set the initial date.
var ds_i_date = new Date();
ds_c_month = ds_i_date.getMonth() + 1;
ds_c_year = ds_i_date.getFullYear();

// Get Element By Id
function ds_getel(id) {
	return document.getElementById(id);
}

var leftDepth = 100;
var topDepth = 100;

// Get the left and the top of the element.
function ds_getleft(el) {
	var tmp = el.offsetLeft;
	el = el.offsetParent;
	var i=0;
	while(el) {
		if( i == leftDepth ) break;
		tmp += el.offsetLeft;
		el = el.offsetParent;
		i++;
	}
	return tmp;
}
function ds_gettop(el) {
	var tmp = el.offsetTop;
	el = el.offsetParent;
	var i=0;
	while(el) {
		if( i == topDepth ) break;
		tmp += el.offsetTop;
		el = el.offsetParent;
		i++;
	}
	return tmp;
}

// Output Element
var ds_oe = ds_getel('ds_calclass');
// Container
var ds_ce = ds_getel('ds_conclass');

// Output Buffering
var ds_ob = ''; 
function ds_ob_clean() {
	ds_ob = '';
}
function ds_ob_flush() {

	ds_oe.innerHTML = ds_ob;
	ds_ob_clean();
}
function ds_echo(t) {
	ds_ob += t;
}

var ds_element; // Text Element...

var ds_monthnames = [
'1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월','1월'
]; // You can translate it for your language.

var ds_daynames = [
'<font color=#B42020>일</font>', '월', '화', '수', '목', '금', '<font color=#2B87D6>토</font>'
]; // You can translate it for your language.

// Calendar template
function ds_template_main_above(t) {
/*	return '<table cellpadding="0" cellspacing="1" border="0" class="ds_tbl">'
	     + '<tr>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_py();">&lt;&lt;</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_pm();">&lt;</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_hi();" colspan="3">[Close]</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_nm();">&gt;</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_ny();">&gt;&gt;</td>'
		 + '</tr>'
	     + '<tr>'
		 + '<td colspan="7" class="ds_head">' + t + '</td>'
		 + '</tr>'
		 + '<tr>';

	return ''
		 + '<table border="0" cellpadding="0" cellspacing="0" align="center" style="border:solid 1px #F1F1F1">'
		 + '<tr height="24">'
		 + '<td width="20px" align="right"><a href="javascript:" onclick="ds_py();"><img src="/images/btn_year_pre.gif" border="0"></a></td>'
		 + '<td width="20px" align="right"><a href="javascript:" onclick="ds_pm();"><img src="/images/btn_month_pre.gif" border="0"></a></td>'
		 + '<td style="padding:0,10,0,10; font-size:9pt;" align="center">' + t + '</td>'
		 + '<td width="20px" align="left"><a href="javascript:" onclick="ds_nm();"><img src="/images/btn_month_next.gif" border="0"></a></td>'
		 + '<td width="20px" align="left"><a href="javascript:" onclick="ds_ny();"><img src="/images/btn_year_next.gif" border="0"></a></td>'
		 + '</tr>'
		 + '<tr>'
		 + '<td colspan="5" style="padding:0,4,4,3">'
		 + '<table border="0" cellpadding="0" cellspacing="0">'
		 + '<tr>'
		 + '<td colspan="7" bgcolor="#0058BA"></td>'
		 + '</tr>';
*/
	return ''
		 + '<table border="0" cellpadding="0" cellspacing="1" style="border:solid 1px #CCCCCC; width:200px; background-color:#F1F1F1">'
		 + '<tr><td>'
		 + '<table border="0" cellpadding="0" cellspacing="0" style="width:100%; background-color:#FFFFFF">'
		 + '<tr height="24"><td>'
		 + '<table border="0" cellpadding="0" cellspacing="0" style="margin-top:3px; margin-left:10px">'
		 + '<tr>'
		 + '<td width="163px" style="font-size:12px;">'
		 + '<a href="javascript:" onclick="ds_py();"><img src="/common/images/calendar/btn_first.gif" alt="이전년도" style="vertical-align:middle"/></a> '
		 + '<a href="javascript:" onclick="ds_pm();"><img src="/common/images/calendar/btn_prev.gif" alt="이전달" style="vertical-align:middle"/></a> '
		 + '&nbsp;&nbsp;' + t + '&nbsp;&nbsp;'
		 + '<a href="javascript:" onclick="ds_nm();"><img src="/common/images/calendar/btn_next.gif" alt="다음달" style="vertical-align:middle"/></a> '
		 + '<a href="javascript:" onclick="ds_ny();"><img src="/common/images/calendar/btn_last.gif" alt="다음년도" style="vertical-align:middle"/></a>'
		 + '</td>'
		 + '<td><img src="/common/images/calendar/btn_calendar_c.gif" alt="달력선택취소" onclick="ds_hi();" style="cursor:pointer"/></td>'
		 + '</tr>'
		 + '</table>'
		 + '</td></tr>'
		 + '<tr><td style="padding:5px" align="center">'
		 + '<table border="1" cellpadding="0" cellspacing="1" width="100%">'
		 + '<tr height="22">';

}

function ds_template_day_row(t, width) {
//	return '<td width="23px" align="center" height="25" bgcolor="#E5EEF8" style="font-size:9pt">' + t + '</td>';
	// Define width in CSS, XHTML 1.0 Strict doesn't have width property for it.
	return '<td align="right" style="width:' + width + '">' + t + '</td>';
}

function ds_template_new_week() {
//	return '</tr><tr align="center">';
	return '<td width="5px"></td></tr><tr height="20">';
}

function ds_template_blank_cell(colspan) {
	//return '<td colspan="' + colspan + '"></td>'
	return '<td colspan="' + colspan + '"></td>';
}

function ds_template_day(d, m, y, DayColor, DayWidth) {
	return '<td style="width:' + DayWidth + '; cursor:pointer; color:'+ DayColor +'" onclick="ds_onclick(' + d + ',' + m + ',' + y + ')" style="font-size:9pt; text-align:right;" align="right">' + d + '</td>';
	// Define width the day row.
}

function ds_template_main_below() {
/*
	return '</tr>'
	     + '</table>';

	return '</tr>'
		 + '<td colspan="7" bgcolor="#0058BA"></td>'
	     + '<tr><td colspan="7" align="right" style="cursor: pointer; padding-top:2px" onclick="ds_hi();" style="font-size:9pt">닫기</td></tr>'
	     + '</table>'
	     + '</td>'
	     + '</tr>'
	     + '</table>';
*/
	return ''
		 + '</tr>'
		 + '</table>'
		 + '</td></tr>'
		 + '</table>'
		 + '</td></tr>'
		 + '</table>';

}

// This one draws calendar...
function ds_draw_calendar(m, y) {
	// First clean the output buffer.
	ds_ob_clean();
	// Here we go, do the header
	ds_echo (ds_template_main_above(y + '년 ' + ds_monthnames[m - 1]));
	for (var i = 0; i < 7; i ++) {
		var dayWidth = '';
		if( i == 0 ) {
			dayWidth = '18px';
		} else if( j == 6 ) {
			dayWidth = '23px';
		} else {
			dayWidth = '23px';
		}
		ds_echo (ds_template_day_row(ds_daynames[i], dayWidth));
	}
	ds_echo('<td width="5px"></td>');
	ds_echo('</tr><tr height="1"><td colspan="8" style="background-color:#9BC3DD"></td></tr><tr height="5"><td colspan="7"></td>');
		
	var tempmonth = m-1;
	// Make a date object.
	var ds_dc_date = new Date();
	ds_dc_date.setMonth(m - 1);
	ds_dc_date.setFullYear(y);
	ds_dc_date.setDate(1);
	ds_dc_date = new Date(y,tempmonth,1);
	if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
		days = 31;
	} else if (m == 4 || m == 6 || m == 9 || m == 11) {
		days = 30;
	} else {
		days = (y % 4 == 0) ? 29 : 28;
	}
	var first_day = ds_dc_date.getDay();
	var first_loop = 1;
	// Start the first week
	ds_echo (ds_template_new_week());
	// If sunday is not the first day of the month, make a blank cell...
	if (first_day != 0) {
		ds_echo (ds_template_blank_cell(first_day));
	}
	var j = first_day;
	for (i = 0; i < days; i ++) {
		// Today is sunday, make a new week.
		// If this sunday is the first day of the month,
		// we've made a new row for you already.
		if (j == 0 && !first_loop) {
			// New week!!
			ds_echo (ds_template_new_week());
		}
		// Make a row of that day!

		var dayColor = '';
		var dayWidth = '';
		
		if( j == 0 ) {
			dayColor = '#B42020';
			dayWidth = '18px';
		} else if( j == 6 ) {
			dayColor = '#2B87D6';
			dayWidth = '23px';
		} else {
			dayColor = '#000000';
			dayWidth = '23px';
		}

		ds_echo (ds_template_day(i + 1, m, y, dayColor,dayWidth));

		// This is not first loop anymore...
		first_loop = 0;
		// What is the next day?
		j ++;
		j %= 7;
	}
	// Do the footer
	ds_echo (ds_template_main_below());
	// And let's display..
	ds_ob_flush();
	// Scroll it into view.
	//ds_ce.scrollIntoView();
}

// A function to show the calendar.
// When user click on the date, it will set the content of t.
function ds_sh(t, ldepth, tdepth) {

	leftDepth = ldepth;
	topDepth = tdepth;
	
	// Set the element to set...
	ds_element = t;
	// Make a new date, and set the current month and year.

	if( t.value != '' ) {

		var tempdate = t.value;
		var cdate = tempdate.split('-');
		ds_c_month = cdate[1];
		ds_c_year = cdate[0];

	} else {

		var ds_sh_date = new Date();
		ds_c_month = ds_sh_date.getMonth() + 1;
		ds_c_year = ds_sh_date.getFullYear();

	}

	// Draw the calendar
	ds_draw_calendar(ds_c_month, ds_c_year);
	// To change the position properly, we must show it first.
	ds_ce.style.display = '';
	// Move the calendar container!
	the_left = ds_getleft(t);
	the_top = ds_gettop(t) + t.offsetHeight;

	ds_ce.style.left = the_left + 'px';
	ds_ce.style.top = the_top + 'px';
	// Scroll it into view.
//	ds_ce.scrollIntoView();
}

// Hide the calendar.
function ds_hi() {
	ds_ce.style.display = 'none';
}

// Moves to the next month...
function ds_nm() {
	// Increase the current month.
	ds_c_month ++;
	// We have passed December, let's go to the next year.
	// Increase the current year, and set the current month to January.
	if (ds_c_month > 12) {
		ds_c_month = 1; 
		ds_c_year++;
	}
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Moves to the previous month...
function ds_pm() {
	ds_c_month = ds_c_month - 1; // Can't use dash-dash here, it will make the page invalid.
	// We have passed January, let's go back to the previous year.
	// Decrease the current year, and set the current month to December.
	if (ds_c_month < 1) {
		ds_c_month = 12; 
		ds_c_year = ds_c_year - 1; // Can't use dash-dash here, it will make the page invalid.
	}
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Moves to the next year...
function ds_ny() {
	// Increase the current year.
	ds_c_year++;
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Moves to the previous year...
function ds_py() {
	// Decrease the current year.
	ds_c_year = ds_c_year - 1; // Can't use dash-dash here, it will make the page invalid.
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Format the date to output.
function ds_format_date(d, m, y) {
	// 2 digits month.
	m2 = '00' + m;
	m2 = m2.substr(m2.length - 2);
	// 2 digits day.
	d2 = '00' + d;
	d2 = d2.substr(d2.length - 2);
	// YYYY-MM-DD
	return y + '-' + m2 + '-' + d2;
}

// When the user clicks the day.
function ds_onclick(d, m, y) {
	// Hide the calendar.

	//	var stime = dd1.getTime();
//	var etime = dd2.getTime();

//	var gap_date = ( etime - stime ) / ( 1000 * 60 * 60 * 24 );
//	gap_date = Math.round(gap_date);

//	if (gap_date < 0)
//	{

//}
		
	ds_hi();
	// Set the value of it, if we can.
	if (typeof(ds_element.value) != 'undefined') {
		ds_element.value = ds_format_date(d, m, y);
	// Maybe we want to set the HTML in it.
	} else if (typeof(ds_element.innerHTML) != 'undefined') {
		ds_element.innerHTML = ds_format_date(d, m, y);
	// I don't know how should we display it, just alert it to user.
	} else {
		alert (ds_format_date(d, m, y));
	}
}

// And here is the end.

// ]]> -->