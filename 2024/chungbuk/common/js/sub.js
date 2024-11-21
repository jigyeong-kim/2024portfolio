/**
 * @author (주)한신정보기술 퍼블리셔팀 권정현
 * @since 2019-03-18
 * @version 1.0.0
 */
(function($) {
    'use strict';

    $(function() {
        var $window = element.$window,
            $html = element.$html,
            $container = element.$container,
            $contents = element.$contents = $('#contents'),
            $screen = $.screen,
            $inArray = $.inArray,
            lang = $html.attr('lang'),
            isKo = lang === 'ko',
            isEn = lang === 'en',
            isZh = lang === 'zh',
            isJa = lang === 'ja';

        //프린트
        var $print = element.$print = $container.find('.print').on('click.layoutSub', function(event) {
            print();
        });

        //탭메뉴
        var $tabMenu = element.$tabMenu = $($container.find('.tab_menu').get().reverse()),
            $tabSelect = element.$tabSelect = $tabMenu.find('.tab_select'),
            $tabSelectBtn = element.$tabSelectBtn = $tabSelect.find('.tab_btn'),
            $tabNav = element.$tabNav = $tabMenu.find('.tab_nav');

        $window.on('screen:wide.layoutSub screen:web.layoutSub', function(event, state) {
            $tabSelectBtn.removeClass('active');

            $tabNav.removeClass('active').css('display', '');
        });

        $tabMenu.each(function(index, tabMenu) {
            var $tabMenu = $(tabMenu),
                $tabSelect = $tabMenu.children('.tab_select'),
                $tabSelectBtn = $tabSelect.children('.tab_btn'),
                $tabNav = $tabMenu.children('.tab_nav'),
                $tabContent = $tabMenu.find('.tab_content'),
                $tabClose = $tabMenu.find('.tab_close'),
                list = [],
                link = 0,
                counter = index + 1,
                selectNamespace = 'select' + counter,
                openNamespace = 'open' + counter;

            $tabMenu.find('.tab_open').each(function(index, tabOpen) {
                var $tabOpen = $(tabOpen);

                //탭메뉴의 부모일 때
                if($tabOpen.closest('.tab_menu').is(tabMenu)) {
                    var href = $tabOpen.attr('href'),
                        data = $tabOpen.data(),
                        reset = data.tabReset,
                        toggle = data.tabToggle,
                        isLink = typeof data.tabLink === 'boolean';

                    //링크가 아니면서 주소가 있을 때
                    if(!isLink && href) {
                        isLink = href[0] !== '#';
                    }

                    //링크일 때
                    if(isLink) {
                        link++;
                    }

                    //링크가 아닐 때
                    if(!isLink) {
                        var $href = $(href);

                        index -= link;

                        list[index] = {
                            openElement : tabOpen,
                            closeElement : data.tabClose || $tabClose[index],
                            panelElement : data.tabPanel || (($href.length) ? $href : $tabContent[index]), //앵커가 있을 때
                            mouseenter : data.tabMouseenter === true,
                            mouseleave : data.tabMouseleave === true,
                            popup : data.tabPopup === true,
                            reset : (typeof reset === 'boolean') ? reset : true, //불리언일 때
                            toggle : (typeof toggle === 'boolean') ? toggle : true //불리언일 때
                        };
                    }
                }
            });

            $tabMenu.tab({
                namespace : selectNamespace,
                list : [{
                    openElement : $tabSelectBtn,
                    closeElement : undefined,
                    panelElement : $tabNav,
                    mouseenter : false,
                    mouseleave : false,
                    popup : false,
                    reset : false,
                    toggle : true,
                    link : false
                }]
            }).tab({
                namespace : openNamespace,
                list : list
            }).on('tab:' + selectNamespace + '.layoutSub', function(event, data) {
                //활성화되었을 때
                $(data.panelElement)[(data.state === 'active') ? 'slideDown' : 'slideUp'](250, 'easeInOutExpo');
            }).on('tab:' + openNamespace + '.layoutSub', function(event, data) {
                var $openElement = $(data.openElement),
                    $tabItem = $openElement.parent('.tab_item'),
                    state = $screen.settings.state;

                //활성화되었을 때
                if(data.state === 'active') {
                    $tabSelectBtn.text($(data.element).text());

                    $tabItem.addClass('active');
                }else{
                    var text = 'Select';

                    //한국어일 때
                    if(isKo) {
                        text = '선택';

                        //중국어일 때
                    }else if(isZh) {
                        text = '禅宗';

                        //일본어일 때
                    }else if(isJa) {
                        text = '選択';
                    }

                    $tabSelectBtn.text(text);

                    $tabItem.removeClass('active');
                }

                //태블릿 또는 모바일일 때
                if($inArray('tablet', state) > -1 || $inArray('phone', state) > -1) {
                    $tabSelectBtn.removeClass('active');

                    $tabNav.removeClass('active').slideUp(250, 'easeInOutExpo');
                }
            });
        });

        //표
        var $table = element.$table = $container.find('.table'),
            $tableType3 = element.$tableType3 = $table.filter('.type3');

        $tableType3.each(function(index, element) {
            var $element = $(element),
                $tr = $element.find('tbody tr, tfoot tr');

            $element.find('thead th').each(function(sequence, element) {
                var $element = $(element),
                    text = $element.text();

                //값이 있을 때
                if(text) {
                    text += ' : ';

                    $tr.each(function(index, element) {
                        var $element = $(element),
                            $children = $element.children(':eq(' + sequence + ')');

                        //부모가 tfoot의 th가 아닐때
                        if(!$children.is('tfoot th')) {
                            $children.attr('data-cell-header', text);
                        }
                    });
                }
            });
        });
    });
})(window.jQuery);