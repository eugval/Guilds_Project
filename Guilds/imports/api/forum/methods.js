import {Threads} from './threads.js'
import {Schemas} from '/imports/api/helpers/schemas.js';
import {Replies} from './replies.js';
import {isAuthorOrAdmin, isAdmin} from '/imports/api/helpers/adminFunctions.js';
import {userBannedorOut} from '/imports/api/helpers/userFunctions.js';

/*
*All Forum methods need to protect:
*Against logged out user.
*Against banned user.
*/

/*THREAD METHODS*/

/*All user methods*/
export const insertThread = new ValidatedMethod({
  name:'Threads.methods.insertThread',
  validate: new SimpleSchema([
    Schemas.Threads.insertThread,
  ]).validator(),
  run(thread){
    /*Verify that the user is logged in and not banned*/
    if(userBannedorOut()){
      throw new Meteor.Error('Threads.methods.insertThread.BannedOrOut',
      'A banned or logged out user cannot take this action');
    }
    /*Construct the full thread object*/
    const user = Meteor.user();
    thread.pinned =false;
    thread.locked =false;
    thread.replyNb=0;
    thread.author = user._id;
    thread.authorName = user.username;
    thread.createdAt = new Date();
    console.log(thread);

    /*Insert the thread to the database*/
    Threads.insert(thread);
  }
});

export const updateThread = new ValidatedMethod({
  name:'Threads.methods.updateThread',
  validate: new SimpleSchema([
    Schemas.Threads.updateThread,
  ]).validator(),
  run(options){
    /*User must be logged in and not banned*/
    if(userBannedorOut()){
      throw new Meteor.Error('Threads.methods.updateThread.BannedOrOut',
      'A banned or logged out user cannot take this action');
    }

    /*Thread must exist*/
    const Thread = Threads.findOne({_id:options._id});
    if(!Thread){
      throw new Meteor.Error('Threads.methods.updateThread.notFound',
      'The thread was not found.');
    }

    /*Only the author and Admins can update the threads */
    if(!isAuthorOrAdmin(Thread) ){
      throw new Meteor.Error('Threads.methods.updateThread.notAllowed',
      'You are not allowed to take this action.');
    }

    /*When a thread is locked it cannot be updated*/
    if(Thread.locked){
      throw new Meteor.Error('Threads.methods.updateThread.locked',
      'This thread is locked and cannot be updated');
    }

    Threads.update(options._id,{$set:options.update});
  }
});


/*Admin only methods*/

export const adminInsertThread =new ValidatedMethod({
  name:'Threads.methods.adminInsertThread',
  validate: new SimpleSchema([
    Schemas.Threads.adminInsertThread,
  ]).validator(),
  run(thread){
    /*User must be logged in and not banned*/
    if(userBannedorOut()){
      throw new Meteor.Error('Threads.methods.adminInsertThread.BannedOrOut',
      'A banned or logged out user cannot take this action');
    }

    /*only admins can use this function*/
    if(!isAdmin()){
      throw new Meteor.Error('Threads.methods.adminInsertThread.notAuthorised',
      'You are not Authorised to take this action');
    }

    /*If author provided is not a user abort*/
    const authorUser = Meteor.users.findOne({_id:thread.author});
    if(!authorUser){
      throw new Meteor.Error('Threads.methods.adminInsertThread.userNotFound',
      'The user was not found in the database.');
    }

    /*Complete the thread object*/
    thread.aurhorName = authorUser.username;
    thread.createdAt = new Date();

    /*Insert the thread to the database*/
    Threads.insert(thread);

  }
});

export const adminUpdateThread =new ValidatedMethod({
  name:'Threads.methods.adminUpdateThread',
  validate: new SimpleSchema([
    Schemas.Threads.adminUpdateThread,
  ]).validator(),
  run(options){

    /*User must be logged in and not banned*/
    if(userBannedorOut()){
      throw new Meteor.Error('Threads.methods.adminUpdateThread.BannedOrOut',
      'A banned or logged out user cannot take this action');
    }

    /*only admins can use this function*/
    if(!isAdmin()){
      throw new Meteor.Error('Threads.methods.adminUpdateThread.notAuthorised',
      'You are not Authorised to take this action');
    }

    /*Thread must exist*/
    const Thread = Threads.findOne({_id:options._id});
    if(!Thread){
      throw new Meteor.Error('Threads.methods.adminUpdateThread.notFound',
      'The thread was not found.');
    }

    /*If author is provided also update the author's name*/
    if(!!options.update.author){
      /*If author provided is not a user abort*/
      const authorUser = Meteor.users.findOne({_id:options.update.author});
      if(!authorUser){
        throw new Meteor.Error('Threads.methods.adminUpdateThread.userNotFound',
        'The user was not found in the database.');
      }
      options.update.authorName =aurhorUser.username;
    }

    Threads.update(options._id,{$set:options.update});
  },
});


