/**
 * 
 */

var kakaoShareApiKey = "2b69ab816cb1e8e4e6d87199c1bbc478";

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
		error : function(err){
			alert('스크립트 로드  실패');
		},
        async: true
    });
};
$(function(){
	$.loadScript("https://developers.kakao.com/sdk/js/kakao.min.js", function(){
		Kakao.init(kakaoShareApiKey);
	});
});
/**
 * @param _url 카카오스토리에 링크할 url
 */
function openKakaoStory(){
	Kakao.Auth.login({
		success : function(oauth) {
			if (confirm("카카오스토리에 공유하시겠습니까?")) {
			// 로그인 성공시, API를 호출합니다.
				Kakao.API
						.request({
							url : '/v1/api/story/linkinfo',
							data : {
								url : window.location.href
							}
						})
						.then(function(res) {
							// 이전 API 호출이 성공한 경우 다음 API를 호출합니다.
							return Kakao.API.request({
								url : '/v1/api/story/post/link',
								data : {
									link_info : res
								}
							});
						})
						.then(function(res) {
							return Kakao.API.request({
								url : '/v1/api/story/mystory',
								data : {
									id : res.id
								}
							});
						})
						.then(
							function(res) {
								//alert(JSON.stringify(res));
								alert("성공적으로 등록하였습니다.");
							}, 
							function(err) {
								//alert(JSON.stringify(err));
								alert("등록에 실패했습니다.");
						});
			}
		},
		fail : function(err) {
			alert('요청이 실패했습니다.');
		}
	});
}

/**
 * 
 * @param txt 트위터 내용
 */
function openTwitter(txt){
	var _txt = encodeURIComponent(txt);
	var _url = encodeURIComponent(window.location.href);
	openWin2('https://twitter.com/intent/tweet?text='+_txt+'&url='+_url, '', 700, 300, 0, 0, 1, 1, 0, 0, 0, (screen.width/2), (screen.height/2), 1);
}


function openFacebook(){
	var _url = encodeURIComponent(window.location.href);
	openWin2('http://www.facebook.com/sharer/sharer.php?u=' + _url, '', 700, 300, 0, 0, 1, 1, 0, 0, 0, (screen.width/2), (screen.height/2), 1);
	
}

function openWin2(url, winname, width, height, tbar, mbar, sbar, loc, status, resizable, fscreen, left, top, cflag)
{
	if(cflag == 'yes' || cflag == 'y' || cflag == '1')
	{
		left = (window.screen.width - width ) / 2;
		top  = (window.screen.height- height) / 2;
	}

	opening_window = window.open(url, winname, 'width=' + width + ', height=' + height + ', toolbar=' + tbar + ', menubar=' + mbar + ', scrollbars=' + sbar + ', location=' + loc + ', status=' + status + ', resizable=' + resizable + ', fullscreen=' + fscreen + ', left=' + left + ', top=' + top);
	opening_window.focus();
}