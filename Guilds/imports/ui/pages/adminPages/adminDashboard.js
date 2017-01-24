import './adminDashboard.html';
import '/imports/ui/pages/helperPages/unAuthorisedAccess.js';
import '/imports/ui/components/adminComponents/adminList.js';
import '/imports/ui/components/adminComponents/userList.js';


Template.adminDashboard.helpers({
  isAdmin(){
    return Meteor.user().isAdmin;
  },
  authInProcess(){
    return Meteor.loggingIn();
  }
});

Template.adminDashboard.events({
  'click #adminInsertThreadButton':function(event){
    FlowRouter.go('/admin/adminThreadInsert');
  }
})
