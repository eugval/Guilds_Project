/* Defines all the routes, corresponding pages are imported in the route defintion */
import {isAuthorOrAdmin} from '/imports/api/helpers/adminFunctions.js';
import {COMMUNITIES} from '/imports/api/helpers/communityHelpers.js'

FlowRouter.notFound = {
  action: function() {
    import '/imports/ui/pages/helperPages/pageNotFound.js';
    BlazeLayout.render("noBannerLayout", {mainPage: "pageNotFound"});
  }
};

FlowRouter.route('/', {
  name:'home',
  action: function() {
    import '/imports/ui/layouts/homePageLayout.js';
    BlazeLayout.render("homePageLayout");
  }
});



FlowRouter.route('/admin',{
  action:function(){
    import '/imports/ui/pages/adminPages/adminDashboard.js';
    BlazeLayout.render("noBannerLayout",{mainPage:"adminDashboard"});
  }
});

FlowRouter.route('/admin/adminThreadInsert',{
  action:function(){
    import '/imports/ui/pages/adminPages/adminThreadInsert.js';
    BlazeLayout.render("noBannerLayout",{mainPage:"adminThreadInsert"});
  }
});
FlowRouter.route('/admin/:threadID/adminThreadUpdate',{
  action:function(){
    import '/imports/ui/pages/adminPages/adminThreadUpdate.js';
    BlazeLayout.render("noBannerLayout",{mainPage:"adminThreadUpdate"});
  }
});

FlowRouter.route('/:community/forum', {

  action: function() {
    import '/imports/ui/pages/forumPages/forum.js';
    import '/imports/ui/pages/helperPages/pageNotFound.js';


    const community =FlowRouter.getParam('community');
    if(!COMMUNITIES[community]){
      BlazeLayout.render("noBannerLayout", {mainPage: "pageNotFound"});
    }else{
      BlazeLayout.render("bannerLayout", {mainPage: "forum"});


    }
  }
});


FlowRouter.route('/:community/forum/newthread', {
  action: function() {
    import '/imports/ui/pages/forumPages/newThread.js';

    BlazeLayout.render("noBannerLayout", {mainPage: "newThread"});
  }
});

FlowRouter.route('/:community/forum/:threadID', {
  action: function() {
    import '/imports/ui/pages/forumPages/thread.js';

    BlazeLayout.render("noBannerLayout", {mainPage: "thread"});
  }
});


FlowRouter.route('/unAuthorisedAccess',{
  action:function(){
    import '/imports/ui/pages/helperPages/unAuthorisedAccess.js';
    BlazeLayout.render("bannerLayout", {mainPage: "unAuthorisedAccess"});
  }
})
