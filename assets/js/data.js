// Validate forms
var validated = false;
var $sections = $(".form-section");
var last_count;
var token = null;

function navigateTo(index) {
  // Mark the current section with the class 'current'
  $sections
    .removeClass("current")
    .eq(index)
    .addClass("current");
  // Show only the navigation buttons that make sense for the current section:
  $(".form-navigation .previous").toggle(index > 0);
  var atTheEnd = index >= $sections.length - 1;
  $(".form-navigation .next").toggle(!atTheEnd);
  $(".form-navigation [type=submit]").toggle(atTheEnd);
}

function curIndex() {
  // Return the current index by looking at which section has the class 'current'
  return $sections.index($sections.filter(".current"));
}

// Previous button is easy, just go back
$(".form-navigation .previous").click(function() {
  navigateTo(curIndex() - 1);
});

// Next button goes forward iff current block validates
$(".form-navigation .next").click(function() {
  $sections = $(".form-section");
  $(".demo-form")
    .parsley()
    .whenValidate({
      group: "block-" + curIndex()
    })
    .done(function() {
      navigateTo(curIndex() + 1);
      validated = true;
    });
});

// Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
$sections.each(function(index, section) {
  $(section)
    .find(":input")
    .attr("data-parsley-group", "block-" + index);
});
navigateTo(0); // Start at the beginning

var current_section = "";
var current_index = 0;
var current_question = "";
var conditonal_questions_complete = false;
var option_7D_selected = false;
var question_7_completed = false;
var minimum_2_selected = false;
var section_9_completed = false;
var appendCheckbox = false;
var sameChildAppended = false;
var event_click_next2 = false;
var all_options_selected = false;
var group1 = false;
var group2 = false;
var group3 = false;
var input10kapassed = true;
var progressBarReset = false;
var i = 1;
var j = 1;
var section_7a_completed = false;
var checkStatus = false;
var question_no = 1;
var existingData = "";
var isExistingUser = false;
var jsonCount = 0;
var currentWidth = 0;
var t = 1;
// var ajax_url = 'http://projectleapp.com/rest';
// var ajax_url = 'http://devshare.noesis.tech/rest';
var ajax_url = "https://cmt.projectleapp.com/rest";
var beta_thankyou_url = "https://www.projectleapp.com/betaThankyou.html";
var beta_thankyou_url = "https://www.projectleapp.com/betaThankyou.html";
var alpha_thankyou_url = "https://www.projectleapp.com/thankyou.html";
var alpha_thankyou_url = "https://www.projectleapp.com/thankyou.html";
var registration_url = "https://www.projectleapp.com/register.html";
var lead_form_url = "https://www.projectleapp.com/";
var check_7 = false;
// var mobile = $("input[name=phone]").val();
// var email = $("input[name=email]").val();

