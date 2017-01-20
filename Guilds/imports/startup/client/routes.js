/* Defines all the routes, corresponding pages are imported in the route defintion */
import {isThreadAuthorOrAdmin} from '/imports/api/helpers/adminFunctions.js';
import {COMMUNITIES} from '/imports/api/helpers/communityHelpers.js'

FlowRouter.route('/', {
  action: function() {
    import '/imports/ui/pages/homePage.js';
    BlazeLayout.render("mainLayout", {mainPage: "homePage"});

  }
});

FlowRouter.route('/admin',{
  action:function(){
    import '/imports/ui/pages/adminPages/adminDashboard.js';
      BlazeLayout.render("mainLayout",{mainPage:"adminDashboard"});
  }
});

FlowRouter.route('/:community/forum', {
  action: function() {
    import '/imports/ui/pages/forumPages/forum.js';
    import '/imports/ui/pages/helperPages/pageNotFound.js';
    console.log("here");
    const community =FlowRouter.getParam('community');
    if(COMMUNITIES.indexOf(community)===-1){
      BlazeLayout.render("mainLayout", {mainPage: "pageNotFound"});
    }else{
      BlazeLayout.render("mainLayout", {mainPage: "forum"});
    }
  }
});


FlowRouter.route('/:community/forum/newthread', {
  action: function() {
    import '/imports/ui/pages/forumPages/newThread.js';

    BlazeLayout.render("mainLayout", {mainPage: "newThread"});
  }
});

FlowRouter.route('/:community/forum/:threadID', {
  action: function() {
    import '/imports/ui/pages/forumPages/thread.js';

    BlazeLayout.render("mainLayout", {mainPage: "thread"});
  }
});

FlowRouter.route('/:community/forum/:threadID/editOP', {
  action: function() {
    import '/imports/ui/pages/forumPages/originalPostEdit.js';
    console.log("hereeeeeeeeeFRE");
    /*TODO: Implement restricions based on user status */
  //  if(isThreadAuthorOrAdmin(FlowRouter.getParam('threadID'))){
          BlazeLayout.render("mainLayout", {mainPage: "originalPostEdit"});
  //  }else{
      //  BlazeLayout.render("mainLayout", {mainPage: "unAuthorisedAccess"});
  //  }

  }
});

FlowRouter.route('/unAuthorisedAccess',{
  action:function(){
    import '/imports/ui/pages/helperPages/unAuthorisedAccess.js';
    BlazeLayout.render("mainLayout", {mainPage: "unAuthorisedAccess"});
  }
})
