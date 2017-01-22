import './originalPostEdit.html';
import {Threads} from '/imports/api/forum/threads.js';
import {updateThread} from '/imports/api/forum/methods.js';

Template.originalPostEdit.onCreated(function(){
  const threadID = FlowRouter.getParam('threadID');
  const community = FlowRouter.getParam('community');
  this.autorun(()=>{
    this.subscribe('Thread.One',{_id:threadID, community});
  });

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



Template.originalPostEdit.helpers({
  thread(){
    return Threads.findOne();
  },
  date(){
    let createdAt = this.createdAt;
    createdAt = createdAt.toISOString().substring(0,10);
    return createdAt;
  },
  pathForCancelThreadEdit(){
    const threadID = FlowRouter.getParam('threadID');
    const community = FlowRouter.getParam('community')
    const params={community,threadID};
    return FlowRouter.path('/:community/forum/:threadID',params);
  }

});


Template.originalPostEdit.events({
  'submit #editForumOP':function(event){
    event.preventDefault();
    const threadID = FlowRouter.getParam('threadID');
    const updateObj = {};
     updateObj._id = threadID;
     updateObj.update = {
       title: event.target.editThreadTitle.value,
       message: $('#editThreadDescription').summernote('code'),
     }
     console.log(updateObj);

    updateThread.call(updateObj,(err)=>{
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
        const community=FlowRouter.getParam('community');
        const params = {community, threadID};
        FlowRouter.go(`/:community/forum/:threadID`,params);
      }
    });
  },
});
