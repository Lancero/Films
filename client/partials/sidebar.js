Template.sidebar.onCreated(function () {
  this.category = new ReactiveVar('Default');
});

Template.sidebar.events({
	'click .show-BD': function(e, tmpl){
		tmpl.category.set('.show-BD');	
	},
	'click .show-DVD': function(e, tmpl){
		tmpl.category.set('.show-DVD');
	},
	'click .show-OTH': function(e, tmpl){
		tmpl.category.set('.show-OTH');
	}
});

Template.sidebar.helpers({
	currentCategory: function(){
		return Template.instance().category.get();
	}
});