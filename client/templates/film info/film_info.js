var hooksObject = {
	before: {
		insert: function(doc){
			doc.imageId = imgId;
			return doc;
		}
	},
	after: {
		insert: function(){
			
			FlowRouter.go('database');
			FlashMessages.sendSuccess('New film added');

		}
	}
};
var imgId = null;

AutoForm.addHooks('addFilm',hooksObject);

Template.film_info.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.film_info.helpers({
	film: ()=>{
		var id = FlowRouter.getParam('id');
		return Films.findOne({_id: id});
	},
	editMode: function(){
		return Session.get('editMode');
	},
	imagePath: function(imageId){
		var image = imageId && Images.findOne(imageId);
		return image ? image.link() : "/img/lionking.jpg";
	},
  	currentUpload: function () {
    	return Template.instance().currentUpload.get();
	}
});

Template.film_info.events({
	'click .glyphicon-trash': function(event){				

		if(confirm('Are You Sure?')){
			var test = this._id;
			var image = this.imageId;

			Meteor.call('deleteFilm', this._id);
			Meteor.call('deleteImage', image);

			FlashMessages.sendSuccess('Film removed from database');
			FlowRouter.go('/database');

			return false
		}
	},
	'click .glyphicon-cog' : function(){
		Session.set('editMode', !Session.get('editMode'));
		
	},
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
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          FlashMessages.sendError('Error during upload: ' + error);
        } else {
          FlashMessages.sendSuccess('File "' + fileObj.name + '" successfully uploaded');         
          imgId=fileObj._id;
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});

