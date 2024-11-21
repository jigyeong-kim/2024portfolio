<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
	<footer id="footer">
		<div class="link">
			<h2 class="skip">청주시 관련링크</h2>
			<div class="wrap clearfix">
				<div class="link_group">
					<div class="link_tit">
						<button class="open">청주시부서/사업소</button>
					</div>
					<div class="layer">
						<div class="tit">청주시부서/사업소</div>
						<div class="scroll">
							<ul>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/jiksok/index.do">직속부서</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/gihoek/index.do">경제투자실</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/anjeon/index.do">행정지원국</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/bokji/index.do">복지교육국</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/munwhayesul/index.do">문화체육관광국</a></li>
								<!--<li><a title="새창" target="_blank" href="http://ac.cheongju.go.kr">문화체육관광국</a></li>-->
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/nongjeong/index.do">농업정책국</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/dosi/index.do">안전도시주택국</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/geonseol/index.do">건설교통본부</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/sdhealth/index.do">상당보건소</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/swhealth/index.do">서원보건소</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/hdhealth/index.do">흥덕보건소</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/cwhealth/index.do">청원보건소</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/nongup/index.do">농업기술센터</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/sangsudo/index.do">상수도사업본부</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/ac/index.do">청주예술의전당</a></li>
								<li><a title="새창" target="_blank" href="http://jikjiworld.cheongju.go.kr">고인쇄박물관</a></li>
								<li><a title="새창" target="_blank" href="http://cle.cjcil.com">도서관평생학습본부</a></li>
								<li><a title="새창" target="_blank" href="http://lll.cheongju.go.kr">평생학습관</a></li>
								<li><a title="새창" target="_blank" href="http://library.cheongju.go.kr">청주시도서관</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/environment/index.do">환경관리본부</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/land/index.do">청주랜드관리사업소</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/car/index.do">차량등록사업소</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/safe/index.do">재난안전대책본부</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/citydevelop/index.do">도시개발사업단</a></li>
							</ul>
						</div>
						<button class="close"><img alt="사이트목록 닫기" src="/site/ac/images/common/site_link_close.gif"></button>
					</div>
				</div>
				<div class="link_group">
					<div class="link_tit">
						<button class="open">상당구청/면동</button>
					</div>
					<div class="layer">
						<div class="tit">상당구청/면동</div>
						<div class="scroll">
							<ul>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/sangdang/index.do">상당구청</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/nangseong/index.do">낭성면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/miwon/index.do">미원면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/gadeok/index.do">가덕면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/namil/index.do">남일면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/munui/index.do">문의면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/jungang/index.do">중앙동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/seong-an/index.do">성안동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/tap-daeseong/index.do">탑/대성동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/yeongun/index.do">영운동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/geumcheon/index.do">금천동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/yongdam/index.do">용담/명암/산성동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/yongam1/index.do">용암1동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/yongam2/index.do">용암2동</a></li>
							</ul>
						</div>
						<button class="close"><img alt="사이트목록 닫기" src="/site/ac/images/common/site_link_close.gif"></button>
					</div>
				</div>
				<div class="link_group">
					<div class="link_tit">
						<button class="open">서원구청/면동</button>
					</div>
					<div class="layer">
						<div class="tit">서원구청/면동</div>
						<div class="scroll">
							<ul>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/seowon/index.do">서원구청</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/nami/index.do">남이면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/hyeondo/index.do">현도면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/sajik1/index.do">사직1동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/sajik2/index.do">사직2동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/sachang/index.do">사창동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/mochung/index.do">모충동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/sugok1/index.do">수곡1동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/sugok2/index.do">수곡2동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/sannam/index.do">산남동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/bunpyeong/index.do">분평동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/seonghwa/index.do">성화/개신/죽림동</a></li>
							</ul>
						</div>
						<button class="close"><img alt="사이트목록 닫기" src="/site/ac/images/common/site_link_close.gif"></button>
					</div>
				</div>
				<div class="link_group">
					<div class="link_tit">
						<button class="open">흥덕구청/읍면동</button>
					</div>
					<div class="layer">
						<div class="tit">흥덕구청/읍면동</div>
						<div class="scroll">
							<ul>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/heungdeok/index.do">흥덕구청</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/osong/index.do">오송읍</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/gangnae/index.do">강내면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/oksan/index.do">옥산면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/uncheon/index.do">운천/신봉동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/bokdae1/index.do">복대1동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/bokdae2/index.do">복대2동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/gagyeong/index.do">가경동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/bongmyeong1/index.do">봉명1동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/bongmyeong2/index.do">봉명2동/송정동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/gangseo1/index.do">강서1동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/gangseo2/index.do">강서2동</a></li>
							</ul>
						</div>
						<button class="close"><img alt="사이트목록 닫기" src="/site/ac/images/common/site_link_close.gif"></button>
					</div>
				</div>
				<div class="link_group">
					<div class="link_tit">
						<button class="open">청원구청/읍면동</button>
					</div>
					<div class="layer">
						<div class="tit">청원구청/읍면동</div>
						<div class="scroll">
							<ul>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/cheongwon/index.do">청원구청</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/naesu/index.do">내수읍</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/ochang/index.do">오창읍</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/bugi/index.do">북이면</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/uam/index.do">우암동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/naedeok1/index.do">내덕1동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/naedeok2/index.do">내덕2동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/yulyang/index.do">율량/사천동</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/ogeunjang/index.do">오근장동</a></li>
							</ul>
						</div>
						<button class="close"><img alt="사이트목록 닫기" src="/site/ac/images/common/site_link_close.gif"></button>
					</div>
				</div>
				<div class="link_group">
					<div class="link_tit">
						<button class="open">관련사이트</button>
					</div>
					<div class="layer">
						<div class="tit">관련사이트</div>
						<div class="scroll">
							<ul>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/market/index.do">농수산물도매시장</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/stat/index.do">통계정보</a></li>
								<li><a title="새창" target="_blank" href="http://musimi.cheongju.go.kr">무심워터월드</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/uamsan/index.do">우암산자연생태사이트</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/child/index.do">어린이홈페이지</a></li>
								<li><a title="새창" target="_blank" href="http://www.cjwf.net/main.php ">청주복지재단</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/wonheungi/index.do">원흥이두꺼비생태공원</a></li>
								<li><a title="새창" target="_blank" href="http://photo.cheongju.go.kr">청주시포토갤러리</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/readygo/index.do">레디고청주</a></li>
								<li><a title="새창" target="_blank" href="http://cheongju.grandculture.net/?local=cheongju">디지털청주문화대전</a></li>
								<li><a title="새창" target="_blank" href="http://cjsisul.or.kr/">청주시시설관리공단</a></li>
								<li><a title="새창" target="_blank" href="http://cjcity.evermbc.com/p12/site/Do.jsp?menuSeq=215 ">청주시사이버평생교육원</a></li>
								<li><a title="새창" target="_blank" href="http://www.cheongju.go.kr/bio/index.do">청원생명축제</a></li>
								<li><a title="새창" target="_blank" href="http://edu.cheongju.go.kr">정보화교육</a></li>
								<li><a title="새창" target="_blank" href="http://www.purushop.com/">청원생명쇼핑몰</a></li>
								<li><a title="새창" target="_blank" href="http://cmoa.cheongju.go.kr/www/index.do">시립미술관</a></li>
								<li><a title="새창" target="_blank" href="http://race.cheongju.go.kr">대청호마라톤</a></li>
								<li><a title="새창" target="_blank" href="http://1388cw.or.kr/main.php">청소년상담복지센터</a></li>
								<li><a title="새창" target="_blank" href="http://okhwa.cbhuyang.go.kr/">옥화자연휴양림</a></li>
								<li><a title="새창" target="_blank" href="http://www.ochangcmc.or.kr/">오창과학산업단지</a></li>
								<li><a title="새창" target="_blank" href="http://osong.mohw.go.kr/">오송생명과학단지</a></li>
								<li><a title="새창" target="_blank" href="http://www.cjmh.or.kr/">청주문화원</a></li>
								<li><a title="새창" target="_blank" href="http://chnam.cb21.net/index.jsp ">청남대</a></li>
								<li><a title="새창" target="_blank" href="http://toy.cheongju.go.kr">장난감대여</a></li>
								<li><a title="새창" target="_blank" href="http://pd.invil.org/ ">평동전통떡정보화마을</a></li>
								<li><a title="새창" target="_blank" href="http://godmee.cheongju.go.kr">청원고드미마을</a></li>
								<li><a title="새창" target="_blank" href="http://godmee.invil.org/">고드미정보화마을</a></li>
								<li><a title="새창" target="_blank" href="http://greenfrog.invil.org/">청개구리쌀정보화마을</a></li>
								<li><a title="새창" target="_blank" href="http://malmi.cheongju.go.kr">말미장터마을</a></li>
								<li><a title="새창" target="_blank" href="http://bulat.cheongju.go.kr">문의벌랏한지마을</a></li>
								<li><a title="새창" target="_blank" href="http://obaksa.cheongju.go.kr">오박사마을</a></li>
								<li><a title="새창" target="_blank" href="http://lotus.cheongju.go.kr">강내연꽃마을</a></li>
								<li><a title="새창" target="_blank" href="http://junhaul.cheongju.go.kr">전하울산촌생태마을</a></li>
								<li><a title="새창" target="_blank" href="http://ungyo.cheongju.go.kr">운교마을</a></li>
								<li><a title="새창" target="_blank" href="http://eoam.cheongju.go.kr">어암리산촌생태마을</a></li>
								<li><a title="새창" target="_blank" href="http://www.청주시상권활성화관리재단.com/">청주시상권활성화관리재단</a></li>
								<li><a title="새창" target="_blank" href="http://garo.cheongju.go.kr/">가로등 보안등관리시스템</a></li>
								<li><a title="새창" target="_blank" href="http://sorori.cheongju.go.kr/main.php">청주소로리볍씨</a></li>
								<li><a title="새창" target="_blank" href="http://cjhappycall.or.kr/">청주해피콜 이동지원센터</a></li>
								<li><a title="새창" target="_blank" href="http://www.cjculture.org/home/main.php">청주시문화산업진흥재단</a></li>
								<li><a title="새창" target="_blank" href="http://www.curs.or.kr">청주시도시재생지원센터</a></li>
								<li><a title="새창" target="_blank" href="http://www.cbmeditour.net">의료관광안내</a></li>
								<li><a title="새창" target="_blank" href="http://aml.cheongju.go.kr">농기계임대사업</a></li>
							</ul>
						</div>
						<button class="close"><img alt="사이트목록 닫기" src="/site/ac/images/common/site_link_close.gif"></button>
					</div>
				</div>
			</div>
		</div>
		<div class="wrap">
			<div class="footer_logo">청주시 로고</div>
			<div class="footer_wrap">
				<div class="footer_nav">
					<ul class="clearfix">
						<li><a href="http://www.cheongju.go.kr/www/contents.do?key=586" target="_blank" title="새창">저작권보호정책</a></li>
						<li><a href="http://www.cheongju.go.kr/www/contents.do?key=587" target="_blank" title="새창" class="privacy">개인정보처리방침</a></li>
						<li><a href="http://www.cheongju.go.kr/www/contents.do?key=593" target="_blank" title="새창">뷰어다운로드</a></li>
						<li><a href="http://www.cheongju.go.kr/www/contents.do?key=593" target="_blank" title="새창">행정전화번호부</a></li>
						<li><a href="/ac/sitemap.do?key=16295">사이트맵</a></li>
					</ul>
				</div>
				<div class="footer_info">
					<address>[28559] 충청북도 청주시 서원구 흥덕로 69 예술의 전당 &nbsp;&nbsp;<a href="/ac/contents.do?key=16301" target="_self">[찾아오시는길]</a>&nbsp;&nbsp;| 대표전화 : 043&ndash;201&ndash;2360</address>
					<p class="copyright">Copyright ⓒ 2017 CHEONGJU ART CENTER All RIGHTS RESERVED.</p>
					<p>본 웹사이트에 게시된 이메일 주소가 자동수집되는 것을 거부하며, 위반시 "정보통신망법"에 의해 처벌됨을 유념하시기 바랍니다.</p>
				</div>
			</div>
		<!-- 	<div class="mark">
				<ul class="clearfix">
					<li><img src="/site/ac/images/common/2015mark30.png" alt="2016년도 정부3.0 우수기관 인증" /></li>
					<li><img src="/site/ac/images/common/web_wa_img.png" alt="미래창조과학부 웹접근성 인증" /></li>
				</ul>
			</div> -->
		</div>
	</footer>