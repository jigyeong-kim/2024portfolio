$(document).ready(function(){
    $('.p-comment__share_wrap, #su_table_btn_area2').hide();
    $('#subShareUrlText').val(subShareUrlConvert(document.location.href));
    try{
        var ksjs = document.createElement('script');
        ksjs.src = '//developers.kakao.com/sdk/js/kakao.min.js';
        ksjs.type = 'text/javascript';
        $('head').append(ksjs);
    }catch(e){
        if(console){console.log('kakao init error');}
    }
});
function subShareUrlConvert(url){
    if(url != null && url != ''){
        if(url.indexOf('BD_board.view.do') > -1){
            var returnUrl = '';
            var targetParam = {};
            var sourceParam = ['bbsCd', 'seq'];
            for(var i = 0; i < sourceParam.length; i++){
                var name = sourceParam[i];
                name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                results = regex.exec(url);
                if(results === null){
                    targetParam[name] = '';
                }else{
                    targetParam[name] = decodeURIComponent(results[1].replace(/\+/g, ''));
                }
            }
            if(url.indexOf('?') > -1){
                returnUrl = url.substring(0, url.indexOf('?'));
            }else{
                returnUrl = url;
            }
            returnUrl += '?bbsCd=' + targetParam.bbsCd + '&seq=' + targetParam.seq;
            return returnUrl;
        }
    }
    return url;
}
function subShareToTwitter(obj) {
    var _msg = document.title;
    var _url = $(location).attr('href');
    _url = subShareUrlConvert(_url);
    var href = "http://twitter.com/home?status=" + encodeURIComponent(_msg) + " " + encodeURIComponent(_url);
    var a = window.open(href, 'twitter', '');
    if ( a ) {
        a.focus();
    }
}
function subShareToFaceBook(obj) {
    var _msg = document.title;
    var _url = $(location).attr('href');
    _url = subShareUrlConvert(_url);
    //var href = "http://www.facebook.com/sharer.php?v=4&src=bm&u=" + url + "&t=" + encodeURIComponent(msg);
    var href = "http://www.facebook.com/sharer/sharer.php?t=" + encodeURIComponent(_msg) + "&u=" + encodeURIComponent(_url);
    var a = window.open(href, 'facebookPopup', '');
    if ( a ) {
        a.focus();
    }
}
/*function subShareToKakaoStory(obj) {
    var _msg = document.title;
    var _url = $(location).attr('href');
    _url = subShareUrlConvert(_url);
    try{
        Kakao.init('0bda7a6fc2e50f102c9b02003b70968a');
    }catch(e){
        if(console){console.log('kakao init error');}
    }
    Kakao.Story.share({
        url: _url,
        text: _msg
    });
}*/
function subShareToKakaoTalk(obj) {
    var _msg = document.title;
    var _url = $(location).attr('href');
    _url = subShareUrlConvert(_url);
    try{
        Kakao.init('0bda7a6fc2e50f102c9b02003b70968a');
    }catch(e){
        if(console){console.log('kakao init error');}
    }
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: _msg,
            description: '',
            imageUrl: 'https://www.suwon.go.kr/resources/web/www_new/img/new_common/share_logo.png',
            //imageUrl: 'https://k.kakaocdn.net/dn/bVdj94/btqJxbDsIIR/YHgYsvkgDRXKSs1OktRUA1/kakaolink40_original.png',
            link: {
                mobileWebUrl: _url,
                webUrl: _url
            }
        }
    });
}
function subShareToLink(obj) {
    if($('#clip_target').length < 1){
        $('#clip_target').closest('div').remove();
        var html = '<div style="position:absolute;width:1px;height:1px;overflow:hidden;font-size:1px;line-height:1;opacity:0;"><label for="clip_target">복사된 URL</label><input id="clip_target" type="text" value="" /></div>';
        $(obj).append(html);
    }

    var input_clip = document.getElementById('clip_target');
    var _url = $(location).attr('href');
    _url = subShareUrlConvert(_url);
    $('#clip_target').val(_url);

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        var editable = input_clip.contentEditable;
        var readOnly = input_clip.readOnly;

        input_clip.contentEditable = true;
        input_clip.readOnly = false;

        var range = document.createRange();
        range.selectNodeContents(input_clip);

        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        input_clip.setSelectionRange(0, 999999);

        input_clip.contentEditable = editable;
        input_clip.readOnly = readOnly;
    } else {
        input_clip.select();
    }
    try {
        var successful = document.execCommand('copy');
        input_clip.blur();
        if (successful) {
            alert('URL이 복사 되었습니다. 원하시는 곳에 붙여넣기 해 주세요.');
        } else {
            alert('이 브라우저는 지원하지 않습니다.');
        }
    } catch (err) {
        alert('이 브라우저는 지원하지 않습니다.');
    }
}
function subShareToPrint(){
    window.print();
}
function subShareToPrint2(){
    var $contents = $('#contents'),
    ContentsClass = $contents.attr('class');
    let $head = $('head').clone();
    let $contentsClone = $('#contents').clone();    // 프린트 할 특정 영역 복사
    
    let headHtml = $head[0].innerHTML
    let innerHtml = $contentsClone[0].innerHTML
    let popupWindow = window.open("", "_blank", "width=910,height=800")
    popupWindow.document.write('<!DOCTYPE html>'+'<html style="overflow:hidden;">'+
        '<head>'+headHtml+'</head>'+
        '<body><div id="contents" class="'+ContentsClass+'">'+innerHtml+'</div></body>'+'</html>')
    popupWindow.document.close();
    popupWindow.focus();
    
    setTimeout(function(){
        popupWindow.print();         // 팝업의 프린트 도구 시작
        popupWindow.close();       // 프린트 도구 닫혔을 경우 팝업 닫기
    }, 400);
}