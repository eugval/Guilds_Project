Accounts.onCreateUser(function(options,user){


if(options.isAdmin===true){
  user.isAdmin = options.isAdmin;
}else{
  user.isAdmin = false;
}

  return user;
});
