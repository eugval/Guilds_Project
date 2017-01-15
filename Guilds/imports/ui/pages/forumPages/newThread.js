import './newThread.html';
import {insertThread} from '/imports/api/forum/methods.js';

Template.newThread.onRendered(function(){
  $('#addThreadDescription').summernote({
    height: 200,                 // set editor height
    minHeight: 100,             // set minimum height of editor
    maxHeight: 500,             // set maximum height of editor
    focus: true                  // set focus to editable area after initializing summernote
  });
});



Template.newThread.events({
  'submit .newThreadForm'(event){
    event.preventDefault();
    /* Grab form values */
    const title = event.target.addThreadTitle.value;
    const message =$('#addThreadDescription').summernote('code');
    console.log(message);
    insertThread.call({title,message},(err)=>{
      if(err){
        /*handle error*/
        /*TODO: Display error messages on the form*/
        console.log("error while inserting thread");
        console.log(err);
      }else{
        /* Clean up form and redirect to forum on success */
        console.log("success");
        event.target.addThreadTitle.value="";
      $('#addThreadDescription').summernote('code','');

        FlowRouter.go('/forum');
      }
    });
  }
})
