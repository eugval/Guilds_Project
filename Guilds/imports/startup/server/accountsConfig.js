Accounts.onCreateUser(function(options,user){


if(options.isAdmin===true){
  user.isAdmin = options.isAdmin;
}else{
  user.isAdmin = false;
}

if(options.isBanned===true){
  user.isBanned =options.isBanned;
}else{
  user.isBanned=false;
}

if(!options.communities){
  user.communities ={};
}
  return user;
});
