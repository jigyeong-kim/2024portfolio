var color = ['usable','usable','usable'];
$(document).ready(function(){
	
	$(".category_list").find(".category_item").removeClass("active");
	$(".category_list").find(".depth2").attr('style', "display:none;");
	$(".category_list").find(".n1").addClass("active");
	$(".category_list").find(".n1").children(".depth2").attr('style', "display:block;");
	$(".category_list").find(".n1").children(".depth_text").attr('title', '선택됨');
	
    //dataListElement();
	$('.category .category_content').find(".listbox").attr('style', "display:none;");
	$('.category .category_content').find('.pagination').attr('style', "display:none;");
});


function dataListElement(dataCode) {
	
	var dataListLi = '',
		$dataList = $('.listbox').find('.listitem');
		$listitemList = $('.depth_text[data-code="' + dataCode + '"]').siblings('.listbox').find('.listitem');

	var bool = true;
	if(dataCode == 157 || dataCode == 158 || dataCode == 241 || dataCode == 250|| dataCode == 136 || dataCode == 137 || dataCode == 269 || dataCode == 279 ){
		bool = false;
	}

	//시설 목록  (바우길제외)
	smartMapData.forEach(function( item, index ) {

		if (dataCode == item.ctgryNo) {
			
			dataListLi +=
				   '<button type="button" class="itembtn cateitem" data-color="0" data-code="' + item.ctgryNo + '" data-title="' + item.title + '" '+
		           'data-latitude="' + item.lat + '" data-longtitude="' + item.lng + '"' +
		           'data-cntrwkPd="' + item.cntrwkPd + '" data-cnstrctr="' + item.cnstrctr + '" data-cntrInfo="' + item.cntrInfo + '" data-chargerDept="' + item.chargerDept + '"' +
		           'data-address="' + item.address + '" data-tel="' + item.tel + '" data-dong="' + item.local + '" data-homepage="' + item.homepage + '"> '+ item.title + '\n' +
		           '</button>\n'+
		           '<div class="detail">' + item.detail + '</div>\n';
		}

	});
	
	//$dataList.empty();
	//$dataList.append(dataListLi);
	//$('.category .category_content').find(".listbox").attr('style', "display:none;");
	//$('.category .category_content').find('.pagination').attr('style', "display:none;");
	
	$listitemList.empty();
	$listitemList.append(dataListLi);
	$listitemList.parent('.listbox').attr('style', "display:block;");

	if(dataListLi.length == 0 && bool) {
		alert("등록된 시설이 없습니다.");
		$listitemList.parent('.listbox').attr('style', "display:none;");
	}
}


// 1차메뉴 클릭시
$('.depth1_inner .category_item, .depth1_inner .road_item').on("click", function() {
	var $Addbox = $('.addbox'),
	AddboxIsActive = $Addbox.is('.active');
//console.log("searchChk : " + searchChk);
	if(searchChk != 1) {
		$(".category_list").find(".category_item").removeClass("active");	// 2차 또는 3차메뉴 클릭시(바우길제외)
		$(".category_list").find(".road_item").removeClass("active");		// 바우길
		$(".category_list").find(".depth2").attr('style', "display:none;");
	    $(this).addClass("active");
	    $(this).children(".depth_text").attr('title', '선택됨');
	    $(this).children(".depth2").attr('style', "display:block;");
	    $(this).find('.depth_item').attr('style', "display:block;");
		$(".searchDisplay").attr('style', "display:none;");	// 2022-11-13_ 1차메뉴클릭시 검색 카테고리 사라지게 수정 
	}
	
	if(AddboxIsActive) {
		searchChk = 0;
	}
	
});

//범례
var LabelCode = [92, 14, 95, 103, 18, 30, 153, 77];
var LabelContent = [
	'한국은행, 농협, KB국민은행, 신한은행, 기업은행, 하나은행, 우리은행',
	'복지관, 지역자활, 노숙인, 정신보건',
	'아동양육, 아동보호, 공동생활가정, 지역아동센터',
	'거주시설, 직업재활, 지역재활, 센터, 공동생활가정',
	'공중화장실, 개방화장실',
	'근린공원, 문화공원, 어린이공원, 소공원, 기타공원',
	'노상, 노외',
	'국공립어린이집, 민간어린이집, 가정어린이집, 직장어린이집, 법인어린이집'
];
$.each(LabelCode, function(index){
	var ThisCode = LabelCode[index];
	$('.category .category_content .depth_text[data-code="'+ThisCode+'"]').addClass('labelitem').attr('data-label', index);
});
var $Labelbox = $('.labelbox'),
	$LabelboxBtn = $('.labelbox .close_overlay'),
	$LabelCon = $('.labelbox .conbox'),
	$LabelConText = $('.labelbox .conbox .text');

$('.labelbox .close_overlay').on('click', function(){
	var $this = $(this),
		IsActive = $Labelbox.is('.active');
	if(!IsActive){
		$Labelbox.addClass('active');
		setTimeout(function(){
			$LabelCon.slideDown(250);
		}, 250);
		$this.attr('title', '범례닫기').text('범례닫기');
	} else{
		$LabelCon.slideUp(250, function(){
			$Labelbox.removeClass('active');
		});
		$this.attr('title', '범례열기').text('범례열기');
	}
});

//동 위치
var donglocations = [
	{latitude:37.8940411488247,longtitude:128.823381204357},
	{latitude:37.7188023507986,longtitude:128.83248241131},
	{latitude:37.6726750003027,longtitude:128.837711963658},
	{latitude:37.7183286899598,longtitude:128.880057644912},
	{latitude:37.7280068734751,longtitude:128.953920482115},
	{latitude:37.6126573583039,longtitude:129.037927154616},
	{latitude:37.8237935601966,longtitude:128.848628631134},
	{latitude:37.8598169684827,longtitude:128.836801447186},
	{latitude:37.748347522317,longtitude:128.883640436264},
	{latitude:37.7561317841466,longtitude:128.89412677152},
	{latitude:37.7601464216814,longtitude:128.902901137286},
	{latitude:37.7655443665957,longtitude:128.874462410638},
	{latitude:37.7679749900399,longtitude:128.892337462827},
	{latitude:37.7659820188422,longtitude:128.908150273429},
	{latitude:37.7728110083175,longtitude:128.913398396502},
	{latitude:37.7918781789752,longtitude:128.915959931478},
	{latitude:37.7744700259279,longtitude:128.927574344529},
	{latitude:37.7389777358275,longtitude:128.880967425689},
	{latitude:37.7441968928691,longtitude:128.905651086214},
	{latitude:37.7837997641193,longtitude:128.880639206644},
	{latitude:37.7633375719641,longtitude:128.913500666185}
];

//동클릭
$('.category .dongbox .layer ul li .dongbtn').on('click', function(event){
	var $this = $(this),
		thisText = $this.text(),
		$MyParent = $this.parent('li'),
		ParentIndex = $MyParent.index(),
		$Dongbox = $this.parents('.dongbox'),
		$SelectDong = $Dongbox.find('.selectdong'),
		$Layer = $this.parents('.layer'),
		IsActive = $MyParent.is('.active'),
		$OtherParents = $MyParent.siblings('li'),
		$OtherBtns = $OtherParents.find('.dongbtn'),
		$CategoryBox = $('.category'),
		IsCategoryBoxActive = $CategoryBox.is('.active');
	if(!IsActive){
		$OtherBtns.removeAttr('title');
		$OtherParents.removeClass('active');
		$MyParent.addClass('active');
		$this.attr('title', '선택됨');
		$Layer.slideUp();
		if(ParentIndex!=0){
			var ThisLatitude = donglocations[ParentIndex-1].latitude,
				ThisLongtitude = donglocations[ParentIndex-1].longtitude;
			panTo(ThisLatitude, ThisLongtitude);
			if(IsCategoryBoxActive){
				$CategoryBox.removeClass('active');
			}
		}
		$SelectDong.attr('title', '리스트열기');
		$SelectDong.find('span').text(thisText);
		$Dongbox.removeClass('active');
	} else{
		$Layer.slideUp();
		$SelectDong.attr('title', '리스트열기');
		$Dongbox.removeClass('active');
	}
	event.preventDefault();
});



