/*
*Returns true if the user is an administrator or if the user is the author of
*Collection object presented.
*Returns false otherwise.
*Does not protect against non existant collection object.
*/
function isAuthorOrAdmin(CollectionObj){
  let author="";
  const user = Meteor.user();

  /*If the collection Object is not empty assign the author to its author*/
  if(!!CollectionObj){
    author = CollectionObj.author;
  }

  if(!user){
    return false;
  }
  return user.isAdmin || author === user._id;
}


/*
*Returns true if the user is an admin.
*returns false otherwise.
*Does not work in publish methods.
*/
function isAdmin(){
  const user = Meteor.user();
  if(!user){
    return false
  }
  return user.isAdmin;
}


export {isAuthorOrAdmin, isAdmin};
