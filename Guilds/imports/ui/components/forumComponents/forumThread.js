import './forumThread.html';
import {threadPinUpdate} from '/imports/api/forum/methods.js';
import {threadLockUpdate} from '/imports/api/forum/methods.js';
import {timeSince} from '/imports/api/helpers/generalHelpers.js';
import {isAdmin} from '/imports/api/helpers/adminFunctions.js';

Template.forumThread.helpers({
  pins(){
    return this.pinned || this.locked;
  },
  IDLink(){
    const community = FlowRouter.getParam('community');
    const threadID = this._id;
    const params ={community,threadID};
    return FlowRouter.path('/:community/forum/:threadID',params);
  },
  dateInserted(){
    /*
    let createdAt = this.createdAt;
    createdAt = createdAt.toISOString().substring(0,10);
    return createdAt;
    */

    return timeSince(this.createdAt);

  },
  isAdmin(){
    return isAdmin();
  }
});

Template.forumThread.events({
  'click .thread-pin':function(event){
    event.preventDefault();
    const options={
      _id:this._id,
      pinValue:!this.pinned,
    }
    threadPinUpdate.call(options);
  },
  'click .thread-lock':function(event){
    event.preventDefault();
    const options={
      _id:this._id,
      lockValue:!this.locked,
    }
    threadLockUpdate.call(options);
  },
  'click .thread-adminUpdate':function(event){
    event.preventDefault();
        const params = {threadID:this._id};
        FlowRouter.go('/admin/:threadID/adminThreadUpdate',params);
  },

})