//기능제외(단순링크)
var ExceptCode = [157, 158, 241, 269, 250, 136, 137, 279];
// 2차, 3차메뉴 클릭시(a태그)
$('.category_item .depth3_text, .category_item .depth2_text, .category_item .searchDisplay .depth2_text').on("click", function() {
	
	var $this = $(this),
		ctgryCode= $(this).data("code"),
		ctgryNm= $(this).data("name"),
		parentItem = $(this).closest("li"),
		$Listitem = parentItem.find('.listitem'),
		$Addbox = $('.addbox'),
		AddboxIsActive = $Addbox.is('.active'),
		AddLength = $Addbox.find('button').length,
		IsLabelItem = $(this).is('.labelitem'),
		IsLabelboxVisible = $Labelbox.is('.visible'),
		IsLabelboxActive = $Labelbox.is('.active'),
		$CategoryBox = $('.category'),
		IsCategoryBoxActive = $CategoryBox.is('.active');
	var IamExcept = ExceptCode.indexOf(ctgryCode);
	if(IamExcept<0){
		if(IsLabelItem){
			var ThisLabelIndex = $this.attr('data-label'),
				ThisContent = LabelContent[ThisLabelIndex];
		}
		
		//$Addbox.addClass('active'); 2022-10-05
		
		var $MyParent = $(this).parent('.depth_item'),
			IsSelected = $MyParent.is('.selected');
			
		if(IsSelected) {
			$MyParent.removeClass('selected');
			$(this).removeAttr('title');
			
			// listBox 선택 카테고리 제거
			$(this).nextAll().attr('style', "display:none;");
			
			lifemarkers = [];
			//polymarkers = [];
			if(AddLength == 0) {
				// 전부 선택 해제 해서 addbox에 리스트는 없는데, active되어있을때
				$Addbox.removeClass('active');
			}
			
			var selectedAll = $('.depth_item.selected').length,
			$ListSelected = $('.depth_item.selected');
			
			if(AddLength == 1) { // addbox 한개 선택 (active해제)
				// addbox 선택 카테고리 제거
				$Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').remove();

				clearMarkers();
				kakaomarkers = [];
				if (customOverlay) {
					customOverlay.setMap(null);
				}
				$Addbox.removeClass('active');
				//history.replaceState({}, null, location.pathname);
				color = ['usable','usable','usable'];
				
				if(ctgryCode==242){
					clearParkingPolys();
					Parkinglinearray = [];
					kakaoParkinglinepath = [];
				}
				
			} else { // addbox 카테고리가 2개 이상
				var CateItemLength = $Addbox.find('.itembtn[data-type="category"]').length;
				if(CateItemLength == 1) {
					clearMarkers();
					kakaomarkers = [];
					if (customOverlay) {
						customOverlay.setMap(null);
					}
					var ActiveColor = $Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').attr('data-color');
					color[ActiveColor] = 'usable';
					$Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').remove();
					if(ctgryCode==242){
						clearParkingPolys();
						Parkinglinearray = [];
						kakaoParkinglinepath = [];
					}
				} else {
					console.log('ctgryCode : ' + ctgryCode);
					console.log('data-title : ' + $this.attr('data-title'));
					console.log('data-latitude : ' + $this.attr('data-latitude'));
					console.log('data-longtitude : ' + $this.attr('data-longtitude'));
					console.log('data-address : ' + $this.attr('data-address'));
					console.log('data-tel : ' + $this.attr('data-tel'));
					console.log('data-dong : ' + $this.attr('data-dong'));
					console.log('data-homepage : ' + $this.attr('data-homepage'));
					console.log('detail : ' + $this.next('.detail').text());
					console.log('data-cntrwkPd : ' + $this.attr('data-cntrwkPd'));
					console.log('data-cnstrctr : ' + $this.attr('data-cnstrctr'));
					console.log('data-cntrInfo : ' + $this.attr('data-cntrInfo'));
					console.log('data-chargerDept : ' + $this.attr('data-chargerDept'));
					console.log('data-color : ' + $this.attr('data-color'));
					console.log('data-indexcolor : ' + $this.attr('data-indexcolor'));
					var ActiveColor = $Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').attr('data-color');
					color[ActiveColor] = 'usable';
					// addbox선택 카테고리 제거
					$Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').remove();
					$Listitem.find('.cateitem').removeAttr('data-indexcolor');
					/*$Listitem.find('.cateitem').each(function() {*/
					var CateItemLength = $ListSelected.find('.cateitem').length;
					if(CateItemLength){
						$ListSelected.find('.cateitem').each(function() {
							var $this = $(this),
								thisCode = $this.attr('data-code'),
								thisTitle = $this.attr('data-title'),
								thislatitude = $this.attr('data-latitude'),
								thislongtitude = $this.attr('data-longtitude'),
								thisAddress = $this.attr('data-address'),
								thisTel = $this.attr('data-tel'),
								thisDong = $this.attr('data-dong'),
								thisHomepage = $this.attr('data-homepage'),
								thisDetail = $this.next('.detail').text(),
								thisCntrwkPd = $this.attr('data-cntrwkPd'),
								thisCnstrctr = $this.attr('data-cnstrctr'),
								thisCntrInfo = $this.attr('data-cntrInfo'),
								thisChargerDept = $this.attr('data-chargerDept'),
								ThisColor = $this.attr('data-color'),
								ThisCode = $this.attr('data-code'),
								indexColor = $this.attr('data-indexcolor');
							lifemarkers.push({
								code: thisCode,
								title: thisTitle,
								latlng: new kakao.maps.LatLng(thislatitude, thislongtitude),
								latitude: thislatitude,
								longtitude: thislongtitude,
								address: thisAddress,
								tel: thisTel,
								dong: thisDong,
								homepage: thisHomepage,
								detail: thisDetail,
								cntrwkPd: thisCntrwkPd,
								cnstrctr: thisCnstrctr,
								cntrInfo: thisCntrInfo,
								chargerDept: thisChargerDept,
								markercolor: ThisColor,
								indexcolor:indexColor
							});
						});
						changeMarkers();
						var $FirstItem = $ListSelected.find('.cateitem').first(),
							FirstLatitude = $FirstItem.attr('data-latitude'),
							FirstLongtitude = $FirstItem.attr('data-longtitude');
						panTo(FirstLatitude, FirstLongtitude);
					} else{
						clearMarkers();
						kakaomarkers = [];
						if (customOverlay) {
							customOverlay.setMap(null);
						}
					}
					var ParkingItemLength = $ListSelected.find('.depth_text[data-code="242"]').length;
				}
				
				$(this).nextAll().attr('style', "display:none;");
			}
			if(IsLabelboxVisible){
				$Labelbox.removeClass('visible active');
				$LabelConText.empty();
				$LabelCon.removeAttr('style');
				$LabelboxBtn.attr('title', '범례열기').text('범례열기');
			}

		} else {	// 최초 선택
			
			if(AddLength == 3) {
				alert('최대 3개까지 선택 가능합니다.');
			} else {
				
				//$Addbox.addClass('active');
				
				// 시설 목록 리스트
				if(ctgryCode!=242){		//주정차금지제외
					dataListElement(ctgryCode);
				}
				
				var listboxChk = $Listitem.find("button");
					
				if(listboxChk.length != 0) {
					
					$Addbox.addClass('active');

					//페이징 관련 변수
					var totalCount,					// 총 데이터의 갯수
						totalPage,					// 총 페이지 
						dataPerPage = 10,			// 한 페이지에 나타낼 데이터의 갯수
						pageCount = 5,				// 화면에 나타날 페이지 갯수
						pageGroup,					// 페이지그룹(현재 페이지가 몇 번째 그룹인지 확인) 
						currentPage = 1;			// 현재 페이지
		
					$MyParent.addClass('selected');
					$(this).attr('title', '선택됨');


					if(IsLabelItem){
						$LabelConText.text(ThisContent);
						$Labelbox.addClass('visible');
					} else{
						if(IsLabelboxVisible){
							$Labelbox.removeClass('visible active');
							$LabelConText.empty();
							$LabelCon.removeAttr('style');
							$LabelboxBtn.attr('title', '범례열기').text('범례열기');
						}
					}
					
					parentItem.find("button").each(function (index, item) {
					
						var ThisCode = $(this).attr('data-code');
						
						if(ctgryCode == ThisCode) {
							parentItem.find('.listbox').attr('style', "display:block;");
							parentItem.find('.pagination').attr('style', "display:block;");
							parentItem.find('.listbox .cateitem').attr('style', "display:none;");
						} else {
							$(this).next(".detail").remove();
							$(this).remove();
						}
					});
					
					var totalCount = $Listitem.find('button').length;
		//alert("totalCount >>>>>> " + totalCount + "****** ctgryCode : " + ctgryCode);

					// 페이징 데이터
					displayData(totalCount, dataPerPage, pageCount, currentPage, ctgryCode);
		
					var $ListSelected = $('.depth_item.selected');
		
					lifemarkers = [];
					var usable = color.indexOf('usable');
					// listBox 지도에 전체 표출
					$Listitem.find('.cateitem').attr('data-indexcolor', usable);
					$ListSelected.find('.cateitem').each(function() {
					/*$Listitem.find('.cateitem').each(function() {*/
						var $this = $(this),
							thisCode = $this.attr('data-code'),
							thisTitle = $this.attr('data-title'),
							thislatitude = $this.attr('data-latitude'),
							thislongtitude = $this.attr('data-longtitude'),
							thisAddress = $this.attr('data-address'),
							thisTel = $this.attr('data-tel'),
							thisDong = $this.attr('data-dong'),
							thisHomepage = $this.attr('data-homepage'),
							thisDetail = $this.next('.detail').text(),
							thisCntrwkPd = $this.attr('data-cntrwkPd'),
							thisCnstrctr = $this.attr('data-cnstrctr'),
							thisCntrInfo = $this.attr('data-cntrInfo'),
							thisChargerDept = $this.attr('data-chargerDept'),
							ThisColor = $this.attr('data-indexcolor'),
							ThisCode = $this.attr('data-code');
						lifemarkers.push({
							code: thisCode,
							title: thisTitle,
							latlng: new kakao.maps.LatLng(thislatitude, thislongtitude),
							latitude: thislatitude,
							longtitude: thislongtitude,
							address: thisAddress,
							tel: thisTel,
							dong: thisDong,
							homepage: thisHomepage,
							detail: thisDetail,
							cntrwkPd: thisCntrwkPd,
							cnstrctr: thisCnstrctr,
							cntrInfo: thisCntrInfo,
							chargerDept: thisChargerDept,
							markercolor: ThisColor,
							indexcolor:ThisColor
						});
					});
					
					changeMarkers();
					
					var $FirstItem = $Listitem.find('.cateitem').first(),
						FirstLatitude = $FirstItem.attr('data-latitude'),
						FirstLongtitude = $FirstItem.attr('data-longtitude');
					
					panTo(FirstLatitude, FirstLongtitude);
					//$MyParent.addClass('selected'); 2022-10-05
					//$(this).attr('title', '선택됨');
		
					var	FirstActiveCatetype = $(this).is('.roaditem'),	// 바우길
						FirstCateType = 'category';
					if(FirstActiveCatetype) {
						FirstCateType = 'road';
					}
					
					// addbox 추가
					var addBtnSource = '<button type="button" data-type="'+FirstCateType+'" data-code="' + ctgryCode + '" data-color="'+usable+'" title="삭제" class="addbtn itembtn"><span>' + ctgryNm + '</span></button>';
					$Addbox.append(addBtnSource);
					color[usable] = 'disabled';
					
				}
				if(ctgryCode==242){//주정차금지구역
					$Addbox.addClass('active');
					$MyParent.addClass('selected');
					var usable = color.indexOf('usable');
					$Listitem.attr('data-indexcolor', usable);
					$(this).attr('title', '선택됨');
					createParikng();
					var	FirstActiveCatetype = $(this).is('.roaditem'),	// 바우길
						FirstCateType = 'category';
					if(FirstActiveCatetype) {
						FirstCateType = 'road';
					}
					// addbox 추가
					var addBtnSource = '<button type="button" data-type="'+FirstCateType+'" data-code="' + ctgryCode + '" data-color="'+usable+'" title="삭제" class="addbtn itembtn"><span>' + ctgryNm + '</span></button>';
					$Addbox.append(addBtnSource);
					color[usable] = 'disabled';
				}
			}
			if(IsCategoryBoxActive){
				$CategoryBox.removeClass('active');
			}
		} // end 최초선택
	}
});


