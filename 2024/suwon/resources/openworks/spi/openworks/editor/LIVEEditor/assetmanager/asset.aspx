﻿<%@ Page Language="VB" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="jqueryFileTree/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="jqueryFileTree/jqueryFileTree.js" type="text/javascript"></script>
    <link href="jqueryFileTree/jqueryFileTree.css" rel="stylesheet" type="text/css" />
    <script language="javascript" type="text/javascript">
        $(document).ready(function () {
            $('#container_id').fileTree({
                root: '/images/',
                script: 'jqueryFileTree/jqueryFileTree.aspx',
                expandSpeed: 500,
                collapseSpeed: 500,
                multiFolder: false
            }, function (file) {
                /*alert(file);*/
                parent.fileclick(file); 
            });
        });
    </script>
</head>
<body style="margin:0px;background:#ffffff">
    <form id="form1" runat="server">

<%--    <div style="padding:15px;background:#fcfcfc">
    Delete | Add Folder | Upload
    </div>--%>
    <div id="container_id" style="padding:15px"></div>
    
    </form>
</body>
</html>
