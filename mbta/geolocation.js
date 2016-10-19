var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
	zoom: 13, // The larger the zoom number, the bigger the zoom
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map;

var marker;

var infowindow = new google.maps.InfoWindow();
			

function init() {
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getMyLocation() {
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser");
	}
}

function renderMap() {
	// Create a marker for Andrew
	andrewMarker = new google.maps.Marker({
		position: new google.maps.LatLng(42.330154, -71.057655),
		title: "Andrew"
	});
	andrewMarker.setMap(map);

	google.maps.event.addListener(andrewMarker, 'click', function() {
		infowindow.setContent(andrewMarker.title);
		infowindow.open(map, andrewMarker);
	});


	// Create a marker for South Station
	southStation = new google.maps.Marker({
		position: new google.maps.LatLng(42.352271, -71.05524200000001),
		title: "South Station"
   	});
	southStation.setMap(map);

	google.maps.event.addListener(southStation, 'click', function() {
		infowindow.setContent(southStation.title);
		infowindow.open(map, southStation);
	});


	// Create a marker for Porter Square
	porterSquare = new google.maps.Marker({
		position: new google.maps.LatLng(42.3884, -71.11914899999999),
		title: "Porter Square"
	});
	porterSquare.setMap(map);

	google.maps.event.addListener(porterSquare, 'click', function() {
		infowindow.setContent(porterSquare.title);
		infowindow.open(map, porterSquare);
	});

	// Create a marker for Harvard Square
	harvardSquare = new google.maps.Marker({
		position: new google.maps.LatLng(42.373362, -71.118956),
		title: "Harvard Square"
	});
	harvardSquare.setMap(map);

	google.maps.event.addListener(harvardSquare, 'click', function() {
		infowindow.setContent(harvardSquare.title);
		infowindow.open(map, harvardSquare);
	});


	// Create a marker for JFK/UMass
	jfkMarker = new google.maps.Marker({
		position: new google.maps.LatLng(42.320685, -71.052391),
		title: "JFK/UMass"
	});
	jfkMarker.setMap(map);

	google.maps.event.addListener(jfkMarker, 'click', function() {
		infowindow.setContent(jfkMarker.title);
		infowindow.open(map, jfkMarker);
	});


	// Create a marker for Savin Hill
	savinHill = new google.maps.Marker({
		position: new google.maps.LatLng(42.31129, -71.053331),
		title: "Savin Hill"
	});
	savinHill.setMap(map);

	google.maps.event.addListener(savinHill, 'click', function() {
		infowindow.setContent(savinHill.title);
		infowindow.open(map, savinHill);
	});


	// Create a marker for Park Street
	parkStreet = new google.maps.Marker({
		position: new google.maps.LatLng(42.35639457, -71.0624242),
		title: "Park Street"
	});
	parkStreet.setMap(map);

	google.maps.event.addListener(parkStreet, 'click', function() {
		infowindow.setContent(parkStreet.title);
		infowindow.open(map, parkStreet);
	});


	// Create a marker for Broadway
	broadway = new google.maps.Marker({
		position: new google.maps.LatLng(42.342622, -71.056967),
		title: "Broadway"
	});
	broadway.setMap(map);

	google.maps.event.addListener(broadway, 'click', function() {
		infowindow.setContent(broadway.title);
		infowindow.open(map, broadway);
	});


	// Create a marker for North Quincy
	northQuincy = new google.maps.Marker({
		position: new google.maps.LatLng(42.275275, -71.029583),
		title: "North Quincy"
	});
	northQuincy.setMap(map);

	google.maps.event.addListener(northQuincy, 'click', function() {
		infowindow.setContent(northQuincy.title);
		infowindow.open(map, northQuincy);
	});


	// Create a marker for Shawmut
	shawmut = new google.maps.Marker({
		position: new google.maps.LatLng(42.29312583, -71.06573796000001),
		title: "Shawmut"
	});
	shawmut.setMap(map);

	google.maps.event.addListener(shawmut, 'click', function() {
		infowindow.setContent(shawmut.title);
		infowindow.open(map, shawmut);
	});


	// Create a marker for Davis
	davis = new google.maps.Marker({
		position: new google.maps.LatLng(42.39674, -71.121815),
		title: "Davis"
	});
	davis.setMap(map);

	google.maps.event.addListener(davis, 'click', function() {
		infowindow.setContent(davis.title);
		infowindow.open(map, davis);
	});


	// Create a marker for Alewife
	alewife = new google.maps.Marker({
		position: new google.maps.LatLng(42.395428, -71.142483),
		title: "Alewife"
	});
	alewife.setMap(map);

	google.maps.event.addListener(alewife, 'click', function() {
		infowindow.setContent(alewife.title);
		infowindow.open(map, alewife);
	});


	// Create a marker for Kendall/MIT
	kendallMarker = new google.maps.Marker({
		position: new google.maps.LatLng(42.36249079, -71.08617653),
		title: "Kendall/MIT"
	});
	kendallMarker.setMap(map);

	google.maps.event.addListener(kendallMarker, 'click', function() {
		infowindow.setContent(kendallMarker.title);
		infowindow.open(map, kendallMarker);
	});


	// Create a marker for Charles/MGH
	charlesMGH = new google.maps.Marker({
		position: new google.maps.LatLng(42.361166, -71.070628),
		title: "Charles/MGH"
	});
	charlesMGH.setMap(map);

	google.maps.event.addListener(charlesMGH, 'click', function() {
		infowindow.setContent(charlesMGH.title);
		infowindow.open(map, charlesMGH);
	});

	// Create a marker for Downtown Crossing
	downtownCrossing = new google.maps.Marker({
		position: new google.maps.LatLng(42.355518, -71.060225),
		title: "Downtown Crossing"
	});
	downtownCrossing.setMap(map);

	google.maps.event.addListener(downtownCrossing, 'click', function() {
		infowindow.setContent(downtownCrossing.title);
		infowindow.open(map, downtownCrossing);
	});

	// Create a marker for Quincy Center
	quincyCenter = new google.maps.Marker({
		position: new google.maps.LatLng(42.251809, -71.005409),
		title: "Quincy Center"
	});
	quincyCenter.setMap(map);

	google.maps.event.addListener(quincyCenter, 'click', function() {
		infowindow.setContent(quincyCenter.title);
		infowindow.open(map, quincyCenter);
	});

	// Create a marker for Quincy Adams
	quincyAdams = new google.maps.Marker({
		position: new google.maps.LatLng(42.233391, -71.007153),
		title: "Quincy Adams"
	});
	quincyAdams.setMap(map);

	google.maps.event.addListener(quincyAdams, 'click', function() {
		infowindow.setContent(quincyAdams.title);
		infowindow.open(map, quincyAdams);
	});


	// Create a marker for Ashmont
	ashmont = new google.maps.Marker({
		position: new google.maps.LatLng(42.284652, -71.06448899999999),
		title: "Ashmont"
	});
	ashmont.setMap(map);

	google.maps.event.addListener(ashmont, 'click', function() {
		infowindow.setContent(ashmont.title);
		infowindow.open(map, ashmont);
	});


	// Create a marker for Wollaston
	wollaston = new google.maps.Marker({
		position: new google.maps.LatLng(42.2665139, -71.0203369),
		title: "Wollaston"
	});
	wollaston.setMap(map);

	google.maps.event.addListener(wollaston, 'click', function() {
		infowindow.setContent(wollaston.title);
		infowindow.open(map, wollaston);
	});


	// Create a marker for Fields Corner
	fieldsCorner = new google.maps.Marker({
		position: new google.maps.LatLng(42.300093, -71.061667),
		title: "Fields Corner"
	});
	fieldsCorner.setMap(map);

	google.maps.event.addListener(fieldsCorner, 'click', function() {
		infowindow.setContent(fieldsCorner.title);
		infowindow.open(map, fieldsCorner);
	});


	// Create a marker for Central Square
	centralSquare = new google.maps.Marker({
		position: new google.maps.LatLng(42.365486, -71.103802),
		title: "Central Square"
	});
	centralSquare.setMap(map);

	google.maps.event.addListener(centralSquare, 'click', function() {
		infowindow.setContent(centralSquare.title);
		infowindow.open(map, centralSquare);
	});


	// Create a marker for Braintree
	braintree = new google.maps.Marker({
		position: new google.maps.LatLng(42.2078543, -71.0011385),
		title: "Braintree"
	});
	braintree.setMap(map);

	google.maps.event.addListener(braintree, 'click', function() {
		infowindow.setContent(braintree.title);
		infowindow.open(map, braintree);
	});




	// Create a marker for the user and center there
	me = new google.maps.LatLng(myLat, myLng);

	// Update map and go there...
	map.panTo(me);

	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Your location"
	});
	marker.setMap(map);

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
}
