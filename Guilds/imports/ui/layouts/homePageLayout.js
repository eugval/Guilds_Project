import './homePageLayout.html';

Template.homePageLayout.onCreated(function(){

    $('body').addClass('is-loading');
});

Template.homePageLayout.onRendered(function(){

  $.getScript("/homePageTemplateFiles/js/5_main.js");


if(!!Session.get('section-2')){

  window.location.href ="/#section-2";
}else if(!!Session.get('section-1')){
window.location.href ="/#section-1";

}
Session.set('section-2',false);
Session.set('section-1',false);
});

Template.homePageLayout.helpers({
  forumLink(){
        const params={community:"Passion"};
    return FlowRouter.path('/:community/forum',params);
  }
});
