/*
 * 공통 초기화 기능
 */
$(document).ready(function() {

    /* 화면 다시 로드 */
    $("#op-gb-reload").click(function() {
        self.location.reload(true);
    });

    /* 화면 인쇄 */
    if($("#op-gb-print").length > 0) {
        $("#op-gb-print").printPreview();
    }

    /* 관심 목록 */
    $("#op-gb-interest").click(function () {
        $(this).colorbox({
            title : '즐겨찾기등록'
           ,href  : "/intra/interestlink/PD_iLinkAddForm.do?link=" + link
           ,width : "400" ,height:"300"
           ,iframe: true
        });
    });

    /* 도움말 보기 */
    $("#op-gb-help").click(function () {
        $El = $(this);
        $('#helpDiv').slideToggle(250, function() {
            $('#helpLink').blur();
            if ($('#helpDiv').is(':visible')){
                $El.html('<a href="#" id="op-gb-help">도움말 숨기기</a>');
            }else{
                $El.html('<a href="#" id="op-gb-help">도움말 보기</a>');
            }
        });
    });

});

/** 관리자단 테마 적용 */
var jsChangeAdminTheme = function() {
    var currentTheme = Config.global.adminTheme;
    var href = currentTheme + "/css/openworks_all.css";
    var cssLink = $('<link href="'+href+'" type="text/css" rel="Stylesheet" class="ui-theme" />');

    $("head").append(cssLink);
};

/** 사용자단 테마 적용 */
var jsChangeWebTheme = function() {
    var currentTheme = Config.global.webTheme;
    var href = currentTheme + "/css/user_all.css";
    var cssLink = $('<link href="'+href+'" type="text/css" rel="Stylesheet" class="ui-theme" />');

    $("head").append(cssLink);
};

/**
 * 파일 다운이력
 */
var jsShowFileHistory = function(fileSeq, fileId) {
    var url = CTX_PATH + "/component/file/PD_fileLogList.do?fileSeq="+fileSeq+"&fileId="+fileId;
    var option = {
        href:url,
        width:"807px",
        height:"500px",
        iframe:true
    };
    $.fn.colorbox(option);
};

/**
 * 객체 속성보기 (디버깅용)
 * 예 : viewProp(대상 Object);
 */
var viewProp = function () {
    var allHtml = "";

    for (var x = 0 ; x < arguments.length ; x++) {
        var obj = arguments[x];

        var names = "<table border='1' cellspacing='1' cellpadding='1'><tr>";
        if (obj.toString().substr(0,8) === '[object ') {
            names += "<td>name</td><td>value</td></tr>";
            var arr = new Array();
            for (var name in obj) {
                arr.push(name);
            }
            arr.sort();
            for (var i = 0 ; i < arr.length ; i++) {
                var key = arr[i];
                names += "<tr><td>";
                names += key;
                names +='</td><td>' ;
                names += obj[key];
                names += '</td></tr>';
            }
            names += "</table>";
            arr = null;
        } else {
            names += "<td>value</td></tr>";
            names += "<tr><td>";
            names += obj;
            names += '</td></tr>';
        }
        allHtml += names + "<br/>";
    }

    var pop = window.open("", "viewProperty", "", "");
    pop.focus();
    pop.document.body.innerHTML = allHtml.fixed();

};

