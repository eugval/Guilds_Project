import {ContactMessages} from './contactMessages.js';
import {Schemas} from '/imports/api/helpers/schemas.js';
import {isAdmin} from '/imports/api/helpers/adminFunctions.js';


export const insertContactMessage = new ValidatedMethod({
  name:'ContactMessages.methods.insertContactMessage',
  validate:new SimpleSchema([
    Schemas.ContactMessages.collectionSchema,
  ]).validator(),
  run(message){
    ContactMessages.insert(message);
  }
});


export const deleteContactMessage = new ValidatedMethod({
  name:'ContactMessages.methods.deleteContactMessage',
  validate:new SimpleSchema([
    Schemas.ContactMessages.deleteContactMessage,
  ]).validator(),
  run(IDObj){
    if(!isAdmin()){
      throw new Meteor.Error('Threads.methods.deleteContactMessage.notAuthorised',
      'You are not Authorised to take this action');
    }
    ContactMessages.remove(IDobj);
  }
});
