    
    // 참여인원수 제한
    $("input[name=nmpr]").change(function() {
        var nmpr = parseInt($("#nmpr").val());
        var mxmNmpr = parseInt($('#mxmNmpr').text().substring(5,8));
        if (nmpr > mxmNmpr) {
            alert("참여인원수가 최대인원을 초과하였습니다.");
            $("#nmpr").val('');
        } else if (nmpr == 0) {
            alert("참여인원수는 최소 1명 이상 입력해주세요.");
            $("#nmpr").val('');
        }
    });
    
    // 접수상태 -> 반려선택시
    $("select[name=sttus]").change(function() {
        if ($("#sttus").val() == "반려") {
            $("#returnResn").css("display","block");
            $("#sttus").css("float","left");
            $("#returnResn").css("float","left");
        } else {
            $("#returnResn").css("display","none");
        }
    });
    
    // 사용기간 -> 시작시간을 종료시간보다 뒤에 설정할 경우 
    $("select[name=useBgnhr]").change(function() {
        var useBgnhr = parseInt($("#useBgnhr").val());
        var useEndhr = parseInt($("#useEndhr").val());
        if (useBgnhr >= useEndhr) {
            alert("시작시간이 종료시간과 같거나 늦을 수 없습니다. \n\n시작시간을 다시 설정해주세요.");
            $("#useBgnhr").val('');
        }
    });
    
    // 사용기간 -> 종료시간을 시작시간보다 앞에 설정할 경우 
    $("select[name=useEndhr]").change(function() {
        var useBgnhr = parseInt($("#useBgnhr").val());
        var useEndhr = parseInt($("#useEndhr").val());
        if (useBgnhr >= useEndhr) {
            alert("종료시간이 시작시간과 같거나 빠를 수 없습니다. \n\n종료시간을 다시 설정해주세요.");
            $("#useEndhr").val('');
        }
    });
    
    // 점심시간 제외 문구가 존재할 경우
    if ( $("#noHour").length > 0 ) {
        $("#useBgnhr option[value='12']").prop('disabled',true);
        $("#useEndhr option[value='13']").prop('disabled',true);
    }
    
    $('#checkDplct').click( function(){
        var param = { 
            "ancientNo": $('#ancientNo').val(),
            "useBgnde": $('#useBgnde').val(), 
            "useBgnhr": $('#useBgnhr').val(),
            "useEndhr": $('#useEndhr').val()
        };
        
        $.ajax({
            type:"POST",
            dataType:"JSON",
            contentType:'application/json',
            data:JSON.stringify(param),
            url:'./selectDplctByDate.do?key=1207&ancientNo=${ancientVO.ancientNo}',
            success:function(data) {
                if (data > 0) {
                    alert("해당 일자의 시간에 다른 이용자가 이미 신청한 상태입니다. \n\n다른 일자 또는 다른 시간을 선택하여 주십시오.");
                } else {
                    alert("사용가능한 날짜입니다.");
                }
            },
            error:function(request,status,error){
                console.log(error);
                alert("에러발생");
            }
        }); /* $.ajax */
    }); /* click */
	    