function autoLink() {
    try{
        //var regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)","gi");
        var regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377]+)","gi");
        //var regEmail = new RegExp("([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+\.[a-z0-9-]+)","gi");
        var regEmail = new RegExp("([a-z0-9_-]+@[a-z0-9-]+\.[a-z0-9-]+)","gi");
        var container = CKEDITOR.instances.htmlContent.document.$;
        var doc = CKEDITOR.instances.htmlContent.getData();
        var matchsURL = doc.match(regURL);
        var matchsEmail = doc.match(regEmail);
        /*
        if(matchsURL != null){
            for(var i = 0; i < matchsURL.length; i++){
                $(container).find('a').each(function(){
                    if($(this).attr('href') == matchsURL[i] && $(this).text() == matchsURL[i]){
                        $(this).replaceWith(matchsURL[i]);
                    }
                });
            }
        }
        if(matchsEmail != null){
            for(var i = 0; i < matchsEmail.length; i++){
                $(container).find('a').each(function(){
                    if($(this).attr('href') == 'mailto:' + matchsEmail[i] && $(this).text() == matchsEmail[i]){
                        $(this).replaceWith(matchsEmail[i]);
                    }
                });
            }
        }
        doc = CKEDITOR.instances.htmlContent.getData();
        CKEDITOR.instances.htmlContent.setData(doc.replace(regURL,"<a href='$1://$2' target='_blank' title='새창열림'>$1://$2</a>").replace(regEmail,"<a href='mailto:$1'>$1</a>"));
        */
    }catch(e){
        if(CKEDITOR.instances.htmlContent.mode == 'source'){
            CKEDITOR.instances.htmlContent.setMode('wysiwyg', function(){autoLink();});
        }
    }
}
function autoAnchorTitle() {
    try{
        var anchorTags = CKEDITOR.instances.htmlContent.document.$.getElementsByTagName('a');
        for(var i = 0; i < anchorTags.length; i++){
            if($(anchorTags[i]).attr('target') == '_blank'){
                if($(anchorTags[i]).attr('title') == undefined || $(anchorTags[i]).attr('title') == ''){
                    $(anchorTags[i]).attr('title', '새창열림');
                }
            }
        }
    }catch(e){
        if(CKEDITOR.instances.htmlContent.mode == 'source'){
            CKEDITOR.instances.htmlContent.setMode('wysiwyg', function(){autoAnchorTitle();});
        }
    }
}

// 신디케이션 전송
var jsSyndicationPing = function(menuType, act, domainCd, menuCode, oItemCd, oItemSeq, menuUrl){
    if(act == 'I' || act == 'U'){
        if(!confirm('네이버 검색 등록을 진행하시겠습니까?')){
            return false;
        }
        try{getDocumentLoader();}catch(e){}
    }
    $.ajax({
        type : 'post',
        data : {'menuType' : menuType, 'act' : act, 'domainCd' : domainCd, 'menuCode' : menuCode, 'oItemCd' : oItemCd, 'oItemSeq' : oItemSeq, 'menuUrl' : menuUrl},
        dataType : 'text',
        url : '/component/syndication/ND_ping.do',
        success:function(data){
            if(act == 'I' || act == 'U'){
                if(data == 'false'){
                    alert('네이버 검색 등록이 실패하였습니다.');
                }else{
                    var xmlDoc = $.parseXML(data);
                    var resCode = $(xmlDoc).find('error_code').text();
                    var resMessage = $(xmlDoc).find('message').text();
                    if(resCode == '000'){
                        alert('네이버 검색 등록이 성공하였습니다.');
                    }else{
                        alert(resMessage);
                    }
                }
                try{setDocumentLoader('hide');}catch(e){}
            }
        },
        error: function(e){
            if(act == 'I' || act == 'U'){
                alert('네이버 검색 등록 오류 : ' + e);
                try{setDocumentLoader('hide');}catch(e){}
            }
        }
    });
};

