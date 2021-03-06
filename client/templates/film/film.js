Template.film.onCreated(function(){
	this.editMode = new ReactiveVar(false);
	this.postEdit = new ReactiveVar(false);

	Meteor.subscribe('images');
	
});
Template.film.helpers({
	updateFilmId: function(){
		return this._id;
	},
	imagePath: function(imageId){
		var image = imageId && Images.findOne(imageId);

		return image ? image.link() : "/img/no_photo.svg";
	},
	discType: function(discType){
		if (discType==='Blu-ray') {
			return 'label-primary';
		} else if (discType==='DVD'){
			return 'label-warning';
		} else if (discType==='Inny'){
			return 'label-default';
		}
	}
});

Template.film.events({
	'click .more': function(){
		Session.set('editMode', false);
	}
});