<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.HashMap" %>
<%!

	public static Connection getConnectionEx() {

		Connection conn = null;
		
		try {
	
			Class.forName("oracle.jdbc.OracleDriver");
			String dbUrl = "jdbc:oracle:thin:@192.168.0.84:1521:orcl";
			String dbUser = "NEOCMS_RB";
			String dbPass = "NEOCMS_RB";
			conn = DriverManager.getConnection(dbUrl, dbUser, dbPass);
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return conn;
	
	}

	public static void releaseConnection(Connection conn) throws SQLException {
		conn.close();
	}
	
	public static HashMap<String, Integer> getSiteListWithWork(String menuNoList) throws SQLException {

      HashMap<String, Integer> result = new HashMap<String, Integer>();
		
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT SITE_ID, COUNT(MENU_NO) CNT ");
		sql.append("FROM TN_MENU ");
		sql.append("WHERE MENU_TY = 'MNTY02' AND MENU_SHOW_AT = 'Y' ");

      if( null != menuNoList && !"".equals(menuNoList) ) {
        sql.append(" AND MENU_NO NOT IN (").append(menuNoList).append(") ");
      }
		sql.append("GROUP BY SITE_ID ");

		Connection conn = null;
		Statement st = null;
		ResultSet rs = null; 
		
		try {
			
			conn = getConnectionEx();
			st = conn.createStatement();
			rs = st.executeQuery(sql.toString());
			
			while( rs.next() ) {
				
				String siteId = rs.getString("SITE_ID");
				Integer cnt = rs.getInt("CNT");
				
				result.put(siteId, cnt);
				
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			if( null != rs ) rs.close();
			if( null != st ) st.close();
			if( null != conn ) conn.close();
		}
		
		return result;
		
	}

	public static HashMap<Integer, String> getMenuListHidden(String siteId) throws SQLException {
		
		HashMap<Integer, String> result = new HashMap<Integer, String>();
		
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT ");
		sql.append("  MENU_NO ");
		sql.append("FROM ( ");
		sql.append("  SELECT  ");
		sql.append("    M1.MENU_NO, M1.MENU_NM, CASE WHEN M1.MENU_SHOW_AT IS NULL THEN 'Y' ELSE M1.MENU_SHOW_AT END M1_MENU_SHOW_AT, ");
		sql.append("    CASE WHEN M2.MENU_SHOW_AT IS NULL THEN 'Y' ELSE M2.MENU_SHOW_AT END M2_MENU_SHOW_AT, ");
		sql.append("    CASE WHEN M3.MENU_SHOW_AT IS NULL THEN 'Y' ELSE M3.MENU_SHOW_AT END M3_MENU_SHOW_AT, ");
		sql.append("    CASE WHEN M4.MENU_SHOW_AT IS NULL THEN 'Y' ELSE M4.MENU_SHOW_AT END M4_MENU_SHOW_AT, ");
		sql.append("    CASE WHEN M5.MENU_SHOW_AT IS NULL THEN 'Y' ELSE M5.MENU_SHOW_AT END M5_MENU_SHOW_AT, ");
		sql.append("    CASE WHEN M6.MENU_SHOW_AT IS NULL THEN 'Y' ELSE M6.MENU_SHOW_AT END M6_MENU_SHOW_AT ");
		sql.append("  FROM TN_MENU M1 ");
		sql.append("  LEFT JOIN TN_MENU M2 ON M1.UPPER_MENU_NO = M2.MENU_NO ");
		sql.append("  LEFT JOIN TN_MENU M3 ON M2.UPPER_MENU_NO = M3.MENU_NO ");
		sql.append("  LEFT JOIN TN_MENU M4 ON M3.UPPER_MENU_NO = M4.MENU_NO ");
		sql.append("  LEFT JOIN TN_MENU M5 ON M4.UPPER_MENU_NO = M5.MENU_NO ");
		sql.append("  LEFT JOIN TN_MENU M6 ON M5.UPPER_MENU_NO = M6.MENU_NO ");
		sql.append("  WHERE M1.SITE_ID = '").append(siteId).append("' ");
		sql.append(") WHERE M1_MENU_SHOW_AT = 'N' OR M2_MENU_SHOW_AT = 'N' OR M3_MENU_SHOW_AT = 'N' OR M4_MENU_SHOW_AT = 'N' OR M5_MENU_SHOW_AT = 'N' OR M6_MENU_SHOW_AT = 'N' ");
		
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null; 
		
		try {
			
			conn = getConnectionEx();
			st = conn.createStatement();
			rs = st.executeQuery(sql.toString());
			
			while( rs.next() ) {
				
				Integer meuNo = rs.getInt("MENU_NO");
				
				result.put(meuNo, "Y");
				
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			if( null != rs ) rs.close();
			if( null != st ) st.close();
			if( null != conn ) conn.close();
		}
		
		return result;
		
	}

%>