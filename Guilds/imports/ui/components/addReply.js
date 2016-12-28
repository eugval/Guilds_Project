import './addReply.html';
import {insertReply} from '/imports/api/forum/methods.js';

Template.addReply.onRendered(function(){
CKEDITOR.replace( 'replyMessage' );

});




Template.addReply.events({
  'submit #addReply':function(event){
    event.preventDefault();
    const obj={};
    obj.message = $('#addReply textarea[name=replyMessage]').val();
    obj.thread = FlowRouter.getParam('threadID');

    // data = CKEDITOR.instances.replyMessage.getData();
    //console.log(data);
    insertReply.call(obj);
    CKEDITOR.instances.replyMessage.setData('');
    $('a[data-target="#answers"][data-toggle="tab"]').tab('show');
  }
})
