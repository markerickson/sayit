//Master View Component Constructor
function MasterView() {
	var DateView = require('ui/common/DateSelect'),
		MapView = require('ui/common/MapSelect'),
		FlickrView = require('ui/common/FlickerView'),
		ContactView = require('ui/common/ContactView');
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createTableView({
		backgroundColor : 'white'
	});

	var sections = [];
	
	var tabGroup = Titanium.UI.createTabGroup();
	//tabGroup.setLayout('horizontal');

	// Section where the story will appear
	var storyView = Ti.UI.createTableViewRow({
		layout : 'horizontal',
		backgroundColor : '#ffffff',
		borderRadius : 10,
		top : 10,
		height : '40%',
		width : '90%'
	});

	// Section where the user can select different categories
	var selectionView = Ti.UI.createTableViewRow({
		layout : 'horizontal',
		backgroundColor : '#ffffff',
		borderRadius : 10,
		top : 10,
		height : 2000,
		width : '90%'
	});

	/////////////////////////////////////////////////////////////////////////////
	// Inside logic of the selectionView
	var dateView = new DateView(),
		//mapView = new MapView(),
		flickrView = new FlickrView(),
		contactView = new ContactView();
		
	var dateContainerWindow = Ti.UI.createWindow({
		//title:'Choose when'
	});
	dateContainerWindow.add(dateView);
	/*
	var mapContainerWindow = Ti.UI.createWindow({
		//title:'Choose where'
	});
	mapContainerWindow.add(mapView);
	*/
	var flickrContainerWindow = Ti.UI.createWindow({
		//title:'Choose when'
	});
	flickrContainerWindow.add(flickrView);
	
	var contactContainerWindow = Ti.UI.createWindow({
		//title:'Choose where'
	});
	contactContainerWindow.add(contactView);
	
	var whenTab = Titanium.UI.createTab({
		title : 'when',
		width: '25%',
		icon : 'appicon.png',
		window : dateContainerWindow
	});
	tabGroup.addTab(whenTab);
	/*
	var whereTab = Titanium.UI.createTab({
		title : 'where',
		width: '25%',
		icon : 'appicon.png',
		window : mapContainerWindow
	});
	tabGroup.addTab(whereTab);
	*/
	var whatTab = Titanium.UI.createTab({
		title : 'what',
		width: '25%',
		icon : 'appicon.png',
		window : flickrContainerWindow
	});
	tabGroup.addTab(whatTab);
	
	var whoTab = Titanium.UI.createTab({
		title : 'who',
		width: '25%',
		icon : 'appicon.png',
		window : contactContainerWindow
	});
	tabGroup.addTab(whoTab);

	selectionView.add(tabGroup);

	sections.push(storyView);
	sections.push(selectionView);

	self.setData(sections);

	return self;
};

module.exports = MasterView;
