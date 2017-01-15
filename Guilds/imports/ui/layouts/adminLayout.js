import './adminLayout.html';

Template.adminLayout.onCreated(function(){

  this.autorun(()=>{
    this.subscribe('Meteor.users.isAdminField');
  });

console.log(Meteor.user());

FlowRouter.go('/unAuthorisedAccess');
//  if(!Meteor.user().isAdmin){
  //  FlowRouter.go('/unAuthorisedAccess');
  //}
});
