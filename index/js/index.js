
$(document).ready(function () {
    // Swiper 인스턴스 배열
    var swipers = [];
    var startX = 0, startY = 0;

    // Swiper 초기화
    $(".swiper-container").each(function (index, element) {
        var swiperInstance = new Swiper(element, {
            slidesPerView: 1,
            effect: 'fade',
            speed: 1000,
            allowTouchMove: true,
            simulateTouch: true,
            pagination: {
                el: $(element).find('.swiper-pagination')[0],
                clickable: true
            },
            mousewheel: true,
            on: {
                touchStart: function (e) {
                    if (e.touches) {
                        startX = e.touches[0].clientX;
                        startY = e.touches[0].clientY;
                    } else {
                        startX = e.clientX;
                        startY = e.clientY;
                    }
                },
                touchMove: function (e) {
                    var currentX, currentY;
                    if (e.touches) {
                        currentX = e.touches[0].clientX;
                        currentY = e.touches[0].clientY;
                    } else {
                        currentX = e.clientX;
                        currentY = e.clientY;
                    }
                    if (Math.abs(currentX - startX) > Math.abs(currentY - startY)) {
                        this.allowTouchMove = true;
                    } else {
                        this.allowTouchMove = false;
                    }
                },
                touchEnd: function () {
                    this.allowTouchMove = true;
                },
                slideChange: function () {
                    var idx = this.activeIndex;
                    var length = this.slides.length;
                    if (idx === 0 || idx === length - 1) {
                        $.fn.fullpage.setAllowScrolling(true);
                    } else {
                        $.fn.fullpage.setAllowScrolling(false);
                    }
                }
            }
        });
        swipers.push(swiperInstance);
    });

    // Fullpage 초기화
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', 'rgb(201 165 210)', '#7BAABE'],
        anchors: ['sec1', 'sec2', 'sec3', 'sec4'],
        menu: '#menu',
        scrollingSpeed: 1000,
        onLeave: function () {
            $('#fullpage').on('scroll touchmove mousewheel', preventScroll);
            swipers.forEach(function (swiper) {
                swiper.mousewheel.disable();
            });
        },
        afterLoad: function () {
            $('#fullpage').off('scroll touchmove mousewheel');
            swipers.forEach(function (swiper) {
                swiper.mousewheel.enable();
            });
        }
    });

    // 초기 상태 설정
    $(".swiper-container").each(function (index) {
        var swiperInstance = swipers[index];
        var idx = swiperInstance.activeIndex;
        var length = swiperInstance.slides.length;
        if (idx === 0 || idx === length - 1) {
            $.fn.fullpage.setAllowScrolling(true);
        } else {
            $.fn.fullpage.setAllowScrolling(false);
        }
    });

    // 키보드로 모든 Swiper 제어
    $(document).on('keydown', function (e) {
        swipers.forEach(function (swiper) {
            if (e.key === 'ArrowRight') {
                swiper.slideNext();
            } else if (e.key === 'ArrowLeft') {
                swiper.slidePrev();
            }
        });
    });

    // 스크롤 방지 함수
    function preventScroll(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
});
