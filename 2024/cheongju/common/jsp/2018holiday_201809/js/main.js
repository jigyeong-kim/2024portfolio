$(function (){
	var head_h=$('#header').innerHeight(),
		top_height=300,
		col_total=$('.sub_cont').length,
		col_item=new Array;
	for(i=0;i<col_total;i++){
		col_item[i]=$('.sub_cont').eq(i).offset();
	};
	$('.menu_sub li').eq(0).find('a').addClass('on');

	$('.menu_sub a').on('click',function(){
		var here_num=$(this).parents('li').index();		
		$('html,body').animate({scrollTop:$('.sub_cont').eq(here_num).offset().top-top_height},600);
	});
	
	$(window).scroll(function(){
		var x=$(this).scrollTop(),
				header_move=$('.menu_sub').offset(),
				body_class=$('body').attr('class');
		if(x>header_move.top-30){
			if(body_class!='web_move'){
				$('body').addClass('web_move');
			};
			for (var i=0;i<col_total;i++){
				if($('.sub_cont').eq(i).offset().top-170-$('.menu_sub').height()<$(window).scrollTop()){
					$('.tap_menu').find('li').removeClass('on');
					$('.tap_menu li').eq(i).addClass('on');
				};			
			};
		}else{
			if(body_class=='web_move'){
				$('body').removeClass('web_move');
			};
			$('.tap_menu').find('li').removeClass('on');
		};
		
	});
	
});