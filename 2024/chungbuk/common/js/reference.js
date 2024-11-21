/*
 $(document).ready(function() {
 setTimeout("ozit_timer_test()", 3000); // 3000ms(3초)가 경과하면 ozit_timer_test() 함수를 실행합니다.
 });

 function ozit_timer_test(){
 alert("오즈의 순위왕 블로그로 이동합니다.");
 }
 */
var isPcResizingMenu = false,
  isMobileResizingMenu = false;

function pc_menu(e){ //PC 메뉴
                     //메뉴 변수선언
  var localNav = $(".lnb_wrap"),/* .lnb_wrap */
    menuWrap = $(".menu_wrap"),
    topMenu = $(".top_menu"),/* topmenu */
    topDepth1 = $(".depth1"),/* 1차메뉴 li */
    topDepth1_ti = $(" .depth1_ti"),/* 1차메뉴 앵커 */
    topDepth2_wrap = $(".top2m"),/* 2차메뉴 wrap */
    topDepth2Menu = $(".depth2"),
    topDepth2_ti = $(".depth2").find(" > li").find(" > a"),
    topLastMenu = $(".top_menu li:last-child div.depth2_wrap > ul > li:last-child"),/* 상단메뉴 전체중 맨 마지막 메뉴 변수 */
    bodyHeight = $("body").height(),
    menuMask = $(".black_wrap").css({height:bodyHeight}),
    lnbBtn = $(".m_menu_btn");

  if( isPcResizingMenu ) return;
  isPcResizingMenu = true;
  isMobileResizingMenu = false;

  //스마트기기에서 적용되던 이벤트 제거 및 초기화
  $("html").css({overflow:"initial"});
  $("body").css({overflow:"initial",height:"inherit"});
  menuWrap.css({width:"auto"});
  localNav.css({right:"inherit"});
  topDepth1.unbind();
  topDepth1_ti.unbind();
  topDepth1_ti.removeClass("on").next(topDepth2_wrap).stop().hide();// 모바일에서 활성화 되었던 메뉴 닫기
  topDepth2_ti.unbind().off();
  menuMask.hide();
  lnbBtn.addClass("inactive").removeClass("active").children("em").text("메뉴");
  lnbBtn.unbind().off();
  // 이벤트 제거 및 초기화 끝
  var delay=1000,setTimeoutConst;
  topDepth1_ti.on("mouseenter focusin",function(){
    setTimeoutConst = setTimeout(function(){
      var topDepth2_height = $(this).next(topDepth2_wrap).height();
      $(this).addClass("on").next(topDepth2_wrap).stop().slideDown(200).find(topDepth2Menu).css({"min-height":topDepth2_height});
      $(this).parent().siblings().children(topDepth1_ti).removeClass("on");
      $(this).parent().siblings().find(topDepth2_wrap).stop().slideUp(100).find(topDepth2Menu).css({"min-height":"inherit"});
      menuMask.fadeIn(200);
    },delay);
  }, function(){
    clearTimeout(setTimeoutConst);
  });
  topMenu.on("mouseleave",function(){
    topDepth1_ti.removeClass("on");
    topDepth2_wrap.stop().slideUp(100);
    topDepth2Menu.css({"min-height":"inherit"});
    menuMask.fadeOut(200);
  });
  topLastMenu.on("focusout",function(){
    $(this).parent().parent().parent().parent().slideUp(100).siblings().removeClass("on");
    topDepth2Menu.css({"min-height":"inherit"});
    menuMask.fadeOut(200);
  });
  //포커스가 마지막 메뉴를 빠져나왔을 때 펼쳐진 메뉴 가림.
}

