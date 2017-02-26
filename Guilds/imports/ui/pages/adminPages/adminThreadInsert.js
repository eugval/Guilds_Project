import './adminThreadInsert.html';
import {COMMUNITIES} from '/imports/api/helpers/communityHelpers.js';
import {adminInsertThread} from '/imports/api/forum/methods.js';
import {isAdmin} from '/imports/api/helpers/adminFunctions.js';
import '/imports/ui/components/helperComponents/errorMessageBox.js';
import '/imports/ui/pages/helperPages/unAuthorisedAccess.js';


Template.adminThreadInsert.onCreated(function(){
  this.insertObj = new ReactiveVar();
    this.formErrorMessage = new ReactiveVar('');
});



Template.adminThreadInsert.helpers({
  communities(){
    return Object.keys(COMMUNITIES);
  },
  errorMessage(){
    return {errorMessage:Template.instance().formErrorMessage.get()};
  },
  isAdmin(){
    return isAdmin();
  },
  authInProcess(){
    return Meteor.loggingIn();
  }
});


Template.adminThreadInsert.events({
  'submit #adminThreadInsertForm':function(event){
    event.preventDefault();
    const self=Template.instance();
        $('.insertThreadErrorBox').addClass('hidden');
    let insertObj ={};

    insertObj.title= $('#adminThreadInsertForm input[name=addThreadTitle]').val();
    insertObj.message =$('.addThreadDescription').summernote('code');
    insertObj.community =$('#adminThreadInsertForm input[name=threadCommunity]:checked').val();
    insertObj.pinned = $('#adminThreadInsertForm input[name=pinned]').is(':checked');
    insertObj.locked = $('#adminThreadInsertForm input[name=locked]').is(':checked');
    insertObj.featured = $('#adminThreadInsertForm input[name=featured]').is(':checked');

    const givenUserName=$('#adminThreadInsertForm input[name=existingUserName]').val();
    if($('#adminThreadInsertForm input[name=selfAuthor]').is(':checked')|| givenUserName===''){

      insertObj.authorName=Meteor.user().username;


    }else{
      insertObj.authorName=givenUserName;
    }
    adminInsertThread.call(insertObj,(error)=>{
      if(error){
        console.log(error);
        self.formErrorMessage.set(error.reason);
        $('.insertThreadErrorBox').removeClass('hidden');
      }else{

        console.log("success");
        $("#adminThreadInsertForm").trigger('reset');
        $('.addThreadDescription').summernote('code','');
        FlowRouter.go('/admin');
      }
    });

  }
});





Template.adminAddThreadDescription.onRendered(function(){

  $('.addThreadDescription').summernote({
    height: 200,
    minHeight: 100,
    maxHeight: 500,
    focus: true
  });


});
