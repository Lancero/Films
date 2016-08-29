Template.posts.helpers ({
	postEdit: function(){
		return Session.get('postEdit');
	},
	posts: ()=>{
		var id = FlowRouter.getParam('id');
		return Posts.find({filmId: id}, {sort: {createdAt: 1}});
	}
});
	