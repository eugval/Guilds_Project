import {Replies} from '../replies.js';
import {Threads} from '../threads.js';

Threads._ensureIndex({
  "title": "text",
  "message": "text"
});


Meteor.publish('Threads.List',function(options,limit,searchValue){
  check(options,{
    community:String,
    pinned:Boolean,
  });
  check(limit,Number);
  check(searchValue,Match.Maybe(String));

  if(limit< -1){
    return null;
  }
  if(limit===-1){
    return   Threads.find(options,{fields:{message:0},sort:{createdAt:-1}});
  }

  if(!!searchValue){
    let searchOptions ={};
    options.$text={$search:searchValue};
    return Threads.find(options,{fields:{message:0, score: { $meta: "textScore" }},sort:{ score: { $meta: "textScore" }},limit:limit});

  }

  return Threads.find(options,{fields:{message:0},sort:{createdAt:-1},limit:limit});

});


Meteor.publish('Threads.Related',function(limit,searchValue){
  check(limit,Number);
  check(searchValue,String);

  if(limit<0){
    return null;
  }
  console.log("here");
  if(!searchValue){
    return null;
  }
  console.log("here");
  console.log(Threads.find({$text:{$search:searchValue}},{fields:{title:1,author:1,authorName:1,createdAt:1, score: { $meta: "textScore" }},sort:{ score: { $meta: "textScore" }},limit:limit}).fetch());
  return Threads.find({$text:{$search:searchValue}},{fields:{title:1,author:1,authorName:1,createdAt:1, score: { $meta: "textScore" }},sort:{ score: { $meta: "textScore" }},limit:limit});

});


Meteor.publish('Threads.Featured',function(options){
  check(options,{
    community:Match.Maybe(String),
  });

  options.featured=true;

  return Threads.find(options,{fields:{message:0, pinned:0, locked:0, replyNb:0,createdAt:0}});

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
