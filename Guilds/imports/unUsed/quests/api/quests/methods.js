import {Quests} from './quests.js';

export const insertQuest = new ValidatedMethod({
  name:'Quests.methods.insertQuest',
  validate: new SimpleSchema({
    title:{
      type:String,
      min:10,
      max:200
    },
    description:{
      type:String
    }
  }).validator(),
  run(quest){
    if(!this.userId){
      throw new Meteor.Error('Quests.methods.insertQuest.notLoggedIn',
      'Must be logged in to submit quests.');
    }

    Quests.insert(quest);

  }
});
