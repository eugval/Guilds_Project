/*Test data loaded if the database is empty */

import {Threads} from '/imports/api/forum/threads.js';
import {Replies} from '/imports/api/forum/replies.js';


if(Meteor.users.find().count()===0){
  Accounts.createUser({username:'testuser1',password:'password'});
  Accounts.createUser({username:'Admin1',password:'password',isAdmin:true});


}

if(Threads.find().count()===0){
  Threads.insert({
    title: "First thread",
    message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
    pinned:false,
    locked:false,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });

  Threads.insert({
    title: "Second thread",
    message:"tests tsts test test test rest s test trs tsete st estets tsets etsets ",
    pinned:false,
    locked:true,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });

  Threads.insert({
    title: "Third thread",
    message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
    pinned:true,
    locked:true,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });
}


/*
while(Replies.find().count()<=0){
if(Threads.find().count()>0){
addFixtureReplies();
}else{
setTimeout(100);
}
}
*/
if(Replies.find().count()===0){
  const threadArray = Threads.find().fetch();

  for (let i=0; i< threadArray.length;i++){
    Replies.insert({
      message:"This is a super duper reply",
      thread:threadArray[i]._id,
      author: Meteor.users.findOne()._id,
      authorName: Meteor.users.findOne().username,
      createdAt: new Date(),
    },{bypassCollection2:true},function(error,result){
      if(error){
        console.log(error);
      }
    });

    Replies.insert({
      message:"This is a super duper reply",
      thread:threadArray[i]._id,
      author: Meteor.users.findOne()._id,
      authorName: Meteor.users.findOne().username,
      createdAt: new Date(),
    },{bypassCollection2:true},function(error,result){
      if(error){
        console.log(error);
      }
    });

    Replies.insert({
      message:"This is a super duper reply",
      thread:threadArray[i]._id,
      author: Meteor.users.findOne()._id,
      authorName: Meteor.users.findOne().username,
      createdAt: new Date(),
    },{bypassCollection2:true},function(error,result){
      if(error){
        console.log(error);
      }
    });

    Replies.insert({
      message:"This is a super duper reply",
      thread:threadArray[i]._id,
      author: Meteor.users.findOne()._id,
      authorName: Meteor.users.findOne().username,
      createdAt: new Date(),
    },{bypassCollection2:true},function(error,result){
      if(error){
        console.log(error);
      }
    });

  }

}