$.getJSON("./assets/js/new.json", resp => {
  respdata = resp;
  $(".registration-form").on("click", ".reg_form_next", function(event) {
    event.preventDefault();
    var ans_obj = {};
    ans_obj.element = jQuery(this);
    ans_obj.next = jQuery(this).data("next");
    ans_obj.current_section = jQuery(this).data("section");
    ans_obj.current_index = jQuery(this).data("index");
    ans_obj.data = jQuery(this).data();
    if (validated) {
      storeDataOnNext(ans_obj);
    }

    // Send otp uncomment
    // if(!validateRecaptcha()){
    //     tryAgain("Captcha validation is remaining");
    //     return false;
    // }

    if (event.currentTarget.name === "next1") {
      //progress bar update
      event_click_next2 = false;
      if (!validateRecaptcha()) {
        tryAgain("Captcha validation is remaining");
        return false;
      }

      if (checkStatus == false || checkStatus == undefined) {
        if (!$("input").hasClass("parsley-error")) {
          checkStatus = sendOtp();
        }
      }
      // else if((mobile != $("input[name=phone]").val()) || (email != $("input[name=email]").val())){
      //      checkStatus = sendOtp();
      // }

      if (
        respdata[ans_obj.current_section].section_1_attempted &&
        checkStatus
      ) {
        // if(respdata[ans_obj.current_section].section_1_attempted){
        //&&checkStatus
        $(".section_1").addClass("transitOut");

        current_step = $(this)
          .parent()
          .parent()
          .parent()
          .next();
        current_step.removeClass("transitBack").addClass("active_question");
        prev_step = $(this)
          .parent()
          .parent()
          .prev();

        if (prev_step.length - current_step.length < 0) {
          $(current_step).show();
        }

        let currentWidth = parseFloat($("#progressBar").css("width"));
        let threshold = 6.667;
        currentWidth < 100 &&
          $("#progressBar").css("width", currentWidth + threshold + "%");

        question_no += 1;
        $(".question_no").html("<span>Question-" + question_no + "</span>");

        var next_question = loadNextQuestion(ans_obj);
        current_section = next_question.current_section;
        current_index = next_question.current_index;
      }

      // $('#progress_bar').prepend('<div class="progressContainer"><div id="progressBar"></div></div>').insertAfter('.reg_form_next');
    } else {
      // else if (event.currentTarget.name === "leapp"){
      //     if(!validateRecaptcha()){
      //         tryAgain("Captcha validation is remaining");
      //         return false;
      //     }

      //     if(checkStatus == false || checkStatus == undefined){
      //         checkStatus = sendOtp();
      //     }

      //     if(respdata[ans_obj.current_section].section_1_attempted && checkStatus){
      //         sendData(respdata);
      //         window.location.href = beta_thankyou_url;
      //     }
      // }
      // // $('#registrationForm div.section_2').addClass('transitIn');
      event_click_next2 = true;
      $(this).data("clicked", true);

      if (
        respdata[ans_obj.current_section][ans_obj.current_index].id == 9 &&
        $('input[name="input_9"]:checked').length < 1
      ) {
        $("#input_9_2").css("display", "block");
        alertBox(respdata["common_question"]["personal_data"][0].user_answer);
      } else if (
        respdata[ans_obj.current_section][ans_obj.current_index].user_attempted
      ) {
        //pushpa
        // let currentWidth = parseFloat($('#progressBar').css('width')) / 1.95;
        // let threshold = 100 / $("fieldset").length;
        // $('#progressBar').css('width', currentWidth + threshold + '%');
        $("#input_9_3").css("display", "none");

        if (ans_obj.current_section == "dependsOn_7d") {
          check_7 = true;
        }
        var current_section_length = respdata[ans_obj.current_section].length;

        if (ans_obj.current_section == "traderorinvestor") {
          currentWidth = parseFloat($("#progressBar").css("width")) / 2.95;
          let threshold = 6.6667;
          $("#progressBar").css("width", currentWidth + threshold + "%");
        } else if (ans_obj.current_section == "all_sections") {
          let currentWidth = parseFloat($("#progressBar").css("width")) / 2.95;
          let threshold = current_section_length + ans_obj.current_index + 10;
          $("#progressBar").css("width", currentWidth + threshold + "%");
        } else if (
          ans_obj.current_section == "future_group" ||
          ans_obj.current_section == "options_group" ||
          ans_obj.current_section == "investment_group"
        ) {
          if (check_7) {
            let currentWidth = parseFloat($("#progressBar").css("width")) / 1.8;
            let threshold = current_section_length + ans_obj.current_index;
            $("#progressBar").css("width", currentWidth + threshold + "%");
          } else {
            let currentWidth = parseFloat($("#progressBar").css("width")) / 1.4;
            let threshold = current_section_length + ans_obj.current_index;
            $("#progressBar").css("width", currentWidth + threshold + "%");
          }
        } else {
          let currentWidth = parseFloat($("#progressBar").css("width")) / 2.2;
          let threshold = current_section_length + ans_obj.current_index;
          $("#progressBar").css("width", currentWidth + threshold + "%");
        }

        if ($("input[name=input_9]:checked").length > 0) {
          var searchIDs = $("input[name=input_9]:checked")
            .map(function() {
              return $(this).attr("id");
            })
            .get();
          checkInput9(searchIDs);
        }
        if ($("input[id=option_7d]").is(":checked")) {
          if (ans_obj.current_section == "traderorinvestor") {
            option_7D_selected = true;
          }
        }

        // if($('input[id=option_10k]').is(':checked') && respdata[ans_obj.current_section][ans_obj.current_index].id == 10){
        //     var album_text = [];
        //     $('[id^="text1"]').each(function() {
        //         var value = $(this).val();
        //         if (value) {
        //             album_text.push(value);
        //         }
        //     });
        //         if(album_text.length == ""){
        //             input10kapassed = false;
        //             $('#input_'+respdata[ans_obj.current_section][ans_obj.current_index].id+'_other').css('display','block');
        //         }
        //         else{
        //             input10kapassed = true;
        //         }
        // }

        if (
          input10kapassed ||
          respdata[ans_obj.current_section][ans_obj.current_index]
            .select_answer != "option_10k"
        ) {
          question_no += 1;
          $(".question_no").html(
            "<span class=" +
              question_no +
              ">Question-" +
              question_no +
              "</span>"
          );
          var next_question = loadNextQuestion(ans_obj);
          current_section = next_question.current_section;
          current_index = next_question.current_index;
        }
      } else {
        if (
          $(
            "input:radio[name=input_" +
              respdata[ans_obj.current_section][ans_obj.current_index].id +
              "]"
          ).is(":checked") == false
        ) {
          if (
            respdata[ans_obj.current_section][ans_obj.current_index].id == 9
          ) {
            $(
              "#input_" +
                respdata[ans_obj.current_section][ans_obj.current_index].id +
                "_2"
            ).css("display", "block");
          } else {
            $(
              "#input_" +
                respdata[ans_obj.current_section][ans_obj.current_index].id
            ).css("display", "block");
          }
        }
      }
      //pushpa
    }
  });
});

