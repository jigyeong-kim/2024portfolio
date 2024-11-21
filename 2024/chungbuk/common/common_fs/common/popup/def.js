$(document).ready(function() {

	setPosition();
	window.focus();

});
function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
function closeWin() {
	setCookie( "pop_" + key, "done" , 1);
	self.close();
}

function setPosition() {
	var moveWidth  = 0;
	var moveHeight = 10;
	var tmpHeight  = 0;

	if(autoAt == 'Y') {
		popup_resize(posNum);
		for(i=1; i<posNum; i++) {
			if(opener.popList[i]) {
				moveWidth += opener.popList[i].document.body.scrollWidth + 10;
				if(opener.popList[i].document.body.scrollHeight > tmpHeight) {
					tmpHeight = opener.popList[i].document.body.scrollHeight;
				}
			}
		}

		if(Number(moveWidth + $('#cnt_popup').width()) > opener.document.body.scrollWidth) {
			moveWidth = 0;
			moveHeight += (tmpHeight + 10) / 2;
		}

		window.moveTo(moveWidth, moveHeight);
	}

	if(document.documentElement.scrollHeight > screen.height) {
		window.document.body.scroll = "yes";
	}
}