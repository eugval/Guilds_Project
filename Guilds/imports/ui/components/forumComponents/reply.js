import './reply.html';
import {editReply} from '/imports/api/forum/methods.js';

Template.reply.onCreated(function(){
  this.commentState=new ReactiveVar('commentDisplay');
});

Template.reply.helpers({
  dateCreated(){
    let createdAt = this.createdAt;
    createdAt = createdAt.toISOString().substring(0,10);
    return createdAt;
  },
  isAuthorOrAdmin(){
    return this.author === Meteor.userId()|| Meteor.user().isAdmin;
    return false;
  },
  state(){
    return Template.instance().commentState.get();
  },
  displayingComment(){
    return Template.instance().commentState.get()==='commentDisplay';
  },
  editingComment(){
    return Template.instance().commentState.get()==='commentEdit';
  }
});

Template.reply.events({
  'click #editComment':function(event){
    event.preventDefault();
    Template.instance().commentState.set('commentEdit');
  },
  'click #saveCommentEdit': function(event){
    event.preventDefault();
    const _id= this._id;
    const message = $('.editComment').summernote('code');

    console.log(message);

    Template.instance().commentState.set('commentDisplay');
    editReply.call({_id,message},(err)=>{
      if(err){
        /*handle error*/
        console.log("error");
      }else{
        console.log("success");
      }

    });
  }
});

Template.commentEdit.onRendered(function(){
  $('.editComment').summernote({
    height: 150,
    minHeight: 100,
    maxHeight: 400,
    focus: true
  });

  $('.editComment').summernote('code',this.data.message);

});


Template.commentEdit.onDestroyed(function(){
  console.log("here");
  $('.editComment').summernote('destroy');
});
