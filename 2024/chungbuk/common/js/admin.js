
function messageByteCk(viewId, byteId, maxLen, byteAt){

    var ls_str = $('#'+viewId).val();
    var li_str_len = ls_str.length;
    var msg_max_len = maxLen;
    var msg_byte = 0;
    var before_byte = 0;
    var len = 0;
    var ls_one_char = "";
    var result_str = "";
    

    for(var i=0; i<ls_str.length; i++){
        ls_one_char = ls_str.charAt(i);
        if(escape(ls_one_char).length > 4){
        	if(byteAt){
                msg_byte += 2;
        	}else{
        		msg_byte ++;
        	}
        }else{
            msg_byte++;
        }

        if(msg_byte <= msg_max_len){
            len = i + 1;
            before_byte = msg_byte;
        }else{
			alert("200자를 초과할수 없습니다");
            break;
        }

    }
    if($('#'+viewId).val()==""){
        $('#'+byteId).val(msg_byte);
    }else if(msg_byte > msg_max_len){
        //alert(li_max + " 200자를 초과할수 없습니다.");
        result_str = ls_str.substr(0,len);
        $('#'+viewId).val(result_str);
        $('#'+byteId).val(before_byte);
    }else{
    	$('#'+byteId).val(msg_byte);
    }
}