<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
							<form method="post" name="search" action="http://www.pcs21.net/search/search.jsp" target="POCHEON_SEARCH">	
								<fieldset>
									<legend>통합검색</legend>
									<input type="hidden"  name="startCount" value="0" />
									<input type="hidden"  name="sortField" value="RANK,1" />
									<input type="hidden" name="andQuery" value="" />
									<select id="search_list" name="collection"  title="검색 분야를 선택하세요">
										<option selected="selected" value="ALL">통합검색</option>
										<option value="dir">디렉토리</option>
										<option value="web">웹페이지</option>
										<option value="job">업무/직원</option>
										<option value="bbs">게시판</option>
										<option value="document">일반문서</option>
										<option value="form">민원서식</option>
										<option value="multimedia">멀티미디어</option>
									</select>
									<input type="text" name="query" id="query" title="검색어를 입력하세요" placeholder="검색어 입력" />
									<input type="submit" name="" value="검색" title="검색페이지 새창으로 열림" />
								</fieldset>
							</form>