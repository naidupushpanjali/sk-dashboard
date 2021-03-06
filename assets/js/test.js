var index = 0;
var valueHover = 0;
var dataStored = false;
var answer;
var skipQuestion = false;
var question_no = 1;
var answerLater = false;
var viewBtnClicked = false;
var redirectFromDashboard = false;
var storeData = {
  feedback: []
};

$.getJSON("./assets/json/feedback.json", resp => {
  respdata = resp;

  getURLParameters();
  
    // if (!redirectFromDashboard){
      // if(status == 200){

  var welcomeMessage = document.createElement("div");
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

  if (index == 0) {
    loadNextQuestion(respdata);
  }

      // }
    // }

  $("#feedbackQuestions").on("click", ".button-submit", function(event) {
    error();
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
    skipQuestion = true;
    answerLater = true;
    storeDataOnSubmit();
    loadNextQuestion(respdata);
  });

  $("#shareMoreFeedback").on("click", function(event) {
    index = 0;
    storeData.feedback = [];
    question_no = 1;
    loadNextQuestion(respdata);
    $("#thankyouPopup").modal("toggle");
  });
});

function loadNextQuestion(el) {
  valueHover = 0;
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
  $(".test-popup-link").magnificPopup({ type: "image" });
  $('.zoomInText').on('click', function(){
    $('.displayMobileImage').slideToggle('slow');
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
  var rating = Math.floor(valueHover);
  var suggestion = $("textarea").val();

  if (rating == 0 && !skipQuestion) {
    dataStored = false;
    $(".validation").css("display", "block");
  } else {
    feedbackObj = {};
    feedbackObj["customer_id"] = 1;
    feedbackObj["rating"] = rating;
     // feedbackObj["feature_id"] = ;
    feedbackObj["feedback"] = suggestion;
    feedbackObj["action"] = "add"; 
    
    storeData.feedback.push(feedbackObj);
    if(answerLater){
      storeData.feedback[index].answer_later = true;
      answerLater = false;
    }
    else{
      storeData.feedback[index].answer_later = false;
    }

    console.log(storeData);
    dataStored = true;
    index++;
  }
}

function ratings() {
  valueHover = 0;
  function calcSliderPos(e, maxV) {
    return e.offsetX / e.target.clientWidth * parseInt(maxV, 10);
  }
  $(".starrate").on("click", function() {
    $(".validation").css("display", "none");
    $(this).data("val", valueHover);
    $(this).addClass("saved");
  });
  $(".starrate").on("mouseout", function() {
    upStars($(this).data("val"));
  });
  $(".starrate span.ctrl").on("mousemove", function(e) {
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
  }

  $(document).ready(function() {
    $(".starrate span.ctrl").width("492px");
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
  console.log(urlData);
}

$(window).on('load', function(){
    $(".se-pre-con").fadeOut("slow");

    $.ajax({
    url: "/rest",
    type: "POST",
    data: JSON.stringify({"enc_val": urlData}), 
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: "Basic"
    },
    async: false,
    success: function(data, textStatus, jqXHR) {
      if (status == 200) {
        return true
      }
      else if(status == 400){
        return false;
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });

});

function error() {
  $.alert({
    content: "Error"
  });
}
