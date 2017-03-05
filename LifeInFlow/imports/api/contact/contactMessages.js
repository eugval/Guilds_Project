import {Schemas} from '/imports/api/helpers/schemas.js';

export const ContactMessages = new Mongo.Collection('ContactMessages');

Schemas.ContactMessages={};

Schemas.ContactMessages.collectionSchema = new SimpleSchema({
  name:{
    type:String,
    label:"Name"
  },
  message:{
    type:String,
    label:"Message",
  },
  email:{
    type:String,
    label:"Email",
    regEx:SimpleSchema.RegEx.Email,
  }
});


ContactMessages.attachSchema(Schemas.ContactMessages.collectionSchema);


Schemas.ContactMessages.deleteContactMessage= new SimpleSchema({
  _id:{
    type:String,
    label:"ID",
  },
});