function validateRecaptcha() {
  var response = grecaptcha.getResponse();
  if (response.length === 0) {
    return false;
  } else {
    return true;
  }
}

function storeDataOnNext(ans_obj) {
  var selected_answer = null;
  if (ans_obj.element.closest("#form_01").find("input").length > 0) {
    //Save multiple answers
    var ans_set = ans_obj.element.closest("#form_01").find("input");
    var length = ans_set.length;
    for (var x = 0; x < length; x++) {
      var resp_index = respdata[ans_obj.current_section][ans_obj.current_index]
        .map(function(o) {
          return o.key;
        })
        .indexOf(ans_set[x].name);
      respdata[ans_obj.current_section][ans_obj.current_index][
        resp_index
      ].user_answer =
        ans_set[x].value;
      if (
        respdata[ans_obj.current_section][ans_obj.current_index][resp_index]
          .user_answer == ""
      ) {
        null_value += 1;
      }
      if (
        respdata[ans_obj.current_section][ans_obj.current_index][resp_index]
          .user_answer != ""
      ) {
        respdata[ans_obj.current_section].section_1_attempted = true;
      } else {
        respdata[ans_obj.current_section].section_1_attempted = false;
      }
    }
  } else {
    //Save specific answer
    console.log(ans_obj);
    switch (ans_obj.data.input_type) {
      case "single_selection":
        onRadioOptionSelection(ans_obj);
        break;
      case "multiple_selection":
        onCheckboxSelection(ans_obj);
        break;
      case "textarea":
        onTextareaEnter(ans_obj);
      default:
        console.log("default");
    }
  }
}

