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
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");
        form.find("input, textarea").val(""); // Clear the form
      },
      error: function(response) {
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html("Oops! There was an error. Please try again.");
      }
    });
  });
});