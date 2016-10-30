var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);

var alewifePosition = new google.maps.LatLng(42.395428, -71.142483);
var davisPosition = new google.maps.LatLng(42.39674, -71.121815);
var porterPosition = new google.maps.LatLng(42.3884, -71.11914899999999);
var harvardPosition = new google.maps.LatLng(42.373362, -71.118956);
var centralPosition = new google.maps.LatLng(42.365486, -71.103802);
var kendallPosition = new google.maps.LatLng(42.36249079, -71.08617653);
var charlesMGHPosition = new google.maps.LatLng(42.361166, -71.070628);
var parkPosition = new google.maps.LatLng(42.35639457, -71.0624242);
var downtownCrossingPosition = new google.maps.LatLng(42.355518, -71.060225);
var southPosition = new google.maps.LatLng(42.352271, -71.05524200000001);
var broadwayPosition = new google.maps.LatLng(42.342622, -71.056967);
var andrewPosition = new google.maps.LatLng(42.330154, -71.057655);
var jfkPosition = new google.maps.LatLng(42.320685, -71.052391);
var northQuincyPosition = new google.maps.LatLng(42.275275, -71.0203369);
var wollastonPosition = new google.maps.LatLng(42.2665139, -71.0203369);
var quincyCPosition = new google.maps.LatLng(42.251809, -71.005409);

var quincyAPosition = new google.maps.LatLng(42.233391, -71.007153);
var braintreePosition = new google.maps.LatLng(42.2078543, -71.0011385);
var savinHillPosition = new google.maps.LatLng(42.31129, -71.053331);
var fieldsCornerPosition = new google.maps.LatLng(42.300093, -71.061667);
var shawmutPosition = new google.maps.LatLng(42.29312583, -71.06573796000001);
var ashmontPosition = new google.maps.LatLng(42.284652, -71.06448899999999);

/* redLineCoordinates
   Dictionary containing: GoogleMaps lat/long : Numeric [long, lat]
   Used exclusively with the Haversine Formula to determine nearby stations */
var redLineCoordinates = 
{
	"Alewife":				[-71.142483, 42.395428],
	"Davis": 				[-71.121815, 42.39674],
	"Porter": 				[-71.11914899999999, 42.3884],
	"Harvard": 				[-71.118956, 42.373362],
	"Central": 				[-71.118956, 42.373362],
	"Kendall/MIT": 			[-71.08617653, 42.36249079],
	"Charles/MGH": 			[-71.070628, 42.361166],
	"Park Street": 			[-71.0624242, 42.35639457],
	"Downtown Crossing": 	[-71.060225, 42.355518],
	"South Station": 		[-71.05524200000001, 42.352271],
	"Broadway": 			[-71.056967, 42.342622],
	"Andrew": 				[-71.057655, 42.330154],
	"JFK/UMass": 			[-71.052391, 42.320685],
	"North Quincy":			[-71.0203369, 42.275275],
	"Wollaston": 			[-71.0203369, 42.2665139],
	"Quincy Central":		[-71.005409, 42.251809],
	"Quincy Adams": 		[-71.007153, 42.233391],
	"Braintree": 			[-71.0011385, 42.2078543],
	"Savin Hill": 			[-71.053331, 42.31129],
	"Fields Corner": 		[-71.061667, 42.300093],
	"Shawmut": 				[-71.06573796000001, 42.29312583],
	"Ashmont": 				[-71.06448899999999, 42.284652]
}

var distanceToMyStation = 0;
var closestStation = "Closest Station";

// Make an Http Request to 
var timetable;
getTimetable();



var myOptions = {
	zoom: 12, // The larger the zoom number, the bigger the zoom
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Variables needed to work with Google Maps:
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


/* haversineDistance
Arguments:
	Two lists ([longitude, latitude])
	Boolean value
Returns:
	The distance between the two coordinates
	If isMiles is true, returns the value in miles
NOTE:
	This function takes coordinates in the order [longitude, latitude]
	This order is flipped elsewhere in the program
	This fuction was takenf from answers on StackOverflow  */
function haversineDistance(coords1, coords2, isMiles) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  var lon1 = coords1[0];
  var lat1 = coords1[1];

  var lon2 = coords2[0];
  var lat2 = coords2[1];

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  if(isMiles) d /= 1.60934;

  return d;
}


