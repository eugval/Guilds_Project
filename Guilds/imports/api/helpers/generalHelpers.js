function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " min";
    }
    return Math.floor(seconds) + " sec";
}


const FEATURES={
  forum:{
    title:"Discussions Forum",
    message:"Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum Discussions Forum ",
  },
  blog:{
    title:"Inspirational Story Blog",
    message:"Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog Inspirational Story Blog ",
  },
  groups:{
    title:"Action Groups Platform",
    message:"Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform Action Groups Platform ",
  },
  chat:{
    title:"Live Chat",
    message:"Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat Live Chat ",
  }
}


export {timeSince,FEATURES}
