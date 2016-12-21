import {Schemas} from '../helpers/schemas.js';

export const Quests = new Mongo.Collection('Quests');

Schemas.Quests = new SimpleSchema({
  title:{
    type:String,
    max:200,
    min:10,
  },
  description:{
    type:String,
  },
  createdDate: {
    type:Date,
    defaultValue: new Date(),
  },
  architectID:{
    type:String,
    autoValue: function() {
       if( this.isInsert ) {
           return this.userId ;
       }
   },
  },
  party:{
    type:[String],
    autoValue: function() {
       if( this.isInsert ) {
           return [this.userId] ;
       }
   },
  },
});


Quests.attachSchema(Schemas.Quests);
