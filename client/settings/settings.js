Template.settings.onCreated(function() {
	var id = Accounts.userId();
	this.subscribe('thisUserPosts', id);
	this.subscribe('thisUserRatings', id);
});

Template.settings.helpers({
	posts: function(){
		return Posts.find({},{sort:{createdAt: 1}});
	},
	ratings: function() {
		return Ratings.find();
	},
	whichFilm: function(id) {
		return Films.findOne({_id: id}).localTitle;
	}
});