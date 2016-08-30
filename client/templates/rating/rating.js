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

		var i = 0;
		while (i < ratingNumber) {

			var test = Ratings.findOne({filmId: filmId})['rating'];


    	console.log(test);
    	i++;
		}
		var ppp = 'empty'

		console.log(ppp);
		return ppp;
	}
});