Meteor.publish('Meteor.users.isAdminField',function(){

 if(!this.userId){ return null;}

  const options = {
    fields: { isAdmin: 1 }
  };

  return Meteor.users.find({_id:this.userId}, options);
});


Meteor.publish('Meteor.users.Admins',function(){
  return Meteor.users.find({isAdmin:true});
});

Meteor.publish('Meteor.users.AllUsers',function(){
   if(!this.userId){
     return null;
   }
  if(!Meteor.users.findOne({_id:this.userId}).isAdmin){
    return null;
  }

  return Meteor.users.find({});
})
