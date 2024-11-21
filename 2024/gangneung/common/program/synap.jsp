<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="kr.co.hanshinit.NeoCMS.synap.convert.ConvertToHtml" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.FileMngUtil" %>
<%

    String webRootPath = FileMngUtil.getRealPath("/");

    String fileName = request.getParameter("fileName");
    String orgFileName = fileName;
    String filePath = "";

    int idx = fileName.lastIndexOf("/");
    filePath = fileName.substring(0, idx+1);
    fileName = fileName.substring(idx+1);
    
    String previewPath = "/DATA/preview/";
    
    Calendar cal = Calendar.getInstance();
    String dateString = String.format("%04d%02d", cal.get(Calendar.YEAR), cal.get(Calendar.MONTH)+1);

    ConvertToHtml cvt = new ConvertToHtml();
    String outputPath = cvt.makeMonthDir(webRootPath + previewPath);
    int outputValue = cvt.convertToHtml(webRootPath + filePath + fileName, outputPath, orgFileName.replaceAll("/","_"), 120000);

    if( 0 == outputValue ) {
        response.sendRedirect("/common/skin/doc.html?fn=" + orgFileName.replaceAll("/","_") + "&rs=" + previewPath + dateString + "/");
    } else {
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'"/>
    <title>변환 오류</title>
</head>
<body>
    변환중 오류가 발생하였습니다. <br/>
    ERROR_CODE : <%= outputValue %>
</body>
</html>
<%
    }
    
%>