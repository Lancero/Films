if (Meteor.isClient) {					// działa tylko z (gwendall:auth-client-callbacks)
	Accounts.onLogin(function(){
		FlowRouter.go('database');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}
FlowRouter.triggers.enter([function(context, redirect){
	if (!Meteor.userId()) {
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/', {
	name: 'home',
	action() {
		if(Meteor.userId()){
			FlowRouter.go('/database');
		}
		BlazeLayout.render('HomeLayout');
	}
});
FlowRouter.route('/database', {
	name: 'database',
	action() {
		BlazeLayout.render('MainLayout', {main: 'filmList'});
	}
});
FlowRouter.route('/film/:id', {
	name: 'film',
	action() {
		BlazeLayout.render('MainLayout', {main: 'filmInfo'});
	}
});
FlowRouter.route('/add-film', {
	name: 'Add Film',
	action() {
		BlazeLayout.render('MainLayout', {main: 'addFilm'});
	}
});
FlowRouter.route('/add-image', {
	name: 'Add Image',
	action() {
		BlazeLayout.render('MainLayout', {main: 'addImage'});
	}
});
FlowRouter.route('/settings', {
	name: 'Settings',
	action() {
		BlazeLayout.render('MainLayout', {main: 'settings'});
	}
});
FlowRouter.route('/rating/:id', {
	name: 'rating',
	action() {
		BlazeLayout.render('MainLayout', {main: 'editRating'});
	}
});
FlowRouter.route('/post/:id', {
	name: 'post',
	action() {
		BlazeLayout.render('MainLayout', {main: 'editPost'});
	}
});
