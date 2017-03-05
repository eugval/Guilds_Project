import './userList.html';
import {unBanUser,banUser,upgradeToAdmin} from '/imports/api/accounts/methods.js';

Template.userList.onCreated(function(){
  this.searchValue = new ReactiveVar();

});

Template.userList.helpers({
  users(){
    let searchValue=Template.instance().searchValue.get();
    Meteor.subscribe('Meteor.users.userSearch',searchValue);

    return Meteor.users.find({isAdmin:false});
  },
  isBanned(){
    return this.isBanned;
  }
});

Template.userList.events({
  'keyup input':function(event){
    Template.instance().searchValue.set(event.currentTarget.value);
  },
  'click #upgradeToAdmin':function(event){
    event.preventDefault();
    upgradeToAdmin.call({_id:this._id});
  },
  'click #banUser':function(event){
    event.preventDefault();
    banUser.call({_id:this._id});
  },
  'click #unBanUser':function(event){
    event.preventDefault();
    unBanUser.call({_id:this._id});
  }
})
