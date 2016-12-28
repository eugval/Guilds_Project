/* Defines all the routes, corresponding pages are imported in the route defintion */
import {isThreadAuthorOrAdmin} from '/imports/api/helpers/adminFunctions.js';

FlowRouter.route('/', {
  action: function() {
    import '/imports/ui/pages/homePage.js';

    BlazeLayout.render("mainLayout", {mainPage: "homePage"});
  }
});

FlowRouter.route('/forum', {
  action: function() {
    import '/imports/ui/pages/forum.js';

    BlazeLayout.render("mainLayout", {mainPage: "forum"});
  }
});


FlowRouter.route('/forum/newthread', {
  action: function() {
    import '/imports/ui/pages/newThread.js';

    BlazeLayout.render("mainLayout", {mainPage: "newThread"});
  }
});

FlowRouter.route('/forum/:threadID', {
  action: function() {
    import '/imports/ui/pages/thread.js';

    BlazeLayout.render("mainLayout", {mainPage: "thread"});
  }
});

FlowRouter.route('/forum/:threadID/editOP', {
  action: function() {
    import '/imports/ui/pages/originalPostEdit.js';
    /*TODO: Implement restricions based on user status */
  //  if(isThreadAuthorOrAdmin(FlowRouter.getParam('threadID'))){
          BlazeLayout.render("mainLayout", {mainPage: "originalPostEdit"});
  //  }else{
      //  BlazeLayout.render("mainLayout", {mainPage: "unAuthorisedAccess"});
  //  }

  }
});
