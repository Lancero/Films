Meteor.methods ({
	deleteFilm: function(id){
		Films.remove(id);
	},
	deleteImage: function(id){
		Images.remove(id);
	},
	deletePost: function(id){
		Posts.remove(id);
	}
});