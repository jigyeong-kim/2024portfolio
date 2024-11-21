<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>






<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="keywords" content="청주시청, 시청" />
<meta name="description" content="청주시청 대표 홈페이지" />
<link rel="stylesheet" type="text/css" href="/www/css/sub.css" />
<script type="text/javascript" src="/www/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="/www/js/common.js"></script>
<script type="text/javascript" src="/www/js/main.js"></script>
<script type="text/javascript" src="http://map.naver.com/js/naverMap.naver?key=c3477c562649ea05c3a8bb80f109a699"></script>
<script type="text/javascript" src="/common/js/map_naver.js"></script>
<script type="text/javascript" src="/common/js/admin.js"></script>
<!--[if lt IE 7]>
<script type="text/javascript" src="js/unitpngfix.js"></script>
<![endif]-->
<title>고시공고 - 청주시청.</title>
</head>
<body id="section1">
<div class="con_btn"> <a href="#container"><img src="images/common/con_btn.gif" width="113" height="30" alt="본문바로가기" /></a> </div>
<div id="accessibility"> <a href="#lnb">대메뉴로 바로가기</a> </div>
<hr />
<div id="header">
    <div class="wrap clearfix">
        <div class="logo"><a href="./index.do"><img src="images/common/logo.gif" width="225" height="45"  alt="일등경제 으뜸청주" /></a></div>
        <div class="search">
			<form name="search" id="search" action="http://search.cheongju.go.kr/search.jsp" method="get" onsubmit="return fn_search(this)">
                <fieldset>
                <legend>통합검색</legend>
                <span>
                <label for="search_sel" class="skip">검색설정</label>
                <span class="select_box">
                <select name="collection" id="search_sel">
                    <option value="ALL">통합검색</option>
                    <option value="menu">메뉴검색</option>
                    <option value="webpage">웹페이지</option>
                    <option value="task">직원 및 담당업무</option>
                    <option value="bunya">분야별정보</option>
                    <option value="tonghab">청주시통합예약</option>
                </select>
                </span>
                <label for="query" class="skip">검색단어입력</label>
                <input type="text" name="query" id="query" class="text" title="검색단어입력" value="검색단어입력"  onfocus="this.value=''" />
                </span>
                <input type="image" src="images/common/search_btn.gif" class="img_btn" style="width:63px; height:32px;" alt="검색" />
                </fieldset>
            </form>
        </div>
        <div class="gnb">
            <ul>
                <li class="first"><a href="./index.do">Home</a></li>
                
                <li><a href="./logout.do">로그아웃</a></li>
                
                
                <li><a href="/www/contents.do?key=586">이용안내</a></li>
                <li><a href="/english/index.do" title="새창" target="_blank">English</a></li>
                <li><a href="/japanese/index.do" title="새창" target="_blank">日本語</a></li>
                <li><a href="/chinese/index.do" title="새창" target="_blank">中國語</a></li>
            </ul>
        </div>
        <div class="top_btn">
            <ul>
                <li><a href="http://tour.cheongju.go.kr/main/tour" title="새창" target="_blank"><img src="images/common/right_on_btn.gif" width="115" height="30" alt="믄화관광" /></a></li>
            </ul>
        </div>
    </div>
    <!-- //wrap -->





