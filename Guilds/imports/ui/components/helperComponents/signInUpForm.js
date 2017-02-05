import './signInUpForm.html';
import {signUp} from '/imports/api/accounts/methods.js';

Template.signInUpForm.onCreated(function(){
  this.signIn = new ReactiveVar(false);
console.log("creating");
console.log("rendering");
console.log(this.data);
this.formID = new ReactiveVar(this.data);
});

Template.signInUpForm.onRendered(function(){

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
  }
});

Template.signInUpForm.events({
  'click .changeCredentials': function(event){
    event.preventDefault();

    const current = Template.instance().signIn.get();
    Template.instance().signIn.set(!current);
  },
  'click .submitSignInForm':function(event){
    event.preventDefault();
  const formID='#'+Template.instance().formID.get()+'SignInForm';
    const username = $(formID+ ' input[type=text]').val();
    const password = $(formID+' input[type=password]').val();

    Meteor.loginWithPassword(username,password,(Error)=>{
      if(Error){
        console.log(Error);
      }else{
        console.log("success");
        $(formID+' input[type=text]').val('');
        $(formID+' input[type=password]').val('');
        FlowRouter.reload();
        $('#signInModal').modal('hide');
      }
    });


  },

  'click .submitSignUpForm':function(event){
    event.preventDefault();

    const formID='#'+Template.instance().formID.get()+'SignUpForm';
    const userObj={}
    userObj.username = $(formID +' input[name=username]').val();
    userObj.password = $(formID +' input[name=password]').val();
    const confirmPassword =$(formID +' input[name=confirmPassword]').val();

    console.log(userObj);
    console.log(userObj.password);
    console.log(confirmPassword);
    if(userObj.password !== confirmPassword){
      console.log("no match");
    }else{
      signUp.call(userObj,(error)=>{
        if(error){
          console.log(error);
        }else{
          console.log("success");
          Meteor.loginWithPassword(userObj.username,userObj.password,(error)=>{
            if(error){
              console.log(error);
            }else{
              console.log("success login");
              $(formID +' input[name=username]').val('');
              $(formID +' input[name=password]').val('');
              $(formID +' input[name=confirmPassword]').val('');
              FlowRouter.reload();

                $('#signInModal').modal('hide');

            }
          });



        }
      });
    }
  }
});
