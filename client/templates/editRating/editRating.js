Template.editRating.onCreated(function() {
	var id = Accounts.userId();
	
	this.subscribe('thisUserRatings', id);
	this.subscribe('thisUserPosts', id);
});

Template.editRating.events({
	'click .return' : function(){
		//console.log(MainFilmId);
		FlowRouter.go('/settings');
	}
});

Template.editRating.helpers({
	rating: function(){
		var id = FlowRouter.getParam('id');
		return Ratings.findOne({_id: id});
	},
	whichFilm: function(id) {
		return Films.findOne({_id: id}).localTitle;
	},
	posts: function(){
		return Posts.find();
	}
});