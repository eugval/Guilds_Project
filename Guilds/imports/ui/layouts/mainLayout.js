import './mainLayout.html';

Template.mainLayout.helpers({
  isAdmin(){
  return Meteor.user().isAdmin;

  }
});
