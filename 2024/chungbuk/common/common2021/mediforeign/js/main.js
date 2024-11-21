
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
				$window.on('screen:wide screen:web', function(event) {
					window.mode = 'pc';
				});

				$window.on('screen:tablet screen:phone', function(event) {
					window.mode = 'mobile';
				});


				//여기서부터 코드 작성해주세요
				var $Visual = $('.visual .visual_list'),
					viaualtotal = $('.visual .countbox .total'),
					viaualcurrent = $('.visual .countbox .current');
				$Visual.slick({
					//기본
					autoplay : true,
					dots : false,
					dotsClass : "slick-dots",
					autoplaySpeed:8000,
					speed : 1000,
					swipe : false,
					draggable : false,
					slidesToShow : 1,
					slidesToScroll: 1,
					variableWidth: false,
					infinite: true,
					prevArrow : $('.visual .visual_control2 .prev'),
					nextArrow : $('.visual .visual_control2 .next'),
					total : viaualtotal,
					current : viaualcurrent,
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
					},

					//추가 기능
					autoArrow : $('.visual .visual_control .auto'),
					isRunOnLowIE : false,
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
					pauseOnDotsClick : true,
					pauseText : '정지',
					playText : '재생',
					responsive: [
					{
					  breakpoint: 1001,
					  settings: {
						swipe : true,
						draggable : true
					  }
					}]
				});

                
                var time = 0;
                var interval ;
                var timeSet ; 
                var duration=8;
                var visualPlay = $('.visual .visual_control .auto').hasClass("slick-pause");
                var visualPause = $('.visual .visual_control .auto').hasClass("slick-play");

                $Visual.on('afterChange',function(){
                    // time=0;
                    // duration=8;
                    $(".pro-bar").addClass('pro-ani');
                    $(".visual_text").addClass('ani_play');
                    // $(".pro-ani").css({
                    //     'animation-duration': '8s',
                    // })
                        timeSet = setInterval(function(){
                        duration--;
                        },1000)
                });
                $Visual.on('beforeChange',function(){
                    $(".pro-bar").removeClass('pro-ani');
                    $(".visual_text").removeClass('ani_play');
                    clearInterval(timeSet); 
                });
                $('.visual .visual_control .auto').on('click', function(){
                    var $this = $(this);
                        visualPlay = $this.hasClass("slick-pause"),
                        visualPause = $this.hasClass("slick-play");

                    if (visualPlay) {
                        $(".pro-bar").css({
                            'animation-play-state': 'running'
                        });
                    } else if(visualPause){
                        $(".pro-bar").css({
                            'animation-play-state': 'paused'
                        });
                    } 
                });
                $('.visual .visual_control2 .prev, .visual .visual_control2 .next').on('click', function() {
                    $(".pro-bar").css({
                        'animation-play-state': 'paused'
                    });
                });

                //바로가기
				var $Quick = $('.quick .quick_list'),
					Langname = $('html').attr('lang');
				if(Langname === 'en' || Langname === 'ru'){
					$Quick.slick({
                        //기본
                        autoplay : false,
                        dots : false,
                        swipe : false,
                        draggable : false,
                        slidesToShow : 8,
                        slidesToScroll: 2,
                        variableWidth: false,
						arrows:false,

                        //추가 기능
                        responsive: [
                        {
                        breakpoint: 1281,
                        settings: {
                            slidesToShow : 8,
                        }
                        },
                    {
                        breakpoint: 1001,
                        settings: {
                            swipe : true,
                            draggable : true,
                            slidesToShow : 4,
                            slidesToScroll: 4,
							dots : true,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            swipe : true,
                            draggable : true,
                            slidesToShow : 3,
                            slidesToScroll: 3,
							dots : true,
                        }
                    },
                    ],
                });

				} else{
                    $Quick.slick({
                        //기본
                        autoplay : false,
                        dots : false,
                        swipe : false,
                        draggable : false,
                        slidesToShow : 8,
                        slidesToScroll: 2,
                        variableWidth: false,
						arrows:false,

                        //추가 기능
                        responsive: [
                        {
                        breakpoint: 1281,
                        settings: {
                            slidesToShow : 8,
                        }
                        },
                    {
                        breakpoint: 1001,
                        settings: {
                            swipe : true,
                            draggable : true,
                            slidesToShow : 5,
                            slidesToScroll: 5,
							dots : true,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            swipe : true,
                            draggable : true,
                            slidesToShow : 4,
                            slidesToScroll: 4,
							dots : true,
                        }
                    },
                    ],
                });
				}

                //관광지
				var $Thema = $('.thema .thema_img_list'),
					$ThemaSlide = $Thema.find('a');
				$Thema.slick({
					//기본
					autoplay : false,
					dots : false,
					draggable : false,
					slidesToShow : 2,
					slidesToScroll: 1,
					variableWidth: false,
                    vertical: true,
					focusOnSelect: true,
					arrows: true,

					//추가 기능
					prevArrow : $('.thema .thema_control .prev'),
					nextArrow : $('.thema .thema_control .next'),
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
					pauseOnDotsClick : true,
					pauseText : '정지',
					playText : '재생',
					asNavFor: '.thema_nav .thema_nav_list',
					responsive: [
						{
							breakpoint: 801,
							settings: {
								swipe : true,
								draggable : true
							}
						},
						{
							breakpoint: 641,
							settings: {
								swipe : true,
								draggable : true,
								vertical: false,
								variableWidth: true,
								focusOnSelect: false,
								slidesToShow : 1,
							}
						},
					]
				});


				$ThemaSlide.each(function(index, element){
					var $this = $(element);
					if(!$this.parents().is('.slick-current')){
						$this.attr('tabindex', -1);
						$this.parents('.slick-slide').attr('tabindex', -1);
					}
				});
			
                $Thema.on('wheel', (function(e) {
                    e.preventDefault();

                    if (e.originalEvent.deltaY < 0) {
                        $(this).slick('slickPrev');
                    } else {
                        $(this).slick('slickNext');
                    }
                }));

				var $ThemaNav = $('.thema_nav .thema_nav_list'),
                    themacurrent = $('.thema_control .current');
				$ThemaNav.slick({
					//기본
					swipe : false,
					draggable : false,
					slidesToShow : 2,
					slidesToScroll: 1,
					variableWidth: false,
					infinite: true,
                    vertical: true,
					// adaptiveHeight: true,
					arrows: false,
                    current : themacurrent,
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
					},
					asNavFor: '.thema .thema_img_list',

					responsive: [
						{
							breakpoint: 641,
							settings: {
								slidesToShow : 1,
							}
						},

					],
				});

				// On before slide change
				$Thema.on('beforeChange', function (event, _ref, currentSlide, nextSlide) {
					var count = _ref.slideCount;
					var selectors = [nextSlide, nextSlide - count, nextSlide + count].map(function (n) {
					return "[data-slick-index=\"".concat(n, "\"]");
				}).join(', ');
					$('.slick-slide').removeClass('slick-now');
					$(selectors).addClass('slick-now');
					});
					$('[data-slick-index="0"]').addClass('slick-now');



				/* 공지사항 탭 */
				function tabContent (tabCntWrap, tabButton, tabCnt) {

				    var $tabWrap = $(tabCntWrap),
				        $tabButton = $tabWrap.find(tabButton),
				        $tabContent = $(tabCnt),
						$tabWrapfirst = $tabWrap.find('li').eq(0);

						$($tabWrapfirst).addClass('active');
						/*전체선택시 클래스*/
						$tabWrap.addClass('selected_total');

						$($tabWrapfirst).find(tabButton).addClass('active').attr('title','선택됨');
						$($tabWrapfirst).siblings().find(tabButton).attr('title','선택안됨');
						$($tabWrapfirst).find(tabCnt).css({"display":"block"}).addClass('active');


				    $tabButton.on("click", function(){
				        // var $currentTarget = $(event.currentTarget);
						/*전체선택시 클래스*/
						if($(this).is('.total')){
							$(this).parents('.board_list').addClass('selected_total');
						} else{
							$(this).parents('.board_list').removeClass('selected_total');
						}

				        $tabWrap.find(".active").removeClass("active");
				        $tabWrap.find($tabContent).stop().fadeOut(500);
				        $(this).addClass("active").attr('title','선택됨');
						$(this).parents('li').siblings().find(tabButton).attr('title','선택안됨');
				        $(this).parent().next($tabContent).addClass("active").stop().fadeIn(500);

						$(this).parents('li').addClass("active");
						$(this).parents('li').siblings().removeClass("active");

				    });
				}
				tabContent('.board_list','.board_tab_button','.tabcontent');
				

				/*주요소식*/
				function boardSlick(){
					var $board = $('.board .board_list li');
						
						$board.each(function(index, element){
							var boardtotal = $(element).find('.board_control .countbox .total'),
								boardcurrent = $(element).find('.board_control .countbox .current'),
								$borardCont = $(element).find('.board_content'),
								$boardbtn = $(element).find('.board_tab_button');
							$borardCont.slick({
							//기본
							autoplay : false,
							dots : false,
							swipe : true,
							arrows: true,
							draggable : true,
							slidesToShow : 2,
							slidesToScroll: 2,
							variableWidth: false,
							infinite:false,
							prevArrow : $(element).find('.board_control .prev'),
							nextArrow : $(element).find('.board_control .next'),
							total : boardtotal,
							current : boardcurrent,
							customState : function(state) {
								var slidestoshow = $(element).find('.board_content').slick('getSlick').options.slidesToShow,
									current = Math.ceil(state.current / slidestoshow),
									total = Math.ceil(state.total / slidestoshow);
								//현재 슬라이드 위치가 10보다 작을 때
								if(state.current < 10) {
									state.current = '0' + current;
								}
								// console.log(state.total);

								//슬라이드 갯수가 10보다 작을 때
								if(state.total < 10) {
									state.total = '0' + state.total;
								}

								return state;
							},

							responsive: [
								{
								breakpoint: 1281,
								settings: {
									slidesToShow : 2,
								}
								},
								{
								breakpoint: 1001,
								settings: "unslick"
								},
							],
						});
						$boardbtn.on('click', function(){
							$borardCont.slick('setPosition');
						});
					});
				}
				boardSlick();
			

				//faq
				var $Faq = $('.faq .faq_list');

				var slickOptions = {
					//기본
					autoplay : false,
					dots : false,
					swipe : true,
					draggable : true,
					slidesToShow : 1,
					rows:2,
					variableWidth: false,
					prevArrow : $('.faq .faq_control .prev'),
					nextArrow : $('.faq .faq_control .next'),

					//추가 기능
					responsive: [
					{
					  breakpoint: 1401,
					  settings: {
						autoplay : false,
						slidesToShow : 2,
						rows:1,
					  }
					},
					{
						breakpoint: 1001,
						settings: "unslick"
					},
			  	]
				}

				$Faq.slick(slickOptions);

				$(window).on('resize', function () {
					$Quick.slick('resize');
					$Faq.slick(slickOptions);
					boardSlick();
				});

			
			
        
            });
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}
