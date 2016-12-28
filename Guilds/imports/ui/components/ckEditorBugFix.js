import './ckEditorBugFix.html';

Template.ckEditorBugFix.onRendered(function(){

  CKEDITOR.replace( 'editThreadDescription' );
CKEDITOR.instances.editThreadDescription.setData(this.data.message);
});
