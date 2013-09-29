//Using code from https://github.com/khopkins218/DateSelectorEx/blob/master/Resources/lib/createDatePickerWin.js

function DateSelect() {
	var win = Ti.UI.createWindow({
		exitOnClose : true,
		layout : 'vertical'
	});

	var self = Ti.UI.createView();

	var minDate = new Date();
	minDate.setFullYear(0001);
	minDate.setMonth(0);
	minDate.setDate(1);

	var maxDate = new Date();
	maxDate.setFullYear(9999);
	maxDate.setMonth(11);
	maxDate.setDate(31);

	var valueDate = new Date();

	var picker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : minDate,
		maxDate : maxDate,
		value : valueDate,
		top : 60
	});

	picker.selectionIndicator = true;

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
		/* Sets the lblTimes object from the outer window scope to our selected startTime and endTime
		 combination */
		storyTime.text = valueDate.toLocaleDateString;
		win.close();
	});

	picker.addEventListener("change", function(e) {
		//Ti.API.info("User selected date: " + e.value.toLocaleString());

	});

	self.add(picker);
	self.add(doneButton);

	win.add(picker);
	win.add(doneButton);
	
	return self;
	//win.open();
};

module.exports = DateSelect;
