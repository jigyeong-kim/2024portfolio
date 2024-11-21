<%@ page session="false" contentType="text/html; charset=EUC-KR" %>
<%@ page import="java.net.*" %>
<%@ page import="java.io.*" %>
<%
	request.setCharacterEncoding("euc-kr");
	response.setContentType("text/html; charset=euc-kr");
%>
<%
String _url = request.getParameter("url");
String _sys = request.getParameter("sys");
String _key = request.getParameter("key");
String _loginId = request.getParameter("loginId");
String _ajxMode = request.getParameter("ajxMode");
String _value = request.getParameter("value");
String _stdItemCd = request.getParameter("stdItemCd");
String _stdItemNm = request.getParameter("stdItemNm");
String _stdSkillCd = request.getParameter("stdSkillCd");
String _metaNo = request.getParameter("metaNo");
String _currPage = request.getParameter("currPage");
String _sKey = request.getParameter("sKey");
String _sVal = request.getParameter("sVal");
String _sKey1 = request.getParameter("sKey1");
String _sKey2 = request.getParameter("sKey2");
String _sKey3 = request.getParameter("sKey3");
String _sKey4 = request.getParameter("sKey4");
String _sKey5 = request.getParameter("sKey5");
String _sKey6 = request.getParameter("sKey6");
String _sTcode = request.getParameter("sTcode");
String _ptoid = request.getParameter("ptoid");
String _obtain_id = request.getParameter("_obtain_id");
String _ccode =  request.getParameter("ccode");
String _mname = request.getParameter("mname");
String _srccode = request.getParameter("srccode");
String _KncrCode = request.getParameter("KncrCode");
String _seq = request.getParameter("seq");
String _workSysCd = request.getParameter("workSysCd");
String _datano  = request.getParameter("datano");

if(_ajxMode == null)   { _ajxMode = "";   }
if(_value == null)     { _value = "";     }
if(_stdItemCd == null) { _stdItemCd = ""; }
if(_stdSkillCd == null){ _stdSkillCd = "";}
if(_metaNo == null)    { _metaNo = "";    }
if(_currPage == null)  { _currPage = "1"; }
if(_sKey == null)      { _sKey = "";      }
if(_sKey1 == null)     { _sKey1 = "";     }
if(_sKey2 == null)     { _sKey2 = "";     }
if(_sKey3 == null)     { _sKey3 = "";     }
if(_sKey4 == null)     { _sKey4 = "";     } 
if(_sKey5 == null)     { _sKey5 = "";     }
if(_sKey6 == null)     { _sKey6 = "";     }
if(_sVal == null)      { _sVal = "";      }
if(_sTcode == null)    { _sTcode = "";    }
if(_ptoid == null)     { _ptoid = "";     }
if(_obtain_id == null) { _obtain_id = ""; }
if(_ccode == null)     { _ccode= "";      }
if(_seq == null)       { _seq = "";       }
if(_mname == null)     { _mname = "";     }
if(_stdItemNm == null) { _stdItemNm = ""; }
if(_srccode == null)   { _srccode = "";   }
if(_KncrCode == null)  { _KncrCode= "";   }
if(_workSysCd == null)  { _workSysCd= "";   }
if(_datano == null)  { _datano= "";   }

_url = _url + "?sys="+_sys+"&key="+_key+"&loginId="+_loginId;

if(_sys.equals("105010000000")){
	_url = _url + "&ajxMode="+_ajxMode + "&value="+_value + "&stdItemCd="+_stdItemCd + "&stdSkillCd="+_stdSkillCd+ "&metaNo="+_metaNo+ "&workSysCd="+_workSysCd;
}else if(_sys.equals("105020000000") || _sys.equals("105030000000")){
	
	_url = _url + "&seq="+_seq  + "&sTcode="+_sTcode+  "&ajxMode="+_ajxMode;
}else if(_sys.equals("105040000000")){
	
	_url = _url + "&sTcode="+_sTcode +  "&ptoid="+_ptoid + "&obtain_id="+_obtain_id+  "&ajxMode="+_ajxMode;
}
else if(_sys.equals("105050000000")){
	
	_url = _url + "&ccode="+_ccode+  "&ajxMode="+_ajxMode ;
}
else if(_sys.equals("105060000000")){
	
	_url = _url + "&stdItemCd="+_stdItemCd +  "&mname="+_mname +  "&stdItemNm="+_stdItemNm +  "&ajxMode="+_ajxMode;
}

else if(_sys.equals("105070000000")){
	
	_url = _url + "&sKey1="+_sKey1 +  "&ajxMode="+_ajxMode +"&sKey2="+_sKey2;
}

else if(_sys.equals("105080000000")){
	
	_url = _url + "&srccode="+_srccode +"&sKey1="+_sKey1 +"&sKey2="+_sKey2 +"&sKey3="+_sKey3 +"&sKey4="+_sKey4+ "&sKey5="+_sKey5+ "&sKey6="+_sKey6  + "&workSysCd="+_workSysCd + "&ajxMode="+_ajxMode ;
}
else if(_sys.equals("105090000000")){
	_url = _url + "&datano="+_datano +  "&ajxMode="+_ajxMode;
}
else if(_sys.equals("105120000000")){
	_url = _url + "&datano="+_datano +  "&ajxMode="+_ajxMode;
}
else if(_sys.equals("105110000000")){
	_url = _url + "&datano="+_datano +  "&ajxMode="+_ajxMode;
}
else if(_sys.equals("105130000000")){
	_url = _url + "&datano="+_datano +"&sKey1="+_sKey1 +"&sKey2="+_sKey2 +  "&ajxMode="+_ajxMode;
}
else if(_sys.equals("105140000000")){
	_url = _url + "&datano="+_datano +"&sKey1="+_sKey1 +"&sKey2="+_sKey2 +  "&ajxMode="+_ajxMode;
}
else if(_sys.equals("105150000000")){
	_url = _url + "&datano="+_datano +"&sKey1="+_sKey1 +"&sKey2="+_sKey2 +  "&ajxMode="+_ajxMode;
}
else if(_sys.equals("105160000000")){
	_url = _url + "&datano="+_datano +"&sKey1="+_sKey1 +"&sKey2="+_sKey2 +  "&ajxMode="+_ajxMode;
}
else if(_sys.equals("105170000000")){
	_url = _url + "&datano="+_datano +"&sKey1="+_sKey1 +"&sKey2="+_sKey2 + "&ajxMode="+_ajxMode;
}


_url = _url + "&currPage="+_currPage +"&sKey="+_sKey+"&sVal="+_sVal;


StringBuffer sb = new StringBuffer();

HttpURLConnection httpConn = null;
long start = System.currentTimeMillis();
try
{
    URL httpUrl = new URL(_url);
    
    URLConnection conn = httpUrl.openConnection();
    httpConn = (HttpURLConnection) conn;
    httpConn.connect();
    InputStream is = null;
    try
    {
        is = httpConn.getInputStream();
    }
    catch (Exception e)
    {
        throw e;
    }
    BufferedReader in = new BufferedReader(new InputStreamReader(is,"euc-kr"));
    String line = null;
    while ((line = in.readLine()) != null)
    {
        out.println(line + "\n");
		sb.append(line);
    }


}
finally
{
    if (httpConn != null)
        try
        {
            httpConn.disconnect();
        }
        catch (Exception e)
        {
        }
    }
    long end = System.currentTimeMillis();
%>
