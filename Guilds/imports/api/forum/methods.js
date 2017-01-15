import {Threads} from './threads.js'
import {Schemas} from '../helpers/schemas.js';
import {Replies} from './replies.js';
import {isThreadAuthorOrAdmin} from '../helpers/adminFunctions.js';


export const insertThread = new ValidatedMethod({
  name:'Threads.methods.insertThread',
  validate: new SimpleSchema([
    Schemas.Threads.clientSupplied,
  ]).validator(),
  run(thread){
    if(!this.userId){
      throw new Meteor.Error('Threads.methods.insertThread.notLoggedIn',
      'Must be logged in to submit threads.');
    }
    Threads.insert(thread);
    }
});

export const updateThread = new ValidatedMethod({
    name:'Threads.methods.updateThread',
  validate: new SimpleSchema([
    Schemas.Threads.clientSupplied,
    {_id:{
      type:String
    }}
  ]).validator(),
  run(options){
    if(!this.userId){
      throw new Meteor.Error('Threads.methods.insertThread.notLoggedIn',
      'Must be logged in to submit threads.');
    }

    if(!isThreadAuthorOrAdmin(options._id) ){
      throw new Meteor.Error('Threads.methods.insertThread.notAllowed',
      'You are not allowed to take this action.');
    }


    Threads.update(options._id,{$set:options});
  }
});


export const insertReply =  new ValidatedMethod({
  name: 'Replies.methods.insertReply',
  validate: new SimpleSchema([
     Schemas.Replies.clientSupplied,
  ]).validator(),
  run(reply){
    if(!this.userId){
      throw new Meteor.Error('Replies.methods.insertReply.notLoggedIn',
      'Must be logged in to submit threads.');
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
    if(!this.userId){
      throw new Meteor.Error('Replies.methods.editReply.notLoggedIn',
      'Must be logged in to submit threads.');
    }

    if(Meteor.isServer){
      if(!Replies.findOne({_id:edit._id, author:this.userId}) && !Meteor.user().isAdmin){
        throw new Meteor.Error('Replies.methods.editReply.notAuthorised','You are not Authorised to take this action');
      }
    }

    Replies.update({_id:edit._id},{$set:{message:edit.message}});


  }
});
