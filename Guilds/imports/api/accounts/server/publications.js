Meteor.publish('Meteor.users.isAdminField',function(){

 if(!this.userId){ return null;}

  const options = {
    fields: { isAdmin: 1 }
  };

  return Meteor.users.find({_id:this.userId}, options);
});
