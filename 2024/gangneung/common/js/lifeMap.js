
var markers,
    selectMarkers,
    customOverlay,
    local,
    category,
    subCategory,
    localSeletor = $(".local_list"),
    menuSeletor = $(".menu_list"),
    mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {};
    markerImg = '/common/images/lifemap/marker.png',
    markerSize = new daum.maps.Size(18, 24),
    markerOption= {offset: new daum.maps.Point(18, 24)},
    markerSelectImg = '/common/images/lifemap/marker_selected.png',
    markerSelecSize = new daum.maps.Size(18, 24),
    markerSelecOption =  {offset: new daum.maps.Point(18, 24)},
    map;


$(function() {
    // 지역 목록 보기
    $('.local_button').on("click", function() {
        $(".local").addClass("active");
    });
    $('.local').on("mouseleave", function() {
        $(this).removeClass("active");
    });

    // 1depth 읍면선택
    $('.local_label').on("click", function() {
        localSeletor.find('.local_item').removeClass("active");
        var parentItem = $(this).closest(".local_item");
        parentItem.addClass("active");

        localValue = localSeletor.find(".active input").val();
        localMenuTitle =  $(".local_button");
        if(localValue){
            localMenuTitle.html(localValue);
        } else{
            localMenuTitle.html("양평군 전체");
        }
        $(".local").removeClass("active");
        //checkedMenu()
    });

    // 2depth 분류그룹 선택
    $('.menu .menu_button').on("click", function() {
        menuSeletor.find(".menu_button, .submenu_item").removeClass("active");
        //menuSeletor.find('input').removeAttr('checked');
        $(".menu .submenu").stop().slideUp();
        $(this).addClass("active");
        var targetMenu = $(this).closest(".menu_item");
        targetMenu.find(".submenu").stop().slideDown();
        checkedMenu();
    });
    $('.menu').on("mouseleave", function() {
        var isSubmenu =   $(this).find(".submenu").length;
        if(isSubmenu){
            $(this).find(".submenu").stop().slideUp();
        }
    });

    //3depth 항목 선택
    $('.submenu_label').on("click", function() {
        menuSeletor.find('.menu_item, .submenu_item').removeClass("active");
        $(this).closest(".submenu_item, .menu_item").addClass("active");
        checkedMenu()
    });

    //설정 초기화
    $('.result .reset').on("click", function() {
        menuSeletor.find('.menu_button, .submenu_item').removeClass("active");
        menuSeletor.find('input').removeAttr('checked');
        localSeletor.find('.local_item').removeClass("active");
        localSeletor.find('input').removeAttr('checked');
        $(".local_button").html("양평군 전체");
        checkedMenu()
    });

    // 목록 열기, 닫기
    $('.result_open .open_button').on("click", function() {
        $(".result").addClass("active");
        $(".result_open").removeClass("active");
    });
    $('.result .close_button').on("click", function() {
        $(".result_open").addClass("active");
        $(".result").removeClass("active");
    });
    $('.result_button').on("click", function() {
        //console.log(this);
    });

});

var menuStaus;
function menuFunction(){
    if(window.matchMedia("(min-width: 640px)").matches){
        if(menuStaus !== "web"){
            $(".result").addClass("active");
            $(".result_open").removeClass("active");
            menuStaus = "web";
        }
    }else{
        if(menuStaus !== "mobile"){
            $('.result').removeClass("active");
            $(".result_open").addClass("active");
            menuStaus = "mobile";
        }
    }
}
window.addEventListener('DOMContentLoaded', menuFunction);
window.addEventListener('resize', menuFunction);
window.addEventListener('orientationchange', menuFunction);



var localPosition = [
    {
        "local": "양평군 전체",
        "lat": 37.493012,
        "lng": 127.500905
    },
    {
        "local": "양평읍",
        "lat": 37.493012,
        "lng": 127.500905
    },
    {
        "local": "강상면",
        "lat": 37.477106,
        "lng": 127.485500
    },
    {
        "local": "강하면",
        "lat": 37.494915,
        "lng": 127.410450
    },
    {
        "local": "양서면",
        "lat": 37.543880,
        "lng": 127.326029
    },
    {
        "local": "옥천면",
        "lat": 37.517981,
        "lng": 127.456080
    },
    {
        "local": "서종면",
        "lat": 37.606489,
        "lng": 127.348641
    },
    {
        "local": "단월면",
        "lat": 37.538506,
        "lng": 127.672980
    },
    {
        "local": "청운면",
        "lat": 37.556102,
        "lng": 127.70731
    },
    {
        "local": "양동면",
        "lat": 37.424988,
        "lng": 127.751165
    },
    {
        "local": "지평면",
        "lat": 37.474151,
        "lng": 127.638928
    },
    {
        "local": "용문면",
        "lat": 37.486688,
        "lng": 127.595732
    },
    {
        "local": "개군면",
        "lat": 37.425891,
        "lng": 127.536737
    },
];