// 다운로드 이력등록
var downloadLogsReasonData = null;
var jsDownloadLogsTrans = function(module, moduleDetail, downloadType, oItemSeq, oItemTitle, regId, regNm, reqCount, fnSuccess){
    $.ajax({
        type: 'POST',
        dataType: 'text',
        url: '/component/downloadLogs/ND_checkedInsLogs.do',
        success: function(response) {
            try {
                var returnBool = 'false';
                var responseSplit = ['false', ''];
                var rndDownloadLogKey = '';
                if(response != ''){
                    if(response.indexOf('^') > -1){
                        responseSplit = response.split('^');
                    }
                    returnBool = responseSplit[0];
                    rndDownloadLogKey = responseSplit[1];
                }
                if(eval(returnBool)) {
                    //jsDownloadLogsTransChecked(module, moduleDetail, downloadType, oItemSeq, oItemTitle, regId, regNm, rndDownloadLogKey, fnSuccess);
                    downloadLogsReasonData = {
                        'module' : module
                        , 'moduleDetail' : moduleDetail
                        , 'downloadType' : downloadType
                        , 'oItemSeq' : oItemSeq
                        , 'oItemTitle' : oItemTitle
                        , 'regId' : regId
                        , 'regNm' : regNm
                        , 'reqCount' : reqCount
                        , 'rndDownloadLogKey' : rndDownloadLogKey
                        , 'fnSuccess' : fnSuccess
                    };
                    var reasonFormTags = {
                        style : '<style type="text/css" id="reasonFormStyle">'
                            + '#reasonFormMask{position:fixed;top:0;left:0;width:100%;height:100%;z-index:9998;background:#000000;opacity:0.8;}'
                            + '#reasonFormWrap{position:fixed;top:5%;left:5%;width:90%;height:90%;background:#ffffff;border-radius:10px;padding:20px;box-sizing:border-box;z-index:9999;}'
                            + '#reasonFormWrap .reasonHead{margin-top:20px;padding-bottom:10px;font-size:18px;font-weight:bold;color:#ff0000;border-bottom:2px solid #ff0000;}'
                            + '#reasonFormWrap .reasonBody{margin-top:20px;text-align:center;}'
                            + '#reasonFormWrap .reasonBody textarea{width:99%;height:200px;border:2px solid #677dd0;}'
                            + '#reasonFormWrap .reasonBtns{margin-top:20px;text-align:center;}'
                            + '#reasonFormWrap .btn_type{width:100px;line-height:40px;font-size:16px;font-weight:bold;color:#ffffff;background:#a0a0a0;border:0 none;border-radius:5px;}'
                            + '#reasonFormWrap .btn_type.purple{background:#677dd0;}'
                            + '</style>'
                        , mask : '<div id="reasonFormMask"></div>'
                        , body : '<div id="reasonFormWrap">'
                            + ' <form name="downloadLogsReasonForm" method="post" action="/component/downloadLogs/ND_insertDownloadLogs.do">'
                            + '     <input type="hidden" name="module" value="' + module + '" />'
                            + '     <input type="hidden" name="moduleDetail" value="' + moduleDetail + '" />'
                            + '     <input type="hidden" name="downloadType" value="' + downloadType + '" />'
                            + '     <input type="hidden" name="oItemSeq" value="' + oItemSeq + '" />'
                            + '     <input type="hidden" name="oItemTitle" value="' + oItemTitle + '" />'
                            + '     <input type="hidden" name="regId" value="' + regId + '" />'
                            + '     <input type="hidden" name="regNm" value="' + regNm + '" />'
                            + '     <input type="hidden" name="reqCount" value="' + reqCount + '" />'
                            + '     <input type="hidden" name="rndDownloadLogKey" value="' + rndDownloadLogKey + '" />'
                            + '     <div class="reasonHead">'
                            + '         ※ 다운로드 사유를 작성하여 주세요.'
                            + '     </div>'
                            + '     <div class="reasonBody">'
                            + '         <textarea name="reason"></textarea>'
                            + '     </div>'
                            + '     <div class="reasonBtns">'
                            + '         <button type="button" id="reasonFormCancel" class="btn_type">취소</button>'
                            + '         <button type="submit" id="reasonFormConfirm" class="btn_type purple">확인</button>'
                            + '     </div>'
                            + ' </form>'
                            + '</div>'
                        
                    };
                    $('head').append(reasonFormTags.style);
                    $('body').append(reasonFormTags.mask, reasonFormTags.body);
                    $('#reasonFormCancel').bind('click', function(){
                        $('#reasonFormMask, #reasonFormWrap, #reasonFormStyle').remove();
                    });

                    $('form[name="downloadLogsReasonForm"]').bind('submit', function(){
                        var reasonEle = $('form[name="downloadLogsReasonForm"] [name="reason"]');
                        var reasonVal = $.trim(reasonEle.val());
                        if(reasonVal == ''){
                            alert('다운로드 사유를 입력하셔야 합니다.');
                            reasonEle.focus();
                            return false;
                        }
                        if(reasonVal.length < 10){
                            alert('다운로드 사유는 10자 이상 입력하셔야 합니다.');
                            reasonEle.focus();
                            return false;
                        }
                        jsDownloadLogsTransChecked();
                        return false;
                    });
                } else {
                    alert('다운로드 실패');
                }
            } catch (e) {
                alert(e);
                return;
            }
        },
        error: function(){
            alert('정상적으로 처리되지 않았습니다.');
        }
    });
};

