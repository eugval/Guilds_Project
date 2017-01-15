import './originalPostEdit.html';
import {Threads} from '/imports/api/forum/threads.js';
import {updateThread} from '/imports/api/forum/methods.js';

Template.originalPostEdit.onCreated(function(){
  const threadID = FlowRouter.getParam('threadID');
  this.autorun(()=>{
    this.subscribe('Thread.One',{_id:threadID});
  });

});


Template.originalPostEdit.helpers({
  thread(){
    return Threads.findOne();
  },
  date(){
    let createdAt = this.createdAt;
    createdAt = createdAt.toISOString().substring(0,10);
    return createdAt;
  },

});


Template.originalPostEdit.events({
  'submit #editForumOP':function(event){
    event.preventDefault();
    const _id = FlowRouter.getParam('threadID');
    const title = event.target.editThreadTitle.value;
    const message = $('#editThreadDescription').summernote('code');

    updateThread.call({_id,title,message},(err)=>{
      if(err){
        /*handle error*/
        /*TODO: Display error messages on the form*/
        console.log("error while inserting thread");
        console.log(err);
      }else{
        /* Clean up form and redirect to forum on success */
        console.log("success");
        event.target.editThreadTitle.value="";
        $('#editThreadDescription').summernote('code','');
        FlowRouter.go(`/forum/${_id}`);
      }
    });
  },
  'click .cancelEdit':function(){
    const threadID = FlowRouter.getParam('threadID');
    FlowRouter.go(`/forum/${threadID}`);
  }
});




Template.descriptionEditor.onRendered(function(){
  $('#editThreadDescription').summernote({
    height: 150,
    minHeight: 100,
    maxHeight: 400,
    focus: true
  });
  $('#editThreadDescription').summernote('code',this.data.message);
});
