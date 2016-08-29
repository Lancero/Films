Template.singlePost.helpers({
	userName: function(){
		return Meteor.user().username;
	},
/*	uN: function(id){

		console.log(Users.findOne({_id: id}));
		
	}*/
});

Template.singlePost.events({
	'click .glyphicon-trash': function(){
		if(confirm('Czy chcesz usunąć komentarz?')){
			var postOwner = this.userId
			if(Accounts.userId()===postOwner){ //Nie wiem dlaczego Meteor.userId nie działa 
				Meteor.call('deletePost', this._id, function(err, res){
					if (!err) {
						FlashMessages.sendSuccess('Usunięto komentarz');
					} else {
						console.log(err);
						FlashMessages.sendError('Wystąpił błąd');
					}
				});			
			} else {
				FlashMessages.sendError('Brak uprawnień do usunięcia komentarza');
			}
		}
	},
	'click .glyphicon-pencil': function(){
		Session.set('postEdit', !Session.get('postEdit'));
		console.log(this._id);
	}
});

