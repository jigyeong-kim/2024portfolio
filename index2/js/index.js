$(document).ready(function () {
    // Swiper 인스턴스 배열
    var swipers = [];
    var startY = 0;

    // Swiper 초기화
    $(".swiper-container").each(function (index, element) {
        var swiperInstance = new Swiper(element, {
            slidesPerView: 1,
            effect: "fade",
            freeMode: false,
            speed: 1000,
            allowTouchMove: true,
            simulateTouch: true,
            pagination: {
                el: $(element).find(".swiper-pagination")[0], // 해당 컨테이너의 페이지네이션
                clickable: true,
            },
            mousewheel: true,
            on: {
                touchStart: function (e) {
                    startY = e.touches ? e.touches[0].clientY : e.clientY; // 터치 시작 Y 좌표
                },
                touchMove: function (e) {
                    var currentY = e.touches ? e.touches[0].clientY : e.clientY; // 현재 Y 좌표

                    if ($(window).width() <= 1000) {
                        // 반응형 환경에서는 페이지 스크롤 허용
                        $('html, body').stop().animate({
                            scrollTop: $(window).scrollTop() + (startY - currentY),
                        }, 0);
                        this.allowTouchMove = false; // Swiper 자체 슬라이드 이동 비활성화
                    } else {
                        // 데스크톱 환경에서는 기본 동작 유지
                        this.allowTouchMove = Math.abs(currentY - startY) <= 30;
                    }
                },
                touchEnd: function () {
                    this.allowTouchMove = true; // 터치 종료 후 Swiper 이동 활성화
                },
                slideChange: function () {
                    if ($(window).width() > 1000) {
                        // 데스크톱에서 Fullpage.js 스크롤 제어
                        var idx = this.activeIndex;
                        var length = this.slides.length;

                        if (idx !== 0 && idx !== length - 1) {
                            $.fn.fullpage.setAllowScrolling(false); // Fullpage 스크롤 비활성화
                        }
                    }
                },
                slideChangeTransitionEnd: function () {
                    if ($(window).width() > 1000) {
                        // 데스크톱에서 Fullpage.js 스크롤 제어 복원
                        var idx = this.activeIndex;
                        var length = this.slides.length;

                        if (idx === 0 || idx === length - 1) {
                            $.fn.fullpage.setAllowScrolling(true);
                        }
                    }
                },
            },
        });

        swipers.push(swiperInstance); // Swiper 인스턴스를 배열에 추가
    });

    // Fullpage 초기화
    $("#fullpage").fullpage({
        sectionsColor: ["#1bbc9b", "#4BBFC3", "rgb(201 165 210)", "#7BAABE"],
        anchors: ["sec1", "sec2", "sec3", "sec4"],
        menu: "#menu",
        scrollingSpeed: 1000,
        onLeave: function (origin, destination, direction) {
            if ($(window).width() > 1000) {
                // 데스크톱 환경에서만 Fullpage 스크롤 제어
                $("#fullpage").on("scroll touchmove mousewheel", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });

                swipers.forEach(function (swiperInstance) {
                    swiperInstance.mousewheel.disable();
                });
            } else {
                // 반응형 환경에서는 Fullpage 스크롤 허용
                $.fn.fullpage.setAllowScrolling(true);
            }
        },
        afterLoad: function (anchorLink, index) {
            if ($(window).width() > 1000) {
                // 데스크톱에서만 Swiper와 Fullpage 상태 동기화
                $("#fullpage").off("scroll touchmove mousewheel");

                swipers.forEach(function (swiperInstance) {
                    swiperInstance.mousewheel.enable();
                });

                if (!$(".slide_sec").hasClass("active")) {
                    $.fn.fullpage.setAllowScrolling(true);
                }
            }
        },
    });

    // 초기 상태 동기화
    $(".swiper-container").each(function (index, element) {
        var swiperInstance = swipers[index];
        var idx = swiperInstance.activeIndex;
        var length = swiperInstance.slides.length;

        if ($(window).width() > 1000) {
            // 데스크톱 환경에서만 Fullpage 스크롤 제어
            if (idx === 0 || idx === length - 1) {
                $.fn.fullpage.setAllowScrolling(true);
            } else {
                $.fn.fullpage.setAllowScrolling(false);
            }
        }
    });

    // 키보드 이벤트로 모든 Swiper 인스턴스를 제어
    $(document).on("keydown", function (e) {
        swipers.forEach(function (swiperInstance) {
            if (e.key === "ArrowRight") {
                swiperInstance.slideNext(); // 오른쪽 화살표
            } else if (e.key === "ArrowLeft") {
                swiperInstance.slidePrev(); // 왼쪽 화살표
            }
        });
    });
});
