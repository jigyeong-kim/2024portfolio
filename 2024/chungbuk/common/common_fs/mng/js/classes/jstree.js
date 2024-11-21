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
		createNode   : "createNode",
		renameNode   : "renameNode",
		moveNode     : "moveNode",
		makeTree     : "makeTree",
		makeTreeFirst: "makeTreeFirst",
		treeClick    : "treeClick",
		orderFlag    : "Y",
		maxDepth     : 10,
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
			
			if(checkStrIsEmpty(set["createNode"])) {
				this.createNode = set["createNode"];
			}
			if(checkStrIsEmpty(set["renameNode"])) {
				this.renameNode = set["renameNode"];
			}
			if(checkStrIsEmpty(set["moveNode"])) {
				this.moveNode = set["moveNode"];
			}
			
			if(checkStrIsEmpty(set["makeTree"])) {
				this.makeTree = set["makeTree"];
			}
			if(checkStrIsEmpty(set["makeTreeFirst"])) {
				this.makeTreeFirst = set["makeTreeFirst"];
			}
			if(checkStrIsEmpty(set["treeClick"])) {
				this.treeClick = set["treeClick"];
			}
			if(checkStrIsEmpty(set["orderFlag"])) {
				this.orderFlag = set["orderFlag"];
			}
			if(checkStrIsEmpty(set["maxDepth"])) {
				this.maxDepth = set["maxDepth"];
			}
		},
		/*******************************************
		 * 메뉴 목록 정보 추출 Event
		 *******************************************/
		getList: function() {
			var _jstreeObj     = this.jstreeObj;
			var _urlList       = this.urlList;
			var _makeTree      = this.makeTree;
			var _makeTreeFirst = this.makeTreeFirst;
			var _treeClick     = this.treeClick;
			var _orderFlag     = this.orderFlag;
			var _maxDepth      = this.maxDepth;
			
			$(_jstreeObj + " ul").remove();
			$("<ul></ul>").appendTo(_jstreeObj);
			// 관리자 메뉴 정보 리스트 조회
			$.getJSON(_urlList, function(result) {
				var selector = eval("$." + _makeTreeFirst + "('" + _jstreeObj + "')");
				if(result != null) {
					for(var i=0; i<result.length; i++) {
						eval("$." + _makeTree + "(selector, result[i])");
					}
				}

				var plugin = "";
				if(_orderFlag == 'Y') {
					plugin = ["themes", "html_data", "ui", "crrm", "dnd", "search", "types"];
				}
				
				$(_jstreeObj).jstree({
					"plugins" : plugin,
					"core": {
						"check_callback" : true
					},
					"types": {
						"#": {
							max_children: _maxDepth,
							max_depth: _maxDepth
						}
					}
				}).on("create_node.jstree", function(e, data) {
					// 메뉴 정보 저장
					$.ed_jstree.create_node(data);
				}).on("rename_node.jstree", function(e, data) {
					// 메뉴 명 정보 수정
					$.ed_jstree.rename_node(data);
				}).on("move_node.jstree", function(e, data) {
					$.ed_jstree.move_node(data);
				}).on("changed.jstree", function(e) {
					eval("$." + _treeClick + "()");
				});
				
				$(_jstreeObj).jstree("open_all");

				lodingOff(document.body);
				
				return;
			});
			
			return;
		},
		/*******************************************
		 * 메뉴 생성 Event
		 *******************************************/
		create_node: function(data) {
			var _createNode = this.createNode;
			
			var node = $.extend(true, {}, data.node);
		    node.type = "Category";
		    node.name = node.text;
		    node.parentId = data.node.parent;
		    
	        var targetKey = 0;
			if(node.parentId != -1)
				targetKey = node.parentId.replace('root_', '').replace('menu_', '');

			if(!targetKey || targetKey == "" || (node.parentId && node.parentId == "jstree_1"))
				targetKey = 0;

			eval("$." + _createNode + "(targetKey, node, node.name, data)");
		},
		/*******************************************
		 * 메뉴명 수정 Event
		 *******************************************/
		rename_node: function(data) {
			var _renameNode = this.renameNode;
			
			var nodeKey  = data.node.id.replace('root_', '').replace('menu_', '');
			var nodeName = data.text;
			
			eval("$." + _renameNode + "(nodeKey, nodeName)");
		},
		/*******************************************
		 * 메뉴 순번 수정 Event
		 *******************************************/
		move_node: function(data) {
			var _moveNode = this.moveNode;
			
			var nodeKey = data.node.id.replace('root_', '').replace('menu_', '');
			var pKey    = data.parent.replace('root_', '').replace('menu_', '');
			var order   = data.position;
			
			eval("$." + _moveNode + "(nodeKey, pKey, order)");
		},
		/*******************************************
		 * 메뉴 정보 삭제 Event
		 *******************************************/
		delete_node: function(node) {
			
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