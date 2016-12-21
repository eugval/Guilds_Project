import './forum.html';
import '../components/forumThread.js'; //the forumThread template is used hence loaded
import {Threads} from '../../api/forum/threads.js';

/*Subscribe to the threads collections to display them in the forum template */
Template.forum.onCreated(function(){
  this.threadLimit = new ReactiveVar(10);
  this.autorun(()=>{
    this.subscribe('Threads.List',{},this.threadLimit.get());
  });

});


Template.forum.helpers({
  /*Serve the thread context to use with Blaze*/
  threads(){
    return Threads.find({},{sort:{createdDate:-1}});
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
      e.preventDefault;
      FlowRouter.go('/forum/newthread');
    }
  });
