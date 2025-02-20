jQuery(document).ready(function($) {
  "use strict";

  // Contact Form Submission
  $('form.contactForm').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    var form = $(this); // Current form
    var url = form.attr('action'); // Formspree or other endpoint

    // Validate form fields before submission
    var ferror = false;
    var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    form.find('input, textarea').each(function() {
      var i = $(this); // Current input/textarea
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // Error flag for current input
        var pos = rule.indexOf(':', 0);
        var exp = pos >= 0 ? rule.substr(pos + 1) : '';

        switch (rule.split(':')[0]) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            if (!new RegExp(exp).test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }

        // Display validation message
        i.next('.validation').html((ierror ? (i.attr('data-msg') || 'Invalid input') : '')).show('blind');
      }
    });

    // If there are validation errors, stop submission
    if (ferror) return false;

    // Submit form via AJAX
    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      dataType: "json",
      success: function(response) {
        // Show success message
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");

        // Manually clear each field
        form.find('input[type="text"]').val(''); // Clear text inputs
        form.find('input[type="email"]').val(''); // Clear email input
        form.find('textarea').val(''); // Clear textarea

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

    return false; // Prevent default form submission
  });
});