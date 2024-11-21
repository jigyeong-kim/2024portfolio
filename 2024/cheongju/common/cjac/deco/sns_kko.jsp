<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.File"%>
<%@ page import="java.util.*"%>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page import="kr.co.hanshinit.xwcms.KakaoToken" %>
<%@ page import="kr.co.hanshinit.xwcms.KakaoMyStory" %>
<%@ page import="kr.co.hanshinit.xwcms.KakaoStoryMedia" %>
<%@ page import="kr.co.hanshinit.xwcms.FileMngUtil" %>
<%@ page import="kr.co.hanshinit.xwcms.HttpClientUtil" %>
<%@ page import="kr.co.hanshinit.xwcms.SiteInfo"%>
<%@ page import="kr.co.hanshinit.xwcms.service.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%
	SiteInfo siteInfo = (SiteInfo)request.getAttribute("_siteInfo");
	if(siteInfo != null) {
		String siteId = siteInfo.getSiteId();
		
		try {
			WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
			FileMngUtil fileMngUtil = (FileMngUtil)wac.getBean("FileMngUtil");
			String clientIdPath = fileMngUtil.realPath(request, "/DATA/sns/kakao/" + siteId + "_client_id.txt");
			String accessTokenPath = fileMngUtil.realPath(request, "/DATA/sns/kakao/" + siteId + "_access_token.txt");
			String refreshTokenPath = fileMngUtil.realPath(request, "/DATA/sns/kakao/" + siteId + "_refresh_token.txt");
			String clientId = null;
			String accessToken = null;
			String refreshToken = null;
			
			if(fileMngUtil.isExistsFile(clientIdPath) && fileMngUtil.isExistsFile(accessTokenPath) ) {
				clientId = StringUtils.trim(fileMngUtil.getFileContents(clientIdPath));
				accessToken = StringUtils.trim(fileMngUtil.getFileContents(accessTokenPath));
				
				if(fileMngUtil.isExistsFile(refreshTokenPath)) {
					refreshToken = StringUtils.trim(fileMngUtil.getFileContents(refreshTokenPath));
				}
				
				/*
				System.out.println("client_id = " + clientId);
				System.out.println("access_token = " + accessToken);
				System.out.println("refresh_token = " + refreshToken);
				*/
				
				if(clientId != null && accessToken != null) {
					if(refreshToken != null) {
						String refreshUrl = "https://kauth.kakao.com/oauth/token?grant_type=refresh_token&client_id=" + clientId + "&refresh_token=" + refreshToken;
						//System.out.println("refreshUrl = " + refreshUrl);
						String tokenString = HttpClientUtil.getResponseString(refreshUrl, "utf-8", 1000, 1000);
						
						ObjectMapper mapper = new ObjectMapper();
						KakaoToken token = mapper.readValue(tokenString, KakaoToken.class);

						if(token != null && token.getAccess_token() != null) {
							accessToken = token.getAccess_token();
							String refreshAccessTokenPath = fileMngUtil.realPath(request, "/DATA/sns/kakao/" + siteId + "_access_token.txt");
							fileMngUtil.saveFile(accessToken, refreshAccessTokenPath);
							
							if(token.getRefresh_token() != null) {
								refreshAccessTokenPath = fileMngUtil.realPath(request, "/DATA/sns/kakao/" + siteId + "_refresh_token.txt");
								refreshToken = token.getRefresh_token();
								fileMngUtil.saveFile(refreshToken, refreshAccessTokenPath);
							}				
						}						
						
					}
				
					String myStoriesUrl = "https://kapi.kakao.com/v1/api/story/mystories?client_id="+clientId+"&access_token="+accessToken;
					String myStoriesConts = HttpClientUtil.getResponseString(myStoriesUrl, "utf-8", 1000, 1000);
					
					//System.out.println("myStoriesConts = " + myStoriesConts);
					
					String pictureUrlNm = "media small";
					String dateNm = "created_at";
					String descriptionNm = "content";
					String urlNm = "url";
					String likesNm = "like_count";

					HashMap<String, List<String>> hash = SnsDataUtil.parseData(myStoriesConts, null, pictureUrlNm, dateNm, descriptionNm, urlNm, likesNm);
					List<ISnsData> rtnList = SnsDataUtil.commonMatchData(hash, pictureUrlNm, dateNm, descriptionNm,likesNm, SnsType.kakaoStory);
					
					
					
					int pos = 0;
					for (ISnsData iSnsData : rtnList) {
						iSnsData.process(hash,pos++);	
						iSnsData.setContents(StringUtils.replace(StringUtils.replace(iSnsData.getContents(), "&nbsp;", " "), "\n", " "));
						//System.out.println(iSnsData.getDate() + ":" + iSnsData.getImageUrl() + iSnsData.getContents());
					}					
					request.setAttribute("kakaoList", rtnList);					
				}				
			}
		}
		catch(Exception e) {
			System.out.println("Connection Exception occurred");
		}	
		
		
%>
				<ul class="sns_share clearfix">
					<li class="kakao_story"><a href="" title="카카오스토리" target="_blank"><img src="/site/${siteInfo.siteId}/images/main/kakao_story.gif" alt="카카오스토리" /></a></li>
				</ul>
				<div class="cont">
					<c:forEach var="s" items="${kakaoList}">
					<c:if test="${not empty s.contents}">
					<div class="date">
						<p>${s.date}</p>
					</div>
					<p><c:out value="${tsu:cutString(s.contents, 300, '...')}" escapeXml="false"/></p>
					</c:if>
					</c:forEach>
				</div>
<%
	}
%>