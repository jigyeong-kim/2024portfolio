<!DOCTYPE html>
<html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.springframework.web.context.*, org.springframework.web.context.support.*"%>
<%@page import="net.cjcity.pum.*"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="org.apache.commons.lang.math.NumberUtils"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<head>
<title>청주시 등산로 안내서비스</title>
<meta name="viewport" content="initial-scale=1.0,user-scalable=no">
<style type="text/css">
html { height: 100% }
body { height: 100%; margin: 0; padding: 0 }
#map { width: 100%; height: 100% }
</style>
<script type="text/javascript" src="http://apis.daum.net/maps/maps3.js?apikey=493c629a4b2673ee2c230402314c64b4e2cd98fb"></script>
<%
ServletContext ctx = pageContext.getServletContext();
WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(ctx);
PumDao dao = (PumDao) wac.getBean("pumDao");
	String pumid = request.getParameter("pum_id");
	String div = request.getParameter("div");
	String pum_id = "";
%>
<script type="text/javascript">
window.onload = function() {
<%
	if (StringUtils.isNotEmpty(pumid)) {
//		if (StringUtils.equals(div, "ALL")) {
			pum_id = dao.getAllPumId(pumid);
//		}
		HashMap data = dao.getRouteBounds(pum_id);
		
%>
	var position = new daum.maps.LatLng(<%= data.get("cenlat") %>, <%= data.get("cenlng") %>); 
	var map = new daum.maps.Map(document.getElementById('map'), { 
		center: position, 
		level: 5, 
		mapTypeId: daum.maps.MapTypeId.HYBRID 
	});


	var bounds = new daum.maps.LatLngBounds();
	bounds.extend(new daum.maps.LatLng(<%= data.get("maxlat") %>, <%= data.get("minlng") %>));
	bounds.extend(new daum.maps.LatLng(<%= data.get("maxlat") %>, <%= data.get("maxlng") %>));
	bounds.extend(new daum.maps.LatLng(<%= data.get("minlat") %>, <%= data.get("minlng") %>));
	bounds.extend(new daum.maps.LatLng(<%= data.get("minlat") %>, <%= data.get("maxlng") %>));
	map.setBounds(bounds);

<%    
		Iterator routeItr = dao.getRouteList(pum_id).iterator();
		List dataList = dao.getRoute(pum_id);
		String cid = "";
		String color = "#CCFF00";
		String opacity = "0.6";
		int icid = 0;
		List vcids = new ArrayList();
		
		while(routeItr.hasNext()) {
			cid = (String) routeItr.next();
			
			if (!StringUtils.equals(div, "ALL")) {
  			icid = NumberUtils.toInt(cid) / 100;
  			if (StringUtils.equals(String.valueOf(icid), pumid)) {
  			  color = "#FF33FF";
  			  opacity = "1";
  			} else {
    			color = "#CCFF00";
    			opacity = "0.6";
  			}
  		}
%>
	var line<%= cid %>;
	line<%= cid %> = new daum.maps.Polyline({
	  strokeColor : '<%= color %>',
		strokeWeight : 3,
		strokeOpacity : <%= opacity %>
	});
	line<%= cid %>.setPath([
<%
      int cnt = 0;
			for(int i=0; i<dataList.size(); i++) {
				data = (HashMap) dataList.get(i);
				if (StringUtils.equals(cid, (String) data.get("course_id"))) {
					if (cnt > 0) {
						out.print(",");
					}
					out.print("new daum.maps.LatLng("+ data.get("lat") + "," + data.get("lng") + ")");
					cnt++;
				}
			}
%>
	]);
<%
 			if (StringUtils.equals(String.valueOf(icid), pumid)) {
 				vcids.add(cid);
 			} else {
%>
	line<%= cid %>.setMap(map);
<%
      }
		}
		//선택된 노선은 마지막에 표시
		for(int i=0; i<vcids.size(); i++) {
%>
	line<%= vcids.get(i) %>.setMap(map);
<%
    }
    	
    String icoi = "";
    for(int i=1;i<9;i++) {
      icoi = "0" + i;
      out.print("var icon"+icoi+" = new daum.maps.MarkerImage(");
      out.print(" '/static/pum/icon/"+icoi+".png',");
      out.print(" new daum.maps.Size(30, 41));");
    }
    
    Iterator pointItr = dao.getPoints().iterator();
    int poid = 1;
    while(pointItr.hasNext()) {
      data = (HashMap) pointItr.next();
      out.print("var point_"+poid+" = new daum.maps.Marker({");
			out.print(" position: new daum.maps.LatLng("+data.get("lat")+", "+data.get("lng")+"),");
			out.print(" title: '"+data.get("name")+"',");
			out.print(" image:icon"+data.get("ico")+"});");
			out.print(" point_"+poid+".setMap(map);");

      poid++;
    }
    	
	} else {
%>
	var position = new daum.maps.LatLng(36.641981384254414, 127.48951794878036); 
	var map = new daum.maps.Map(document.getElementById('map'), { 
		center: position, 
		level: 4, 
		mapTypeId: daum.maps.MapTypeId.HYBRID 
	});
<%
  }
%>
  var zoomControl = new daum.maps.ZoomControl();
  map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
  var mapTypeControl = new daum.maps.MapTypeControl();
  map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
};
</script>

</head>
<body>
<div id="map"></div>
</body>
</html>
