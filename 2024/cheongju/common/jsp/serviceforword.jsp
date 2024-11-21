<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="kr.co.hanshinit.xwcms.cmm.util.StringUtil" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="kr.co.hanshinit.xwcms.cmm.util.StringUtil" %>
<%@ page import="kr.co.hanshinit.xwcms.uat.sso.service.User" %>
<%@ page import="kr.co.hanshinit.xwcms.uat.sso.util.SSOUtil" %>

<%if(request.getRemoteAddr().equals("211.57.153.90") || request.getRemoteAddr().equals("211.57.153.98")
|| request.getRemoteAddr().equals("211.57.153.106")|| request.getRemoteAddr().equals("211.57.153.114")
|| request.getRemoteAddr().equals("175.212.21.90")|| request.getRemoteAddr().equals("10.10.20.14")){%>

<div class="cts_6027">
	<div class="cts_6027_box">
		<p class="cts_6027_p1">
			2015년 4월 1일부터<br />청주시청 및 산하기관 홈페이지<br />서비스개선요청은<br />
			<span>"한신정보기술 AS게시판"</span>을<br />
			이용해 주시기 바랍니다.
		</p>
		<p class="cts_6027_p2">
			아래 바로가기를 클릭하시면 해당 사이트로<br />바로 가실 수 있습니다.
		</p>
		<div>
			<!--<a class="cts_6027_btn01" href="http://service.hanshinit.co.kr/?code1=EB3HA4DL980Q9OX7U6XZH&code2=973GET9QURZ1CQRY51MW9" target="_blank" title="청주시청 AS게시판 새창">
				<span class="cts_6027_p3">청주시청 AS게시판 바로가기</span>
			</a>-->
			<a class="cts_6027_btn01" href="http://service.hanshinit.co.kr/?code1=EB4HA5DL090Q0OX8U7XZH&code2=084GET0QURZ2CQRY62MW0" target="_blank" title="청주시청 AS게시판 새창">
				<span class="cts_6027_p3">청주시청 AS게시판 바로가기</span>
			</a>
		</div>
		<div class="cts_6027_box2">
			<div>
				<a class="cts_6027_btn02" href="http://service.hanshinit.co.kr/?code1=URJYRKU1PPG7Q5EOBNDGY&code2=QOKWUAP6A8GIS78FLI2DQ" target="_blank" title="상당구청 AS게시판 새창">
					<span class="cts_6027_p4">상당구청(면동) AS게시판 바로가기</span>
				</a>
			</div>
			<div>
				<a class="cts_6027_btn02" href="http://service.hanshinit.co.kr/?code1=2ZR5YS29XXOEXDLVIULN5&code2=BPLDZ6658YTYJSS3571JT" target="_blank" title="서원구청 AS게시판 새창">
					<span class="cts_6027_p4">서원구청(면동) AS게시판 바로가기</span>
				</a>
			</div>
			<div>
				<a class="cts_6027_btn02" href="http://service.hanshinit.co.kr/?code1=74WA3X6E21TJ2HQ0NZPSA&code2=20W97M2JNKSU4JKRYUEP2" target="_blank" title="청원구청 AS게시판 새창">
					<span class="cts_6027_p4">청원구청(읍면동) AS게시판 바로가기</span>
				</a>
			</div>
			<div>
				<a class="cts_6027_btn02" href="http://service.hanshinit.co.kr/?code1=PMETMGPWKKB2L09J6I8BT&code2=ZC81NTUSWMHM7GFQTVP6H" target="_blank" title="흥덕구청 AS게시판 새창">
					<span class="cts_6027_p4">흥덕구청(읍면동) AS게시판 바로가기</span>
				</a>
			</div>
		</div>
		<div>
			<a class="cts_6027_btn03" href="http://service.hanshinit.co.kr/?code1=1YQ4YR18WWNEWCLVIUKN5&code2=XVR31HWDHENPZEFLSP9KX" target="_blank" title="청주시립도서관 AS게시판 새창">
				<span class="cts_6027_p5">청주시립도서관 AS게시판 바로가기</span>
			</a>
		</div>
	</div>
	<div>
		<p class="cts_6027_p6">이전 게시판 바로가기를 클릭하시면 2015년 3월 31일 이전 서비스개선 요청내역을 확인하실 수<br />있습니다.</p>
		<a class="cts_6027_btn04" href="http://www.cheongju.go.kr/www/selectBbsNttList.do?bbsNo=507&key=6027" target="_blank" title="이전 서비스개선요청 게시판 새창">
			<span class="cts_6027_p7">이전 게시판 바로가기</span>
		</a>
	</div>
</div>
<%}%>

