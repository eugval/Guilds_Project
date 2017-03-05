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
    message:"The Discussions forum is a place to ask questions, share your story and look for insights. It is designed for the members of the community to help each other and provide support. Are you lost in your quest for finding passion and purpose? Is there something holding you back from having an awesome adventure? Finding roadblocks to your personal development? This place to  go! "  },
  blog:{
    title:"Inspirational Story Blog",
    message:"This is a place where for sharing  inspirational stories, successes and insights. The intent is to build a knowledge base with the stories of everyone who has accomplished something they are proud of and would like to share the insights they drew from their journey. What were the drawbacks, the struggles? How where they overcome? This aims to be specific and practical, what is the 'I whish someone had told me' list for this endeavour, what where the steps required? Lets build a 'how to' encyclopedia made of our own, real experiences!"  },
  groups:{
    title:"Action Groups Platform",
    message:"At later stages of development we plan on expanding the functionality of our platform to allow for the formation of action groups. People sharing the same goals will be able to come together and organise. Acitvities pursued by these groups could range from organising a hiking trip in Nepal to making a fully featured video game, and will only be limited by the imagination of our users! "  },
  chat:{
    title:"Live Chat",
    message:"We plan on implementing live char functionality for our members! Users of our communities will be able to communicate real time with all the other users that are online. Action groups will also benefit from private chats just for their party."  }
}


export {timeSince,FEATURES}