/*
//JSON 파일 Load
var mapObj = {};
mapObj.url = "/common/js/lifeMapData.json";
mapObj.type = 'get';
mapObj.dataType = 'JSON';
mapObj.success = mapdataload;
mapObj.fail = load_fail;
$.ajax(mapObj);
function mapdataload( $value, $status ){
    if($status == 'success') {
        loadData = $value;
		console.log(loadData);
        mapDataMarkers()
    } else {
        console.log("data load Error");
    }
}
function load_fail(){
    console.log("data load fail");
}
*/


//마커를 생성
function mapDataMarkers(data, localValue){
    var selectLocalPosition = [];
    if(localValue){
        $.each(localPosition, function(i, item){
            if( item.local === localValue){
                selectLocalPosition.push(item);
            }
        });
        centerLat =  selectLocalPosition[0].lat;
        centerLng   = selectLocalPosition[0].lng;
        level = 6;
    } else{
        centerLat =  localPosition[0].lat;
        centerLng   = localPosition[0].lng;
        level = 8;
    }

    mapOption.center = new daum.maps.LatLng(centerLat, centerLng); // 지도의 중심좌표
    mapOption.level = level;
    map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


    map.setZoomable(true); //마우스휠

    //var zoomControl = new kakao.maps.ZoomControl();
    //map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


    var resultList = [];
    markers = [];
   /* if(!data){
        data = loadData;
    }*/
    if(data){
        if(data.length > 0){
            $.each(data, function(i, item){
                var markerImage = new daum.maps.MarkerImage(markerImg, markerSize, markerOption);

                var latlng = new daum.maps.LatLng(item.lat, item.lng);
                var marker = new daum.maps.Marker({
                    map: map, //
                    position: latlng,
                    image : markerImage ,
                });

                //마커 클릭 이벤트
                kakao.maps.event.addListener(marker, 'click', function() {
                    addCustomOverlay(latlng, item);
                    selectMarkers = marker;
                });

                resultList.push('<li>');
                resultList.push('<button type="button" class="result_button" onclick="panTo('+ item.uid +')">');
                resultList.push(item.title);
                resultList.push('</button>');
                resultList.push('</li>');
                markers[i] = marker
            });
        } else{
            resultList.push('<li class="center">');
            resultList.push('등록된 정보가 없습니다.');
            resultList.push('</li>');
        }
    } else{
        resultList.push('<li class="center">');
        resultList.push('지역 또는 분류를 선택하세요');
        resultList.push('</li>');
    }
    $(".result_list").html(resultList.join(""));

}

function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}


//지역 및 분류항목 Filter
function mapData(localValue, categoryValue, subCategoryValue){
    if(localValue || categoryValue || subCategoryValue){
        //지역
        var resultlocal = [];
        if(localValue){
            $.each(loadData, function(i, item){
                if( item.local === localValue){
                    resultlocal.push(item);
                }
            });
        } else{
            resultlocal = loadData;
        }

        //분류그룹
        var resultCategory = [];
        if(categoryValue){
            $.each(resultlocal, function(i, item){
                if( item.category === categoryValue){
                    resultCategory.push(item);
                }
            });
        } else{
            resultCategory = resultlocal;
        }

        //분류항목
        var resultList = [];
        if(subCategoryValue){
            $.each(resultCategory, function(i, item){
                if( item.subCategory === subCategoryValue){
                    resultList.push(item);
                }
            });
        } else{
            resultList = resultCategory
        }
        if(markers){
            markerHide();
        }
        mapDataMarkers(resultList, localValue);
    } else{
        mapDataMarkers();
    }

}