//바우길클릭
$('.road_item .depth3_text').on("click", function() {
	
	var ctgryCode= $(this).data("code"),
		ctgryNm= $(this).data("name"),
		thisTitle= $(this).data("title"),
		thisText = $(this).find('span').text(),
		parentItem = $(this).closest("li"),
		$Loaditem = parentItem.find('.databox .roaditem'),
		$CategoryBox = $('.category'),
		IsCategoryBoxActive = $CategoryBox.is('.active');
	
	var $Addbox = $('.addbox'),		// 이거 다시 확인 !!!! 위에 변수 선언했는데 여기서 언디파인드
	AddboxIsActive = $Addbox.is('.active'),
	AddLength = $Addbox.find('button').length;
	
	$Addbox.addClass('active');
	
	var $MyParent = $(this).parent('.depth_item'),
		IsSelected = $MyParent.is('.selected'),
		$ListSelected2 = $('.depth_item.selected');
	
	$.ajax({
		url: 'baugil/baugil_' + ctgryCode + '.jsp',
		success: function(data) {
			
			/*parentItem.find(".linepath ul").append(data);*/
			parentItem.find(".roaditem").append(data);
			
			if(IsSelected) {
				
				$MyParent.removeClass('selected');
				//$(this).removeAttr('title');
				$MyParent.children(".depth_text").removeAttr('title');
				
				if(AddLength == 0) { // 전부 선택 해제 해서 addbox에 리스트는 없는데, active되어있을때
					$Addbox.removeClass('active');
				}
				
				polymarkers = [];
				var $ListSelected = $('.depth_item.selected');
				
				if(AddLength == 1) {
					$Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').remove();
					clearPolys();
					clearStartOverlay();
					clearEndOverlay();
					StartOverlays = [];
					EndOverlays = [];
					polylinearray = [];
					polykakaomarkers = [];
					kakaomarkers = [];
					/*if (customOverlay) {
						customOverlay.setMap(null);
					} */
					$Addbox.removeClass('active');
					//history.replaceState({}, null, location.pathname);
					color = ['usable','usable','usable'];
					
				} else { // addbox 카테고리가 2개 이상
					var RoadItemLength = $Addbox.find('.itembtn[data-type="road"]').length;

					if(RoadItemLength) {
						if(RoadItemLength == 1) {
							clearPolys();
							clearStartOverlay();
							clearEndOverlay();
							StartOverlays = [];
							EndOverlays = [];
							polylinearray = [];
							polykakaomarkers = [];
							//kakaomarkers = [];
							/*if (customOverlay) {
								customOverlay.setMap(null);
							} */
							var ActiveColor = $Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').attr('data-color');
							color[ActiveColor] = 'usable';
							$Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').remove();

						} else {
							// addbox 선택 카테고리 제거
							var ActiveColor = $Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').attr('data-color');
							color[ActiveColor] = 'usable';
							$Addbox.find('.itembtn[data-code="' + ctgryCode + '"]').remove();
							$Loaditem.removeAttr('data-indexcolor');
							var $ListSelected = $('.depth_item.selected');
							$ListSelected.find('.roaditem').each(function() {
								var Linepath = [],
									$Linepath = $(this).find('.linepath'),
									LinepathLength = $Linepath.length,
									thisTitle = $(this).attr('data-title'),
									thisLineColor = $(this).attr('data-color'),
									$LinepathItems = $(this).find('.linepath_item'),
									indexColor = $(this).attr('data-indexcolor'),
									EachLinepath = [];
								if(LinepathLength) {	// 2022-11-13 _버튼 클릭 후 페이지 하단에 버튼이 생성되는데 해당 버튼 클릭시 작동되는 코드랑 수정전 코드가 달라서 코드를 일치시키니 정상 작동.
									$Linepath.each(function(){
										var $this = $(this),
											$LinepathItems = $this.find('.linepath_item'),
											EachLinepath = [];
										$LinepathItems.each(function(){
											var $this = $(this),
												thislinepathlat = $this.find('.linepathlat').text(),
												thislinepathlng = $this.find('.linepathlng').text();
											EachLinepath.push({
												linepathlat:thislinepathlat,
												linepathlng:thislinepathlng
											});
											
										});
										Linepath.push(EachLinepath);
									});
								}
								polymarkers.push({
									title: thisTitle,
									linepath:Linepath,
									LineColor:thisLineColor,
									indexcolor:indexColor
								});
							});
							changelines();
							var $FirstItem = $ListSelected.find('.roaditem').first(),
								FirstLatitude = $FirstItem.find('.linepath:first-child .linepath_item:first-child').find('.linepathlat').text(),
								FirstLongtitude = $FirstItem.find('.linepath:first-child .linepath_item:first-child').find('.linepathlng').text();
							panTo(FirstLatitude, FirstLongtitude);
						}
					}
					
				}
				
			} else {	// 최초 선택

				if(AddLength == 3) {
					alert('최대 3개까지 선택 가능합니다.');
				} else {
					var usable = color.indexOf('usable');
					$MyParent.addClass('selected');
					$MyParent.children(".depth_text").attr('title', '선택됨');
					$MyParent.find('.roaditem').attr('data-indexcolor', usable);
					var $ListSelected = $('.depth_item.selected');
					polymarkers = [];
					$ListSelected.find('.roaditem').each(function() {
						var Linepath = [],
							$Linepath = $(this).find('.linepath'),
							LinepathLength = $Linepath.length,
							thisTitle = $(this).attr('data-title'),
							thisLineColor = $(this).attr('data-color'),
							ThisColor = $(this).attr('data-indexcolor');
						if(LinepathLength) {
							$Linepath.each(function(){
								$LinepathItems = $(this).find('.linepath_item'),
								EachLinepath = [];
								$LinepathItems.each(function() {
									var	thislinepathlat = $(this).find('.linepathlat').text(),
										thislinepathlng = $(this).find('.linepathlng').text();
									EachLinepath.push({
										linepathlat:thislinepathlat,
										linepathlng:thislinepathlng
									});
								});
								Linepath.push(EachLinepath);	
							});
						}
						polymarkers.push({
							title: thisTitle,
							linepath:Linepath,
							LineColor:thisLineColor,
							indexcolor:ThisColor
						});
					});	
					
					changelines();
					
					//var $databox = $('.databox');
					var $FirstItem = $Loaditem.first(),
						FirstLatitude = $FirstItem.find('.linepath:first-child .linepath_item:first-child').find('.linepathlat').text(),
						FirstLongtitude = $FirstItem.find('.linepath:first-child .linepath_item:first-child').find('.linepathlng').text();
					panTo(FirstLatitude, FirstLongtitude);
					//$MyParent.addClass('selected');
					//$(this).attr('title', '선택됨');
					// var	FirstActiveCatetype = $(this).is('.roaditem'),	// 바우길
					
					var	FirstActiveCatetype = $Loaditem.is('.roaditem'),
						FirstCateType = 'category';
					if(FirstActiveCatetype) {
						FirstCateType = 'road';
					}
					
					// addbox 추가 
					var addBtnSource = '<button type="button" data-type="'+FirstCateType+'" data-code="' + ctgryCode + '" data-color="'+usable+'" title="삭제" class="addbtn itembtn"><span>' + ctgryNm + '</span></button>';
					$Addbox.append(addBtnSource);
					color[usable] = 'disabled';
				}
				if(IsCategoryBoxActive){
					$CategoryBox.removeClass('active');
				}
			}
			
		},
		error:function(request, status, error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			LoadItems();
			alert('데이터가 없습니다.');
		}
	});
});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
	mapOption = {
		center: new kakao.maps.LatLng(37.752110242528225, 128.87588350807638), // 지도의 중심좌표
		level: 4 // 지도의 확대 레벨
	};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


function setDraggable(draggable) {
	// 마우스 드래그로 지도 이동 가능여부를 설정합니다
	map.setDraggable(draggable);
}

function setZoomable(zoomable) {
	// 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
	map.setZoomable(zoomable);
}

setZoomable(true);

function zoomIn() {
	map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
	map.setLevel(map.getLevel() + 1);
}

$('#switch').on('click', function() {
	var chk = $(this).is(':checked');
	if (chk) {
		setDraggable(true);
		setZoomable(true);
	} else {
		setDraggable(false);
		setZoomable(false);
	}
});

$('.map_control .typebtn').on('click', function() {
	var $this = $(this),
		IsActive = $this.is('.active'),
		Type = $this.attr('data-type'),
		$OtherBtn = $this.siblings('.typebtn');
	if (!IsActive) {
		if (Type === 'roadmap') {
			map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
		} else {
			map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
		}
		$OtherBtn.removeClass('active').removeAttr('title');
		$this.addClass('active').attr('title', '선택됨');
	}
});



// 마커 이미지의 이미지 주소입니다
var imageSrc = '/smartMap/images/marker3.png';

// 마커 이미지의 이미지 크기 입니다
var imageSize = new kakao.maps.Size(24, 28);
// 마커 이미지를 생성합니다
function createMarkerImage(src, size, options) {
	var markerImage = new kakao.maps.MarkerImage(src, size, options);
	return markerImage;
}

