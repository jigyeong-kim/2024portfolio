// $(document).ready(function() {
//     // fullpage
//     $('#fullpage').fullpage({		      
//       sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#7BAABE'],
//       anchors: ['sec1', 'sec2', 'sec3', 'sec4'],
//       menu: '#menu',
//       scrollingSpeed: 1000,
//       // scrollBar: true,
//       onLeave: function(origin, destination, direction) {
//         // 빠른전환으로 이벤트중복시 fullpage와 swiper전환시점 분리막기
//         $('#fullpage').on('scroll touchmove mousewheel', function(event) {                    
//           event.preventDefault();
//           event.stopPropagation();
//           return false;
//         });
//         swiper.mousewheel.disable();
//       },
//       afterLoad: function(anchorLink, index) {      
//         // 전환이 끝난후 이벤트풀기                               
//         $('#fullpage').off('scroll mousewheel');      
//         if(!$(".fp-completely .swiper-wrapper").length > 0) $('#fullpage').off('touchmove'); // 모바일분기
//         if(swiper) swiper.mousewheel.enable();    
//         if(!$(".sec2").hasClass("active")) $.fn.fullpage.setAllowScrolling(true); // 슬라이드 섹션을 벗어나면 휠풀어주기
//       }
//     });           
  
//     // swiper
//     var length = $(".swiper-slide").length;
//     var startY = 0;
//     var swiper = new Swiper('.swiper-container', {
//       slidesPerView: 1,
//       effect : 'fade',
//       //spaceBetween: 0,
//       freeMode: false,
//       speed: 1000,
//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//       },
//       mousewheel: true,
//       on: {
//         slideChange: function(){        
//           var idx = this.activeIndex;
//           // 처음과 마지막 슬라이드가 아닐경우 fullpage전환 막기
//           if(this.activeIndex != 0 && idx != length) $.fn.fullpage.setAllowScrolling(false);
//           if(length == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false) //슬라이드가 2개밖에 없을때
//           // console.log('즉시 : ' + idx);
//         },  
//         slideChangeTransitionEnd: function(){
//           var idx = this.activeIndex;
//           // 처음과 마지막 슬라이드일 경우 fullpage전환 풀기
//           if(idx == 0 || idx >= length-1) $.fn.fullpage.setAllowScrolling(true);
//           // console.log('전환후 : ' + idx);     
//         },     
//         touchStart: function(e) {       
//           startY = e.touches.startY; 
//         },
//         touchEnd: function(e) {   
//           if(startY-10 > e.touches.currentY) {        
//             swiper.slideNext();  
//           } else if(startY+10 < e.touches.currentY) {
//             swiper.slidePrev();      
//           }
//           console.log(startY, e.touches.currentY);
//         },
//         /*
//         touchMove: function(e) {       
//           var startY = e.touches.startY;
//           setTimeout(function(){
//             if(startY > e.touches.currentY) swiper.slideNext();  
//             else swiper.slidePrev();
//           },100);        
//         },
//         */           
//       }, 
//     });     
    
//     $(document).on('keydown', function(e) {
//       if (e.key === 'ArrowRight') {
//         swiper.slideNext();  // 오른쪽 화살표: 다음 슬라이드
//       } else if (e.key === 'ArrowLeft') {
//         swiper.slidePrev();  // 왼쪽 화살표: 이전 슬라이드
//       }
//     });
//   });

// $(document).ready(function() {
//     // fullpage
//     $('#fullpage').fullpage({
//         sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#7BAABE'],
//         anchors: ['sec1', 'sec2', 'sec3', 'sec4'],
//         menu: '#menu',
//         scrollingSpeed: 1000,
//         onLeave: function(origin, destination, direction) {
//             // 스크롤 방지
//             $('#fullpage').on('scroll touchmove mousewheel', function(event) {                    
//                 event.preventDefault();
//                 event.stopPropagation();
//                 return false;
//             });

//             // 모든 Swiper 인스턴스의 마우스휠 비활성화
//             swipers.forEach(function(swiperInstance) {
//                 swiperInstance.mousewheel.disable();
//             });
//         },
//         afterLoad: function(anchorLink, index) {
//             // 이벤트 해제
//             $('#fullpage').off('scroll touchmove mousewheel');

