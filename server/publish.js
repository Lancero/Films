Meteor.publish('films', function(){
	return Films.find({});
});

Meteor.publish('images', function(){
	return Images.find({});
})