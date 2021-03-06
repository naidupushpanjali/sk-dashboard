var ajax_url = "";

const logFileText = async file => {
  return await fetch(file);
};
// var user_resp = $.parseJSON(existingData.user_resp);
$(document).ready(function() {
  //   $.getJSON("./assets/js/feedback.json", resp => {
  fetch("./assets/json/landing.json")
    .then(promise => promise.json())
    .then(json => {
      json.feedbackSection.forEach(el => {
        var feedback = document.createElement("div");
        feedback.className = "sk-feedback";
        if (el.divisor || el.infoIconRequired) {
          var feedCount_dom =
            `<div>` +
            el.feedbackCount +
            `<span class="divisor">/` +
            el.divisor +
            `</span>
            </div><h5 class="sk-feedback-heading"><span>
            <img src="./assets/images/info-black.svg" alt="Information"
            data-toggle="popover" data-trigger="hover" data-content="Some content" data-placement="bottom"/></span>` +
            el.feedbackHeading +
            `</h5>`;
          feedback.innerHTML = feedCount_dom;
          $(feedback).appendTo(
            "#sk-dynamic-feedback, #sk-dynamic-feedback-mobile"
          );
        } else {
          var feedCount_dom =
            `<div>` +
            el.feedbackCount +
            `</div><h5 class="sk-feedback-heading">` +
            el.feedbackHeading +
            `</h5>`;
          feedback.innerHTML = feedCount_dom;
          $(feedback).appendTo(
            "#sk-dynamic-feedback, #sk-dynamic-feedback-mobile"
          );
        }
      });

      json.indicesSection.forEach(el => {
        if (window.matchMedia("(max-width: 812px)").matches) {
          var indices_dom = swiperIndices.appendSlide(
            `<div class="swiper-slide"><img src="` +
              el.indicesImageUrl +
              `" id="indices-img" alt="Indices-1"/><div class="sk-rating-border"><div class="sk-rating-content"><h5>` +
              el.indicesHeading +
              `</h5>
              <p>` +
              el.indicesSubHeading +
              `</p>
              <div>
                  <span class="score">
                      <div class="score-wrap">
                          <span class="stars-active" id="stars-active-` +
              el.id +
              `">
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                          </span>
                          <span class="stars-inactive">
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                          </span>
                      </div>
                      <span>
                          <img src="./assets/images/information.png" alt="Information icon" class="info-icon"
                           data-toggle="popover" data-trigger="hover" data-content="Some content"/>
                      </span>
                    </span>
                </div>
            </div>
        </div></div>`
          );
          $(indices_dom).appendTo("#sk-indices-wrapper");
        } else {
          let indices = document.createElement("div");
          indices.className = "sk-ratings-section";
          var indices_dom =
            `<img src="` +
            el.indicesImageUrl +
            `" id="indices-img" alt="Indices-1"/><div class="sk-rating-border"><div class="sk-rating-content"><h5>` +
            el.indicesHeading +
            `</h5>
              <p>` +
            el.indicesSubHeading +
            `</p>
              <div>
                  <span class="score">
                      <div class="score-wrap">
                          <span class="stars-active" id="stars-active-` +
            el.id +
            `">
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                              <i class="fa fa-star" aria-hidden="true"></i>
                          </span>
                          <span class="stars-inactive">
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                              <i class="fa fa-star-o" aria-hidden="true"></i>
                          </span>
                      </div>
                      <a href="#" data-toggle="popover" data-trigger="hover" data-content="Some content">
                          <img src="./assets/images/information.png" alt="Information icon" class="info-icon"/>
                      </a>
                    </span>
                </div>
            </div>
        </div>`;
          indices.innerHTML = indices_dom;
          $(indices).appendTo("#rating-display, #sk-indices-wrapper");
        }

        $("#stars-active-" + el.id).css("width", el.starRating * 20 + "%");
      });

      json.projectNews.forEach(el => {
        let projectnews_dom = swiperProject.addSlide(1, [
          ` <div class="swiper-slide">
                <div class="front">
                    <div class="uptime-image">
                        <img src="` +
            el.projectImageUrl +
            `" class="makers-image" />
                    </div>
                    <h3 class="maker-heading">` +
            el.projectHeading +
            `</h3>
                    <p class="maker-desc">` +
            el.projectContent +
            `</p>
                    <button class="btn btn-default" id="review-btn1" type="submit" onclick="location.href = '` +
            el.projectReadMoreUrl +
            `';">Read More<i class="fa fa-angle-right arrow-right"></i></button>
                </div>
            </div>`
        ]);
        $(projectnews_dom).appendTo("#sk-projectnews-wrapper");
      });

      $('[data-toggle="popover"]').popover();

      if (json.feedbackCountSection) {
        $(".feedbackCount").css("display", "block");
      } else {
        $(".feedbackCount").css("display", "none");
      }

      if (json.feedbackCountSection) {
        $(".feedbackDetail").css("display", "block");
      } else {
        $(".feedbackDetail").css("display", "none");
      }

      if (json.meetMakers) {
        $(".meetMakers").css("display", "block");
      } else {
        $(".meetMakers").css("display", "none");
      }

      if (json.loginDisplay) {
        $(".loginSection").css("display", "block");
      } else {
        $(".loginSection").css("display", "none");
      }

      if (json.projectNewsSection) {
        $("#project-news-section").css("display", "block");
      } else {
        $("#project-news-section").css("display", "none");
      }
    });

  function getDynamicData() {
    $.ajax({
      url: ajax_url,
      type: "POST",
      data: JSON.stringify({ "frontend_settings": 1 }),
      contentType: "application/json; charset=utf-8",
      headers: {
        Authorization: "Basic"
      },
      async: false,
      success: function(data, textStatus, jqXHR) {
        data = $.parseJSON(data);
        count_val = $.parseJSON(data.message);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      }
    });
  }
});

