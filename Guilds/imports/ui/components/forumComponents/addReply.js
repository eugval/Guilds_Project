import './addReply.html';
import {insertReply} from '/imports/api/forum/methods.js';
import '/imports/ui/components/helperComponents/inlineErrorMessage.js';

Template.addReply.onCreated(function(){
    this.formErrorMessage =new ReactiveVar('');
});


Template.addReply.onRendered(function(){

$('#replyMessage').summernote({
  height: 250,
  focus: true,
  disableDragAndDrop: true,
  toolbar:[
      ['style', ['bold', 'italic', 'underline', 'clear']],
       ['font', ['strikethrough']],
       ['fontsize', ['fontsize']],
       ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
    ],
});
});


Template.addReply.helpers({
  errorMessage(){
    return {errorMessage:Template.instance().formErrorMessage.get()};
  }
})

Template.addReply.events({
  'submit #addReply':function(event){
        event.preventDefault();
    if(!Meteor.user()){
      $('#signInModal .sign-in-warning').removeClass('hidden');
    $('#signInModal').modal('toggle');
    return;
    }

        const self=Template.instance();
                $('#threadReplyError').addClass('hidden');
    const obj={};
    obj.message = $('#replyMessage').summernote('code');

    obj.thread = FlowRouter.getParam('threadID');

    insertReply.call(obj,(error)=>{
      if(error){
        console.log(error);
        self.formErrorMessage.set(error.reason);
        $('#threadReplyError').removeClass('hidden');
      }else{
        $('#replyMessage').summernote('code','');
      $('#toggleReplyArea').trigger('click');
      }
    });

  }
})
