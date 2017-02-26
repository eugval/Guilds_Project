import './thread.html';
import '/imports/ui/components/forumComponents/reply.js';
import '/imports/ui/components/forumComponents/addReply.js';
import '/imports/ui/pages/helperPages/pageNotFound.js';
import '/imports/ui/components/accountComponents/verticalUserOptions.js';
import '/imports/ui/components/accountComponents/signInUpForm.js';
import {Threads} from '/imports/api/forum/threads.js';
import {Replies} from '/imports/api/forum/replies.js';
import {timeSince} from '/imports/api/helpers/generalHelpers.js';
import {updateThread} from '/imports/api/forum/methods.js';
import '/imports/ui/components/helperComponents/errorMessageBox.js';

Template.thread.onCreated(function(){
  this.replyLimit = new ReactiveVar(20);
  this.replying = new ReactiveVar(false);
  this.editingOP = new ReactiveVar(false);
  this.formErrorMessage = new ReactiveVar('');
  Session.set("editingThreadReply",false);
  const threadID = FlowRouter.getParam('threadID');
  const community = FlowRouter.getParam('community');
  this.autorun(()=>{
    this.subscribe('Thread.One',{_id:threadID, community});
    this.subscribe('Replies.List',{thread:threadID},this.replyLimit.get());
  });

});


Template.thread.helpers({
  threadExists(){
      const threadID = FlowRouter.getParam('threadID');
    return !!Threads.findOne({_id:threadID});
  },
  threadContext(){
    const threadID = FlowRouter.getParam('threadID');
    return Threads.findOne({_id:threadID});
  },
  replies(){
    return this.replyNb.toString();
  },
  repliesContext(){
    return Replies.find({},{sort:{createdAt:-1}});
  },
  noReplies(){
    return Replies.find({}).count()===0;
  },
  isAuthorOrAdmin(){
    return this.author === Meteor.userId() || Meteor.user().isAdmin;
  },
  date(){
    return timeSince(this.createdAt);
  },
  relatedTopics(){
      Meteor.subscribe('Threads.Related',6,this.title);
     return Threads.find({_id:{$not:this._id}},{sort:{score:-1}})
  },
  replying(){
    return Template.instance().replying.get();
  },
  editingOP(){
    return Template.instance().editingOP.get();
  },
  errorMessage(){
    return {errorMessage:Template.instance().formErrorMessage.get()};
  },
});


Template.thread.events({
  'click #addMoreReplies':function(event){
    event.preventDefault();
    let limit = Template.instance().replyLimit.get();
    Template.instance().replyLimit.set(limit+10);
  },
  'click #toggleReplyArea':function(event){
    const current = Template.instance().replying.get();
    if(current){
      $('#replyMessage').summernote('code','');
    }
    $('#threadReplyError').addClass("hidden");
    Template.instance().replying.set(!current);
  },
  'click .toggleOPEdit':function(event){
    event.preventDefault();
    const current = Template.instance().editingOP.get();
    $('#editOPErroBox').addClass('hidden');
    Template.instance().editingOP.set(!current);

  },
  'click #saveOPEdit':function(event){
    event.preventDefault();
    const self=Template.instance();
    $('#editOPErroBox').addClass('hidden');
    const threadID = FlowRouter.getParam('threadID');
    const updateObj = {};
    updateObj._id = threadID;
    updateObj.update = {
      title: $("#edit-OP-title").val(),
      message: $('.edit-OP-editor').summernote('code'),
    }


    updateThread.call(updateObj,(error)=>{
      if(error){
        /*handle error*/
        console.log(error);
        self.formErrorMessage.set(error.reason);
        $('#editOPErroBox').removeClass('hidden');
      }else{
        /* Clean up form and redirect to forum on success */
        console.log("success");
        $("#edit-OP-title").val('');
        $('.edit-OP-editor').summernote('code','');
        self.editingOP.set(false);
      }
    });


  }
});




Template.editOPEditor.onRendered(function(){
  $('.edit-OP-editor').summernote({
    height: 300,
    focus: false ,
    toolbar:[
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture']]

    ],
    disableDragAndDrop: true,
  });

  $('.edit-OP-editor').summernote('code',this.data.message);
});

Template.editOPEditor.onDestroyed(function(){
  $('.edit-OP-editor').summernote('destroy');
});
