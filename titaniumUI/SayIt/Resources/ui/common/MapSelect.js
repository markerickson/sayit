function MapSelect() {
	var win = Ti.UI.createWindow({
		exitOnClose : true,
		layout : 'vertical'
	});
	
	 var mapview = Titanium.Map.createView({
	 mapType : Titanium.Map.STANDARD_TYPE,
	 region : {
	 latitude : 33.74511,
	 longitude : -84.38993,
	 latitudeDelta : 0.01,
	 longitudeDelta : 0.01
	 },
	 animate : true,
	 regionFit : true,
	 userLocation : false,
	 annotations : ['mountainView']
	 });
	 /*
	var MapModule = require('ti.map');
	var mapview = MapModule.createView({
		mapType : MapModule.NORMAL_TYPE,
		region : {
			latitude : 33.74511,
			longitude : -84.38993,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		},
		animate : true,
		regionFit : true,
		userLocation : false,
		annotations : ['mountainView']
	});

	win.add(mapview);
	// Handle click events on any annotations on this map.
	mapview.addEventListener('click', function(evt) {

		Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

		// Check for all of the possible names that clicksouce
		// can report for the left button/view.
		if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView') {
			Ti.API.info("Annotation " + evt.title + ", left button clicked.");
		}
	});*/

win.add(mapview);

	var doneButton = Ti.UI.createButton({
		bottom : 10,
		width : 300,
		height : 40,
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		borderRadius : 10,
		backgroundImage : 'none',
		backgroundGradient : {
			type : 'linear',
			colors : ['#f000ff', '#333']
		},
		title : 'Done'
	});

	doneButton.addEventListener("click", function(e) {
		win.close();
	});

	win.add(doneButton);

	win.open();

	return mapview;
}

module.exports = MapSelect;
