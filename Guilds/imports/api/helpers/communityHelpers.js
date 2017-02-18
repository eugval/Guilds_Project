/*
*Returns true if the community of the URL is the community of the logged in user
*False otherwise.
*Cannot be used in publish funcitons
*/
function inCommunity(){
  const community = FlowRouter.getParam('community');
  const user =Meteor.user();
  if(!user){
    return false;
  }
  return user.communities[community];
}

/*Object including all the communities of the website and a label for the communities
const COMMUNITIES ={
  Passion: "Passion",
  Adventure : "Adventure",
  Wisdom:"Self Improvement"
};
*/

const COMMUNITIES ={
  Passion: "Passion",
  Adventure : "Adventure",
  Wisdom:"Wisdom"
};

export {COMMUNITIES, inCommunity};