//             // 모든 Swiper 인스턴스의 마우스휠 활성화
//             swipers.forEach(function(swiperInstance) {
//                 swiperInstance.mousewheel.enable();
//             });

//             // 특정 섹션에서는 스크롤 허용
//             if (!$(".sec2").hasClass("active")) {
//                 $.fn.fullpage.setAllowScrolling(true);
//             }
//         }
//     });

//     // Swiper 초기화
//     var swipers = []; // Swiper 인스턴스 배열
//     var startY = 0;

//     $(".swiper-container").each(function(index, element) {
//         var swiperInstance = new Swiper(element, {
//             slidesPerView: 1,
//             effect: 'fade',
//             freeMode: false,
//             speed: 1000,
//             pagination: {
//                 el: $(element).find('.swiper-pagination')[0], // 해당 컨테이너의 페이지네이션
//                 clickable: true
//             },
//             mousewheel: true,
//             on: {
//                 slideChange: function() {
//                     var idx = this.activeIndex;
//                     var length = this.slides.length;

//                     // 첫 슬라이드와 마지막 슬라이드가 아닐 때 fullpage 스크롤 비활성화
//                     if (idx !== 0 && idx !== length - 1) {
//                         $.fn.fullpage.setAllowScrolling(false);
//                     }
//                 },
//                 slideChangeTransitionEnd: function() {
//                     var idx = this.activeIndex;
//                     var length = this.slides.length;

//                     // 첫 슬라이드와 마지막 슬라이드일 때 fullpage 스크롤 활성화
//                     if (idx === 0 || idx === length - 1) {
//                         $.fn.fullpage.setAllowScrolling(true);
//                     }
//                 },
//                 touchStart: function(e) {
//                     startY = e.touches.startY;
//                 },
//                 touchEnd: function(e) {
//                     if (startY - 10 > e.changedTouches[0].clientY) {
//                         this.slideNext();  
//                     } else if (startY + 10 < e.changedTouches[0].clientY) {
//                         this.slidePrev();      
//                     }
//                 }
//             }
//         });

//         swipers.push(swiperInstance); // Swiper 인스턴스를 배열에 추가
//     });

//     // 키보드 이벤트로 모든 Swiper 인스턴스를 제어
//     $(document).on('keydown', function(e) {
//         swipers.forEach(function(swiperInstance) {
//             if (e.key === 'ArrowRight') {
//                 swiperInstance.slideNext(); // 오른쪽 화살표
//             } else if (e.key === 'ArrowLeft') {
//                 swiperInstance.slidePrev(); // 왼쪽 화살표
//             }
//         });
//     });
// });


// $(document).ready(function() {
//     // Swiper 인스턴스 배열
//     var swipers = [];
//     var startY = 0;

//     // Swiper 초기화
//     $(".swiper-container").each(function(index, element) {
//         var swiperInstance = new Swiper(element, {
//             slidesPerView: 1,
//             effect: 'fade',
//             freeMode: false,
//             speed: 1000,
//             allowTouchMove: true,
//             simulateTouch: true,
//             pagination: {
//                 el: $(element).find('.swiper-pagination')[0], // 해당 컨테이너의 페이지네이션
//                 clickable: true
//             },
//             mousewheel: true,
//             on: {
//                 touchStart: function (e) {
//                     startX = e.touches ? e.touches[0].clientX : e.clientX; // 터치 또는 마우스 X 좌표
//                     startY = e.touches ? e.touches[0].clientY : e.clientY; // 터치 또는 마우스 Y 좌표
//                 },
//                 touchMove: function (e) {
//                     var currentX = e.touches ? e.touches[0].clientX : e.clientX; // 현재 X 좌표
//                     var currentY = e.touches ? e.touches[0].clientY : e.clientY; // 현재 Y 좌표

