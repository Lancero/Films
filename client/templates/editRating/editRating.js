var hooksObject4 = {
	before: {
		update: function(doc){							
			return doc;
		}
	},
	after: {
		update: function(error, result){
			if(error){
				FlashMessages.sendError('Wystąpił błąd');
				console.log(error);
			} else {
				FlowRouter.go('database');
				FlashMessages.sendSuccess('Ocena została zmieniona');
			}
		}
	}
};


AutoForm.addHooks('editRating', hooksObject4);

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