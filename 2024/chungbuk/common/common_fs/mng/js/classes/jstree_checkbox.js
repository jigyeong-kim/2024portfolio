/**
 * @project : edmund_mod
 * @file 	: AjaxMenuAdmController.java
 * @author	: Edmund
 * @date	: 2015. 4. 21. 오전 11:13:04
 * @comment : jstree 3.0 설정 축소화
 * 
 * 
 * Copyright(c) 2015 Edmund.J, All rights reserved.
 */
/*globals jQuery, define, exports, require, window, document */
(function (factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	}
	else if(typeof exports === 'object') {
		factory(require('jquery'));
	}
	else {
		factory(jQuery);
	}
}(function ($, undefined) {
	"use strict";
	
	/* start: 변수 초기화 */
	/* end: 변수 초기화 */
	
	/* start: 변수 설정 */
	$.ed_jstree = function() {
	};
	
	$.fn.extend($.ed_jstree, {
		jstreeObj    : "#jstree",
		urlList      : "",
		makeTree     : "makeTree",
		roleCheck    : "roleCheck",
		/*******************************************
		 * 변수 설정 Event
		 *******************************************/
		settings: function(set) {
			if(checkStrIsEmpty(set["jstreeObj"])) {
				this.jstreeObj = set["jstreeObj"];
			}
			
			if(checkStrIsEmpty(set["urlList"])) {
				this.urlList = set["urlList"];
			}
			
			if(checkStrIsEmpty(set["makeTree"])) {
				this.makeTree = set["makeTree"];
			}
			
			if(checkStrIsEmpty(set["roleCheck"])) {
				this.roleCheck = set["roleCheck"];
			}
		},
		/*******************************************
		 * 메뉴 목록 정보 추출 Event
		 *******************************************/
		getList: function() {
			var _jstreeObj = this.jstreeObj;
			var _urlList   = this.urlList;
			var _makeTree  = this.makeTree;
			var _roleCheck = this.roleCheck;
			
			$(_jstreeObj + " ul").remove();
			$("<ul></ul>").appendTo(_jstreeObj);
			// 관리자 메뉴 정보 리스트 조회
			$.getJSON(_urlList, function(result) {
				var selector = _jstreeObj;
				if(result != null) {
					for(var i=0; i<result.length; i++) {
						eval("$." + _makeTree + "(selector, result[i])");
					}
				}
				
				$(_jstreeObj).jstree({
					"plugins" : ["wholerow","checkbox"]
				});
				
				// 권한 체크
				eval("$." + _roleCheck + "(result)");
				
				$(_jstreeObj).jstree("close_all");
				return;
			});
			
			return;
		}
	});
	/* end: 변수 설정 */
	
}));

/**
 * 문자 체크
 */
function checkStrIsEmpty(str) {
	return (str != null && str.length > 0)? true : false;
}