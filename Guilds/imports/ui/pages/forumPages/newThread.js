import './newThread.html';
import {insertThread} from '/imports/api/forum/methods.js';
import {inCommunity} from '/imports/api/helpers/communityHelpers.js';
import '/imports/ui/components/helperComponents/communityButton.js';

Template.newThread.onRendered(function(){
  $('.addThreadDescription').summernote({
    height: 200,                 // set editor height
    minHeight: 100,             // set minimum height of editor
    maxHeight: 500,             // set maximum height of editor
    focus: true                  // set focus to editable area after initializing summernote
  });
});


Template.newThread.helpers({
  inCommunity(){
    return inCommunity();
  }
})

Template.newThread.events({
  'submit #insertThreadForm'(event){
    event.preventDefault();
    /* Grab form values */
    const title = event.target.addThreadTitle.value;
    const message =$('.addThreadDescription').summernote('code');
    const community= FlowRouter.getParam('community');

    insertThread.call({title,message,community},(err)=>{
      if(err){
        /*handle error*/
        /*TODO: Display error messages on the form*/
        console.log("error while inserting thread");
        console.log(err);
      }else{
        /* Clean up form and redirect to forum on success */
        console.log("success");
        event.target.addThreadTitle.value="";
      $('.addThreadDescription').summernote('code','');
        const community=FlowRouter.getParam('community');
        const params ={community};
        FlowRouter.go(`/:community/forum`,params);
      }
    });
  }
})
