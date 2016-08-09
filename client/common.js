Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Meteor.subscribe('films');
Meteor.subscribe('images');