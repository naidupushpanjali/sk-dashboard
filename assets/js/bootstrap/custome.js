$("#scroll_down").click(function() {
  if ($(window).width() >= 1400) {
    $("html, body").animate(
      {
        scrollTop: $("#about-section").offset().top - 100
      },
      1500
    );
  } else {
    $("html, body").animate(
      {
        scrollTop: $("#about-section").offset().top
      },
      1500
    );
  }
});

AOS.init({
  duration: 1500
});

$(".input-fields").on("focusin", function() {
  $(this)
    .parent()
    .find("label")
    .addClass("active");
});

$(".input-fields").on("focusout", function() {
  if (!this.value) {
    $(this)
      .parent()
      .find("label")
      .removeClass("active");
  }
});

// Swiper for phase 2
var swiperProject = new Swiper(".swiper-container-news", {
  spaceBetween: 5,
  pagination: {
    el: ".sk-project-pagination",
    clickable: true
  },
  breakpoints: {
    768: {
      loop: false,
      slidesPerView: 1
    },
    900: {
      loop: true,
      slidesPerView: 3
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});

// Swiper for phase 2
var swiperIndices = new Swiper(".swiper-container-indices", {
  spaceBetween: 5,
  pagination: {
    el: ".sk-feedback-pagination",
    clickable: true
  },
  breakpoints: {
    768: {
      slidesPerView: 1
    },
    900: {
      slidesPerView: 3
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});

function read_more() {
  if (event.currentTarget.id == "review-btn1") {
    $(".review1").toggleClass("flip");
  } else if (event.currentTarget.id == "review-btn2") {
    $(".review2").toggleClass("flip");
  } else {
    $(".review3").toggleClass("flip");
  }
  return true;
}

function openModal(evt) {
  $(evt.currentTarget.id).modal("show");
}

function isNumber(event) {
  var keycode = event.keyCode;
  if (keycode >= 48 && keycode <= 57) {
    return true;
  }
  return false;
}
document.querySelector("#answer_5").addEventListener("keypress", function(evt) {
  if (
    (evt.which != 8 && evt.which != 0 && (evt.which < 48 || evt.which > 57)) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
  if (evt.which == 56) {
    evt.preventDefault();
  }
});

// BY KAREN GRIGORYAN

$(document).ready(function() {
  $(".carousel").carousel({
    interval: false
  });
  /******************************
      BOTTOM SCROLL TOP BUTTON
   ******************************/

  // declare variable
  var scrollTop = $(".scrollTop");

  $(window).scroll(function() {
    // declare variable
    var topPos = $(this).scrollTop();

    // if user scrolls down - show scroll to top button
    if (topPos > 100) {
      $(scrollTop).css("opacity", "1");
    } else {
      $(scrollTop).css("opacity", "0");
    }
  }); // scroll END

  //Click event to scroll to top
  $(scrollTop).click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      1200
    );
    return false;
  }); // click() scroll top EMD

  /*************************************
    LEFT MENU SMOOTH SCROLL ANIMATION
   *************************************/
  // declare variable
  var h1 = $("#h1").position();
  var h2 = $("#h2").position();
  var h3 = $("#h3").position();

  $(".link1").click(function() {
    $("html, body").animate(
      {
        scrollTop: h1.top
      },
      500
    );
    return false;
  }); // left menu link2 click() scroll END

  $(".link2").click(function() {
    $("html, body").animate(
      {
        scrollTop: h2.top
      },
      500
    );
    return false;
  }); // left menu link2 click() scroll END

  $(".link3").click(function() {
    $("html, body").animate(
      {
        scrollTop: h3.top
      },
      500
    );
    return false;
  }); // left menu link3 click() scroll END
}); // ready() END