const loadNextQuestion = ans_obj => {
  var response = {};
  var section_7_completed = false;
  var section_question_count = respdata[ans_obj.current_section].length;
  var sameChildAppended = false;

  if (
    typeof section_question_count == "undefined" ||
    section_question_count - 1 == ans_obj.current_index
  ) {
    if (ans_obj.next == "calculate_next") {
      if (conditonal_questions_complete == false) {
        if (option_7D_selected && question_7_completed == false) {
          response.current_section = "dependsOn_7d";
        } else if (group1 && group2 && group3) {
          response.current_section = "all_sections";
        } else if (group1 && group2) {
          response.current_section = "approachesToTrading_GRP1";
        } else if (group1 && group3) {
          response.current_section = "approachesToTrading_GRP2";
        } else if (group2 && group3) {
          response.current_section = "approachesToTrading_GRP3";
        } else if (group1) {
          response.current_section = "investment_group";
        } else if (group2) {
          response.current_section = "future_group";
        } else if (group3) {
          response.current_section = "options_group";
        } else {
          respdata.is_completed = true;
          sendData(respdata);
          window.location.href = alpha_thankyou_url;
        }
        question_7_completed = false;
      } else {
        $("#progressBar").css("width", "100%");
        respdata.is_completed = true;
        respdata.terms_and_conditon = true;
        respdata.agree_to_invest_with_sharekhan = true;
        //Submit final JSON
        //Show thank you page.
        sendData(respdata);
        window.location.href = alpha_thankyou_url;
      }
    } else {
      response.current_section = ans_obj.next;
    }
    response.current_index = 0;
    response.next = "";
  } else if (
    ans_obj.current_section == "traderorinvestor" &&
    respdata[ans_obj.current_section][ans_obj.current_index].select_answer !=
      "option_7a" &&
    respdata[ans_obj.current_section][ans_obj.current_index].id == 7
  ) {
    response.current_index = ans_obj.current_index + 2;
    response.current_section = ans_obj.current_section;
    if (
      ans_obj.current_section == "traderorinvestor" &&
      respdata[ans_obj.current_section][ans_obj.current_index].select_answer ==
        "option_7d" &&
      respdata[ans_obj.current_section][ans_obj.current_index].id == 7
    ) {
      option_7D_selected = true;
    } else {
      option_7D_selected = false;
    }
  } else {
    console.log("iterating same section");
    response.current_index = ans_obj.current_index + 1;
    response.current_section = ans_obj.current_section;
    console.log(
      "next question",
      respdata[response.current_section][response.current_index]
    );
    //if next question is the last one, then we should add next parameter
    console.log(
      respdata[response.current_section].length,
      response.current_index + 1
    );
    if (
      respdata[response.current_section].length ==
      response.current_index + 1
    ) {
      console.log("next question is last question");
      response.next = "calculate_next";
      if (response.current_section == "dependsOn_7d") {
        question_7_completed = true;
      }
      if (
        response.current_section == "approachesToTrading_GRP1" ||
        response.current_section == "approachesToTrading_GRP2" ||
        response.current_section == "approachesToTrading_GRP3" ||
        response.current_section == "all_sections" ||
        response.current_section == "future_group" ||
        response.current_section == "options_group" ||
        response.current_section == "investment_group"
      ) {
        appendCheckbox = true;
        if ($("input[name=tandc_block]:checked").length > 1) {
          $(".next2")
            .attr("disabled", false)
            .removeClass("disable-hover");
        } else {
          $(".next2")
            .attr("disabled", true)
            .addClass("disable-hover");
        }
      }
    } else {
      response.next = "";
    }
  }
  var template = jQuery(
    "#" +
      respdata[response.current_section][response.current_index].question_type
  ).html();
  respdata[response.current_section][response.current_index].current_section =
    response.current_section;
  respdata[response.current_section][response.current_index].current_index =
    response.current_index;
  respdata[response.current_section][response.current_index].next =
    response.next;
  var render = Mustache.render(
    template,
    respdata[response.current_section][response.current_index]
  );

  var question = document.createElement("div");
  question.setAttribute(
    "id",
    "question_" + respdata[response.current_section][response.current_index].id
  );
  var attr = question.getAttribute("id");
  question.className = "question_set";

  var arrayLength = $(".demo-form").children().length;
  var childArrList = [];
  for (let i = 0; i < arrayLength; i++) {
    var childId = $(".demo-form")
      .children()
      [i].getAttribute("id");
    childArrList.push(childId);

    if (childArrList[i] == attr) {
      sameChildAppended = true;
    }
  }

  if (sameChildAppended == false) {
    if (appendCheckbox == true) {
      question.innerHTML = render;
      document.getElementsByClassName("demo-form")[0].appendChild(question);
      // $('<input />', { type: 'checkbox', value: 'tc' }).appendTo(question);
      setTimeout(() => {
        $(".last_section_checkbox").css("display", "block");
        if ($("input[name=tandc_block]:checked").length < 1) {
          $(".reg_form_next").attr("disabled", true);
        }
      }, 1000);
      // section_9_completed = true;
      if ($(".next2").data("clicked")) {
        conditonal_questions_complete = true;
      }
    } else {
      question.innerHTML = render;
      document.getElementsByClassName("demo-form")[0].appendChild(question);
    }
  } else {
    if (appendCheckbox == true) {
      setTimeout(() => {
        $(".last_section_checkbox").css("display", "block");
        if ($("input[name=tandc_block]:checked").length < 1) {
          $(".reg_form_next").attr("disabled", true);
        }
      }, 1000);
      // section_9_completed = true;
      if ($(".next2").data("clicked")) {
        conditonal_questions_complete = true;
      }
    }
  }

  if (event_click_next2) {
    current_step = $("#" + ans_obj.data.input_id)
      .parent()
      .parent();
    next_step = $("#" + ans_obj.data.input_id)
      .parent()
      .parent()
      .next();
    var arr = [];
    $.each(arr, function(e) {
      arr.push(next_step);
    });
  }

  let skipdiff =
    respdata[response.current_section][response.current_index].id -
    ans_obj.data.input_id;
  if (respdata[response.current_section][response.current_index].id == 10) {
    if ($("input[id=option_10k]").is(":checked")) {
      $("input[name=text1]").addClass("show_textbox");
      $(".text").addClass("show_div");
    } else {
      $("input[name=text1]").removeClass("show_textbox");
      $(".text").removeClass("show_div");
    }
  }

  setTimeout(() => {
    $(
      `#question_${respdata[response.current_section][response.current_index]
        .id - skipdiff}`
    ).addClass("transitOut");
    setTimeout(() => {
      $(
        `#question_${respdata[response.current_section][response.current_index]
          .id}`
      )
        .removeClass("transitBack")
        .addClass("active_question")
        .show();
    }, 300);
  }, 100);

  if (isExistingUser) {
    loadAnswerset(response, ans_obj);
  }
  $("#question_6 .reg_form_previous").css("display", "none");
  $("#question_6 .mobile-previous").css("display", "none");
  $("#question_6 .reg_form_next").css("margin-left", "0rem");

  sendData(respdata);
  return response;
};

