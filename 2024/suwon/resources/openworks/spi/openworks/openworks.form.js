
/**
 * 페이지 이동
 * 
 * @param cpage 이동할 페이지 번호
 * @returns
 */
var jsMovePage = function(cpage, form) {
    if(!form) form = Config.global.defaultForm;

    $("#q_currPage").val(cpage);
    location.href = "?" + jsSearchQueryString(form);
};

/**
 * URL 이동
 * @param url 이동대상 주소
 * @param form 대상 폼
 * @returns
 */
var jsMoveUrl = function(url, target, form) {
    if(!form) form = Config.global.defaultForm;

    var link = url;
    if(url.indexOf("?") < 0) {
        link += "?";
    } else {
        link += "&";
    }

    link = jsFilterQueryString(link);

    // 윈도우 target 설정
    if(target) {
        var openWin = window.open(url, new Date().getTime(),"");
        openWin.location.href = link;
    } else {
        location.href = link;
    }

};

/**
 * 목록
 * @param uri action="uri"
 * @param form 대상 폼
 * @returns
 */
var jsList = function(uri, form) {
    if(!form) form = Config.global.defaultForm;
    if(!uri) uri = $("#"+form).attr("action");
    
    location.href = uri + jsGetMarkChar(uri) + jsSearchQueryString(form);
};

/**
 * 상세
 * @param uri action="uri"
 * @param form 대상 폼
 * @returns
 */
var jsView = function(uri, form) {
    if(!form) form = Config.global.defaultForm;
    if(!uri) uri = $("#"+form).attr("action");

    location.href = uri + jsGetMarkChar(uri) + jsSearchQueryString(form);
};

/**
 * 등록 폼
 * @param uri action="uri"
 * @param form 대상 폼
 * @returns
 */
var jsInsertForm = function(uri, form) {
    if(!form) form = Config.global.defaultForm;
    if(!uri) uri = $("#"+form).attr("action");

    location.href = uri + jsGetMarkChar(uri) + jsSearchQueryString(form);
};

/**
 * 수정 폼
 * @param uri action="uri"
 * @param form 대상 폼
 * @returns
 */
var jsUpdateForm = function(uri, form) {
    if(!form) form = Config.global.defaultForm;
    if(!uri) uri = $("#"+form).attr("action");

    location.href = uri + jsGetMarkChar(uri) + jsSearchQueryString(form);
};

/**
 * 삭제
 * @param uri action="uri"
 * @param form 대상 폼
 * @returns
 */
var jsDelete = function(uri, form) {
    if(!form) form = Config.global.defaultForm;
    if(!uri) uri = $("#"+form).attr("action");

    $("#"+form).attr("action", uri);
    $("#dataForm").submit();
};

/**
 * 목록 삭제
 * @param uri action="uri"
 * @param form 대상 폼
 * @returns
 */
var jsDeleteList = function(uri, form) {
    if(!form) form = Config.global.defaultForm;
    if(!uri) uri = $("#"+form).attr("action");

    $("#"+form).attr("action", uri);
    $("#"+form).submit();
};

/**
 * 폼에서 검색용 파라미터만 추출하여 QueryString로 생성 단 <textarea/>는 자동 제외됨
 * @param form 대상 폼
 * @returns
 */
var jsSearchQueryString = function(form) {
    if(!form) form = Config.global.defaultForm;

    return jsQueryString(form, Config.global.prefixSearchParam);
};

/**
 * 폼에서 전체 파라미터를 추출하여 QueryString로 생성 단 <textarea/>는 자동 제외됨
 * @param form 대상 폼
 * @param prefix 접두어
 * @returns
 */
var jsQueryString = function(form, prefix) {
    if(!form) form = Config.global.defaultForm;

    var queryString = "";
    var filter = jsGetFilter(prefix, form);

    $("#"+ filter).each(function(idx) {
        queryString += jsFilterParam($(this), queryString);
    });

    return queryString;
};

/**
 * 검색 초기화. 기본 폼 값인 dataForm 사용
 * @param form 대상 폼
 * @returns
 */
var jsSearchReset = function(form) {
    if(!form) form = Config.global.defaultForm;

    jsSearchResetForm(form);
};

/**
 * 검색초기화
 *
 * @param form form 태그의 id를 지정
 * @returns
 */
var jsSearchResetForm = function(form) {
    if(!form) form = Config.global.defaultForm;

    $("#"+form+" [name^='"+ Config.global.prefixSearchParam +"']").each(function() {
        $(this).val("");
    });
    $("#"+form).submit();
};

/**
 * ID 네이밍 기준 select 선택값 설정
 *
 * @param id 대상 객체의 id 문자열
 * @param value 대상 객체의 설정 값(선택되어 질 값)
 * @returns
 */
var jsSelected = function(id, value) {
    $("#"+id).val(value);
};

/**
 * ID 네이밍 기준 input radio 선택값 설정
 *
 * @param 대상 객체의 name 문자열
 * @param value 대상 객체의 설정 값(체크되어 질 값)
 * @returns
 */
var jsChecked = function(name, value) {
    $("input[name='"+name+"']").each(function(idx) {
        if($(this).val() == value) {
            $(this).attr("checked","checked");
        }
    });
};

/**
 * jquery selector 추출
 * @param prefix 접두어
 * @param form 대상 폼
 */
var jsGetFilter = function(prefix, form) {
    var filter = form;
    
    if(prefix) {
        filter += " [name^='" + prefix + "']";
    } else {
        filter = (filter + " input, "+filter + " select");
    }

    return filter;
};

/**
 * 복수개의 파라미터가 발견되었을 경우 복수개를 가질수 있는지를 판단하여 추가여부를 결정함.
 * @param formElem jquery 객체
 * @param queryString 생성된 QueryString 문자열
 * @returns QueryString로 추가해도 된다면 추가하여 반환.
 */
var jsFilterParam = function(formElem, queryString) {

    var filterQueryString = "";
    if(!formElem.is("textarea")) {
        if(queryString.indexOf(formElem.attr("name")+"=") < 0) {
            filterQueryString = formElem.attr("name") + "=" + formElem.val() + "&";
        } else {
            if(formElem.is("checkbox") || (formElem.is("select") && formElem.attr("multiple"))) {
                filterQueryString = formElem.attr("name") + "=" + formElem.val() + "&";
            }
        }
    }

    return filterQueryString;
};

/**
 * 복수개의 파라미터가 발견되었을 경우 복수개를 가질수 있는지를 판단하여 URL을 생성
 * @param url URL 문자열
 * @param form QueryString 문자열 추출 대상 폼
 * @returns QueryString 반환
 */
var jsFilterQueryString = function(url, form) {
    if(!form) form = Config.global.defaultForm;

    var addedUrl = url;
    $("#"+form+" [name^='"+ Config.global.prefixSearchParam +"']").each(function() {
        if(!$(this).is("textarea")) {
            if(addedUrl.indexOf($(this).attr("name")+"=") < 0) {
                addedUrl += $(this).attr("name") + "=" + $(this).val() + "&";
            } else {
                if($(this).is("checkbox") || ($(this).is("select") && $(this).attr("multiple"))) {
                    addedUrl +=  $(this).attr("name") + "=" + $(this).val() + "&";
                }
            }
        }
    });

    return addedUrl;
};

/**
 * URL인지 URI인지를 구분하여 연결문자를 반환.
 */
var jsGetMarkChar= function(url) {
    if(url.indexOf("?") >= 0) {
        return "&";
    }
    return "?";
};

