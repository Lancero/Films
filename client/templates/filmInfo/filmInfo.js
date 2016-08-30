var hooksObject = {
	before: {
		update: function(doc){
			var filmId = FlowRouter.getParam('id');
			if(newImgId===false){
				return doc;
			} else {
				doc['$set'].imageId = newImgId;
				doc['$set'].modifiedAt = new Date();
											
				return doc;
			}
		}
	},
	after: {
		update: function(error, result){
			if(error){
				FlashMessages.sendError('Wystąpił błąd');
				console.log(error);
			} else {
				newImgId = false;
				FlowRouter.go('database');
				FlashMessages.sendSuccess('Film został zmieniony');
			}
		}
	}
};
var newImgId = false;

AutoForm.addHooks('updateFilm', hooksObject);

Template.filmInfo.onCreated(function () {
  this.updateImage = new ReactiveVar(false);

  var id = FlowRouter.getParam('id');
  this.subscribe('thisFilmPosts', id);

  AutoForm.debug() //Na końcu należy usunąć
});

Template.filmInfo.helpers({
	film: ()=>{
		var id = FlowRouter.getParam('id');
		return Films.findOne({_id: id});
	},
	editMode: function(){
		return Session.get('editMode');
	},
	imagePath: function(imageId){
		var image = imageId && Images.findOne(imageId);
		return image ? image.link() : "/img/no_photo.svg";
	},
  	updateImage: function () {
    	return Template.instance().updateImage.get();
	},
	yearsAgo: function(year){
		if(year){
			var currentYear = new Date().getFullYear();
			var filmsYear = year;
			var yearsAgo = currentYear-filmsYear;
			if(yearsAgo>1) {
				return 'Film miał premierę '+yearsAgo+' lat temu';
			}
		}	
	}
});

Template.filmInfo.events({
	'click .deleteFilm': function(event){				

		if(confirm('Czy chcesz usunąć film?')){
			var test = this._id;
			var image = this.imageId;

			Meteor.call('deleteFilm', this._id);
			Meteor.call('deleteImage', image);

			FlashMessages.sendSuccess('Film został usunięty');
			FlowRouter.go('/database');

			return false
		}
	},
	'click .editMode' : function(){
		Session.set('editMode', !Session.get('editMode'));
		
	},
	'click .return' : function(){
		FlowRouter.go('/database');
	}
	,
	'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.updateImage.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          FlashMessages.sendError('Error during upload: ' + error);
        } else {
          FlashMessages.sendSuccess('File "' + fileObj.name + '" successfully uploaded');         
          newImgId=fileObj._id;
        }
        template.updateImage.set(false);
      });
      upload.start();
    }
  }
});

var hooksObject2 = {
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
				FlashMessages.sendSuccess('Dodano komentarz');
			}
		}
	}
};

AutoForm.addHooks('insertPostForm', hooksObject2);