import './noBannerLayout.html';
import '/imports/ui/components/accountComponents/signInUpForm.js';
import {COMMUNITIES} from '/imports/api/helpers/communityHelpers.js';
import {isAdmin} from "/imports/api/helpers/adminFunctions.js";
import '/imports/ui/components/accountComponents/signInModal.js';


Template.noBannerLayout.onCreated(function(){
  this.signIn = new ReactiveVar(false);
});


Template.noBannerLayout.helpers({
  homePath(){
    const path =FlowRouter.path("/");
    return path;
  },
  signIn(){
    return Template.instance().signIn.get();
  },

  isAdmin(){
    return  isAdmin();

  },
});



Template.noBannerLayout.events({
  'click #PassionLink':function(event){
    event.preventDefault();
    console.log("here");
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
