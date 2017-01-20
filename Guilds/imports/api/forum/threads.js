import {Schemas} from '/imports/api/helpers/schemas.js';
import {adminOrAutoInsertNoUpdate} from '/imports/api/helpers/adminFunctions.js'
import {COMMUNITIES} from '/imports/api/helpers/communityHelpers.js';
import {adminOrInsertNoUpdate} from '/imports/api/helpers/adminFunctions.js'
export const Threads = new Mongo.Collection('Threads');

Schemas.Threads ={};
/*
*The collection schema is the overall schema of the collection.
*An update from a logged out user is possible from this schema
*Does not protect agains banned user
*/
Schemas.Threads.collectionSchema = new SimpleSchema({
  title:{
    type:String,
    max:80,
    min:10
  },
  message:{
    type:String,
  },
  pinned:{
    type:Boolean,
    autoValue:function(){
        return adminOrAutoInsertNoUpdate(false, this);
      }
  },
  locked:{
    type:Boolean,
    autoValue:function(){
      return adminOrAutoInsertNoUpdate(false, this);
    }
  },
  replyNb:{
    type:Number,
    autoValue:function(){
      if(this.isInsert){
        return 0;
      }
    }
  },
  authorName:{
    type:String,
    autoValue:function(){
      const user= Meteor.user();
      let username ="";
      if(!!user){
        username = user.username;
      }
      return adminOrAutoInsertNoUpdate(username,this);
    },
  },
  community:{
    type:String,
    custom:function(){
      if(COMMUNITIES.indexOf(this.value)===-1){
        return "inexistentCommunity";
      }
      return adminOrInsertNoUpdate(this);
    }
  },
  createdAt: {
    type:Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    },
  },
  author:{
    type:String,
    autoValue: function() {
      if( this.isInsert ){
        return this.userId ;
      }
    },
    denyUpdate:true,
  },
});

Threads.attachSchema(Schemas.Threads.collectionSchema);

Schemas.Threads.insertThread= new SimpleSchema({
  title:{
    type:String,
    max:80,
    min:10
  },
  message:{
    type:String,
  },
  community:{
    type:String,
  },

})

Schemas.Threads.updateThread= new SimpleSchema({
  _id:{
    type:String,
  },
  title:{
    type:String,
    max:80,
    min:10
  },
  message:{
    type:String,
  },
});


Schemas.Threads.threadPinUpdate = new SimpleSchema({
  _id:{
    type:String,
  },
  pinValue:{
    type:Boolean,
  }
});

Schemas.Threads.threadLockUpdate =new SimpleSchema({
  _id:{
    type:String,
  },
  lockValue:{
    type:Boolean,
  }
});
