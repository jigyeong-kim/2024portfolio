(function($){
	
	$.getPaging = function(tCount) {
		var f         = document.forms['frm'];
		var maxList   = Number($('#maxList').val());
		var pageIndex = Number(f.pageIndex.value);
		
		if(pageIndex < 1) pageIndex = 1;
		var showNo    = maxList;											// 한페이지에 보여줄 개수
		var pageViews = 5;													// 넘버링 개수
		var maxPage   = Math.ceil(tCount/showNo);							// 마지막 페이지
		var i         = Math.floor((pageIndex-1)/pageViews)*pageViews+1;	// 페이지 넘기기 설정
		var next      = pageIndex + 1;
		var pre       = pageIndex - 1;
		
		if(maxPage == 0) maxPage = 1;
		
		var currIndex  = (pageIndex - 1) * maxList + 1;
		var currEIndex = currIndex + maxList - 1;
		
		if(currEIndex > tCount) {
			currEIndex = tCount;
		}
		$("#pageCurrSIndex").html(pageIndex);
		$("#pageCurrEIndex").html(tCount);
		$("#pageMaxIndex").html(maxPage);
		
		var tmpStr = "";
		if(maxPage > 1) {
			tmpStr += ((pre > 0)?
					'<li tabindex="0" class="paginate_button previous" id="data-table_previous" aria-controls="data-table">' +
						'<a href="#none" onclick="$.getList(0); return false;"><i class="fa fa-lg fa-step-backward"></i>&nbsp;</a>' +
					'</li>' +
					'<li tabindex="0" class="paginate_button previous" id="data-table_previous" aria-controls="data-table">' +
						'<a href="#none" onclick="$.getList(' + pre + '); return false;"><i class="fa fa-lg fa-caret-left"></i>&nbsp;</a>' +
					'</li>'
				:
					'<li tabindex="0" class="paginate_button previous disabled" id="data-table_previous" aria-controls="data-table">' +
						'<a href="#none"><i class="fa fa-lg fa-step-backward"></i>&nbsp;</a>' +
					'</li>' +
					'<li tabindex="0" class="paginate_button previous disabled" id="data-table_previous" aria-controls="data-table">' +
						'<a href="#none"><i class="fa fa-lg fa-caret-left"></i>&nbsp;</a>' +
					'</li>'
				);

			for(var j=i; j<=maxPage; j++) {
				if(j < i + Number(pageViews)) {
					if(j == pageIndex) {
						tmpStr += '<li tabindex="0" class="paginate_button active" aria-controls="data-table"><a href="#none">' + j + '</a></li>';
					} else {
						tmpStr += '<li tabindex="0" class="paginate_button" aria-controls="data-table"><a href="#none" onclick="$.getList(' + j + '); return false;">' + j + '</a></li>';
					}
				}
			}

			tmpStr += ((next <= maxPage)?
					'<li tabindex="0" class="paginate_button next" id="data-table_next" aria-controls="data-table">' +
						'<a href="#none" onclick="$.getList(' + next + '); return false;"><i class="fa fa-lg fa-caret-right"></i>&nbsp;</a>' +
					'</li>' +
					'<li tabindex="0" class="paginate_button next" id="data-table_next" aria-controls="data-table">' +
						'<a href="#none" onclick="$.getList(' + maxPage + '); return false;"><i class="fa fa-lg fa-step-forward"></i>&nbsp;</a>' +
					'</li>'
				:
					'<li tabindex="0" class="paginate_button next disabled" id="data-table_next" aria-controls="data-table">' +
						'<a href="#none"><i class="fa fa-lg fa-caret-right"></i>&nbsp;</a>' +
					'</li>' +
					'<li tabindex="0" class="paginate_button next disabled" id="data-table_next" aria-controls="data-table">' +
						'<a href="#none"><i class="fa fa-lg fa-step-forward"></i>&nbsp;</a>' +
					'</li>'
				);
		}
		
		$("#pageLine").html(tmpStr);
	};
})(jQuery);

/**
 * 뷰 개수 변경
 */
function changeMaxList() {
	var f = document.forms['frm'];
	
	// 정보 호출
	$.getList(1);
}

/**
 * 정렬 정보 초기화
 */
function orderByReset(orderBy) {
	// 순서 정보 초기화
	var orderArr = orderBy.toLowerCase().split(" ");

	var sort = (orderArr[1] == "desc")? "asc" : "desc";
	$("#data-table").find("th").each(function(idx, item) {
		if($(this).attr("id") == orderArr[0].toUpperCase()) {
			$(this).attr("onclick", "changeOrder(this, '" + sort + "');");
			$(this).attr("class", "sorting_" + orderArr[1]);
		} else if($(this).attr("id") == undefined) {
			
		} else {
			$(this).attr("onclick", "changeOrder(this, 'asc');");
			$(this).attr("class", "sorting");
		}
	});
}

/**
 * 정보 리스트 정렬 변경
 */
function changeOrder(obj, v) {
	var f = document.forms['frm'];
	
	f.orderBy.value = $(obj).attr("id") + " " + v;
	
	// 순서 정보 초기화
	$("#data-table").find("th").each(function(idx, item) {
		if($(this).attr("id") != undefined) {
			$(this).attr("class", "sorting");
			$(this).attr("onclick", "changeOrder(this, 'asc');");
		}
	});

	// 정보 호출
	$.getList(1);
	
	// 순서 정보 갱신
	var sort = (v == "desc")? "asc" : "desc";
	$(obj).attr("onclick", "changeOrder(this, '" + sort + "');");
	$(obj).attr("class", "sorting_" + v);
}

/**
 * 등록 페이지 이동
 */
function goForm(url) {
	var f = document.forms['frm'];
	
	f.action = url;
	f.submit();
}

function goMove(url) {
	var f = document.forms['frm'];
	
	if(confirm('순서를 변경 하시겠습니까?')) {
		$('.chkKey').each(function(idx, item) {
			$(this).prop('checked', true);
		});
		
		// 로딩 이미지 호출
		lodingOn(document.body, "변경중 입니다.", 200, 150);
		f.action = url;
		f.submit();
	}
	return false;
}

/**
 * 선택된 내용 삭제
 */
function goDeleteForList(url) {
	if($("input:checkbox[class='chkKey']:checked").length == 0) {
		alert("삭제할 내용을 1개이상 선택해 주세요.");
		return;
	}
	
	if(confirm("삭제한 자료는 복구가 불가능 합니다.\n삭제 하시겠습니까?")) {
		var f = document.forms['frm'];
		
		// 로딩 이미지 호출
		lodingOn(document.body, "삭제중 입니다.", 200, 150);
		f.action = url;
		f.submit();
	}
}

$(document).ready(function() {
	if($('#data-table') != undefined) {
		$('#data-table').DataTable({
			paging: false,
			searching: false,
			ordering: false,
			language: {
				infoEmpty: ""
			}
		});
	}

	if($('.datepicker').prop('class') != undefined) {
		$('.datepicker').datepicker({
			format: 'yyyy-mm-dd',
			language: 'kr',
			todayBtn: true,
			todayHighlight: true
		});
	}
});