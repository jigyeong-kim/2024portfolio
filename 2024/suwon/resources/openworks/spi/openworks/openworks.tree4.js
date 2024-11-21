Ext.require([
    "Ext.tree.*",
    "Ext.data.*",
    "Ext.tip.*"
]);

// 트리 패널 생성 갯수에 따라 생성
var treeCnt;
var treeStore;
var treePanel;

Ext.onReady(function() {

    Ext.QuickTips.init();

        /* 
         * 필수 속성 검증 및 비필수 항목은 기본 값 설정 
         * 
         * actionMethods 도 설정으로 변경
         * actionMethods   : 'POST'
         */
        
        // 속성 설정(관리 목적)
        if(typeof (TREE_EL_ID) == "undefined") {
            TREE_EL_ID = "목록 선택";
        }
        if(typeof (TREE_EL_ID) == "undefined") {
            TREE_EL_ID = "treeDiv";
        }
        if(typeof (TREE_DETAIL_ID) == "undefined") {
            TREE_DETAIL_ID = "treeDetailDiv";
        }
        if(typeof (ROOT_VISIBLE) == "undefined") {
            ROOT_VISIBLE = false;
        }
        if(typeof (ROOT_TREE_ID) == "undefined") {
            alert("ROOT_TREE_ID 값이 정의되지 않았습니다.");
            return;
        }
        if(typeof (ROOT_TREE_TEXT) == "undefined") {
            ROOT_TREE_TEXT = "목록";
        }
        if(typeof (PARENT_NODE_ID_VAR) == "undefined") {
            alert("PARENT_NODE_ID_VAR 값이 정의되지 않았습니다.");
            return;
        }
        if(typeof (NODE_ID_VAR) == "undefined") {
            alert("NODE_ID_VAR 값이 정의되지 않았습니다.");
            return;
        }

        if(typeof (ENABLE_DND) == "undefined") {
            ENABLE_DND = false;
        }
        if(typeof (ENABLE_DND)) {
            if(typeof (NODE_ORDER_VAR) == "undefined") {
                alert("NODE_ORDER_VAR 값이 정의되지 않았습니다.");
                return;
            }
        }

        // 기타 부가 설정
        if(typeof (IS_USE) == "undefined") {
            IS_USE = false;
        }
        if(typeof (IS_APPEND_LEAF) == "undefined") {
            IS_APPEND_LEAF = false;
        }
        if(typeof (RESIZABLE) == "undefined") {
            RESIZABLE = false;
        }
        if(typeof (PANEL_SIZE_HEIGHT) == "undefined") {
            PANEL_SIZE_HEIGHT = 400;
        }
        if(typeof (PANEL_SIZE_WIDTH) == "undefined") {
            PANEL_SIZE_WIDTH = 200;
        }

        // 엑션에 따른 Method 및 URL 설정
        if(typeof (METHOD) == "undefined") {
            METHOD = "post";
        }
        if(typeof (TREE_JSON_URL) == "undefined") {
            alert("TREE_JSON_URL 값이 정의되지 않았습니다.");
            return;
        }
        if(typeof (VIEW_URL) == "undefined") {
            alert("VIEW_URL 값이 정의되지 않았습니다.");
            return;
        }
        if(typeof (INSERT_URL) != "undefined") {
            if(typeof (NODE_NM_VAR) == "undefined") {
                alert("NODE_NM_VAR 값이 정의되지 않았습니다.");
                return;
            };
        }

        var store = Ext.create("Ext.data.TreeStore", {
            noCache: true,
            nodeParam: PARENT_NODE_ID_VAR,
            proxy: {
                type: "ajax",
                url: TREE_JSON_URL,
                actionMethods : {
                    create : METHOD,
                    destroy : METHOD,
                    read : METHOD,
                    update : METHOD
                },
                extraParams : {
                    test : "TEST"
                }
            },
            root: {
                text: ROOT_TREE_TEXT,
                id: ROOT_TREE_ID,
                expanded: true
            }
        });

        // 순서 이동 가능 옵션 설정
        var viewConfig = null; 
        if(ENABLE_DND) {
            viewConfig = {
                plugins : {
                    ptype : "treeviewdragdrop"
                }
            };
        }

        var panel = Ext.create("Ext.tree.Panel", {
            id : TREE_EL_ID,
            store : store,
            title : TREE_TITLE,
            renderTo : TREE_EL_ID,
            rootVisible : ROOT_VISIBLE,
            height : PANEL_SIZE_HEIGHT,
            width : PANEL_SIZE_WIDTH,
            resizable : RESIZABLE,
            autoScroll : true,
            animate : true,
            border : true,
            useArrows : true,
            tools : [ {
                itemId: 'refresh',
                type : 'refresh',
                tooltip : '새로고침',
                handler : function(event, toolEl, panel) {
                    //header.getParent().getEl().mask("로딩중...");
alert(toolEl);
                    viewProp(toolEl);
/*
                    var store = header.getStore();
                    store.refresh(
                        function() {
                            panel.getEl().unmask(); 
                        }
                    );
*/
                }
            } ],
            viewConfig : viewConfig
        });


        // 트리 항목 클릭시
        panel.on("itemclick", function(view, model, item, index, e) {
            var selModel = panel.getSelectionModel();
            //alert(selModel);
            viewProp(model);
            jsView(model);
        }); 

});

var jsNodePath = function(node) {
    var nodeText = node.text;
    var parentNode = node.parentNode;
    if ( parentNode.id != ROOT_TREE_ID ) {
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