function setProgressBar(ans_obj, count) {
  // var steps = $("fieldset").length;
  var section_count = respdata[ans_obj.current_section].length;
  if (!progressBarReset) {
    percent =
      parseFloat(100 / section_count) * (section_count - Math.abs(count));
    percent = Math.abs(percent).toFixed();
    $("#progressBar").css("width", percent + "%");
    //.html(percent+"%")
  }
}

const onRadioOptionSelection = ans_obj => {
  // var $radio = $('input:radio.form_data_radio:checked');
  // var $radio = $('input:radio[id='+selectedOption+']+':checked');
  let length_radio = $(
    "input:radio[name=input_" +
      respdata[ans_obj.current_section][ans_obj.current_index].id +
      "]"
  );
  for (let i = 0; i < length_radio.length; i++) {
    var $radio = $(
      "input:radio[id=option_" +
        respdata[ans_obj.current_section][ans_obj.current_index].options[i]
          .value +
        "]:checked"
    );
    console.log($radio);
    if ($radio != null) {
      selected_answer = $radio.attr("id");
      if (selected_answer != null) {
        respdata[ans_obj.current_section][
          ans_obj.current_index
        ].select_answer = selected_answer;
        respdata[ans_obj.current_section][
          ans_obj.current_index
        ].user_attempted = true;
        respdata[ans_obj.current_section][
          ans_obj.current_index
        ].textBox_input_value = null;
        if (
          selected_answer == "option_10k" &&
          respdata[ans_obj.current_section][ans_obj.current_index].id == 10
        ) {
          var textLength = $('[id^="text1"]').length;
          for (let i = 0; i < textLength; i++) {
            var option_10ka_value = $('[id^="text1"]')[i].value;
            if (option_10ka_value != "") {
              respdata[ans_obj.current_section][
                ans_obj.current_index
              ].textBox_input_value = option_10ka_value;
            }
          }
        }
      }
    }
  }
};

const onCheckboxSelection = ans_obj => {
  var $checkbox = $(
    "input:checkbox[name=input_" +
      respdata[ans_obj.current_section][ans_obj.current_index].id +
      "]:checked"
  );
  var arr = [];
  $.each($checkbox, function() {
    arr.push($(this).attr("id"));
  });
  selected_answer = arr;
  checkInput9(selected_answer);

  respdata[ans_obj.current_section][
    ans_obj.current_index
  ].select_answer = selected_answer;
  if (selected_answer.length != 0) {
    respdata[ans_obj.current_section][
      ans_obj.current_index
    ].user_attempted = true;
    if (
      respdata[ans_obj.current_section][ans_obj.current_index].id == 9 &&
      respdata[ans_obj.current_section][ans_obj.current_index].select_answer
        .length < 2
    ) {
      minimum_2_selected = false;
    } else {
      minimum_2_selected = true;
    }
  } else {
    respdata[ans_obj.current_section][
      ans_obj.current_index
    ].user_attempted = false;
  }
};

const onTextareaEnter = ans_obj => {
  // var selected_answer = $.trim($("textarea").val());
  var selected_answer = $(
    "#input_" + respdata[ans_obj.current_section][ans_obj.current_index].id
  ).val();
  respdata[ans_obj.current_section][
    ans_obj.current_index
  ].select_answer = selected_answer;
  respdata[ans_obj.current_section][
    ans_obj.current_index
  ].user_attempted = true;
};

function checkInput9(selected_answer) {
  for (let i = 0; i < selected_answer.length; i++) {
    let optionSelected = selected_answer[i];
    if (optionSelected == "option_9a") {
      group1 = true;
    } else if (
      optionSelected == "option_9b" ||
      optionSelected == "option_9c" ||
      optionSelected == "option_9d" ||
      optionSelected == "option_9e"
    ) {
      group2 = true;
    } else if (optionSelected == "option_9f" || optionSelected == "option_9g") {
      group3 = true;
    }
  }
}

