<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*,
				java.sql.*,
				java.text.*,
				javax.servlet.http.*,
				java.util.*,
				javax.xml.parsers.DocumentBuilder,
				javax.xml.parsers.DocumentBuilderFactory,
				javax.xml.transform.OutputKeys,
				javax.xml.transform.Transformer,
				javax.xml.transform.TransformerFactory,
				javax.xml.transform.dom.DOMSource,
				javax.xml.transform.stream.StreamResult,
				org.w3c.dom.Document,
				org.w3c.dom.Element"
%>
<% 
	String rowNum = (String)request.getParameter("rowNum") != null ? (String)request.getParameter("rowNum") : "10";
	
	String DB_URL = "jdbc:cubrid:10.10.30.82:33000:cjcity:::?charset=utf-8"; //real
	String DB_USER = "dba"; // Account ID
	String DB_PWD  = "qwe123"; // Account PW
	
	Connection conn = null;
	PreparedStatement pstmt = null;
	ResultSet rs = null;

	StringBuffer sbQuery = new StringBuffer();
	
	try {
		Class.forName("cubrid.jdbc.driver.CUBRIDDriver"); //Cubrid

		conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PWD);
		String query = "";
		query =" SELECT ROWNUM RNUM " +
			 			",FIS_YEAR"+ 
			    		",FIS_FG_NM"+
   						",DEPT_NM"+
   						",PBIZ_NM"+
   						",UBIZ_NM"+
   						",DBIZ_NM"+
   						",SUBSD_BGT_FG_NM"+
   						",TO_NUMBER(NVL(NATN_CURR_AMT, 0)) AS NATN_CURR_AMT"+
   						",TO_NUMBER(NVL(SIDO_CURR_AMT, 0)) AS SIDO_CURR_AMT"+
   						",TO_NUMBER(NVL(SIGUNGU_CURR_AMT, 0)) AS SIGUNGU_CURR_AMT"+
   						",TO_NUMBER(NVL(EXPD_AMT, 0)) AS EXPD_AMT"+
   						",FLD_NM"+
   						",TO_NUMBER(NVL(COMPO_AMT, 0)) AS COMPO_AMT"+
   						",TO_NUMBER(NVL(FORWD_AMT, 0)) AS FORWD_AMT"+
   						",TO_NUMBER(NVL(CHNG_AMT, 0)) AS CHNG_AMT"+
   						",TO_NUMBER(NVL(ETC_AMT, 0)) AS ETC_AMT"+
			   	"FROM CJ_TECURRAMT ";
		
			//out.println(query);
			
				
			
			rs = pstmt.executeQuery();
			
			ResultSetMetaData rsmd = rs.getMetaData();
			int colCount = rsmd.getColumnCount();
			//out.println(colCount);
			int j=0; //total count
			
			while (rs.next()) {
				pstmt = conn.prepareStatement(query);
				pstmt.setString(1,rowNum);
				pstmt.setString(2,fisYear); 
				pstmt.setString(3,fisFg_Nm); 
				pstmt.setString(4,deptNm); 
				pstmt.setString(5,pbizNm); 
				pstmt.setString(7,ubizNm);
				pstmt.setString(8,dbizNm);
				pstmt.setString(9,subsdBgtFgNm); 
				pstmt.setString(10,natnCurrAmt); 
				pstmt.setString(11,sidoCurrAmt); 
				pstmt.setString(12,sigunguCurrAmt);
				pstmt.setString(13,expdAmt);
				pstmt.setString(14,compoAmt);
				pstmt.setString(15,forwdAmt);
				pstmt.setString(16,chngAmt); 
				pstmt.setString(17,etcAmt) 

			}

			<%= fisYear %> ,<%= fisFgNm %>, <%= deptNm %>
			
		
			/*DOMSource domSource = new DOMSource(doc);
			TransformerFactory tf = TransformerFactory.newInstance();
			Transformer transformer = tf.newTransformer();
			//transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
			transformer.setOutputProperty(OutputKeys.ENCODING, "EUC-KR");

		 	transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
			transformer.setOutputProperty(OutputKeys.METHOD, "xml");

			FileOutputStream fileOutStream = new FileOutputStream(new File(runpath + xmlsavefile));
			StreamResult result = new StreamResult(fileOutStream);
			transformer.transform(domSource, result); */

			rs.close();
			pstmt.close();
			conn.close();

			

		} catch (Exception e) {
			System.out.println("Connection Exception occurred");
		} finally {
			if(rs != null)    try { rs.close(); }     catch (SQLException e) { System.out.println("Connection Exception occurred"); }
			if(pstmt != null) try { pstmt.close(); }  catch (SQLException e) { System.out.println("Connection Exception occurred"); }
			if(conn != null)  try { conn.close(); }   catch (SQLException e) { System.out.println("Connection Exception occurred"); }
		}	
%>