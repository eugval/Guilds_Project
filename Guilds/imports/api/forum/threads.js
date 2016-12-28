import {Schemas} from '../helpers/schemas.js';
import {adminOrAutoInsertNoUpdate} from '../helpers/adminFunctions.js'


export const Threads = new Mongo.Collection('Threads');

Schemas.Threads ={};
Schemas.Threads.clientSupplied = new SimpleSchema({
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
    optional:true,
    autoValue:function(){
      return adminOrAutoInsertNoUpdate(false, this);
    }
  },
  locked:{
    type:Boolean,
    optional:true,
    autoValue:function(){
      return adminOrAutoInsertNoUpdate(false, this);
    }
  },
  replyNb:{
    type:Number,
    optional:true,
    autoValue:function(){
      if(this.isInsert){
        return 0;
      }
    }
  },
  authorName:{
    type:String,
    optional:true,
    autoValue:function(){
      const user = Meteor.users.findOne({_id:this.userId});
      return adminOrAutoInsertNoUpdate(user.username,this);
    },
  },

});



Schemas.Threads.automatic=new SimpleSchema({
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


Threads.attachSchema(Schemas.Threads.clientSupplied);
Threads.attachSchema(Schemas.Threads.automatic);
