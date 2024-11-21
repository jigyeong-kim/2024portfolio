console.log( 'sns.js' );
// default
var thisUrl = document.location.href;
var snsText = "";

function modalDisplay(visible) {
	if(visible) {
		$("#modal").css('visibility','visible');
	}
	else {
		$("#modal").css('visibility','hidden');
	}
}

//sns mobile Layer
function mobilePopupLayer(makeModal) {
	modalManager.setContents(makeModal, function(modalContent) {
		modalContent.setAttribute('style','width:550px;z-index:1000;');

		var title = document.createElement('h1');
		title.appendChild(document.createTextNode('공유하기'));
		modalContent.appendChild(title);

		var closeArea = document.createElement('div');
		closeArea.className = 'closeBtn';
		var closeBtn = document.createElement('a');
		closeBtn.href = '#';
		var closeImg = document.createElement('img');
		closeImg.src = "image/sns/mobile/pop_close_big.png";
		closeBtn.appendChild(closeImg);
		closeBtn.onclick = function() {
			modalDisplay(false);
		}
		closeArea.appendChild(closeBtn);
		modalContent.appendChild(closeArea);
	
		var snsIcon = ["facebook","twitter","kakao","band"];
		var snsArea = document.createElement('div');
		snsArea.className = 'snsArea';
		for(var i = 0; i < snsIcon.length; i++) {
			var snsBtn = document.createElement('a');
			snsBtn.href = '#';
			snsBtn.id = snsIcon[i];
			var snsImg = document.createElement('img');
			snsImg.src = "image/sns/mobile/icon_sns_" + snsIcon[i] + "_big.png";
			if(i == snsIcon.length-1) {
				snsImg.setAttribute('style','margin-right:0;');
			}
			if(snsIcon[i] === "kakao" && localSynap.properties.kakaoAPIKey === undefined) {
				continue;
			}
			snsBtn.appendChild(snsImg);
			snsArea.appendChild(snsBtn);
		}
		modalContent.appendChild(snsArea);

		var inputArea = document.createElement('div');
		inputArea.className = 'inputArea';
		var urlArea = document.createElement('input');
		urlArea.className = 'input1';
		urlArea.type = 'text';
		urlArea.value = thisUrl;
		urlArea.readOnly = true;
		urlArea.setAttribute('style','width:360px;');
		var urlBtn = document.createElement('a');
		urlBtn.href = '#';
		urlBtn.className = 'btn btnSt3 rBtn';
		
		if(BROWSER.MOBILE.isIOS() && BROWSER.VERSION.IOS() < 10) {
			urlBtn.appendChild(document.createTextNode('URL 선택'));
			urlBtn.onclick = function() {
				clipboardCopy(urlArea);
			}
		}
		else if(BROWSER.MOBILE.isAndroid() && BROWSER.VERSION.isAndroidJellyBean()) {
			urlArea.setAttribute('style','width:330px;padding:10px');
			urlBtn.setAttribute('style','width:120px;padding:auto;text-align:center;');
			urlBtn.appendChild(document.createTextNode('URL 복사 시 길게 누르세요'));
			urlBtn.setAttribute('onClick','return false;');
		}
		else {
			urlBtn.appendChild(document.createTextNode('URL 복사'));
			urlBtn.onclick = function() {
				clipboardCopy(urlArea);
			}
		}
		inputArea.appendChild(urlArea);
		inputArea.appendChild(urlBtn);
		modalContent.appendChild(inputArea);
	});
}

//sns desktop Layer
function desktopPopupLayer(makeModal) {
	modalManager.setContents(makeModal, function(modalContent) {
		modalContent.style.zIndex="1000";
		modalContent.style.width="350px";

		var title = document.createElement('h1');
		title.appendChild(document.createTextNode('공유하기'));
		modalContent.appendChild(title);

		var inputArea = document.createElement('div');
		inputArea.className = 'inputArea';
		var urlArea = document.createElement('input');
		urlArea.className = 'input1';
		urlArea.type = 'text';
		urlArea.value = thisUrl;
		urlArea.readOnly = true;
		urlArea.style.width="250px";
		var urlBtn = document.createElement('a');
		urlBtn.href = '#';
		urlBtn.className = 'btn btnSt3 rBtn';
		urlBtn.appendChild(document.createTextNode('URL 복사'));
		urlBtn.onclick = function() {
			clipboardCopy(urlArea);
		}
		inputArea.appendChild(urlArea);
		inputArea.appendChild(urlBtn);
		modalContent.appendChild(inputArea);

		var snsIcon = ["facebook","twitter","kakaostory","band"];
		var snsArea = document.createElement('div');
		snsArea.className = 'snsArea';
		for(var i = 0; i < snsIcon.length; i++) {
			var snsBtn = document.createElement('a');
			snsBtn.href = '#';
			snsBtn.id = snsIcon[i];
			var snsImg = document.createElement('img');
			snsImg.src = "image/sns/popup/btn_sns_" + snsIcon[i] + ".png";
			snsBtn.appendChild(snsImg);
			snsArea.appendChild(snsBtn);
		}
		modalContent.appendChild(snsArea);

		var btnArea = document.createElement('div');
		btnArea.className = 'btnArea';
		var closeBtn = document.createElement('a');
		closeBtn.href = '#';
		closeBtn.className = 'btn btnSt2';
		closeBtn.appendChild(document.createTextNode('닫기'));
		closeBtn.onclick = function() {
			modalDisplay(false);
		}
		btnArea.appendChild(closeBtn);
		modalContent.appendChild(btnArea);
	});
}