<div id="lnb" class="clearfix">
	<div class="wrap">
	<ul id="top1menu" class="clearfix">
		<li id="top1m_first" >
			<a href="/www/contents.do?key=102" id="top1m1" accesskey="1" target="_self"> <img src="images/common/lnb_depm100_off.gif" height="41" alt="청주3.0정보공개" /></a>
			<div id="top2m1" class="top2m"><div>
				<ul class="clearfix">
					<li id="top2m1m1" class="top2m1_first" ><a href="/www/contents.do?key=102" target="_self">공공정보공개</a></li>
					<li id="top2m1m2"  ><a href="/www/contents.do?key=117" target="_self">시정정책</a></li>
					<li id="top2m1m3"  ><a href="/www/selectBbsNttList.do?bbsNo=24&key=128" target="_self">시살림살이</a></li>
					<li id="top2m1m4"  ><a href="/www/selectBbsNttList.do?bbsNo=25&key=131" target="_self">계약정보</a></li>
					<li id="top2m1m5"  ><a href="/www/contents.do?key=134" target="_self">법제도정보</a></li>
					<li id="top2m1m6"  ><a href="/www/selectBbsNttList.do?bbsNo=27&key=141" target="_self">감사정보</a></li>
					<li id="top2m1m7"  ><a href="/www/contents.do?key=3844" target="_self">규제개혁</a></li>
				</ul>
			</div></div>
		</li>
		<li  >
			<a href="/www/contents.do?key=159" id="top1m2" accesskey="2" target="_self"> <img src="images/common/lnb_depm153_off.gif" height="41" alt="전자민원" /></a>
			<div id="top2m2" class="top2m"><div>
				<ul class="clearfix">
					<li id="top2m2m1" class="top2m1_first" ><a href="/www/contents.do?key=159" target="_self">민원안내</a></li>
					<li id="top2m2m2"  ><a href="/www/contents.do?key=170" target="_self">여권업무</a></li>
					<li id="top2m2m3"  class="new_win" title="새창"><a href="http://eminwon.cheongju.go.kr/" target="_blank">새올전자민원창구</a></li>
					<li id="top2m2m4"  class="new_win" title="새창"><a href="https://digp.cjcity.net/personal/" target="_blank">도로굴착허가신청</a></li>
					<li id="top2m2m5"  class="new_win" title="새창"><a href="http://www.cheongju.go.kr/tongsin/index.do" target="_blank">통신민원안내</a></li>
				</ul>
			</div></div>
		</li>
		<li  >
			<a href="/www/contents.do?key=244" id="top1m3" accesskey="3" target="_self"> <img src="images/common/lnb_depm243_off.gif" height="41" alt="시민참여" /></a>
			<div id="top2m3" class="top2m"><div>
				<ul class="clearfix">
					<li id="top2m3m1" class="top2m1_first" ><a href="/www/contents.do?key=244" target="_self">청주시에바란다</a></li>
					<li id="top2m3m2"  ><a href="/www/contents.do?key=245" target="_self">시민참여제도</a></li>
					<li id="top2m3m3"  ><a href="/www/contents.do?key=247" target="_self">민원신고센터</a></li>
					<li id="top2m3m4"  ><a href="/www/selectBbsNttList.do?bbsNo=33&key=258" target="_self">시장과의 행복데이트</a></li>
					<li id="top2m3m5"  ><a href="/www/contents.do?key=260" target="_self">시민제안</a></li>
					<li id="top2m3m6"  ><a href="/www/selectBbsNttList.do?bbsNo=34&key=262" target="_self">홈페이지오류사항</a></li>
					<li id="top2m3m7"  ><a href="/www/selectQestnarList.do?key=263" target="_self">설문조사</a></li>
					<li id="top2m3m8"  ><a href="/www/selectBbsNttList.do?bbsNo=35&key=264" target="_self">자유게시판</a></li>
					<li id="top2m3m9"  ><a href="/www/selectBbsNttList.do?bbsNo=36&key=265" target="_self">칭찬합시다</a></li>
					<li id="top2m3m10"  ><a href="/www/selectSptConvrsList.do?key=266" target="_self">시장과의현장대화</a></li>
					<li id="top2m3m11"  ><a href="/www/selectBbsNttList.do?bbsNo=37&key=267" target="_self">여성참여마당</a></li>
				</ul>
			</div></div>
		</li>
		<li  >
			<a href="/www/selectBbsNttList.do?bbsNo=38&key=270" id="top1m4" accesskey="4" target="_self"> <img src="images/common/lnb_depm269_off.gif" height="41" alt="시정소식" /></a>
			<div id="top2m4" class="top2m"><div>
				<ul class="clearfix">
					<li id="top2m4m1" class="top2m1_first" ><a href="/www/selectBbsNttList.do?bbsNo=38&key=270" target="_self">청주시보</a></li>
					<li id="top2m4m2"  ><a href="/www/contents.do?key=5597" target="_self">청주소식</a></li>
					<li id="top2m4m3"  ><a href="/www/contents.do?key=273" target="_self">청주시민신문</a></li>
					<li id="top2m4m4"  class="new_win" title="새창"><a href="http://schedule.cheongju.go.kr" onclick="window.open(this.href,'sch','toolbars=no,scrollbars=yes,width=800px,height=800px'); return false;" target="_blank">청주시 일정</a></li>
					<li id="top2m4m5"  ><a href="/www/selectBbsNttList.do?bbsNo=39&key=278" target="_self">시정일지</a></li>
					<li id="top2m4m6"  ><a href="/www/selectBbsNttList.do?bbsNo=40&key=279" target="_self">새소식</a></li>
					<li id="top2m4m7"  ><a href="/www/selectBbsNttList.do?bbsNo=41&key=280" target="_self">공지사항</a></li>
					<li id="top2m4m8"  ><a href="/www/contents.do?key=281" target="_self">고시공고</a></li>
					<li id="top2m4m9"  ><a href="/www/selectBbsNttList.do?bbsNo=42&key=282" target="_self">타시군 알림사항</a></li>
					<li id="top2m4m10"  ><a href="/www/selectBbsNttList.do?bbsNo=43&key=283" target="_self">인사발령</a></li>
					<li id="top2m4m11"  ><a href="/www/selectBbsNttList.do?bbsNo=44&key=284" target="_self">시험채용</a></li>
					<li id="top2m4m12"  ><a href="/www/selectBbsNttList.do?bbsNo=45&key=285" target="_self">주간행사</a></li>
					<li id="top2m4m13"  ><a href="/www/selectBbsNttList.do?bbsNo=46&key=286" target="_self">보도해명</a></li>
					<li id="top2m4m14"  ><a href="/www/selectBbsNttList.do?bbsNo=47&key=287" target="_self">일일공사현황</a></li>
					<li id="top2m4m15"  class="new_win" title="새창"><a href="/mayor/selectBbsNttList.do?bbsNo=496&key=613" target="_blank">생생현장소식</a></li>
					<li id="top2m4m16"  ><a href="/www/selectBbsNttList.do?bbsNo=48&key=289" target="_self">계약발주계획및공개자료실</a></li>
				</ul>
			</div></div>
		</li>
		<li  >
			<a href="/www/selectBbsNttList.do?bbsNo=49&key=3900" id="top1m5" accesskey="5" target="_self"> <img src="images/common/lnb_depm290_off.gif" height="41" alt="분야별정보" /></a>
			<div id="top2m5" class="top2m"><div>
				<ul class="clearfix">
					<li id="top2m5m1" class="top2m1_first" ><a href="/www/selectBbsNttList.do?bbsNo=49&key=3900" target="_self">행정/민원</a></li>
					<li id="top2m5m2"  ><a href="/www/contents.do?key=309" target="_self">복지</a></li>
					<li id="top2m5m3"  ><a href="/www/contents.do?key=377" target="_self">보건/체육</a></li>
					<li id="top2m5m4"  ><a href="/www/contents.do?key=418" target="_self">환경</a></li>
					<li id="top2m5m5"  ><a href="/www/selectBbsNttList.do?bbsNo=54&key=431" target="_self">생활/안전</a></li>
					<li id="top2m5m6"  ><a href="/www/selectInhAuthPgmList.do?key=442" target="_self">교육/취업</a></li>
					<li id="top2m5m7"  ><a href="/www/contents.do?key=460" target="_self">경제/농정</a></li>
					<li id="top2m5m8"  ><a href="/www/contents.do?key=493" target="_self">청원생명브랜드</a></li>
					<li id="top2m5m9"  ><a href="/www/contents.do?key=499" target="_self">도시/부동산</a></li>
					<li id="top2m5m10"  ><a href="/www/contents.do?key=528" target="_self">문화관광분야</a></li>
					<li id="top2m5m11"  ><a href="/www/contents.do?key=534" target="_self">도로/교통</a></li>
				</ul>
			</div></div>
		</li>
		<li  >
			<a href="/www/contents.do?key=541" id="top1m6" accesskey="6" target="_self"> <img src="images/common/lnb_depm540_off.gif" height="41" alt="청주소개" /></a>
			<div id="top2m6" class="top2m"><div>
				<ul class="clearfix">
					<li id="top2m6m1" class="top2m1_first" ><a href="/www/contents.do?key=541" target="_self">열린시장실</a></li>
					<li id="top2m6m2"  ><a href="/www/contents.do?key=544" target="_self">일반현황</a></li>
					<li id="top2m6m3"  ><a href="/www/contents.do?key=560" target="_self">청주의상징</a></li>
					<li id="top2m6m4"  ><a href="/www/contents.do?key=3851" target="_self">사진으로 보는 역사기록집</a></li>
					<li id="top2m6m5"  ><a href="/www/contents.do?key=568" target="_self">교류현황</a></li>
					<li id="top2m6m6"  ><a href="/www/contents.do?key=578" target="_self">시청안내</a></li>
					<li id="top2m6m7"  ><a href="/www/contents.do?key=584" target="_self">청주시모바일서비스</a></li>
				</ul>
			</div></div>
		</li>
    </ul>
	</div>
	<script type="text/javascript">initTopMenu(0,0,'#6600ff');</script>
