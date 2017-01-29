import './mainLayout.html';
import {signUp} from '/imports/api/accounts/methods.js';

Template.mainLayout.helpers({
  isAdmin(){
  return Meteor.user().isAdmin;

},
homePath(){
  const path =FlowRouter.path("/");
return path;
}
});


Template.mainLayout.events({
  'click #logOut':function(event){
    event.preventDefault();
    Meteor.logout((error)=>{
      if(error){
        console.log(error);
      }
    });
  },
'submit #signInForm':function(event){
  event.preventDefault();

  const username = $('#signInForm input[type=text]').val();
  const password = $('#signInForm input[type=password]').val();

  Meteor.loginWithPassword(username,password,(Error)=>{
    if(Error){
      console.log(Error);
    }else{
      console.log("success");
      $('#signInForm input[type=text]').val('');
      $('#signInForm input[type=password]').val('');
      FlowRouter.reload();
      $('#signInModal').modal('toggle');
    }
  });


},

'submit #signUpForm':function(event){
  event.preventDefault();
  const userObj={}
  userObj.username = $('#signUpForm input[type=text]').val();
  userObj.password = $('#signUpForm input[name=password]').val();
  const confirmPassword =$('#signUpForm input[name=confirmPassword]').val();

  console.log(userObj);
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
            $('#signUpForm input[type=text]').val('');
            $('#signUpForm input[name=password]').val('');
            $('#signUpForm input[name=confirmPassword]').val('');
            FlowRouter.reload();
           $('#signInModal').modal('toggle');
          }
        });



      }
    });
  }
}

});
