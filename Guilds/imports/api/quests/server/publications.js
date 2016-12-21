import {Quests} from '../quests.js';

Meteor.publish('Quests.all',function(){
  return Quests.find();
});
