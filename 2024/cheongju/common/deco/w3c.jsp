<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="remote_addr"><%=request.getRemoteAddr()%></c:set>
<c:if test="${fn:startsWith(remote_addr, '192.168.0.') or fn:startsWith(remote_addr, '127.0.0.1') or fn:startsWith(remote_addr, '210.183.92.66')}">
<div class="clearfix">
    <a href="http://validator.w3.org/check/referer" target="xhtm" title="새창">xhtml</a>&nbsp;&nbsp;
    <a href="http://jigsaw.w3.org/css-validator/check/referer" target="css" title="새창">css</a>
</div>
</c:if>