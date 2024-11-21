/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    
    config.skin = 'office2003';

    config.font_names = '굴림/Gulim;돋움/Dotum;바탕/Batang;궁서/Gungsuh;' + config.font_names;
    
    config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;15/15px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px';
    
    config.image_prefillDimensions = false;
    
    //config.div_wrapTable = true;

    config.allowedContent = true;
    
    //config.disallowedContent = 'table tbody tr td{width,height}';
    
    //config.forcePasteAsPlainText = 'allow-word';
    //config.forcePasteAsPlainText = true;
    
    config.pasteFilter = 'h1 h2 h3 h4 h5;ul ol li;div;table thead tbody tfoot tr th td[colspan,rowspan];';
    config.removePlugins = 'pastefromword';
    //config.pasteFromWordPromptCleanup = true;
    //config.pasteFormWordRemoveStyles = true;
    //config.pasteFromWordRemoveFontStyles = true;
    
    // a 자식 태그 허용 목록 추가
    CKEDITOR.dtd['a']['div'] = 1;
    CKEDITOR.dtd['a']['p'] = 1;
    CKEDITOR.dtd['a']['i'] = 1;
    CKEDITOR.dtd['a']['span'] = 1;

    // 빈 태그 지워짐 방지
    CKEDITOR.dtd.$removeEmpty['div'] = false;
    CKEDITOR.dtd.$removeEmpty['span'] = false;
    CKEDITOR.dtd.$removeEmpty['i'] = false;

    // 줄바꿈 태그
    //config.enterMode = CKEDITOR.ENTER_BR;

    // 공백없는태그 공백문자 추가 방지
    config.fillEmptyBlocks = false;
};

CKEDITOR.on('dialogDefinition', function ( ev ){
    if(ev.data.name == 'link'){
       ev.data.definition.getContents('target').get('linkTargetType')['default']='_blank';
       ev.data.definition.getContents('advanced').get('advTitle')['default']='새창열림';
    }
    if(ev.data.name == 'table'){
        ev.data.definition.getContents('info').get('txtWidth')['default']='100%';
        ev.data.definition.getContents('info').get('txtBorder')['default']='';
        ev.data.definition.getContents('info').get('txtCellPad')['default']='';
        ev.data.definition.getContents('info').get('txtCellSpace')['default']='';
        ev.data.definition.getContents('info').get('selHeaders')['default']='row';
        ev.data.definition.getContents('info').get('txtCaption')['default']='테이블 설명';
     }
});

CKEDITOR.on('instanceReady', function ( ev ){
    ev.editor.on('paste', function(evt){
        var COMMENT_PSEUDO_COMMENT_OR_LT_BANG = new RegExp( '<!--[\\s\\S]*?(?:-->)?'
        + '<!---+>?' // A comment with no body
        + '|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?'
        + '|<[?][^>]*>?', // A pseudo-comment
        'g');
        evt.data['dataValue'] = '' + evt.data['dataValue'].replace(COMMENT_PSEUDO_COMMENT_OR_LT_BANG, '');
    }, null, null, 9);
});
