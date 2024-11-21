function lodingFixedOn(msg, w, h) {
	var l = (window.innerWidth - w) / 2;
	var t = (window.innerHeight - h) /2;

	var str = '<div class="loding_line" style="position:fixed; z-index:10000; left:' + l + 'px; top:' + t + 'px; width:' + w + 'px; height:' + h + 'px; background-color:#fff;">' +
			'<table width="100%" height="' + h + '" border="0" cellspacing="0" cellpadding="0">' +
				'<tr>' +
					'<td style="font-size:9pt; text-align:center; vertical-align:middle; border:2px solid silver;">' +
						'<img src="/common/common_fs/mng/img/ajax-loader.gif" alt="로딩 이미지" /><br/>' + msg +
					'</td>' +
				'</tr>' +
			'</table>' +
		'</div>' +
		'<div class="ui-widget-overlay ui-front loding_line"></div>';

	$(document.body).append(str);
}

/**
 * 로딩 이미지 호출
 * @param target
 * @param msg
 */
function lodingOn(target, msg, w, h) {
	var hit = $(target).height();
	if(hit === 0) {
		hit = target.innerHeight;
	}
	
	var left = ($(target).width() - w ) / 2;
	var top  = (hit - h) / 2;
	
	var str = "\n<div class=\"loding_line\" style=\"position:absolute; z-index:10000; left:" + left + "px; top:" + top + "px; width:" + w + "px; height:" + h + "px; text-align:center; background-color:#fff; border:2px solid silver; border-radius:15px;\">" +
	"\n\t<table width=\"100%\" height=\"" + h + "\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td style=\"font-size:13px; text-align:center; vertical-align:middle;\">" + 
	"\n\t<img src=\"/resource/mng/img/ajax-loader.gif\" alt=\"\" /><br/>" + msg +
	"\n\t</td></tr></table>" +
	"\n</div>" +
	"\n<div class=\"ui-widget-overlay ui-front loding_line\"></div>";
	$(target).append(str);
}

/**
 * 로딩 이미지 제거
 * @param target
 */
function lodingOff(target) {
	$(target).find(".loding_line").remove();
}

/**
 * 내부 로딩
 */
function lodingOnTarget(target, msg, h) {
	var str = "\n<div class=\"loding_line\" style=\"height:" + h + "px; line-height:" + h + " text-align:center;\">" +
	"\n\t<table width=\"100%\" height=\"" + h + "\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td style=\"font-size:13px; text-align:center; vertical-align:middle;\">" + 
	"\n\t<img src=\"/resource/mng/img/ajax-loader.gif\" alt=\"로딩 이미지\" /><br/>" + msg +
	"\n\t</td></tr></table>" +
	"\n</div>";
	
	$(target).html(str);
}

/**
 * 내부 로딩 - 테이블
 */
function lodingOnTarget_tb(target, msg, h, loadFlag) {
	var str = '<tr><td colspan="30" style="height:' + h + 'px; border:0; font-size:13px; text-align:center; vertical-align:middle;">';
	if(loadFlag) {
		str += '<img src="/resource/mng/img/ajax-loader.gif" alt="로딩 이미지" /><br/>';
	}
	str += msg + '</td></tr>';
	
	$(target).html(str);
}

/**
 * 내부 알림
 */
function alertOnTarget(target, msg, h) {
	var str = "\n<div class=\"loding_line\" style=\"height:" + h + "px; line-height:" + h + " text-align:center; border:0;\">" +
	"\n\t<table width=\"100%\" height=\"" + h + "\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"border:0;\"><tbody style=\"border:0;\"><tr><td style=\"border:0; font-size:13px; text-align:center; vertical-align:middle;\">" + 
	"\n\t" + msg +
	"\n\t</td></tr></tbody></table>" +
	"\n</div>";
	
	$(target).html(str);
}