<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

	<header id="header">
		<div class="top_menu">
			<div class="wrap">
				<div class="accessibility">
					<ul class="clearfix">
						<li><a href="/eac/index.do"><span>Home</span></a></li>
						<li><a href="http://www.cheongju.go.kr" title="new" target="_blank">Cheongju City Hall</a></li>
					</ul>			
				</div>
				<div class="top_right clearfix">
					<div class="util">
						<ul class="clearfix">
							<li><a href="https://www.facebook.com/cjartdreamteam/" title="new" target="_blank"><img src="/site/eac/images/common/ico_facebook.png" alt="facebook" /></a></li>
						</ul>
					</div>
					<div class="gnb">
						<ul class="celarfix">
							<li><a href="/eac/index.do">HOME</a></li>
							<li><a href="http://www.cheongju.go.kr/ac/index.do">KOREA</a></li>
							<!-- <li class="last"><a href="">SITEMAP</a></li>-->
						</ul>
					</div>
				</div>
			</div>
		</div>	
		<div class="wrap">
			<h1 class="logo"><a href="http://www.cheongju.go.kr/eac/index.do"><img src="/site/eac/images/common/logo.png" alt="Cheongju Arts Center LOGO" /></a></h1>
			<div class="search">
				<h2 class="skip">Search</h2>
				<div class="search_wrap clearfix">
					<script>
					function fn_search() {
						return $('#total_search').val() != '';
					}
					</script>
					<form onsubmit="return fn_search()" method="get" action="http://search.cheongju.go.kr/search.jsp" id="search" name="search" target="SEARCH_WINDOW">
						<fieldset>
							<legend>Search</legend>
							<input type="hidden" name="collection" value="ALL">
							<label for="total_search" class="skip">Input Search Word</label>
							<input type="search" name="query" id="total_search" class="total_search" placeholder="Please enter a search term.">
							<input type="submit" value="search" class="search_submit">
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</header>