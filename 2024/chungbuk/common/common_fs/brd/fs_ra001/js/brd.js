$(document).ready(function(){
	//faq
	var selectTarget = $('.selectbox select');
	
	selectTarget.on('blur', function(){
		$(this).parent().removeClass('focus');
	});

	selectTarget.change(function(){
		var select_name = $(this).children('option:selected').text();
		$(this).siblings('label').text(select_name);
	});

	//faq
	$(".faq_dl dd").hide();
	$(".faq_dl dt a").click(function(){
		$(this).parent().parent().find("dd").stop(true,false).slideToggle();
		$(this).parent().parent().find("dt").toggleClass("on");
	});

});