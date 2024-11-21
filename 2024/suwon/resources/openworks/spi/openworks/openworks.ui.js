/*
 * 공통 초기화 기능
 */
$(document).ready(function() {

    /* 리스트 테이블 로우별 컬러 설정 */
    jsOddColor();

    /* 기본 검색어 값이 존재한다면 자동으로 Text Highlight */
    if($("#q_searchVal").val()) {
        jsHightlight($("#q_searchVal").val());
    }

    /**
     * 대상 체크박스 전체 선택 및 색상변경
     */
    $("input[name=chk-all]").click(function() {
        var isChecked = this.checked;

        $("input[name=seqs]").attr('checked', isChecked);
        if(isChecked) {
            $(":checkbox").parent().parent().addClass("bg_blue");
        } else {
            $(":checkbox").parent().parent().removeClass("bg_blue");
        }
    });

    /**
     * 대상 체크박스 선택에 따른 색상변경
     */
    $("input[name=seqs]").click(function() {
        if($(this).is(":checked"))
            $(this).parent().parent().addClass("bg_blue");
        else
            $(this).parent().parent().removeClass("bg_blue");
    });

    $("span.sort").click(function() {
        $("#q_currPage").val("0");
        $("#q_sortName").val(this.id);

        var sortOrder = $("#q_sortOrder").val();
        if(sortOrder == "")
            sortOrder = "ASC";
        else if(sortOrder == "ASC")
            sortOrder = "DESC";
        else if(sortOrder == "DESC")
            sortOrder = "ASC";

        $("#q_sortOrder").val(sortOrder);

        jsList();
    });

    $("span.sort").each(function() {
        var sortName = $("#q_sortName").val();
        var sortOrder = $("#q_sortOrder").val();

        if(this.id == sortName) {
            $(this).addClass("m_over").append(sortOrder == "ASC" ? "▼" : "▲");
        }
    });
});

/**
 * 리스트 테이블 로우별 컬러 설정
 */
var jsOddColor = function() {
    /* 리스트 테이블 로우별 컬러 설정 */
    $("#odd-color tr:even").addClass("");
    $("#odd-color tr:odd").addClass("bg_yellow");
};

/**
 * 단어 하이라이트
 *
 * @param keyword 하이라이트 대상 단어
 * @param contentId 하이라이트 대상 영역 id. 미지정시 body 태그내 전체 적용
 * @returns
 */
var jsHightlight = function(keyword, contentId) {
    try{
        if(contentId) {
            $("#"+contentId).removeHighlight().highlight(keyword);
        } else {
            $("body").removeHighlight().highlight(keyword);
        }
    }catch(e){}
};

/**
 * 대상 체크박스 전체 선택/비선택 시 해당 Row의 컬러 변경
 * @param targetName 대상 checkbox 명
 * @param obj checkbox 객체
 * @returns
 */
var jsAllCheck = function(targetName, obj) {
    var isChecked = $(obj).is(":checked");

    $("input[name="+targetName+"]").each(function() {
        $(this).attr("checked", isChecked);
    });

    if(isChecked) {
        $(":checkbox").parent().parent().addClass("bg_blue");
    } else {
        $(":checkbox").parent().parent().removeClass("bg_blue");
    }
};

/**
 * 대상 체크박스 선택/비선택 시 해당 Row의 컬러 변경
 * @param obj checkbox 객체
 * @returns
 */
var jsToggleCheck = function(obj) {
    if($(obj).is(":checked")) {
        $(obj).parent().parent().addClass("bg_blue");
    } else {
        $(obj).parent().parent().removeClass("bg_blue");
    }
};

/**
 * 프레임워크 Tab UI 헨들러
 * @param option 대상 패널 명과 URI 파라미터를 전달 할 수 있다.
 *         미 지정시 기본 값이 사용된다.
 */