//마커 지우기
function markerHide() {
    setMarkers(null)
}
function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function checkedMenu(){
    localValue = localSeletor.find(".active input").val();
    localTitle =  $(".result_local");
    //localMenuTitle =  $(".local_button");
    if(localValue){
       localTitle.html(localValue);
       //localMenuTitle.html(localValue);
    } else{
       localTitle.html("양평군 전체");
       //localMenuTitle.html("양평군 전체");
    }

   category = menuSeletor.find('.menu_button.active').text();
   categoryTitle = $(".result_menu");
    if(category){
        categoryTitle.html(category);
    } else{
        categoryTitle.html("분류 그룹 전체");
    }

   subCategory = menuSeletor.find('.submenu_item.active').find("input").val();
    subCategoryTitle = $(".result_item");
   if(subCategory){
       subCategoryTitle.html(subCategory);
   } else{
       subCategoryTitle.html(category + " 전체");
   }
   mapData(localValue, category, subCategory)
}

function addCustomOverlay(moveLatLon, item){
    var content = document.createElement('div');
    content.className = "p-map-info";

    var title = document.createElement('div');
    title.className ="p-map_title";
    title.appendChild(document.createTextNode(item.title));
    content.appendChild(title);

    var closeBtn = document.createElement('button');
    closeBtn.className ="p-map_close";
    closeBtn.appendChild(document.createTextNode('닫기'));

    closeBtn.onclick = function() {
        customOverlay.setMap(null);
        if(selectMarkers){
            selectMarkers.setMap(null);
        }
    };
    title.appendChild(closeBtn);

    if(item.address){
        var address = document.createElement('div');
        var addressLabel = document.createElement('span');
        address.className ="p-map_address";
        addressLabel.appendChild(document.createTextNode('주소'));
        address.appendChild(addressLabel);
        address.appendChild(document.createTextNode(item.address));
        content.appendChild(address);
    }
    if(item.tel){
        var tel = document.createElement('div');
        var telLabel = document.createElement('span');
        tel.className ="p-map_tel";

        telLabel.appendChild(document.createTextNode('전화'));
        tel.appendChild(telLabel);
        tel.appendChild(document.createTextNode(item.tel));
        content.appendChild(tel);
    }
    if(item.local){
        var localName = document.createElement('div');
        var localLabel = document.createElement('span');
        localName.className ="p-map_local";

        localLabel.appendChild(document.createTextNode('읍·면'));
        localName.appendChild(localLabel);
        localName.appendChild(document.createTextNode(item.local));
        content.appendChild(localName);
    }
    if(item.homepage){
        var homepage = document.createElement('div');
        var homepageLabel = document.createElement('span');
        homepage.className ="p-map_homepage";
        var homepageLink = document.createElement('a');
        homepageLink.className ="p-map_address_link";

        homepageLabel.appendChild(document.createTextNode('홈페이지'));
        homepageLink.appendChild(document.createTextNode(item.homepage));
        homepageLink.setAttribute("href", item.homepage);
        homepageLink.setAttribute("target", "_blank");
        homepage.appendChild(homepageLabel);
        homepage.appendChild(homepageLink);
        //homepage.appendChild(document.createTextNode(item.homepage));
        content.appendChild(homepage);
    }
    if(item.detail){
        var detail = document.createElement('div');
        var detailLabel = document.createElement('span');
        detail.className ="p-map_detail";

        detailLabel.appendChild(document.createTextNode('상세내용'));
        detail.appendChild(detailLabel);
        detail.appendChild(document.createTextNode(item.detail));
        content.appendChild(detail);
    }
    if(customOverlay) {
        customOverlay.setMap(null);
    }

    //customOverlay
    customOverlay = new daum.maps.CustomOverlay({
        map: map,
        position: moveLatLon,
        content: content,
        yAnchor: 1.35,
        //zIndex: 2
    });

}


// 개발 항목 선택시 마커 변경 및 customOverlay
function panTo(uid) {
    var item;
    $.each(loadData, function(i, data){
        if( data.uid === uid){
            item = data
        }
    });
   //markerHide();

    var markerImageSelected = new daum.maps.MarkerImage(markerSelectImg, markerSelecSize, markerSelecOption);

    // 마커를 생성합니다
    var latlng = new daum.maps.LatLng(item.lat, item.lng);
    var marker = new daum.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: latlng, // 마커를 표시할 위치
        image : markerImageSelected ,// 마커 이미지
    });

    if(selectMarkers){
        selectMarkers.setMap(null);
    }
    selectMarkers = marker;

    var moveLatLon = new daum.maps.LatLng(item.lat, item.lng);
    moveLatLon.level= 2;
    map.panTo(moveLatLon);
    
    addCustomOverlay(moveLatLon, item);
}



