var hooksObject5 = {
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

AutoForm.addHooks('editPost', hooksObject5);

Template.editPost.onCreated(function() {
	var id = Accounts.userId();
	this.subscribe('thisUserPosts', id);
});

Template.editPost.helpers({
	post: function(){
		var id = FlowRouter.getParam('id');
		console.log(id);
		return Posts.findOne({_id: id});
	},
	whichFilm: function(id) {
		return Films.findOne({_id: id}).localTitle;
	}
});

Template.editPost.events({
	'click .return' : function(){
		FlowRouter.go('/settings');
	}
});