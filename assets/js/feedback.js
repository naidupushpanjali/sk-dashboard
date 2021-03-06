const logFileText = async file => {
  return await fetch(file);
};
// var user_resp = $.parseJSON(existingData.user_resp);
$(document).ready(function() {
  //   $.getJSON("./assets/js/feedback.json", resp => {
  fetch("./assets/json/feedback.json")
    .then(promise => promise.json())
    .then(json => {
      var welcomeMessage = document.createElement("div");
      var welcomeMessage_dom =
        `<h5>Welcome back, ` +
        json.welcomePerson +
        `!</h5>
          <p> Please answer the feedback related questions below to continue :</p>`;

      welcomeMessage.innerHTML = welcomeMessage_dom;
      $(welcomeMessage).appendTo("#welcomeMessage");

      localStorage.setItem("user", json.welcomePerson);

      json.questionaire.forEach(el => {
        var questions = document.createElement("div");
        questions.className = "question-" + el.id;
        var question_dom =
          `<div class="question_section">
                        <h5>` +
          el.question +
          `<div id="starrate" class="starrate mt-3" data-max="5">
                            <span class="ctrl"></span>
                            <span class="cont m-1">
                                <span class="ctrl-rate">Rate</span>
                                <i class="fas fa-fw fa-star"><span class="tooltips">Improve</span></i> 
                                <i class="far fa-fw fa-star"><span class="tooltips">Better</span></i> 
                                <i class="far fa-fw fa-star"><span class="tooltips">Satisfactory</span></i> 
                                <i class="far fa-fw fa-star"><span class="tooltips">Good</span></i> 
                                <i class="far fa-fw fa-star"><span class="tooltips">Excellent</span></i> 
                            </span>
                        </div>
                        <textarea placeholder="Enter suggestions..."></textarea>
                        <div class="mandatory-field">Your feedback is very valuable</div>
                        <div class="form-navigation">
                            <button type="submit" class="btn-answer-later">Answer later</button>
                            <button type="submit" class="button-submit">Submit</button>
                        </div></div>`;

        questions.innerHTML = question_dom;
        $(questions).appendTo("#feedbackQuestions");

        $(".question-1").addClass("feedbackActive");
        $(".question-1").addClass("active");

        var valueHover = 0;
        function calcSliderPos(e, maxV) {
          return e.offsetX / e.target.clientWidth * parseInt(maxV, 10);
        }

        $(".starrate").on("click", function() {
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
          var full = Number.isInteger(val);
          val = parseInt(val);
          var stars = $("#starrate i");
          stars.slice(0, val).attr("class", "fas fa-fw fa-star");
          if (!full) {
            stars.slice(val, val + 1).attr("class", "fas fa-fw fa-star");
            val++;
          }
          stars.slice(val, 5).attr("class", "far fa-fw fa-star");
        }

        $(document).ready(function() {
          $(".starrate span.ctrl").width("492px");
          $(".starrate span.ctrl").height($(".starrate span.cont").height());
        });

        $(".button-submit").on("click", function() {
          $(".question-1")
            .removeClass("feedbackActive")
            .addClass("transOut");
          $(".question-2")
            .removeClass("transOut")
            .addClass("transIn");

          if (valueHover <= 0) {
            $(".mandatory-field").css("display", "block");
          } else {
            $(".mandatory-field").css("display", "none");
          }
        });
      });
    });
});
