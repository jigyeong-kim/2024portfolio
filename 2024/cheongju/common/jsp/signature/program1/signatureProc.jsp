<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>
<%@ page import="kr.co.hanshinit.xwcms.cmm.util.DateUtil"%>
<%

	String name = (String)request.getParameter("name") != null ? (String)request.getParameter("name") : "";
	String address = (String)request.getParameter("address") != null ? (String)request.getParameter("address") : "";
	String tel = (String)request.getParameter("tel") != null ? (String)request.getParameter("tel") : "";
	
	
	String ResultFlag = "N";
	
	//값이 다 넘어왔을때만 등록
	if(!name.equals("") || !address.equals("") || !tel.equals("")) {
		//서명 등록
		Connection conn = null;                                        // null로 초기화 한다.
		PreparedStatement pstmt = null;

		try{
			
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

			String sql = "INSERT INTO SIGNATURE (SIGNATURE_NO, NAME, ADDRESS, TEL, RDATE) VALUES (SIGNATURE_NO_SEQ.NEXTVAL,?,?,?,?)";        // sql 쿼리
			pstmt = conn.prepareStatement(sql);                          // prepareStatement에서 해당 sql을 미리 컴파일한다.
			pstmt.setString(1, name);
			pstmt.setString(2, address);
			pstmt.setString(3, tel);
			pstmt.setString(4, DateUtil.getNowDateTime("yyyyMMddHHmmss"));

			pstmt.executeUpdate();                                        // 쿼리를 실행한다.
			
		} catch(Exception e) {                                                    // 예외가 발생하면 예외 상황을 처리한다.
			
			System.out.println("Connection Exception occurred");
		
		} finally {                                                            // 쿼리가 성공 또는 실패에 상관없이 사용한 자원을 해제 한다. (순서중요)
			
			if(pstmt != null) try{pstmt.close();}catch(SQLException sqle){}            // PreparedStatement 객체 해제
			if(conn != null) try{conn.close();}catch(SQLException sqle){}            // Connection 해제
			ResultFlag = "Y";
			
		}
	}

	String domainURL = request.getHeader("HOST") != null ? request.getHeader("HOST") : "www.cheongju.go.kr";
%>
<script type="text/javascript">
	var chk = "<%=ResultFlag%>";
	
	if(chk == "Y") {
		alert("참여해 주셔서 감사합니다.");
		location.href = "http://<%=domainURL%>/www/contents.do?key=7649&amp;complate=Y";
	} else {
		alert("처리중 오류가 있습니다.");
		location.href = "http://<%=domainURL%>/www/contents.do?key=7649";
	}
</script>