var marker;

var lifemarkers = [];
var kakaomarkers = [];
var customOverlays;

var ManualCateLength = 3; // 카테고리 갯수
var ManualSpriteWidth = 24 * ManualCateLength;

function createMarker(position, title, DataColor, usable) {
	var spritepoint = 24 * usable;
	var imageOptions = {
		spriteOrigin: new kakao.maps.Point(spritepoint, 0),
		spriteSize: new kakao.maps.Size(ManualSpriteWidth, 28)
	};
	var markerImage = createMarkerImage(imageSrc, imageSize, imageOptions);
	var marker = new kakao.maps.Marker({
		position: position,
		title: title,
		image: markerImage
	});
	return marker;
}

var polymarkers = [];
var polykakaomarkers = [];
var polyline;
var polylinearray = [];
var kakaopolylinepath = [];
var Finalpolyarray = [];
var LineColorArray = ['#fd4000', '#3268e1', '#02a69a'];

function PushPoly(linepathlatlng, thisLineColor, thisindexcolor) {
	kakaopolylinepath = [];

	for (var i = 0; i < linepathlatlng.length; i++) {

		var LinePath = new kakao.maps.LatLng(linepathlatlng[i].linepathlat, linepathlatlng[i].linepathlng);
		kakaopolylinepath.push(LinePath);
	}
	createPolyline(thisindexcolor);
}

function createPolyline(color) {
	polyline = new kakao.maps.Polyline({
		map: map, // 선을 표시할 지도 객체 
		path: kakaopolylinepath,
		strokeWeight: 5, // 선의 두께
		strokeColor: LineColorArray[color], // 선 색
		strokeOpacity: 0.9, // 선 투명도
		strokeStyle: 'solid' // 선 스타일
	});
	Finalpolyarray.push(polyline);
}

function clearPolys() {
	for (var i = 0; i < Finalpolyarray.length; i++) {
		Finalpolyarray[i].setMap(null);
	}
	Finalpolyarray = [];
}


var ParkingLines = [
	{
		'linepathlatlng':[
			{
				'linepathlat':37.753619471033474,
				'linepathlng':128.880102593921
			},
			{
				'linepathlat':37.754102540370106,
				'linepathlng':128.88059702635994
			},
			{
				'linepathlat':37.75459594556702,
				'linepathlng':128.88129028311522
			}
		]
	},
	{
		'linepathlatlng':[
			{
				'linepathlat':37.753254638572564,
				'linepathlng':128.87741857338975
			},
			{
				'linepathlat':37.752731710253066,
				'linepathlng':128.87772871034807
			},
			{
				'linepathlat':37.752217876400245,
				'linepathlng':128.87803340017396
			}
		]
	},
	{
		'linepathlatlng':[
			{
				'linepathlat':37.75677426227737,
				'linepathlng':128.87249243656245
			},
			{
				'linepathlat':37.75762310400491,
				'linepathlng':128.87250532938953
			}
		]
	}
];


//파킹
var Parkingline;
var Parkinglinearray = [];
var kakaoParkinglinepath = [];
var FinalParkingarray = [];
function PushParkingPoly(linepathlatlng) {
	kakaoParkinglinepath = [];
	
	for (var i = 0; i < linepathlatlng.length; i++) {
		var LinePath = new kakao.maps.LatLng(linepathlatlng[i].linepathlat, linepathlatlng[i].linepathlng);
		kakaoParkinglinepath.push(LinePath);
	}
	createParkingline();
}
function createParkingline() {
	Parkingline = new kakao.maps.Polyline({
		map: map, // 선을 표시할 지도 객체 
		path: kakaoParkinglinepath,
		strokeWeight: 2, // 선의 두께
		strokeColor: '#e55135', // 선 색
		strokeOpacity: 0.9, // 선 투명도
		strokeStyle: 'solid' // 선 스타일
	});
	FinalParkingarray.push(Parkingline);
}

function setParkingPolys(map) {
	for (var i = 0; i < FinalParkingarray.length; i++) {
		FinalParkingarray[i].marker.setMap(map);
	}
}

function clearParkingPolys() {
	for (var i = 0; i < FinalParkingarray.length; i++) {
		FinalParkingarray[i].setMap(null);
	}
	FinalParkingarray = [];
}

function createParikng() {
	markers.forEach(function(element, index, array){
		if(markers[index].category==1){
			Parkinglinearray.push(markers[index].linepathlatlng);
			PushParkingPoly(markers[index].linepathlatlng);
		}
	});
}


var startendSpriteWidth = 189;
// 마커 이미지의 이미지 주소입니다
var startendimageSrc = './images/startendmarker.png';

// 마커 이미지의 이미지 크기 입니다
var startendimageSize = new kakao.maps.Size(63, 73);
// 마커 이미지를 생성합니다
function createstartendMarkerImage(src, size, options) {
	var startendmarkerImage = new kakao.maps.MarkerImage(src, size, options);
	return startendmarkerImage;
}

function createstartendMarker(position, title, DataColor) {
	var spritepoint = 63 * DataColor;
	var imageOptions = {
		spriteOrigin: new kakao.maps.Point(spritepoint, 0),
		spriteSize: new kakao.maps.Size(startendSpriteWidth, 73)
	};
	var markerImage = createMarkerImage(startendimageSrc, startendimageSize, imageOptions);
	var marker = new kakao.maps.Marker({
		position: position,
		title: title,
		image: markerImage
	});

	return marker;
}

var StartOverlays = [];
var StartOverlay;
var StartNum = 0;

function Startoverlay() {
	polymarkers.forEach(function(element, index, array) {
		var linepathLength = polymarkers[index].linepath[0].length;
console.log("linepathLength : " + linepathLength);		
		if (linepathLength != 0) {
			var Title = polymarkers[index].title,
				Color = polymarkers[index].LineColor,
				indexColor = polymarkers[index].indexcolor,
				latitude = polymarkers[index].linepath[0][0].linepathlat,
				longtitude = polymarkers[index].linepath[0][0].linepathlng;

			var iwcontent = '<div data-color="'+indexColor+'" class="startendoverlay start item_' + index + '"><div class="overlaybox">' +
				'	<div class="titlebox"><div class="titlehead"></div><div class="title">시작</div></div>' +
				'</div>' +
				'		<button type="button" onclick="closeStartOverlay(' + StartNum + ');" class="close_overlay">닫기</button>' +
				'</div>';

			StartOverlay = new kakao.maps.CustomOverlay({
				map: map,
				position: new kakao.maps.LatLng(latitude, longtitude),
				content: iwcontent,
				yAnchor: 1
			});
			StartOverlays.push(StartOverlay);
			StartNum = StartNum + 1;
		}
	});
}

function closeStartOverlay(IDX) {
	StartOverlays[IDX].setMap(null);
}

function clearStartOverlay() {
	for (var i = 0; i < StartOverlays.length; i++) {
		StartOverlays[i].setMap(null);
	}
	StartOverlays = [];
	StartNum = 0;
}

var EndOverlays = [];
var EndOverlay;
var EndNum = 0;

function Endoverlay() {
	polymarkers.forEach(function(element, index, array) {
		var linepathLength = polymarkers[index].linepath[0].length;

		if (linepathLength != 0) {
			var Title = polymarkers[index].title,
				Color = polymarkers[index].LineColor,
				indexColor = polymarkers[index].indexcolor,
				latitude = polymarkers[index].linepath[0][linepathLength - 1].linepathlat,
				longtitude = polymarkers[index].linepath[0][linepathLength - 1].linepathlng;

			var iwcontent = '<div data-color="'+indexColor+'" class="startendoverlay end item_' + index + '"><div class="overlaybox">' +
				'	<div class="titlebox"><div class="titlehead"></div><div class="title">종료</div></div>' +
				'</div>' +
				'		<button type="button" onclick="closeEndOverlay(' + EndNum + ');" class="close_overlay">닫기</button>' +
				'</div>';

			EndOverlay = new kakao.maps.CustomOverlay({
				map: map,
				position: new kakao.maps.LatLng(latitude, longtitude),
				content: iwcontent,
				yAnchor: 1
			});
			EndOverlays.push(EndOverlay);
			EndNum = EndNum + 1;
		}
	});
}

function closeEndOverlay(IDX) {
	EndOverlays[IDX].setMap(null);
}

function clearEndOverlay() {
	for (var i = 0; i < EndOverlays.length; i++) {
		EndOverlays[i].setMap(null);
	}
	EndOverlays = [];
	EndNum = 0;
}

var StartMarkers = [];
var EndMarkers = [];


function changeMarkers() {
	if (marker) {
		marker.setMap(null);
	}
	if (customOverlay) {
		customOverlay.setMap(null);
	}
	clearMarkers();
	kakaomarkers = [];

	lifemarkers.forEach(function(element, index) {
		marker = createMarker(lifemarkers[index].latlng, lifemarkers[index].title, lifemarkers[index].markercolor, lifemarkers[index].indexcolor);

		kakaomarkers.push({
			marker: marker
		});
		kakao.maps.event.addListener(marker, 'click', function() {
			ListenerOverlay(index, lifemarkers[index].latlng, lifemarkers[index].latitude, lifemarkers[index].longtitude, lifemarkers[index].code, lifemarkers[index].title, lifemarkers[index].address, lifemarkers[index].tel, lifemarkers[index].dong, lifemarkers[index].homepage, lifemarkers[index].detail, lifemarkers[index].cntrwkPd, lifemarkers[index].cnstrctr, lifemarkers[index].cntrInfo, lifemarkers[index].chargerDept);
		});
	});
	setMarkers(map);
}

function setMarkers(map) {
	for (var i = 0; i < kakaomarkers.length; i++) {
		kakaomarkers[i].marker.setMap(map);
	}
}

function clearMarkers() {
	for (var i = 0; i < kakaomarkers.length; i++) {
		kakaomarkers[i].marker.setMap(null);
	}
}