var jsDownloadLogsTransChecked = function(module, moduleDetail, downloadType, oItemSeq, oItemTitle, regId, regNm, rndDownloadLogKey, fnSuccess){
    fnSuccess = downloadLogsReasonData.fnSuccess;
    $.ajax({
        /*data: {
            'module' : module
            , 'moduleDetail' : moduleDetail
            , 'downloadType' : downloadType
            , 'oItemSeq' : oItemSeq
            , 'oItemTitle' : oItemTitle
            , 'regId' : regId
            , 'regNm' : regNm
            , 'reqCount' : reqCount
            , 'rndDownloadLogKey' : rndDownloadLogKey
        },*/
        data: $('form[name="downloadLogsReasonForm"]').serialize(),
        type: 'POST',
        dataType: 'text',
        url: '/component/downloadLogs/ND_insertDownloadLogs.do',
        success: function(response) {
            try {
                if(eval(response)) {
                    if(fnSuccess && typeof fnSuccess == 'function') { fnSuccess(); }
                } else {
                    alert('다운로드 실패');
                }
            } catch (e) {
                alert(e);
                return;
            }
            $('#reasonFormMask, #reasonFormWrap, #reasonFormStyle').remove();
        },
        error: function(){
            alert('정상적으로 처리되지 않았습니다.');
            $('#reasonFormMask, #reasonFormWrap, #reasonFormStyle').remove();
        }
    });
};

$(window).bind('copy', function(){
    //console.log('클립보드 복사');
    if(typeof scriptBindClipboardNone == "boolean" && scriptBindClipboardNone){
        alert('클립보드를 허용하지 않는 페이지 입니다.');
        return false;
    }
    if(typeof scriptBindClipboardLog == "boolean" && scriptBindClipboardLog){
        jsDownloadLogsTrans('web', 'html_page', 'CB', '', document.title, scriptBindMgrId, scriptBindMgrNm, '1', function(){});
    }
});

var beforePrint = function() {
    //console.log('이 Function은 프린트 이전에 호출됩니다.');
    if(typeof scriptBindPrintNone == "boolean" && scriptBindPrintNone){
        alert('인쇄를 허용하지 않는 페이지 입니다.');
        var print_frame_ref = null;
        for (var i=0; i < window.frames.length; i++) {
            if (window.frames[i].name == "print-frame") {
                print_frame_ref = window.frames[i].document;
                break;
            }
        }
        if(print_frame_ref != null){
            $('head', print_frame_ref).append('<style type="text/css">' +
            '@media print {' +
            'body * { display:none; }' +
            '}' +
            '</style>');
        }else{
            $('head').append('<style type="text/css">' +
            '@media print {' +
            'body * { display:none; }' +
            '}' +
            '</style>');
        }
        return false;
    }
};
var afterPrint = function() {
    //console.log('이 Function은 프린트 이후에 호출됩니다.');
    if(typeof scriptBindPrintLog == "boolean" && scriptBindPrintLog){
        jsDownloadLogsTrans('web', 'html_page', 'PR', '', document.title, scriptBindMgrId, scriptBindMgrNm, '1', function(){});
    }
};

if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
        if (mql.matches) {
            beforePrint();
        } else {
            afterPrint();
        }
    });
}

window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;