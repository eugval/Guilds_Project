import {Replies} from '../replies.js';
import {Threads} from '../threads.js';

Meteor.publish('Threads.List',function(options,limit){
  check(options,{
    community:String,
    pinned:Boolean,
  });
  check(limit,Number);

  if(limit===-1){
  return   Threads.find(options,{fields:{message:0},sort:{createdAt:-1}});
  }

  return Threads.find(options,{fields:{message:0},sort:{createdAt:-1},limit:limit});

});

Meteor.publish('Thread.One',function(options){
  check(options,{
    _id:String,
    community:String,
  });

  return Threads.find(options);

});

Meteor.publish('Thread.adminOne',function(options){
  check(options,{
    _id:String,
  });

  if(!this.userId || !Meteor.users.findOne({_id:this.userId}).isAdmin){
    return null;
  }
  return Threads.find(options);

});



Meteor.publish('Replies.List',function(options, limit){
  check(options,{
    thread:String,
  });
    check(limit,Number);
  return Replies.find(options,{sort:{createdAt:-1},limit:limit});

});
