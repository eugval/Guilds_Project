import './userMessageList.html'
import {ContactMessages} from '/imports/api/contact/contactMessages.js';


Template.userMessageList.onCreated(function(){
  this.autorun(()=>{
    this.subscribe("ContactMessages.List");
  });
});


Template.userMessageList.helpers({
  userMessages(){
    return ContactMessages.find();
  }
});


Template.userMessageList.events({
  'click .list-group-item':function(event){
    event.preventDefault();
    if($(event.target).hasClass('unfolding-message')){
      $(event.target).removeClass('unfolding-message');
    }else{
      $(event.target).addClass('unfolding-message');
    }
  },
})
