import './adminDashboard.html';
import '/impors/ui/pages/helperPages/unAuthorisedAccess.js';


Template.adminDashboard.helpers({
  isAdmin(){
    return Meteor.user().isAdmin;
  }
});
