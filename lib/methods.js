Meteor.methods ({
	deleteFilm: function(id){
		Films.remove(id);
	},
	deleteImage: function(id){
		Images.remove(id);
	}
});