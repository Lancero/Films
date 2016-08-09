Template.film.onCreated(function(){
	this.editMode = new ReactiveVar(false);
});
Template.film.helpers({
	updateFilmId: function(){
		return this._id;
	},
	imagePath: function(imageId){
		var image = imageId && Images.findOne(imageId);
		return image ? image.link() : "/img/lionking.jpg";
	}
});