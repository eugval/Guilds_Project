import {insertQuest} from '/imports/api/quests/methods.js';
import './addQuestForm.html';


Template.addQuestForm.events({
  'submit .addQuestForm'(event){
    event.preventDefault();
    const title = event.target.addQuestTitle.value;
    const description = event.target.addQuestDescription.value;
    insertQuest.call({title,description},(err) => {
      if (err) {
        console.log("got in the error bit");
        console.log(err);
        window.alert("An error Occured");
      }else{
        console.log("success");
        event.target.addQuestTitle.value="";
        event.target.addQuestDescription.value="";
      }
    }
  );


}
});
