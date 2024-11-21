var treePanel;

Ext.onReady(function(){

    Ext.QuickTips.init();

    /* Validation */
    if ( typeof(ROOT_TREE_ID) == "undefined" ) { alert("ROOT_TREE_ID 값이 정의되지 않았습니다."); return; }
    if ( typeof(PARENT_NODE_ID_VAR) == "undefined" ) { alert("PARENT_NODE_ID_VAR 값이 정의되지 않았습니다."); return; }
    if ( typeof(NODE_ID_VAR) == "undefined" ) { alert("NODE_ID_VAR 값이 정의되지 않았습니다."); return; }
    if ( typeof(TREE_JSON_URL) == "undefined" ) { alert("TREE_JSON_URL 값이 정의되지 않았습니다."); return; }
    if ( typeof(VIEW_URL) == "undefined" ) { alert("VIEW_URL 값이 정의되지 않았습니다."); return; }

    if ( typeof(INSERT_URL) != "undefined" ) {
        if ( typeof(NODE_NM_VAR) == "undefined" ) { alert("NODE_NM_VAR 값이 정의되지 않았습니다."); return; }
    }
    if ( typeof(ENABLE_DND) != "undefined" ) {
        if ( typeof(NODE_ORDER_VAR) == "undefined" ) { alert("NODE_ORDER_VAR 값이 정의되지 않았습니다."); return; }
    }

    if ( typeof(ENABLE_DND) == "undefined" ) { ENABLE_DND = false; }
    if ( typeof(ROOT_TREE_TEXT) == "undefined" ) { ROOT_TREE_TEXT = "트리 목록"; }
    if ( typeof(ROOT_VISIBLE) == "undefined" ) { ROOT_VISIBLE = false; }
    if ( typeof(TREE_EL_ID) == "undefined" ) { TREE_EL_ID = "treeDiv"; }
    if ( typeof(IS_USE) == "undefined" ) { IS_USE = false; }
    if ( typeof(IS_APPEND_LEAF) == "undefined" ) { IS_APPEND_LEAF = false; }
    if ( typeof(PANEL_SIZE_HEIGHT) == "undefined" ) { PANEL_SIZE_HEIGHT = 400; }
    if ( typeof(PANEL_SIZE_WIDTH) == "undefined" ) { PANEL_SIZE_WIDTH = 200; }

    if (typeof(IS_SELECTED_NODE) == "undefined") { IS_SELECTED_NODE = false; }
    if (IS_SELECTED_NODE) {
        if ( typeof(SELECTED_NODE_ID) == "undefined" ) { alert("SELECTED_NODE_ID 값이 정의되지 않았습니다."); return; }
    }

    var treeLoader = new Ext.tree.TreeLoader({
        dataUrl: TREE_JSON_URL
    });
    treeLoader.on("beforeload", function(treeLoader, node) {
        treeLoader.baseParams[PARENT_NODE_ID_VAR] = node.id;
        if (IS_USE) treeLoader.baseParams.useYn = "Y";
        if (typeof(ADDED_VAR) != "undefined") treeLoader.baseParams[ADDED_VAR] = ADDED_VALUE;
    }, this);

    // 담당자관리에서 부서 기본 선택한 경우
    if (IS_SELECTED_NODE) {
        treeLoader.on("load", function() {
            treePanel.getSelectionModel().select(treePanel.getNodeById($("#" + SELECTED_NODE_ID).val()));
        });
    }

    var rootNode = new Ext.tree.AsyncTreeNode({
        text      : ROOT_TREE_TEXT,
        id        : ROOT_TREE_ID,
        draggable : false,
        expanded  : true
    });

    treePanel = new Ext.tree.TreePanel({
        title      : ROOT_TREE_TEXT,
        //el         : TREE_EL_ID,
        enableDD   : ENABLE_DND,
        useArrows  : true,
        height     : PANEL_SIZE_HEIGHT,
        width      : PANEL_SIZE_WIDTH,
        autoScroll : true,
        animate    : true,
        border     : true,
        rootVisible: ROOT_VISIBLE,
        loader     : treeLoader,
        containerScroll : false,
        tools      : [{
            id      : 'refresh',
            qtip    : '다시읽기',
            handler : function(event, toolEl, panel) {
                panel.getEl().mask("로딩중...");
                panel.root.reload(function() {
                    panel.getEl().unmask();
                });
            }
        }]
    });

    treePanel.setRootNode(rootNode);
    treePanel.render(TREE_EL_ID);
    treePanel.expand(false, false);

    treePanel.on("click", function(node, e) {
        e.stopEvent();
        /* tree 원본 
        if ( typeof(window.jsView) == "function" )
            eval( jsView(node) );
        else
            alert( "jsView(node) 함수를 정의하세요.");
        */
        
        /* tree 임시 수정 (리뷰 후 원복) */
        if ( typeof(window.jsView3) == "function" ){
            eval( jsView3(node) );
        }else if( typeof(window.jsView) == "function" ){
            eval( jsView(node) );
        }else{
            alert( "jsView(node) 함수를 정의하세요.");
        }
    });

    if (IS_APPEND_LEAF) {
        treePanel.on("nodedragover", function(e) {
            e.target.leaf = false;
        });
    }

    treePanel.on("movenode", function(tree, node, oldParent, newParent, index) {
        if ( typeof(window.jsMove) == "function" )
            eval( jsMove(node, oldParent, newParent, index) );
        else
            alert( "jsMove(node, oldParent, newParent, index) 함수를 정의하세요.");
    });

    if ( typeof(window.jsBeforeMove) == "function" ) {
        treePanel.on("beforenodedrop", jsBeforeMove);
    }
});




