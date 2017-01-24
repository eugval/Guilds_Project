import './adminThreadInsert.html';
import {COMMUNITIES} from '/imports/api/helpers/communityHelpers.js';
import {adminInsertThread} from '/imports/api/forum/methods.js';

Template.adminThreadInsert.onRendered(function(){
  $('.addThreadDescription').summernote({
    height: 200,                 // set editor height
    minHeight: 100,             // set minimum height of editor
    maxHeight: 500,             // set maximum height of editor
    focus: true                  // set focus to editable area after initializing summernote
  });
});

Template.adminThreadInsert.onCreated(function(){
  this.insertObj = new ReactiveVar();
});

Template.adminThreadInsert.helpers({
  communities(){
    return COMMUNITIES;
  },
});


Template.adminThreadInsert.events({
  'submit #adminThreadInsertForm':function(event){
    event.preventDefault();
    console.log("starting insert");
    let insertObj ={};

    insertObj.title= $('#adminThreadInsertForm input[name=addThreadTitle]').val();
    insertObj.message =$('.addThreadDescription').summernote('code');
    insertObj.community =$('#adminThreadInsertForm input[name=threadCommunity]:checked').val();
    insertObj.pinned = $('#adminThreadInsertForm input[name=pinned]').is(':checked');
    insertObj.locked = $('#adminThreadInsertForm input[name=locked]').is(':checked');

    const givenUserName=$('#adminThreadInsertForm input[name=existingUserName]').val();
    if($('#adminThreadInsertForm input[name=selfAuthor]').is(':checked')|| givenUserName===''){
      console.log("me");
      insertObj.authorName=Meteor.user().username;


      /*adminInsertThread.call(insertObj,(err)=>{
        if(err){
          console.log("error while inserting thread");
          console.log(err);
        }else{

          console.log("success");
          location.reload();
        }
      });*/

    }else{
      insertObj.authorName=givenUserName;
      /*
      Template.instance().insertObj.set(insertObj);
      Meteor.subscribe('Meteor.users.OneUser', givenUserName,{
        onReady:function(){
                    console.log("OnReady Callback");
          const targetUser = Meteor.users.findOne({username:givenUserName});
          console.log(insertObj);
          console.log(Template.instance());
          let insertObj=Template.instance().insertObj.get();
          insertObj.author = !!targetUser ? targetUser._id : "" ; // if the target user is not found let the method generate the error.
          adminInsertThread.call(insertObj,(err)=>{
            if(err){
              console.log("error while inserting thread");
              console.log(err);
            }else{
              console.log("success");
            }
          });
        }
      });*/
    }
    console.log(insertObj);
    adminInsertThread.call(insertObj,(err)=>{
      if(err){
        console.log("error while inserting thread");
        console.log(err);
      }else{

        console.log("success");
        FlowRouter.go('/admin');
      //  location.reload();
      }
    });

  }
});
