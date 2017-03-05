import './bannerLayout.html';
import {COMMUNITIES} from '/imports/api/helpers/communityHelpers.js';
import {isAdmin} from "/imports/api/helpers/adminFunctions.js";
import '/imports/ui/components/accountComponents/signInModal.js';

Template.bannerLayout.onCreated(function(){
  this.signIn = new ReactiveVar(false);

  this.autorun(function(){
    const community = FlowRouter.getParam("community");

    $(".communitySelector").removeClass("Passion");
    $(".communitySelector").removeClass("Adventure");
    $(".communitySelector").removeClass("Wisdom");
    $(".communitySelector").addClass(community);

  })

});


Template.bannerLayout.onRendered(function(){

  const community = FlowRouter.getParam("community");
  $(".communitySelector").addClass(community);


});





Template.bannerLayout.helpers({
  communityTitle(){
    const community = FlowRouter.getParam("community");
    return COMMUNITIES[community];
  },
  isAdmin(){
    return  isAdmin();

  },
  homePath(){
    const path =FlowRouter.path("/");
    return path;
  },
  signIn(){
    return Template.instance().signIn.get();
  }
});


Template.bannerLayout.events({
  'click #PassionLink':function(event){
    event.preventDefault();
    FlowRouter.go("/:community/forum",{community:"Passion"});
    location.reload(true);
  },
  'click #AdventureLink':function(event){
    event.preventDefault();
    FlowRouter.go("/:community/forum",{community:"Adventure"});
    location.reload(true);
  },
  'click #WisdomLink':function(event){
    event.preventDefault();
    FlowRouter.go("/:community/forum",{community:"Wisdom"});
    location.reload(true);
  },
  'click #logOut':function(event){
    event.preventDefault();
    Meteor.logout((error)=>{
      if(error){
        console.log(error);
      }
    });
  },
  'click #homeAboutLink':function(event){
    event.preventDefault();
    Session.set('section-2',true);
    FlowRouter.go('home');
  },
  'click #homeJoinLink':function(event){
    event.preventDefault();
    Session.set('section-1',true);
    FlowRouter.go('home');
  },


});
