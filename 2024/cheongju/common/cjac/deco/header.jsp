<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

	<header id="header">
		<div class="top_menu">
			<div class="wrap">
				<div class="accessibility">
					<ul class="clearfix">
						<li><a href="#container"><span>본문바로가기</span></a></li>
						<li><a href="http://www.cheongju.go.kr" title="새창" target="_blank">청주시청 바로가기</a></li>
					</ul>
				</div>
				<div class="top_right clearfix">
					<div class="util">
						<ul class="clearfix">
							<li><a href="https://www.facebook.com/cjartdreamteam" title="새창" target="_blank"><img src="/site/ac/images/common/ico_facebook.png" alt="facebook" /></a></li>
						</ul>
					</div>
					<div class="gnb">
						<ul class="celarfix">
							<li><a href="/ac/index.do">HOME</a></li>
							<c:if test="${empty user}">
								<li><a href="/ac/login.do">LOGIN</a></li>
							</c:if>
							<c:if test="${not empty user}">
								<li><a href="/ac/logout.do">LOGOUT</a></li>
								<c:if test="${'eovy' eq user.userId or 'yedang' eq user.userId}">
								<li><a href="/xwcms/index.do" target="_blank" title="새창">MANAGE</a></li>
								</c:if>
							</c:if>
							<li><a href="http://www.cheongju.go.kr/eac/index.do" target="_blank" title="새창">ENGLISH</a></li>
							<li class="last"><a href="/ac/sub.do?key=16295">SITEMAP</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="wrap">
			<h1 class="logo"><a href="/ac/index.do"><img src="/site/ac/images/common/logo.png" alt="청주예술의전당 로고" /></a></h1>
			<div class="search">
				<h2 class="skip">통합검색</h2>
				<div class="search_wrap clearfix">
					<script>
					function fn_search() {
						return $('#total_search').val() != '';
					}
					</script>
					<form onsubmit="return fn_search()" method="get" action="http://search.cheongju.go.kr/search.jsp" id="search" name="search" target="SEARCH_WINDOW">
						<fieldset>
							<legend>통합검색</legend>
							<input type="hidden" name="collection" value="ALL"/>
							<label for="total_search" class="skip">검색어 입력</label>
							<input type="search" name="query" id="total_search" class="total_search" placeholder="검색어를 입력해주세요." />
							<input type="submit" value="검색" class="search_submit" />
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</header>