import {Threads} from '../forum/threads.js';

export function adminOrAutoInsertNoUpdate(autoVal , self){
  const isAdmin = Meteor.users.findOne({_id:self.userId}).isAdmin;
  if(self.isInsert){
    if(self.isSet){
      if(Meteor.isServer){
        if(!isAdmin){
          return autoVal;
        }
      }
    }else{
      return autoVal;
    }
  }else{
    if(Meteor.isServer){
      if(!isAdmin){
        self.unset();
      }
    }
  }
}

export function isThreadAuthorOrAdmin(threadID){
  const author = Threads.findOne(threadID).author;
  const user = Meteor.user();
  return user.isAdmin || author === user._id;
}
