<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%!
	public void saveFile(String contents, String filePath) throws Exception {
		
		try {
			java.io.FileOutputStream out = new java.io.FileOutputStream(filePath);
			java.io.OutputStreamWriter OSW = new java.io.OutputStreamWriter( out, "UTF-8" );
			OSW.write(contents);
			OSW.close();
		} catch(Exception e) {
			e.getStackTrace();
		}
	
	}
%>
<%

	String data = (String)request.getParameter("data");
	String siteId = (String)request.getParameter("siteId");

	saveFile(data, request.getRealPath("/DATA/menu/" + siteId + ".txt"));
	
%>