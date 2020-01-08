$(document).ready(function() {
  $(".select2").select2();
  $('.timepicker').timepicker({
    showMeridian: false,
    showInputs: false
  });

  $("#work_time, #time_start").change(function() {
    var time_start  = $("#time_start").val();
    var time_work   = $("#work_time").val();
    if(time_work != "") {
      var tsar        = time_start.split(":");
      var twar        = time_work.split(".");
      var tesghv = ((parseInt(tsar[0])+parseInt(twar[0])) < 24)? parseInt(tsar[0])+parseInt(twar[0]): parseInt(tsar[0])+parseInt(time_work)-24;
      var tesgmv = 0;
      if(typeof twar[1] !== 'undefined') {
        if((parseInt(tsar[1]) + (60*parseInt(twar[1]))/10) < 60)
          tesgmv = parseInt(tsar[1]) + (60*parseInt(twar[1])/10);
        else {
          tesgmv = parseInt(tsar[1]) + (60*parseInt(twar[1])/10) - 60;
          tesghv+= 1;
        }
      } else {
        tesgmv  = parseInt(tsar[1]);
      }
      var tesgv = tesghv+":"+tesgmv;
    } else  tesgv = time_start;
    $('#time_end').timepicker('setTime', tesgv);
  });

  // defaultTime
  $("#project_id").change(function() {
    if($(this).val() == 1) {
      $("#project_suggest_group").removeClass('hide');
    } else {
      $("#project_suggest_group").addClass('hide');
    }
  });

  $("#cb_project_suggest").change(function() {
      if($(this).is(":checked")) {
          $("#project_suggest").removeAttr('disabled');
      } else {
          $("#project_suggest").attr('disabled','disabled');
      }
  });
});