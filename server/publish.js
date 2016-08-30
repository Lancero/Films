Meteor.publish('films', function(){
	return Films.find({});
});

/*Films.allow({ //nie działają allow/deny
    insert: function() {
    	if(this.userId==='Y9bhiETHAy8vxkWfP'){
    		console.log('admin');
    		return true;
    	} else {
    		console.log('not admin');
    		return true;
    	}
    	
      
    },
    update: function() {
      return false;
    },
    remove: function() {
      return true;
    }
});*/

Meteor.publish('images', function () {
    return Images.collection.find({});
  });

/*Images.deny({
    insert: function() {
      return false;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return false;
    }
  });*/

/*Images.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return false;
    },
    remove: function() {
      return true;
    }
});*/

/*Meteor.publish('posts', function () {
    return Posts.find({});
});*/

Meteor.publish('thisFilmPosts', function (id) {
    return Posts.find({filmId: id});
});

Posts.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
});

Meteor.publish('thisFilmRatings', function(id){
  return Ratings.find({filmId: id});
});

Ratings.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return false;
    },
    remove: function() {
      return false;
    }
});