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

Template.rating.helpers({
	avgRating: function(){
		var filmId = FlowRouter.getParam('id');
		var ratingNumber = Ratings.find({filmId: filmId}).count();
		if(ratingNumber>0){
			
			var sum = 0;
			for (var i = 0; i < ratingNumber; i++) {
				var array = Ratings.find({filmId: filmId}).map(doc=>doc.rating);
				sum += array[i]
			}
			var avg = sum / ratingNumber;
			return 'Średnia ocena dla tego filmu to ' + avg;

		} else {
			return 'Film nie posiada jeszcze żadnych ocen';
		}
	}
});