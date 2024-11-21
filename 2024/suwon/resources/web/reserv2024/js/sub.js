$(document).ready(function(){

    $sub_depth1_item = $('.side_menu_wrap .side_title .side_subject');
    if($sub_depth1_item.length > 0){
        if($sub_depth1_item.text().lastIndexOf(' ') > -1){
            //$sub_depth1_item.html($sub_depth1_item.text().replace(' ', '<br />'));
            $sub_depth1_item.html($sub_depth1_item.text().substring(0, $sub_depth1_item.text().lastIndexOf(' ')) + '<br />' + $sub_depth1_item.text().substring($sub_depth1_item.text().lastIndexOf(' '), $sub_depth1_item.text().length));
        }
    }

    $('img.zoomable_image').each(function(){
        $(this).wrap('<div class="p-photo__wrap" style="max-width:100%;" />');
        var imgUrl = $(this).attr('src');
        var magnifyHtml = '<span class="p-photo__zoom" style="top:7px;font-size:0;">'
            + '<a href="' + imgUrl + '" class="p-photo__link" target="_blank" title="새창">'
            + '    <svg width="18" height="18" fill="rgba(255,255,255,.85)" focusable="false">'
            + '	<title>사진 확대보기</title>'
            + '	<use xlink:href="/resources/common_sw/images/program/p-icon.svg#expand-arrows"></use>'
            + '    </svg>'
            + '</a>'
            + '</span>';
        $(this).after(magnifyHtml);
    });
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
    $(obj).find('div').remove();
    var html = "<div><label for='clip_target'>복사된 URL</label><input id='clip_target' type='text' value='' /></div>";
    $(obj).append(html);

    var input_clip = document.getElementById("clip_target");
    var _url = $(location).attr('href');
    _url = subShareUrlConvert(_url);
    $("#clip_target").val(_url);

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
            alert("URL이 복사 되었습니다. 원하시는 곳에 붙여넣기 해 주세요.");
        } else {
            alert('이 브라우저는 지원하지 않습니다.');
        }
    } catch (err) {
        alert('이 브라우저는 지원하지 않습니다.');
    }
}
function subShareToPrint(obj){
    window.print();
}

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

		//여기서부터 코드 작성해주세요
		$('.path li.list button').on('click', function() {
			var $this = $(this),
				$MyParent = $this.parent('li.list'),
				$OtherParents = $MyParent.siblings('li.list'),
				$MyLayer = $this.siblings('.layer'),
				$OtherBtn = $OtherParents.find('button'),
				$OtherLayer = $OtherParents.find('.layer'),
				IsActive = $MyParent.is('.active');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherBtn.attr('title', '목록열기');
				$OtherLayer.slideUp();
				$MyParent.addClass('active');
				$this.attr('title', '목록닫기');
				$MyLayer.slideDown();
			} else{
				$MyParent.removeClass('active');
				$this.attr('title', '목록열기');
				$MyLayer.slideUp();
			};
		});
		
		var $addons = $html.find('.addons'),
        $addonsOpen = $html.find('.share_open'),
        $addonsClose = $html.find('.share_close');

        $addonsOpen.on('click', function(event) {
            $addons.addClass('active');
        });
        $addonsClose.on('click', function(event) {
            $addons.removeClass('active');
        })

        //서브페이지 사이드 메뉴
        var $contents = $('#container'),
        $side = $contents.find('.side'),
        $sideDepthItem = $side.find('.depth_item');

        $sideDepthItem.on('click', function(event) {
            var $this = $(this),
                $depthText = $this.children('.depth_text'),
                eventTarget = event.target;

            if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if($this.hasClass('depth1_item')) {
                    if($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    }else{
                        $html.addClass('side_open');
                    }
                }
                if($this.children('.depth').length) {
                    $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                    event.preventDefault();
                }
            }
            
            event.stopPropagation();
        }).each(function(index, element) {
            var $element = $(element);

            if($element.children('.depth').length) {
                $element.addClass('has');
            }
        });
        
        // 서브 탭메뉴
        $('.tab_menu_box .tab_menu_button').on('click', function() {
            var $this = $(this),
                $Layer = $this.siblings('.tabmenu'),
                LayerIsActive = $Layer.is('.active');
            if(!LayerIsActive){
                $Layer.addClass('active').slideDown();
            } else{
                $Layer.removeClass('active').slideUp();
            };
        });
        
        $('.tabmenu').not($('.prettyprint').children()).each(function() {
            var li_length = $(this).children('ul').find('li').length;
            $(this).addClass('divide'+li_length);
        });
        
        $window.on('screen:wide screen:web screen:tablet', function(event) {
            $('.tab_menu_box .tabmenu').removeAttr('style');
        });

        // 콘텐츠 서브 페이지
        $(function(){
            $('.tabcontent > div').hide();
            $('.tabnav a').click(function () {
              $('.tabcontent > div').hide().filter(this.hash).show();
              $('.tabnav a').removeClass('active');
              $(this).addClass('active');
              return false;
            }).filter(':eq(0)').click();
        });

        // 시설 상세정보 슬라이드
        $('.slider-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.slider-main',
            vertical: true,
            focusOnSelect: true,
            pauseOnSwipe : true,
            pauseOnDirectionKeyPush : true,
            autoplay: false,
            arrows:false
        });
        
        $('.slider-main').slick({
            slidesToShow: 1,
            arrows: true,
            prevArrow : $('.controlbox .arrow.prev'),
            nextArrow : $('.controlbox .arrow.next'),
            asNavFor: '.slider-nav',
            autoplay: false,
            focusOnSelect: true,
            pauseOnSwipe : true,
            pauseOnDirectionKeyPush : true,
            variableWidth:true
        });
        
          // 카테고리 메뉴
          $('.sub_lnb_more').on('click', function(){
            var $this = $(this),
                $Layer = $this.siblings('.layer'),
                IsActive = $this.is('.active');
            if(!IsActive){
                $this.addClass('active').attr('title', '닫기');
                $Layer.addClass('active').slideDown();
            } else{
                $this.removeClass('active').attr('title', '열기');
                $Layer.removeClass('active').slideUp();
            };
        });
        $('.sub_lnb_m_more').on('click', function(){
            var $this = $(this),
                $sub_Lnb = $('.sub_lnb'),
                IsActive = $sub_Lnb.is('.active');
            if(!IsActive){
                $sub_Lnb.addClass('active');
                $this.attr('title', '닫기');
            } else{
                $sub_Lnb.removeClass('active');
                $this.attr('title', '열기');
            };
        });
   

    });
})(jQuery);
