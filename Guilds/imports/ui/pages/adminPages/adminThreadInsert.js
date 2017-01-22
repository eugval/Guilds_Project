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
  'submit .adminThreadInsertForm':function(event){
    event.preventDefault();
    let insertObj ={};

    insertObj.title= $('#adminThreadInsertForm input[name=addThreadTitle]').val();
    insertObj.message =$('.addThreadDescription').summernote('code');
    insertObj.community =$('#adminThreadInsertForm input[name=threadCommunity]:checked').val();
    insertObj.pinned = $('#adminThreadInsertForm checkbox[name=pinned]').is(':checked');
    insertObj.locked = $('#adminThreadInsertForm checkbox[name=locked]').is(':checked');


    const givenUserName=$('#adminThreadInsertForm input[name=existingUserName]').val();
    if($('#adminThreadInsertForm checkbox[name=selfAuthor]').is(':checked')|| givenUserName===''){
      insertObj.author=Meteor.userId();

      adminInsertThread.call(insertObj,(err)=>{
        if(err){
          /*handle error*/
          /*TODO: Display error messages on the form*/
          console.log("error while inserting thread");
          console.log(err);
        }else{
          /* Clean up form and redirect to forum on success */
          console.log("success");
        }
      });

    }else{
      Template.instance().insertObj.set(insertObj);
      Meteor.subscribe('Meteor.users.OneUser', givenUserName,{ /*TODO: see what happens with stopping the subscription and if I need to do it*/
        onReady:function(){
          const targetUser = Meteor.users.findOne({username:givenUserName});
          let insertObj=Template.instance().insertObj.get();
          insertObj.author = !!targetUser ? targetUser._id : "" ; // if the target user is not found let the method generate the error.
          adminInsertThread.call(insertObj,(err)=>{
            if(err){
              /*handle error*/
              /*TODO: Display error messages on the form*/
              console.log("error while inserting thread");
              console.log(err);
            }else{
              /* Clean up form and redirect to forum on success */
              console.log("success");
            }
          });
        }
      });
    }
  }
});
