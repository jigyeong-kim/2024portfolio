// 절대경로 추출을 위한 세팅(번역서비스)
// http://61.37.46.4:10050/etgiweb/httpURLwww.suwon.go.kr/web/board/BD_board.list.do?bbsCd=1042
var wildcardDomain = 'suwon.go.kr';
var locPathFile = location.pathname;
var locFullURL = location.href;
//var absolutePath = locFullURL.substring(locFullURL.lastIndexOf(wildcardDomain) + wildcardDomain.length, locFullURL.lastIndexOf('/') + 1);
// 현재 경로에 대한 절대 경로 추출)
var absolutePath = locPathFile.substring(0, locPathFile.lastIndexOf('/') + 1);
// ajax 등과 같은 절대 경로 사용시 경로 앞에 붙여서 사용
var transAbsolutePathHost = '';

if(absolutePath.indexOf('/etgiweb/') > -1) {
    absolutePath = absolutePath.replace('/etgiweb/', '');
    transAbsolutePathHost = '/etgiweb/httpURLwww.suwon.go.kr';
}

// 화면 크기 조정
var nowZoom = 100;

//글자크기 확대 축소
var fSize = 12;
var lineHeightChg = 16;
var moz = 1.00;

$(document).ready(function(){
    $('.f_size ul li a').bind('click', function(){
        $('.f_size.active').removeClass('active');
        $(this).closest('.f_size').addClass('active');
    });
});

var fontControlDefault = 12;
var fontControlVal = 0;
function fontZoomControls(type){
    fontControlDefault = Number($('#container').css('font-size').replace(/[^0-9\.]/ig, ''));
    if(type == 'in'){
        fontControlVal++;
    }else if(type == 'out'){
        fontControlVal--;
    }else{
        fontControlVal = 0;
        document.location.reload(true);
    }
    $('#container *').css('font-size', (fontControlDefault + fontControlVal) + 'px');
    /*$('#container *').each(function(){
        var useFontSize = $(this).css('font-size');
        var stringFontSize = '';
        var intFontSize = 0;
        if(useFontSize != null && useFontSize != ''){
            stringFontSize = useFontSize;
            stringFontSize = stringFontSize.replace(/[^0-9\.]/ig, '');
            intFontSize = Number(stringFontSize);
            if(type == 'in'){
                $(this).css({'font-size' : (intFontSize + 1) + 'px'});
                fontControlVal++;
            }else if(type == 'out'){
                $(this).css({'font-size' : (intFontSize - 1) + 'px'});
                fontControlVal--;
            }else{
                $(this).css({'font-size' : (intFontSize - fontControlVal) + 'px'});
                fontControlVal = 0;
            }
        }
    });*/
    return false;
}
function fontZoomOut(){ fontZoomControls('out'); }
function fontZoomIn(){ fontZoomControls('in'); }
function fontZoomReset(){ fontZoomControls('reset'); }

//화명을 줄인다.
function zoomOut() {
    var checkBrowserKind = CheckBrowserKind();
    //alert(navigator.appName);
    /*if(checkBrowserKind == 'N' || checkBrowserKind == 'F'){
        moz-= 0.05;
        if(moz <= 0.7) moz = 0.7;
        nZooms();
    }else if(checkBrowserKind == 'O'){
        moz-= 0.05;
        if(moz <= 0.7) moz = 0.7;
        oZooms();
    }else{
        nowZoom = nowZoom - 10;
        if(nowZoom <= 70) nowZoom = 70;
        zooms();
    }*/
    nowZoom = nowZoom - 10;
    if(nowZoom <= 70) nowZoom = 70;
    
    moz-= 0.05;
    if(moz <= 0.7) moz = 0.7;
    
    zooms();
}

//화면을 늘린다.
function zoomIn() {
    var checkBrowserKind = CheckBrowserKind();
    //alert(CheckBrowserKind());
    /*if(checkBrowserKind == 'N' || checkBrowserKind == 'F'){
        moz+= 0.05;
        if(moz >= 1.5) moz = 1.5;
        nZooms();
    }else if(checkBrowserKind == 'O'){
        moz+= 0.05;
        if(moz >= 1.5) moz = 1.5;
        oZooms();
    }else{
        nowZoom = nowZoom + 10;
        if(nowZoom >= 200) nowZoom = 200;
        zooms();
    }*/
    nowZoom = nowZoom + 10;
    if(nowZoom >= 200) nowZoom = 200;
    
    moz+= 0.05;
    if(moz >= 1.5) moz = 1.5;
    
    zooms();
}
function zoomReset(){
    document.location.reload(true);
    /*nowZoom = 100; 
    moz = 1.00;
    
    var checkBrowserKind = CheckBrowserKind();  
    if(checkBrowserKind == 'N' || checkBrowserKind == 'F')        
        nZooms();
    else if(checkBrowserKind == 'O')        
        oZooms();
    else        
        zooms();*/    
}

function zooms(){
    //$("#wrapper_all").css("zoom", nowZoom + "%");
    if($.browser.msie){
        if($.browser.version < 9){
            $("#wrapper_all").css("zoom", nowZoom + "%");
            return;
        }
    }
    $("body").css("transform", "scale("+moz+")");
    $("body").css("transform-origin", "center top");
    $("body").css("-webkit-transform", "scale("+moz+")");
    $("body").css("-webkit-transform-origin", "center top");
    $("body").css("-ms-transform", "scale("+moz+")");
    $("body").css("-ms-transform-origin", "center top");
    $("body").css("-moz-transform", "scale("+moz+")");
    $("body").css("-moz-transform-origin", "center top");
    $("body").css("-o-transform", "scale("+moz+")");
    $("body").css("-o-transform-origin", "center top");
}

function nZooms(){
    $("body").css("-moz-transform", "scale("+moz+")");
    $("body").css("-moz-transform-origin", "center top");
}

function oZooms(){
    $("body").css("-o-transform", "scale("+moz+")");
    $("body").css("-o-transform-origin", "center top");
}

//브라우저 종류를 찾는다.
function CheckBrowserKind(){
    var BrowserKind = "I";
    if (navigator.userAgent.indexOf("Firefox") !=-1)
        BrowserKind = "F";
    else if (navigator.userAgent.indexOf("Netscape") !=-1)
        BrowserKind = "N";
    else if (navigator.userAgent.indexOf("Opera") !=-1)
        BrowserKind = "O";
    else if (navigator.userAgent.indexOf("Chrome") !=-1)
        BrowserKind = "C";  
    else if (navigator.userAgent.indexOf("Safari") !=-1)
        BrowserKind = "S";      
    return BrowserKind;
}

function CopyClipBoard(tburl) { 
    var IE=(document.all)?true:false; 
    if (IE) { 
        window.clipboardData.setData('Text', tburl); 
        alert("링크가 클립보드에 복사됐습니다.\nCtrl+v로 붙어넣기 하세요"); 
    } else { 
        temp = prompt("링크주소입니다. Ctrl+C를 눌러 클립보드로 복사하시고,\nCtrl+v로 붙어넣기 하세요 ", tburl);
    } 
}

//수원날씨 호출 함수
/*
var jsSuwonWeather = function() {    
    $.ajax({
        type: "get" ,
        dataType: "json", 
        url: "/component/weather/PD_SuwonWeather.do", 
        success: function(jsonView) {
            if(jsonView.cYear != "") {
                $("#weatherYear").html(jsonView.cYear);                
            }
            if(jsonView.cMonth != "") {
                $("#weatherMonth").html(jsonView.cMonth);                
            }
            if(jsonView.cDay != "") {
                $("#weatherDay").html(jsonView.cDay);                
            }
            if(jsonView.cHour != "") {
                $("#weatherHour").html(jsonView.cHour);                
            } 
            if(jsonView.cTa != "") {
                $("#weatherTa").html(jsonView.cTa); 
            } 
            if(jsonView.desc != "") {
                $("#weatherDesc").html(jsonView.desc); 
            } 
            if(jsonView.descIcon != "") {
                //$("#weatherIcon").attr("src","http://www.kma.go.kr/images/icon/NW/NB"+jsonView.descIcon+".png"); 
                //$("#weatherIcon").attr("src","//web.kma.go.kr/images/icon/NW/NB"+jsonView.descIcon+".png"); 
                $("#weatherIcon").attr("src","/resources/web/common/images/weather/"+jsonView.descIcon+".png");
                $("#weatherIcon").attr("alt", jsonView.desc);
                $("#weatherIcon").css({'max-width':'50px', 'max-height':'50px'});
                $("#weather_zone .weather").removeClass('sunny_day');
                $("#weather_zone .weather").removeClass('rain_day');
                $("#weather_zone .weather").removeClass('fog_day');
                $("#weather_zone .weather").removeClass('snow_day');
                var backClass = '';
                var descIconNum = parseInt(jsonView.descIcon);
                switch(descIconNum){
                    case 1:
                    case 2:
                    case 3:
                        backClass = 'sunny_day';
                        break;
                    case 7:
                    case 8:
                    case 20:
                        backClass = 'rain_day';
                        break;
                    case 11:
                    case 12:
                    case 13:
                    case 21:
                    case 22:
                    case 23:
                        backClass = 'snow_day';
                        break;
                    case 4:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        backClass = 'fog_day';
                        break;
                    default:
                        backClass = 'sunny_day';
                }
                $('.weather_box').html('<a href="http://www.kma.go.kr/weather/main_all.jsp?myPointCode=4111356000&stncd=119&x=13&y=7" target="_blank" title="새창열림" style="text-decoration:none;">' + $('.weather_box').html() + '</a>');
                $("#weather_zone .weather").addClass(backClass);
            }            
        }, 
        error: function(){            
        }
    });
};
*/

