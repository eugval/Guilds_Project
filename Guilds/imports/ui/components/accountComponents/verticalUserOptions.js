import './verticalUserOptions.html';


Template.verticalUserOptions.helpers({

  userID(){
    if (!Meteor.user()){
      return false;
    }
    return Meteor.userId();
  },
  currentUserName(){
    return Meteor.user().username;
  },

});


Template.verticalUserOptions.events({
  'click .logOut':function(event){
    event.preventDefault();
    Meteor.logout((error)=>{
      if(error){
        console.log(error);
      }
    });
  },
});
