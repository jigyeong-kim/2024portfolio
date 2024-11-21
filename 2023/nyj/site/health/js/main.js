
'use strict';

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            var $window = $(window);
            $(function() {

                //여기서부터 코드 작성해주세요

                //스크롤 애니메이션 시작
                $(window).on('scroll', function(){
                    var scrollTop = $(window).scrollTop(),
                        winBottom = scrollTop + $(window).height(),
                        $section = $('.scroll_ani');
                    $section.each(function(){
                        var $this = $(this),
                            thisTop = $this.offset().top;
                        if(winBottom > (thisTop + 50)){
                            $this.attr('data-on', 'on');
                        }
                        if(winBottom < (thisTop - 50)){
                            $this.attr('data-on', 'off');
                        }
                    });
                });
                
                // 비주얼슬라이드
                
                var $visual_box = $('.visual_box'),
                    $visual_slide = $visual_box.find('.visual_list'),
                    $visual_control = $visual_box.find('.visual_control'),
                    $visual_arrow = $visual_box.find('.visual_arrow');

                $visual_slide.slick({
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    speed: 2000,
                    prevArrow : $visual_arrow.find('.prev_btn'),
                    nextArrow : $visual_arrow.find('.next_btn'),

                    //추가 기능
                    autoArrow : $visual_control.find('.auto'),
                    pauseText : '정지',
                    playText : '재생',

                    total : $visual_control.find('.total'),
                    current : $visual_control.find('.current'),
                    customState : function(state) {
                        //현재 슬라이드 위치가 10보다 작을 때
                        if(state.current < 10) {
                            state.current = '0' + state.current;
                        }
                        //슬라이드 갯수가 10보다 작을 때
                        if(state.total < 10) {
                            state.total = '0' + state.total;
                        }

                        return state;
                    }

                });

                // 비주얼 로딩 바
                $visual_slide.on('afterChange',function(){
                    $(".progress_bar .gage").addClass('pro-ani');
                });
                $visual_slide.on('beforeChange',function(){
                    $(".progress_bar .gage").removeClass('pro-ani');
                });


                // 공지사항 탭
                var $noticeTab = $('.notice_wrap'),
                    $noticeButton = $noticeTab.find('.notice_tab_btn'),
                    $noticeContent = $noticeTab.find('.notice_con');

                $noticeButton.click(function (e) {

                    var $this = $(this),
                        thisTitle = $this.text(),
                        index = parseInt($this.attr('data-index'));
                    if($this.attr('data-index')){
                        console.log(index)
                        $noticeButton.removeAttr('title').parent().removeAttr('title').removeClass("active");
                        $this.attr('title', '선택됨').parent().addClass("active").attr('title',thisTitle +' 열림');
                        $noticeContent.addClass("active").attr('title','열림');
                        $noticeContent.eq(index-1).addClass('active').siblings('.notice_con').removeClass('active').removeAttr('title');
                    }
                });
                $('.notice_tab .notice_tab_btn').on('click', function(){
                    var $this = $(this),
                        $MyParent = $this.parent('.notice_tab'),
                        ParentIndex = $MyParent.index(),
                        $MyCon = $('.notice_wrap').find('.notice_con').eq(ParentIndex),
                        $Myslide = $MyCon.find('.notice_con_list');
                    $Myslide.slick('setPosition');
                });


                $window.on('screen:wide screen:web', function(event) {
                    // 공지사항 슬라이드

                    var $notice_slide = $('.notice_wrap .notice_con');

                    $notice_slide.each(function(){
                        var $this = $(this),
                            $slide = $this.find('.notice_con_list'),
                            $control = $this.find('.notice_control');
                        $slide.slick({
                            autoplay : false,
                            dots: false,
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: false,
                            swipe: true,
                            draggable: true,
                            prevArrow : $control.find('.prev_btn'),
                            nextArrow : $control.find('.next_btn'),
                            responsive: [
                                {
                                    breakpoint: 1501,
                                    settings: {
                                        slidesToShow : 2,
                                    }
                                },{
                                    breakpoint:  1001,
                                    settings: 'unslick'
                                }
                            ],
                        });

                    });

                    console.log(window.outerWidth);
                });

                $window.on('screen:tablet screen:phone', function(event) {

                });

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}