<%@ page language = "java" contentType = "text/html; charset=utf-8"%>
<%@ include file="/common/deco/aescipher.jsp" %>
<%
	String llnm = "realName";
	String lldi = "dupInfo";
	
	String cipherStr = encrypt(llnm+"|"+lldi);
%>
<%=cipherStr%>