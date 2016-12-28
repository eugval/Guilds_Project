import './mainLayout.html';

Template.mainLayout.onCreated(function(){

  this.autorun(()=>{
    this.subscribe('Meteor.users.isAdminField');
  });
});
