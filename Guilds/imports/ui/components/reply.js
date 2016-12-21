import './reply.html';


Template.reply.helpers({
  dateCreated(){
    let createdDate = this.createdDate;
    createdDate = createdDate.toISOString().substring(0,10);
    return createdDate;
  },
});
