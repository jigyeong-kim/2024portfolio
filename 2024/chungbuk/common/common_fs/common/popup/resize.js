var addHeight = 0;
var addWidth = 0;

if (navigator.appName == "Microsoft Internet Explorer") {
    //ie
    if (navigator.appVersion.indexOf("MSIE 6.0") != -1) {
        addHeight = 74;
        addWidth = 20;
    } else if (navigator.appVersion.indexOf("MSIE 7.0") != -1) {
        addHeight = 95;
        addWidth = 20;
	} else if (navigator.appVersion.indexOf("MSIE 8.0") != -1) {
        addHeight = 95;
        addWidth = 20;
	} else if (navigator.appVersion.indexOf("MSIE 9.0") != -1) {
        addHeight = 106;
        addWidth = 20;
	}
} else if (navigator.appName == "Opera") {
	// opera
    addHeight = 52;
    addWidth = 9;
} else if (navigator.appName == "Netscape") {
    if (navigator.appVersion.indexOf("Safari") != -1) {
        addHeight = 82;
        addWidth = 0;
    } else {
        // ff
        addHeight = 87;
        addWidth = 8;
    }

}

var ds;
var positions;
function popup_resize(po) {
	positions = po;
    ds = new DocumentSizeObserver(document, list_onload, "ds");
}

function DocumentSizeObserver(document, eventFunc, instanceName){
    this.document = document;
    this.limit = 10;
    this.wf = false; // width 완료 여부
    this.hf = false; // height 완료 여부
    this.prew = 0; // 이전 주기의 width
    this.preh = 0; // 이전 주기의 width
    this.check = checkDocumentSize; // resize 메소드. SetInterval에 의해 주기적 호출
    this.execute = eventFunc; // 렌더링 완료 판단 후 호출
    this.instanceName = instanceName;

    setTimeout(this.instanceName + '.check()', 100);
}

function list_onload(width, height)
{
	try {
		window.resizeTo(width+addWidth, height+addHeight);
		var moveWidth = 0;
		var moveHeight = 10;
		var tmpHeight  = 0;
		for(i = 0; i < positions; i++) {
			if(opener.popList[i]) {
				moveWidth += opener.popList[i].document.body.scrollWidth+10;

				if(opener.popList[i].document.body.scrollHeight > tmpHeight) {
					tmpHeight = opener.popList[i].document.body.scrollHeight;
				}
			}

			if(Number(moveWidth + $('#cnt_popup').width()) > opener.document.body.scrollWidth) {
				moveWidth = 0;
				moveHeight += (tmpHeight + 10) / 2;
			}
			window.moveTo(moveWidth, moveHeight);
		}

	}
	catch(e)
	{
		//alert(e);
	}
}

function checkDocumentSize(){
    // 윈도우가 완전히 렌더링 되어 사이즈가 고정될때까지
    if (this.limit-- <= 0) {
        // 더이상 기다리지 않고, 마지막에 읽은 크기 전달
        this.execute(this.prew, this.preh);
        return;
    }
    var cw = document.documentElement.scrollWidth;
    var ch = document.documentElement.scrollHeight;
    var dw = cw - this.prew;
    var dh = ch - this.preh;

    this.prew = cw;
    this.preh = ch;

    if (cw > 0 && dw == 0)
        this.wf = true;
    if (ch > 0 && dh == 0)
        this.hf = true;

    if (this.wf && this.hf)
        this.execute(cw, ch);
    else
        setTimeout(this.instanceName + '.check()', 100);
}
