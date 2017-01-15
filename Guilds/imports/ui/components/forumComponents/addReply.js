import './addReply.html';
import {insertReply} from '/imports/api/forum/methods.js';

Template.addReply.onRendered(function(){

$('#replyMessage').summernote({
  height: 150,
  minHeight: 100,
  maxHeight: 400,
  focus: true
});
});




Template.addReply.events({
  'submit #addReply':function(event){
    event.preventDefault();
    const obj={};
    obj.message = $('#replyMessage').summernote('code');
    console.log(obj.message);
    obj.thread = FlowRouter.getParam('threadID');

    insertReply.call(obj);
$('#replyMessage').summernote('code','');
    $('a[data-target="#answers"][data-toggle="tab"]').tab('show');
  }
})