var jsView = function(node) {
    var params = {};
    if (typeof(ADDED_VAR) != "undefined") {
        if (ADDED_VALUE == "") return;
        params[ADDED_VAR] = ADDED_VALUE;
    }
    params[NODE_ID_VAR] = node.id;
    params[PARENT_NODE_ID_VAR] = node.parentNode ? node.parentNode.id : ROOT_TREE_ID;

    $("#treeDetailDiv").load( VIEW_URL, params, function(result) {
        if ( node.id != ROOT_TREE_ID )
            $("#nodePath").html( jsNodePath(node) );
    });
};

var jsDefaultView = function(node) {
    var params = {};
    if (typeof(ADDED_VAR) != "undefined") {
        if (ADDED_VALUE == "") return;
        params[ADDED_VAR] = ADDED_VALUE;
    }
    params[NODE_ID_VAR] = node.id ? node.id : ROOT_TREE_ID;
    params[PARENT_NODE_ID_VAR] = node.parentNode ? node.parentNode.id : ROOT_TREE_ID;

    $("#treeDetailDiv").load( VIEW_URL, params, function(result) {

    });
};

var jsMove = function(node, oldParent, newParent, index) {
    var params = {};
    if (typeof(ADDED_VAR) != "undefined") {
        if (ADDED_VALUE == "") return;
        params[ADDED_VAR] = ADDED_VALUE;
    }
    params[NODE_ID_VAR] = node.id;
    params[PARENT_NODE_ID_VAR] = newParent.id;
    params[NODE_ORDER_VAR] = (index+1);
    if (typeof(TOP_NODE_VAR) != "undefined")
        params[TOP_NODE_VAR] = jsGetTopNode(node);

    $.post( UPDATE_URL, params, function(result) {
    });
};

var jsInsertAction = function(formName) {

    if ( typeof(INSERT_URL) == "undefined" ) {
        alert("INSERT_URL 값이 정의되지 않았습니다.");
        return;
    }

    var insertParams;
    if ( typeof(window.jsCreateUpdateParams) == "function" ) {
        insertParams = eval( jsCreateUpdateParams(treePanel) );
    } else {
        alert( "jsCreateUpdateParams() 함수를 정의하세요." );
        return;
    }

    if ( typeof(window.jsBeforeInsert) == "function" ) {
        var isValid = eval( jsBeforeInsert(formName) );
        if ( !isValid ) return;
    }

    var targetNode;
    if ( $("#isSame").attr("checked") )
        targetNode = treePanel.getNodeById( $("#nodeId").val() ).parentNode;
    else if ( $("#isChild").attr("checked") )
        targetNode = treePanel.getNodeById( $("#nodeId").val() );
    else
        targetNode = treePanel.getRootNode();

    // var params = {};
    if (typeof(ADDED_VAR) != "undefined") {
        if (ADDED_VALUE == "") return;
        insertParams[ADDED_VAR] = ADDED_VALUE;
    }
    insertParams[PARENT_NODE_ID_VAR] = targetNode.id;
    insertParams[NODE_NM_VAR] = $("#newNodeText").val();
    if (typeof(TOP_NODE_VAR) != "undefined")
        insertParams[TOP_NODE_VAR] = jsGetTopNode(targetNode);

    $.post(INSERT_URL, insertParams, function(response) {

        if(response.result) {

            jsSuccessBox(response.message);

            var nodeId = response.value;
            var newNode = new Ext.tree.TreeNode({
                text      : $("#newNodeText").val(),
                id        : nodeId,
                draggable : ENABLE_DND ? true : false
            });

            targetNode.appendChild( newNode );
            if ( $("#isChild").attr("checked") ) {
                targetNode.leaf = false;
            }
            targetNode.expand();
            $("#newNodeText").val("");
        } else {
            jsErrorBox(Message.msg.processFail);
        }
    }, "json");
};

