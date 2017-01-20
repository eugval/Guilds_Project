import {Replies} from '../replies.js';
import {Threads} from '../threads.js';

Meteor.publish('Threads.List',function(options,limit){
  check(options,{
    community:String
  });
  check(limit,Number);

  return Threads.find(options,{fields:{message:0},sort:{createdAt:-1},limit:limit});

});

Meteor.publish('Thread.One',function(options){
  check(options,{
    _id:String,
  });

  return Threads.find(options);

});


Meteor.publish('Replies.List',function(options, limit){
  check(options,{
    thread:String,
  });
    check(limit,Number);
  return Replies.find(options,{sort:{createdAt:-1},limit:limit});

});
