var hooksObject = {
	before: {
		insert: function(doc){
      console.log(imgId);

			doc.imageId = imgId;
			return doc;
		}
	},
	after: {
		insert: function(){
			
			FlowRouter.go('database');
			FlashMessages.sendSuccess('Pomyślnie dodano nowy film');

		}
	}
};
var imgId = null;

AutoForm.addHooks('addFilm',hooksObject);

Template.add_film.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.add_film.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.add_film.events({
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
          imgId=fileObj._id; //tego nie ma w oryginale
        }
        console.log(imgId); // tutaj jest prawidłowe id ale nie jest przypisane do Films
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});