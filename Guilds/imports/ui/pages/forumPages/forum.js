import './forum.html';
import '/imports/ui/components/forumComponents/forumThread.js'; //the forumThread template is used hence loaded
import '/imports/ui/components/helperComponents/communityButton.js';
import {Threads} from '/imports/api/forum/threads.js';
import {inCommunity} from '/imports/api/helpers/communityHelpers.js';

/*Subscribe to the threads collections to display them in the forum template */
Template.forum.onCreated(function(){
  this.threadLimit = new ReactiveVar(10);
  const community= FlowRouter.getParam('community');
  this.autorun(()=>{
    this.subscribe('Threads.List',{community},this.threadLimit.get());
  });

});


Template.forum.helpers({
  /*Serve the thread context to use with Blaze*/
  pinnedThreads(){
    return Threads.find({pinned:true},{sort:{createdAt:-1}});
  },
  unpinnedThreads(){
      return Threads.find({pinned:false},{sort:{createdAt:-1}});
  },
  welcomeMessage(){
    const community= FlowRouter.getParam('community');
    let message ="Welcome to the";

    if(community ==="LifePlan"){
      message += " Life Plan Community";
    }else if (community ==="Yolo"){
      message += " Yolo Community";
    }else if (community === "PersonalDev"){
      message += " Personal Development Community";
    }
    return message;
  },
  inCommunity(){
    return inCommunity();
    },
  });


  Template.forum.events({
    /* Load more threads */
    'click #addMoreThreads':function(e){
      e.preventDefault();
      let limit = Template.instance().threadLimit.get();
      Template.instance().threadLimit.set(limit+10);
    },
    /* New Thread link */
    'click .add-thread':function(e){
      e.preventDefault();
      const community=FlowRouter.getParam('community');
      const params ={community};
      FlowRouter.go('/:community/forum/newthread',params);
    }
  });
