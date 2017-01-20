import {Threads} from '/imports/api/forum/threads.js';

function adminOrAutoInsertNoUpdate(autoVal , self){
  const user = Meteor.user();
  if(self.isInsert){
    if(self.isSet){
        if(!user || !user.isAdmin){
          return autoVal;
        }
    }else{
      return autoVal;
    }
  }else{
      if(!user || !user.isAdmin){
        self.unset();
      }
  }
}

function adminOrInsertNoUpdate(self){
  const user = Meteor.user();
  if (!user){
    return "loggedOut";
  }
  if(!self.isInsert && !user.isAdmin){
    return "onlyAdmin";
  }
}


function isThreadAuthorOrAdmin(threadID){
  const author = Threads.findOne(threadID).author;
  const user = Meteor.user();
  return user.isAdmin || author === user._id;
}


function isAdmin(){
  return Meteor.user().isAdmin;
}


export {adminOrAutoInsertNoUpdate, adminOrInsertNoUpdate, isThreadAuthorOrAdmin, isAdmin};
