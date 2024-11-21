/**
 * 시스템 오류(프로그램 오류 등) 메시지 발생 시의 메시지 박스
 * 설정에 따라서 시스템 오류 자체를 보여 주거나 또는 대체 메시지만 표시한다. 
 *
 * @param msg 메시지 내용
 * @param options 메시지 옵션
 * @returns
 */
var isDebugEnabled = true;
var jsSysErrorBox = function(msg, e, options) {
    if(!options)
        options = {};

    options["type"] = "error";
    options["stay"] = "true";

    var message = "";

    if(isDebugEnabled) {
        if(e) {
            message += "JavaScript Error : " + e + " \r <br />";
        }
        if(msg) {
            message += " System Error : " + msg;
        }
        sendMsg(message, options);
    } else {
        sendMsg(Message.msg.processError, options);
    }

    if (message) {
        return true;
    }
    return false;
};

/**
 * Controller에서 responseJson(model, Boolean.TRUE, value, Messages.XXXX) 
 * 형태로 반환되는 경우 내부에서 결과(response.result)의 참/거짓 여부를 확인하여,
 *  jsSuccessBox 또는 jsErrorBox를 선별하여 메시지를 출력한다.
 * 
 * @param response 응답객체
 * @param msg 메시지 내용
 * @param options 메시지 옵션
 * @returns
 */
var jsJsonBox = function(response, msg) {
    if(response.result) {
        return jsSuccessBox(response.message);
    } else {
        return jsErrorBox(response.message);
    }
};

/**
 * 일반 알림 메시지
 *
 * @param msg 메시지 내용
 * @param options 메시지 옵션
 * @returns
 */
var jsMessage = function(msg, options) {
    if(!options)
        options = {};

    options["type"] = "message";
    options["stayTime"] = 2000;

    sendMsg(msg, options);

    if (msg) {
        return true;
    }
    return false;
};

/**
 * 프로세스 성공시 알림 메시지
 *
 * @param msg 메시지 내용
 * @param options 메시지 옵션
 * @returns
 */
var jsSuccessBox = function(msg, options) {
    if(!options)
        options = {};

    options["type"] = "success";
    options["stayTime"] = 3000;

    sendMsg(msg, options);

    if (msg) {
        return true;
    }
    return false;
};

/**
 * 프로세스 경고시 알림 메시지
 *
 * @param msg 메시지 내용
 * @param options 메시지 옵션
 * @returns
 */
var jsWarningBox = function(msg, options) {
    if(!options)
        options = {};

    options["type"] = "warning";
    options["stayTime"] = 3000;

    sendMsg(msg, options);

    if (msg) {
        return true;
    }
    return false;
};

/**
 * 프로세스 실패시 알림 메시지
 *
 * @param msg 메시지 내용
 * @param options 메시지 옵션
 * @returns
 */
var jsErrorBox = function(msg, options) {
    if(!options)
        options = {};

    options["type"] = "error";
    options["stay"] = "true";

    sendMsg(msg, options);

    if (msg) {
        return true;
    }
    return false;
};

/**
 * 최상위 창에서 메시지를 띄우기 위한 컨트롤
 *
 * @param msg 메시지 내용
 * @param options 메시지 옵션
 * @returns
 */
var sendMsg = function(msg, options) {
    if(top.mainFrame) {
        top.mainFrame.jsShowMsgBox(msg, options);
    } else {
        jsShowMsgBox(msg, options);
    }
};

/**
 * 옵션을 받아서 메시지 표시
 *
 * @param msg 메시지 내용
 * @param options 메시지 옵션
 * @returns
 */
var jsShowMsgBox = function(msg, options) {
    options["text"] = msg;

    $.noticeAdd(options);
};

/**
 * 팝업 또는 colorbox 윈도우 닫기
 */
var jsCloseWin = function() {
    if(parent.$.fn.colorbox) {
        parent.$.fn.colorbox.close();
    } else if($.fn.colorbox) {
        $.fn.colorbox.close();
    } else {
        self.close();
    }
};
