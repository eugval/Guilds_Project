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
/*
  $(".mini-banner").removeClass("Passion");
   $("#footer.with-image").removeClass("Passion");

   $(".mini-banner").removeClass("Adventure");
    $("#footer.with-image").removeClass("Adventure");

    $(".mini-banner").removeClass("Wisdom");
     $("#footer.with-image").removeClass("Wisdom");

$(".mini-banner").addClass(community);
 $("#footer.with-image").addClass(community);
 */
})

});


Template.bannerLayout.onRendered(function(){

    const community = FlowRouter.getParam("community");
      $(".communitySelector").addClass(community);
/*
 const community = FlowRouter.getParam("community");

  $(".mini-banner").addClass(community);

$("#footer.with-image").addClass(community);
*/

/*




  this.$anchor =$("#headerAnchor");
  this.$header = $("#bannerLayoutheader");

  this.navBarScrollHandler=function(){
    let st=$(window).scrollTop();
    let ot=this.$anchor.offset().top;
    if(st>ot){
      this.$header.removeClass(relative).addClass(fixed-on-top);
    }else if(st<=ot){
      this.$header.removeClass(fixed-on-top).addClass(relative);
    }
  }.bind(this);
    $window.on("scroll",this.navBarScrollHandler);
*/


});


Template.bannerLayout.onDestroyed(function(){
  /*
 $(window).off("scroll", this.scrollHandler);
 */
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
  location.reload(true); /*Not necessary*/
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

/*  location.reload(true);*/
