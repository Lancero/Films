import {category} from '/imports/import.js'

Template.sidebar.events({
	'click .show-BD': function(){
		category.set('Blu-ray');
	},
	'click .show-DVD': function(){
		category.set('DVD');
	},
	'click .show-OTH': function(){
		category.set('Inny');
	},
	'click .show-ALL': function(){
		category.set(null);
	}
});

Template.sidebar.helpers({
	numberBD: function(){
		return Films.find({disc_type: 'Blu-ray'}).count();
	},
	numberDVD: function(){
		return Films.find({disc_type: 'DVD'}).count();
	},
	numberOTH: function(){
		return Films.find({disc_type: 'Inny'}).count();
	},
	numberALL: function(){
		return Films.find().count();
	}
});
	