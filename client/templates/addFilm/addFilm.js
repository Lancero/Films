var hooksObject = {
	before: {
		insert: function(doc){
			if(imgId){
        doc.imageId = imgId;
      } else {
        doc.imageId = "noPhotoId";
      }
			return doc;
		}
	},
	after: {
		insert: function(error, result){
      if(error){
        FlashMessages.sendError('Error');
        console.log(error);
      } else {
        imgId = false;
        FlowRouter.go('database');
        FlashMessages.sendSuccess('Pomyślnie dodano nowy film');
      }
		}
	}
};

var imgId = null;

AutoForm.addHooks('addFilm',hooksObject);

Template.addFilm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.addFilm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.addFilm.events({
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
          alert('Error during upload: ' + error);
        } else {
          FlashMessages.sendSuccess('File "' + fileObj.name + '" successfully uploaded');         
          imgId=fileObj._id;
        }
        console.log(imgId);
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});