function changelines() {
	clearStartOverlay();
	clearEndOverlay();
	StartOverlays = [];
	EndOverlays = [];
	clearPolys();
	polylinearray = [];
	polymarkers.forEach(function(element, index) {
		polymarkers[index].linepath.forEach(function(element, IDX) {
			polylinearray.push(element);
			PushPoly(element, polymarkers[index].LineColor, polymarkers[index].indexcolor);
		});
		//polylinearray.push(polymarkers[index].linepath);
		//PushPoly(polymarkers[index].linepath, polymarkers[index].LineColor);
	});
	Startoverlay();
	Endoverlay();
}

function setstartendMarkers(map) {
	for (var i = 0; i < StartMarkers.length; i++) {
		StartMarkers[i].marker.setMap(map);
		EndMarkers[i].marker.setMap(map);
	}
}

function clearstartendMarkers() {
	for (var i = 0; i < StartMarkers.length; i++) {
		StartMarkers[i].marker.setMap(null);
		EndMarkers[i].marker.setMap(null);
	}
}

var gpsMarker;

function gps() {
	if (TitleOverlay) {
		TitleOverlay.setMap(null);
	}
	// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
	if (navigator.geolocation) {

		// GeoLocation을 이용해서 접속 위치를 얻어옵니다
		navigator.geolocation.getCurrentPosition(function(position) {

			var lat = position.coords.latitude, // 위도
				lon = position.coords.longitude; // 경도

			var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

			// 마커와 인포윈도우를 표시합니다
			// 지도에 마커와 인포윈도우를 표시하는 함수입니다
			gpsMarker = createMarker(locPosition, '현재위치', 1);
			gpsMarker.setMap(map);
			CreateTitleOverlay(locPosition, '현재위치');

			// 지도 중심좌표를 접속위치로 변경합니다
			map.setCenter(locPosition);
		});

	} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

	}

}

// 리스트가 뿌려진 지도상에서 마커 클릭했을때
function ListenerOverlay(index, LatLng, Latitude, Longtitude, Code, Title, Address, Tel, Dong, Homepage, Detail, CntrwkPd, Cnstrctr, CntrInfo, ChargerDept ) { 

	var LinkTag = Homepage;
	if (Homepage) {
		LinkTag = '<a href="' + Homepage + '" target="_blank" title="새창" rel="noopener noreferrer">' + Homepage + '</a>';
	}
	var iwcontent2 = '<div class="customoverlay"><div class="overlaybox">';
		iwcontent2 += '<div class="titlebox"><div class="title">' + Title + '</div></div>';
		iwcontent2 += '<div class="conbox"><ul>';
		
		if(Code == 282) {	// 공사현황
			if(Dong != ''){
				iwcontent2 += '<li class="info_item clearfix dong"><em class="info_kind">행정동</em><span class="info_text">' + Dong + '</span></li>';
			}
			if(Address != ''){
				iwcontent2 += '<li class="info_item clearfix address"><em class="info_kind">주소</em><span class="info_text">' + Address + '</span></li>';
			}
			if(CntrwkPd != ''){
				iwcontent2 += '<li class="info_item clearfix cntrwkPd"><em class="info_kind">공사기간</em><span class="info_text">' + CntrwkPd + '</span></li>';
			}
			if(Cnstrctr != ''){
				iwcontent2 += '<li class="info_item clearfix cnstrctr"><em class="info_kind">시공사</em><span class="info_text">' + Cnstrctr + '</span></li>';
			}
			if(CntrInfo != ''){
				iwcontent2 += '<li class="info_item clearfix cntrInfo"><em class="info_kind">공사정보</em><span class="info_text">' + CntrInfo + '</span></li>';
			}
			if(ChargerDept != ''){
				iwcontent2 += '<li class="info_item clearfix chargerDept"><em class="info_kind">담당부서<br>(기관)</em><span class="info_text">' + ChargerDept + '</span></li>';
			}
			if(Tel != ''){
				iwcontent2 += '<li class="info_item clearfix tel"><em class="info_kind">문의전화</em><span class="info_text">' + Tel + '</span></li>';
			}
		} else {
			if(Address != ''){
				iwcontent2 += '<li class="info_item clearfix address"><em class="info_kind">주소</em><span class="info_text">' + Address + '</span></li>';
			}
			if(Tel != ''){
				iwcontent2 += '<li class="info_item clearfix tel"><em class="info_kind">전화번호</em><span class="info_text">' + Tel + '</span></li>';
			}
			if(Dong != ''){
				iwcontent2 += '<li class="info_item clearfix dong"><em class="info_kind">행정동</em><span class="info_text">' + Dong + '</span></li>';
			}
			if(LinkTag != ''){
				iwcontent2 += '<li class="info_item clearfix homepage"><em class="info_kind">홈페이지</em><span class="info_text">' + LinkTag + '</span></li>';
			}
			if(Detail != ''){
				iwcontent2 += '<li class="info_item clearfix desc"><em class="info_kind">상세내용</em><span class="info_text">' + Detail + '</span></li>';
			}
		}
		
		iwcontent2 += '</ul></div>';
		iwcontent2 += '</div>';
		iwcontent2 += '<button type="button" onclick="closeOverlay();" class="close_overlay">닫기</button>';
		iwcontent2 += '</div>';

	// 커스텀 오버레이가 있을 때
	if (customOverlay) {
		customOverlay.setMap(null);
	}

	// 커스텀 오버레이를 생성합니다
	customOverlay = new kakao.maps.CustomOverlay({
		map: map,
		position: LatLng,
		content: iwcontent2,
		yAnchor: 1
	});
}


function panTo(latitude, longtitude) {
	// 이동할 위도 경도 위치를 생성합니다
	var moveLatLon = new kakao.maps.LatLng(latitude, longtitude);

	// 지도 중심을 부드럽게 이동시킵니다
	// 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
	map.panTo(moveLatLon);
}

var customOverlay;

function CreateOverlay(latitude, longtitude, thisCode, thisTitle, thisAddress, thisTel, thisDong, thisHomepage, thisDetail, thisCntrwkPd, thisCnstrctr, thisCntrInfo, thisChargerDept) {
	var OverlayLatLon = new kakao.maps.LatLng(latitude, longtitude);
	var LinkTag = thisHomepage;
	if (thisHomepage) {
		LinkTag = '<a href="' + thisHomepage + '" target="_blank" title="새창" rel="noopener noreferrer">' + thisHomepage + '</a>';
	}
	var iwcontent = '<div class="customoverlay"><div class="overlaybox">';
		iwcontent += '<div class="titlebox"><div class="title">' + thisTitle + '</div></div>';
		iwcontent += '<div class="conbox"><ul>';
		
		if(thisCode == 282) {	// 공사현황 일때만
			
			if(thisDong != ''){	// 행정동
				iwcontent += '<li class="info_item clearfix dong"><em class="info_kind">행정동</em><span class="info_text">' + thisDong + '</span></li>';
			}
			if(thisAddress != ''){	// 주소
				iwcontent += '<li class="info_item clearfix address"><em class="info_kind">주소</em><span class="info_text">' + thisAddress + '</span></li>';
			}
			if(thisCntrwkPd != ''){	// 공사기간
				iwcontent += '<li class="info_item clearfix cntrwkPd"><em class="info_kind">공사기간</em><span class="info_text">' + thisCntrwkPd + '</span></li>';
			}
			if(thisCnstrctr != ''){	// 시공사
				iwcontent += '<li class="info_item clearfix cnstrctr"><em class="info_kind">시공사</em><span class="info_text">' + thisCnstrctr + '</span></li>';
			}
			if(thisCntrInfo != ''){	// 공사정보
				iwcontent += '<li class="info_item clearfix cntrInfo"><em class="info_kind">공사정보</em><span class="info_text">' + thisCntrInfo + '</span></li>';
			}
			if(thisChargerDept != ''){	// 담당부서(기관)
				iwcontent += '<li class="info_item clearfix chargerDept"><em class="info_kind">담당부서<br>(기관)</em><span class="info_text">' + thisChargerDept + '</span></li>';
			}
			if(thisTel != ''){	// 전화번호
				iwcontent += '<li class="info_item clearfix tel"><em class="info_kind">문의전화</em><span class="info_text">' + thisTel + '</span></li>';
			}
			/*if(LinkTag != ''){
				iwcontent += '<li class="info_item clearfix homepage"><em class="info_kind">홈페이지</em><span class="info_text">' + LinkTag + '</span></li>';
			}*/
		} else {
			if(thisAddress != ''){
				iwcontent += '<li class="info_item clearfix address"><em class="info_kind">주소</em><span class="info_text">' + thisAddress + '</span></li>';
			}
			if(thisTel != ''){
				iwcontent += '<li class="info_item clearfix tel"><em class="info_kind">전화번호</em><span class="info_text">' + thisTel + '</span></li>';
			}
			if(thisDong != ''){
				iwcontent += '<li class="info_item clearfix dong"><em class="info_kind">행정동</em><span class="info_text">' + thisDong + '</span></li>';
			}
			if(LinkTag != ''){
				iwcontent += '<li class="info_item clearfix homepage"><em class="info_kind">홈페이지</em><span class="info_text">' + LinkTag + '</span></li>';
			}
			if(thisDetail != ''){
				iwcontent += '<li class="info_item clearfix desc"><em class="info_kind">상세내용</em><span class="info_text">' + thisDetail + '</span></li>';
			}
		}
		
		iwcontent += '</ul></div>';
		iwcontent += '</div>';
		iwcontent += '<button type="button" onclick="closeOverlay();" class="close_overlay">닫기</button>';
		iwcontent += '</div>';

	// 커스텀 오버레이가 있을 때
	if (customOverlay) {
		customOverlay.setMap(null);
	}

	// 커스텀 오버레이를 생성합니다
	customOverlay = new kakao.maps.CustomOverlay({
		map: map,
		position: new kakao.maps.LatLng(latitude, longtitude),
		content: iwcontent,
		yAnchor: 1
	});
}

