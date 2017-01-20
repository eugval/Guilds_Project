import {Threads} from './threads.js'
import {Schemas} from '/imports/api/helpers/schemas.js';
import {Replies} from './replies.js';
import {isThreadAuthorOrAdmin} from '/imports/api/helpers/adminFunctions.js';

/*THREAD METHODS*/
export const insertThread = new ValidatedMethod({
  name:'Threads.methods.insertThread',
  validate: new SimpleSchema([
  Schemas.Threads.insertThread,
  ]).validator(),
  run(thread){
    if(!this.userId){
      throw new Meteor.Error('Threads.methods.insertThread.notLoggedIn',
      'Must be logged in to submit threads.');
    }
    if(Meteor.user().isBanned){
      throw new Meteor.Error('Threads.methods.insertThread.userBanned',
      'A banned user cannot take this action.');
    }
    Threads.insert(thread);
    }
});

export const updateThread = new ValidatedMethod({
    name:'Threads.methods.updateThread',
  validate: new SimpleSchema([
    Schemas.Threads.updateThread,
  ]).validator(),
  run(options){
    if(!this.userId){
      throw new Meteor.Error('Threads.methods.updateThread.notLoggedIn',
      'Must be logged in to submit threads.');
    }

    if(Meteor.user().isBanned){
      throw new Meteor.Error('Threads.methods.updateThread.userBanned',
      'A banned user cannot take this action.');
    }

    if(!isThreadAuthorOrAdmin(options._id) ){
      throw new Meteor.Error('Threads.methods.updateThread.notAllowed',
      'You are not allowed to take this action.');
    }

    if(Threads.findOne({_id:options._id}).locked){
      throw new Meteor.Error('Threads.methods.updateThread.locked',
      'This thread is locked and cannot be updated');
    }
    
    Threads.update(options._id,{$set:options});
  }
});



export const threadPinUpdate = new ValidatedMethod({
  name:'Threads.methods.threadPinUpdate',
  validate: new SimpleSchema([
    Schemas.Threads.threadPinUpdate,
  ]).validator(),
  run(options){
    if(!this.userId || !Meteor.user().isAdmin){
      throw new Meteor.Error('Threads.methods.threadPinUpdate.notAuthorised',
      'You are not Authorised to take this action');
    }

    Threads.update({_id:options._id},{$set:{pinned:options.pinValue}});
  }
});


export const threadLockUpdate = new ValidatedMethod({
  name:'Threads.methods.threadLockUpdate',
  validate: new SimpleSchema([
    Schemas.Threads.threadLockUpdate,
  ]).validator(),
  run(options){
    if(!this.userId || !Meteor.user().isAdmin){
      throw new Meteor.Error('Threads.methods.threadLockUpdate.notAuthorised',
      'You are not Authorised to take this action');
    }

    Threads.update({_id:options._id},{$set:{locked:options.lockValue}});
  }
});




/*REPLIES METHODS */
export const insertReply =  new ValidatedMethod({
  name: 'Replies.methods.insertReply',
  validate: new SimpleSchema([
     Schemas.Replies.clientSupplied,
  ]).validator(),
  run(reply){
    const thread=Threads.findOne({_id:reply.thread});

    if(!this.userId){
      throw new Meteor.Error('Replies.methods.insertReply.notLoggedIn',
      'Must be logged in to submit threads.');
    }


    if(Meteor.users.findOne({_id:this.userId}).isBanned){
      throw new Meteor.Error('Replies.methods.insertReply.userBanned',
      'A banned user cannot take this action.');
    }

    if(!thread){
      throw new Meteor.Error('Replies.methods.insertReply.ThreadNotFound',
    'The thread supplied was not found');
    }

    if(thread.locked){
      throw new Meteor.Error('Replies.methods.updateThread.locked',
      'This thread is locked and cannot be updated');
    }


    Replies.insert(reply);

    Threads.update({_id:reply.thread},{$inc:{replyNb:1}});
  }

});


export const editReply = new ValidatedMethod({
  name:'Replies.methods.editReply',
  validate: new SimpleSchema([
    Schemas.Replies.editReply,
  ]).validator(),
  run(edit){
    /*TODO: Think if I need to verify that reply and thread are there*/
    const reply = Replies.findOne({_id:edit._id});
    const thread = Threads.findOne({_id:reply.thread});

    if(!this.userId){
      throw new Meteor.Error('Replies.methods.editReply.notLoggedIn',
      'Must be logged in to submit threads.');
    }
    if(Meteor.user().isBanned){
      throw new Meteor.Error('Replies.methods.insertReply.userBanned',
      'A banned user cannot take this action.');
    }

      if(reply.author!=this.userId && !Meteor.user().isAdmin){
        throw new Meteor.Error('Replies.methods.editReply.notAuthorised','You are not Authorised to take this action');
      }

    if(thread.locked){
      throw new Meteor.Error('Replies.methods.updateThread.locked',
      'This thread is locked and cannot be updated');
    }

    Replies.update({_id:edit._id},{$set:{message:edit.message}});


  }
});
