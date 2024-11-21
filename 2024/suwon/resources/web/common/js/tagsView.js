$(document).ready(function(){
    // 해당페이지를 호출 하기전 데이터 바인딩이 되어야 함
    // CMS 메뉴 : var tagsData = {domainCd:'dataVo.domainCd', menuType:'dataVo.menuType', menuCode:'dataVo.menuCode'};
    // 게시판 : var tagsData = {menuType:'webBoard', oItemCd:'param.bbsCd', oItemSeq:'param.seq'};
    $.getJSON("/web/tags/ND_GetTagsJson.do", tagsData, function( data ) {
        if(data) {
            var genderTypeNames = [{'key':'M', 'val':'남'}, {'key':'F', 'val':'여'}];
            var ageTypeNames = [{'key':'NB', 'val':'영유아'}, {'key':'CH', 'val':'어린이'}, {'key':'YU', 'val':'청소년'}, {'key':'AD', 'val':'성인'}, {'key':'OM', 'val':'노인'}];
            var ageNumTypeNames = [{'key':'UTW', 'val':'20대 미만'}, {'key':'ATW', 'val':'20대'}, {'key':'ATH', 'val':'30대'}, {'key':'AFO', 'val':'40대'}, {'key':'AFI', 'val':'50대'}, {'key':'ASI', 'val':'60대'}, {'key':'ASE', 'val':'70대 이상'}];
            var areaTypeNames = [{'key':'GJA', 'val':'장안구'}, {'key':'GKS', 'val':'권선구'}, {'key':'GPD', 'val':'팔달구'}, {'key':'GYT', 'val':'영통구'}, {'key':'ETC', 'val':'기타지역'}];
            var tagNameArray = [];
            var genderTypeArray = [];
            var ageTypeArray = [];
            var ageNumTypeArray = [];
            var areaTypeArray = [];
            var sectionTypeHanArray = [];
            var htmlData = '';
            for(var i = 0; i < data.length; i++){
                if(data[i].genderType != null && data[i].genderType != ''){
                    //genderTypeArray.push(genderTypeNames[data[i].genderType]);
                    genderTypeArray.push(data[i].genderType);
                }
                if(data[i].ageType != null && data[i].ageType != ''){
                    //ageTypeArray.push(ageTypeNames[data[i].ageType]);
                    ageTypeArray.push(data[i].ageType);
                }
                if(data[i].ageNumType != null && data[i].ageNumType != ''){
                    //ageNumTypeArray.push(ageNumTypeNames[data[i].ageNumType]);
                    ageNumTypeArray.push(data[i].ageNumType);
                }
                if(data[i].areaType != null && data[i].areaType != ''){
                    //areaTypeArray.push(areaTypeNames[data[i].areaType]);
                    areaTypeArray.push(data[i].areaType);
                }
                if(data[i].sectionTypeHan != null && data[i].sectionTypeHan != ''){
                    sectionTypeHanArray.push(data[i].sectionTypeHan);
                }
                if(data[i].tagName != null && data[i].tagName != ''){
                    tagNameArray.push(data[i].tagName);
                }
            }
            var arrayCheckToText = function(keyValArray, checkArray){
                var textArray = [];
                for(var i = 0; i < keyValArray.length; i++){
                    var key = keyValArray[i].key;
                    var val = keyValArray[i].val;
                    for(var l = 0; l < checkArray.length; l++){
                        var chKey = checkArray[l];
                        if(key == chKey){
                            textArray.push(val);
                            break;
                        }
                    }
                }
                return textArray.join(',');
            };
            if(genderTypeArray.length > 0){
                if(htmlData != ''){
                    htmlData += ' / ';
                }
                //htmlData += genderTypeArray.join(',');
                htmlData += arrayCheckToText(genderTypeNames, genderTypeArray);
            }
            if(ageTypeArray.length > 0){
                if(htmlData != ''){
                    htmlData += ' / ';
                }
                //htmlData += ageTypeArray.join(',');
                htmlData += arrayCheckToText(ageTypeNames, ageTypeArray);
            }
            if(ageNumTypeArray.length > 0){
                if(htmlData != ''){
                    htmlData += ' / ';
                }
                //htmlData += ageNumTypeArray.join(',');
                htmlData += arrayCheckToText(ageNumTypeNames, ageNumTypeArray);
            }
            if(areaTypeArray.length > 0){
                if(htmlData != ''){
                    htmlData += ' / ';
                }
                //htmlData += areaTypeArray.join(',');
                htmlData += arrayCheckToText(areaTypeNames, areaTypeArray);
            }
            if(sectionTypeHanArray.length > 0){
                if(htmlData != ''){
                    htmlData += ' / ';
                }
                htmlData += sectionTypeHanArray.join(',');
            }
            if(tagNameArray.length > 0){
                if(htmlData != ''){
                    htmlData += ' / ';
                }
                htmlData += tagNameArray.join(',');
            }
            if($('#commonTagsView').length > 0 && htmlData != ''){
                $('#commonTagsView').html(htmlData);
            }
            
        }
    });
});