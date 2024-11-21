// 대표 메인 자주찾는 서비스 반응형 적용
var listLength,
    webLength = Math.ceil($(".srvc_wrap li").length / 10),
    mobileLength = Math.ceil($(".srvc_wrap li").length / 6);
if(navigator.userAgent.indexOf("MSIE 7") > 0 || navigator.userAgent.indexOf("MSIE 8") > 0) {
  $("document").ready(function(){
    //alert("ie7 && ie8");
  });
} else {
  //ie8 이상에서 적용됨
  //메인 사이즈
  $("document").ready(function(){
    if ( $(window).width() > 983){
      webLength = webLength + 1;
      //sub_menu();
    } else {
      listLength = mobileLength;
    }
  });
  var windowWidth = $(window).width();
  $(window).resize(function() {
    if( windowWidth != $(window).width() ) {
      if ( $(window).width() > 983){
        webLength = webLength + 1;
        return false;
      } else {
        listLength = mobileLength;
      }
    }
    windowWidth = $(window).width();
  })
};
//메인 이미지 롤링 함수
$.fn.imageRolling = function(options) {

  var settings = {
    prevBtn : '',
    nextBtn : '',
    playBtn : '',
    rollList : '',
    rollCurrent : $(".count"),
    rollAll : $(".all"),
    waitingTime : ''
  };

  $.extend(settings, options);
  settings.areaDiv = this;
  settings.prevBtn = $(settings.prevBtn);
  settings.nextBtn = $(settings.nextBtn);
  settings.rollList = $(settings.rollList);
  settings.rollCurrent = $(settings.rollCurrent);
  settings.rollAll = $(settings.rollAll);
  settings.controlBtn = $(settings.controlBtn);

  settings.cnt = settings.areaDiv.find(settings.rollList).length;
  settings.waitingTime = parseInt(settings.waitingTime);
  settings.nowNum = 0;
  settings.moveFlag = true;
  //settings.moveType;
  //settings.setTimeOut;
  var status=true;

  function emptySetting() {
    settings.areaDiv.find(settings.rollCurrent).html(settings.nowNum+1);
    settings.areaDiv.find(settings.rollAll).html(settings.cnt);
    settings.areaDiv.find(settings.rollList).hide();
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

    if(aniFlag) settings.areaDiv.find(settings.rollList).eq(settings.nowNum).show();
    else settings.areaDiv.find(settings.rollList).eq(settings.nowNum).fadeIn('normal');
    // 기본 : aniFlag 설정 없으면 fade 효과 - 조정

    //aniFlag = false;
    settings.moveFlag = false;
    if(status){
      if(settings.cnt >1){
        settings.setTimeOut= setTimeout(setRolling , settings.waitingTime);
      }
    }
  }
  function controlRolling(){
    //정지 재생버튼 텍스트로 제어.
    if(status){
      clearTimeout(settings.setTimeOut);
      settings.controlBtn.attr('class',"rolling_play");
      settings.controlBtn.text("비주얼 팝업 롤링 재생");
      status = false;
    }else{
      settings.controlBtn.attr('class',"rolling_stop");
      settings.controlBtn.text("비주얼 팝업 롤링 정지");
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
  settings.controlBtn.click(controlRolling);
};
//탭메뉴
/*
$.fn.tabMenu = function(options){
  var settings = {
    
  };
}
*/
/*
jQuery(function(){
  serviceGroup = $(".service_group"),
      tabBtn = $(".service_group").find("button.service_tab"),
      tabCnt = $(".srvc_wrap");
  tabBtn.on("click",function(e){
    console.log("test");
    serviceGroup.not(this).each(function($){
      tabBtn.removeClass("open").siblings(tabCnt).fadeOut(100);
    });
    $(this).addClass("open");
    $(this).siblings(tabCnt).fadeIn(200);
  });
});
*/
/* 탭 컨텐츠 */
$.fn.tabContent = function(options){
  var settings = {
    tabGroup : '',
    tabBtn : '',
    tabCnt : ''
  };
  $.extend(settings, options);
  settings.tabGroup = $(settings.tabGroup);
  settings.tabBtn = $(settings.tabBtn);
  settings.tabCnt = $(settings.tabCnt);
  settings.tabBtn.on("click",function(e){
    //if(settings.tabBtn.hasClass("open")){
      console.log("test");
      settings.tabGroup.not(this).each(function($){
        settings.tabBtn.removeClass("open").siblings(settings.tabCnt).fadeOut(100);
      });
      $(this).addClass("open");
      $(this).siblings(settings.tabCnt).fadeIn(200);
    //}
  });
};

/* 자주찾는 서비스 */
$.fn.serviceRolling = function(options){
  var settings = {
    listAfter : '',
    serviceList : '',
    moveElement : '',
    moveSize  : '',
    animateVal : '',
    topBtn : '',
    downBtn : ''
  };
  $.extend(settings, options);
  settings.serviceList = $(settings.serviceList);
  settings.moveElement = $(settings.moveElement);
  settings.topBtn = $(settings.topBtn);
  settings.downBtn = $(settings.downBtn);

  settings.listAfter = 1;
  settings.animateVal = 0;
  settings.moveSize = settings.moveElement.height();
  //console.log(settings.serviceList + '\n' + settings.moveElement + '\n' + settings.topBtn + '\n' + settings.downBtn + '\n' + settings.listAfter + '\n' + settings.animateVal + '\n' + settings.moveSize + '\n' + mobileLength);

  settings.topBtn.click(function(){
    //console.log("test");
    if(settings.listAfter <= webLength){
      settings.listAfter++;
      settings.animateVal += parseInt(settings.moveSize);
      settings.serviceList.stop().animate({top: settings.animateVal+"px"},200);
    }else{
      return false;
    }
  });
  settings.downBtn.click(function(){
    if(settings.listAfter >= 1){
      settings.listAfter--;
      settings.animateVal -= parseInt(settings.moveSize);
      settings.serviceList.stop().animate({top: settings.animateVal+"px"},200);
      //console.log(settings.serviceList + '\n' + settings.moveElement + '\n' + settings.topBtn + '\n' + settings.downBtn + '\n' + settings.listAfter + '\n' + settings.animateVal + '\n' + settings.moveSize + '\n' + mobileLength);
    }else{
      return false;
    }
  });
}