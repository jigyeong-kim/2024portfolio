<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>
<%@ page import="kr.co.hanshinit.xwcms.cmm.util.DateUtil"%>
<%

	String xlsName = "signatureExcel";

	response.resetBuffer();
	//response.reset();
	response.setContentType("application/vnd.ms-excel");
	response.setHeader("ContentType","application/vnd.ms-excel; charset=UTF-8");
	response.setHeader("Content-Disposition", "attachment;filename=" + xlsName + "_"+ DateUtil.getNowDateTime("yyyyMMddHHmmss") + ".xls;"); 
	response.setHeader("Content-type", "file/unknown"); 
	response.setHeader("Content-Description:", "JAVA Generated Data"); 
	response.setHeader("Pragma","no-cache;");
	response.setHeader("Expires","-1");
	response.setHeader("Cache-Control","cache, must-revalidate");
	response.flushBuffer();

%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<title>WCMS Administrator</title>
</head>
<body>

		<table border="1">
		<tr>
			<th style="width:70px;">서명번호</th>
			<th style="width:150px;">성명</th>
			<th style="width:150px;">주소</th>
			<th style="width:110px;">서명일시</th>
		</tr>
<%

	//온라인 서명 리스트 추출
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;

	try{
		
		String signature_no = ""; //온라인서명 번호
		String name = ""; //성명
		String address = ""; //주소
		String rdate = ""; //서명일시
		
		
		//실섭
		String url = "jdbc:cubrid:10.10.30.82:34000:XWCMS:::?charset=UTF-8";
		String id = "dba";
		String pw = "qwe123";
		
		/*
		//테섭
		String url = "jdbc:cubrid:192.168.0.81:30000:XWCMS:::?charset=UTF-8";
		String id = "dba";
		String pw = "qwe123";
		*/
		Class.forName("cubrid.jdbc.driver.CUBRIDDriver");                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
		conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
		//동 리스트 쿼리
		String sql = "SELECT signature_no, name, address, rdate FROM signature ORDER BY signature_no desc";        // sql 쿼리
		stmt = conn.createStatement();
		rs = stmt.executeQuery(sql); //쿼리를 실행한다.
		
		while(rs.next()){
			signature_no = rs.getString("signature_no");
			name = rs.getString("name");
			address = rs.getString("address");
			rdate = rs.getString("rdate");

%>
		<tr>
			<td><%= signature_no %></td>
			<td><%= name %></td>
			<td><%= address %></td>
			<td style='mso-number-format:"\@";'><%= rdate %></td>
		</tr>
<%

		}

	} catch(Exception e) {                                                    // 예외가 발생하면 예외 상황을 처리한다.
		
		System.out.println("Connection Exception occurred");
	
	} finally {                                                            // 쿼리가 성공 또는 실패에 상관없이 사용한 자원을 해제 한다. (순서중요)

		if(stmt != null) try{stmt.close();}catch(SQLException sqle){}            // Statement 객체 해제
		if(conn != null) try{conn.close();}catch(SQLException sqle){}            // Connection 해제
		if(rs != null) try{rs.close();}catch(SQLException sqle){}                // ResultSet 해제

	}

%>
		</table>

</body>
</html>