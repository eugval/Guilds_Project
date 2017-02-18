import './pageNotFound.html';


Template.pageNotFound.events({
'click .back-to-homepage':function(event){
  event.preventDefault();
  FlowRouter.go("/");
}
})
