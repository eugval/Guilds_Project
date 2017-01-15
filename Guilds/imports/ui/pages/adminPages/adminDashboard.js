import './adminDashboard.html';
import '../helperPages/unAuthorisedAccess.js';


Template.adminDashboard.helpers({
  isAdmin(){
    return Meteor.user().isAdmin;
  }
});
