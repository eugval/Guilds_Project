import './signInUpForm.html';
import {signUp} from '/imports/api/accounts/methods.js';
import '/imports/ui/components/helperComponents/errorMessageBox.js';


Template.signInUpForm.onCreated(function(){
  this.signIn = new ReactiveVar(false);
  this.formID = new ReactiveVar(this.data);
  this.formErrorMessage = new ReactiveVar('');
});



Template.signInUpForm.helpers({
  signIn(){
    return Template.instance().signIn.get();
  },
  signInFormID(){
    return Template.instance().formID.get()+'SignInForm';
  },
  signUpFormID(){
    return Template.instance().formID.get()+'SignUpForm';
  },
  signInUpErrorBoxID(){
    return Template.instance().formID.get()+'signInUpErrorBox';
  },
  errorMessage(){
    console.log("hrere")
    console.log(Template.instance().formErrorMessage.get());
    return {errorMessage:Template.instance().formErrorMessage.get()};
  }
});


Template.signInUpForm.events({
  'click .changeCredentials': function(event){
    event.preventDefault();
    const errorBoxID = '#'+Template.instance().formID.get()+'signInUpErrorBox';
    $(errorBoxID).addClass('hidden');
    const current = Template.instance().signIn.get();
    Template.instance().signIn.set(!current);
  },


  'click .submitSignInForm':function(event){
    event.preventDefault();
    const self = Template.instance();
    const errorBoxID = '#'+self.formID.get()+'signInUpErrorBox';
    $(errorBoxID).addClass('hidden');

    const formID='#'+self.formID.get()+'SignInForm';
    const username = $(formID+ ' input[type=text]').val();
    const password = $(formID+' input[type=password]').val();

    Meteor.loginWithPassword(username,password,(error)=>{
      if(error){
        console.log(error);
        if(error.error===400){
          self.formErrorMessage.set("Wrong Username or Password");
        }else{
          self.formErrorMessage.set(error.reason);
        }
        $(errorBoxID).removeClass('hidden');
      }else{
        console.log("success");
        $(formID).trigger('reset');
        FlowRouter.reload();
        $('#signInModal').modal('hide');
      }
    });


  },

  'click .submitSignUpForm':function(event){
    event.preventDefault();
    const self = Template.instance();
    const errorBoxID = '#'+self.formID.get()+'signInUpErrorBox';
    $(errorBoxID).addClass('hidden');

    const formID='#'+self.formID.get()+'SignUpForm';
    const userObj={}
    userObj.username = $(formID +' input[name=username]').val();
    userObj.password = $(formID +' input[name=password]').val();
    const confirmPassword =$(formID +' input[name=confirmPassword]').val();

    if(userObj.password !== confirmPassword){
      self.formErrorMessage.set("Passwords don't match.");
      $(errorBoxID).removeClass('hidden');
    }else{
      signUp.call(userObj,(error)=>{
        if(error){
          console.log(error);
          self.formErrorMessage.set(error.reason);
          $(errorBoxID).removeClass('hidden');
        }else{
          console.log("success");
          Meteor.loginWithPassword(userObj.username,userObj.password,(error)=>{
            if(error){
              console.log(error);
            }else{
              $(formID).trigger('reset');
              FlowRouter.reload();

              $('#signInModal').modal('hide');

            }
          });



        }
      });
    }
  }
});
