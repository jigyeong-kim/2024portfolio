<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Collections" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@	page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="egovframework.com.cmm.LoginVO" %>
<%@ page import="kr.co.hanshinit.xwcms.SearchCriteria" %>
<%@ page import="kr.co.hanshinit.xwcms.HtmlUtil"%>
<%@ page import="kr.co.hanshinit.xwcms.SessionUtil"%>
<%@ page import="kr.co.hanshinit.xwcms.DateUtil" %>
<%@ page import="kr.co.hanshinit.xwcms.SiteInfo"%>
<%@ page import="kr.co.hanshinit.xwcms.PopupItemService" %>
<%@ page import="kr.co.hanshinit.xwcms.PopupItemVO" %>
<%@ page import="kr.co.hanshinit.xwcms.SearchCriteria" %>
<%
if(request.getAttribute("popupItemList") == null) {
	LoginVO loginVO = (LoginVO)session.getAttribute("loginVO");
	SiteInfo siteInfo = (SiteInfo)request.getAttribute("_siteInfo");
	WebApplicationContext wac = null;
	try {
		wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
		String siteId = siteInfo.getSiteId();

		out.println("<!--" + siteId + "-->");
		//팝업
		PopupItemService popupItemService = (PopupItemService)wac.getBean("popupItemService");
		List<PopupItemVO> popupItemList = popupItemService.selectPopupItemList(siteId, "always");
		// 메인팝업
		String userSe = SessionUtil.getCurrentLoginSe(request.getSession());
		if(userSe == null) {
			userSe = "N";
		}
		userSe = ","+userSe+",";
		for( int LoopI=popupItemList.size()-1; LoopI>-1; LoopI-- ) {
			String auth = "," + popupItemList.get(LoopI).getAuthor() + ",";
			if(auth.indexOf(",N,") < 0 && auth.indexOf(userSe) < 0) {
				popupItemList.remove(LoopI);
			}
			//권한에 맞는게 없으면 리스트에서 제거한다.
		}
		request.setAttribute("popupItemList", popupItemList);
	}
	catch(Exception e) {

	}
}
%>
<%--<div class="layer_popup">
	<div class="wrap">
		<div class="popup1" style="width:500px; hedight:400px; left:100px; top:100px;">
			<a href="#n">
				<img src="/DATA/portlet-repositories/images/1501467982013.jpg" alt="" />
			</a>
			<div class="popup_close clearfix">
				<div class="popup_close_left">
					<input type="checkbox" name="today_close1" id="today_close1" value="checkbox" />
					<label for="today_close1">오늘하루동안보지않기</label>
				</div>
				<div class="popup_close_right">
					<button type="button" onclick="closePopup1();">닫기</button>
				</div>
			</div>
		</div>
	</div>
</div>--%>
<c:if test="${fn:length(popupItemList) gt 0}">
<div class="layer_popup">
	<div class="wrap">
	<c:set var="sNumber" value="1"/>
	<c:forEach items="${popupItemList}" var="popupItem">
		<c:choose>
			<c:when test="${popupItem.type eq 'window'}">
				<script type="text/javascript">
				//<![CDATA[
					if(Kit.browser.cookie.get("popup${sNumber}") != "done") {
						window.open('/common/popup.jsp?link=<c:out value="${popupItem.linkUrl}"/>&target=<c:out value="${popupItem.linkTrget}"/>&num=<c:out value="${sNumber}"/>&pitem=<c:out value="${popupItem.popupIemNo}"/>&img=<c:out value="${popupItem.imageFileNm}"/>&width=<c:out value="${popupItem.popupw}"/>&height=<c:out value="${popupItem.popuph}"/>','spop${sNumber}','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no, width=${popupItem.popupw}px,height=${popupItem.popuph+35 }px, left=${popupItem.popupx }px, top=${popupItem.popupy }px');
					}
				//]]>
				</script>
			</c:when>
			<c:otherwise>
				<div class="popup${sNumber}" style="left:${popupItem.popupx}px; top:${popupItem.popupy}px;">
					<a <c:if test="${popupItem.popupMaxHeight gt 0}"> style="max-height:${popupItem.popupMaxHeight}px;" </c:if> href="${popupItem.linkUrl}" target="${popupItem.linkTrget}"<c:if test="${popupItem.linkTrget eq '_blank'}"> title="새창"</c:if>><img style="width:${popupItem.popupw}px; height:${popupItem.popuph}px;" src="/DATA/popup/${popupItem.imageFileNm}" alt="${popupItem.imageReplcText}" /></a>
					<div class="popup_close clearfix">
						<div class="popup_close_left">
							<input type="checkbox" name="today_close${sNumber}" id="today_close${sNumber}" value="checkbox" />
							<label for="today_close${sNumber}">오늘하루동안보지않기</label>
						</div>
						<div class="popup_close_right">
							<button type="button" onclick="closePopup${sNumber}();">닫기</button>
						</div>
					</div>
				</div>
				<script type="text/javascript">
				//<![CDATA[
					function closePopup${sNumber}() {
						if($("#today_close${sNumber}").is(":checked")) {
							Kit.browser.cookie.set("popup${sNumber}", "done" , 1);
						}

						$('.popup${sNumber}').hide();
					}

					if(Kit.browser.cookie.get("popup${sNumber}") == "done") {
						$('.popup${sNumber}').hide();
					}else{
						$('.popup${sNumber}').show();
					}
				//]]>
				</script>
			</c:otherwise>

		</c:choose>

	<c:set var="sNumber" value="${sNumber+1}"/>
	</c:forEach>
	</div>
</div>
</c:if>