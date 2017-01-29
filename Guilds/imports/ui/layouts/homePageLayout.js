import './homePageLayout.html';

Template.homePageLayout.onCreated(function(){
  console.log("Created");
    $('body').addClass('is-loading');
});

Template.homePageLayout.onRendered(function(){

  $.getScript("/homePageTemplateFiles/js/5_main.js");

console.log("Rendered");

});

Template.homePageLayout.helpers({
  forumLink(){
        const params={community:"LifePlan"};
    return FlowRouter.path('/:community/forum',params);
  }
});
