import {ContactMessages} from '../contactMessages.js'
import {isAdmin} from '/imports/api/helpers/adminFunctions.js'

Meteor.publish('ContactMessages.List',function(){
  if(!this.userId || !Meteor.users.findOne({_id:this.userId}).isAdmin){
    return null;
  }

return ContactMessages.find({});

});
