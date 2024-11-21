if(navigator.userAgent.indexOf("MSIE 7") > 0 || navigator.userAgent.indexOf("MSIE 8") > 0) {
    $("document").ready(function(){
        //alert("ie7 && ie8");
        pc_menu();
    });
} else {
    //ie8 이상에서 적용됨
    //메인 사이즈
    $("document").ready(function(){
        if ( $(window).width() > 999){
            pc_menu();
            //sub_menu();
        }
        if else ( $(window).width() > 640 ){
            $(".tab_menu > ul").css("display","block");
        }
        else{
            mobile_menu();
        }
    });
    var windowWidth = $(window).width();
    $(window).resize(function() {
        if( windowWidth != $(window).width() ) {
            if ( $(window).width() > 999){
                pc_menu();
                //sub_menu();
                return false;
            }
            if else( $(window).width() > 640 ){
                alert("aa");
                $(".tab_menu > ul").css("display","block");
            }
            else {
                mobile_menu();
            }
        }
        windowWidth = $(window).width();
    })
};