$(
  "#registrationForm"
).on("click", ".reg_form_previous, #reg_form_previous", function(e) {
  $(".last_section_checkbox").css("display", "none");
  // $('.next2').attr('disabled', false);
  $(".reg_form_next").attr("disabled", false);
  appendCheckbox = false;
  group1 = false;
  group2 = false;
  group3 = false;
  option_7D_selected = false;
  conditonal_questions_complete = false;
  input10kapassed = true;

  var ans_obj = {};
  ans_obj.element = jQuery(this);
  ans_obj.current_section = jQuery(this).data("section");
  ans_obj.current_index = jQuery(this).data("index");
  ans_obj.data = jQuery(this).data();

  loadPreviousQuestion(ans_obj);
});

const loadPreviousQuestion = ans_obj => {
  var response = {};
  // var section_question_count = respdata[ans_obj.current_section].length;
  response.current_index = ans_obj.current_index;
  response.current_section = ans_obj.current_section;
  progressBarReset = false;

  question_no -= 1;
  $(".question_no").html("<span>Question-" + question_no + "</span>");

  if (
    response.current_section == "traderorinvestor" &&
    response.current_index == 0
  ) {
    current_step = $(".reg_form_previous, #reg_form_previous")
      .parent()
      .parent();
    prev_step = $(".reg_form_previous, #reg_form_previous")
      .parent()
      .parent()
      .prev();
    prev_step.removeClass("transitOut").addClass("active_question");
    current_step.addClass("transitBack").hide();
    $("#progressBar").css("width", "-6.667%");
    // prev_step.show();
  } else {
    if (
      $("input[name=input_7]").is(":checked") &&
      respdata[response.current_section][1].select_answer != "option_7a" &&
      ans_obj.data.input_id == 9
    ) {
      // if(ans_obj.data.input_id == 9){
      response.current_index = ans_obj.current_index - 2;
    } else if (
      (response.current_section == "approachesToTrading_GRP1" ||
        response.current_section == "approachesToTrading_GRP2" ||
        response.current_section == "approachesToTrading_GRP3" ||
        response.current_section == "all_sections" ||
        response.current_section == "future_group" ||
        response.current_section == "options_group" ||
        response.current_section == "investment_group") &&
      ans_obj.current_index == 0
    ) {
      if (
        $("input[id=option_7d]").is(":checked") &&
        ans_obj.current_index == 0
      ) {
        response.current_section = "dependsOn_7d";
        response.current_index = 4;
      } else if (
        $("input[id=option_7d]").is(":checked") &&
        ans_obj.current_index > 0
      ) {
        response.current_index = ans_obj.current_index - 1;
      } else {
        response.current_section = "traderorinvestor";
        response.current_index = 5;
      }
    } else if (
      response.current_section == "dependsOn_7d" &&
      ans_obj.current_index == 0
    ) {
      response.current_section = "traderorinvestor";
      response.current_index = 5;
    } else {
      response.current_index = ans_obj.current_index - 1;
    }

    let skipdiff =
      ans_obj.data.input_id -
      respdata[response.current_section][response.current_index].id;
    setTimeout(() => {
      $(`#question_${ans_obj.data.input_id}`)
        .addClass("transitBack")
        .hide();
      setTimeout(() => {
        $(`#question_${ans_obj.data.input_id - skipdiff}`)
          .removeClass("transitOut")
          .addClass("active_question");
      }, 300);
    }, 100);
    // setTimeout(() => {
    //     if(respdata[response.current_section][response.current_index].id == 10){
    //         if($('input[id=option_10k]').is(':checked')){
    //             $('input[name=text1]').addClass('show_textbox');
    //             $('.text').addClass('show_div');
    //         }
    //     }else{
    //         $('input[name=text1]').removeClass('show_textbox');
    //         $('.text').removeClass('show_div');
    //     }
    // }, 200);

    if (ans_obj.current_section == "traderorinvestor") {
      let currentWidth = parseFloat($("#progressBar").css("width")) / 5.95;
      let threshold = 6.6667;
      $("#progressBar").css("width", currentWidth + threshold + "%");
    } else {
      var current_section_length = respdata[ans_obj.current_section].length;
      let currentWidth =
        parseFloat($("#progressBar").css("width")) / current_section_length;
      let threshold = 6.6667;
      $("#progressBar").css("width", currentWidth + threshold + "%");
    }

    // if(ans_obj.data.input_id == 9){
    //     if(!$('input[id=option_7a]').is(':checked') && section_7a_completed){
    //         i = i - 2;
    //         setProgressBar(ans_obj, section_question_count - i);
    //         i++;
    //     }
    //     else{
    //         i = i - 2;
    //         setProgressBar(ans_obj, section_question_count - i);
    //         i++;
    //     }
    // }
    // else{
    //     if(response.current_index == 6 && response.current_section == "traderorinvestor"){
    //         $("#progressBar").css("width","100%");
    //         i = 1;
    //         setProgressBarBack(response, section_question_count - i);
    //         i++;
    //     }else{
    //         i = i - 2;
    //         setProgressBar(ans_obj, section_question_count - i);
    //         i++;
    //     }
    // }
  }
};

