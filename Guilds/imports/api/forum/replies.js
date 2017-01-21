import {Schemas} from '/imports/api/helpers/schemas.js';
import {Threads} from '/imports/api/forum/threads.js';


export const Replies = new Mongo.Collection('Replies');
Schemas.Replies ={};

/*
*The collection schema is the overall schema of the collection.
*Only protects for data consistency.
*Does not protect against malitious collection manipulations.
*/
Schemas.Replies.collectionSchema = new SimpleSchema({
  thread:{
    type:String,
    label:"Thread",
    custom:function(){
      /*The thread must exist in the database*/
      if(Meteor.isServer){
        if(!Threads.findOne({_id:this.value})){
          return "notFound";
        }
      }
    }
  },
  message:{
    type:String,
  },
  authorName:{
    type:String,
    label:"Author's Name",
    custom:function(){
        /*The author name must be the username of the author's user object*/
      if(Meteor.isServer){
        const ID = this.field('author').value;
        const user = Meteor.users.findOne({_id:ID});
        if(!user || user.username !=this.value){
          return "userInconsistency";
        }
      }
    },
  },
  author:{
    type:String,
    label:"Author",
  },
  createdAt: {
    type:Date,
    label:"Date Created",
    denyUpdate:true,
  },
});

Replies.attachSchema(Schemas.Replies.collectionSchema);

/*Manipulation Schemas*/
/*
*Schemas used in the methods that manipulate replies.
*They verify the consitency of the arguments provided to the methods.
*Malicious manipulation of the data left to the methods.
*These schemas have the same name as the method they are used in
*/

 Schemas.Replies.insertReply= new SimpleSchema({
   thread:{
     type:String,
     label:"Thread",
   },
   message:{
     type:String,
     label:"Message",
   }

 });

Schemas.Replies.editReply = new SimpleSchema({
  _id:{
    type:String,
    label:"Reply ID",
  },
  message:{
    type:String,
    label:"Reply's message",
  }
});
