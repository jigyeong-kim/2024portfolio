<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<script type="text/javascript">
var bookmarkURL = window.location.href;
var bookmarkTitle = document.title;
var imageUrl = location.protocol + "//" + location.host + ":" + location.port + "/site/www/images/sub/sub_visual.jpg";
var snsArray = new Array();
var bookmarkMsg = bookmarkTitle + " " + bookmarkURL;
snsArray['twitter'] = "http://twitter.com/home?status=" + encodeURIComponent(bookmarkTitle) + ' ' + encodeURIComponent(bookmarkURL);
snsArray['facebook'] = "http://www.facebook.com/share.php?u=" + encodeURIComponent(bookmarkURL);
snsArray['pinterest'] = "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(bookmarkURL) + "&media=" + image + "&description=" + encodeURIComponent(bookmarkTitle);
snsArray['band'] = "http://band.us/plugin/share?body=" + encodeURIComponent(bookmarkTitle) + "  " + encodeURIComponent(bookmarkURL) + "&route=" + encodeURIComponent(bookmarkURL);
snsArray['blog'] = "http://blog.naver.com/openapi/share?url=" + encodeURIComponent(bookmarkURL) + "&title=" + encodeURIComponent(bookmarkTitle);
snsArray['line'] = "http://line.me/R/msg/text/?" + encodeURIComponent(bookmarkTitle) + " " + encodeURIComponent(bookmarkURL);
snsArray['pholar'] = "http://www.pholar.co/spi/rephol?url=" + encodeURIComponent(bookmarkURL) + "&title=" + encodeURIComponent(bookmarkTitle);
snsArray['google'] = "https://plus.google.com/share?url=" + encodeURIComponent(bookmarkURL) + "&t=" + encodeURIComponent(bookmarkTitle);

//사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('d3f2cbf420b8af41c0d7e2dea06fc61b');

// 카카오톡 공유하기
function sendKakaoTalk()
{
	Kakao.Link.sendTalkLink({
	  label: bookmarkTitle,
	  image: {
	    src: imageUrl,
	    width: '300',
	    height: '200'
	  },
	  webButton: {
	    text: bookmarkTitle,
	    url: 'http://175.212.21.90:9200' // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
	  }
	});
}

// 카카오스토리 공유하기
function shareKakaoStory() {
  Kakao.Story.share({
    url: bookmarkURL,
    text: bookmarkTitle
  });
}



// send to SNS
function toSNS(sns) {
	if(sns == 'kakaoTalk') {
		sendKakaoTalk();
	}
	else if(sns == 'kakaoStory') {
		shareKakaoStory()
	}
	else {
    	window.open(snsArray[sns]);
	}
}


function addFavorite() {
	var triggerDefault = false;
	
	alert(bookmarkURL);
	
	if (window.sidebar && window.sidebar.addPanel) {
	    // Firefox version < 23
	    window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
	} else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
	    // Firefox version >= 23 and Opera Hotlist
	    var $this = $(this);
	    $this.attr('href', bookmarkURL);
	    $this.attr('title', bookmarkTitle);
	    $this.attr('rel', 'sidebar');
	    $this.off(e);
	    triggerDefault = true;
	} else if (window.external && ('AddFavorite' in window.external)) {
	    // IE Favorite
	    window.external.AddFavorite(bookmarkURL, bookmarkTitle);
	} else {
	    // WebKit - Safari/Chrome
	    alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
	}
	
	return triggerDefault;
}

function copyThisURL() {
	var IE=(document.all)?true:false;
	
	if (IE) {
		if(confirm("이 글의 주소를 클립보드에 복사하시겠습니까?"))
			window.clipboardData.setData("Text", bookmarkURL);
	} else {
		temp = prompt("이 글의 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", bookmarkURL);
	}
	
	return false;
}

function printThisPage(siteId) {
	url = '/common/deco/print.jsp?siteId='+ siteId;
	window.open(url,'print','toolbars=no, scrollbars=yes, width=840, height=800'); 
	return false;
}
</script>
