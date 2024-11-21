(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');


        //
        var keysPressed = {};
        $(document).on('keyup',function (e) {
            delete keysPressed[e.which];
        });
        $(document).on('keydown',function(e){
            keysPressed[e.which] = true;
        });

        /* 토글 */
        // var $toggle = $('.toggle'),
        //     $toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

        // $toggleSelector.on('click', function (event) {
        //     var $this = $(this),
        //         $parent = $this.parents('.toggle'),
        //         parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g,'').split(/\s+/).slice(-2)[0].replace(/_item/,'');

        //     if($this.is('[class*="_show"]')){
        //         if ($parent.siblings().hasClass('active')){
        //             $parent.siblings().removeClass('active');
        //             $html.removeClass(parentClass + '_open');
        //         }
        //         $html.toggleClass(parentClass + '_open');
        //         $parent.toggleClass('active');
        //     }

        //     if($this.is('[class*="_hide"]')){
        //         $html.removeClass(parentClass + '_open');
        //         $this.closest('.active').removeClass('active');
        //     }
        // });

        //search박스
        var $searchBox = $header.find('.search_box'),
            $searchBoxEle = $searchBox.find('a, input, button'),
            $search = $searchBox.find('.search'),
            $searchOpen = $header.find('.search_btn'),
            $searchClose = $searchBox.find('.search_close');

        $searchOpen.on('click',function(){
            var height = $searchBox.find('.search_con').innerHeight();
            if(window.innerWidth<1001){
                if($(this).hasClass('close')){
                    $searchBox.removeClass('active');
                    $search.removeAttr('style');
                    $html.removeClass('search_open');
                    $(this).removeClass('close').text('검색열기')
                    return false;
                };
                $(this).addClass('close').text('검색닫기')
            };
            $searchBox.addClass('active');
            $search.height(height);
            $html.addClass('search_open');
            setTimeout(function(){
                $searchBoxEle.first().focus();
            },100);
        });

        $searchBoxEle.first().on('keydown',function(event){
            if(event.shiftKey && event.which === 9){
                $searchBoxEle.last().focus();
                return false;
            };
        });

        $searchClose.on('click',function(){
            $searchBox.removeClass('active');
            $search.removeAttr('style');
            $html.removeClass('search_open');
            $searchOpen.focus();
        }).on('keydown',function(event){
            if(!event.shiftKey && event.which === 9){
                $searchBoxEle.first().focus();
                return false;
            };
        });

        //sns공유
        // $('.addons .share_show').on('click', function(){
        //     var $this = $(this),
        //         $share = $this.parent('.share'),
        //         $panel = $this.siblings('.share_panel'),
        //         OnOff = $share.is('.active');

        //     $panel.slideDown();
        //     $share.addClass('active');
        // });

        // $('.share_panel .share_hide').on('click', function(){
        //     $('.share_panel .share_hide').parent('.share_panel').slideUp();
        //     $('.share_panel .share_hide').parents('.share').removeClass('active');
        // });

        // //qr
        // $('.addons .qr_show').on('click', function(){
        //     var $this = $(this),
        //         $qr = $this.parent('.qr'),
        //         $qr_panel = $this.siblings('.qr_panel'),
        //         OnOff = $qr.is('.active');

        //     $qr_panel.slideDown();
        //     $qr.addClass('active');
        // });

        // $('.qr_panel .qr_hide').on('click', function(){
        //     $('.qr_panel .qr_hide').parents('.qr_panel').slideUp();
        //     $('.qr_panel .qr_hide').parents('.qr').removeClass('active');
        // });


        //Language
        // $('.language_show').on('click', function(){
        //     var $this = $(this),
        //         $language = $this.parent('.language'),
        //         $languagePanel = $this.siblings('.language_panel'),
        //         OnOff = $language.is('.active');

        //     if(!OnOff){
        //         $languagePanel.slideDown();
        //         $language.addClass('active');
        //     } else{
        //         $language.removeClass('active');
        //         $languagePanel.slideUp();
        //     };
        // });
        // $('.language_panel .language_hide').on('click', function(){
        //     $('.language_hide').parents('.language').removeClass('active');
        //     $('.language_hide').parent('.language_panel').slideUp();
        //     $('.language_show').attr('title', '언어선택 열기');
        // });


        //클립보드복사
        // var $urlCopy = $container.find('#url_copy');

        // $urlCopy.on('click', function(event) {
        //     $('#url_copy div').remove();
        //     var html = "<div><label for='clip_target'>복사된 URL</label><input id='clip_target' type='text' value='' /></div>";
        //     $(this).append().html(html);

        //     var input_clip = document.getElementById("clip_target");
        //     var _url = $(location).attr('href');
        //     $('#clip_target').val(_url);

        //     if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        //         var editable = input_clip.contentEditable;
        //         var readOnly = input_clip.readOnly;

        //         input_clip.contentEditable = true;
        //         input_clip.readOnly = false;

        //         var range = document.createRange();
        //         range.selectNodeContents(input_clip);

        //         var selection = window.getSelection();
        //         selection.removeAllRanges();
        //         selection.addRange(range);
        //         input_clip.setSelectionRange(0, 999999);

        //         input_clip.contentEditable = editable;
        //         input_clip.readOnly = readOnly;
        //     } else {
        //         input_clip.select();
        //     }
        //     try {
        //         var successful = document.execCommand('copy');
        //         input_clip.blur();
        //         if (successful) {
        //             alert("URL이 복사 되었습니다");
        //         } else {
        //             alert('이 브라우저는 지원하지 않습니다.');
        //         }
        //     } catch (err) {
        //         alert('이 브라우저는 지원하지 않습니다.');
        //     }
        // });


        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next'),
            $bannerOpt = {
                draggable : false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 1000,
                variableWidth: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                playText : '재생',
                pauseText : '정지',
                autoArrow : $bannerAuto,
                prevArrow : $bannerPrev,
                nextArrow : $bannerNext,
                responsive: [
                    {
                        breakpoint: 1500,
                    },
                    {
                        breakpoint: 1200,
                    },
                ]
            };


        $bannerList.on('init reInit afterChange',function(){
            var bannerLeft = $bannerList.offset().left,
                bannerRight = $bannerList.width() + bannerLeft;
            $bannerList.find('.slick-slide').each(function(){
                var thisLeft = $(this).offset().left;
                if(thisLeft < bannerRight && thisLeft >= bannerLeft) $(this).addClass('slick-active');
            });
        });
        $bannerList.slick($bannerOpt);


        // 맨위로

        var $toTop = $footer.find('.toTop'),
            $toTopBtn = $toTop.find('button'),
            toTopOffset;

        $window.on('load resize',function(){
            $toTop.removeAttr('style');
            toTopOffset = $toTop.offset();
            $window.on('resize scroll',function(){
                toTopPosition($toTop, toTopOffset);
            });
        });

        function toTopPosition(quick, toTopOffset){
            if(window.scrollY > $('#header').height()){
                $toTop.addClass('active');
                if(window.scrollY + window.innerHeight >= $('#wrapper').height() - 200) return $toTop.removeAttr('style');
                $toTop.css({
                    'position':'fixed',
                    'top':'auto',
                    'bottom':'40px',
                });
            }else{
                $toTop.removeClass('active');
            };
        };

        $toTopBtn.on('click',function(){
            window.scroll({top:0,left:0,behavior: "smooth",});
        });

        //패밀리사이트
        var $footerSite = $footer.find('.site'),
            $siteList = $footerSite.find('.site_list'),
            $siteBtn = $footerSite.find('.site_button');

        $siteBtn.on('click',function(){
            if ($footerSite.hasClass('active')){
                $siteList.height(0);
                $footerSite.removeClass('active');
                setTimeout(function(){
                    $siteList.removeAttr('style');
                },500)
                $(this).attr('title','목록 열기');
            }else{
                var height = $siteList.height();
                $footerSite.addClass('active');
                $siteList.height(0).height(height);
                $(this).attr('title','목록 닫기');
            };
        });
        // var $nuriBtn = $('.nuri_open'),
        //     $nuriLayer = $('.nuri_layer'),
        //     $nuriClose = $nuriLayer.find('.close'),
        //     $nuriItem = $nuriLayer.find('.item_btn');

        // $nuriBtn.on('click', function () {
        //     $nuriLayer.addClass('active');
        //     $nuriLayer.fadeIn();
        // });
        // $nuriClose.on('click', function () {
        //     $nuriLayer.removeClass('active');
        //     $nuriLayer.fadeOut();
        // })

        // $nuriItem.on('click', function() {
        //     var $this = $(this),
        //         $MyParent = $this.parent('li.item'),
        //         IsActive = $MyParent.is('.active'),
        //         $MyLayer = $this.siblings('.layer'),
        //         $OtherParents = $MyParent.siblings('li.item'),
        //         $OtherLayer = $OtherParents.find('.layer'),
        //         $OtherBtn = $OtherParents.find('.item_btn');
        //     if(!IsActive){
        //         $OtherParents.removeClass('active');
        //         $OtherLayer.slideUp();
        //         $OtherBtn.attr('title', '목록열기');
        //         $MyParent.addClass('active');
        //         $this.attr('title', '목록닫기');
        //         $MyLayer.slideDown();
        //     } else{
        //         $MyParent.removeClass('active');
        //         $this.attr('title', '목록열기');
        //         $MyLayer.slideUp();
        //     };
        // });

    });
})(window.jQuery);