</div>

</div>
<!-- //header -->
<hr />
<div id="container" class="clearfix">
    <div class="wrap clearfix">



<div id="side" class="clearfix">

	<div class="side_title"><img src="images/sub/side_title_269.gif" height="127" alt="시정소식" /><br/>시정소식</div>
	<div class="side_menu">
		<ul>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=38&key=270" target="_self"><span>청주시보</span></a>
			</li>
			<li  ><a href="/www/contents.do?key=5597" target="_self"><span>청주소식</span></a>
			
			</li>
			<li  ><a href="/www/contents.do?key=273" target="_self"><span>청주시민신문</span></a>
			
			</li>
			<li  class="new_win" title="새창"><a href="http://schedule.cheongju.go.kr" onclick="window.open(this.href,'sch','toolbars=no,scrollbars=yes,width=800px,height=800px'); return false;" target="_blank"><span>청주시 일정</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=39&key=278" target="_self"><span>시정일지</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=40&key=279" target="_self"><span>새소식</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=41&key=280" target="_self"><span>공지사항</span></a>
			</li>
			<li class="on" ><a href="/www/contents.do?key=281" target="_self"><span>고시공고</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=42&key=282" target="_self"><span>타시군 알림사항</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=43&key=283" target="_self"><span>인사발령</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=44&key=284" target="_self"><span>시험채용</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=45&key=285" target="_self"><span>주간행사</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=46&key=286" target="_self"><span>보도해명</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=47&key=287" target="_self"><span>일일공사현황</span></a>
			</li>
			<li  class="new_win" title="새창"><a href="/mayor/selectBbsNttList.do?bbsNo=496&key=613" target="_blank"><span>생생현장소식</span></a>
			</li>
			<li  ><a href="/www/selectBbsNttList.do?bbsNo=48&key=289" target="_self"><span>계약발주계획및공개자료실</span></a>
			</li>
		</ul>
	</div>

