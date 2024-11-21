$(function() {
//	$.datepick.setDefaults({useThemeRoller: true});
	$('#popupDatepickerStart').datepick();
	$('#popupDatepickerEnd').datepick();
	
	// 추가 : 이상재
	$('#contract').datepick();
	$('#receipt').datepick();
	$('#issue').datepick();
	$('#writeDay').datepick();
	
	$('#start_dt').datepick();
	$('#end_dt').datepick();

	$('#field12').datepick();
	
	$('#inlineDatepicker').datepick({onSelect: showDate});
});
function showDate(date) {
 alert('The date chosen is ' + date);
}
