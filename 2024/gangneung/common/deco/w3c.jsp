<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="remote_addr"><%=request.getRemoteAddr()%></c:set>
<c:if test="${fn:startsWith(remote_addr, '192.168.0.') or fn:startsWith(remote_addr, '127.0.0.1') or fn:startsWith(remote_addr, '210.183.92.66') or fn:startsWith(remote_addr, '175.212.21.90') or fn:startsWith(remote_addr, '0:0:0:0:0:0:0:1')}">
<div class="hanshin">
	<ul class="wrap">
		<li>View File Path : ${viewFile}</li>
		<li>Validator : <a href="//validator.w3.org/check?uri=referer" target="_blank" title="새창">HTML</a>&nbsp;
		<a href="//jigsaw.w3.org/css-validator/check/referer" target="css" title="새창">CSS</a></li>
	</ul>
</div>
</c:if>