;(function($){
    $.fn.photo_slide=function(options){
        var opts=$.extend({},$.fn.photo_slide.defaults,options);
        return this.each(function(){
    var slide_boxs=opts.slide_box,
				slide_box=$(slide_boxs),
        viewer_area=slide_box.find('.viewer_area'),
        viewer_w=viewer_area.width(),
        viewer_h=viewer_area.height(),
        item=viewer_area.find('li'),
        items=new Array,
        total_leng=item.length,
        item_total=total_leng-1,
        buttons_area=slide_box.find('.buttons_area'),
        buttons=buttons_area.find('a'),
        thumb_presence=slide_box.find('div').hasClass('thumb_area'),
        thumb_area=slide_box.find('.thumb_area'),
        cnt=opts.first,//처음 선택 될 이미지(첫번째 이미지 일 경우 0)
        next=cnt+1,
        prev=cnt-1,
        auto_play=opts.auto_play,//재생 설정 (true,false)
        auto_btn='',
				onoff='',
        auto_speed=4000,//자동 재생 속도
        item_speed=450,//슬라이드 속도 제어
        thumb=thumb_area.find('li'),
        thumb_img_on='';
        thumb.eq(cnt).find('a').addClass('on');
		setting();
    auto(auto_play);

function setting(){//초기 세팅
    item.css({left:'1000%'});
    item.eq(cnt).addClass('active').css('left',0);
};
function img_on(on){//썸네일 변경
    if(thumb_presence==true){
        var img_on=on,
						box_pos=(img_on+1)/4,
						box_po=Math.ceil(box_pos);
        thumb.eq(img_on).find('a').addClass('on');
				thumb_area.find('ul').animate({'top':-(viewer_h+8)*(box_po-1)},'fast');
    };
};
function reset(){//슬라이드 전 초기화
    if(thumb_presence==true){
        thumb.find('a').removeClass('on');
    };
    viewer_w=viewer_area.width();
    item.removeClass('active');
};
function cnt_controll(){//순서 조정
	prev=cnt-1,
	next=cnt+1;
	if(cnt==item_total){
		next=0;
	}else if(cnt>item_total){
		cnt=0,
		prev=item_total,
		next=cnt+1;
	}else if(cnt==0){
		prev=item_total;
	}else if(cnt<0){
		cnt=item_total,
		prev=cnt-1;
	};
};
function auto(e){//재생 설정
    auto_play=e;
    if(auto_play==true){
        auto_button(true)
        onoff=setInterval(automatic,auto_speed);
    }else{
        auto_button();
        clearInterval(onoff);
    };
};
function automatic(){//자동 재생
	reset();
	cnt_controll();
	img_on(next);
	slide_next();
};
function auto_button(e){//재생 버튼 변경
    var plays=e,
        presence=buttons.hasClass('ctrl');
    if(presence==true){
        auto_btn=buttons_area.find('.ctrl').find('img')[0];
        if(plays==true){
            auto_btn.src=auto_btn.src.replace('_play','_stop');
            auto_btn.alt=auto_btn.alt.replace('재생','멈춤');
        }else{
            auto_btn.src=auto_btn.src.replace('_stop','_play');
            auto_btn.alt=auto_btn.alt.replace('멈춤','재생');
        };
    };
};
function slide_prev(){//이전 보기
    item.css({left:'1000%'});
    item.eq(cnt).css({left:0}).stop().animate({'left':viewer_w},item_speed);
    item.eq(prev).css({left:-viewer_w}).stop().animate({'left':0},item_speed).addClass('active');
    cnt--;
};
function slide_next(){//다음 보기
    item.css({left:'1000%'});
    item.eq(cnt).css({left:0}).stop().animate({'left':-viewer_w},item_speed);
    item.eq(next).css({left:viewer_w}).stop().animate({'left':0},item_speed).addClass('active');
    cnt++;
};
buttons.on('click',function(event){//이전, 다음 보기 버튼 클릭
    var $target=$(event.target);
    if(item.is(':animated')){
        return false;
    };
	if(total_leng!=1){
        if($target.is('.ctrl,.ctrl >')){
            var plays=auto_btn=buttons_area.find('.ctrl').find('img')[0].alt;
            if(plays=='재생'){
                auto(true);
            }else{
                auto();
            };
        }else{
            reset();
            cnt_controll();
            if($target.is('.prev,.prev >')){
                img_on(prev);
                slide_prev();
            }else{
                img_on(next);
                slide_next();
            };
            auto();
        };
	};
	return false;
});

thumb.on('click',function(event){//썸네일 버튼 클릭
    var $target=$(event.target),
        thumb_num=$(this).index(),
        thumb_cnt=viewer_area.find('.active').index();
    auto();
    if(item.is(':animated')){
        return false;
    };
    if(thumb_num!=thumb_cnt){
        reset();
        img_on(thumb_num);
        if(thumb_num<thumb_cnt){
            item.css({left:'1000%'});
            item.eq(thumb_cnt).css({left:0}).stop().animate({'left':viewer_w},item_speed);
            item.eq(thumb_num).css({left:-viewer_w}).stop().animate({'left':0},item_speed).addClass('active');
        }else{
            item.css({left:'1000%'});
            item.eq(thumb_cnt).css({left:0}).stop().animate({'left':-viewer_w},item_speed);
            item.eq(thumb_num).css({left:viewer_w}).stop().animate({'left':0},item_speed).addClass('active');
        };
        cnt=thumb_num;
    };
    return false;
});

Cont_width=$('#wrapper').width();
v_height=item.find('img').height();
if(Cont_width<=800){
	viewer_area.css('min-height',v_height);
};
$(window).resize(function(){
	Cont_width=$('#wrapper').width();
	v_height=item.find('img').height();
	if(Cont_width<=800){
		viewer_area.css('min-height',v_height);
	};
});

	    });
	};
    $.fn.photo_slide.defaults={'first':0,'auto_play':true,'slide_box':'.photo_slide'};
})(jQuery);




jQuery(function($) {
	$('.photo_slide').photo_slide({'first':0,'auto_play':false,'slide_box':'.photo_slide'});
});