$(document).keypress(function(event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    $(".reg_form_next").click();
  }
});

function alertBox(name) {
  $.alert({
    title: "Hello! " + name,
    content: "We're looking for diversified traders!"
  });
}

$(window).on("load", function() {
  $(".question_no").html("<span>Question-" + question_no + "</span>");
});

function loadAnswerset(resp, ans_obj) {
  // var jsonData = $.parseJSON(existingData.answer_json);
  var user_resp = $.parseJSON(existingData.user_resp);
  if (
    user_resp[ans_obj.data.section][ans_obj.data.index].select_answer ==
    respdata[ans_obj.data.section][ans_obj.data.index].select_answer
  ) {
    respdata = user_resp;
  }
  // for(i = 0; i < jsonData.length; i++){
  // var selected_ans = user_resp[resp.current_section][resp.current_index].select_answer;
  var question_type =
    respdata[resp.current_section][resp.current_index].question_type;
  // if(respdata[resp.current_section][resp.current_index].id == jsonData[resp.current_index].id){
  switch (question_type) {
    case "single_selection":
      $(
        "input:radio[id=" +
          respdata[resp.current_section][resp.current_index].select_answer +
          "]"
      ).prop("checked", true);
      break;
    case "multiple_selection":
      var multiselect =
        respdata[resp.current_section][resp.current_index].select_answer;
      if (multiselect != null) {
        for (let j = 0; j < multiselect.length; j++) {
          $("input:checkbox[id=" + multiselect[j] + "]").prop(
            "checked",
            "true"
          );
        }
      }
      // $('input:checkbox[id='+jsonData[resp.current_index].selected_option+']').prop('checked', true);
      break;
    case "textarea":
      $("#input_" + respdata[resp.current_section][resp.current_index].id).val(
        respdata[resp.current_section][resp.current_index].select_answer
      );
      break;
    default:
      "none";
  }
  // jsonCount++;
  // }
  // }
}

