import './signInModal.html';
import '/imports/ui/components/accountComponents/signInUpForm.js';



Template.signInModal.events({
  'hide.bs.modal #signInModal':function(event){
      $('#signInModal .sign-in-warning').addClass('hidden');
    $('#modalsignInUpErrorBox').addClass('hidden');
    $('#modalSignInForm').trigger("reset");
    $('#modalSignUpForm').trigger("reset");

  },
});