var jsUpdateAction = function(formName) {

    if ( typeof(UPDATE_URL) == "undefined" ) {
        alert("UPDATE_URL 값이 정의되지 않았습니다.");
        return;
    }

    var updateParams;
    if ( typeof(window.jsCreateUpdateParams) == "function" ) {
        updateParams = eval( jsCreateUpdateParams(treePanel) );
    } else {
        alert( "jsCreateUpdateParams() 함수를 정의하세요." );
        return;
    }

    if ( typeof(window.jsBeforeUpdate) == "function" ) {
        var isValid = eval( jsBeforeUpdate(formName) );
        if ( !isValid ) return;
    }

    var targetNode = treePanel.getNodeById( $("#nodeId").val() );

    $.post(UPDATE_URL, updateParams, function(response) {
        try {
            if(eval(response)) {

                jsSuccessBox(Message.msg.updateOk);
                targetNode.setText( $("#nodeText").val() );

                var useYn = $("input[name=useYn]:checked").val();
                if (useYn == 'N') targetNode.setCls("no-use");
                else targetNode.setCls("");

                $("#nodePath").html( jsNodePath(targetNode) );

                if ( typeof(window.jsAfterUpdate) == "function" ) {
                    eval( jsAfterUpdate() );
                }
            } else {
                jsErrorBox(Message.msg.processFail);
            }
        } catch (e) {
            jsSysErrorBox(response, e);
            return;
        }

    });
};

var jsDeleteAction = function() {

    if ( typeof(DELETE_URL) == "undefined" ) {
        alert("DELETE_URL 값이 정의되지 않았습니다.");
        return;
    }

    if ( $("#nodeId").val() == "" ) {
        alert("먼저 삭제할 정보를 선택하세요.");
        return;
    }

    var targetNode = treePanel.getNodeById( $("#nodeId").val() );

    var confirmMessage = "정말 삭제 하시겠습니까?";

    if ( targetNode.childNodes.length > 0 || targetNode.leaf == false)
        confirmMessage = "하위 정보가 존재합니다.\n삭제 시 하위 정보가 모두 삭제됩니다.\n\n정말 삭제 하시겠습니까?";

    var params = {};
    if (typeof(ADDED_VAR) != "undefined") {
        if (ADDED_VALUE == "") return;
        params[ADDED_VAR] = ADDED_VALUE;
    }
    params[PARENT_NODE_ID_VAR] = targetNode.parentNode.id;
    params[NODE_ID_VAR] = targetNode.id;

    if ( confirm( confirmMessage ) ) {
        $.post(DELETE_URL, params, function(response) {

            try {
                if(eval(response)) {

                    jsSuccessBox(Message.msg.deleteOk);
                    targetNode.remove();

                    if ( typeof(window.jsAfterDelete) == "function" ) {
                        eval( jsAfterDelete() );
                    }

                    // 상세조회 화면 초기화
                    params[NODE_ID_VAR] = ROOT_TREE_ID;
                    $("#treeDetailDiv").load(
                        VIEW_URL, params
                    );
                } else {
                    jsErrorBox(Message.msg.processFail);
                }
            } catch (e) {
                jsSysErrorBox(response, e);
                return;
            }
        });
    }
};

var jsNodePath = function(node) {
    var nodeText = node.text;
    var parentNode = node.parentNode;
    if ( parentNode && parentNode.id != ROOT_TREE_ID ) {
        nodeText = jsNodePath(parentNode) + " > " + nodeText;
    }
    return nodeText;
};

var jsGetTopNode = function(node) {
    var topNode = node.id;
    var parentNode = node.parentNode;
    if (!parentNode) return "-1";
    if ( parentNode.id != ROOT_TREE_ID ) {
        topNode = jsGetTopNode(parentNode);
    }
    return topNode;
};