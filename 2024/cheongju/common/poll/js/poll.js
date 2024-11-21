$('document').ready(function(){
    var $tabLayer = $('.poll_tabLayer'),
        $tabBtn = $('.tab_button'),
        $tabCnt = $('.tab_content');

    $tabBtn.on('click', function(){
        if( $(this).parent().hasClass('active')) {

        } else {
            $tabLayer.find('.active').removeClass('active');
            $(this).parent().addClass('active');
        }
    });
});


function elecFormSubmit(frm) {
	if( !Trim(frm.name.value) ) {
		alert("성명을 입력해 주세요");
		frm.name.focus();
		return false;
	}

	if( !Trim(frm.brthdy.value) || frm.brthdy.value.length < 6 ) {
		alert("주민등록번호 앞 6자리를 입력해 주세요");
		frm.brthdy.focus();
		return false;
	}
}

function elecFormSubmit2(frm) {
	if( !Trim(frm.name.value) ) {
		alert("성명을 입력해 주세요");
		frm.name.focus();
		return false;
	}

	if( !Trim(frm.brthdy.value) || frm.brthdy.value.length < 6 ) {
		alert("주민등록번호 앞 6자리를 입력해 주세요");
		frm.brthdy.focus();
		return false;
	}

	if( !Trim(frm.ihidnum.value) || frm.ihidnum.value.length < 3 ) {
		alert("주민등록번호 끝3자리를 입력해 주세요");
		frm.ihidnum.focus();
		return false;
	}
}

function elecFobjctCnfirmSubmit(frm) {
	if( !Trim(frm.name.value) ) {
		alert("성명을 입력해 주세요");
		frm.name.focus();
		return false;
	}

	if( !Trim(frm.brthdy.value) || frm.brthdy.value.length < 6 ) {
		alert("주민등록번호 앞 6자리를 입력해 주세요");
		frm.brthdy.focus();
		return false;
	}

	if( !Trim(frm.passwd.value) ) {
		alert("비밀번호를 입력해 주세요");
		frm.passwd.focus();
		return false;
	}

	return true;
}

function elecFobjctSubmit(frm) {
	if( !Trim(frm.name.value) ) {
		alert("성명을 입력해 주세요");
		frm.name.focus();
		return false;
	}

	if( !Trim(frm.brthdy.value) || frm.brthdy.value.length < 6 ) {
		alert("주민등록번호 앞 6자리를 입력해 주세요");
		frm.brthdy.focus();
		return false;
	}
	
	if( !Trim(frm.cttpc.value) || !Trim(frm.email.value) ) {
		alert("연락처 또는 이메일 정보를 입력해 주세요");
		frm.cttpc.focus();
		return false;
	}
	
	if( !Trim(frm.fobjctCn.value) ) {
		alert("이의신청 내용을 입력해 주세요");
		frm.fobjctCn.focus();
		return false;
	}

	return true;
}