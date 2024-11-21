    
    var srcidx=0;
    var keyword="";
    var tx="127.02846930674324";
    var ty="37.262820739367065";
    var map;
    var cgbnidx="";
    var cgbnname="";
    var infowindow = new Array();
    var nwin=0;
    
    function SetHtml(id,val){
    }

    function MakeWindow(arrMin){
        var sText = '';
        var hpageAddText = '';
        var hpageTmpArr = '';
        recid = arrMin[2];
        corpName = arrMin[3];
        corpName = corpName.replace("^",",");
        corpName = corpName.replace("^",",");
        //alert(arrMin[11]);
        
        sText = sText + '<div class="map_info_pop2">';
        sText = sText + '<dl>';
        sText = sText + '    <dt><b>'+corpName+'</b></dt>';
        sText = sText + '    <dd>';
        if (arrMin[11]!='') {
            sText = sText + ''+arrMin[11]+'';
        }
        if (arrMin[4]!='') {
            sText = sText + '        <span><b>전화:</b> '+arrMin[4]+'<br/></span>';
        }
        if (arrMin[5]!='') {
            sText = sText + '        <span><b>주소:</b> '+arrMin[5]+'<br/></span>';
        }
        
        if (arrMin[6]!="") {
            sText = sText + '               <span><b>홈페이지:</b> ';
            website = arrMin[6];
            if(website.indexOf('|') > -1) {
                hpageTmpArr = website.split('|');
                website = hpageTmpArr[0];
                hpageAddText = hpageTmpArr[1];
            }
            website = $.trim(website);
            website_s = website.split('://');
            website = website.replace("http://",""); 
            website = website.replace("https://",""); 
            if (website_s.length==1) {
                website_s[0] = "http";
            }
            if (website != "") {
                sText = sText + '<a href="'+website_s[0]+'://'+website+'" target="_blank" title="새창">'+website_s[0]+'://' + website + '</a> ' + hpageAddText + '<br/></span>';
            }
        }
        
        //sText = sText + '        <span class="sns_btn"><b>위치공유:</b><a href="#"><img src="resources/web/tour/images/tourmap_btn_f.gif" alt="페이스북" title="페이스북"/></a>';
        //sText = sText + '       <a href="#"><img src="resources/web/tour/images/tourmap_btn_t.gif" alt="트위터" title="트위터"/></a>';
        //sText = sText + '       <a href="#"><img src="resources/web/tour/images/tourmap_btn_me.gif" alt="미투데이" title="미투데이"/></a></span>';
        sText = sText + '    </dd>';
        sText = sText + '</dl>';
        //sText = sText + '<ul class="map_info_pop_btn">';
        //sText = sText + '    <li><a href="#"><img src="resources/web/tour/images/tourmap_btn_detail.gif" alt="상세정보보기" title="상세정보보기"/></a></li>';
        // sText = sText + '    <li><a href="#"><img src="resources/web/tour/images/tourmap_btn_board.gif" alt="개선사항접수" title="개선사항접수"/></a></li>';
        // sText = sText + '</ul>';
        sText = sText + '</div>';

        return sText;
    }
         
    function makeMark(arrMin,nm){ 
        var x=arrMin[0];
        var y=arrMin[1];

        var points = [new daum.maps.LatLng(y,x)]; 
        var marker = new daum.maps.Marker({position: points[0]});
        marker.setMap(map);

        infowindow[nm] = new daum.maps.InfoWindow({content:  MakeWindow(arrMin),removable : true});
        daum.maps.event.addListener(marker, "click", function(){
//alert(nwin +'-'+ nm);
            //if (nwin!=nm) {
                if (nwin!=null && nwin!=0)
                {
                    infowindow[nwin].close(); 
                    nwin = 0;
                }

                map.panTo(new daum.maps.LatLng(y,x));
                nwin=nm;
                infowindow[nm].open(map, marker);
                SetComment(arrMin[2],arrMin[3]);

                mainIconViewYn('1', false);
                showMenu1('', false);
                showMenu2('', false);
                //document.location.href="#icon_Layer"; 
                //document.getElementById("roadview").style.display="none";
            //}
        });

        daum.maps.event.addListener(map, "click", function() { 
            //infowindow[nm].close(); 
        }); 


    }

    // ##################################################################################
    function moveGbn(gbnidx,gbnname){
        cgbnname=gbnname;
        cgbnidx=gbnidx;
        init_map();
        var pareaidx=GetValue("pareaidx");  
        var areaidx=GetValue("areaidx");    
        moveGbnPage("name_co",cgbnname,cgbnidx,pareaidx,areaidx,1);
    }

    function moveGbnPage(field,gbname,gbnidx,pareaidx,areaidx,page){
        keyword=gbname;
        init_map();
        var url= "/locinfo/ajax/getInfoList.asp?gbnidx="+gbnidx + "&pareaidx="+pareaidx + "&areaidx="+areaidx + "&page="+page;
        var call = new SoapProc.Request(url,RcvGetInfo);
        call.sendRequest();
        return false;
    }

    // ##################################################################################
    function changeLocation(val,nm){

        //if (nwin!=nm) {
            if (nwin!=0) {
                infowindow[nwin].close();
            }
            var arrMin=val.split("*");
            var x=arrMin[0];
            var y=arrMin[1];
            map.panTo(new daum.maps.LatLng(y,x));
            var points = [new daum.maps.LatLng(y,x)];
            var marker = new daum.maps.Marker({position: points[0]});

            //marker.setMap(map); //처음에 마크업을 했기때문에 또 할필요가 없음.
            infowindow[nm] = new daum.maps.InfoWindow({content: MakeWindow(arrMin),removable : true });

            nwin=nm;

            infowindow[nm].open(map, marker);
            SetComment(arrMin[2],arrMin[3]);
            mainIconViewYn('1', false);
            showMenu1('', false);
            showMenu2('', false);
            //document.location.href="#icon_Layer";
            //document.getElementById("roadview").style.display="none";
        //} 
    }

    function changeLocation2(val,nm){

        //if (nwin!=nm) {
            showMainRiaClose();
            init_map();
            if (nwin!=0) {
                infowindow[nwin].close();
            }
            var arrMin=val.split(",");
            var x=arrMin[0];
            var y=arrMin[1];
            map.panTo(new daum.maps.LatLng(y,x));
            var points = [new daum.maps.LatLng(y,x)];
            var marker = new daum.maps.Marker({position: points[0]});

            marker.setMap(map); //처음에 마크업을 했기때문에 또 할필요가 없음.
            infowindow[nm] = new daum.maps.InfoWindow({content: MakeWindow(arrMin),removable : true });

            
            nwin=nm;

            infowindow[nm].open(map, marker);
            SetComment(arrMin[2],arrMin[3]);

            mainIconViewYn('1', false);
            showMenu2('', false);
            showMenu1('', false);

            //document.location.href="#icon_Layer";
            //document.getElementById("roadview").style.display="none";
        //} 
    }

    function RoadVw(x,y)
    {
        document.getElementById("roadview").style.display="block";
        var p = new daum.maps.LatLng(y, x);
        var rc = new daum.maps.RoadviewClient();
        var rv = new daum.maps.Roadview(document.getElementById("roadview"));

        rc.getNearestPanoId(p, 50, function(panoid) {
            rv.setPanoId(panoid, p);
        }); 
    }
    function SetComment(recid,title){
        SetHtml("FocTitle",title);
        $("#comment_lay").removeClass("hidden");
        //cmifr.location.href="comment.asp?recid="+recid;
    }

    function RcvGetDong(request){
        if(request.readyState == 4 ){
            if(request.status == 200){
                var val = request.responseText;
                $("#dong_lay").html(val);

            }else if(request.status == 500){
                var val = request.responseText;
                Debug(val,true);
            }
        }
    }
    function GetList(val){
        var pareaidx,areaidx;
        pareaidx=GetValue("pareaidx");
        areaidx=val;
        {
            movePage("","","",pareaidx,areaidx,"1");
        }
    }
    function ResetBox(){
        var str='';
        str+='<select name="areaidx" id="areaidx" class="select" onchange="GetList(this.value);">';
        str+='<option>동선택</option>';
        str+='</select>';
        $("#dong_lay").html(str);
    }
    function Tab(v,h) { 
        $("#tab"+v).addClass("current");
        $("#tab"+h).removeClass("current");
        if (v==2) {
            openSearch();
        }else{
            ResetMap();
        }
    }
    function openSearch()
    {
        if(srcidx==0){
            $("#search_pop").removeClass("hidden");
            srcidx=1;
        }else{
            $("#search_pop").addClass("hidden");
            srcidx=0;
        }
    }
    function ResetMap(){
        SetHtml("searchval","");        
        $("#icon_Layer").removeClass("hidden");
        $("#cate_layer").addClass("hidden");
        SetHtml("totcount",0);      
        $("#tot_layor").addClass("hidden");
        SetHtml("list_layer","");       
        $("#list_layer").addClass("hidden");
        srcidx=1;
        openSearch();
    }
    function chk_fld(f){
        var field=f.field.value;
        keyword=f.keyword.value;
        var pareaidx=GetValue("pareaidx");  
        var areaidx=GetValue("areaidx");    
        if(keyword==""){alert("검색하실 명칭을 입력하세요.");f.keyword.focus();return false;}
         movePage(field,keyword,"",pareaidx,areaidx,1)
        return false;
    }

    function movePage(field,keyword,gbnidx,pareaidx,areaidx,page){
        init_map();
        var url= "/locinfo/ajax/getInfoList.asp?keyword="+escape(keyword) + "&field="+field + "&gbnidx="+gbnidx + "&pareaidx="+pareaidx + "&areaidx="+areaidx + "&page="+page;
        var call = new SoapProc.Request(url,RcvGetInfo);
        call.sendRequest();
        return false;
    }
    function RcvGetInfo(request){
        if(request.readyState == 4 ){
            if(request.status == 200){
                var val = request.responseText;
                var tmp=val.split("##|##");
                var cnt=tmp[0];
                var vcnt=tmp[1];
                var list=tmp[2];
                $("#icon_Layer").addClass("hidden");
                $("#help_btn").addClass("hidden");
                $("#pop_help").addClass("hidden");
                SetHtml("searchval",keyword);       
                $("#cate_layer").removeClass("hidden");
                SetHtml("totcount",vcnt);       
                $("#tot_layor").removeClass("hidden");
                SetHtml("list_layer",list);     
                $("#list_layer").removeClass("hidden");
                srcidx=1;
                setMaker(null);
                openSearch();
                setMaker();

            }else if(request.status == 500){
                var val = request.responseText;
                Debug(val,true);
            }
        }
    }
    function setMaker(){

        try{
            var num=parseInt(GetValue("locinfoListnum"));

            var splArr="";
            for (var i=1;i<=num;i++ ){
                makeMark(GeI("locinfo"+i).innerHTML.split("*"),i);
            }


        }catch(e){

        }
    }
    function getInfoSel()
    {
        var pr=document.getElementById("pareaidx").value;
        var ar=document.getElementById("areaidx").value;
        if (pr!="")
        {
            if (cgbnname=="")
            {
                alert("분류를 선택하세요.");
            }else{
                moveGbnPage("name_co",cgbnname,cgbnidx,pr,ar,"1");
                //  movePage("","","",pr,ar,"1");
            }
        }
    }

     