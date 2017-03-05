import './homePageLayout.html';
import {insertContactMessage} from '/imports/api/contact/methods.js';
import '/imports/ui/components/helperComponents/errorMessageBox.js';
import {signUp} from '/imports/api/accounts/methods.js';
import {isAdmin} from "/imports/api/helpers/adminFunctions.js";
import {FEATURES} from '/imports/api/helpers/generalHelpers.js';
import '/imports/ui/components/homePageComponents/featuresModal.js';



Template.homePageLayout.onCreated(function(){
  $('body').addClass('is-loading');
  this.contactFormErrorMessage= new ReactiveVar('');
  this.signInFormErrorMessage = new ReactiveVar('');
  this.signUpFormErrorMessage = new ReactiveVar('');
  this.featureData = new ReactiveVar({});
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
  },
  contactFormErrorMessage(){
    return {errorMessage:Template.instance().contactFormErrorMessage.get()};
  },
  signInFormErrorMessage(){
    return {errorMessage:Template.instance().signInFormErrorMessage.get()};
  },
  signUpFormErrorMessage(){
    return {errorMessage:Template.instance().signUpFormErrorMessage.get()};
  },
  isAdmin(){
    return isAdmin();
  },
  modalText(){
    return Template.instance().featureData.get();
  },
  pathForPassion(){
    return FlowRouter.path('/:community/forum/',{community:"Passion"});
  },
  pathForAdventure(){
    return FlowRouter.path('/:community/forum/',{community:"Adventure"});
  },
  pathForWisdom(){
    return FlowRouter.path('/:community/forum/',{community:"Wisdom"});
  }
});



Template.homePageLayout.events({
  'submit #contactForm':function(event){
    event.preventDefault();
    $('.contactFormErrorBox').addClass('hidden');
    const self=Template.instance();
    const name = $('#contactFormName').val();
    const email = $('#contactFormEmail').val();
    const message= $('#contactFormMessage').val();

    insertContactMessage.call({name,email,message},(error)=>{
      if(error){
        console.log("error");
        console.log(error);
        self.contactFormErrorMessage.set(error.reason);
        console.log("here");
        $('.contactFormErrorBox').removeClass('hidden');
      }else{
        console.log("success");
        $(".sent-mark").removeClass("hidden");
        window.setTimeout(function(){
          $(".sent-mark").addClass("hidden");
        },2000);

        $("#contactForm").trigger('reset');
      }
    });

  },
  'submit #signInForm':function(event){
    event.preventDefault();
    const self = Template.instance();
    $(".signInFormErrorBox").addClass('hidden');

    const username = $( '#signInForm input[name=username]').val();
    const password = $('#signInForm input[name=password]').val();

    Meteor.loginWithPassword(username,password,(error)=>{
      if(error){
        console.log(error);
        if(error.error===400){
          self.signInFormErrorMessage.set("Wrong Username or Password");
        }else{
          self.signInFormErrorMessage.set(error.reason);
        }
        $(".signInFormErrorBox").removeClass('hidden');
      }else{
        console.log("success");
        $('#signInForm').trigger('reset');
        FlowRouter.go('/:community/forum',{community:"Passion"});
      }
    });


  },
  'submit #signUpForm':function(event){
    event.preventDefault();
    const self = Template.instance();
    $(".signUpFormErrorBox").addClass('hidden');

    const userObj={}
    userObj.username = $('#signUpForm input[name=username]').val();
    userObj.password = $('#signUpForm input[name=password]').val();
    const confirmPassword =$('#signUpForm input[name=confirmPassword]').val();

    if(userObj.password !== confirmPassword){
      self.signUpFormErrorMessage.set("Passwords don't match.");
      $(".signUpFormErrorBox").removeClass('hidden');
    }else{
      signUp.call(userObj,(error)=>{
        if(error){
          console.log(error);
          self.signUpFormErrorMessage.set(error.reason);
          $(".signUpFormErrorBox").removeClass('hidden');
        }else{
          console.log("success");
          Meteor.loginWithPassword(userObj.username,userObj.password,(error)=>{
            if(error){
              console.log(error);
            }else{
              $('#signUpForm').trigger('reset');
              FlowRouter.go('/:community/forum',{community:"Passion"});

            }
          });



        }
      });
    }
  },
  'click .featureDescription':function(event){
    event.preventDefault();
    const feature =$(event.target).data("feature");
    Template.instance().featureData.set(FEATURES[feature]);
    $('#featuresModal').modal('toggle');
  }

});
