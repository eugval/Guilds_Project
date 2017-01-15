import './mainLayout.html';

Template.mainLayout.onCreated(function(){

  this.autorun(()=>{
    this.subscribe('Meteor.users.isAdminField');
  });
});

Template.mainLayout.helpers({
  isAdmin(){
    return Meteor.user().isAdmin;
  }
});
