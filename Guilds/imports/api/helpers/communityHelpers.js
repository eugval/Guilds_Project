function inCommunity(){
  const community = FlowRouter.getParam('community');
  return Meteor.user().communities[community];
}

const COMMUNITIES =["LifePlan","Yolo","PersonalDev"];


export {COMMUNITIES, inCommunity};
