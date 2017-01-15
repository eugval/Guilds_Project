export const upgradeToAdmin = new ValidatedMethod({
  name:'Meteor.users.upgradeToAdmin',
  validate: new SimpleSchema({
    _id:{
      type:String,
    }
  }).validator(),
  run(options){
    if(!Meteor.user().isAdmin){
      throw new Meteor.Error('Meteor.users.upgradeToAdmin.notAuthorised',
            'You are not Authorised to take this action');
    }
    if(!Meteor.users.findOne(_id:options._id)){
      throw new Meteor.Error('Meteor.users.upgradeToAdmin.userNotFound',
            'The user was not found.');
    }

    Meteor.users.update({_id:options._id},{$set:{isAdmin:true}});

  }
})
