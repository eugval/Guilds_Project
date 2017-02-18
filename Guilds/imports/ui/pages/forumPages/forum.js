import './forum.html';
import '/imports/ui/components/forumComponents/forumThread.js'; //the forumThread template is used hence loaded
import '/imports/ui/components/accountComponents/signInUpForm.js';
import '/imports/ui/components/accountComponents/verticalUserOptions.js';
import {Threads} from '/imports/api/forum/threads.js';
import {inCommunity,COMMUNITIES} from '/imports/api/helpers/communityHelpers.js';

$('body').on('hidden.bs.tooltip', function() {
  var tooltips = $('.tooltip').not('.in');
  if (tooltips) {
    tooltips.remove();
  }
});

/*Subscribe to the threads collections to display them in the forum template */
Template.forum.onCreated(function(){
  this.threadLimit = new ReactiveVar(10);


  this.autorun(()=>{
    const community= FlowRouter.getParam('community');
    this.subscribe('Threads.List',{community,pinned:true},-1);
    this.subscribe('Threads.List',{community,pinned:false},this.threadLimit.get());
  });

});


Template.forum.onRendered(function(){
  $('[data-toggle="popover"]').popover();
});


Template.forum.helpers({

  pinnedThreads(){
    return Threads.find({pinned:true},{sort:{createdAt:-1}});
  },
  unpinnedThreads(){
    return Threads.find({pinned:false},{sort:{createdAt:-1}});
  },
  welcomeMessage(){
    const community= FlowRouter.getParam('community');
    let message ="Welcome to the";

    return message+ Communities[community] + " Community";
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
    if(!Meteor.userId()){
              $('#signInModal .sign-in-warning').removeClass('hidden');
        $('#signInModal').modal('toggle');
    }else{
      const community=FlowRouter.getParam('community');
      const params ={community};
      FlowRouter.go('/:community/forum/newthread',params);
    }


  },
  'click .logOut':function(event){
    event.preventDefault();
    Meteor.logout((error)=>{
      if(error){
        console.log(error);
      }
    });
  },

  'click #horizontalNavigationDropdown':function(event){
    event.preventDefault();

    $('#horizontalNavigationDropdown').dropdown('toggle');
  },
});