function closeOverlay() {
	customOverlay.setMap(null);
}

var TitleOverlay;

function CreateTitleOverlay(thisposition, thisTitle) {
	var iwcontent = '<div class="gpsoverlay"><div class="overlaybox">' +
		'<div class="titlebox"><div class="title">' + thisTitle + '</div></div>' +
		'</div>' +
		'<button type="button" onclick="closeTitleOverlay();" class="close_overlay">닫기</button>' +
		'</div>';

	// 커스텀 오버레이가 있을 때
	if (TitleOverlay) {
		TitleOverlay.setMap(null);
	}

	// 커스텀 오버레이를 생성합니다
	TitleOverlay = new kakao.maps.CustomOverlay({
		map: map,
		position: thisposition,
		content: iwcontent,
		yAnchor: 1
	});
}

function closeTitleOverlay() {
	TitleOverlay.setMap(null);
}

function relayout() {
	setTimeout(function() {
		map.relayout();
	}, 300);
}

//파라미터 얻기
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


//var ActiveCode = [];
$(function() {
	/*var $databox = $('.databox'),
		$dataitem = $databox.find('.dataitem'),
		dataitemLength = $dataitem.length,
		$cateitem = $databox.find('.cateitem'),
		cateitemLength = $cateitem.length,		
		$roaditem = $databox.find('.roaditem'),
		roaditemLength = $roaditem.length,
		$Addbox = $('.addbox');*/
	
	// 결과 리스트 클릭
/*	$('.category .listbox .itembtn').on('click', function() {
alert("ccccccc");		
		var $this = $(this),
			ThisLatitude = $this.attr('data-latitude'),
			ThisLongtitude = $this.attr('data-longtitude'),
			ThisTitle = $this.text(),
			ThisAddress = $this.attr('data-address'),
			ThisTel = $this.attr('data-tel'),
			ThisDong = $this.attr('data-dong'),
			ThisHomepage = $this.attr('data-homepage'),
			//ThisDetail = $this.siblings('.detail').text();
			ThisDetail = $this.next('.detail').text();
		
		
		CreateOverlay(ThisLatitude, ThisLongtitude, ThisTitle, ThisAddress, ThisTel, ThisDong, ThisHomepage, ThisDetail);
		panTo(ThisLatitude, ThisLongtitude);
	});*/

});

// 결과 리스트 클릭
//$('.category .listbox .itembtn').on('click', function() {
$(document).on("click", ".category .listbox .itembtn", function() {
	var $this = $(this),
		ThisLatitude = $this.attr('data-latitude'),
		ThisLongtitude = $this.attr('data-longtitude'),
		ThisCode = $this.attr('data-code'),
		ThisTitle = $this.text(),
		ThisAddress = $this.attr('data-address'),
		ThisTel = $this.attr('data-tel'),
		ThisDong = $this.attr('data-dong'),
		ThisHomepage = $this.attr('data-homepage'),
		//ThisDetail = $this.siblings('.detail').text();
		ThisDetail = $this.next('.detail').text(),
		ThisCntrwkPd = $this.attr('data-cntrwkPd'),
		ThisCnstrctr = $this.attr('data-cnstrctr'),
		ThisCntrInfo = $this.attr('data-cntrInfo'),
		ThisChargerDept = $this.attr('data-chargerDept');
	
	CreateOverlay(ThisLatitude, ThisLongtitude, ThisCode, ThisTitle, ThisAddress, ThisTel, ThisDong, ThisHomepage, ThisDetail, ThisCntrwkPd, ThisCnstrctr, ThisCntrInfo, ThisChargerDept);
	panTo(ThisLatitude, ThisLongtitude);
});

// addbox에서 삭제
$(document).on('click', '.addbox .itembtn', function() {
	
	var $Addbox = $('.addbox');
	
	var $this = $(this),
		CateCode = $this.attr('data-code'),
		AddLength = $Addbox.find('.itembtn').length,
		$MyLnbBtn = $('.category .category_content').find('.depth_text[data-code="' + CateCode + '"]'),
		$MyLnbItem = $MyLnbBtn.parent('.depth_item'),
		ThisColor = $this.attr('data-color');
	var $ListSelected = $('.depth_item.selected');
	
	var CateItemLength = $Addbox.find('.itembtn[data-type="category"]').length;
	var RoadItemLength = $Addbox.find('.itembtn[data-type="road"]').length;
	
	lifemarkers = [];
	polymarkers = [];

	$ListSelected.find('.depth_text[data-code="' + CateCode + '"]').nextAll().attr('style', "display:none;");

	$MyLnbItem.removeClass('selected');
	$MyLnbBtn.removeAttr('title');
	if(CateCode==242){
		clearParkingPolys();
		Parkinglinearray = [];
		kakaoParkinglinepath = [];
	}
	$this.remove();
	color[ThisColor] = 'usable';
	

	var $ListSelected2 = $('.depth_item.selected');

	if(CateItemLength){
		clearMarkers();
		kakaomarkers = [];
		if (customOverlay) {
			customOverlay.setMap(null);
		}
		if(CateItemLength==1 && RoadItemLength==0) {
		$Addbox.removeClass('active');
		}
	}
	if(RoadItemLength){
		clearPolys();
		clearStartOverlay();
		clearEndOverlay();
		StartOverlays = [];
		EndOverlays = [];
		polylinearray = [];
		polykakaomarkers = [];
		
		if(RoadItemLength==1 && CateItemLength==0) {
		$Addbox.removeClass('active');
		}
	}
	
	$MyLnbBtn.nextAll().attr('style', "display:none;");
	
	var AfterItemLength = $ListSelected2.find('.dataitem').length;
	var AfterCateItemLength = $ListSelected2.find('.cateitem').length;
	var AfterRoadItemLength = $ListSelected2.find('.roaditem').length;
	var selectedAll = $ListSelected2.length;

	if(AfterCateItemLength){
		$ListSelected2.find('.cateitem').each(function() {
		/*$databox.find('.cateitem').each(function() {*/
			var $this = $(this),
				thisCode = $this.attr('data-code'),
				thisTitle = $this.attr('data-title'),
				thislatitude = $this.attr('data-latitude'),
				thislongtitude = $this.attr('data-longtitude'),
				thisAddress = $this.attr('data-address'),
				thisTel = $this.attr('data-tel'),
				thisDong = $this.attr('data-dong'),
				thisHomepage = $this.attr('data-homepage'),
				thisDetail = $this.find('.detail').text(),
				thisCntrwkPd = $this.attr('data-cntrwkPd'),
				thisCnstrctr = $this.attr('data-cnstrctr'),
				thisCntrInfo = $this.attr('data-cntrInfo'),
				thisChargerDept = $this.attr('data-chargerDept'),
				ThisColor = $this.attr('data-color'),
				ThisCode = $this.attr('data-code'),
				indexColor = $Addbox.find('.itembtn[data-code="'+ThisCode+'"]').attr('data-color');
			lifemarkers.push({
				code: thisCode,
				title: thisTitle,
				latlng: new kakao.maps.LatLng(thislatitude, thislongtitude),
				latitude: thislatitude,
				longtitude: thislongtitude,
				address: thisAddress,
				tel: thisTel,
				dong: thisDong,
				homepage: thisHomepage,
				detail: thisDetail,
				cntrwkPd: thisCntrwkPd,
				cnstrctr: thisCnstrctr,
				cntrInfo: thisCntrInfo,
				chargerDept: thisChargerDept,
				markercolor: ThisColor,
				indexcolor:indexColor
			});
		});
		changeMarkers();
		
	}
	if(AfterRoadItemLength){
		$ListSelected2.find('.roaditem').each(function() {
			var $this = $(this),
				thisCode = $this.attr('data-code'),
				thisTitle = $this.attr('data-title'),
				Linepath = [],
				$Linepath = $this.find('.linepath'),
				LinepathLength = $Linepath.length,
				thisLineColor = $this.attr('data-color'),
				ThisCode = $this.attr('data-code'),
				indexColor = $Addbox.find('.itembtn[data-code="'+ThisCode+'"]').attr('data-color');
			if(LinepathLength){
				$Linepath.each(function(){
					var $this = $(this),
						$LinepathItems = $this.find('.linepath_item'),
						EachLinepath = [];
					$LinepathItems.each(function(){
						var $this = $(this),
							thislinepathlat = $this.find('.linepathlat').text(),
							thislinepathlng = $this.find('.linepathlng').text();
						EachLinepath.push({
							linepathlat:thislinepathlat,
							linepathlng:thislinepathlng
						});
						
					});
					Linepath.push(EachLinepath);
				});
			}
			polymarkers.push({
				title: thisTitle,
				linepath:Linepath,
				LineColor:thisLineColor,
				indexcolor:indexColor
			});
		});
		changelines();
	}
	if(AfterItemLength){
		var $FirstItem = $ListSelected2.find('.dataitem').first(),
			FirstLatitude,
			FirstLongtitude;
		if($FirstItem.is('.cateitem')){
			FirstLatitude = $FirstItem.attr('data-latitude');
			FirstLongtitude = $FirstItem.attr('data-longtitude');
		} else if($FirstItem.is('.roaditem')){
			FirstLatitude = $FirstItem.find('.linepath:first-child .linepath_item:first-child').find('.linepathlat').text();
			FirstLongtitude = $FirstItem.find('.linepath:first-child .linepath_item:first-child').find('.linepathlng').text();
		}
		panTo(FirstLatitude, FirstLongtitude);
	}
});


