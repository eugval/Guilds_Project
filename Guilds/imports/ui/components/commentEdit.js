import './commentEdit.html';


Template.commentEdit.onRendered(function(){
  CKEDITOR.replace( 'editComment' );
  CKEDITOR.instances.editComment.setData(this.data.message);
});
