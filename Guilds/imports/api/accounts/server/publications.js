Meteor.publish(null,function(){

 if(!this.userId){ return null;}

  const options = {
    fields: { isAdmin: 1, communities:1, isBanned:1 }
  };

  return Meteor.users.find({_id:this.userId}, options);
});


Meteor.publish('Meteor.users.Admins',function(){
  const options={
    fields:{username:1,isBanned:1,isAdmin:1,communities:1}
  }

  if(!this.userId || !Meteor.users.findOne({_id:this.userId}).isAdmin){
    return null;
  }

  return Meteor.users.find({isAdmin:true},options);
});


Meteor.publish("Meteor.users.userSearch",function(searchValue){
  const options={
        fields:{username:1,isBanned:1,isAdmin:1,communities:1}
  }

  if(!this.userId || !Meteor.users.findOne({_id:this.userId}).isAdmin){
    return null;
  }

  if(!searchValue){
    return Meteor.users.find({},options);
  }

  return Meteor.users.find({username:{$regex:searchValue,$options:'i'}},options);

});



Meteor.publish("Meteor.users.OneUser",function(username){
  const options={
        fields:{username:1}
        }
  if(!this.userId || !Meteor.users.findOne({_id:this.userId}).isAdmin){
    return null;
  }
  if(!username){
    return null;
  }
  return Meteor.users.find({username});

  });

/*Meteor.publish('Meteor.users.isAdminField',function(){

 if(!this.userId){ return null;}

  const options = {
    fields: { isAdmin: 1 }
  };

  return Meteor.users.find({_id:this.userId}, options);
});



Meteor.publish('Meteor.users.AllUsers',function(){
   if(!this.userId){
     return null;
   }
  if(!Meteor.users.findOne({_id:this.userId}).isAdmin){
    return null;
  }

  const options={
    fields:{isBanned:1,isAdmin:1}
  }
  return Meteor.users.find({},options);
});
*/
