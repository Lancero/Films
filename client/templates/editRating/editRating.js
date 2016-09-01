Template.editRating.onCreated(function() {
	var id = Accounts.userId();
	this.subscribe('thisUserRatings', id);
});

Template.editRating.events({
	'click .edit': function() {
		console.log(this);
		var id = FlowRouter.getParam('id');
		console.log(Ratings.findOne({_id: id}));
	}
});

Template.filmInfo.helpers({
	rating: ()=>{
		var id = FlowRouter.getParam('id');
		console.log(this);
		console.log(Ratings.findOne({_id: id}));

		return Ratings.findOne({_id: id});
	}
});