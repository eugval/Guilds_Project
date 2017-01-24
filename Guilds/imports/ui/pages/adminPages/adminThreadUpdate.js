import './adminThreadUpdate.html';
import {Threads} from '/imports/api/forum/threads.js';
import {adminUpdateThread} from '/imports/api/forum/methods.js';

Template.adminThreadUpdate.onCreated(function(){
  const threadID = FlowRouter.getParam('threadID');
  this.autorun(()=>{
  this.subscribe('Thread.adminOne',{_id:threadID});
  });
});


Template.adminThreadUpdate.helpers({
  thread(){
    return Threads.findOne();
  }
});

Template.adminThreadUpdate.events({
  'submit #adminThreadUpdateForm':function(event){
    event.preventDefault();
      const threadID = FlowRouter.getParam('threadID');
    let updateObj={_id:threadID, update:{}};
    updateObj.update.title =$('#adminThreadUpdateForm input[name=editThreadTitle]').val();
    updateObj.update.community =$('#adminThreadUpdateForm input[name=editThreadCommunity]').val();
    updateObj.update.authorName =$('#adminThreadUpdateForm input[name=editThreadAuthor]').val();
    updateObj.update.pinned =$('#adminThreadUpdateForm input[name=pinned]').is(':checked');
    updateObj.update.locked =$('#adminThreadUpdateForm input[name=locked]').is(':checked');
    updateObj.update.message =$('#editThreadDescription').summernote('code');

    adminUpdateThread.call(updateObj,(error)=>{
      if(error){
        console.log("got an error");
        console.log(error);
      }else {
        console.log("success");
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
          console.log(this);
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


});
