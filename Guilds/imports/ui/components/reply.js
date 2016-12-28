import './reply.html';
import './commentDisplay.js';
import './commentEdit.js';

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
    Template.instance().commentState.set('commentDisplay');

  }
})