(function($) {
    $.extend($.fn, {
        jsTabUi : function(options) {

            /* option 설정 */
            var defaultTabOption = {
                tabContainer : "tabContainer",
                baseParam: {}
            };
            if(!options) {
                options = defaultTabOption;
            }

            var prefix_tab_id = "op_tabs_id_";
            /* class 를 강제로 생성(디자인 적용) */
            $(this).find("ul, ol").addClass("tab");

            /* Tab 대상 링크 객체 수집 및 고유 ID 생성*/
            var items = [];
            $(this).find("a").each(function(index) {
                $(this).addClass("tab-link");
                $(this).attr("id", prefix_tab_id + index);
                items[index] = $(this);
            });

            /* Tab 컨텐츠 패널 생성 */
            if($("#"+options.tabContainer).length < 1) {
                $("<div id='"+options.tabContainer+"'></div>").insertAfter($(this));
            }

            /** Tabs 객체생성 */
            var jsTabs = function(tabOptions, tabItems) {

                this.options = tabOptions;
                this.items = tabItems;

                /** 현재 선택된 Tab Index */
                this.selectedIndex = 0;
                this.currentPanel = "";
                this.currentUrl = "";

                /* Tab 대상 링크 객체 수집 */
                for(var i=0 ; i < this.items.length ; i++) {
                    this.items[i].bind("click", {idx : i}, function(event) {
                        tab.loadTab(event.data.idx);
                        return false;
                    });
                }

                ///////////////// 이벤트 설정 //////////////

                /** Tab 로드 전 이벤트 */
                this.beforeLoad = function(event, item) {
                    return true;
                };
                /** Tab 로드 후 이벤트 */
                this.afterLoad = function(event, item) {
                    return true;
                };

                /** 이벤트 설정(Tab 로드전과 로드후) */
                if(tabOptions.beforeLoad) {
                    this.beforeLoad = tabOptions.beforeLoad;
                }
                if(tabOptions.afterLoad) {
                    this.afterLoad = tabOptions.afterLoad;
                }

                ///////////////// 기능 설정 //////////////

                /** 대상 Tab객체 id에 해당하는 Tab load */
                this.loadTab = function(idx, event) {

                    var before = this.beforeLoad(event, this.items[idx]);
                    if(!before) {
                        return false;
                    }

                    /* 모든 Tab를 초기화 한다.*/
                    this.clearTab();
                    this.selectedIndex = idx;

                    this.items[idx].addClass("on");

                    var $panel = this.viewTab(idx);
                    $panel.show();

                    this.currentPanel = $panel;

                    this.afterLoad(event, this.items[idx]);
                };

                /** Tab 대상 컨텐츠를 표시하고 현재 컨텐츠를 표시하는 panel을 반환한다. */
                this.viewTab = function(idx) {
                    try{getDocumentLoader();}catch(e){}
                    var $href = this.items[idx].attr("href");

                    var $panel;
                    if($href.indexOf("#", 0) == 0) {
                        var container = $href.substring(1);
                        $panel = $("#"+container);
                        try{setDocumentLoader('hide');}catch(e){}
                    } else {
                        $("#"+this.options.tabContainer).load(
                            $href,
                            options.baseParam,
                            function(data) {
                                try{setDocumentLoader('hide');}catch(e){}
                            }
                        );
                        $panel = $("#"+this.options.tabContainer);
                    }
                    this.currentUrl = $href;
                    return $panel;
                };

                /** 현재 선택된 Tab 일련번호 반환 */
                this.currentIndex = function() {
                    return this.selectedIndex;
                };

                /** 지정된 일련번호(idx) Tab의 URL을 변경 */
                this.changeUrl = function(idx, url) {
                    this.items[idx].attr("href",url);
                };

                /** Tab 이동 */
                this.moveTab = function(index) {
                    var $tab = this.items[index];
                    $tab.trigger("click");
                };

                /** 현재 Tab 새로 고침 */
                this.refresh = function() {
                    this.loadTab(this.selectedIndex);
                };

                /** 모든 텝 초기화 */
                this.clearTab = function() {
                    $(".tab-link").removeClass("on");
                    // 선택전 화면을 보이지 않도록 한다.
                    if(this.currentPanel) {
                        this.currentPanel.hide();
                    }
                };
                
            };

            /* 초기화 후 반환 */
            var tab = new jsTabs(options, items, arguments);
            tab.loadTab(0);

            return tab;
        }
    });
})(jQuery);
