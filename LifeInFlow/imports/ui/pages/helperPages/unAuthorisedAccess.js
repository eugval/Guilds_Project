import './unAuthorisedAccess.html';


Template.unAuthorisedAccess.events({
  'click .back-to-homepage':function(event){
    event.preventDefault();
    FlowRouter.go("/");
  }
})
