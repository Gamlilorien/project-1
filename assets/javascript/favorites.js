$(document).ready(function() {
  $("input").change(function() {
    if($(this).is(":checked")) {
      console.log("Is checked");
    }
    else {
      console.log("Is Not checked");
    }
  })
});