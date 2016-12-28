import './forumThread.html';


Template.forumThread.helpers({
  IDLink(){
    return `forum/${this._id}`;
  },
  dateInserted(){
    let createdAt = this.createdAt;
    createdAt = createdAt.toISOString().substring(0,10);
    return createdAt;
  }
});