//수원날씨 호출 함수(공공데이터)

var jsSuwonWeatherDataSet = function(weatherDataSet) {
    try {
        if(weatherDataSet != null && weatherDataSet != '') {
            var weatherData = $.parseJSON(weatherDataSet);
            if(weatherData.baseDateVal != "") {
                //$("#weatherYear").html(weatherData.baseDateVal.toString().substring(0, 4));                
                //$("#weatherMonth").html(weatherData.baseDateVal.toString().substring(4, 6));                
                //$("#weatherDay").html(weatherData.baseDateVal.toString().substring(6, 8));                
            }
            if(weatherData.baseTimeVal != "") {
                //$("#weatherHour").html(weatherData.baseTimeVal.toString().substring(0, 2));                
            }
            if(weatherData.t1hVal != "") {
                $(".weatherbox .weather .temperature").html(Number(weatherData.t1hVal).toFixed(0) + '℃'); 
                $(".weatherbox .weather .temperature.type2").html('<span>' + Number(weatherData.t1hVal).toFixed(0) + '</span><em>℃</em>');
            }
            $(".weatherbox .weather .text").html(weatherData.descName);
            $(".weatherbox .weather .icon").html(weatherData.descName).attr("title", weatherData.descName);
            /*$("#weatherIcon").attr("src","/resources/web/common/images/weather/"+weatherData.descIcon+".png");
            $("#weatherIcon").attr("alt", weatherData.descName);
            $("#weatherIcon").css({'max-width':'50px', 'max-height':'50px'});
            $("#weather_zone .weather").removeClass('sunny_day');
            $("#weather_zone .weather").removeClass('rain_day');
            $("#weather_zone .weather").removeClass('fog_day');
            $("#weather_zone .weather").removeClass('snow_day');*/
            var backClass = 'weather1';
            if(weatherData.skyVal == '1') {
                backClass = 'weather1';
            } else if(weatherData.skyVal == '2') {
                backClass = 'weather2';
            } else if(weatherData.skyVal == '3') {
                backClass = 'weather3';
            } else if(weatherData.skyVal == '4') {
                backClass = 'weather4';
            }
            if(weatherData.ptyVal == '1') {
                backClass = 'weather5';
            } else if(weatherData.ptyVal == '2') {
                backClass = 'weather6';
            } else if(weatherData.ptyVal == '3') {
                backClass = 'weather7';
            }
            $(".weatherbox").addClass(backClass);
            //$('.weather_box').html('<a href="http://www.kma.go.kr/weather/main_all.jsp?myPointCode=4111356000&stncd=119&x=13&y=7" target="_blank" title="새창열림" style="text-decoration:none;display:block;">' + $('.weather_box').html() + '</a>');
            //$("#weather_zone .weather").addClass(backClass);
        }
    } catch(e) {
        $.cookie('swld', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
    }
};

var jsSuwonWeather = function() {
    var weatherDataSet = '';
    //$.cookie('swld', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
    if($.cookie('swld') != null && $.cookie('swld') != '') {
        jsSuwonWeatherDataSet($.cookie('swld')); 
    } else {
        $.ajax({
            type: "get" ,
            dataType: "json", 
            url: "/component/weather/PD_TimeDataSuwonWeather.do", 
            success: function(jsonView) {
                try {
                    if(jsonView != null) {
                        //var removeTags = /<(\w+)[^>]*>.*<\/\1>/gi;
                        //jsonView = jsonView.replace(removeTags,"");
                        if(jsonView == 'error') {
                            
                        } else {
                            //var resJSON = jsonView;
                            var resJSON = $.parseJSON(jsonView);
                            var responseJSON = resJSON.response;
                            if(responseJSON.header.resultCode == '00') {
                                var bodyJSON = responseJSON.body;
                                if(bodyJSON != null && bodyJSON.items != null && bodyJSON.items != '') {
                                    var itemList = bodyJSON.items.item;
                                    var baseDateVal = itemList[0].baseDate;
                                    var baseTimeVal = itemList[0].baseTime;
                                    var skyVal = 1;
                                    var ptyVal = 0;
                                    var t1hVal = 0;
                                    var descIcon = '';
                                    var descName = '';
                                    var skyNames = ['맑음','맑음','구름조금','구름많음','흐림'];
                                    var ptyNames = ['없음','비','비/눈','눈','소나기'];
                                    //SKY:하늘상태 >> 맑음(1), 구름조금(2), 구름많음(3), 흐림(4)
                                    //PTY:강수형태 >> 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
                                    //T1H:기온
                                    if(itemList.length > 0) {
                                        var skySet = false;
                                        var ptySet = false;
                                        var t1hSet = false;
                                        for(var i = 0; i < itemList.length; i++) {
                                            var categoryValue = itemList[i].category;
                                            /*if(categoryValue == 'SKY') {
                                                skyVal = itemList[i].obsrValue;
                                            } else if(categoryValue == 'PTY') {
                                                ptyVal = itemList[i].obsrValue;
                                            } else if(categoryValue == 'T1H') {
                                                t1hVal = itemList[i].obsrValue;
                                            }*/
                                            if(categoryValue == 'SKY' && skySet == false) {
                                                skyVal = itemList[i].fcstValue;
                                                skySet = true;
                                            } else if(categoryValue == 'PTY' && ptySet == false) {
                                                ptyVal = itemList[i].fcstValue;
                                                if(itemList[i].fcstValue != null && itemList[i].fcstValue > 4){
                                                    ptyVal = '0';
                                                }
                                                ptySet = true;
                                            } else if(categoryValue == 'T1H' && t1hSet == false) {
                                                t1hVal = itemList[i].fcstValue;
                                                t1hSet = true;
                                            }
                                        }
                                        
                                        if(ptyVal == '0') {
                                            descIcon = 'S-' + skyVal;
                                            descName = skyNames[skyVal];
                                        } else {
                                            descIcon = 'P-' + ptyVal;
                                            descName = ptyNames[ptyVal];
                                        }
                                        
                                        // 쿠키에 담을 데이터를 세팅
                                        weatherDataSet = '{';
                                        weatherDataSet += '"baseDateVal": "' + baseDateVal + '",';
                                        weatherDataSet += '"baseTimeVal": "' + baseTimeVal + '",';
                                        weatherDataSet += '"skyVal": "' + skyVal + '",';
                                        weatherDataSet += '"ptyVal": "' + ptyVal + '",';
                                        weatherDataSet += '"t1hVal": "' + t1hVal + '",';
                                        weatherDataSet += '"descIcon": "' + descIcon + '",';
                                        weatherDataSet += '"descName": "' + descName + '"';
                                        weatherDataSet += '}';
                                        
                                        jsSuwonWeatherDataSet(weatherDataSet);
                                    }
                                }
                            }
                        }
                    }
                    // 10분 쿠키설정
                    var ExpiresDate = new Date();
                    ExpiresDate.setTime(ExpiresDate.getTime() + (10 * 60 * 1000));
                    //$.cookie('swld', weatherDataSet, {expires:ExpiresDate, path:'/', domain:'.suwon.go.kr', secure:false});
                    $.cookie('swld', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
                } catch(e) {
                    $.cookie('swld', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
                }
            }, 
            error: function(){            
            }
        });
    }
};

var jsTopInfoFifaHTML = function(){
    var dDay = new Date(2017, 4, 20, 0, 00, 00, 000);
    var lastDay = new Date(2017, 5, 16, 23, 59, 59, 000);
    var gap = dDay.getTime() - overwriteDateTimeNowTime;
    gap = Math.ceil(gap / (1000 * 60 * 60 * 24));
    var dView = '';
    if(gap == 0){
        dView = 'D - day';
    }else{
        dView = (gap < 0) ? 'D + ' + (gap * -1) : 'D - ' + gap;
    }
    var topInfoFifaHTML = '';
    if(overwriteDateTimeNowTime <= lastDay.getTime()){
        topInfoFifaHTML += '<div class="topInfoFifa">';
        topInfoFifaHTML += '    <div class="innerSet">';
        topInfoFifaHTML += '        <a href="/2017fifau20" target="_blank" title="새창열림"><img src="/resources/web/www/images/topInfoFifa.gif" alt="FIFA U-20월드컵 코리아 2017" /></a>';
        //topInfoFifaHTML += '        <div class="dDayInfo">' + dView + '</div>';
        //topInfoFifaHTML += '        <div class="dDayInfo">종료</div>';
        topInfoFifaHTML += '    </div>';
        topInfoFifaHTML += '</div>';
    }
    return topInfoFifaHTML;
};

var swExtCallAData = {'fd10':'', 'fd25':'', 'fda':'', 'ap':'', 'oz':''};
var getSwExtCallADataSet = function(){
    //$.cookie('swextca', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
    if($.cookie('swextca') != null && $.cookie('swextca') != ''){
        swExtCallAData = $.parseJSON($.cookie('swextca'));
    }
};
var setSwExtCallADataSet = function(){
    var results = [];
    var dataSet = '';
    for (var property in swExtCallAData) {
        var value = swExtCallAData[property];
        if (value) {
            value = strip_tags(value, "");
            results.push('"' + property.toString() + '":"' + value.replace(/"/ig, '\\"') + '"');
        }
    }
                
    dataSet = '{' + results.join(',') + '}';
    // 10분 쿠키설정
    var ExpiresDate = new Date();
    ExpiresDate.setTime(ExpiresDate.getTime() + (10 * 60 * 1000));
    //$.cookie('swextca', dataSet, {expires:ExpiresDate, path:'/', domain:'.suwon.go.kr', secure:false});
    $.cookie('swextca', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
};

var siteCodeLists = ['131112', '131114', '131111', '131113'];
var aptCalliing = false;
var jsSuwonAirPollutionTotal = function(){
    if(aptCalliing == false){
        aptCalliing = true;
        /*$.ajax({
            type: "get" ,
            dataType: "json", 
            url: "/component/airPollution/PD_SuwonAirPollutionTotal.do",
            success: function(jsonView) {
                if(jsonView.resultPf != "") {
                    try{
                        //var resultString = $.parseJSON(jsonView.resultPf);
                        var resultString = jsonView.resultPf;
                        var cai = 0;
                        var pm10 = 0;
                        var pm25 = 0;
                        if(resultString != null && resultString.indexOf("&") > -1) {
                            var temp = resultString.split('&');
                            for(var i = 0; i < temp.length; i++){
                                var temp2 = temp[i].split('=');
                                var stringData = '-1';
                                if(temp2[0] == 'caitotal'){
                                    stringData = temp2[1];
                                    swExtCallAData.ap = stringData;
                                    jsSuwonAirPollutionSet(swExtCallAData.ap);
                                }else if(temp2[0] == 'caipm10total'){
                                    stringData = temp2[1];
                                    swExtCallAData.fd10 = stringData;
                                    jsSuwonFineDust10Set(swExtCallAData.fd10);
                                }else if(temp2[0] == 'caipm25total'){
                                    stringData = temp2[1];
                                    swExtCallAData.fd25 = stringData;
                                    jsSuwonFineDust25Set(swExtCallAData.fd25);
                                }
                            }
                        }
                        if(swExtCallAData.ap == null || swExtCallAData.ap == ''){
                            jsSuwonAirPollutionSet('-1');
                        }
                        if(swExtCallAData.fd10 == null || swExtCallAData.fd10 == ''){
                            jsSuwonFineDust10Set('-1');
                        }
                        if(swExtCallAData.fd25 == null || swExtCallAData.fd25 == ''){
                            jsSuwonFineDust25Set('-1');
                        }
                        setSwExtCallADataSet();
                    }catch(e){
                        swExtCallAData.fd10 = '';
                        swExtCallAData.fd25 = '';
                        swExtCallAData.ap = '';
                        setSwExtCallADataSet();
                    }
                }                        
                aptCalliing = false;
            }, 
            error: function(){
                aptCalliing = false;
            }
        });*/
        $.ajax({
            type: "get" ,
            dataType: "json", 
            url: "/component/airPollution/PD_SuwonAPContentTopLists.do",
            success: function(jsonView) {
                if(jsonView != "") {
                    try{
                        var resultTotal = jsonView;
                        if(resultTotal != null && resultTotal.length > 0) {
                            if(siteCodeLists.length > 0){
                                for(var s = 0; s <= siteCodeLists.length; s++){
                                    var cai = '-1';
                                    var pm10 = '-1';
                                    var pm25 = '-1';
                                    for(var i = 0; i < resultTotal.length; i++){
                                        if(siteCodeLists[s] == resultTotal[i].sitecode){
                                            if(resultTotal[i].caipm10total == null
                                               || resultTotal[i].caipm10total == 'null'
                                               || resultTotal[i].caipm10total == '교정중'
                                               || resultTotal[i].caipm10total == '-'
                                               || resultTotal[i].caipm10total == ''){
                                                continue;
                                            }
                                            cai = resultTotal[i].caitotal;
                                            swExtCallAData.ap = cai;
                                            jsSuwonAirPollutionSet(swExtCallAData.ap);
            
                                            pm10 = resultTotal[i].caipm10total;
                                            swExtCallAData.fd10 = pm10;
                                            jsSuwonFineDust10Set(swExtCallAData.fd10);
            
                                            pm25 = resultTotal[i].caipm25total;
                                            swExtCallAData.fd25 = pm25;
                                            jsSuwonFineDust25Set(swExtCallAData.fd25);
                                        }
                                    }
                                    if(pm10 != '-1'){
                                        break;
                                    }
                                }
                            }
                        }
                        if(swExtCallAData.ap == null || swExtCallAData.ap == ''){
                            jsSuwonAirPollutionSet('-1');
                        }
                        if(swExtCallAData.fd10 == null || swExtCallAData.fd10 == ''){
                            jsSuwonFineDust10Set('-1');
                        }
                        if(swExtCallAData.fd25 == null || swExtCallAData.fd25 == ''){
                            jsSuwonFineDust25Set('-1');
                        }
                        setSwExtCallADataSet();
                    }catch(e){
                        swExtCallAData.fd10 = '';
                        swExtCallAData.fd25 = '';
                        swExtCallAData.ap = '';
                        setSwExtCallADataSet();
                    }
                }                        
                aptCalliing = false;
            }, 
            error: function(){
                aptCalliing = false;
            }
        });
    }
};

//수원 미세먼지 호출 함수
var jsSuwonFineDust10Set = function(dataSet){
    try{
        if(dataSet != null && dataSet != ''){
            var stringData = '점검중';
            if(dataSet >= 0 && dataSet <= 30){ 
                stringData = '좋음';
            }else if(dataSet >= 31 && dataSet <= 80){   
                stringData = '보통';
            }else if(dataSet >= 81 && dataSet <= 150){    
                stringData = '나쁨';
            }else if(dataSet >= 151){
                stringData = '매우나쁨';
            }
            //$("#fineDust10Data").html(dataSet.replace('http://air.gg.go.kr/airgg/main_air.html', 'http://air.gg.go.kr/airgg/city/index.html?id=13'));
            //var viewHTML = '<a href="http://air.gg.go.kr" target="_blank" title="경기도대기오염정보센터로 새창이 열립니다.">' + stringData + '</a>';
            $(".weatherbox .dust em").html(stringData);
            $(".weatherbox .dust .icon").html(stringData).attr('title', stringData);
            $(".weatherbox .dust .level").html(dataSet + '㎍/㎥');
            
            var colorClass = 'dust1';
            if(stringData == '점검중'){
                colorClass = 'dust1';
            }else if(stringData == '좋음'){
                colorClass = 'dust1';
            }else if(stringData == '보통'){
                colorClass = 'dust2';
            }else if(stringData == '나쁨'){
                colorClass = 'dust3';
            }else if(stringData == '매우나쁨'){
                colorClass = 'dust4';
                stringData = '매우<br />나쁨';
            }
            $(".weatherbox").addClass(colorClass);
            /*
            var topPm10InfoHTML = '';
            topPm10InfoHTML += '<a href="/web/safesuwon/air/PD_index.do" target="_blank" title="새창열림" style="display:block;width:152px;height:60px;">';
            topPm10InfoHTML += '    <span class="mise_title"><img src="/resources/web/www/images/renew/common/mise_title.png" alt="오늘의 미세먼지" /></span>';
            topPm10InfoHTML += '    <span class="mise_con mi_' + colorClass + '">';
            topPm10InfoHTML += '        <strong class="mise mise_' + colorClass + '"></strong>';
            topPm10InfoHTML += '        <strong class="mise_icon mise_icon_' + colorClass + '">';
            topPm10InfoHTML += '            <span>' + stringData + '</span>';
            topPm10InfoHTML += '        </strong>';
            topPm10InfoHTML += '    </span>';
            topPm10InfoHTML += '</a>';
            */
            //$('.today_mise').addClass('bannerOn');
            //$('.today_mise').html(topPm10InfoHTML);
        }
    }catch(e){
        swExtCallAData.fd10 = '';
        setSwExtCallADataSet();
    }
};
var jsSuwonFineDust10 = function() {
    getSwExtCallADataSet();
    if(swExtCallAData.fd10 != null && swExtCallAData.fd10 != ''){
        jsSuwonFineDust10Set(swExtCallAData.fd10);
    }else{
        /*$.ajax({
            type: "get" ,
            dataType: "json", 
            url: "/component/finedust/PD_SuwonFineDust.do", 
            success: function(jsonView) {
                if(jsonView.resultPf != "") {
                    try{
                        var areaData = $.parseJSON(jsonView.resultPf);
                        var pm10 = 0;
                        var resultString = '점검중';
                        if(areaData.realareadata){
                            for(var i = 0; i < areaData.realareadata.length; i++){
                                var tempData = areaData.realareadata[i];
                                if(tempData.areacode == '3'){
                                    pm10 = tempData.pm10_val;
                                }
                            }
                        }
                        if(pm10 >= 0 && pm10 <= 30){ 
                            resultString = '좋음';
                        }else if(pm10 >= 31 && pm10 <= 80){   
                            resultString = '보통';
                        }else if(pm10 >= 81 && pm10 <= 150){    
                            resultString = '나쁨';
                        }else if(pm10 >= 151){
                            resultString = '매우나쁨';
                        }else{
                            resultString = '점검중';
                        } 
                        swExtCallAData.fd10 = resultString;
                        //swExtCallAData.fd10 = jsonView.resultPf;
                        jsSuwonFineDust10Set(swExtCallAData.fd10);
                        setSwExtCallADataSet();
                    }catch(e){
                        swExtCallAData.fd10 = '';
                        setSwExtCallADataSet();
                    }
                }                        
            }, 
            error: function(){            
            }
        });*/
        jsSuwonAirPollutionTotal();
    }
};
var jsSuwonFineDust25Set = function(dataSet){
    try{
        if(dataSet != null && dataSet != ''){
            var stringData = '점검중';
            //2018-03-27 초미세먼지 기준 변경
            if(dataSet >= 0 && dataSet <= 15){ 
                stringData = '좋음';
            }else if(dataSet >= 16 && dataSet <= 35){   
                stringData = '보통';
            }else if(dataSet >= 36 && dataSet <= 75){    
                stringData = '나쁨';
            }else if(dataSet >= 76){
                stringData = '매우나쁨';
            }
            //$("#fineDust25Data").html(dataSet.replace('http://air.gg.go.kr/airgg/main_air.html', 'http://air.gg.go.kr/airgg/city/index.html?id=13'));
            var viewHTML = '<a href="http://air.gg.go.kr" target="_blank" title="경기도대기오염정보센터로 새창이 열립니다.">' + stringData + '</a>';
            $("#fineDust25Data").html(viewHTML);
        }
    }catch(e){
        swExtCallAData.fd25 = '';
        setSwExtCallADataSet();
    }
};
var jsSuwonFineDust25 = function() {
    getSwExtCallADataSet();
    if(swExtCallAData.fd25 != null && swExtCallAData.fd25 != ''){
        jsSuwonFineDust25Set(swExtCallAData.fd25);
    }else{
        /*$.ajax({
            type: "get" ,
            dataType: "json", 
            url: "/component/finedust/PD_SuwonFineDust.do", 
            success: function(jsonView) {
                if(jsonView.resultPf != "") {
                    try{
                        var areaData = $.parseJSON(jsonView.resultPf);
                        var pm25 = 0;
                        var resultString = '점검중';
                        if(areaData.realareadata){
                            for(var i = 0; i < areaData.realareadata.length; i++){
                                var tempData = areaData.realareadata[i];
                                if(tempData.areacode == '3'){
                                    pm25 = tempData.pm25_val;
                                }
                            }
                        }
                        if(pm25 >= 0 && pm25 <= 15){ 
                            resultString = '좋음';
                        }else if(pm25 >= 16 && pm25 <= 50){   
                            resultString = '보통';
                        }else if(pm25 >= 51 && pm25 <= 100){    
                            resultString = '나쁨';
                        }else if(pm25 >= 101){
                            resultString = '매우나쁨';
                        }else{
                            resultString = '점검중';
                        } 
                        swExtCallAData.fd25 = resultString;
                        //swExtCallAData.fd25 = jsonView.resultPf;
                        jsSuwonFineDust25Set(swExtCallAData.fd25);
                        setSwExtCallADataSet();
                    }catch(e){
                        swExtCallAData.fd25 = '';
                        setSwExtCallADataSet();
                    }
                }                        
            }, 
            error: function(){            
            }
        });*/
        jsSuwonAirPollutionTotal();
    }
};
var jsSuwonFineDust = function() {
    setTimeout(jsSuwonFineDust10, 500);
    setTimeout(jsSuwonFineDust25, 500);
};

//수원 미세먼지경보 호출 함수
var jsSuwonFineDustAlertSet = function(dataSet){
    try{
        if(dataSet != null && dataSet != ''){
            if(dataSet == 'NO_DATA'){
                dataSet = '발령내역 없음';
            }
            var addColor = '';
            if(dataSet != '발령내역 없음'){
                addColor = ' style="color:#ff0000; "';
            }
            //$("#fineDustAlertData").html(dataSet.replace('http://air.gg.go.kr/index2.html', 'http://air.gg.go.kr/airgg/city/index.html?id=13'));
            var viewHTML = '<a href="http://air.gg.go.kr" target="_blank" title="경기도대기오염정보센터로 새창이 열립니다." ' + addColor + '>' + dataSet.replace(' 없음', '<br />없음') + '</a>';
            $("#fineDustAlertData").html(viewHTML);
        }
    }catch(e){
        swExtCallAData.fda = '';
        setSwExtCallADataSet();
    }
};
var jsSuwonFineDustAlert = function() {
    getSwExtCallADataSet();
    if(swExtCallAData.fda != null && swExtCallAData.fda != ''){
        jsSuwonFineDustAlertSet(swExtCallAData.fda);
    }else{
        $.ajax({
            type: "get" ,
            dataType: "json", 
            url: "/component/finedust/PD_SuwonFineDustAlert.do", 
            success: function(jsonView) {
                if(jsonView.resultPf != "") {
                    try{
                        swExtCallAData.fda = jsonView.resultPf;
                        jsSuwonFineDustAlertSet(swExtCallAData.fda);
                        setSwExtCallADataSet();
                    }catch(e){
                        swExtCallAData.fda = '';
                        setSwExtCallADataSet();
                    }
                }                        
            }, 
            error: function(){            
            }
        });
    }
};

//수원 대기오염도 호출 함수
var jsSuwonAirPollutionSet = function(dataSet){
    try{
        if(dataSet != null && dataSet != ''){
            var stringData = '점검중';
            if(dataSet >= 0 && dataSet <= 50){
                stringData = "좋음";
            }else if(dataSet >= 51 && dataSet <= 100){
                stringData = "보통";
            }else if(dataSet >= 101 && dataSet <= 250){
                stringData = "나쁨";
            }else if(dataSet >= 251){
                stringData = "매우나쁨";
            }
            //$("#airPollutionData").html(dataSet.replace('http://air.gg.go.kr/airgg/air_usercity.html', 'http://air.gg.go.kr/airgg/city/index.html?id=13'));
            var viewHTML = '<a href="http://air.gg.go.kr" target="_blank" title="경기도대기오염정보센터로 새창이 열립니다.">' + stringData + '</a>';
            $("#airPollutionData").html(viewHTML);
        }
    }catch(e){
        swExtCallAData.ap = '';
        setSwExtCallADataSet();
    }
};
var jsSuwonAirPollution = function() {
    getSwExtCallADataSet();
    if(swExtCallAData.ap != null && swExtCallAData.ap != ''){
        jsSuwonAirPollutionSet(swExtCallAData.ap);
    }else{
        /*$.ajax({
            type: "get" ,
            dataType: "json", 
            url: "/component/airPollution/PD_SuwonAirPollution.do", 
            success: function(jsonView) {
                if(jsonView.resultPf != "") {
                    try{
                        swExtCallAData.ap = jsonView.resultPf;
                        jsSuwonAirPollutionSet(swExtCallAData.ap);
                        setSwExtCallADataSet();
                    }catch(e){
                        swExtCallAData.ap = '';
                        setSwExtCallADataSet();
                    }
                }                        
            }, 
            error: function(){            
            }
        });*/
        jsSuwonAirPollutionTotal();
    }
};

//수원 오존경보 호출 함수
var jsSuwonOzoneSet = function(dataSet){
    try{
        if(dataSet != null && dataSet != ''){
            //$("#ozoneData").html(dataSet.replace('http://air.gg.go.kr/index2.html', 'http://air.gg.go.kr/airgg/city/index.html?id=13'));
            if(dataSet == 'NO_DATA'){
                dataSet = '발령내역 없음';
            }
            var addColor = '';
            if(dataSet != '발령내역 없음'){
                addColor = ' style="color:#ff0000; "';
            }
            var viewHTML = '<a href="http://air.gg.go.kr" target="_blank" title="경기도대기오염정보센터로 새창이 열립니다." ' + addColor + '>' + dataSet.replace(' 없음', '<br />없음') + '</a>';
            $("#ozoneData").html(viewHTML);
        }
    }catch(e){
        swExtCallAData.oz = '';
        setSwExtCallADataSet();
    }
}; 
var jsSuwonOzone = function() {
    getSwExtCallADataSet();
    if(swExtCallAData.oz != null && swExtCallAData.oz != ''){
        jsSuwonOzoneSet(swExtCallAData.oz);
    }else{
        $.ajax({
            type: "get" ,
            dataType: "json", 
            url: "/component/ozone/PD_SuwonOzone.do", 
            success: function(jsonView) {
                if(jsonView.resultPf != "") {
                    try{
                        swExtCallAData.oz = jsonView.resultPf;
                        jsSuwonOzoneSet(swExtCallAData.oz);
                        setSwExtCallADataSet();
                    }catch(e){
                        swExtCallAData.oz = '';
                        setSwExtCallADataSet();
                    }
                }  
            }, 
            error: function(){            
            }
        });
    }
};





var isValid_passwd = function ( str ) {
    var chk_num     = str.search(/[0-9]/g); 
    var chk_low_eng = str.search(/[a-z]/g); 
    var chk_upp_eng = str.search(/[A-Z]/g);
    var strSpecial  = str.search(/[~!@#$%^&*()_+{}|:<>?]/gi);
    
    var cnt = 0;
    if( str == ""){
        alert("비밀번호를 입력하세요.");
        return false;
    }
    
    var retVal = checkSpace( str );
    if( retVal ) {
        alert("비밀번호에는 공백이 있으면 안됩니다.");
        return false;
    }
    if( str.length < 9 ){
        alert("비밀번호는9~15자의 영문 대소문자와 숫자, 특수문자를 사용할 수 있습니다.");
        return false;
    }
    if(chk_num < 0 || (chk_low_eng < 0 && chk_upp_eng < 0) || strSpecial < 0){ 
        alert("비밀번호는 숫자, 영문자(대/소), 특수문자를 혼용하여야 합니다.");
        return false;
    }
    for( var i=0; i < str.length; ++i)
    {
        if( str.charAt(0) == str.substring( i, i+1 ) ) ++cnt;
    }
    if( cnt == str.length ) {
        alert("보안상의 이유로 한 문자로 연속된 비밀번호는 허용하지 않습니다.");
        return false;
    }
    
    return true;
};

var checkSpace = function ( str ) {
    if(str.search(/\s/) != -1){
        return true;
    } else {
        return false;
    }
};

function containsCharsOnly(input,chars)
{
  for(var i=0; i< input.length; i++) {
    if(chars.indexOf(input.charAt(i)) == -1)
    return false;
  }
  return  true;
}

function isNumeric(input)
{
  var chars = "0123456789";
  return containsCharsOnly(input,chars);
}

function isValid_email( str )
{
     /* check whether input value is included space or not  */
     if(str == ""){
        alert("이메일 주소를 입력하세요.");
        return false;
     }
     var retVal = checkSpace( str );
     if( retVal ) {
         alert("이메일 주소를 빈공간 없이 넣으세요.");
         return false;
     }

     if( -1 == str.indexOf('.') ) {
        alert("이메일 형식이 잘못 되었습니다.");
        return false;
     }
     
     var list = str.split("@",2);  
     if(list.length > 1 && -1 == list[1].indexOf('.') ) {
        alert("이메일 형식이 잘못 되었습니다.");
        return false;
     }

     /* checkFormat */
     var isEmail = /[-_.0-9a-zA-Z]+(\.[-_.0-9a-zA-Z]+)*@[-_.0-9a-zA-Z]+(\.[0-9a-zA-Z]+)*/;
     if( !isEmail.test(str) ) {
         alert("이메일 형식이 잘못 되었습니다.");
         return false;
     }
     if( str.length > 60 ) {
         alert("이메일 주소는 60자까지 유효합니다.");
         return false;
     }

     return true;
}

//webtophone 사용자스크립트
function webtoPhone(receivePhone, userid, sendPhone) {
    alert('무료통화 서비스는 2018년 2월 1일부로 종료되었습니다.');
    return false;
    //window.open('http://www.suwon.go.kr/webtophone/mcWizCall_Client.jsp?partyA='+sendPhone+'&partyB='+receivePhone+'&domainUserId='+userid, 'suwonCityWebtoPhone', 'width=396, height=236');
}

//첨부파일 미리보기
var synapViewerStartTime = null;
function goSynapViewerCall(path, fid) {
    var synapConvertURL = 'https://www.suwon.go.kr:60001/SynapDocViewServer/convert';
    var synapJobURL = 'https://www.suwon.go.kr:60001/SynapDocViewServer/job';
    if(document.getElementsByName('synapViewerSendForm').length == 0){
        var sform = document.createElement('form');
        sform.name = 'synapViewerSendForm';
        sform.action = synapJobURL;
        sform.method = 'post';
        sform.target = '_blank';
        
        var inputArr = [
            ['filePath', '']
            , ['fid', '']
            , ['accessCookieData', '']
            , ['fileType', 'URL']
            , ['convertType', '0']
            , ['convertLocale', '']
            , ['urlEncoding', 'UTF-8']
            , ['refererUrl', '']
            , ['downloadUrl', '']
            , ['watermarkText', '']
            , ['sync', 'true']
            , ['force', 'false']
            , ['title', '']
            , ['single', 'false']
        ];
        for(var i = 0; i < inputArr.length; i++){
            var sinput = document.createElement('input');
            sinput.setAttribute('type', 'hidden');
            sinput.setAttribute('name', inputArr[i][0]);
            sinput.setAttribute('value', inputArr[i][1]);
            sform.appendChild(sinput);
        }
        document.body.appendChild(sform);
    }
    document.synapViewerSendForm.filePath.value = path;
    document.synapViewerSendForm.fid.value = fid;
    if (document.synapViewerSendForm.convertType.value === "2") { // pdf
        document.synapViewerSendForm.action = synapConvertURL;
        return;
    } 
    document.synapViewerSendForm.action = synapJobURL;
    document.synapViewerSendForm.submit();
    synapViewerStartTime = new Date().getTime();
}

function policyPwdChangeFormOpen() {
    var cookieName = "sw_pch_nt";
    if($.cookie(cookieName) != 'ok'){
        $.fn.colorbox({
            open  : true,
            title : "비밀번호 변경 안내",
            href : "/web/PD_agreementConfirm.do",
            width : "894",
            height : "700",
            maxWidth : '95%',
            maxHeight : '95%',
            scrolling : true,
            iframe : true,
            closeButton : false,
            escKey : false,
            arrowKey : false,
            overlayClose : false,
            onOpen:function(){ 
                $("#cboxClose").remove();                   
            }
        });
    }
}
function policyExtendAgreeFormOpen() {
    var cookieName = "sw_uea_nt";
    if($.cookie(cookieName) != 'ok'){
        $.fn.colorbox({
            open  : true,
            title : "회원정보 보존기간 만료안내",
            href : "/web/PD_extendAgree.do",
            width : "894",
            height : "700",
            maxWidth : '95%',
            maxHeight : '95%',
            scrolling : true,
            iframe : true,
            closeButton : false,
            escKey : false,
            arrowKey : false,
            overlayClose : false,
            onOpen:function(){ 
                $("#cboxClose").remove();                   
            }
        });
    }
}

function strip_tags (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

//사이트별 상단 계절별 배너
var swLogoIm = function(areaId, domainCd) {
    $.ajax({
        type: "get" ,
        dataType: "json", 
        url: "/web/main/ND_ajaxSeasonBanner.do?bannerType=1251&domainCd="+domainCd, 
        success: function(jsonView) {
            if(jsonView != "" && jsonView.length > 0) {
                var viewKey = (Math.floor(Math.random() * jsonView.length) + 1) - 1;
                var sbImage = jsonView[viewKey].filePath;
                $("#"+areaId).attr('src', sbImage);
            }
        }, 
        error: function(){            
        }
    });
};

//사이트별 상단 계절별 배너
var jsSeasonBanner = function(areaId, bannerType, domainCd) {
    $.ajax({
        type: "get" ,
        dataType: "json", 
        url: "/web/main/ND_ajaxSeasonBanner.do?bannerType=1140&domainCd="+domainCd, 
        success: function(jsonView) {
            if(jsonView != "" && jsonView.length > 0) {
                var sbImage = jsonView[0].filePath;
                $("#"+areaId).css({'background-image': 'url("' + sbImage + '")', 'background-repeat': 'no-repeat', 'background-position': '0 -1px'});
            }
        }, 
        error: function(){            
        }
    });
    $.ajax({
        type: "get" ,
        dataType: "json", 
        url: "/web/main/ND_ajaxSeasonBanner.do?bannerType="+bannerType+"&domainCd="+domainCd, 
        success: function(jsonView) {
            if(jsonView != "" && jsonView.length > 0) {
                clearInterval(overwriteDateTimeInterVal);
                overwriteDateTimeInterVal = null;
                var sbImage = jsonView[0].filePath;
                var sbTitle = jsonView[0].imgAlt;
                var sbTitle1 = '&nbsp;';
                var sbTitle2 = '&nbsp;';
                var sbLinkUrl = jsonView[0].linkUrl;
                var sbLinkType = jsonView[0].linkType;
                var sbLinkTagAdd = '';
                if(sbTitle.indexOf(',') > -1){
                    var tmpTitle = sbTitle.split(',');
                    sbTitle1 = tmpTitle[0] || sbTitle1;
                    sbTitle2 = tmpTitle[1] || sbTitle2;
                }
                if(sbTitle1 == '&nbsp;' && sbTitle2 == '&nbsp;') {
                    if(sbLinkType != null && sbLinkType != '' && sbLinkType == '_blank'){
                        sbLinkTagAdd = ' target="_blank" title="새창열림" ';
                    }
                    sbTitle = '<a href="' + sbLinkUrl + '" ' + sbLinkTagAdd + ' class="daily_date"><img src="' + sbImage + '" alt="' + sbTitle + '" /></a>';
                    $("#"+areaId).html(sbTitle);
                    $("#"+areaId).css({'width': 'auto', 'padding-left': '0', 'top': '15px'});
                    $("#"+areaId).addClass('bannerOn');
                } else {
                    if(sbLinkUrl != null && sbLinkUrl != ''){
                        if(sbLinkType != null && sbLinkType != '' && sbLinkType == '_blank'){
                            sbLinkTagAdd = ' target="_blank" title="새창열림" ';
                        }
                        sbTitle1 = '<a href="' + sbLinkUrl + '" ' + sbLinkTagAdd + ' class="daily_date">' + sbTitle1 + '</a>';
                        sbTitle2 = '<a href="' + sbLinkUrl + '" ' + sbLinkTagAdd + ' class="daily_day">' + sbTitle2 + '</a>';
                    }
                    $("#"+areaId).css({'background-image': 'url("' + sbImage + '")', 'background-repeat': 'no-repeat', 'background-position': '0 -1px'});
                    $("#"+areaId).addClass('bannerOn');
                    $("#"+areaId + ' .daily_date').html(sbTitle1);                
                    $("#"+areaId + ' .daily_day').html(sbTitle2);
                }
            }
        }, 
        error: function(){            
        }
    });
};

var overwriteDateTimeInterVal = null;
var dayText = ['일', '월', '화', '수', '목', '금', '토'];
var overwriteDateTimeNowTime = 0;
var jsSeasonBannerOverwriteDateTime = function(areaId, nowDateTime) {
    var setDate = new Date();
    if(overwriteDateTimeNowTime > 0 && nowDateTime == ''){
        overwriteDateTimeNowTime = overwriteDateTimeNowTime + 1000;
        setDate = new Date(overwriteDateTimeNowTime);
    }else{
        var yyyy = nowDateTime.substr(0, 4);
        var mm = parseInt(nowDateTime.substr(4, 2), 10);
        var dd = parseInt(nowDateTime.substr(6, 2), 10);
        var hh = parseInt(nowDateTime.substr(8, 2), 10);
        var ii = parseInt(nowDateTime.substr(10, 2), 10);
        var ss = parseInt(nowDateTime.substr(12, 2), 10);
        var sss = parseInt(nowDateTime.substr(14, 3), 10);
        setDate = new Date(yyyy, (mm - 1), dd, hh, ii, ss, sss);
        overwriteDateTimeNowTime = setDate.getTime();
    }
    if(!$("#"+areaId).hasClass('bannerOn')) {
        var dailyDateText = setDate.getFullYear() + '년 ' + (parseInt(setDate.getMonth()) + 1) + '월 ' + setDate.getDate() + '일 (' + dayText[setDate.getDay()] + ')';
        var dailyTimeText = fillNumberToTwoChar(setDate.getHours()) + ':' + fillNumberToTwoChar(setDate.getMinutes()) + ':' + fillNumberToTwoChar(setDate.getSeconds());
        if(!$("#"+areaId + ' .daily_date').attr('data-origin-text')) {
            $("#"+areaId + ' .daily_date').attr('data-origin-text', 'none');
        }
        if($("#"+areaId + ' .daily_date').attr('data-origin-text') != dailyDateText) {
            $("#"+areaId + ' .daily_date').html(dailyDateText);
            $("#"+areaId + ' .daily_date').attr('data-origin-text', dailyDateText);
        }
        $("#"+areaId + ' .daily_day').html(dailyTimeText);
    }
    if(overwriteDateTimeInterVal == null){
        overwriteDateTimeInterVal = setInterval('jsSeasonBannerOverwriteDateTime("' + areaId + '", "")', 1000);
    }
};

var fillNumberToTwoChar = function(num) {
    if(num < 10){
        return '0' + num;
    }else{
        return num;
    }
};

//지방세 안내
var jsLocalTaxDate = function() {
    $.ajax({
        type: "get" ,
        dataType: "json", 
        url: "/web/localTaxDate/ND_ajaxLocalTaxDateList.do", 
        success: function(jsonView) {
            if(jsonView != "" && jsonView.length > 0) {
                var nowMonth = jsonView[0].mm;
                var inHTML = '';
                inHTML += '<p class="tax_tit">'+ nowMonth +'월 지방세</p>';
                inHTML += '<dl>';
                for(var i = 0; i < jsonView.length; i++) {
                    var m = jsonView[i].mm;
                    var d = jsonView[i].dd;
                    var c = jsonView[i].content;
                    inHTML += '    <dt>' + m + '월' + d + '일</dt>';
                    inHTML += '    <dd>' + c + '</dd>';
                }
                inHTML += '</dl>';
                inHTML += '<p class="tax_view"><a href="/sw-www/deptHome/dep_tax/tax01/eco04_03_05.jsp">전체보기</a></p>';
                $("#localTaxDate").html(inHTML).show();
            }                       
        }, 
        error: function(){            
        }
    });
};

var jsLoadBanner = function(areaId, bannerType, domainCd) {
    $.ajax({
        type: "get" ,
        dataType: "json", 
        url: "/web/main/ND_ajaxSeasonBanner.do?bannerType=" + bannerType + "&domainCd="+domainCd, 
        success: function(jsonView) {
            if(jsonView != "" && jsonView.length > 0) {
                for(var i = 0; i < jsonView.length; i++) {
                    var sbImage = jsonView[i].filePath;
                    var sbTitle = jsonView[i].title;
                    var sbAlt = jsonView[i].imgAlt;
                    var sbDesc = jsonView[i].bannerDesc;
                    var sbLinkUrl = jsonView[i].linkUrl;
                    var sbLinkType = jsonView[i].linkType;
                    var sbLinkTagAdd = '';
                    var htmlTag = '';
                    if(sbLinkUrl != null && sbLinkUrl != ''){
                        if(sbLinkType != null && sbLinkType != '' && sbLinkType == '_blank'){
                            sbLinkTagAdd = ' target="_blank" title="새창열림" ';
                        }
                        if(sbLinkUrl.substr(0, 6) == 'class:'){
                            sbLinkTagAdd = ' class="' + sbLinkUrl.substr(6, sbLinkUrl.length) + '"';
                            sbLinkUrl = '#none';
                        }else if(sbLinkUrl.substr(0, 3) == 'id:'){
                            sbLinkTagAdd = ' id="' + sbLinkUrl.substr(3, sbLinkUrl.length) + '"';
                            sbLinkUrl = '#none';
                        }
                        htmlTag = '<a href="' + sbLinkUrl + '" ' + sbLinkTagAdd + '>';
                        htmlTag += '<img src="' + sbImage + '" alt="' + sbAlt + '" />';
                        htmlTag += '<span>';
                        if(sbDesc != null && sbDesc != ''){
                            htmlTag += '' + sbDesc + '';
                            htmlTag += '<br />';
                        }
                        htmlTag += '' + sbTitle + '';
                        htmlTag += '</span>';
                        htmlTag += '</a>';
                        if(areaId == 'match_link_area'){
                            $('#' + areaId + ' .match_banner_split').append(htmlTag);
                        }else{
                            $('#' + areaId).append(htmlTag);
                        }
                    }
                }
                $('#' + areaId).show();
                if(areaId == 'match_link_area'){
                    $('#' + areaId + ' .match_banner_split').show();
                    $('#' + areaId + ' .match_banner_one').hide();
                    $('.builtSearch').unbind('click').bind('click', function(){
                        builtSearch('open');
                    });
                }
            }
        }, 
        error: function(){            
        }
    });
};

var jsLoadFindChildWidget = function() {
    var writngTrgetDscdArr = {'010' : '정상아동(18세미만)', '020' : '가출인', '040' : '시설보호무연고자', '060' : '지적장애인', '061' : '지적장애인(18세미만)', '062' : '지적장애인(18세이상)', '070' : '치매질환자', '080' : '불상(기타)' };
    $.ajax({
        type: "get" ,
        dataType: "text", 
        url: "/web/deptHome/dep_safe/safe03/ND_findChildWidget.do", 
        success: function(jsonView) {
            try{
            var htmlView = '';
                if(jsonView != "") {
                    jsonView = $.parseJSON(jsonView);
                    if(jsonView.result == '00'){
                        //Math.floor( (Math.random() * (n2[상한] - n1[하한] + 1)) + n1[하한] );
                        //var viewKey = Math.floor(Math.random() * (jsonView.list.length - 1)) + 1;
                        var viewKey = (Math.floor(Math.random() * jsonView.list.length) + 1) - 1;
                        var imgUrl = 'data:image/jpg;base64,' + jsonView.list[viewKey].tknphotoFile + '';
                        var descText = jsonView.list[viewKey].etcSpfeatr;
                        if(jsonView.list[viewKey].tknphotoFile == null || jsonView.list[viewKey].tknphotoFile == ''){
                            imgUrl = 'http://www.safe182.go.kr/static/home/images/noImage/police_no_img.gif';
                        }
                        if(descText != null && descText != ''){
                            descText = descText.substring(0, 30);
                        }
                        if($('.quick .quick_find').length > 0){
                            htmlView += '<ul>';
                            htmlView += '   <li class="find_title"><a href="http://www.safe182.go.kr/home/lcm/lcmMssList.do?rptDscd=2" target="_blank" title="새창열림"><img src="/resources/web/www/images/renew/quick/find_title.png" alt="모두 함께 찾아주세요!" /></a></li>';
                            htmlView += '   <li class="find_pic">';
                            htmlView += '       <a href="http://www.safe182.go.kr/home/lcm/lcmMssGet.do?gnbMenuCd=014000000000&lnbMenuCd=014001000000&rptDscd=2&msspsnIdntfccd=' + jsonView.list[viewKey].msspsnIdntfccd + '" target="_blank" title="새창열림"><img src="' + imgUrl + '" width="87" height="116" alt="' + jsonView.list[viewKey].nm + '" /></a>';
                            htmlView += '   </li>';
                            htmlView += '   <li class="find_name">';
                            htmlView += '       ' + jsonView.list[viewKey].nm + '(' + jsonView.list[viewKey].ageNow + '세)' + jsonView.list[viewKey].sexdstnDscd + '';
                            htmlView += '   </li>';
                            htmlView += '   <li class="find_con">';
                            htmlView += '      <p>실종당시 : 나이 ' + jsonView.list[viewKey].age + '세</p>';
                            htmlView += '      <p>실종장소 : ' + jsonView.list[viewKey].occrAdres + '</p>';
                            htmlView += '      <p>' + writngTrgetDscdArr[jsonView.list[viewKey].writngTrgetDscd] + '</p>';
                            htmlView += '      <p>' + descText + '</p>';
                            htmlView += '   </li>';
                            htmlView += '   <li class="find_pol"><img src="/resources/web/www/images/renew/quick/quick_find_logo.png" alt="안전 Dream - 아동,여성,장애인 경찰지원센터" /> </li>';
                            htmlView += '</ul>';
        
                            $('.quick .quick_find').append(htmlView).show();
                            $('#container').css({'min-height':'1000px'});
                        }
                    }
                }
            }catch(e){}
        }, 
        error: function(){
            
        }
    });
};

function builtSearch(act){
    jQuery.fn.center = function () {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    };
    if($('#mask').length == 0){
        $('body').append('<div id="mask"></div>');
    }
    if($('#builtSearch').length == 0){
        $('body').append('<div id="builtSearch" style="display:none;"></div>');
    }
    if(act == 'open'){
        //화면의 높이와 너비를 구한다.
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
        $('#mask').css({'width':maskWidth,'height':maskHeight});

        //애니메이션 효과 - 일단 1초동안 까맣게 됐다가 80% 불투명도로 간다.
        $('#mask').fadeIn(1000);
        $('#mask').show("slow",0.5);

        if($('#builtSearch').find('iframe').length < 1) {
            $('#builtSearch').html('<iframe src="/web/search/built/PD_searchList.do" name="builtSearch" title="맞춤형 서비스" width="970" frameborder="0" scrolling="auto" allowtransparency="true">//맞춤형 서비스</iframe>');
        }
        $('#builtSearch').css({'z-index':'9001'}).show().center();
    }else if(act == 'close'){
        $('#mask, #builtSearch').hide();
    }else if(act == 'resize'){
        $('#builtSearch iframe').css("height", $('#builtSearch iframe').contents().find('#wrap').height() + 'px');
        if($('#container').height() < $('#builtSearch iframe').contents().find('#wrap').height()) {
            $('#container').css({'min-height':$('#builtSearch iframe').contents().find('#wrap').height() + 'px'});
        }
    }
}

/* 안랩 설치용 */
function gotoInstallASTX2() {
    if(navigator.userAgent.toLowerCase().indexOf('windows') > -1){
        if(confirm('개인정보 보호를 위해 보안프로그램 설치가 필요 합니다.\n설치를 원하실 경우 [확인]을 원하지 않으실 경우 [취소]를 선택해주세요.')){
            $.fn.colorbox({
                open  : true,
                title : "보안프로그램설치 안내",
                href : "/security_proinfo.jsp",
                width : "894",
                height : "700",
                scrolling : false,
                iframe : true,
                closeButton : true,
                escKey : false,
                arrowKey : false,
                overlayClose : false
            });
            //window.open('/security_proinfo.html');
        }
    }
}

//ASTx 체크 함수
function checkInstallASTX2(fnSuccess, fnFailure) {
    $ASTX2.init(
        function onSuccess() {
            if(fnSuccess) { fnSuccess(); }  //설치확인
        },
        function onFailure() {
            if(fnFailure) {
                fnFailure();
            }
            else {
                gotoInstallASTX2(); //미설치시, 설치페이지 이동
            }
        }
    );
}
/* 안랩 설치용 */

var documentLoaderImg = new Image();
documentLoaderImg.src = '/resources/web/common/images/loader.gif';

var getDocumentLoader = function() {
    setDocumentLoader('show');
};

var setDocumentLoader = function(vs) {
    if(vs == 'show'){
        var mask = '<div id="loaderMask"></div>';
        var loader = '<div id="loaderAnimation"><img src="/resources/web/common/images/loader.gif" alt="로딩중..." style="max-width:100%;max-height:100%;" /></div>';
        if($('#loaderMask').length <= 0){
            $('body').append(mask);
        }else{
            $('#loaderMask').show();
        }
        if($('#loaderAnimation').length <= 0){
            $('body').append(loader);
        }else{
            $('#loaderAnimation').show();
        }
        var loaderAnimationTop = ((($(document).height() / 2) - ($('#loaderAnimation > img').height() / 2)) + ($(window).scrollTop() / 2));
        var loaderAnimationLeft = (($(document).width() / 2) - ($('#loaderAnimation > img').width() / 2));
        if($(window).scrollTop() == 0){
            loaderAnimationTop = (($(window).height() / 2) - ($('#loaderAnimation > img').height() / 2));
        }
        $('#loaderAnimation').css({'position':'absolute', 'z-index':'999999', 'top':loaderAnimationTop, 'left':loaderAnimationLeft});
        $('#loaderMask').css({'position':'absolute', 'z-index':'999998', 'width':$(document).width(), 'height':$(document).height(), 'top':0, 'left':0, 'background':'#000000', 'opacity':0.5});
    }else if(vs == 'hide'){
        if($('#loaderMask').length > 0){
            $('#loaderMask').hide();
        }
        if($('#loaderAnimation').length > 0){
            $('#loaderAnimation').hide();
        }
    }else if(vs == 'clear'){
        if($('#loaderMask').length > 0){
            $('#loaderMask').remove();
        }
        if($('#loaderAnimation').length > 0){
            $('#loaderAnimation').remove();
        }
    }
};

var fixedFloatingBanner = function() {
    $.ajax({
        type: 'get' ,
        dataType: 'json', 
        url: '/web/main/ND_ajaxSeasonBanner.do?bannerType=1362&domainCd=1',
        success: function(responseData) {
        try{
            if(responseData != '' && responseData.length > 0) {
            var dataSet = responseData[0];
            //$.cookie('evtpop', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
            if($.cookie('evtpop') != 'N'){
                /*
                var dataSet = {
                    'filePath' : '/resources/web/www_new/img/new_common/popup_movie_banner_img.png'
                    , 'linkUrl' : '#none'
                    , 'imgAlt' : ''
                };
                */
                var hasFull = false;
                var filePathString = dataSet.filePath;
                var filePathExt = '';
                if(filePathString != ''){
                    filePathExt = filePathString.toLowerCase().substr(-3);
                    if(filePathExt == 'jpg'){
                        hasFull = true;
                    }
                }
                var eventMaskHTML = '<div class="popup_event_mask"></div>';
                var eventHTML = '<div class="popup_event_wrap">';
                eventHTML += '  <div class="popup_event_layer">';
                eventHTML += '      <div class="popup_event_box">';
                eventHTML += '      <div class="popup_event_box_in ' + (hasFull ? 'popup_event_has_full' : '') + '">';
                eventHTML += '          <a href="' + dataSet.linkUrl + '" target="_blank" title="새창열림" class="popup_event_show">';
                eventHTML += '              <img src="' + dataSet.filePath + '" alt="' + dataSet.imgAlt + '">';
                eventHTML += '          </a>';
                eventHTML += '          <div class="popup_event_close">';
                eventHTML += '              <ul>';
                eventHTML += '                  <li><a href="#none" class="popup_event_close_today"><span class="close_ico">오늘 하루 창 닫기</span></a></li>';
                eventHTML += '              </li>';
                eventHTML += '          </div>';
                eventHTML += '      </div>';
                eventHTML += '      </div>';
                eventHTML += '  </div>';
                eventHTML += '</div>';
                var eventCss = '<style>';
                eventCss += '.popup_event_mask{display:none;position:fixed;width:100%;height:100%;left:0;top:0;z-index:99998;background:rgba(0, 0, 0, 0.8);}';
                eventCss += '.popup_event_wrap{position:fixed;right:0;bottom:50px;padding:0;margin:0;text-align:center;z-index:99998;}';
                eventCss += '.popup_event_layer{max-width:250px;}';
                eventCss += '.popup_event_layer img{max-width:100%;border-radius:10px 10px 0 0;vertical-align:middle;}';
                eventCss += '.popup_event_layer .popup_event_box .popup_event_box_in{/*padding:20px 0 10px 0;*//*background-color:rgba(255, 255, 255, 1);*/border-radius:10px;}';
                eventCss += '.popup_event_close{font-size:12px;border-radius:0 0 10px 10px;}';
                eventCss += '.popup_event_close > ul{display:table;width:100%;padding:10px 0;}';
                eventCss += '.popup_event_close > ul > li{display:table-cell;width:100%;vertical-align:middle;}';
                eventCss += '.popup_event_close > ul > li a{display:block;text-align:center;color:#333;text-shadow:0px 0px 3px #fff;}';
                eventCss += '.popup_event_close > ul > li a .close_ico{display:inline-block;padding-left:30px;line-height:25px;background:url(/resources/web/common/images/floating_close.png) 0 0 no-repeat;}';
                eventCss += '.popup_event_has_full .popup_event_close{background-color:rgba(255, 255, 255, 1);border:1px solid #e4e4e4;}';
                eventCss += '@media screen and (max-width:1199px) {';
                eventCss += '   .popup_event_mask{display:block;}';
                eventCss += '   .popup_event_wrap{width:100%;height:100%;top:0;left:0;bottom:auto;right:auto;}';
                eventCss += '   .popup_event_layer{display:inline-table;table-layout:fixed;width:100%;height:100%;}';
                eventCss += '   .popup_event_layer .popup_event_box{display:table-cell;height:100%;vertical-align:middle;}';
                eventCss += '   .popup_event_layer .popup_event_box .popup_event_box_in{background-color:rgba(255, 255, 255, 1);}';
                eventCss += '}';
                eventCss += '</style>';
                $('head').append(eventCss);
                $('body').append(eventMaskHTML);
                $('body').append(eventHTML);
                $('.popup_event_show').click(function () {
                    $('.popup_event_close_today').trigger('click');
                });
                $('.popup_event_close_today').click(function () {
                    //$('.popup_event_close_now').trigger('click');
                    $('.popup_event_mask, .popup_event_wrap').remove();
                    var ExpiresDate = new Date();
                    ExpiresDate.setTime(ExpiresDate.getTime() + (1 * 24 * 60 * 60 * 1000));
                    $.cookie('evtpop', 'N', {expires:ExpiresDate, path:'/', domain:'.suwon.go.kr', secure:false});
                    return false;
                });
                $('.popup_event_close_now').click(function () {
                    $('.popup_event_mask, .popup_event_wrap').remove();
                });
            }
            }
        }catch(e){}
        }, 
        error: function(){            
        }
    });
};

function clearBrowserWarning(){
    try{
        if($('#browserWarningXBox:checked').length > 0){
            var ExpiresDate = new Date();
            ExpiresDate.setTime(ExpiresDate.getTime() + (1000 * 60 * 60 * 24 * 1));
            $.cookie('bwbox', 'X', {expires:ExpiresDate, path:'/', domain:'.suwon.go.kr', secure:false});
        } else {
            $.cookie('bwbox', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
        }
    }catch(e){}
    $('body').css('background-position', '0 0');
    $('body').removeClass('bwbox');
    $('#browserWarning').remove();
    if($('.bwbox-dummy').length > 0){
        $('.bwbox-dummy').remove();
    }
}

/**
<script>var bwboxFlag = 'none';</script>
**/
if(absolutePath.indexOf('/intra/') < 0 && absolutePath.indexOf('/login/') < 0 && absolutePath.indexOf('/register/') < 0 && absolutePath.indexOf('/component/') < 0 && locPathFile.indexOf('/web/PD_agreementConfirm.do') < 0 && locPathFile.indexOf('/web/PD_extendAgree.do') < 0 && locPathFile.indexOf('/web/safesuwon/') < 0 && locPathFile.indexOf('/web/placard/') < 0) {
    $(document).ready(function(){
        try{
            var bwboxShow = (typeof bwboxFlag === 'string') ? bwboxFlag : '';
            if(bwboxShow == '' && $.cookie('bwbox') != 'X') {
                var topWarningData = {};
                if($('#header').length > 0 && $('.header_menu').length > 0){
                    topWarningData = {'w':$('.header_menu').width()};
                }
                $.ajax({
                    url:'/topWarningBanner.do'
                    , data:topWarningData
                    , dataType:'html'
                    , method:'get'
                    , success:function(content){
                        if($.trim(content) != ''){
                            $('body').css('background-position', '0 100px');
                            $('body').addClass('bwbox');
                            if($('#header').length > 0 && $('#header').css('position') == 'fixed'){
                                $('#header').prepend(content);
                                $('#header').css({'top':'0'});
                                $('body').prepend('<div class="bwbox-dummy"></div>');
                                $(".mobileOpen").click(function(){
                                    $('.bwbox-dummy').hide();
                                });
                                $(".mobileClose").click(function(){
                                    $('.bwbox-dummy').show();
                                });
                            }else{
                                $('body').prepend(content);
                            }
                            var docDomain = document.location.hostname;
                            if(docDomain == 'stat.suwon.go.kr'){
                                $('#wrapper_all').css({'position':'relative'});
                            }
                        }else{
                            if($.browser.msie){
                                if($.browser.version < 11){
                                    try{
                                        if($.cookie('bwbox') != 'X') {
                                            var warningHTML = '';
                                            warningHTML += '<div id="browserWarning" style="border: 1px solid #F7941D; background: #FEEFDA; text-align: center; clear: both; height: 98px; position: relative;">';
                                            warningHTML += '    <div style="width: 970px;height:100%;position: relative; margin: 0 auto; text-align: left; padding: 0; overflow: hidden; color: black;">';
                                            warningHTML += '        <div style="width: 75px; float: left;"><img src="/resources/web/common/images/b_Warning.png" width="75" alt="Warning!"/></div>';
                                            warningHTML += '        <div style="width: 500px; float: left; font-family: Arial, sans-serif;">';
                                            warningHTML += '            <div style="font-size: 14px; font-weight: bold; margin-top: 12px;">오래된 웹브라우저를 사용하시는군요!</div>';
                                            warningHTML += '            <div style="font-size: 12px; margin-top: 6px; line-height: 12px;">2016년 1월 12일부터 인터넷 익스플로러(IE 8·9·10) 버전에 대한 보안업데이트가 중단되오니 IE11로 업그레이드 하실 것을 권장해 드립니다.</div>';
                                            warningHTML += '        </div>';
                                            warningHTML += '        <div style="width: 75px; float: left;"><a href="http://www.firefox.com" target="_blank" title="새창열림"><img src="/resources/web/common/images/b_firefox.png" width="70" style="border: none;padding-top:4px;" alt="Get Firefox"/></a></div>';
                                            warningHTML += '        <div style="width: 75px; float: left;"><a href="http://www.browserforthebetter.com/download.html" target="_blank" title="새창열림"><img src="/resources/web/common/images/b_ie.png" width="70" style="border: none;padding-top:4px;" alt="Get Internet Explorer"/></a></div>';
                                            warningHTML += '        <div style="width: 73px; float: left;"><a href="http://www.apple.com/safari/download/" target="_blank" title="새창열림"><img src="/resources/web/common/images/b_safari.png" width="70" style="border: none;padding-top:4px;" alt="Get Safari"/></a></div>';
                                            warningHTML += '        <div style="float: left;"><a href="http://www.google.com/chrome" target="_blank" title="새창열림"><img src="/resources/web/common/images/b_chrome.png" width="70" style="border: none;padding-top:4px;" alt="Get Google Chrome"/></a></div>';
                                            warningHTML += '        <div style="position: absolute; right: 10px; bottom: 3px; font-family: courier new; font-weight: bold; font-size: 12px;">';
                                            warningHTML += '            <input type="checkbox" id="browserWarningXBox" name="browserWarningXBox" value="Y" style="position:relative;top:2px;" />';
                                            warningHTML += '            <label for="browserWarningXBox">오늘 하루 보지 않기</label>';
                                            warningHTML += '            <a href="#" onclick="javascript:clearBrowserWarning();"><img src="/resources/web/common/images/b_cornerx.png" style="vertical-align:top;" alt="Close this notice"/></a>';
                                            warningHTML += '        </div>';
                                            warningHTML += '    </div>';
                                            warningHTML += '</div>';
                                            $('body').css('background-position', '0 100px');
                                            $('body').addClass('bwbox');
                                            if($('#header').length > 0 && $('#header').css('position') == 'fixed'){
                                                $('#header').prepend(warningHTML);
                                                $('#header').css({'top':'0'});
                                                $('body').prepend('<div class="bwbox-dummy"></div>');
                                                $(".mobileOpen").click(function(){
                                                    $('.bwbox-dummy').hide();
                                                });
                                                $(".mobileClose").click(function(){
                                                    $('.bwbox-dummy').show();
                                                });
                                            }else{
                                                $('body').prepend(warningHTML);
                                            }
                                            $('head').append('<style type="text/css">.bwbox-dummy{display:block;content:\'\';width:100%;height:100px;}</style>');
                                            var docDomain = document.location.hostname;
                                            if(docDomain == 'stat.suwon.go.kr'){
                                                $('#wrapper_all').css({'position':'relative'});
                                            }
                                        }
                                    }catch(e){}
                                }
                            }
                        }
                    }
                });
            }
        }catch(e){}
        fixedFloatingBanner();
    });
}