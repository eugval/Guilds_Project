import './reply.html';
import {editReply} from '/imports/api/forum/methods.js';
import {timeSince} from '/imports/api/helpers/generalHelpers.js';
import '/imports/ui/components/helperComponents/inlineErrorMessage.js';

Template.reply.onCreated(function(){
  this.editing=new ReactiveVar(false);
  this.formErrorMessage =new ReactiveVar('');
});

Template.reply.helpers({
  date(){
    return timeSince(this.createdAt);
  },
  isAuthorOrAdmin(){
    return this.author === Meteor.userId()|| Meteor.user().isAdmin;
    return false;
  },
  canEdit(){
    return !Session.get('editingThreadReply');
  },
  editing(){
    return Template.instance().editing.get();
  },
  errorMessage(){
    return {errorMessage:Template.instance().formErrorMessage.get()};
  }
});

Template.reply.events({
  'click #editComment':function(event){
    event.preventDefault();
    if(!Session.get('editingThreadReply')){
      Session.set('editingThreadReply',true);
      Template.instance().editing.set(true);
    }


  },
  'click #cancelCommentEdit':function(event){
    event.preventDefault();
    Template.instance().editing.set(false);
    Session.set('editingThreadReply',false);
    $('#editReplyError').removeClass('hidden');

  },
  'click #saveCommentEdit': function(event){
    event.preventDefault();

    const self=Template.instance();
    $('#editReplyError').addClass('hidden');
    const _id= this._id;
    const message = $('.editComment').summernote('code');



    Session.set('editingThreadReply',false);
    editReply.call({_id,message},(error)=>{
      if(error){
        /*handle error*/
        console.log(error);
        self.formErrorMessage.set(error.reason);
        $('#editReplyError').removeClass('hidden');
      }else{
        console.log("success");
        self.editing.set(false);
      }

    });
  }
});

Template.commentEdit.onRendered(function(){
  $('.editComment').summernote({
    focus: true,
    disableDragAndDrop: true,
    height: 200,
    toolbar:[
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
    ],

  });

  $('.editComment').summernote('code',this.data.message);

});


Template.commentEdit.onDestroyed(function(){
  $('.editComment').summernote('destroy');
});
