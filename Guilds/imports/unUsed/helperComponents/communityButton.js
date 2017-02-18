import './communityButton.html';
import {joinCommunity} from '/imports/api/accounts/methods.js';
import {leaveCommunity} from '/imports/api/accounts/methods.js';
import {inCommunity} from '/imports/api/helpers/communityHelpers.js';

Template.communityButton.helpers({
inCommunity(){
   return inCommunity();
  },
currentCommunity(){
  return  FlowRouter.getParam('community');
}
});

Template.communityButton.events({
  'click #joinCommunity':function(event){
    event.preventDefault();
    community =FlowRouter.getParam('community');
    joinCommunity.call({community});
  },
  'click #leaveCommunity':function(event){
    event.preventDefault();
    community =FlowRouter.getParam('community');
    leaveCommunity.call({community});
  }
});
