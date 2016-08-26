Meteor.publish('films', function(){
	return Films.find({});
});

/*Films.allow({
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