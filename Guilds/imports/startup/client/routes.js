/* Defines all the routes, corresponding pages are imported in the route defintion */

FlowRouter.route('/', {
  action: function() {
    import '/imports/ui/pages/homePage.js';

    BlazeLayout.render("mainLayout", {mainPage: "homePage"});
  }
});


FlowRouter.route('/questBoard', {
  action: function() {
    import '/imports/ui/pages/questBoard.js';

    BlazeLayout.render("mainLayout", {mainPage: "questBoard"});
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
