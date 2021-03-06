var index = 0;
var ratingNo = 0;
var dataStored = false;
var answer;
var rating = 0;
var question_no = 1;
var answerLater = false;
var viewBtnClicked = false;
var redirectFromDashboard = false;
var ajax_url = "https://devshare.noesis.tech/getUserQuestions";
var save_ajax_url = "https://devshare.noesis.tech/saveFeedback";
var encrypt_ajax_url = "https://devshare.noesis.tech/checkCustomer";
var json = null;
var customer_id = 0;
var token = null;
var feature_id = 0;
var share_more = 0;
var storeData = {
  feedback: []
};

// $.getJSON("./assets/json/feedback.json", resp => {

  $('.progressContainer').css('display','none');
  // getURLParameters();

  // if(localStorage.getItem('token') == null || localStorage.getItem('token') == undefined){
    // if(urlData != null){
    //     checkCustomer();
    // }
// else
    // if((localStorage.getItem('token') != undefined || localStorage.getItem('token') != null) && JSON.parse(localStorage.getItem('token_confirmed')) == true){
      getUserQuestions();
      respdata = json;
      localStorage.setItem("user", respdata.welcomePerson);
      if(respdata.questionaire != ""){
        // localStorage.removeItem('emptyQuestion');
        var welcomeMessage = document.createElement("div");
        // var welcomePerson = 'Pushpa';
        var welcomeMessage_dom =
          `<h5>Welcome back, ` +
          respdata.welcomePerson +
          `!</h5>
                <p> Please answer the feedback related questions below to continue :</p>`;

        welcomeMessage.innerHTML = welcomeMessage_dom;
        $(welcomeMessage).appendTo("#welcomeMessage");

        var user = respdata.welcomePerson;
        localStorage.setItem("user", user);
        localStorage.removeItem("viewData");
        $('.progressContainer').css('display','block');

        if (index == 0) {
          loadNextQuestion(respdata);
        }
      }
      else{
        // localStorage.setItem('emptyQuestion', JSON.stringify(true));
        $('.progressContainer').css('display','block');
        loadNextQuestion(respdata);
        // setTimeout(() => {
        //   location.href = "dashboard.html";
        // }, 1000);
      }
    // }
    // else{
    //   // $('.progressContainer').css('display','block');
    //     $.confirm({
    //         icon: 'fa fa-warning',
    //         content: 'Uh oh! Something went wrong.',
    //         typeAnimated: true,
    //     });
    // }
        // }
      // }

    $("#feedbackQuestions").on("click", ".button-submit", function(event) {
      event.preventDefault();
      storeDataOnSubmit();
      if (dataStored) {
        loadNextQuestion(respdata);
      }
      AOS.init({
        duration: 1500
      });
    });

    $("#feedbackQuestions").on("click", ".btn-answer-later", function(event) {
      answerLater = true;
      storeDataOnSubmit();
      loadNextQuestion(respdata);
    });

    $("#shareMoreFeedback").on("click", function(event) {
      index = 0;
      storeData.feedback = [];
      question_no = 1;
      rating = 0;
      // valueHover = 0;
      share_more = 1;
      getUserQuestions();
      respdata = json;
      $("#thankyouPopup").modal("toggle");
      if(respdata.questionaire != ""){
          // localStorage.removeItem('emptyQuestion');
          share_more = 0; 
          loadNextQuestion(respdata);
      }else{
          $('.progressContainer').css('display','none');
          // localStorage.setItem('emptyQuestion', JSON.stringify(true));
          $('#doneQuestions').modal("toggle");
          // setTimeout(() => {
          //   location.href = "dashboard.html";
          // }, 3000);
      }
    });
  // });

  function loadNextQuestion(el) {
    // valueHover = 0;
    if (el.questionaire[index] != undefined) {
      incrementQuestionNo(el.questionaire.length);
      var template = document.getElementById("template").innerHTML;
      var rendered = Mustache.render(template, el.questionaire[index]);

      // setTimeout(() => {
      $("#question-" + index).addClass("transOut");
      //   setTimeout(() => {
      //     $("#question-" + (index + 1).addClass("active_question"));
      //   }, 300);
      // }, 100);
      document.getElementById("feedbackQuestions").innerHTML = rendered;
    } else {
      $("#thankyouPopup").modal("toggle");
    }

    progressBar(el.questionaire.length);
    ratings();
    valueHover = 0;
    $(".test-popup-link").magnificPopup({ type: "image" });
    $('.zoomInText').on('click', function(){
      $('.displayMobileImage').slideToggle('slow');
      $('.displayImageMobile span').text($('.displayImageMobile span').text() == "Click To View Image" ? "Click To Hide Image" : "Click To View Image");
    });
    // var question = document.createElement("div");
    // question.innerHTML = rendered;
    // $(question).appendTo("#feedbackQuestions");
  }

  function incrementQuestionNo(len) {
    $(".question_no").html("<span>Question-" + question_no + "</span> / " + len);
    question_no += 1;
  }

  function progressBar(length) {
    percent = parseFloat(100 / length) * (length - Math.abs(length - index));
    percent = Math.abs(percent).toFixed();
    $("#progressBar").css("width", percent + "%");
  }

  function storeDataOnSubmit() {
    rating = Math.floor(valueHover);
    var suggestion = $("textarea").val();

    if (rating == 0 && !answerLater) {
      dataStored = false;
      $(".validation").css("display", "block");
    } else {
      feedbackObj = {};
      storeData.feedback = [];
      feedbackObj["customer_id"] = 6 //after decrytion add customer id
      feedbackObj["rating"] = rating;
      if(respdata.questionaire[index].id != null){
        feedbackObj["feature_id"] = respdata.questionaire[index].id;
      } //after decrytion add feature id 
      feedbackObj["feedback"] = suggestion;
      feedbackObj["action"] = "add";
      // feedbackObj["answer_later"] = false;
      
      // storeData.feedback.push(feedbackObj);
      if(answerLater){
        feedbackObj["rating"] = "";
        feedbackObj["feedback"] = "";
        feedbackObj["answer_later"] = true;
        answerLater = false;
      }
      else{
        feedbackObj["answer_later"] = false;
      }

      storeData.feedback.push(feedbackObj);

      console.log(storeData);
      saveUserFeedback(storeData);
      dataStored = true;
      index++;
    }
  }

  function ratings() {
    valueHover = 0;
    function calcSliderPos(e, maxV) {
      return e.offsetX / e.target.clientWidth * parseInt(maxV, 10);
    }
    // $(".starrate").on("click", function() {
    
    // });
    $(".starrate").on("mouseout", function() {
      // upStars($(this).data("val"));
    });
    $(".starrate span.ctrl").on("click", function(e) {
      $(".validation").css("display", "none");
      $(this).data("val", valueHover);
      $(this).addClass("saved");
      var maxV = parseInt(
        $(this)
          .parent("div")
          .data("max")
      );
      valueHover = Math.ceil(calcSliderPos(e, maxV) * 2) / 2;
      upStars(valueHover);
    });
    function upStars(val) {
      var val = parseInt(val);
      //   $("#test").html(val.toFixed(1));
      // var full = Number.isInteger(val);
      val = parseInt(val);
      var stars = $("#starrate i");
      stars.slice(0, val).attr("class", "fas fa-fw fa-star");
      // if (!full) {
      //   stars.slice(val, val + 1).attr("class", "fas fa-fw fa-star");
      //   val++;
      // }
      stars.slice(val, 5).attr("class", "far fa-fw fa-star");
      ratingNo = valueHover;
    }

    $(document).ready(function() {
      $(".starrate span.ctrl").width("534px");
      $(".starrate span.ctrl").height($(".starrate span.cont").height());
    });
  }

  function getURLParameters(){
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    urlData = getUrlParameter('data');
    id = getUrlParameter('id');
    count = getUrlParameter('count');

    console.log(urlData);
  }

  $(window).on('load', function(){
      $(".se-pre-con").fadeOut("slow");
  });


  function checkCustomer(){
      $.ajax({
      url: encrypt_ajax_url,
      type: "GET",
      data: {"enc_val": urlData}, 
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      headers: {
        Authorization: "Basic"
      },
      async: false,
      success: function(data, textStatus, jqXHR) {
        data = $.parseJSON(data);
        console.log(data);
        if (data.status == 200) {
          message = $.parseJSON(data.message);
          token = message.token;
          localStorage.setItem('token', token);
          customer_id = message.id;
          localStorage.setItem('customer_id', customer_id);
          localStorage.setItem('token_confirmed', JSON.stringify(true));
          return true
        }
        else if(data.status == 400){
          // error();
          $.confirm({
              icon: 'fa fa-exclamation-triangle',
              content: 'Uh oh! Something went wrong.',
              typeAnimated: true,
          });
          localStorage.setItem('token_confirmed', JSON.stringify(false));
          return false;
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      }
    });
  }

  function getUserQuestions(){
    customer_id = localStorage.getItem('customer_id');

    $.ajax({
      url: ajax_url,
      type: "POST",
      data: JSON.stringify({"customer_id": "6", "share_more": share_more}), 
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      headers: {
        Authorization: "Basic"
      },
      async: false,
      success: function(data, textStatus, jqXHR) {
        data = $.parseJSON(data);
        if(data.status == 200){
            json = $.parseJSON(data.message);
            console.log("Question data ",json);
        }else
        {
            $.confirm({
              icon: 'fa fa-exclamation-triangle',
              content: 'Uh oh! Something went wrong.',
              typeAnimated: true,
          });
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      }
    });
  }

  function saveUserFeedback(storeData){
      $.ajax({
          url: save_ajax_url,
          type: "POST",
          data: JSON.stringify(storeData), 
          contentType: "application/json; charset=utf-8",
          crossDomain: true,
          headers: {
              Authorization: "Basic"
          },
          async: false,
          success: function(data, textStatus, jqXHR) {
              // data = JSON.parse(data);
              // if(data.status == 200){
              //     location.href = "dashboard.html";
              // }else if(data.status == 400){
              //     errorSavingData();
              // }
              console.log("Save ",data);
          },
          error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
          }
    });
  }

// function error() {
//   $.confirm({
//     title: 'Uh oh! Something went wrong.',
//     content: 'Uh oh! Something went wrong.',
//     buttons: {
//         Login: function(){
//             location.href = "https://www.google.com";
//             // window.open('http://www.smkproduction.eu5.org', '_blank');
//         }
//     }
// });
// }



function errorUserQuestion(data) {
  $.alert({
    content: data
  });
}



