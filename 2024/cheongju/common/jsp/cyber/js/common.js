jQuery(function($){
	//lnb
	$('#lnb .depth1 a.tit').on('click',function(){
		$target=$(this).parents('.depth1').index();
	
		$('.pop_box').removeClass('show').fadeOut();
		$('#container .cont_box').removeClass('show');
		if($target!=0){
			if($target<4){
				var num=$target-1;				
				$('#container .col_box').eq(num).find('.cont_box').addClass('show');
			};			
		};
		$('#lnb .tit').removeClass('on').next('.depth2').slideUp();
		$(this).addClass('on').next('div').slideDown();
		return false;
	});

	$('#container .col_box .open').on('click',function(event){
		$target=$(event.target);
		$(this).parents('.col_box').find('.cont_box').addClass('show');
		return false;
	});
	$('#container .col_box .close').on('click',function(){
		$(this).parents('.cont_box').removeClass('show');
		return false;
	});

	$('#lnb .depth2 a').on('click',function(){
		$target=$(this).parents('.depth1').index();
		if($target==0){
			var num=$(this).parent('li').index();			
			$('#container .pop_box').removeClass('show').fadeOut('slow');
			$('#container .pop_box').eq(num).fadeIn('slow').addClass('show');
			return false;
		};
	});
	$('.pop01 .cont02 a,.pop01 .cont02 a >').on('click',function(event){
		var $target=$(this);
		var num='';
		if($target.is('a')){
			num = $target.index();
		}else{
			num = $target.parents('a').index();
		};	
		$('.pop_box').removeClass('show').fadeOut();
		$('#container .cont_box').removeClass('show');
		$('#container .col_box').eq(num).find('.cont_box').addClass('show');
		return false;
	});
	$('.btn_pop').on('click',function(event){
		var $target=$(event.target);

		$('#container .pop_box').removeClass('show').fadeOut('slow');
		if($target.is('.btn_pop02,.btn_pop02 >')){
			$('#container .pop_box').eq(2).fadeIn('slow').addClass('show');
		}else if($target.is('.btn_pop03,.btn_pop03 >')){
			$('#container .pop_box').eq(3).fadeIn('slow').addClass('show');
		};
		return false;
	});

	$('#container .pop_box .close').on('click',function(){
		$('.pop_box').removeClass('show').fadeOut('slow');
		return false;
	});
});