var tagsFormWrapPX = '#tagsForm ';
// 태그 설정관련 폼 체크
function tagsFormCheck(){
    if($(tagsFormWrapPX + 'input[name=genderTypeSel]:checked').length < 1) {
        alert('성별을 선택해 주세요.');
        $(tagsFormWrapPX + 'input[name=genderTypeSel]:eq(0)').focus();
        return false;
    }
    if($(tagsFormWrapPX + 'input[name=ageTypeSel]:checked').length < 1) {
        alert('연령대를 선택해 주세요.');
        $(tagsFormWrapPX + 'input[name=ageTypeSel]:eq(0)').focus();
        return false;
    }
    if($(tagsFormWrapPX + 'input[name=ageNumTypeSel]:checked').length < 1) {
        alert('연령대를 선택해 주세요.');
        $(tagsFormWrapPX + 'input[name=ageNumTypeSel]:eq(0)').focus();
        return false;
    }
    if($(tagsFormWrapPX + 'input[name=areaTypeSel]:checked').length < 1) {
        alert('지역을 선택해 주세요.');
        $(tagsFormWrapPX + 'input[name=areaTypeSel]:eq(0)').focus();
        return false;
    }
    /*
    if($.trim($(tagsFormWrapPX + 'select[name=sectionTypeSel] option:selected').val()) == '') {
        alert('분야를 선택해 주세요.');
        $(tagsFormWrapPX + 'select[name=sectionTypeSel]:eq(0)').focus();
        return false;
    }
    */
    if($(tagsFormWrapPX + 'input[name=sectionTypeSel]:checked').length < 1) {
        alert('분야를 선택해 주세요.');
        $(tagsFormWrapPX + 'input[name=sectionTypeSel]:eq(0)').focus();
        return false;
    }
    if($.trim($(tagsFormWrapPX + 'input[name=tagName]').val()) == '') {
        alert('태그를 입력해 주세요.');
        $(tagsFormWrapPX + 'input[name=tagName]:eq(0)').focus();
        return false;
    }
    return true;
}

$(document).ready(function(){
    $(tagsFormWrapPX + "input[name=chk-all]").click(function() {
        var isChecked = this.checked;
        var targetC = $(this).val();

        $(tagsFormWrapPX + "input[name=" + targetC + "]").attr('checked', isChecked);
        /*$(tagsFormWrapPX + "input[name=" + targetC + "]").click(function(){
            var childChecked = this.checked;
            if(!childChecked) {
                $(tagsFormWrapPX + "input[name=chk-all][value=" + targetC + "]").attr('checked', childChecked);
            }
        });*/
    });
    $(tagsFormWrapPX + "input[name=chk-all]").each(function(){
        var $this = $(this);
        var targetC = $(this).val();
        var targetCEle = $(tagsFormWrapPX + "input[name=" + targetC + "]");
        targetCEle.bind('change', function(){
            var targetCEleChecked = $(tagsFormWrapPX + "input[name=" + targetC + "]:checked");
            if(targetCEle.length == targetCEleChecked.length){
                $this.attr('checked', 'checked');
            }else{
                $this.removeAttr('checked');
            }
        });
    });
    
    $(tagsFormWrapPX + 'input[name=sectionTypeSel]').each(function(){
       $(this).next().css({'padding':'0 8px 0 4px'});
       var __index = $(this).attr('id').substring($(this).attr('id').lastIndexOf('_') + 1, $(this).attr('id').length);
       if(__index % 5 == 0){
           $('<br />').insertAfter($(this).next());
       }
    });
    
    // 해당페이지를 호출 하기전 데이터 바인딩이 되어야 함
    // CMS 메뉴 : var tagsData = {domainCd:'dataVo.domainCd', menuType:'dataVo.menuType', menuCode:'dataVo.menuCode'};
    // 게시판 : var tagsData = {menuType:'webBoard', oItemCd:'param.bbsCd', oItemSeq:'param.seq'};
    $.getJSON("/web/tags/ND_GetTagsJson.do", tagsData, function( data ) {
        if(data) {
            var tmpArray = [];
            for(var i = 0; i < data.length; i++){
                if(data[i].tagName != null && data[i].tagName != ''){
                    tmpArray.push(data[i].tagName);
                }
                if(data[i].genderType != null && data[i].genderType != ''){
                    $(tagsFormWrapPX + 'input[name=genderTypeSel]').each(function(){
                        if($(this).val() == data[i].genderType){
                            $(this).attr('checked', 'checked');
                        }
                        $(this).trigger('change');
                    });
                }
                if(data[i].ageType != null && data[i].ageType != ''){
                    $(tagsFormWrapPX + 'input[name=ageTypeSel]').each(function(){
                        if($(this).val() == data[i].ageType){
                            $(this).attr('checked', 'checked');
                        }
                        $(this).trigger('change');
                    });
                }
                if(data[i].ageNumType != null && data[i].ageNumType != ''){
                    $(tagsFormWrapPX + 'input[name=ageNumTypeSel]').each(function(){
                        if($(this).val() == data[i].ageNumType){
                            $(this).attr('checked', 'checked');
                        }
                        $(this).trigger('change');
                    });
                }
                if(data[i].areaType != null && data[i].areaType != ''){
                    $(tagsFormWrapPX + 'input[name=areaTypeSel]').each(function(){
                        if($(this).val() == data[i].areaType){
                            $(this).attr('checked', 'checked');
                        }
                        $(this).trigger('change');
                    });
                }
                /*
                if(data[i].sectionType != null && data[i].sectionType != ''){
                    $(tagsFormWrapPX + 'select[name=sectionTypeSel] option').each(function(){
                        if($(this).val() == data[i].sectionType){
                            $(this).attr('selected', 'selected');
                        }
                    });
                }
                */
                if(data[i].sectionType != null && data[i].sectionType != ''){
                    $(tagsFormWrapPX + 'input[name=sectionTypeSel]').each(function(){
                        if($(this).val() == data[i].sectionType){
                            $(this).attr('checked', 'checked');
                        }
                        $(this).trigger('change');
                    });
                }
            }
            $(tagsFormWrapPX + 'input[name=tagName]').val(tmpArray.join(','));
        }
    });
});