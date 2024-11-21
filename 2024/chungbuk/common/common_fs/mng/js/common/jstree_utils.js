$(document).ready(function() {
	
	// 트리 메뉴 버튼 기능
	$("#tree_panel button").click(function() {
		if(!$(this).prop('disabled')) {
			switch(this.id) {
			// 추가
			case "menu_create":
				if($("#jstree").jstree("get_selected") == "") {
					alert("메뉴를 선택해주세요.");
				} else {
					var ref = $("#jstree").jstree(true),
						sel = ref.get_selected();
					
					sel = sel[0];
					sel = ref.create_node(sel, { "type" : "file" });
					if(sel) {
						ref.edit(sel);
					}
				}
				break;
			// 이름변경
			case "menu_rename":
				if($("#jstree").jstree("get_selected") == "" || $("#jstree").jstree("get_selected") == "root_") {
					return false;
				}
				
				if($("#jstree").jstree("get_selected") == "") {
					alert("메뉴를 선택해주세요.");
				} else {
					var ref = $("#jstree").jstree(true),
					sel = ref.get_selected();
					
					sel = sel[0];
					ref.edit(sel);
				}
				break;
			// 메뉴 펼침
			case "menu_open":
				$("#jstree").jstree("open_all");
				$(this).attr('id', 'menu_close');
				break;
			// 메뉴 닫힘
			case "menu_close":
				$("#jstree").jstree("close_all");
				$("#jstree").jstree("open_node", $("#root_"));

				$(this).attr('id', 'menu_open');
				break;
			// 선택 해제
			case "menu_deselect":
				$("#jstree").jstree("deselect_all");
				// 레이아웃 활성 설정
				$("#menuTip1").css("display", "block");
				$("#menuTip2").css("display", "block");
				$("#form-panel").css("display", "none");
				break;
			// 선택 삭제
			case "menu_remove":
				if($("#jstree").jstree("get_selected") == "" || $("#jstree").jstree("get_selected") == "root_") {
					return false;
				}
				
				if($("#jstree").jstree("get_selected") == "") {
					alert("메뉴를 선택해주세요.");
				} else {
					var ref = $("#jstree").jstree(true),
						sel = ref.get_selected();
					
					if(!sel.length) { return false; }
					$.deleteNode(ref.get_node(sel));
				}
				break;
			}
		}
	});
	
	// 키보드 선택에 따른 설정 함수
	$("#jstree").keydown(function() {
		var keyCode = event.keyCode;

		// INSERT 키보드 버튼 클릭시
		if(keyCode == 45) {
			$("#menu_create").click();
		// DELETE 키보드 버튼 클릭시
		} else if(keyCode == 46) {
			$("#menu_remove").click();
		// F2 키보드 버튼 클릭시
		} else if(keyCode == 113) {
			$("#menu_rename").click();
		}
	});

});