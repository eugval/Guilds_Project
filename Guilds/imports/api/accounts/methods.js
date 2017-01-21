import {COMMUNITIES} from '/imports/api/helpers/communityHelpers.js';
import {userLoggedIn, isAdmin} from '/imports/api/helpers/userFunctions.js';

/*Methods for all users*/

export const joinCommunity = new ValidatedMethod({
  name: 'Meteor.users.joinCommunity',
  validate: new SimpleSchema({
    community:{
      type:String,
    }
  }).validator(),
  run(options){
    /*User must be logged in to join a community*/
    if(!userLoggedIn()){
      throw new Meteor.Error('Meteor.users.joinCommunity.notLoggedIn',
            'Must be logged in to join a Community.');
    }

    /*Community must exist*/
    if(COMMUNITIES.indexOf(options.community)===-1){
      throw new Meteor.Error('Meteor.users.joinCommunity.communityNotFound',
    'This community does not exist');
    }

    /*prepare the update object*/
    const user = Meteor.user();
    let updateObj =user.communities;
    updateObj[options.community]=true;

    /*update the database*/
    Meteor.users.update({_id:Meteor.user()._id},{$set:{communities:updateObj}});
  }
});



export const leaveCommunity = new ValidatedMethod({
  name: 'Meteor.users.leaveCommunity',
  validate: new SimpleSchema({
    community:{
      type:String,
    }
  }).validator(),
  run(options){

    /*User must be logged in to leave a community*/
    if(!userLoggedIn()){
      throw new Meteor.Error('Meteor.users.leaveCommunity.notLoggedIn',
            'Must be logged in to leave a Community.');
    }

    /*Community must exist*/
    if(COMMUNITIES.indexOf(options.community)===-1){
      throw new Meteor.Error('Meteor.users.leaveCommunity.communityNotFound',
    'This community does not exist');
    }

    /*prepare the update object*/
    const user = Meteor.user();
    let updateObj =user.communities;
    updateObj[options.community]=false;

    /*update the database*/
    Meteor.users.update({_id:Meteor.user()._id},{$set:{communities:updateObj}});
  }
});





/*Admin methods*/

export const upgradeToAdmin = new ValidatedMethod({
  name:'Meteor.users.upgradeToAdmin',
  validate: new SimpleSchema({
    _id:{
      type:String,
    }
  }).validator(),
  run(options){
    /*An admin must be logged in */
    if(!isAdmin()){
      throw new Meteor.Error('Meteor.users.upgradeToAdmin.notAuthorised',
            'You are not Authorised to take this action');
    }

    /*The user to be upgraded must exist*/
    if(!Meteor.users.findOne({_id:options._id})){
      throw new Meteor.Error('Meteor.users.upgradeToAdmin.userNotFound',
            'The user was not found.');
    }

    /*prepare updates object : admin must be in all communities*/
    let updates={isAdmin:true, communities:{}}
    for (let i=0;i<COMMUNITIES.length;++i){
      updates.communities[COMMUNITIES[i]]=true;
    }


    Meteor.users.update({_id:options._id},{$set:updates});
  }
});


export const demoteAdmin = new ValidatedMethod({
  name:'Meteor.users.demoteAdmin',
  validate: new SimpleSchema({
    _id:{
      type:String,
    }
  }).validator(),
  run(options){
    /*An admin must be logged in */
    if(!isAdmin()){
      throw new Meteor.Error('Meteor.users.demoteAdmin.notAuthorised',
            'You are not Authorised to take this action');
    }

    /*Target user must exist*/
    if(!Meteor.users.findOne({_id:options._id})){
      throw new Meteor.Error('Meteor.users.demoteAdmin.userNotFound',
            'The user was not found.');
    }

    Meteor.users.update({_id:options._id},{$set:{isAdmin:false}});
  }
});


export const banUser=new ValidatedMethod({
  name:'Meteor.users.banUser',
  validate: new SimpleSchema({
    _id:{
      type:String,
    }
  }).validator(),
  run(options){
    /*User must be an admin*/
    if(!isAdmin()){
      throw new Meteor.Error('Meteor.users.banUser.notAuthorised',
            'You are not Authorised to take this action');
    }
    /*Target user must exist*/
    if(!Meteor.users.findOne({_id:options._id})){
      throw new Meteor.Error('Meteor.users.banUser.userNotFound',
            'The user was not found.');
    }

    Meteor.users.update({_id:options._id},{$set:{isBanned:true}});

  }
});


export const unBanUser=new ValidatedMethod({
  name:'Meteor.users.unBanUser',
  validate: new SimpleSchema({
    _id:{
      type:String,
    }
  }).validator(),
  run(options){
    /*User must be an admin*/
    if(!isAdmin()){
      throw new Meteor.Error('Meteor.users.unBanUser.notAuthorised',
            'You are not Authorised to take this action');
    }

    /*Target user must exist*/
    if(!Meteor.users.findOne({_id:options._id})){
      throw new Meteor.Error('Meteor.users.unBanUser.userNotFound',
            'The user was not found.');
    }

    Meteor.users.update({_id:options._id},{$set:{isBanned:false}});

  }
});
