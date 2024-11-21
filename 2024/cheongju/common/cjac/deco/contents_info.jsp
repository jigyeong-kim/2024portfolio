<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="remote_addr"><%=request.getRemoteAddr()%></c:set>
<c:if test="${fn:startsWith(remote_addr, '192.168.0.') or fn:startsWith(remote_addr, '127.0.0.1') or fn:startsWith(remote_addr, '175.212.21.90')}">
<div id="contentsInfo">
  <p><span>ViewFile</span> : ${viewFile}</p>
</div>
</c:if>