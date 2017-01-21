import './thread.html';
import '/imports/ui/components/forumComponents/reply.js';
import '/imports/ui/components/forumComponents/addReply.js';
import '/imports/ui/pages/helperPages/pageNotFound.js';
import {Threads} from '/imports/api/forum/threads.js';
import {Replies} from '/imports/api/forum/replies.js';


Template.thread.onCreated(function(){
  this.replyLimit = new ReactiveVar(10);
  const threadID = FlowRouter.getParam('threadID');
  const community = FlowRouter.getParam('community');
  this.autorun(()=>{
    this.subscribe('Thread.One',{_id:threadID, community});
    this.subscribe('Replies.List',{thread:threadID},this.replyLimit.get());
  });

});


Template.thread.helpers({
  threadExists(){
    return !!Threads.findOne();
  },
  threadContext(){
    return Threads.findOne();
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
    let createdAt = this.createdAt;
    createdAt = createdAt.toISOString().substring(0,10);
    return createdAt;
  },
  pathForEditThread(){
    const threadID = FlowRouter.getParam('threadID');
    const community = FlowRouter.getParam('community')
    const params={community,threadID};
    return FlowRouter.path('/:community/forum/:threadID/editOP',params);
  }
});


Template.thread.events({
  'click #addMoreReplies':function(e){
    e.preventDefault();
    let limit = Template.instance().replyLimit.get();
    Template.instance().replyLimit.set(limit+10);
  },
  /*'click #edit-thread':function(event){
    event.preventDefault();
    const threadID = FlowRouter.getParam('threadID');
    const community = FlowRouter.getParam('community')
    console.log("here");
    FlowRouter.go(`${community}/forum/${threadID}/editOP`);
  }*/
});