export const threadPinUpdate = new ValidatedMethod({
  name:'Threads.methods.threadPinUpdate',
  validate: new SimpleSchema([
    Schemas.Threads.threadPinUpdate,
  ]).validator(),
  run(options){
    /*Banned or logged out users are not allowed*/
    if(userBannedorOut()){
      throw new Meteor.Error('Threads.methods.threadPinUpdate.BannedOrOut',
      'A banned or logged out user cannot take this action');
    }

    /*only admins can use this function*/
    if(!isAdmin()){
      throw new Meteor.Error('Threads.methods.threadPinUpdate.notAuthorised',
      'You are not Authorised to take this action');
    }

    /*Thread must exist*/
    if(!Threads.findOne({_id:options._id})){
      throw new Meteor.Error('Threads.methods.updateThread.notFound',
      'The thread was not found.');
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
    /*Banned or logged out users are not allowed*/
    if(userBannedorOut()){
      throw new Meteor.Error('Threads.methods.threadPinUpdate.BannedOrOut',
      'A banned or logged out user cannot take this action');
    }

    /*only admins can use this function*/
    if(!isAdmin()){
      throw new Meteor.Error('Threads.methods.threadPinUpdate.notAuthorised',
      'You are not Authorised to take this action');
    }

    /*Thread must exist*/
    if(!Threads.findOne({_id:options._id})){
      throw new Meteor.Error('Threads.methods.updateThread.notFound',
      'The thread was not found.');
    }

    Threads.update({_id:options._id},{$set:{locked:options.lockValue}});
  }
});




/*REPLIES METHODS */

/*All user methods*/
export const insertReply =  new ValidatedMethod({
  name: 'Replies.methods.insertReply',
  validate: new SimpleSchema([
    Schemas.Replies.insertReply,
  ]).validator(),
  run(reply){

    /*Banned or logged out users are not allowed*/
    if(userBannedorOut()){
      throw new Meteor.Error('Replies.methods.insertReply.BannedOrOut',
      'A banned or logged out user cannot take this action');
    }

    /*The thread associated with the reply must exist*/
    const Thread=Threads.findOne({_id:reply.thread});
    if(!Thread){
      throw new Meteor.Error('Replies.methods.insertReply.ThreadNotFound',
      'The thread supplied was not found');
    }

    /*If the thread is locked, cannot add a reply*/
    if(Thread.locked){
      throw new Meteor.Error('Replies.methods.updateThread.locked',
      'This thread is locked and cannot be updated');
    }

    /*Finish building reply object*/
    const user = Meteor.user();
    reply.author =user._id;
    reply.authorName =user.username;
    reply.createdAt =new Date();

    /*Insert the reply*/
    Replies.insert(reply);

    /*Update the reply number count on the thread*/
    Threads.update({_id:reply.thread},{$inc:{replyNb:1}});
  }

});


export const editReply = new ValidatedMethod({
  name:'Replies.methods.editReply',
  validate: new SimpleSchema([
    Schemas.Replies.editReply,
  ]).validator(),
  run(edit){
    /*Banned or logged out users are not allowed*/
    if(userBannedorOut()){
      throw new Meteor.Error('Replies.methods.insertReply.BannedOrOut',
      'A banned or logged out user cannot take this action');
    }


    const Reply = Replies.findOne({_id:edit._id});
    /*The Reply must exist*/
    if(!Reply){
      throw new Meteor.Error('Replies.methods.editReply.ReplyNotFound',
      'The Reply supplied was not found');
    }

    const Thread = Threads.findOne({_id:Reply.thread});
    /*The thread associated with this Reply must exist*/
    if(!Thread){
      throw new Meteor.Error('Replies.methods.editReply.ThreadNotFound',
      'The parent Thread of this Reply was not found');
    }

    /*If the thread is locked, cannot edit the Reply*/
    if(Thread.locked){
      throw new Meteor.Error('Replies.methods.updateThread.locked',
      'This thread is locked and cannot be updated');
    }
    /*Only the Author and admins can edit a Reply*/
    if(!isAuthorOrAdmin(Reply)){
      throw new Meteor.Error('Replies.methods.editReply.notAuthorised',
      'You are not Authorised to take this action');
    }

    Replies.update({_id:edit._id},{$set:{message:edit.message}});

  }
});