function mobile_menu(e){ //모바일메뉴
                         //메뉴 변수선언
  var lnbBtn = $(".m_menu_btn"),/* mobile menu active Button */
    localNav = $(".lnb_wrap"),/* lnb local navigation bar pc랑 공통 변수 */
    menuWrap = $(".menu_wrap"),/* topmenu pc랑 공통 변수 */
    topMenu = $(".top_menu"),
    topDepth1 = $(".depth1"),/* 1차메뉴 li pc랑 공통 변수 */
    topDepth1_ti = $(" .depth1_ti"),/* 1차메뉴 앵커 pc랑 공통 변수 */
    topDepth2_wrap = $(".top2m").css({height:"auto"}),/* 2차메뉴 wrap pc랑 공통 변수 */
    topDepth2Menu = $(".depth2"),/* pc랑 공통 변수 */
    topDepth2_ti = $(".depth2").find(" > li").find(" > a"),
    topDepth3 = $(".depth3"),/* 3차메뉴 */
    srcBtn = $(".src_btn"),
    menuMask = $(".black_wrap");/* pc랑 공통 변수*/

  if( isMobileResizingMenu ) return;
  isMobileResizingMenu = true;
  isPcResizingMenu = false;

  //PC적용되던 이벤트 제거
  localNav.css({right:"inherit"});
  topDepth1_ti.parent().siblings().children(topDepth1_ti).removeClass("open");
  topDepth2_wrap.hide().removeClass("open").parent().removeClass("open");// 활성화 되었던 메뉴 닫기
  topDepth2Menu.css({height:"inherit"});
  $("body").off("mouseenter",topDepth1_ti,pc_menu);
  menuMask.unbind().off();
  menuWrap.css({width:"0"}).unbind().off();
  topMenu.unbind().off();
  topDepth1_ti.unbind().off();
  topDepth1.unbind().off();
  // 이벤트 제거 및 초기화 끝

  var stat = true;
  lnbBtn.click(function(){
    if(stat){
      var winHeight = $(window).innerHeight();
      $(this).addClass("active").removeClass("inactive").children("em").text("닫기");
      $("html,body").css({overflow:"hidden",height:winHeight});
      menuMask.fadeIn(200);
      menuWrap.animate({width:"240px"},300);
      srcBtn.css({"z-index":"20"});
      stat = false;
    }else if(stat == false){
      $(this).addClass("inactive").removeClass("active").children("em").text("메뉴");
      $("html,body").css({overflow:"visible",height:"inherit"});
      menuWrap.animate({width:"0"},300);
      topDepth1_ti.removeClass("open");
      topDepth2_wrap.slideUp(100);
      menuMask.fadeOut(200);
      srcBtn.css({"z-index":"31"});
      stat = true;
    }
  });
//  }
  topDepth1_ti.on("click",function(e){
    event.preventDefault();
    if($(this).hasClass("open")){
      $(this).removeClass("open").siblings(topDepth2_wrap).slideUp(100);
    }else{
      menuWrap.not(this).each(function($){
        topDepth1_ti.removeClass("open").siblings(topDepth2_wrap).slideUp(100);
      });
      $(this).addClass("open");
      $(this).siblings(topDepth2_wrap).slideDown(200);
    }
  });
  topDepth2_ti.on("click",function(e){
    var depth3Length = $(this).next(topDepth3).length;
    if(depth3Length > 0){
      event.preventDefault();
      if($(this).hasClass("depth2_open")){
        $(this).removeClass("depth2_open").next(topDepth3).stop().slideUp(100);
      }else{
        menuWrap.not(this).each(function($){
          topDepth2_ti.removeClass("depth2_open").next(topDepth3).stop().slideUp(100);
        });
        $(this).addClass("depth2_open");
        $(this).next(topDepth3).stop().slideDown(200);
      }
    }
  });
}
jQuery(function($) {
  //다국어 홈페이지 선택
  $(".language_btn").click(function () {
    $(this).toggleClass("open").next().slideToggle(100);
  });
  //통합검색
  var lnbWrap = $(".lnb_wrap"),
    searchWrap = $(".search_wrap"),
    srcBtn = $(".src_btn"),
    srcArea = $(".search_detail"),
    menuMask = $(".black_wrap"),
    winHeight = $(window).innerHeight(),
    stat = true;
  srcBtn.click(function(){
    if(stat){
      $(this).addClass("on");
      $("html,body").css({overflow:"hidden",height:winHeight});
      menuMask.fadeIn(200);
      srcArea.slideDown(200);
      lnbWrap.css({"z-index":"inherit"});
      searchWrap.css({"z-index":"40"});
      stat = false;
    }else if(stat == false){
      $(this).removeClass("on");
      $("html,body").css({overflow:"auto",height:"auto"});
      menuMask.fadeOut(200);
      srcArea.slideUp(200);
      lnbWrap.css({"z-index":"40"});
      searchWrap.css({"z-index":"inherit"});
      stat = true;
    }
  });
  //상단이동
  $(".top_btn").click(function(){
    $("html, body").animate({scrollTop : 0},400).focus("#rowgroup");
  });
  //풋터  - 관련사이트 바로가기
  $(".site_link div.layer").fadeOut("fast");
  $(".site_link h3 button.open").click(function(){
    $(".site_link div.layer").fadeOut("fast");
    $(this).parent().next("div.layer").fadeIn("fast");return false;
  });
  $(".site_link .close").click(function(){
    $(this).parent().fadeOut("fast");return false;
  });

  $(".depart_open").click(function(){
    var bodyHeight = $("body").height();
    $(this).siblings().fadeIn("fast");
    $(".black_wrap2").css({height:bodyHeight}).show();
  });
  $(".org_close").click(function(){
    $(this).parent().fadeOut("fast");
    $(".black_wrap2").hide();
  });
});

