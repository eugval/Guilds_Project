import './adminThreadUpdate.html';
import {Threads} from '/imports/api/forum/threads.js';
import {adminUpdateThread} from '/imports/api/forum/methods.js';
import {isAdmin} from '/imports/api/helpers/adminFunctions.js';
import '/imports/ui/components/helperComponents/errorMessageBox.js';
import '/imports/ui/pages/helperPages/unAuthorisedAccess.js';

Template.adminThreadUpdate.onCreated(function(){
  const threadID = FlowRouter.getParam('threadID');
  this.formErrorMessage = new ReactiveVar('');
  this.autorun(()=>{
  this.subscribe('Thread.adminOne',{_id:threadID});
  });
});


Template.adminThreadUpdate.helpers({
  thread(){
    return Threads.findOne();
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

Template.adminThreadUpdate.events({
  'submit #adminThreadUpdateForm':function(event){
    event.preventDefault();
        const self=Template.instance();
      $('.insertThreadErrorBox').addClass('hidden');
      const threadID = FlowRouter.getParam('threadID');
    let updateObj={_id:threadID, update:{}};
    updateObj.update.title =$('#adminThreadUpdateForm input[name=editThreadTitle]').val();
    updateObj.update.community =$('#adminThreadUpdateForm input[name=editThreadCommunity]').val();
    updateObj.update.authorName =$('#adminThreadUpdateForm input[name=editThreadAuthor]').val();
    updateObj.update.pinned =$('#adminThreadUpdateForm input[name=pinned]').is(':checked');
    updateObj.update.locked =$('#adminThreadUpdateForm input[name=locked]').is(':checked');
    updateObj.update.featured =$('#adminThreadUpdateForm input[name=featured]').is(':checked');
    updateObj.update.message =$('#editThreadDescription').summernote('code');

    adminUpdateThread.call(updateObj,(error)=>{
      if(error){
        console.log(error);
        self.formErrorMessage.set(error.reason);
        $('.insertThreadErrorBox').removeClass('hidden');
      }else {
        console.log("success");
        $('#adminThreadUpdateForm').trigger('reset');
        $('#editThreadDescription').summernote('code','');
        const params ={community:updateObj.update.community};
        FlowRouter.go('/:community/forum',params);
      }
    })
  }
});


Template.descEditor.onRendered(function(){
  $('#editThreadDescription').summernote({
    height: 150,
    minHeight: 100,
    maxHeight: 400,
    focus: true
  });
  $('#editThreadDescription').summernote('code',this.data.message);

});

Template.descEditor.onDestroyed(function(){
  $('#editThreadDescription').summernote('destroy');
});


Template.attrAdminThreadUpdate.onRendered(function(){

    if(this.data.pinned){
      $('#adminThreadUpdateForm input[name=pinned]').prop('checked', true);
    }
    if(this.data.locked){
      $('#adminThreadUpdateForm input[name=locked]').prop('checked', true);
    }

    if(this.data.featured){
      $('#adminThreadUpdateForm input[name=featured]').prop('checked', true);
    }


});