//                     // 수직 움직임이 더 큰 경우 Swiper 이동 비활성화
//                     if (Math.abs(currentY - startY) > Math.abs(currentX - startX)) {
//                         this.allowTouchMove = false; // Swiper 슬라이드 이동 비활성화
//                     } else {
//                         this.allowTouchMove = true; // Swiper 슬라이드 이동 활성화
//                     }
//                 },
//                 touchEnd: function () {
//                     this.allowTouchMove = true; // 종료 후 Swiper 이동 활성화
//                 },
//                 slideChange: function() {
//                     var idx = this.activeIndex;
//                     var length = this.slides.length;

//                     // 첫 슬라이드와 마지막 슬라이드가 아닐 때 fullpage 스크롤 비활성화
//                     if (idx !== 0 && idx !== length - 1) {
//                         $.fn.fullpage.setAllowScrolling(false);
//                     }
//                 },
//                 slideChangeTransitionEnd: function() {
//                     var idx = this.activeIndex;
//                     var length = this.slides.length;

//                     // 첫 슬라이드와 마지막 슬라이드일 때 fullpage 스크롤 활성화
//                     if (idx === 0 || idx === length - 1) {
//                         $.fn.fullpage.setAllowScrolling(true);
//                     }
//                 },
//                 // touchStart: function(e) {
//                 //     startY = e.touches.startY;
//                 // },
//                 // touchEnd: function(e) {
//                 //     if (startY - 10 > e.changedTouches[0].clientY) {
//                 //         this.slideNext();
//                 //     } else if (startY + 10 < e.changedTouches[0].clientY) {
//                 //         this.slidePrev();
//                 //     }
//                 // }
//             }
//         });

//         swipers.push(swiperInstance); // Swiper 인스턴스를 배열에 추가
//     });

//     // Fullpage 초기화
//     $('#fullpage').fullpage({
//         sectionsColor: ['#1bbc9b', '#4BBFC3', 'rgb(201 165 210)', '#7BAABE'],
//         anchors: ['sec1', 'sec2', 'sec3', 'sec4'],
//         menu: '#menu',
//         scrollingSpeed: 1000,
//         onLeave: function(origin, destination, direction) {
//             // 스크롤 방지
//             $('#fullpage').on('scroll touchmove mousewheel', function(event) {
//                 event.preventDefault();
//                 event.stopPropagation();
//                 return false;
//             });

//             // 모든 Swiper 인스턴스의 마우스휠 비활성화
//             swipers.forEach(function(swiperInstance) {
//                 swiperInstance.mousewheel.disable();
//             });
//         },
//         afterLoad: function(anchorLink, index) {
//             // 이벤트 해제
//             $('#fullpage').off('scroll touchmove mousewheel');

//             // 모든 Swiper 인스턴스의 마우스휠 활성화
//             swipers.forEach(function(swiperInstance) {
//                 swiperInstance.mousewheel.enable();
//             });

//             // 특정 섹션에서는 스크롤 허용
//             if (!$(".slide_sec").hasClass("active")) {
//                 $.fn.fullpage.setAllowScrolling(true);
//             }
//         }
//     });

//     // 초기화 후 상태 동기화
//     $(".swiper-container").each(function(index, element) {
//         var swiperInstance = swipers[index];
//         var idx = swiperInstance.activeIndex;
//         var length = swiperInstance.slides.length;

//         // 초기 상태에서 fullpage 스크롤 설정
//         if (idx === 0 || idx === length - 1) {
//             $.fn.fullpage.setAllowScrolling(true);
//         } else {
//             $.fn.fullpage.setAllowScrolling(false);
//         }
//     });

//     // 키보드 이벤트로 모든 Swiper 인스턴스를 제어
//     $(document).on('keydown', function(e) {
//         swipers.forEach(function(swiperInstance) {
//             if (e.key === 'ArrowRight') {
//                 swiperInstance.slideNext(); // 오른쪽 화살표
//             } else if (e.key === 'ArrowLeft') {
//                 swiperInstance.slidePrev(); // 왼쪽 화살표
//             }
//         });
//     });
// });