$('.addbox .removeall').on('click', function() {
	
	var $Addbox = $('.addbox');
	var CateItemLength = $Addbox.find('.itembtn[data-type="category"]').length;
	var RoadItemLength = $Addbox.find('.itembtn[data-type="road"]').length;
	var ParkingItemLength = $Addbox.find('.itembtn[data-code="242"]').length;
	
	lifemarkers = [];
	polymarkers = [];
	
	if(CateItemLength){
		clearMarkers();
		kakaomarkers = [];
		if (customOverlay) {
			customOverlay.setMap(null);
		}
		if(ParkingItemLength){
			clearParkingPolys();
			Parkinglinearray = [];
			kakaoParkinglinepath = [];
		}
	}
	if(RoadItemLength){
		clearPolys();
		clearStartOverlay();
		clearEndOverlay();
		StartOverlays = [];
		EndOverlays = [];
		polylinearray = [];
		polykakaomarkers = [];
	}
	$Addbox.removeClass('active').find('.itembtn').remove();
	//history.replaceState({}, null, location.pathname);
	$('.category .category_content').find('.depth_item').removeClass('selected');
	$('.category .category_content').find('.depth_text').removeAttr('title');
	$('.category .category_content').find(".listbox").attr('style', "display:none;");
	$('.category .category_content').find('.pagination').attr('style', "display:none;");
	color = ['usable','usable','usable'];
});


function renderPagination(totalCount, dataPerPage, pageCount, currentPage, ctgryCode) {
	
	var first,	// 화면에 보여질 첫 페이지 번호
		last,	// 화면에 보여질 마지막 페이지 번호
		next,
		prev;
	
	totalPage = Math.ceil(totalCount / dataPerPage);	// 총 페이지 
	pageGroup = Math.ceil(currentPage / pageCount);		// 페이지그룹(현재 페이지가 몇 번째 그룹인지 확인)
	
	last = pageGroup * pageCount;
	if (last > totalPage) {
		last = totalPage;
	}
	
	first = last - (pageCount - 1);
	if (first <= 0) {
		first = 1;
	}

	next = last + 1;
	prev = first - 1;

	var one = 1; 			// 맨 처음 
	var	lastNo = totalPage; // 맨 끝
	var liItem = $('.depth_text[data-code="' + ctgryCode + '"]').closest("li");
	var $paingBox = liItem.find('.pagination[data-code="' + ctgryCode + '"]');
	
	var pagination = $paingBox.find('.page_wrap');
	var	page_btn = $paingBox.find('.page_btn');
	
	pagination.empty();
	page_btn.empty();

	if (prev > 0) {
	/*if(first > 5) {*/
		/*$paingBox.append("<span class=\"page_btn prev_group\">" +
		"<a href=\"#\" id=\"prev\" class=\"prev\">이전</a>" +
		"</span>");*/
		$paingBox.find(".prev_group").append("<a href=\"#\" id=\"prev\" class=\"prev\">이전</a>");
	}
	
	//var liItem = $('.depth_text[data-code="' + ctgryCode + '"]').closest("li");

	for(var j=first; j<=last; j++) {	// 첫 화면 페이징 표시
		if(currentPage == j) {
			pagination.append("<strong title=\"현재" + j + "페이지\">" + j + "</strong>");
	} else if(j > 0) {
			pagination.append("<a href=\"#\" id="+ j +" title=\"" + j + "페이지 이동\">"+ j +"</a>");
		}
	}
	
	if(last < totalPage) {
		/*$paingBox.append("<span class=\"page_btn next_group\">" +
		"<a href=\"#\" id=\"next\" class=\"next\">다음</a>" +
		"</span>");*/
		$paingBox.find(".next_group").append("<a href=\"#\" id=\"next\" class=\"next\">다음</a>");
	}
	
	$paingBox.find('a').click(function(event) {
		var $item = $(this);
		var $id = $item.attr("id");
		var selectedPage = $item.text(); // 번호 클릭.
		//if($id == "one")    selectedPage = one;
		if($id == "prev")    selectedPage = prev;	
		if($id == "next")    selectedPage = next;	
		//if($id == "lastNo")    selectedPage = lastNo;
	
		liItem.find('.listbox .cateitem').attr('style', "display:none;");
		
		displayData(totalCount, dataPerPage, pageCount, selectedPage, ctgryCode);
		renderPagination(totalCount, dataPerPage, pageCount, selectedPage, ctgryCode);	// 페이징
		event.preventDefault();
	});
}


function displayData(totalCount, dataPerPage, pageCount, currentPage, ctgryCode) {
	var firstIndex;
	
	if(currentPage == 1) {
		firstIndex = currentPage-1;
	} else {
		firstIndex = (currentPage-1)*dataPerPage;
	}

	var liItem = $('.depth_text[data-code="' + ctgryCode + '"]').closest("li");
	var buttonLength = liItem.find("button").length;

	for(var i=firstIndex; i<=(dataPerPage*currentPage)-1; i++) {	// 리스트 가져옴
		liItem.find('.listbox .cateitem').eq(i).attr('style', "display:block;");
		liItem.find('.pagination').eq(i).attr('style', "display:block;");
//console.log(">>>>>>>>>>>>>>>> : " + liItem.find('.listbox .cateitem').eq(i).data("title"));
	}
	
	renderPagination(totalCount, dataPerPage, pageCount, currentPage, ctgryCode);
}


// 검색
function searchFilter() {
	
	var $Addbox = $('.addbox');
	var CateItemLength = $Addbox.find('.itembtn[data-type="category"]').length;
	var RoadItemLength = $Addbox.find('.itembtn[data-type="road"]').length;
	color = ['usable','usable','usable'];
	
	lifemarkers = [];
	polymarkers = [];
	
	if(CateItemLength){			
		clearMarkers();
		kakaomarkers = [];
		if (customOverlay) {
			customOverlay.setMap(null);
		}
		if(FinalParkingarray.length){
			clearParkingPolys();
			Parkinglinearray = [];
			kakaoParkinglinepath = [];
		}
	}
	if(RoadItemLength){
		clearPolys();
		clearStartOverlay();
		clearEndOverlay();
		StartOverlays = [];
		EndOverlays = [];
		polylinearray = [];
		polykakaomarkers = [];
	}
	
	$Addbox.removeClass('active').find('.itembtn').remove();
	$('.category .category_content').find('.depth_item').removeClass('selected');
	$('.category .category_content').find('.depth_text').removeAttr('title');
	$('.category .category_content').find(".listbox").attr('style', "display:none;");
	$('.category .category_content').find('.pagination').attr('style', "display:none;");
	
	// 검색
	var $ctgryBox = $('.depth_list.depth2_list').find('li');
	var $searchBox = $('.category_list').find('.searchDisplay');	// 처음 검색할때는 없음
	
	$searchBox.empty();		// 다시 검색했을때 리스트 누적 방지
	$ctgryBox.hide();
	
	var search = document.getElementById("search").value;
    var ctgryCnt = $('.depth_item.depth2_item.solo, .depth_item.depth3_item');		// 143개

    // 1차 카테고리 조건 검색
	var selectedValue = $("#searchCnd option:selected").val(),		// 1차 카테고리 코드값
	selectedText = $("#searchCnd option:checked").text();

	if(selectedValue == 0) {	// 전체 검색
		
		// 카테고리 전체 리스트
		ctgryCnt.find('.depth_text').each(function(index) {
				
			var thisName = $(this).attr('data-name');
			var thisCode = $(this).attr('data-code');
				
			var searchListLi = '',
				$searchList = $('.depth_list.depth2_list'),
				$searchListTest = $('.depth_list.depth2_list'),
				searchDisplay = $searchListTest.find('.searchDisplay');
	
			// 검색 결과 리스트	
			if (thisName.indexOf(search) != -1) {

				searchListLi += '<li class="depth_item depth2_item solo searchDisplay" style="display: block;" >'
				if(thisCode == 157) searchListLi += '<a href="https://www.opinet.co.kr/searRgSelect.do" target="_blank" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'
				else if(thisCode == 158) searchListLi += '<a href="https://www.opinet.co.kr/searRgSelect.do" target="_blank" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'
				else if(thisCode == 241) searchListLi += '<a href="http://bis.gn.go.kr/cardStore/getCardStore.do" target="_blank" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'
				else if(thisCode == 250) searchListLi += '<a href="https://www.e-gen.or.kr/egen/search_hospital.do?searchType=general" target="_blank" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'
				else if(thisCode == 136) searchListLi += '<a href="https://www.e-gen.or.kr/egen/search_pharmacy.do" target="_blank" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'
				else if(thisCode == 137) searchListLi += '<a href="https://www.pharm114.or.kr/common_files/sub2_page2.asp?addr1=%B0%AD%BF%F8%B5%B5#" target="_blank" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'
				else if(thisCode == 269) searchListLi += '<a href="https://bis.gn.go.kr/" target="_blank" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'
				else if(thisCode == 279) searchListLi += '<a href="https://www.e-gen.or.kr/egen/search_aed.do?searchType=general" target="_blank" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'
				else searchListLi += '<a href="javascript:;" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'
				searchListLi += '</li>\n';
				
				$searchList.append(searchListLi);
				
			}/* else {
				console.log(index + " ::: NO ");
			}*/
		});
		
	} else {	// 카테고리 검색
		
		var $categoryList = $('.category_list'),
			searchSelected = $categoryList.find('.category_item[value="' + selectedValue + '"], .road_item[value="' + selectedValue + '"]'),
			searchSelectedItem = searchSelected.find('.depth_item.depth2_item.solo, .depth_item.depth3_item');
		
		var searchListLi = '',
		$searchList = $('.depth_list.depth2_list');
		
		searchSelectedItem.find('.depth_text').each(function() {	// error

			var thisName = $(this).attr('data-name');
			var thisCode = $(this).attr('data-code');
	
			// 검색 결과 리스트	
			if (thisName.indexOf(search) != -1) {
	
				searchListLi +=
		           '<li class="depth_item depth2_item solo searchDisplay" style="display: block;" >' +
				   '<a href="javascript:;" data-code="' + thisCode + '" data-name="' + thisName + '" class="depth_text depth2_text" onclick="searchBoxClick(this)"><span>' + thisName + '</span></a>\n'+
				   '</li>\n';
				
				$searchList.append(searchListLi);
				
			}
		});
		
		if(searchListLi.length == 0) {
			alert("검색 결과가 존재하지 않습니다.");
			$ctgryBox.show();
		}
	}
	$('.category').addClass('active');
}


