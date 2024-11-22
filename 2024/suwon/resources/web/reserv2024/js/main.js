(function($) {
	'use strict';

	var $window = $(window);

	$(function() {

        // 기관검색 탭
        var $notice_tab_wrap = $('.notice_search_wrap '),
            $notice_tab_btn = $notice_tab_wrap.find('.notice_btn'),
            $notice_tab_con = $notice_tab_wrap.find('.notice_con');

        $notice_tab_btn.click(function (e) {
            var $this = $(this),
                thisTitle = $this.find('span').text(),
                index = $this.parent('.notice_tab_item').index();

            $this.addClass('active').attr('title', thisTitle + ' 선택됨').parent('.notice_tab_item').siblings('.notice_tab_item').find('.notice_btn').removeClass('active').removeAttr('title');

            $notice_tab_con.eq(index).addClass('active').attr('title', thisTitle + ' 열림').siblings('.notice_con').removeClass('active').removeAttr('title');
        });

        // 기관 검색 전체 선택
        var $allCheck = $('#o1_all'),
            $otherCheck = $('input[name="o1"]').not('#o1_all'),
            $allText = $('.all_text label');

        $allCheck.on('change', function () {
            var isChecked = $allCheck.prop('checked');
            $otherCheck.prop('checked', isChecked);
            if (isChecked) {
                $allText.text('선택 해제');
            } else {
                $allText.text('전체 선택')
            }
            // $allText.text(isChecked ? '선택 해제' : '전체 선택');
        });

        $otherCheck.on('change', function () {
            var allChecked = $otherCheck.length === $otherCheck.filter(':checked').length;

            if (allChecked) {
                $allCheck.prop('checked', true);
                $allText.text('선택 해제');
            } else {
                $allCheck.prop('checked', false);
                $allText.text(' 전체 선택');
            }
            // $allCheck.prop('checked', allChecked);
            // $allText.text(allChecked ? '선택 해제' : '전체 선택');
        });

        // 분류/지역 검색 탭
        var $place_tab_wrap = $('.place_search_con .place_wrap'),
            $place_tab_btn = $place_tab_wrap.find('.place_btn'),
            $place_tab_con = $place_tab_wrap.find('.place_tab_con');

        $place_tab_btn.click(function (e) {
            var $this = $(this),
                thisTitle = $this.text(),
                index = $this.parent('.place_tab_item').index();

            $this.addClass('active').attr('title', thisTitle + ' 선택됨').parent('.place_tab_item').siblings('.place_tab_item').find('.place_btn').removeClass('active').removeAttr('title');

            $place_tab_con.eq(index).addClass('active').attr('title', thisTitle + ' 열림').siblings('.place_tab_con').removeClass('active').removeAttr('title');
        });

        // 분류/지역 검색 지도영역
        $('.place_map_wrap .place_map_con area').on('click', function(event) {
            var $this = $(this),
                thisIndex = $this.index(),
                Mytitle = $this.attr('alt'),
                $thisBtn = $this.parents('.place_map_con').siblings('.place_btn_wrap').find('.place_btn_item').eq(thisIndex).find('.place_btn');
            console.log(thisIndex);
            $this.parent('map').siblings('img').attr('src', '/2024portfolio/2024/suwon/resources/web/reserv2024/images/main/map_img' + (thisIndex + 1) + '.png');
            $thisBtn.attr('title', Mytitle + ' 선택됨').parent('.place_btn_item').addClass('active').siblings('.place_btn_item').removeClass('active').find('.place_btn').removeAttr('title');
        });

        $('.place_map_wrap .place_btn_wrap .place_btn').on('click', function (event) {
            var $this = $(this),
                thisIndex = $this.parent('.place_btn_item').index() + 1,
                Mytitle = $this.find('.title').text(),
                $img = $this.parents('.place_btn_wrap').siblings('.place_map_con').find('img');

            $this.attr('title', Mytitle + ' 선택됨').parent('.place_btn_item').addClass('active').siblings('.place_btn_item').removeClass('active').find('.place_btn').removeAttr('title');
            $img.attr('src', '/2024portfolio/2024/suwon/resources/web/reserv2024/images/main/map_img' + thisIndex + '.png');
        });

        // rowgroup2 슬라이드
        var $notice_wrap = $('.notice_slide_wrap'),
            $notice_slide = $notice_wrap.find('.notice_slide'),
            $notice_control = $notice_wrap.find('.notice_control');

        $notice_slide.slick({
            slidesToShow: 4,
            prevArrow: $notice_control.find('.prev_btn'),
            nextArrow: $notice_control.find('.next_btn'),
            // infinite: false,

            responsive: [
                {
                    breakpoint: 1701,
                    settings: {
                        slidesToShow: 3,
                    }
                },{
                    breakpoint: 1501,
                    settings: {
                        slidesToShow: 2,
                    }
                },{
                    breakpoint: 1361,
                    settings: {
                        slidesToShow: 1,
                    }
                },{
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        appendDots: $notice_control.find('.notice_dots'),
                        variableWidth: true,
                    }
                }
                ]
        });

        // 예약서비스 탭 슬라이드
        var $service_tab_wrap = $('.service_tab_wrap'),
            $service_tab_btn = $service_tab_wrap.find('.service_tab_btn'),
            $service_tab_con = $service_tab_wrap.find('.service_con');

        $service_tab_btn.click(function () {
            var $this = $(this),
                thisTitle = $this.text(),
                index = $this.parent('.service_tab_item').index(),
                $thisSlide = $service_tab_con.eq(index).find('.service_slide');

            $this.addClass('active').attr('title', thisTitle + ' 선택됨').parent('.service_tab_item').siblings('.service_tab_item').find('.service_tab_btn').removeClass('active').removeAttr('title');

            $service_tab_con.eq(index).addClass('active').attr('title', thisTitle + ' 열림').siblings('.service_con').removeClass('active').removeAttr('title');

            if (!$thisSlide.hasClass('slick-initialized')) {
                $thisSlide.slick({
                    slidesToShow: 4,
                    responsive: [
                        {
                            breakpoint: 1501,
                            settings: {
                                slidesToShow: 3,
                            }
                        },{
                            breakpoint: 1001,
                            settings: {
                                slidesToShow: 2,
                            }
                        },{
                            breakpoint: 641,
                            settings: {
                                slidesToShow: 1,
                            }
                        }
                    ]
                });
            } else {
                $thisSlide.slick('setPosition');
            }
        });

        $service_tab_con.eq(0).find('.service_slide').slick({
            slidesToShow: 4,
            responsive: [
                {
                    breakpoint: 1501,
                    settings: {
                        slidesToShow: 3,
                    }
                },{
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 2,
                    }
                },{
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    });
})(window.jQuery);