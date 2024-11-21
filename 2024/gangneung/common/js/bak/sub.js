/*
function sub_menu(e){ //왼쪽메뉴 2차 버튼
  $(".side_menu ul.sm_3th.on").parent("li").addClass("on");

  var side2Depth = $(".sm_3th").siblings("a"),
    side3Depth = $(".sm_3th");
  side2Depth.on("click",function(){
    //var side2DepthLink = $(this).attr("href"),
      //linkArr = side2DepthLink.split("="),
      //moveLink = linkArr[1];
    //if(moveLink != 3038){
      event.preventDefault();
      //alert(moveLink);
      $(this).addClass("open").siblings(side3Depth).addClass("open").parent().addClass("open");
      $(this).next(side3Depth).slideDown(200);
      $(this).parent().siblings(".open").find(side3Depth).slideUp(200);
      $(this).parent().siblings().removeClass("open").children().removeClass("open");
    //}
  });
};
*/
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

$(function(){
  //상단이동
  $(".top_btn").click(function(){
    $("html, body").animate({scrollTop : 0},400).focus("#rowgroup");
  });
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