function sendData(data) {
  if ((token == "") | (token == null)) {
    tryAgain("Invalid Request");
  }
  $.ajax({
    url: ajax_url,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: "Bearer " + token
    },
    // dataType: 'json',
    async: false,
    success: function(data, textStatus, jqXHR) {
      data = $.parseJSON(data);
      //console.log("data check2",data.last_count);
      if (data.last_count) {
        last_count = data.last_count;
        //console.log(last_count, 'count2');
        //  $(".user_count").innerHTML(last_count);
        localStorage.setItem("uid", last_count);
      }
      if (status == 400) {
        tryAgain(data.message);
      }
      // $('#verifyModal').modal('toggle');
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
}
function sendOtp() {
  var mobile = $("input[name=phone]").val();
  var email = $("input[name=email]").val();
  var name = $("input[name=name]").val();
  $(".otp_success").css("display", "none");
  $(".otp_error").css("display", "none");
  $("#otp").val("");
  var tested = false;

  $.ajax({
    url: ajax_url,
    type: "POST",
    data: JSON.stringify({ mobile: mobile, email: email, name: name }),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: "Basic"
    },
    // dataType: 'json',
    async: false,
    success: function(data, textStatus, jqXHR) {
      status = jqXHR.getResponseHeader("Statuscode");
      if (data) {
        if (status == 200) {
          $("#verifyModal").modal("toggle");
        } else if (status == 400 || status == 201) {
          // please try again message
          tryAgain(data.message);
          tested = false;
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
}

$("#otp_submit").click(function() {
  var otpVerified = otpVerification();
  if (status != 400) {
    if (otpVerified) {
      $(".otp_error").css("display", "none");
      checkStatus = true;
      if (existingData != undefined) {
        console.log("answer_json", existingData.answer_json);
        isExistingUser = true;
      }
      if (respdata.is_lead_user) {
        sendData(respdata);
      }
      $(".otp_success").css("display", "block");
      setTimeout(function() {
        $("#verifyModal").modal("toggle");
      }, 1000);
      setTimeout(function() {
        $("#next").click();
      }, 1200);
    } else {
      $(".otp_error").css("display", "block");
      $("#otp").val("");
    }
  }
});

function clearField() {
  $("#otp").val("");
}
function otpVerification() {
  var otp_val = $("input[name=otp]").val();
  var mobile = $("input[name=phone]").val();
  var email = $("input[name=email]").val();
  var tested = false;
  $.ajax({
    url: ajax_url,
    type: "POST",
    data: JSON.stringify({ mobile: mobile, otp: otp_val, email: email }),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: "Basic "
    },
    // dataType: 'json',
    async: false,
    success: function(data, textStatus, jqXHR) {
      status = jqXHR.getResponseHeader("Statuscode");
      if (data) {
        if (status == 200) {
          // show next page
          tested = true;
          token = data.token;
          existingData = data.existing_data;
        } else if (status == 400) {
          // otp expired please try again ..please try again message
          setTimeout(function() {
            $("#verifyModal").modal("toggle");
          }, 1000);
          $(".otp_error").css("display", "none");
          $(".otp_success").css("display", "block");
          otpExpired(data.message);
          tested = false;
        } else if (status == 201) {
          //show enter valid otpc message with popup
          $(".otp_error").css("display", "block");
          tested = false;
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
  return tested;
}

$("#registrationForm").on("click", ".beta-phase-button", function(e) {
  e.preventDefault();
  if (
    $("#answer_1").val() != "" ||
    $("#answer_3").val() != "" ||
    $("#answer_4").val() != "" ||
    $("#answer_5").val() != ""
  ) {
    if (checkStatus == false || checkStatus == undefined) {
      if (!$("input").hasClass("parsley-error")) {
        $(".otp_success").css("display", "none");
        $(".otp_error").css("display", "none");
        $("#otp").val("");
        checkStatus = sendOtp();
      }
    }
    if (checkStatus) {
      var ans_obj = {};
      ans_obj.element = jQuery(".beta-phase-button");
      ans_obj.next = jQuery(".beta-phase-button").data("next");
      ans_obj.current_section = jQuery(".beta-phase-button").data("section");
      ans_obj.current_index = jQuery(".beta-phase-button").data("index");
      ans_obj.data = jQuery(".beta-phase-button").data();

      storeDataOnNext(ans_obj);
      respdata.is_lead_user = true;
      window.location.href = beta_thankyou_url;
    }
  }
});

// window.addEventListener("load", userCount);

// function userCount(){
// $('.alpha-phase, .alpha-phase-mobile').css('display','none');
// if(window.location.href == lead_form_url){
//     $('body').css('display', 'none');
// }
$("body").css("display", "none");
$(document).ready(function() {
  $.ajax({
    url: ajax_url,
    type: "POST",
    data: JSON.stringify({ user_count: 1 }),
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: "Basic"
    },
    // dataType: 'json',
    async: false,
    success: function(data, textStatus, jqXHR) {
      data = $.parseJSON(data);
      count_val = $.parseJSON(data.message);
      console.log(count_val.count);
      if (count_val.count > 400) {
        if (window.location.href == registration_url) {
          window.location.replace(lead_form_url);
        }
        // $('body').css('display', 'block');
        $("body").fadeIn("slow", function() {
          $("body").animate({ opacity: "show", paddingTop: 0 }, 2000);
        });
        $(".alpha-phase, .alpha-phase-mobile").css("display", "none");
        // $('.header .logo-image').css('padding-left', 0);
      } else {
        // $('body').css('display', 'block');
        // $('body').fadeIn(1000);
        $("body").fadeIn("slow", function() {
          $("body").animate({ opacity: "show", paddingTop: 0 }, 2000);
        });
        // if ($(window).width() >= 1024 || $(window).width() >= 768) {
        //     $('.alpha-phase').css('display','block');
        //     $('.alpha-phase-mobile').css('display','none');
        // }
        // else{
        //     $('.alpha-phase').css('display','none');
        //     $('.alpha-phase-mobile').css('display','block');
        // }
        $(".beta-phase").css("display", "none");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
});
// }

function tryAgain(mesg) {
  $.alert({
    content: mesg
  });
}

function otpExpired(mesg) {
  setTimeout(function() {
    $.alert({
      content: mesg
    });
  }, 1500);
}

function openUrl() {
  window.open(
    "https://www.sharekhan.com/pdfs/Final_Terms&Conditions(T&C).pdf",
    "_blank"
  );
}
