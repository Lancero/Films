import {category} from '/imports/import.js'

Template.navbar.events({
	'click .database': function(){
		category.set(null);
	}
});