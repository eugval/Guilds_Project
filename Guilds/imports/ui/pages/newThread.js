import './newThread.html';
import {insertThread} from '/imports/api/forum/methods.js';

Template.newThread.events({
  'submit .newThreadForm'(event){
    event.preventDefault();
    /* Grab form values */
    const title = event.target.addThreadTitle.value;
    const message = event.target.addThreadDescription.value;

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
        event.target.addThreadDescription.value="";
        FlowRouter.go('/forum');
      }
    });
  }
})
