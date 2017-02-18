import './newThread.html';
import {insertThread} from '/imports/api/forum/methods.js';
import {inCommunity,COMMUNITIES} from '/imports/api/helpers/communityHelpers.js';
import '/imports/ui/components/accountComponents/verticalUserOptions.js';
import '/imports/ui/components/helperComponents/errorMessageBox.js';

Template.newThread.onCreated(function(){

  this.formErrorMessage = new ReactiveVar('');

});


Template.newThread.onRendered(function(){

  $('.addThreadDescription').summernote({
    height: 300,
    minHeight: 100,
    maxHeight: 600,
    focus: false ,
toolbar:[
   ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
     ['para', ['ul', 'ol', 'paragraph']],
       ['table', ['table']],
      ['insert', ['link', 'picture']]

],
  disableDragAndDrop: true,
  });


});


Template.newThread.helpers({
  inCommunity(){
    return inCommunity();
  },
  postingTitle(){
    const community=FlowRouter.getParam('community');
    return 'Post in the ' +COMMUNITIES[community]+' Community';
  },
  relatedTopics(){
    const obj={title:"This is a related topic thanks to the to search", authorName:"bazouk555"}
    return [obj,obj,obj,obj];
  },
  errorMessage(){
    return {errorMessage:Template.instance().formErrorMessage.get()};
  }
});

Template.newThread.events({
  'submit #insertThreadForm'(event){
    event.preventDefault();

    $('.insertThreadErrorBox').addClass('hidden');

if(!Meteor.user()){
  $('#signInModal .sign-in-warning').removeClass('hidden');
$('#signInModal').modal('toggle');
return;
}

    /* Grab form values */
    const title = event.target.addThreadTitle.value;
    const message =$('.addThreadDescription').summernote('code');
    const community= FlowRouter.getParam('community');

    insertThread.call({title,message,community},(error)=>{
      if(error){
        /*handle error*/
        console.log(error);
                Template.instance().formErrorMessage.set(error.reason);
        $('.insertThreadErrorBox').removeClass('hidden');

  
      }else{
        /* Clean up form and redirect to forum on success */
        console.log("success");
        event.target.addThreadTitle.value="";
      $('.addThreadDescription').summernote('code','');
        const community=FlowRouter.getParam('community');
        const params ={community};
        FlowRouter.go(`/:community/forum`,params);
      }
    });
  },
  'click .cancelNewThread':function(event){
    event.preventDefault();
    const community=FlowRouter.getParam('community');

    FlowRouter.go('/:community/forum',{community});
  }
})
