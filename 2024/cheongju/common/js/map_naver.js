function naverMap(mapWidth,mapHeight,x_point,y_point){
	var oMap;
	
	var oPoint = new nhn.api.map.TM128(x_point, y_point);
	
	oMap = new nhn.api.map.Map(document.getElementById('mapContainer'), { 
		point : oPoint,
		zoom : 10,
		enableWheelZoom : true,
		enableDragPan : true,
		enableDblClickZoom : true,
		mapMode : 0,
		activateTrafficMap : false,
		activateBicycleMap : false,
		activateRealtyMap : true,
		minMaxLevel : [ 1, 14 ],
		size : new nhn.api.map.Size(mapWidth, mapHeight)});
	

	var oSlider = new nhn.api.map.ZoomControl();
	oMap.addControl(oSlider);
	oSlider.setPosition({ right:10, top:20 });
	
	var oSize = new nhn.api.map.Size(28, 37);
	var oOffset = new nhn.api.map.Size(14, 37);

	var oIcon = new nhn.api.map.Icon('/common/images/sub/ic_spot.png', oSize, oOffset);
	
	var oMarker = new nhn.api.map.Marker(oIcon, { title : '' }); 

	
	oMarker.setPoint(oPoint);
	oMap.addOverlay(oMarker);

	

}
function naverMapAdd(containerId,mapWidth,mapHeight,x_point,y_point){
	var oMap;
	
	var oPoint = new nhn.api.map.TM128(x_point, y_point);
	
	oMap = new nhn.api.map.Map(document.getElementById(containerId), { 
		point : oPoint,
		zoom : 10,
		enableWheelZoom : true,
		enableDragPan : true,
		enableDblClickZoom : true,
		mapMode : 0,
		activateTrafficMap : false,
		activateBicycleMap : false,
		activateRealtyMap : true,
		minMaxLevel : [ 1, 14 ],
		size : new nhn.api.map.Size(mapWidth, mapHeight)});
	


	var oSlider = new nhn.api.map.ZoomControl();
	oMap.addControl(oSlider);
	oSlider.setPosition({ right:10, top:20 });

var oSize = new nhn.api.map.Size(28, 37);
	var oOffset = new nhn.api.map.Size(14, 37);
	
	var oIcon = new nhn.api.map.Icon('/common/images/sub/ic_spot.png', oSize, oOffset);
	
	var oMarker = new nhn.api.map.Marker(oIcon, { title : '' }); 
	
	
	oMarker.setPoint(oPoint);
	oMap.addOverlay(oMarker);



}