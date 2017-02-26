import './adminDashboard.html';
import '/imports/ui/pages/helperPages/unAuthorisedAccess.js';
import '/imports/ui/components/adminComponents/adminList.js';
import '/imports/ui/components/adminComponents/userList.js';
import '/imports/ui/components/adminComponents/userMessageList.js';
import '/imports/ui/components/adminComponents/adminFeaturedList.js';
import {isAdmin} from "/imports/api/helpers/adminFunctions.js";



Template.adminDashboard.helpers({
  isAdmin(){
    return isAdmin();
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
