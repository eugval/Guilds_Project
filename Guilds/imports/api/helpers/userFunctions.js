/*
*Returns true if any user is logged in, false otherwise.
* Does not work inside publish functions.
*/
function userLoggedIn(){
  return !!Meteor.user();
}

/*
*Returns true is the current logged in user is banned,
*or if there is no current user loggen in.
*False otheriwse.
*Does not work inside publish functions.
*/
function userBannedorOut(){
  const user = Meteor.user();
  if(!user){
    return true;
  }
  return user.isBanned;
}

export {userBannedorOut, userLoggedIn};