// 탭메뉴 공통적으로 사용
//ex) tabOn(1,1);
function tabOn(tabid,a) {
  var tabAllcount = 20;
  for (i=1;i<=tabAllcount;i++) {
    if(i<tabAllcount){inn="0"+i;} else {inn=""+i;}
    tabMenu = document.getElementById("tab"+tabid+"m"+i);
    tabContent = document.getElementById("tab"+tabid+"c"+i);
    tabMore = document.getElementById("tab"+tabid+"more"+i);
    if (tabMenu) { //객체가존재하면
      if (tabMenu.tagName=="BUTTON") { tabMenu.className=""; } //버튼일때
      if (tabMenu.tagName=="BUTTON") { tabMenu.parentNode.className=""; } //버튼일때
      if (tabMenu.tagName=="SPAN") { tabMenu.className=""; } //span 일때
      if (tabMenu.tagName=="SPAN") { tabMenu.parentNode.className=""; } //span 일때 부모요소에도 클래스 삭제
    }
    if (tabContent) {
      tabContent.style.display="none";
      tabContent.className="";
    }
    if (tabMore) { tabMore.style.display="none"; }
  }
  if(a<tabAllcount){ann="0"+a;} else {ann=""+a;}
  tabMenu = document.getElementById("tab"+tabid+"m"+a);
  tabContent = document.getElementById("tab"+tabid+"c"+a);
  tabMore = document.getElementById("tab"+tabid+"more"+a);
  if (tabMenu) { //객체가존재하면
    if (tabMenu.tagName=="BUTTON") { tabMenu.className="active"; } //버튼일때
    if (tabMenu.tagName=="BUTTON") { tabMenu.parentNode.className="active"; } //버튼일때
    if (tabMenu.tagName=="SPAN") { tabMenu.className="active"; } //span 일때
    if (tabMenu.tagName=="SPAN") { tabMenu.parentNode.className="active"; } //span 일때 부모요소에도 클래스추가
  }
  if (tabContent) {
    tabContent.style.display="block";
    tabContent.className="current";
  }
  if (tabMore) { tabMore.style.display="block"; }
}
// 탭 컨텐츠
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
    //console.log("test");
    settings.tabGroup.not(this).each(function($){
      settings.tabBtn.removeClass("open").siblings(settings.tabCnt).fadeOut(100);
    });
    $(this).addClass("open");
    $(this).siblings(settings.tabCnt).fadeIn(200);
    //}
  });
};
//배너 롤링
$(document).ready(function(){
  var bn_length = $(".banner li").length;
  if (bn_length > 7)
  {
    var bannerAuto=null;
    var bannerDirect="left";

    function rightBanner(){
      $(".banner ul").stop().animate(
        {left:"-=130px"},0,function(){
          var $bannerObj=$(".banner ul li:first").clone(true);
          $(".banner ul li:first").remove();
          $(".banner ul").css("left",0);
          $(".banner ul").append($bannerObj);
        }
      );
      if(bannerAuto)clearTimeout(bannerAuto);
      bannerAuto=setTimeout(rightBanner,3000)
    }

    function leftBanner(){
      $(".banner ul").stop().animate(
        {left:"0px"},0,function(){
          var $bannerObj=$(".banner ul li:last").clone(true);
          $(".banner ul li:last").remove();
          $(".banner ul").css("left","0");
          $(".banner ul").prepend($bannerObj);
        }
      );
      if(bannerAuto)clearTimeout(bannerAuto);
      bannerAuto=setTimeout(rightBanner,3000)
    }

    $(document).ready(function(){

      bannerAuto=setTimeout(rightBanner,3000)

      $rightB=$(".banner_controller .banner_next");
      $leftB=$(".banner_controller .banner_prev");
      $pauseB=$(".banner_controller .banner_ctrl");
      var bPlay = false;

      $leftB.click(function(){
        bannerDirect="left";
        clearTimeout(bannerAuto);
        leftBanner();
        return false;
        /*}*/
      });

      $rightB.click(function(){
        bannerDirect="right";
        clearTimeout(bannerAuto);
        rightBanner();
        return false;
        /*}*/
      });


      $pauseB.click(function(){
        if (bPlay == false){
          clearTimeout(bannerAuto);
          $pauseB.addClass("play").text("배너 롤링 재생하기");
          bPlay = true;
        }else{
          bPlay = false;
          $pauseB.removeClass("play").text("배너 롤링 일시정지하기");
          bannerAuto=setTimeout(rightBanner,1500)
        }
      });

      $(".banner ul li a").on("mouseover focusin", function(){
        clearTimeout(bannerAuto);
      });
      $(".banner ul li a").on("mouseleave focusout", function(){
        bPlay = false;
      });
    });
  }
});
// 좌우 슬라이딩
$.fn.horizonSlide = function(options){
  var settings = {
    slidePrev : '',
    slideNext : '',
    slideContent : '',
    slideElement : '',
    slideIndex : '',
    slideWidth : '',
    slideView : '',
    countTotal : '',
    countCurrent : ''
  };
  $.extend(settings, options);
  settings.slidePrev = $(settings.slidePrev);
  settings.slideNext = $(settings.slideNext);
  settings.slideContent = $(settings.slideContent);
  settings.slideElement = $(settings.slideElement);
  settings.countTotal = $(settings.countTotal);
  settings.countCurrent = $(settings.countCurrent);
  var slideSize = settings.slideElement.size(),
    slideIndex = settings.slideIndex,
    slideTotal = settings.slideElement.length,
    slideWidth = settings.slideElement.width(),
    slideAllwidth = slideWidth * slideTotal,
    slideView = settings.slideView,
    countTotal = settings.countTotal,
    countCurrent = settings.countCurrent,
    slidePst = 0;
  settings.slideContent.css("width",slideAllwidth);
  countTotal.html(slideTotal);
  countCurrent.html("1");
  if( slideSize > slideView){
    settings.slidePrev.on("click",function(e) {
      if( slideIndex > 1 ) {
        slidePst = slidePst - slideWidth;
        settings.slideContent.animate({left:-slidePst},400);
        slideIndex--;
        countCurrent.html(slideIndex);
      } else {
        //
      }
    });

    settings.slideNext.on("click",function(e) {
      if( slideIndex <= slideSize-slideView ) {
        slidePst = slidePst + slideWidth;
        settings.slideContent.animate({"left":-slidePst},400);
        slideIndex++;
        countCurrent.html(slideIndex);
      } else {
        //
      }
    });
  }
}
function subMenu(e){ //왼쪽메뉴 2차 버튼
  $(".sub_menu ul.sm_3th.on").parent("li").addClass("on");

  var side2Depth = $(".sm_3th").siblings("a").removeClass("link"),//link 클래스 지우는건 효과때문 .. 하위메뉴가 있고 없고에 따라서 아이콘이 달라짐.
    side3Depth = $(".sm_3th");
  side2Depth.on("click",function(){
    var side2DepthLink = $(this).attr("href"),
      linkArr = side2DepthLink.split("="),
      moveLink = linkArr[1];
    if(moveLink != 3038/* || moveLink != 7085 || moveLink != 3025 */){
      //특정키번호를 지정하여 지정된 키의 메뉴는 기냥 링크를 실행시킴. ex_컨텐츠 인트로 페이지 같은것들.
      event.preventDefault();
      //alert(moveLink);
      if($(this).hasClass("on") === true){
        //해당 depth에 on 클래스가 있는 경우 현재 위치해 있는 메뉴이기때문에 아래 소스는 실행시키지 않아야함
        return false;
      }else{
        $(this).addClass("open").siblings(side3Depth).addClass("open").parent().addClass("open");
        $(this).next(side3Depth).slideDown(200);
        $(this).parent().siblings(".open").find(side3Depth).slideUp(200);
        $(this).parent().siblings().removeClass("open").children().removeClass("open");
      }
    }
  });
}
function accordionVertical(e){ //수직 슬라이드
  var accordionOpen = $(".accordion_btn"),//link 클래스 지우는건 효과때문 .. 하위메뉴가 있고 없고에 따라서 아이콘이 달라짐.
    accordContents = $(".accordion_detail"),
    accordionClose = $(".accordion_close");
  accordionOpen.on("click",function(){
    //alert(moveLink);
    if($(this).hasClass("open") === true){
      return false;
    }else{
      $(this).addClass("open").siblings(accordContents).addClass("open").parent().addClass("open");
      $(this).next(accordContents).slideDown(200);
      $(this).parent().siblings(".open").find(accordContents).slideUp(200);
      $(this).parent().siblings().removeClass("open").children().removeClass("open");
    }
  });
  accordionClose.on("click",function(){
    $(this).parent(accordContents).slideUp(200).removeClass("open");
    $(this).parent().parent().removeClass("open");
    $(this).parent().siblings().removeClass("open");
  });
}
$(function(){
  //상단이동
  $(".top_btn").click(function(){
    $("html, body").animate({scrollTop : 0},400).focus("#rowgroup");
  });
});
$(window).scroll(function(){
  var scrollVertical = $(document).scrollTop();
  var cntWrap = $("#contents");
  //console.log(scrollVertical);
  if (scrollVertical >= 300){
    cntWrap.addClass("mobile");
  } else {
    cntWrap.removeClass("mobile");
  }
});
// 동영상 체크
function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0)
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./))
    return 11;

  else
    return 99; //It is not IE
}
/*  게시판 */
function addCellHeader(table) {
  if (!table) {
    return false;
  }
  //console.log(table);
  var trs = table.getElementsByTagName('tr');
  var trsChild;
  var grid = {};
  var cells;

  for (var i = 0, cntI = trs.length; i < cntI; i++) {
    if (!grid[i]) {
      grid[i] = {};
    }
    trsChild = trs.item(i).childNodes;
    cells = 0;
    for (var j = 0, cntJ = trsChild.length; j < cntJ; j++) {
      if (trsChild[j].nodeType == 1) {
        grid[i][cells++] = trsChild[j];
      }
    }
  }

  var cellHeader = '';
  for (row in grid) {
    if (row == 0) {
      continue;
    }
    for (cell in grid[row]) {
      if (cell == 0) {
        continue;
      }
      //cellHeader = grid[0][cell].innerHTML + ' - ' + grid[row][0].innerHTML
      cellHeader = grid[0][cell].innerHTML + '：' ;
      grid[row][cell].setAttribute('data-cell-header', cellHeader);
    }
  }
}

$( document ).ready(function() {
  var bbsTableRwdb   = $("table[data-rwdb='yes']");
  if(bbsTableRwdb.length > 0){
    var thisTable = bbsTableRwdb.attr('class').replace(/ /g, '.');
    if(navigator.appVersion.indexOf("MSIE 7.")==-1 && navigator.appVersion.indexOf("MSIE 8.")==-1) {
      addCellHeader(document.querySelector('.'+ thisTable));
    }
  }
});
// 만족도조사
function fn_validateCntntsEvalHist( frm ) {
  var valiEvl = false;
  for( var i=0; i<frm.cntntsEvlSe.length; i++ ) {
    if( frm.cntntsEvlSe[i].checked == true ) {
      valiEvl = true;
      break;
    }
  }
  if( !valiEvl ) {
    alert("만족도의 등급을 선택하지 않으셨습니다.\n만족도 등급을 선택하여 주세요.");
    fn_setFocus(frm, 'value5');
    return false;
  }
  return true;
}

function checkIE(ver,seletor) {
  var ver = ver,
    seletor = seletor;

  if (GetIEVersion() <= ver) { //IE브라우전 체크 버전보다 작으면
    $(seletor + " video").remove();
  } else{
    $(seletor + " object").remove();
  }
}