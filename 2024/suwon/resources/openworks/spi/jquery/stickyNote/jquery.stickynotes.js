var tempContents;
var isCreate;
var maxIndex = 0;

(function($) {

    $.fn.stickyNotes = function(options) {
        $.fn.stickyNotes.options = $.extend({}, $.fn.stickyNotes.defaults, options);
        $.fn.stickyNotes.prepareContainer(this);
        $.each($.fn.stickyNotes.options.notes, function(index, note){
            $.fn.stickyNotes.renderNote(note);
            $.fn.stickyNotes.notes.push(note);

            if (maxIndex < note.zindex) maxIndex = note.zindex;
        });
    };


    $.fn.stickyNotes.getNote = function(note_id) {
        var result = null;
        $.each($.fn.stickyNotes.notes, function(index, note) {
            if (note.id == note_id) {
                result = note;
                return false;
            }
        });
        return result;
    };

    $.fn.stickyNotes.getNotes = function() {
        return $.fn.stickyNotes.notes;
    };

    $.fn.stickyNotes.deleteNote =  function(note_id) {
        $.each($.fn.stickyNotes.notes, function(index, note) {
            if (note.id == note_id) {
                $.fn.stickyNotes.notes.splice(index, 1);
                return false;
            }
        });
    };

    $.fn.stickyNotes.prepareContainer = function(container) {
        $(container).append('<div id="sticky-container" class="sticky-container"></div>');
        if ($.fn.stickyNotes.options.controls) {
            $("#sticky-container").html('<button id="add_note">메모 추가</button>');
            $("#add_note").click(function() {
                /*--
                $.fn.stickyNotes.createNote();
                --*/
                jsCreated();
                return false;
            });
        }
        $("#sticky-container").click(function() {
            var note_ids = $.fn.stickyNotes.currentlyEditedNotes();
            for (var i = note_ids.length - 1; i >= 0; i--){
                var note_id = note_ids[i];
                if (note_id != null) {
                    $.fn.stickyNotes.stopEditing(note_id);
                }
            };
        });
    };

    $.fn.stickyNotes.createNote = function(newSeq) {

        $("#add_note").attr("disabled", true);

        tempContents = "";

        var pos_x = 0;
        var pos_y = 0;
        var note_id = newSeq; // $.fn.stickyNotes.notes.length + 1;
        var _note_content = $(document.createElement('textarea'));

        var _div_note 	= 	$(document.createElement('div')).addClass('jStickyNote');
        var _div_background = $.fn.stickyNotes.createNoteBackground("background_default.png");
        _div_note.append(_note_content);

        var _div_title  =   $(document.createElement('div'))
                            .addClass('jSticky-title')
                            .attr("seq", note_id);
        var _div_delete = 	$(document.createElement('div'))
                            .addClass('jSticky-delete')
                            .click(function(){$.fn.stickyNotes.deleteNote(this);});
        var _div_wrap 	= 	$(document.createElement('div'))
                            .css({'position':'absolute','top':pos_x,'left':pos_y})
                            .attr("id", "note-" + note_id)
                            .append(_div_background)
                            .append(_div_note)
                            .append(_div_delete)
                            .append(_div_title);

        _div_wrap.addClass('jSticky-medium');
        if ($.fn.stickyNotes.options.resizable) {
            _div_wrap.resizable({stop: function(event, ui) { $.fn.stickyNotes.resizedNote(note_id);}});
        }
        _div_wrap.draggable({containment: '#sticky-container', scroll: false,
            start: function(event, ui){$.fn.stickyNotes.movedStartNote(note.id);},
            stop: function(event, ui){$.fn.stickyNotes.movedNote(note_id);}
        });

        $('#sticky-container').append(_div_wrap);

        $.fn.stickyNotes.setCurrentlyEditedNote(note_id);
        $("#note-" + note_id).click(function() {
            return false;
        });
        $("#note-" + note_id).find("textarea").focus();

        var note = {"id":note_id,
              "text":"",
              "pos_x": pos_x,
              "pos_y": pos_y,
              "width": $(_div_wrap).width(),
              "height": $(_div_wrap).height(),
              "zindex": ++maxIndex,
              "background": "background_default.png"};
        $.fn.stickyNotes.notes.push(note);
        $(_note_content).css({
            'width': $("#note-" + note_id).width() - 15,
            'height': $("#note-" + note_id).height() - 15
        });

        _div_wrap.css("z-index", note.zindex);

        isCreate = true;

        /* Add context menu */
        _div_title.contextMenu({
            menu: 'myMenu'
        }, function(action, el, pos) {
            jsChangeBg(action, el);
        });



        /*--
        if ($.fn.stickyNotes.options.createCallback) {
            $.fn.stickyNotes.options.createCallback(note);
        } --*/
    };

    $.fn.stickyNotes.stopEditing = function(note_id) {
        var note = $.fn.stickyNotes.getNote(note_id);

        var contents = $("#note-" + note_id).find('textarea').val();
        if (contents == "" && !isCreate) {
            alert("메모 내용을 입력하세요.");
            $("#note-" + note_id).find('textarea').val(tempContents);
            $("#note-" + note_id).find('textarea').focus();
            return;
        }
        if (contents.length >= 330) {
            alert("메모 내용은 한글 330자 까지만 가능합니다.");
            $("#note-" + note_id).find('textarea').val(tempContents);
            $("#note-" + note_id).find('textarea').focus();
            return;
        }

        note.text = contents.replace(new RegExp("\n", "gi"), "<br>");
        var _p_note_text = 	$(document.createElement('p')).attr("id", "p-note-" + note_id)
                            .html(note.text);
        $("#note-" + note_id).find('textarea').replaceWith(_p_note_text);
        $("#p-note-" + note_id).dblclick(function() {
            $.fn.stickyNotes.editNote(this);
        });
        $.fn.stickyNotes.removeCurrentlyEditedNote(note_id);
        if ($.fn.stickyNotes.options.editCallback) {
            if (contents != tempContents || isCreate)
                $.fn.stickyNotes.options.editCallback(note);
        }

        isCreate = false;
        $("#add_note").attr("disabled", false);
    };

    $.fn.stickyNotes.deleteNote = function(delete_button) {
        var note_id = $(delete_button).parent().attr("id").replace(/note-/, "");
        var note = $.fn.stickyNotes.getNote(note_id);

        if ($.fn.stickyNotes.options.deleteCallback) {
            var isDel = $.fn.stickyNotes.options.deleteCallback(note);
            if (isDel) {
                $("#note-" + note_id).remove();
                /*--
                $.fn.stickyNotes.deleteNote(note_id);
                --*/
            }
        }
        /*--
        $("#note-" + note_id).remove();
        if ($.fn.stickyNotes.options.deleteCallback) {
            $.fn.stickyNotes.options.deleteCallback(note);
        }
        $.fn.stickyNotes.deleteNote(note_id);
        --*/
    };

    $.fn.stickyNotes.editNote = function(paragraph) {
        var note_id = $(paragraph).parent().parent().attr("id").replace(/note-/, "");
        var contents = $("#note-" + note_id).find('p').html();
        contents = contents.replace(new RegExp("<br>", "gi"), "\n");
        var textarea = 	$(document.createElement('textarea')).attr("id", "textarea-note-" + note_id)
                            .val( contents );

        // 임시 저장
        tempContents = contents;

        $("#p-note-" + note_id).replaceWith(textarea);

        $(textarea).css({
            'width': $("#note-" + note_id).width() - 15,
            'height': $("#note-" + note_id).height() - 15
        });
        $("#note-" + note_id).find("textarea").focus();
        $.fn.stickyNotes.setCurrentlyEditedNote(note_id);
    };

    $.fn.stickyNotes.currentlyEditedNotes = function() {
        return $.fn.stickyNotes.currentlyEditedNoteIds;
    };

    $.fn.stickyNotes.setCurrentlyEditedNote = function(note_id) {
        $.fn.stickyNotes.currentlyEditedNoteIds.push(note_id);
    };

    $.fn.stickyNotes.removeCurrentlyEditedNote = function(note_id) {
        var notes = $.fn.stickyNotes.currentlyEditedNotes();
        var pos = -1;
        for (var i = notes.length - 1; i >= 0; i--){
            if (notes[i] == note_id) {
                pos = i;
                break;
            }
        };
        $.fn.stickyNotes.currentlyEditedNoteIds.splice(pos, 1);
    };

    $.fn.stickyNotes.renderNote = function(note) {
        var _p_note_text = 	$(document.createElement('p')).attr("id", "p-note-" + note.id)
                            .html(note.text);
        var _div_note 	= 	$(document.createElement('div')).addClass('jStickyNote');
        var _div_background = $.fn.stickyNotes.createNoteBackground(note.background);
        _div_note.append(_p_note_text);

        var _div_title  =   $(document.createElement('div'))
                            .addClass('jSticky-title')
                            .attr("seq", note.id);
        var _div_delete = 	$(document.createElement('div'))
                            .addClass('jSticky-delete')
                            .click(function(){$.fn.stickyNotes.deleteNote(this);});
        var _div_wrap 	= 	$(document.createElement('div'))
                            .css({'position':'absolute','top':note.pos_y,'left':note.pos_x, "width":note.width,"height":note.height})
                            .attr("id", "note-" + note.id)
                            .append(_div_background)
                            .append(_div_delete)
                            .append(_div_title)
                            .append(_div_note);
        _div_wrap.css("z-index", note.zindex);

        _div_wrap.addClass('jSticky-medium');
        if ($.fn.stickyNotes.options.resizable) {
            _div_wrap.resizable({stop: function(event, ui) { $.fn.stickyNotes.resizedNote(note.id);}});
        }
        _div_wrap.draggable({containment: '#sticky-container', scroll: false,
            start: function(event, ui){$.fn.stickyNotes.movedStartNote(note.id);},
            stop: function(event, ui){$.fn.stickyNotes.movedNote(note.id);}
        });

        $('#sticky-container').append(_div_wrap);
        $("#note-" + note.id).click(function() {
            return false;
        });
        $(_p_note_text).dblclick(function() {
            $.fn.stickyNotes.editNote(this);
        });

        /* Add context menu */
        _div_title.contextMenu({
            menu: 'myMenu'
        }, function(action, el, pos) {
            jsChangeBg(action, el);
        });

    };

    $.fn.stickyNotes.movedStartNote = function(note_id) {

        var _index = ++maxIndex;
        $("#note-" + note_id).css("z-index", _index);

        var note = $.fn.stickyNotes.getNote(note_id);
        note.zindex = _index;
    };

    $.fn.stickyNotes.movedNote = function(note_id) {

        var note = $.fn.stickyNotes.getNote(note_id);

        note.width=$("#note-" + note_id).width();
        note.height=$("#note-" + note_id).height();
        note.pos_x=$("#note-" + note_id).css("left").replace(/px/, "");
        note.pos_y=$("#note-" + note_id).css("top").replace(/px/, "");

        if ($.fn.stickyNotes.options.moveCallback) {
            $.fn.stickyNotes.options.moveCallback(note);
        }
    };

    $.fn.stickyNotes.resizedNote = function(note_id) {

        var note = $.fn.stickyNotes.getNote(note_id);

        note.width=$("#note-" + note_id).width();
        note.height=$("#note-" + note_id).height();

        if ($.fn.stickyNotes.options.resizeCallback) {
            $.fn.stickyNotes.options.resizeCallback(note);
        }
    };
    $.fn.stickyNotes.createNoteBackground = function(background_image) {
        var background = null;
        if ($.browser.msie && $.browser.version <= 6)  {// XXX : 경로 설정이 문제임!!!..
            background = $(document.createElement('div')).addClass("background").html('<img src="'+CTX_PATH+'/resources/openworks/spi/jquery/stickyNote/images/spacer.gif" class="stretch" style="margin-top:5px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+CTX_PATH+'/resources/openworks/spi/jquery/stickyNote/images/' + background_image + '\',sizingMethod=\'scale\'");" alt="" />');
        } else {
            background = $(document.createElement('div')).addClass("background").html('<img src="'+CTX_PATH+'/resources/openworks/spi/jquery/stickyNote/images/' + background_image + '" class="stretch" style="margin-top:5px;" alt="" />');
        }
        return background;
    };

    $.fn.stickyNotes.defaults = {
        notes 	: [],
        resizable : true,
        controls: true,
        editCallback: false,
        createCallback: false,
        deleteCallback: false,
        moveCallback: false,
        resizeCallback: false
    };

    $.fn.stickyNotes.options = null;
    $.fn.stickyNotes.currentlyEditedNoteIds = new Array();
    $.fn.stickyNotes.notes = new Array();
})(jQuery);