// 검색 결과 클릭
function searchBoxClick(e) {

	searchChk = 1;
	
	var searchCode = $(e).attr('data-code');
	var searchName = $(e).attr('data-name');
	
	var $searchBox = $('.category_list').find('.searchDisplay');
	$searchBox.remove();
	
	var ctgryCnt = $('.depth_item.depth2_item.solo, .depth_item.depth3_item');

	// 카테고리 전체 리스트
	ctgryCnt.find('.depth_text').each(function(index) {
		
		var ctgryCode = $(this).attr('data-code');
		var ctgryNm = $(this).attr('data-name');
		
		if (searchCode == ctgryCode) {	// 검색 리스트 클릭시, 실제 카테고리 리스트에서 같은 코드 보여준다
			
			var parentItem = $(this).closest("li"),
				$Listitem = parentItem.find('.listitem'),
				$Loaditem = parentItem.find('.databox .roaditem'),
				$MyParent = $(this).parent('.depth_item');
			var IamExcept = ExceptCode.indexOf(ctgryCode);
			
			var $Addbox = $('.addbox');
			if(IamExcept<0){
				$(".category_list").find(".category_item").removeClass("active");	// 2차, 3차메뉴 클릭시(바우길제외)
				$(".category_list").find(".road_item").removeClass("active");		// 바우길
				$(".category_list").find(".depth2").attr('style', "display:none;");
			}
			
			var searchItem = $(this).parents(".category_item, .road_item");		// 바우길도 포함해야함

			// 카테고리인지 바우길인지 확인
			var categoryChk = searchItem.is('.category_item'),
				roadChk = searchItem.is('.category_item');
			if(IamExcept<0){
				searchItem.addClass("active");
				searchItem.children(".depth_text").attr('title', '선택됨');
				searchItem.children().attr('style', "display:block;");
				searchItem.find('.depth_item').attr('style', "display:block;");
			}
			
			var $this = $(this),
				parentItem = $(this).closest("li"),
				$Listitem = parentItem.find('.listitem');

			//var $MyListItem = $this.parent('.depth_item').siblings('.depth_item').find('.depth_text[data-code="'+ctgryCode+'"]');

			// 카테고리, 바우길 따로 검색
			if(categoryChk) {	// 카테고리 검색
				if(IamExcept<0){
					// 시설 목록 리스트
					if(ctgryCode!=242){//주정차금지제외
						dataListElement(ctgryCode);
					}
					
					var listboxChk = $Listitem.find("button");
					
					if(listboxChk.length != 0) {

						var $Addbox = $('.addbox');
						$Addbox.addClass('active');
						
						$MyParent.addClass('selected');
						$MyParent.attr('style', "display:block;");
						$(this).attr('title', '선택됨');


						var totalCount,					// 총 데이터의 갯수
							totalPage,					// 총 페이지
							dataPerPage = 10,			// 한 페이지에 나타낼 데이터의 갯수
							pageCount = 5,				// 화면에 나타날 페이지 갯수
							pageGroup,					// 페이지그룹(현재 페이지가 몇 번째 그룹인지 확인)
							currentPage = 1;			// 현재 페이지
						
						parentItem.find("button").each(function (index, item) {
							var ThisCode = $(this).attr('data-code');
							
							if(ctgryCode == ThisCode) {
								parentItem.find('.listbox').attr('style', "display:block;");
								parentItem.find('.pagination').attr('style', "display:block;");
								parentItem.find('.listbox .cateitem').attr('style', "display:none;");
							} else {
								$(this).next(".detail").remove();
								$(this).remove();
							 }
						});
						
						var totalCount = $Listitem.find('button').length;
						
						// 페이징 데이터
						displayData(totalCount, dataPerPage, pageCount, currentPage, ctgryCode);
						
						var $ListSelected = $('.depth_item.selected');
						
						lifemarkers = [];
						var usable = color.indexOf('usable');
						$Listitem.find('.cateitem').attr('data-indexcolor', usable);
						
						// 리스트박스 리스트, 지도에 전체 표출
						$ListSelected.find('.cateitem').each(function() {
							var $this = $(this),
								thisTitle = $this.attr('data-title'),
								thislatitude = $this.attr('data-latitude'),
								thislongtitude = $this.attr('data-longtitude'),
								thisAddress = $this.attr('data-address'),
								thisTel = $this.attr('data-tel'),
								thisDong = $this.attr('data-dong'),
								thisHomepage = $this.attr('data-homepage'),
								thisDetail = $this.next('.detail').text(),
								thisCntrwkPd = $this.attr('data-cntrwkPd'),
								thisCnstrctr = $this.attr('data-cnstrctr'),
								thisCntrInfo = $this.attr('data-cntrInfo'),
								thisChargerDept = $this.attr('data-chargerDept'),
								ThisColor = $this.attr('data-indexcolor'),
								ThisCode = $this.attr('data-code');
							lifemarkers.push({
								title: thisTitle,
								latlng: new kakao.maps.LatLng(thislatitude, thislongtitude),
								latitude: thislatitude,
								longtitude: thislongtitude,
								address: thisAddress,
								tel: thisTel,
								dong: thisDong,
								homepage: thisHomepage,
								detail: thisDetail,
								cntrwkPd: thisCntrwkPd,
								cnstrctr: thisCnstrctr,
								cntrInfo: thisCntrInfo,
								chargerDept: thisChargerDept,
								markercolor: ThisColor,
								indexcolor:ThisColor
							});
						});
						
						changeMarkers();
						var $FirstItem = $Listitem.find('.cateitem').first(),
							FirstLatitude = $FirstItem.attr('data-latitude'),
							FirstLongtitude = $FirstItem.attr('data-longtitude');
						panTo(FirstLatitude, FirstLongtitude);
						
						var	FirstActiveCatetype = $(this).is('.roaditem'),	// 바우길
						FirstCateType = 'category';
						if(FirstActiveCatetype) {
							FirstCateType = 'road';
						}
						
						// addbox 추가 
						var addBtnSource = '<button type="button" data-type="'+FirstCateType+'" data-code="' + ctgryCode + '" data-color="'+usable+'" title="삭제" class="addbtn itembtn"><span>' + ctgryNm + '</span></button>';
						$Addbox.append(addBtnSource);
						color[usable] = 'disabled';
					}
					if(ctgryCode==242){//주정차금지구역
						$Addbox.addClass('active');
						$MyParent.addClass('selected');
						var usable = color.indexOf('usable');
						$Listitem.attr('data-indexcolor', usable);
						$(this).attr('title', '선택됨');
						createParikng();
						var	FirstActiveCatetype = $(this).is('.roaditem'),	// 바우길
							FirstCateType = 'category';
						if(FirstActiveCatetype) {
							FirstCateType = 'road';
						}
						// addbox 추가
						var addBtnSource = '<button type="button" data-type="'+FirstCateType+'" data-code="' + ctgryCode + '" data-color="'+usable+'" title="삭제" class="addbtn itembtn"><span>' + ctgryNm + '</span></button>';
						$Addbox.append(addBtnSource);
						color[usable] = 'disabled';
					}
				}
			} else {
				
				$.ajax({
					url: 'baugil/baugil_' + ctgryCode + '.jsp',
					success: function(data) {
						
						parentItem.find(".roaditem").append(data);
						var usable = color.indexOf('usable');
						$MyParent.addClass('selected');
						$MyParent.children(".depth_text").attr('title', '선택됨');
						$MyParent.find('.roaditem').attr('data-indexcolor', usable);
						
						// 바우길 검색
						var $ListSelected = $('.depth_item.selected');
						polymarkers = [];
						
						$ListSelected.find('.roaditem').each(function() {
							var Linepath = [],
								$Linepath = $(this).find('.linepath'),
								LinepathLength = $Linepath.length,
								thisTitle = $(this).attr('data-title'),
								thisLineColor = $(this).attr('data-color');
							
							if(LinepathLength) {
								$Linepath.each(function(){
										
								$LinepathItems = $(this).find('.linepath_item'),
								EachLinepath = [];
		
									$LinepathItems.each(function() {
										var	thislinepathlat = $(this).find('.linepathlat').text(),
											thislinepathlng = $(this).find('.linepathlng').text();
										EachLinepath.push({
											linepathlat:thislinepathlat,
											linepathlng:thislinepathlng
										});
									});
									Linepath.push(EachLinepath);	
								});
							}
							polymarkers.push({
								title: thisTitle,
								linepath:Linepath,
								LineColor:thisLineColor
							});
						});	
						
						changelines();
						
						//var $databox = $('.databox');
						//var $FirstItem = $databox.find('.roaditem').first(),
						var $FirstItem = $Loaditem.first(),
							FirstLatitude = $FirstItem.find('.linepath:first-child .linepath_item:first-child').find('.linepathlat').text(),
							FirstLongtitude = $FirstItem.find('.linepath:first-child .linepath_item:first-child').find('.linepathlng').text();
						panTo(FirstLatitude, FirstLongtitude);
						
						var	FirstActiveCatetype = $Loaditem.is('.roaditem'),
							FirstCateType = 'category';
						if(FirstActiveCatetype) {
							FirstCateType = 'road';
						}
						
						// addbox추가 
						var addBtnSource = '<button type="button" data-type="'+FirstCateType+'" data-code="' + ctgryCode + '" data-color="'+usable+'" title="삭제" class="addbtn itembtn"><span>' + ctgryNm + '</span></button>';
						$Addbox.append(addBtnSource);
						color[usable] = 'disabled';
					},
					error:function(request, status, error){
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
						LoadItems();
						alert('데이터가 없습니다.');
					}		
					
				});
				
			} // else end 
		}
	});
	$('.category').removeClass('active');
}
