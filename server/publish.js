Meteor.publish('films', function(){
	return Films.find({});
});

Meteor.publish('images', function () {
    return Images.collection.find({});
});

Meteor.publish('thisFilmPosts', function (id) {
    return Posts.find({filmId: id});
});

Meteor.publish('thisUserPosts', function (id) {
    return Posts.find({userId: id});
});

Meteor.publish('thisFilmRatings', function(id){
  return Ratings.find({filmId: id});
});

Meteor.publish('thisUserRatings', function (id) {
    return Ratings.find({userId: id});
});