function alertNotSupport(version) {
	var notSupport = "해당 사이트는 더 이상 현재 브라우저를 지원하지 않을 수 있습니다.";
	if(version === 8) {
		alert(notSupport);
	}
}

//button event
function snsButtonEvent()
{
	$("#kakaostory").on("click", function() {
		sendSns("kakaostory", thisUrl, snsText);
	});

	$("#band").on("click", function() {
		sendSns("band", thisUrl, snsText);
	});

	$("#facebook").on("click", function() {
		sendSns("facebook", thisUrl, snsText);
	});

	$("#twitter").on("click", function() {
		sendSns("twitter", thisUrl, snsText);
	});

	$("#kakao").on("click", function() {
		sendSns("kakaotalk", thisUrl, snsText);
	});
}

//clipboard copy
function clipboardCopy(urlArea) {
	if(BROWSER.MOBILE.isIOS()) {
		var editable = urlArea.contentEditable;
		var readOnly = urlArea.readOnly;

		urlArea.contentEditable = true;
		urlArea.readOnly = false;

		var range = document.createRange();
		range.selectNodeContents(urlArea);

		var selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);

		urlArea.setSelectionRange(0, 999999);
		urlArea.contentEditable = editable;
		urlArea.readOnly = readOnly;
	}
	else {
		urlArea.select();
	}
	if(!(BROWSER.VERSION.IOS() < 10)) {
	    var successful = document.execCommand('copy');
	    if(successful) {
			alert("URL이 복사되었습니다.");
		}
	}
}

$(document).ready(function() {

	var makeModal = function() {
		var wrapTag = document.getElementById('wrap');
		var modal = document.createElement('div');
		modal.id='modal';
		wrapTag.appendChild(modal);
		return modal;
	};

	// MOBILE 공유 메뉴
	$("#snsMobileBtn").click(function() {
		if(!($("div").hasClass("popupM"))) {
			mobilePopupLayer(makeModal);
			snsButtonEvent();
		}
		else {
			modalDisplay(true);
		}
	});

	// PC 공유 메뉴
	$("#snsBtn").click(function() {
		if(!($("div").hasClass("popup"))) {
			desktopPopupLayer(makeModal);
			snsButtonEvent();
		}
		else {
			modalDisplay(true);
		}
	});

	sendSns = function(sns, url, txt) {
		if(BROWSER.isMobile() && localSynap.properties.kakaoAPIKey !== undefined) {
			try{
				Kakao.init(localSynap.properties.kakaoAPIKey);
			}catch(e){
			}
		}
		alertNotSupport(BROWSER.VERSION.IE());
		modalDisplay(false);
		var o;
		var _url = encodeURIComponent(url);
		var _txt = encodeURIComponent(txt);
		var _br  = encodeURIComponent("\r\n");

		switch (sns)
		{
			case "facebook":
				o = {
					method: "popup",
					url: "http://www.facebook.com/sharer/sharer.php?u=" + _url
				};
				break;
	 
			case "twitter":
				o = {
					method: "popup",
					url: "http://twitter.com/intent/tweet?text=" + _txt + "&url=" + _url
				};
				break;

			case "kakaostory":
				o = {
					method: "popup",
					url: "https://story.kakao.com/share?url=" + _url
				};
				break;
	 
			case "band":
				if (BROWSER.isMobile())
				{
					o = {
						method: "web2app",
						param: "bandapp://create/post?text=" + _txt + _br + _url,
						a_store: "itms-apps://itunes.apple.com/app/id542613198?mt=8",
						g_store: "market://details?id=com.nhn.android.band"
					};
				}
				else
				{
					o = {
						method: "popup",
						url: "http://www.band.us/plugin/share?body=" + _url
					};
				}
				break;

			case "kakaotalk":
				Kakao.Link.sendTalkLink({
					label: url
				});
				return true;
	 
			default:
				return false;
		}
	 
		switch (o.method)
		{
			case "popup":
				window.open(o.url);
				break;
	 
			case "web2app":
				if (BROWSER.MOBILE.isAndroid())
				{
					if(BROWSER.VERSION.Chrome()) {
						location.href = "intent:" + o.param + "#Intent;package=com.nhn.android.band;end;";
					}
					else {
						var iframe = document.createElement('iframe');
						iframe.style.display = 'none';
						iframe.src = o.param;
						document.body.appendChild(iframe);
						document.body.removeChild(iframe);
					}
				}
				else if (BROWSER.MOBILE.isIOS())
				{
					location.href = o.param;
				}
				else
				{
				}
				break;
		}
	}
});
