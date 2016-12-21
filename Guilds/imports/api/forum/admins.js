import {Schemas} from '../helpers/schemas.js';

export const Admins = new Mongo.Collection('Admins');

Schemas.Admins = new SimpleSchema({
  ID:{
    type:String,
    custom: function(){
      if(this.isServer){
        const userNotFound=Meteor.users.findOne({_id:this.value})==='undefined';
        if(userNotFound){
          return "userNotFound";
        }
        return true;
      }
    }
  },
});


Admins.attachSchema(Schemas.Admins);
