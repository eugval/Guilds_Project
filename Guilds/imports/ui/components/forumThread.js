import './forumThread.html';


Template.forumThread.helpers({
  IDLink(){
    return `forum/${this._id}`;
  },
  dateInserted(){
    let createdDate = this.createdDate;
    createdDate = createdDate.toISOString().substring(0,10);
    return createdDate;
  }
});
