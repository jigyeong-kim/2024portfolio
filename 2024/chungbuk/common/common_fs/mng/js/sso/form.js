$(document).ready(function() {
	var f = document.forms['frm'];

	$.when($('#page-loader').addClass('hide')).done(function() {
		$('#page-container').addClass('in');
	});

	$('#frm').validate({
		submitHandler: function(form) {

			$.ajax({
				url : '/adm/sso/login',
				type : 'POST',
				data : {
					'userId': form.userId.value,
					'userPw': form.userPw.value,
					'saveId': form.saveId.checked
				},
				dataType : 'json',
				error : function(r, s, e) { alert('code:' + r.status + '\nmessage:' + r.responseText + '\nerror:' + e); },
				success:function(result) {
					if(result.msg != '') {
						alert(result.msg);
						if(result.msg.indexOf('아이디') != -1) {
							$('#userId').val('');
							$('#userPw').val('');
							$('#userId').focus();
						} else {
							$('#userPw').val('');
							$('#userPw').focus();
						}
					} else {
						document.location.href = form.refer.value;
					}

					return false;
				}
			});
		},
		rules : {
			userId : { required:true },
			userPw : { required:true }
		},
		messages : {
			userId : { required:'필수 입력사항 입니다.' },
			userPw : { required:'필수 입력사항 입니다.' }
		}
	});

	var cookieId = f.cid.value;

	if(cookieId != null && cookieId.length > 0) {
		$('#saveId').prop('checked', true);
		$('#userId').val(cookieId);
		$('#userPw').focus();
	} else {
		$('#saveId').prop('checked', false);
		$('#userId').focus();
	}

});