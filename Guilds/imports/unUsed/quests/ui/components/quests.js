import './quests.html';
import {Quests} from '../../api/quests/quests.js';

Template.quests.onCreated(function() {
  this.autorun(()=>{
    this.subscribe('Quests.all');
  });
});

Template.quests.helpers({
quest(){
return Quests.find();
}
});
