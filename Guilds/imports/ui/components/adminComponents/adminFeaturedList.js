import './adminFeaturedList.html';
import {Threads} from "/imports/api/forum/threads.js";
import {threadFeaturedUpdate} from '/imports/api/forum/methods.js';

Template.adminFeaturedList.onCreated(function(){
  this.autorun(()=>{
    this.subscribe('Threads.Featured',{});
  })
});


Template.adminFeaturedList.helpers({
  freaturedPosts(){
    return Threads.find();
  },
  pathToFeaturedPost(){
    const params={
      community:this.community,
      threadID:this._id,
    }

    return FlowRouter.path('/:community/forum/:threadID',params);
  }
});


Template.adminFeaturedList.events({
  'click .thread-featured':function(event){
    event.preventDefault();
    const options={
      _id:this._id,
      featuredValue:!this.featured,
    }
    threadFeaturedUpdate.call(options);
  },
});
