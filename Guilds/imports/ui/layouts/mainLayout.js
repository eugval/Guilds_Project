import './mainLayout.html';
import '/imports/ui/components/helperComponents/signInUpForm.js';


Template.mainLayout.onCreated(function(){
  this.signIn = new ReactiveVar(false);
});


Template.mainLayout.onRendered(function(){

  this.$anchor =$("#headerAnchor");
  this.$header = $("#mainLayoutheader");

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



});


Template.mainLayout.onDestroyed(function(){
 $(window).off("scroll", this.scrollHandler);
});


Template.mainLayout.helpers({
  isAdmin(){
    return Meteor.user().isAdmin;

  },
  homePath(){
    const path =FlowRouter.path("/");
    return path;
  },
  signIn(){
    return Template.instance().signIn.get();
  },
});


Template.mainLayout.events({
  'scroll':function(event){
    console.log("in scroll event");
    console.log(event);
  },
  'click #logOut':function(event){
    event.preventDefault();
    Meteor.logout((error)=>{
      if(error){
        console.log(error);
      }
    });
  },

});
