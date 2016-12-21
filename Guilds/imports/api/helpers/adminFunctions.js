export function adminOrAutoInsertNoUpdate(autoVal , self){
  if(self.isInsert){
    if(self.isSet){
      if(Meteor.isServer){
        const adminFound = Admins.findOne({ID:self.userId});
        if(!adminFound){
          return autoVal;
        }
      }
    }else{
      return autoVal;
    }
  }else{
    if(Meteor.isServer){
      const adminFound = Admins.findOne({ID:self.userId});
      if(!adminFound){
        self.unset();
      }
    }
  }
}
