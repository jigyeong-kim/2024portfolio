/****************************************************/
var CSLI_SVR_Addr = "http://trans.suwon.go.kr:7000";
var CSLI_WEB   = "/etgistart/";
var CSLI_TRANS = "/etgitrans/";
var CSLI_AUTH  = "/etgiauth/";
var CSLI_JSON_ID;
var CSLI_JSON_RES;
var CSLI_WIN_ID = "init";
/****************************************************/
function CSLI_Trim(V)
{
	V=V.replace("․",". ");
	V=V.replace(/󰏚/g,"□");
	V=V.replace("&#8228;",". ");
	V=V.replace(/∙/g,"·");
	V=V.replace(/•/g,"·");
	V=V.replace(/(\r\n|\n|\r)/g," ");
	V=V.replace(/^\s+|\s+$/g,"");
	return V.replace(/\u00a0/g," ");

}
function CSLI_INSERT() {
	if ( (typeof CSLI_AUTH_KEY) === 'undefined' ) {
		var script = document.createElement('script');
		script.setAttribute('src', CSLI_SVR_Addr+CSLI_AUTH);
		document.getElementsByTagName("head")[0].appendChild(script);
	}
}
function CSLI_CHECK_KEY() {
	if( CSLI_WIN_ID != "init") {
		if( CSLI_WIN_ID.closed == false)
		        CSLI_WIN_ID.close();
	}
	if ( (typeof CSLI_AUTH_KEY) === 'undefined' ) {
		alert('Authentication key can not be found!');
		return false;
	}

	if ( CSLI_AUTH_KEY == 'error' ) {
		alert('Translation System Error!');
		return false;
	}
	else if ( CSLI_AUTH_KEY == 'invalid' ) {
		alert('Unusual approach!');
		return false;
	}
	else if ( CSLI_AUTH_KEY == 'authfail' ) {
		alert('An unregistered domain!');
		return false;
	}
	return true;
}
/****************************************************/
function CSLI_WEBTRANS_GO(ReqURL, Engine, Flag, PDOpt, UDOpt, TargetWin)
{
	//'www.yahoo.co.jp', k2j/j2k/e2k/k2e, default/nourl/nomenu, 'GN', 'new')
	if ( (typeof CSLI_AUTH_KEY) === 'undefined' ) {
		setTimeout(function() { CSLI_WEBTRANS_GO(ReqURL, Engine, Flag, PDOpt, UDOpt, TargetWin) }, 200);
		return;
	}

	if ( CSLI_CHECK_KEY() == false ) return;

	ReqURL = CSLI_Trim(ReqURL);
	LCReqURL = ReqURL.toLowerCase();

	if ( LCReqURL.substring(0,8) == 'https://' ) {}
	else if ( LCReqURL.substring(0,7) == 'http://' ) {}
	else if ( ReqURL == "empty" ) {}
	else {
		ReqURL = 'http://' + ReqURL;
	}

	if ( ReqURL.length < 1 ) return;

	Jump_URL = CSLI_SVR_Addr + CSLI_WEB + "key="+CSLI_AUTH_KEY+"&engine="+Engine+"&flag="+Flag+"&pdopt="+PDOpt+"&udopt="+UDOpt+"&url=" + ReqURL;

	if (TargetWin == "new") {
		CSLI_WIN_ID = window.open(Jump_URL, "WebTrans", "");
		//CSLI_WIN_ID.document.write('<script type="text/javascript">top.location.href="'+Jump_URL+'";</script>');
		//NWin.window.focus();
	}
	else if(TargetWin == "top")
		top.location.href = Jump_URL;
	else
		location.href = Jump_URL;
}
/*= eTGi 2.5 =*/
function CSLI_ETGI_TRANS() {
	ReqURL = "empty";
	Engine = "k2j";
	Flag   = "web_0";
	PDOpt  = "UDSS";
	UDOpt  = "UserDict";
	TargetWin = "new";

	for (var i=0; i<arguments.length; i++) {
		if ( i == 0 ) ReqURL = arguments[i];
		else if ( i == 1 ) Engine = arguments[i];
		else if ( i == 2 ) Flag = arguments[i];
		else if ( i == 3 ) PDOpt = arguments[i];
		else if ( i == 4 ) UDOpt = arguments[i];
		else if ( i == 5 ) TargetWin = arguments[i];
	}

	if ( Flag == 'notrans' ) {
		document.write('<script type="text/javascript">top.lo'+'cation.href="http://'+ReqURL+'";</script>');
	}
	else {
		CSLI_INSERT();
		CSLI_WEBTRANS_GO(ReqURL, Engine, Flag, PDOpt, UDOpt, TargetWin);
	}
}
/*= eTGi 2.5 remove popup block =*/
function CSLI_ETGI_DTRANS() {
	ReqURL = "empty";
	Engine = "ktj";
	Flag   = "web_0";
	PDOpt  = "UDSS";
	UDOpt  = "UserDict";
	TargetWin = "top";

	for (var i=0; i<arguments.length; i++) {
		if ( i == 0 ) ReqURL = arguments[i];
		else if ( i == 1 ) Engine = arguments[i];
		else if ( i == 2 ) Flag = arguments[i];
		else if ( i == 3 ) PDOpt = arguments[i];
		else if ( i == 4 ) UDOpt = arguments[i];
		else if ( i == 5 ) TargetWin = arguments[i];
	}

	if ( Flag == 'notrans' ) {
		document.write('<script type="text/javascript">top.lo'+'cation.href="http://'+ReqURL+'";</script>');
	}
	else {
		CSLI_INSERT();
		CSLI_WEBTRANS_GO(ReqURL, Engine, Flag, PDOpt, UDOpt, TargetWin);
	}
}