/* showNearbyStation
No arguments
No return value

Calculates the closest red line station to the user
Draws a red polyline from the user to that station
TODO: Save the name of the station and the distance in miles */
function showNearbyStation() {
	/* Initialize with distance to Alewife */
	var shortestDistance = haversineDistance([myLng, myLat], [-71.142483, 42.395428], true);
	var latitude = -71.142483;
	var longitude = 42.395428;

	// Iterate over the remaining coordinates in redLineCoordinates
	for (station in redLineCoordinates) {
		var coords = redLineCoordinates[station];
		var distance = haversineDistance([myLng, myLat], coords, true);

		/* If the current station is closer than the information we have from before,
		   save the current station information before continuing through the loop */
		if (distance < shortestDistance) {
			shortestDistance = distance;
			closestStation = station;
			distanceToMyStation = distance;
			latitude = coords[1];
			longitude = coords[0];
		}
	}

	// Create a polyline from user's location to the closest station
    var closestStationPosition = new google.maps.LatLng(latitude, longitude);
	var meToNearbyStation = [
		me,
		closestStationPosition
    ];
    var nearByStationPath = new google.maps.Polyline({
    	path: meToNearbyStation,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    nearByStationPath.setMap(map);
}


/* showRedLine
No arguments
No return value

Creates a path along the red line stations, accounting for the split at JFK
Creats a polyling connecting each station */
function showRedLine() {
	// body...
	// The path that the red line follows to Ashmont:
	var alewifeToAshmont = [
		alewifePosition,
		davisPosition,
		porterPosition,
		harvardPosition,
		centralPosition,
        kendallPosition,
        charlesMGHPosition,
        parkPosition,
        downtownCrossingPosition,
        southPosition,
        broadwayPosition,
        andrewPosition,
        jfkPosition,
    	savinHillPosition,
		fieldsCornerPosition,
		shawmutPosition,
		ashmontPosition
    ];
    var ashmontPath = new google.maps.Polyline({
    	path: alewifeToAshmont,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    ashmontPath.setMap(map);

    // The red line splits at JFK: this is the Braintree line:
	var alewifeToBraintree = [
		jfkPosition,
		northQuincyPosition,
        wollastonPosition,
        quincyCPosition,
        quincyAPosition,
        braintreePosition
    ];
    var braintreePath = new google.maps.Polyline({
    	path: alewifeToBraintree,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    braintreePath.setMap(map);
}


/* getTimetable
No arguments
No return value

Create a new XMLHttpRequest and GET Red Line data */
function getTimetable()
{
	// Step 1: create an instance of XMLHttpRequest
	request = new XMLHttpRequest();
	
	// Step 2: Make request to remote resource
	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
	
	// Step 3: Create handler function to do something with data in response
	request.onreadystatechange = openTimetableResponse;
	
	// Step 4: Send the request
	request.send();
}


/* openTimetableResponse
No arguments
No return value

Deals with response data from the Http request and parses any return JSON
into a usable timetable of the MBTA Red Line */
function openTimetableResponse()
{	
	// Data has been received
	if (request.readyState == 4 && request.status == 200) {

		// Parse the text into JSON
		var theData = request.responseText;
		var parsedData = JSON.parse(theData);

		// Parse the JSON into the trips we are interested in
		timetable = parsedData["TripList"]["Trips"];
	}

	// Page not found
	if (request.status == 404) {
		alert("Whoops! There was an error retrieving data on the MBTA Red Line. Please refresh the page to try again");
	}
}



/* getStationInfo
Argument:
	string (the given station's name)
Returns:
	The info about incoming trains to the given station
	To be used in the station marker's window

Parse the timetable (from the MBTA's JSON) for predictions about
the incoming traffic and the given station */
function getStationInfo(stationName) {
	timetableMessage = "";
	var numTrips = timetable.length;

	// Iterate through all the trips in timetable
	for (var t = 0; t < numTrips; t++) {
		var trip = timetable[t];
		var destination = trip["Destination"];
		var time = 0;
		var numPredictions = trip["Predictions"].length;

		// Iterate through all the predictions for this train
		for (var p = 0; p< numPredictions; p++) {
			var prediction = trip["Predictions"][p];

			// Look only for information about given stop
			if (prediction["Stop"] == stationName) {
				time = prediction["Seconds"];
				break;
			}
		}

		// Update the station's message
		if (time > 0) {
			if (timetableMessage != "") {
				timetableMessage += "<br />";
			}
			time = time / 60;
			timetableMessage += destination + " " + time.toFixed(2) + "minutes";
		}
	}

	return timetableMessage;
}






function renderMap() {

	// Custom MBTA train pin
  	var MBTAMarker = {
    	url: 'MBTA.png',
    	scaledSize: new google.maps.Size(25, 25)
	};

	alewife = new google.maps.Marker({
		position: alewifePosition,
		title: "Alewife",
		icon: MBTAMarker
	});
	alewife.setMap(map);

	google.maps.event.addListener(alewife, 'click', function() {
		stationInfo = getStationInfo(alewife.title);
		infowindow.setContent(alewife.title + "<br />" + stationInfo);
		infowindow.open(map, alewife);
	});


	// Create a marker for Davis
	davis = new google.maps.Marker({
		position: davisPosition,
		title: "Davis",
        icon: MBTAMarker
	});
	davis.setMap(map);

	google.maps.event.addListener(davis, 'click', function() {
		stationInfo = getStationInfo(davis.title);
		infowindow.setContent(davis.title + "<br />" + stationInfo);
		infowindow.open(map, davis);
	});


	// Create a marker for Porter Square
	porterSquare = new google.maps.Marker({
		position: porterPosition,
		title: "Porter Square",
		icon: MBTAMarker
	});
	porterSquare.setMap(map);

	google.maps.event.addListener(porterSquare, 'click', function() {
		stationInfo = getStationInfo(porterSquare.title);
		infowindow.setContent(porterSquare.title + "<br />" + stationInfo);
		infowindow.open(map, porterSquare);
	});


	// Create a marker for Harvard Square
	harvardSquare = new google.maps.Marker({
		position: harvardPosition,
		title: "Harvard Square",
		icon: MBTAMarker
	});
	harvardSquare.setMap(map);

	google.maps.event.addListener(harvardSquare, 'click', function() {
		stationInfo = getStationInfo(harvardSquare.title);
		infowindow.setContent(harvardSquare.title + "<br />" + stationInfo);
		infowindow.open(map, harvardSquare);
	});


	// Create a marker for Central Square
	centralSquare = new google.maps.Marker({
		position: centralPosition,
		title: "Central Square",
		icon: MBTAMarker
	});
	centralSquare.setMap(map);

	google.maps.event.addListener(centralSquare, 'click', function() {
		stationInfo = getStationInfo(centralSquare.title);
		infowindow.setContent(centralSquare.title + "<br />" + stationInfo);
		infowindow.open(map, centralSquare);
	});


	// Create a marker for Kendall/MIT
	kendallMarker = new google.maps.Marker({
		position: kendallPosition,
		title: "Kendall/MIT",
		icon: MBTAMarker
	});
	kendallMarker.setMap(map);

	google.maps.event.addListener(kendallMarker, 'click', function() {
		stationInfo = getStationInfo(kendallMarker.title);
		infowindow.setContent(kendallMarker.title + "<br />" + stationInfo);
		infowindow.open(map, kendallMarker);
	});


	// Create a marker for Charles/MGH
	charlesMGH = new google.maps.Marker({
		position: charlesMGHPosition,
		title: "Charles/MGH",
		icon: MBTAMarker
	});
	charlesMGH.setMap(map);

	google.maps.event.addListener(charlesMGH, 'click', function() {
		stationInfo = getStationInfo(charlesMGH.title);
		infowindow.setContent(charlesMGH.title + "<br />" + stationInfo);
		infowindow.open(map, charlesMGH);
	});


	// Create a marker for Park Street
	parkStreet = new google.maps.Marker({
		position: parkPosition,
		title: "Park Street",
		icon: MBTAMarker
	});
	parkStreet.setMap(map);

	google.maps.event.addListener(parkStreet, 'click', function() {
		stationInfo = getStationInfo(parkStreet.title);
		infowindow.setContent(parkStreet.title + "<br />" + stationInfo);
		infowindow.open(map, parkStreet);
	});


	// Create a marker for Downtown Crossing
	downtownCrossing = new google.maps.Marker({
		position: downtownCrossingPosition,
		title: "Downtown Crossing",
		icon: MBTAMarker
	});
	downtownCrossing.setMap(map);

	google.maps.event.addListener(downtownCrossing, 'click', function() {
		stationInfo = getStationInfo(downtownCrossing.title);
		infowindow.setContent(downtownCrossing.title + "<br />" + stationInfo);
		infowindow.open(map, downtownCrossing);
	});


	// Create a marker for South Station
	southStation = new google.maps.Marker({
		position: southPosition,
		title: "South Station",
		icon: MBTAMarker
   	});
	southStation.setMap(map);

	google.maps.event.addListener(southStation, 'click', function() {
		stationInfo = getStationInfo(southStation.title);
		infowindow.setContent(southStation.title + "<br />" + stationInfo);
		infowindow.open(map, southStation);
	});


	// Create a marker for Broadway
	broadway = new google.maps.Marker({
		position: broadwayPosition,
		title: "Broadway",
		icon: MBTAMarker
	});
	broadway.setMap(map);

	google.maps.event.addListener(broadway, 'click', function() {
		stationInfo = getStationInfo(broadway.title);
		infowindow.setContent(broadway.title + "<br />" + stationInfo);
		infowindow.open(map, broadway);
	});


	// Create a marker for Andrew
	andrewMarker = new google.maps.Marker({
		position: andrewPosition,
		title: "Andrew",
		icon: MBTAMarker
	});
	andrewMarker.setMap(map);

	google.maps.event.addListener(andrewMarker, 'click', function() {
		stationInfo = getStationInfo(andrewMarker.title);
		infowindow.setContent(andrewMarker.title + "<br />" + stationInfo);
		infowindow.open(map, andrewMarker);
	});


	// Create a marker for JFK/UMass
	jfkMarker = new google.maps.Marker({
		position: jfkPosition,
		title: "JFK/UMass",
		icon: MBTAMarker
	});
	jfkMarker.setMap(map);

	google.maps.event.addListener(jfkMarker, 'click', function() {
		stationInfo = getStationInfo(jfkMarker.title);
		infowindow.setContent(jfkMarker.title + "<br />" + stationInfo);
		infowindow.open(map, jfkMarker);
	});


	// Create a marker for North Quincy
	northQuincy = new google.maps.Marker({
		position: northQuincyPosition,
		title: "North Quincy",
		icon: MBTAMarker
	});
	northQuincy.setMap(map);

	google.maps.event.addListener(northQuincy, 'click', function() {
		stationInfo = getStationInfo(northQuincy.title);
		infowindow.setContent(northQuincy.title + "<br />" + stationInfo);
		infowindow.open(map, northQuincy);
	});


	// Create a marker for Wollaston
	wollaston = new google.maps.Marker({
		position: wollastonPosition,
		title: "Wollaston",
		icon: MBTAMarker
	});
	wollaston.setMap(map);

	google.maps.event.addListener(wollaston, 'click', function() {
		stationInfo = getStationInfo(wollaston.title);
		infowindow.setContent(wollaston.title + "<br />" + stationInfo);
		infowindow.open(map, wollaston);
	});


	// Create a marker for Quincy Center
	quincyCenter = new google.maps.Marker({
		position: quincyCPosition,
		title: "Quincy Center",
		icon: MBTAMarker
	});
	quincyCenter.setMap(map);

	google.maps.event.addListener(quincyCenter, 'click', function() {
		stationInfo = getStationInfo(quincyCenter.title);
		infowindow.setContent(quincyCenter.title + "<br />" + stationInfo);
		infowindow.open(map, quincyCenter);
	});


	// Create a marker for Quincy Adams
	quincyAdams = new google.maps.Marker({
		position: quincyAPosition,
		title: "Quincy Adams",
		icon: MBTAMarker
	});
	quincyAdams.setMap(map);

	google.maps.event.addListener(quincyAdams, 'click', function() {
		stationInfo = getStationInfo(quincyAdams.title);
		infowindow.setContent(quincyAdams.title + "<br />" + stationInfo);
		infowindow.open(map, quincyAdams);
	});


	// Create a marker for Braintree
	braintree = new google.maps.Marker({
		position: braintreePosition,
		title: "Braintree",
		icon: MBTAMarker
	});
	braintree.setMap(map);

	google.maps.event.addListener(braintree, 'click', function() {
		stationInfo = getStationInfo(braintree.title);
		infowindow.setContent(braintree.title + "<br />" + stationInfo);
		infowindow.open(map, braintree);
	});


	// Create a marker for Savin Hill
	savinHill = new google.maps.Marker({
		position: savinHillPosition,
		title: "Savin Hill",
		icon: MBTAMarker
	});
	savinHill.setMap(map);

	google.maps.event.addListener(savinHill, 'click', function() {
		stationInfo = getStationInfo(savinHill.title);
		infowindow.setContent(savinHill.title + "<br />" + stationInfo);
		infowindow.open(map, savinHill);
	});


	// Create a marker for Fields Corner
	fieldsCorner = new google.maps.Marker({
		position: fieldsCornerPosition,
		title: "Fields Corner",
		icon: MBTAMarker
	});
	fieldsCorner.setMap(map);

	google.maps.event.addListener(fieldsCorner, 'click', function() {
		stationInfo = getStationInfo(fieldsCorner.title);
		infowindow.setContent(fieldsCorner.title + "<br />" + stationInfo);
		infowindow.open(map, fieldsCorner);
	});


	// Create a marker for Shawmut
	shawmut = new google.maps.Marker({
		position: shawmutPosition,
		title: "Shawmut",
		icon: MBTAMarker
	});
	shawmut.setMap(map);

	google.maps.event.addListener(shawmut, 'click', function() {
		stationInfo = getStationInfo(shawmut.title);
		infowindow.setContent(shawmut.title + "<br />" + stationInfo);
		infowindow.open(map, shawmut);
	});


	// Create a marker for Ashmont
	ashmont = new google.maps.Marker({
		position: ashmontPosition,
		title: "Ashmont",
		icon: MBTAMarker
	});
	ashmont.setMap(map);

	google.maps.event.addListener(ashmont, 'click', function() {
		stationInfo = getStationInfo(ashmont.title);
		infowindow.setContent(ashmont.title + "<br />" + stationInfo);
		infowindow.open(map, ashmont);
	});




	// Custom color for user's location pin
  	var meMarker = {
    	url: 'snake.png',
    	scaledSize: new google.maps.Size(25, 25)
	};

	// Create a marker for the user and center there
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);

	// Create a marker
	marker = new google.maps.Marker({
		animation: google.maps.Animation.DROP,
		position: me,
		title: "Your location",
        icon: meMarker
	});
	marker.setMap(map);

	/* Open info window on click of marker
	   Display the name of and distance to the closest Red Line station */
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(distanceToMyStation.toFixed(2) + " miles to "
			+ closestStation + "<br />" + "from your location");
		infowindow.open(map, marker);
	});


 	// Show the path of the MBTA Red Line
 	showRedLine();
    // Show the station closes to the user on the map
    showNearbyStation();
}