$(document).ready(function () {
    // Swiper 인스턴스 배열
    var swipers = [];
    var startY = 0;

    // Swiper 초기화
    $(".swiper-container").each(function (index, element) {
        var swiperInstance = new Swiper(element, {
            slidesPerView: 1,
            effect: 'fade',
            freeMode: false,
            speed: 1000,
            allowTouchMove: true,
            simulateTouch: true,
            pagination: {
                el: $(element).find('.swiper-pagination')[0], // 해당 컨테이너의 페이지네이션
                clickable: true,
            },
            mousewheel: true,
            on: {
                touchStart: function (e) {
                    startX = e.touches ? e.touches[0].clientX : e.clientX; // 터치 또는 마우스 X 좌표
                    startY = e.touches ? e.touches[0].clientY : e.clientY; // 터치 또는 마우스 Y 좌표
                },
                touchMove: function (e) {
                    var currentX = e.touches ? e.touches[0].clientX : e.clientX; // 현재 X 좌표
                    var currentY = e.touches ? e.touches[0].clientY : e.clientY; // 현재 Y 좌표

                    if ($(window).width() > 1000) {
                        // 1000px 이상에서는 Swiper의 기본 동작 유지
                        if (Math.abs(currentY - startY) > Math.abs(currentX - startX)) {
                            this.allowTouchMove = false; // 수직 이동 감지 시 비활성화
                        } else {
                            this.allowTouchMove = true; // 수평 이동 감지 시 활성화
                        }
                    } else {
                        // 1000px 이하에서는 수직 드래그 시 페이지 스크롤 허용
                        this.allowTouchMove = false;
                        $('html, body').stop().animate({
                            scrollTop: $(window).scrollTop() + (startY - currentY),
                        }, 0); // 수직 스크롤 동작
                    }
                },
                touchEnd: function () {
                    this.allowTouchMove = true; // 종료 후 Swiper 동작 복원
                },
                slideChange: function () {
                    var idx = this.activeIndex;
                    var length = this.slides.length;

                    // 첫 슬라이드와 마지막 슬라이드가 아닐 때 fullpage 스크롤 비활성화
                    if (idx !== 0 && idx !== length - 1) {
                        $.fn.fullpage.setAllowScrolling(false);
                    }
                },
                slideChangeTransitionEnd: function () {
                    var idx = this.activeIndex;
                    var length = this.slides.length;

                    // 첫 슬라이드와 마지막 슬라이드일 때 fullpage 스크롤 활성화
                    if (idx === 0 || idx === length - 1) {
                        $.fn.fullpage.setAllowScrolling(true);
                    }
                },
            },
        });

        swipers.push(swiperInstance); // Swiper 인스턴스를 배열에 추가
    });

    // Fullpage 초기화
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', 'rgb(201 165 210)', '#7BAABE'],
        anchors: ['sec1', 'sec2', 'sec3', 'sec4'],
        menu: '#menu',
        scrollingSpeed: 1000,
        onLeave: function (origin, destination, direction) {
            $('#fullpage').on('scroll touchmove mousewheel', function (event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            });

            swipers.forEach(function (swiperInstance) {
                swiperInstance.mousewheel.disable();
            });
        },
        afterLoad: function (anchorLink, index) {
            $('#fullpage').off('scroll touchmove mousewheel');

            swipers.forEach(function (swiperInstance) {
                swiperInstance.mousewheel.enable();
            });

            if (!$(".slide_sec").hasClass("active")) {
                $.fn.fullpage.setAllowScrolling(true);
            }
        },
    });

    // 초기화 후 상태 동기화
    $(".swiper-container").each(function (index, element) {
        var swiperInstance = swipers[index];
        var idx = swiperInstance.activeIndex;
        var length = swiperInstance.slides.length;

        if (idx === 0 || idx === length - 1) {
            $.fn.fullpage.setAllowScrolling(true);
        } else {
            $.fn.fullpage.setAllowScrolling(false);
        }
    });

    // 키보드 이벤트로 모든 Swiper 인스턴스를 제어
    $(document).on('keydown', function (e) {
        swipers.forEach(function (swiperInstance) {
            if (e.key === 'ArrowRight') {
                swiperInstance.slideNext();
            } else if (e.key === 'ArrowLeft') {
                swiperInstance.slidePrev();
            }
        });
    });
});
