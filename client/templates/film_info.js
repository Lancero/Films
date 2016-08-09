Template.film_info.helpers({
	film: ()=>{
		var id = FlowRouter.getParam('id');
		return Films.findOne({_id: id});
	},
	editMode: function(){
		return Session.get('editMode');
	}
})

Template.film_info.events({
	'click .glyphicon-trash': function(event){
		console.log(event);
		var test = this._id;
		Meteor.call('deleteFilm', this._id);
		console.log(test);
		console.log('glyphicon-trash');
		return false
	},
	'click .glyphicon-cog' : function(){
		Session.set('editMode', !Session.get('editMode'));
		console.log(Session.keys.editMode);
		console.log(updateFilmId);
		
	}
});