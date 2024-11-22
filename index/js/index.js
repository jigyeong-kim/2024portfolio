$(document).ready(function() {
    // fullpage
    $('#fullpage').fullpage({		      
      sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#7BAABE'],
      anchors: ['sec1', 'sec2', 'sec3', 'sec4'],
      menu: '#menu',
      scrollingSpeed: 1000,
      // scrollBar: true,
      onLeave: function(origin, destination, direction) {
        // 빠른전환으로 이벤트중복시 fullpage와 swiper전환시점 분리막기
        $('#fullpage').on('scroll touchmove mousewheel', function(event) {                    
          event.preventDefault();
          event.stopPropagation();
          return false;
        });
        swiper.mousewheel.disable();
      },
      afterLoad: function(anchorLink, index) {      
        // 전환이 끝난후 이벤트풀기                               
        $('#fullpage').off('scroll mousewheel');      
        if(!$(".fp-completely .swiper-wrapper").length > 0) $('#fullpage').off('touchmove'); // 모바일분기
        if(swiper) swiper.mousewheel.enable();    
        if(!$(".sec2").hasClass("active")) $.fn.fullpage.setAllowScrolling(true); // 슬라이드 섹션을 벗어나면 휠풀어주기
      }
    });           
  
    // swiper
    var length = $(".swiper-slide").length;
    var startY = 0;
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      effect : 'fade',
      //spaceBetween: 0,
      freeMode: false,
      speed: 1000,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      mousewheel: true,
      on: {
        slideChange: function(){        
          var idx = this.activeIndex;
          // 처음과 마지막 슬라이드가 아닐경우 fullpage전환 막기
          if(this.activeIndex != 0 && idx != length) $.fn.fullpage.setAllowScrolling(false);
          if(length == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false) //슬라이드가 2개밖에 없을때
          // console.log('즉시 : ' + idx);
        },  
        slideChangeTransitionEnd: function(){
          var idx = this.activeIndex;
          // 처음과 마지막 슬라이드일 경우 fullpage전환 풀기
          if(idx == 0 || idx >= length-1) $.fn.fullpage.setAllowScrolling(true);
          // console.log('전환후 : ' + idx);     
        },     
        touchStart: function(e) {       
          startY = e.touches.startY; 
        },
        touchEnd: function(e) {   
          if(startY-10 > e.touches.currentY) {        
            swiper.slideNext();  
          } else if(startY+10 < e.touches.currentY) {
            swiper.slidePrev();      
          }
          console.log(startY, e.touches.currentY);
        },
        /*
        touchMove: function(e) {       
          var startY = e.touches.startY;
          setTimeout(function(){
            if(startY > e.touches.currentY) swiper.slideNext();  
            else swiper.slidePrev();
          },100);        
        },
        */           
      }, 
    });     
    
    $(document).on('keydown', function(e) {
      if (e.key === 'ArrowRight') {
        swiper.slideNext();  // 오른쪽 화살표: 다음 슬라이드
      } else if (e.key === 'ArrowLeft') {
        swiper.slidePrev();  // 왼쪽 화살표: 이전 슬라이드
      }
    });
  });