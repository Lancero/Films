var hooksObject3 = {
	before: {
		insert: function(doc){
			var filmId = FlowRouter.getParam('id');
		    doc.filmId = filmId;
			return doc;
		}
	},
	after: {
		insert: function(error, result){
			if(error){
				FlashMessages.sendError('Wystąpił błąd');
				console.log(error);
			} else {
				FlashMessages.sendSuccess('Ocena dodana');
			}
		}
	}
};

AutoForm.addHooks('addRating', hooksObject3);

Template.rating.onCreated(function () {
	var id = FlowRouter.getParam('id');
	this.subscribe('thisFilmRatings', id);
});