//Main Visual
function mainVisual_slide(a) {

	var _this	= this,
		$item	   = $('.visual_list li'),
		$btns	   = $('.visual .btn_arrow button'),
		$btn_nums  = $('.visual .btn_number button'),
		_lens	= $item.length;
		_this.index		= 0;
		_this.next		= 0;
		_this.animated	= false;
		_this.interval	= null;
		_this.auto_play	= true;
		_this.time		= 5000; //시간

	_this.ani = function() {
		if (_this.animated) return;
		_this.animated  = true;
		$item.eq(_this.next).show();

		var btn_nums_off = $btn_nums.eq(_this.index);
			btn_nums_off.removeClass('active');
		var btn_nums_active = $btn_nums.eq(_this.next);
			btn_nums_active.addClass('active');

		$item.eq(_this.index).fadeOut(500, function() {
			$(this).removeClass('active');
			$item.eq(_this.next).addClass('active');
			_this.animated = false;
			_this.index = _this.next;
		});
	};
	_this.nextAni = function(index) {
		if(index == null) {
		  _this.next = _this.next+1;
		}
		else{
		  _this.next = index
		}
		//_this.next = index || _this.next+1;

		if (_this.next == _lens)
			_this.next = 0;
		_this.ani();
	};
	_this.auto = function() {
		_this.interval = setInterval(function() {
			_this.nextAni();
		}, _this.time);
	};
	_this.stop = function() {
		clearInterval(_this.interval);
		_this.interval = null;
	};

	$btn_nums.on('click', function() {
		_this.stop();
		var num_type = $(this).attr('class');
		num_type = num_type.replace('active','');
		var array_num = num_type.split("_");
		var slt_num = array_num[1]-1;

		if (slt_num == _lens) {
			slt_num = 0;
		}
		if (slt_num < 0) {
			slt_num = _lens-1;
		}
		_this.nextAni(slt_num);
		if (_this.auto_play)
			_this.auto();
	});

	$btns.on('click', function() {
		var type = $(this).attr('class');
		switch(type) {
			case "btn_prev" :
				_this.stop();
				var next = _this.index - 1;
				if (next < 0 ){
					next = _lens-1;
				}

				_this.nextAni(next);
				if (_this.auto_play)
					_this.auto();
				break;
			case "btn_next" :
				_this.stop();
				var next = _this.index + 1;
				if (next == _lens) {
					next = 0;
				}
				_this.nextAni(next);
				if (_this.auto_play)
					_this.auto();
				break;
			case "btn_pause" :
					console.log('a');
					_this.stop();
					_this.auto_play = false;
					$(this).attr('class',"btn_play").html("비주얼 롤링 재생");
			break;
			case "btn_play" :
					console.log('b');
					_this.auto();
					_this.auto_play = true;
					$(this).attr('class',"btn_pause").html("비주얼 롤링 정지");
				break;
		}
		return false;
	});
	_this.init = function( a ) {
		$item.eq(0).addClass('active');
		_this.auto_play = a || _this.auto_play;
		if (_this.auto_play) {
			_this.auto();
		}
	}
}

//popupzone
(function($){	
	$.fn.PopupZone = function(options) {
		var settings = {
			prevBtn : '',
			nextBtn : '',
			playBtn : '',
			waitingTime : ''
		};
		
		$.extend(settings, options);
		settings.areaDiv = this;
		settings.prevBtn = $(settings.prevBtn);
		settings.nextBtn = $(settings.nextBtn);
		settings.playBtn = $(settings.playBtn);
		
		settings.cnt = settings.areaDiv.find('li').length;		
		settings.waitingTime = parseInt(settings.waitingTime);
		settings.nowNum = 0;
		settings.moveFlag = true; 
		settings.moveType;
		settings.setTimeOut;
		var status=true;
		
		function emptySetting() {
			settings.areaDiv.find('.count').html(settings.nowNum+1);
			settings.areaDiv.find('.all').html(settings.cnt);
			settings.areaDiv.find('li').hide();
			//settings.areaDiv.find('img').hide();
		}
		function setRolling(aniFlag) {
			if(!settings.moveFlag){
				if(settings.moveType=="next" || settings.moveType == null){ 
					settings.nowNum++;
					if(settings.nowNum == settings.cnt) settings.nowNum = 0;
				} else if(settings.moveType=="prev") {
					settings.nowNum--;
					if(settings.nowNum < 0) settings.nowNum = (settings.cnt-1);
				}
			}			
			emptySetting();
			if( settings.cnt < 2 ) {
				aniFlag = true;
			}
			
			if(aniFlag) settings.areaDiv.find('li').eq(settings.nowNum).show();
			else settings.areaDiv.find('li').eq(settings.nowNum).fadeIn('normal');
			 // 기본 : aniFlag 설정 없으면 fade 효과 - 조정
			
			aniFlag = false;
			settings.moveFlag = false;
			if(status){
				if( settings.cnt > 1 ) {
					settings.setTimeOut= setTimeout(setRolling , settings.waitingTime);
				}
			}
		}
		function playRolling(){
			if(status){
				console.log('a')
				clearTimeout(settings.setTimeOut);
				settings.playBtn.attr('class',"btn_play").html("팝업 롤링 재생");
				status = false;
			}else{
				console.log('b')
				settings.playBtn.attr('class',"btn_pause").html("팝업 롤링 정지");
				status = true;
				setRolling();
			}
			return false;
		}
		function prevRolling(){
			clearTimeout(settings.setTimeOut);
			settings.moveType = "prev";
			setRolling();
			return false;
		}
		function nextRolling() {
			clearTimeout(settings.setTimeOut);
			settings.moveType = "next";
			setRolling();
			return false;
		}
		setRolling();
		settings.prevBtn.click(prevRolling);
		settings.nextBtn.click(nextRolling);
		settings.playBtn.click(playRolling);
		
	};

})(jQuery);

$(document).ready(function(){
	 $('.popup').PopupZone({
		prevBtn : '.popup_control .btn_prev',
		nextBtn : '.popup_control .btn_next',
		playBtn : '.popup_control .btn_pause',
		waitingTime : '3000'
	});
});


//소식 롤링
$(function() {
	var $newsIdx = 1;
	var $newsWidth =340;
	var $newsView =1;
	var $newsList = $('.news  ul.news_list');
	var $newsSize = $newsList.find('li').size();
	var $newsBtnPrev =  $('.news  .news_control  .btn_prev');
	var $newsBtnNext =  $('.news  .news_control  .btn_next');
	var $newsPst = 0;

	$newsBtnPrev.click(function() {
		if( $newsIdx > 1 ) {
				$newsPst = $newsPst + $newsWidth;
				$newsList.animate(  { left : $newsPst },  1000);
				$newsIdx--;
		} else {
			//alert('처음입니다.');
		}				
	});

	$newsBtnNext.click(function() {
		if(  $newsIdx <= $newsSize-$newsView ) {
				$newsPst = -$newsWidth * $newsIdx;
				$newsList.animate(  { left : $newsPst },  1000);
				$newsIdx++;
		} else {
			//alert('마지막입니다.');
		}
	});
});
