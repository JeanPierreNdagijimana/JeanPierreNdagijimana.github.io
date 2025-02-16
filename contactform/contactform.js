jQuery(document).ready(function($) {
  "use strict";

  // Contact Form Submission
  $('form.contactForm').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    var form = $(this);
    var url = form.attr('action');

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      dataType: "json",
      success: function(response) {
        // Show success message
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");

        // Clear the form fields
        form[0].reset(); // This resets the form

        // Optionally, clear validation messages
        form.find('.validation').html('').hide();
      },
      error: function(response) {
        // Show error message
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html("Oops! There was an error. Please try again.");
      }
    });
  });
});