</div>
    

        <div id="colgroup">
            <div class="sub_head">
                <div class="sub_title">
                    <h1>고시공고</h1>
                </div>
				<!--
                <div id="sub_sns_box">
                    <h2><img src="images/sub/sns_title.gif" alt="SNS공유하기"  /></h2>
                    <p><a href="#n"><img src="images/sub/sns_tw.gif" alt="해당 컨텐츠 트위터에 추가하기"  /></a><a href="#n"><img src="images/sub/sns_face.gif" alt="해당 컨텐츠 페이스북에 추가하기"  /></a></p>
                </div>
				-->
                <div class="path">홈 &gt 

	
	
		시정소식 &gt;
	

	
		<span>고시공고</span>
	
	
 
				</div>
            </div>
            <!-- //sub_head -->
            <div id="contents">

<%
String noParam = (String)request.getParameter("noParam");
%>
	<script type="text/javascript">
		$(function(){
			alert($('#contents').find('iframe').eq(0).attr('src')+'&notParam=<%= noParam %>');
			$('#contents').find('iframe').eq(0).attr('src',
				$('#contents').find('iframe').eq(0).attr('src')+'&notParam=<%= noParam %>');
		});
	</script>


<iframe title="고시공고연계 의 프레임" src="http://eminwon.gm.go.kr/emwp/jsp/ofr/OfrNotAncmtLSub.jsp?not_ancmt_se_code=01,04" style="width:720px; height:1000px; " scrolling="no"  frameborder="0"></iframe>
			</div>
            <!-- //contents -->




	





	


           <div id="admin_bottom" class="clearfix">
	
	
				<script type="text/javascript">
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
							return false;
						}
						return true;
					}
				</script>
                <p class="admin_text">이 페이지에서 제공하는 정보에 대하여 어느 정도 만족하셨습니까?</p>
                <form method="post" name="cntntsEvalHist" id="cntntsEvalHist" action="/sym/sit/cem/addContentsEvalHist.do" onsubmit="return fn_validateCntntsEvalHist(this);">
                    <h2 class="skip">만족도 조사</h2>
                    <div class="admin_research clearfix">
                        <div class="research_area">
                            <fieldset>
                            <legend>사용편의성 조사</legend>
							<input type="hidden" name="cntntsEvlNo" id="cntntsEvlNo" value="2862"/>
							<input type="hidden" name="menuNo" id="menuNo" value="281"/>
                            <span class="radio_box">
                            <input name="cntntsEvlSe" value="VERY_SATSFC" id="value5" type="radio" />
                            <label for="value5">매우만족</label>
                            <input name="cntntsEvlSe" value="SATSFC" id="value4" type="radio" />
                            <label for="value4">만족</label>
                            <input name="cntntsEvlSe" value="NRMLTY" id="value3" type="radio" />
                            <label for="value3">보통</label>
                            <input name="cntntsEvlSe" value="DSCNTT" id="value2" type="radio" />
                            <label for="value2">불만족</label>
                            <input name="cntntsEvlSe" value="VERY_DSCNTT" id="value1" type="radio" />
                            <label for="value1">매우불만족</label>
                            </span>
                            <label for="cntntsOpinionCn" class="skip">의견 한마디</label>
							<input title="만족도조사의견 입력창" type="text" class="text" name="cntntsOpinionCn" id="cntntsOpinionCn" onkeyup="messageByteCk(this.id, 'isWrite', 200, true);"/>
                            <input src="/common/images/sub/admin_research_btn_submit.gif" alt="의견등록" type="image" />
                            </fieldset>
                        </div>
                    </div>
                </form>
                <p class="admin_text_info"><span class="color">최대 200자(한글100자) 이내</span>로 입력하여 주십시오. <span class="count">[현재 <input name="isWrite" id="isWrite" title="만족도조사 글자수 표시란" />자]</span> </p>
                <!-- //admin_research -->
	
                <!-- //admin_info -->
            </div>

            <!-- //admin -->
			<!--
            <div class="link_bot">
                <ul>
                    <li><a href="#n">이전 청주시청사이트 바로가기</a></li>
                    <li><a href="#n">이전 청원군청사이트 바로가기</a></li>
                    <li class="top"><a href="#header">맨위로</a></li>
                </ul>
            </div>
			-->
        </div>
        <!-- //colgroup -->
        <!-- //floating 
 <div id="floating">
 <div class="quick">
    <h2><img src="images/sub/quick_title.gif" width="61" height="14" alt="퀵 링크" /></h2>
    <ul class="list">
        <li><a href=""><img src="images/sub/quick_01_off.gif" class="overimg" alt="" /></a></li>
        <li><a href=""><img src="images/sub/quick_02_off.gif" class="overimg" alt="" /></a></li>
        <li><a href=""><img src="images/sub/quick_03_off.gif" class="overimg" alt="" /></a></li>
        <li><a href=""><img src="images/sub/quick_04_off.gif" class="overimg" alt="" /></a></li>
        <li><a href=""><img src="images/sub/quick_05_off.gif" class="overimg" alt="" /></a></li>
        <li><a href=""><img src="images/sub/quick_06_off.gif" class="overimg" alt="" /></a></li>
    </ul>
    <p><a href="#n"><img src="images/sub/quick_top.gif" width="38" height="13" alt="TOP" /></a></p>
    <script type="text/javascript">JSFX_FloatDiv("floating",884,270).floatIt();</script>
