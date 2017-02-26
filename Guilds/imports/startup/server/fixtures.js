/*Test data loaded if the database is empty */

import {Threads} from '/imports/api/forum/threads.js';
import {Replies} from '/imports/api/forum/replies.js';
import {COMMUNITIES} from '/imports/api/helpers/communityHelpers.js';

if(Meteor.users.find().count()===0){
  let username ='testuser';

  for (let i=1; i<9; i++){
    username =username+i;
    const userObj= {
      username,
      password:'password',
    }

    Accounts.createUser(userObj);
  }

  for(let i=1; i<4;i++){
    const adminName='Admin'+i;
    let adminObj ={
      username:adminName,
      password:'password',
      isAdmin:true,
      communities:{},
    }
    for (let i=0;i<Object.keys(COMMUNITIES).length;++i){
      adminObj.communities[Object.keys(COMMUNITIES)[i]]=true;
    }

      Accounts.createUser(adminObj);
  }



}

if(Threads.find().count()===0){
  Threads.insert({
    title: "Third thread Passion",
    message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
    pinned:true,
    featured:true,
    locked:true,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4,
    community:"Passion"
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });

  Threads.insert({
    title: "Third thread Passion",
    message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
    pinned:true,
    featured:false,
    locked:true,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4,
    community:"Passion"
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });


    Threads.insert({
      title: "Third thread Adventure",
      message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
      pinned:true,
      featured:false,
      locked:true,
      createdAt: new Date(),
      author: Meteor.users.findOne()._id,
      authorName: Meteor.users.findOne().username,
      replyNb:4,
      community:"Adventure"
    },{bypassCollection2:true},function(error,result){
      if(error){
        console.log(error);
      }
    });


      Threads.insert({
        title: "Third thread Adventure",
        message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
        pinned:true,
        featured:true,
        locked:true,
        createdAt: new Date(),
        author: Meteor.users.findOne()._id,
        authorName: Meteor.users.findOne().username,
        replyNb:4,
        community:"Adventure"
      },{bypassCollection2:true},function(error,result){
        if(error){
          console.log(error);
        }
      });




        Threads.insert({
          title: "Third thread Wisdom",
          message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
          pinned:true,
          featured:false,
          locked:true,
          createdAt: new Date(),
          author: Meteor.users.findOne()._id,
          authorName: Meteor.users.findOne().username,
          replyNb:4,
          community:"Wisdom"
        },{bypassCollection2:true},function(error,result){
          if(error){
            console.log(error);
          }
        });

          Threads.insert({
            title: "Third thread Wisdom",
            message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
            pinned:true,
            featured:true,
            locked:true,
            createdAt: new Date(),
            author: Meteor.users.findOne()._id,
            authorName: Meteor.users.findOne().username,
            replyNb:4,
            community:"Wisdom"
          },{bypassCollection2:true},function(error,result){
            if(error){
              console.log(error);
            }
          });



  for (let i=1; i<40; i++){


  Threads.insert({
    title: "First thread Passion",
    message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
    pinned:false,
    featured:false,
    locked:false,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4,
    community:"Passion"
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });

  Threads.insert({
    title: "Second thread Passion",
    message:"tests tsts test test test rest s test trs tsete st estets tsets etsets ",
    pinned:false,
    featured:false,
    locked:true,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4,
    community:"Passion"
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });

  Threads.insert({
    title: "Third thread Passion",
    message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
    pinned:false,
    featured:false,
    locked:true,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4,
    community:"Passion"
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });

  Threads.insert({
    title: "First thread Adventure",
    message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
    pinned:false,
    featured:false,
    locked:false,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4,
    community:"Adventure"
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });

  Threads.insert({
    title: "Second thread Adventure",
    message:"tests tsts test test test rest s test trs tsete st estets tsets etsets ",
    pinned:false,
    featured:false,
    locked:true,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4,
    community:"Adventure"
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });



  Threads.insert({
    title: "First thread Wisdom",
    message:"test test test tes tes tes te etsts tsgd tfbfssd sd f sd fs f sd f s df s df",
    pinned:false,
    featured:false,
    locked:false,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4,
    community:"Wisdom"
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });

  Threads.insert({
    title: "Second thread Wisdom",
    message:"tests tsts test test test rest s test trs tsete st estets tsets etsets ",
    pinned:false,
    featured:false,
    locked:true,
    createdAt: new Date(),
    author: Meteor.users.findOne()._id,
    authorName: Meteor.users.findOne().username,
    replyNb:4,
    community:"Wisdom"
  },{bypassCollection2:true},function(error,result){
    if(error){
      console.log(error);
    }
  });
}

}



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
