Films = new Mongo.Collection('films');

Films.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	}
})

FilmSchema = new SimpleSchema({
	localTitle:{
		type: String,
		label: 'Tytuł Polski'
	},
	orgTitle:{
		type: String,
		label: 'Tytuł Oryginalny',
		optional: true
	},
	year:{
		type: Number,
		label: 'Rok',
		min: 1900,
		max: 2100,
		optional: true
	},
	genre:{
		type: String,
		label: 'Gatunek',
		allowedValues: ['akcja', 'animowany', 'anime','biograficzny','dokumentalny','dramat','fantasy','komedia','romans','sci-fi','inny'],
		optional: true
	},
    disc_type: {
        type: String,
        label: 'Nośnik',
        allowedValues: ['Blu-ray', 'DVD', 'Inny'],
        optional: true
    },
	desc:{
		type: String,
		label: 'Opis',
		max: 500,
		optional: true
	},    
	imageId: {
		type: String,
		optional: true,
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			if ( this.isInsert ) {
				return new Date()
			}
		},
		denyUpdate: true,
		autoform: {
			type: "hidden"
		}
	},
	modifiedAt: {
		type: Date,
		optional: true,
		autoValue: function() {
			if ( this.isUpdate ) {
				return new Date()
			}
		},
		autoform: {
			type: "hidden"
		}
	}	
});

Films.attachSchema( FilmSchema );

Images = new FilesCollection({
  collectionName: 'Images',
  storagePath: '/public/downloads',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

Posts = new Mongo.Collection('posts');

PostsSchema = new SimpleSchema({
	comment: {
		type: String,
		label: 'Komentarz:',
		max: 500,
		min: 3
	},
	filmId: {
		type: String,
		autoform: {
			type: "hidden"
		},
	},
	userId: {
		type: String,
		autoValue: function() {
			var user = this.userId;
			return user;
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			if ( this.isInsert ) {
				return new Date()
			}
		},
		denyUpdate: true,
		autoform: {
			type: "hidden"
		}
	},
	modifiedAt: {
		type: Date,
		optional: true,
		autoValue: function() {
			if ( this.isUpdate ) {
				return new Date()
			}
		},
		autoform: {
			type: "hidden"
		}
	}
});

Posts.attachSchema( PostsSchema );