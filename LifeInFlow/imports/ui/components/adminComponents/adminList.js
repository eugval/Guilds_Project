import './adminList.html';
import {demoteAdmin} from '/imports/api/accounts/methods.js';
Template.adminList.onCreated(function(){

  this.autorun(()=>{
    this.subscribe('Meteor.users.Admins');
  });
});

Template.adminList.helpers({
  admins(){
    return Meteor.users.find({isAdmin:true});
  }
});

Template.adminList.events({
  'click #demoteAdmin':function(event){
    event.preventDefault();
    demoteAdmin.call({_id:this._id});
  },
});