</div>
</div>
-->
    </div>
    <!-- //wrap -->
</div>
<!-- //container -->
<hr />
<div id="footer" class="clearfix">
    <div class="wrap">
        <div class="footer_navi clearfix">
            <ul>
				<li class="first"><a href="/www/contents.do?key=592">주요기능안내</a></li>
				<li><a href="/www/contents.do?key=586">저작권보호정책</a></li>
				<li><a href="/www/contents.do?key=587">개인정보처리방침</a></li>
				<!-- <li><a href="/www/contents.do?key=174">행정서비스헌장</a></li> -->
				<li><a href="/www/mailingReqst.do?key=583">메일링신청</a></li>
				<li><a href="/www/contents.do?key=593">뷰어다운로드</a></li>
				<li><a href="/www/sub.do?key=589">사이트맵</a></li>
			</ul>
        </div>
        <div class="footer_info">
            <address>[360-700] 충청북도 청주시 상당구 상당로 155 (북문로3가) 대표전화 : 043-201-2114 </address>
            <p class="copy">Copyright ⓒ 1998-2014 Cheongju City. All Rights Reserved.</p>
            <p class="warning">본 웹사이트에 게시된 이메일 주소가 자동수집되는 것을 거부하며, 위반시 “정보통신망법”에 의해 처벌됨을 유념하시기 바랍니다.</p>
        </div>
        <div class="foot_btn">
            <ul>
                <li><a href="#n"><img src="images/common/qr_code.gif" width="88" height="74" alt="청주시청 QR코드로 청주시청 사이트로 이동합니다" /></a></li>
            </ul>
        </div>
    </div>
    <div id="page_list">
        <div class="wrap clearfix">
            <h2>최근 열어본 페이지</h2>
            <ul>

				<li><a href="./sub.do?key=281">고시공고</a></li>


            </ul>
        </div>
    </div>
    <div id="part_info">
        <div class="wrap clearfix">
            <h2>분야별<br />
                정보</h2>
             <ul>
                <li><a href="/www/selectBbsNttList.do?bbsNo=49&key=3900"><img src="images/common/part_img1.gif" width="38" height="33" alt="" /><span>행정/민원</span></a></li>
                <li><a href="/www/contents.do?key=309"><img src="images/common/part_img2.gif" width="23" height="33" alt="" /><span>복지</span></a></li>
                <li><a href="/www/contents.do?key=377"><img src="images/common/part_img3.gif" width="34" height="33" alt="" /><span>보건/체육</span></a></li>
                <li><a href="/www/contents.do?key=418"><img src="images/common/part_img4.gif" width="35" height="33" alt="" /><span>환경</span></a></li>
                <li><a href="/www/selectBbsNttList.do?bbsNo=54&key=431"><img src="images/common/part_img5.gif" width="28" height="33" alt="" /><span>생활/안전</span></a></li>
                <li><a href="/www/selectInhAuthPgmList.do?key=442"><img src="images/common/part_img6.gif" width="34" height="33" alt="" /><span>교육/취업</span></a></li>
                <li><a href="/www/contents.do?key=460"><img src="images/common/part_img7.gif" width="28" height="33" alt="" /><span>경제/농정</span></a></li>
                <li><a href="/www/contents.do?key=499"><img src="images/common/part_img8.gif" width="35" height="33" alt="" /><span>도시/부동산</span></a></li>
                <li><a href="/www/contents.do?key=528"><img src="images/common/part_img9.gif" width="29" height="33" alt="" /><span>문화관광</span></a></li>
                <li><a href="/www/contents.do?key=534"><img src="images/common/part_img10.gif" width="26" height="33" alt="" /><span>도로교통</span></a></li>
            </ul>
        </div>
    </div>
</div>
<!-- footer -->
</body>
</html>
