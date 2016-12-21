import './thread.html';
import {Threads} from '/imports/api/forum/threads.js';
import {Replies} from '/imports/api/forum/replies.js';
import '../components/reply.js';

Template.thread.onCreated(function(){
  this.replyLimit = new ReactiveVar(10);
  const threadID = FlowRouter.getParam('threadID');
  this.autorun(()=>{
    this.subscribe('Thread.One',{_id:threadID});
this.subscribe('Replies.List',{thread:threadID},this.replyLimit.get());
  });

});


Template.thread.helpers({
  threadContext(){
    return Threads.findOne();
  },
  date(){
    let createdDate = this.createdDate;
    createdDate = createdDate.toISOString().substring(0,10);
    return createdDate;
  },
  replies(){
    return this.replyNb.toString();
  },
  repliesContext(){
    console.log(Replies.find().fetch());
    return Replies.find({},{sort:{createdDate:-1}});
  }
});


Template.thread.events({
  'click #addMoreReplies':function(e){
    e.preventDefault();
    let limit = Template.instance().replyLimit.get();
    Template.instance().replyLimit.set(limit+10);
  },
})
