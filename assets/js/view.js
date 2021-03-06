
var viewClicked = JSON.parse(localStorage.getItem("viewClicked"));
var chatViewClicked = JSON.parse(localStorage.getItem("chatViewClicked"));
var editClicked = JSON.parse(localStorage.getItem("editClicked"));

var fvq = JSON.parse(localStorage.getItem("fvq"));
var fvc = JSON.parse(localStorage.getItem("fvc"));
var ni = JSON.parse(localStorage.getItem("ni"));

var viewData = "";
var editfeedback = "";
var token = null;
var ajax_url  = "https://devshare.noesis.tech/saveFeedback";
var storeData = {
  feedback: []
};

if(viewClicked){
    viewData = JSON.parse(localStorage.getItem("viewData"));

    var dateString = viewData.date; 
    var dateObject = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    let month = monthNames[dateObject.getMonth()];
    let day = String(dateObject.getDate()).padStart(2, '0');
    let year = dateObject.getFullYear();

    var sup;
    switch (day % 10) {
        case 1:
            sup = "st";
            break;
        case 2:
            sup = "nd";
            break;
        case 3:
            sup = "rd";
            break;
        default:
            sup = "th";
            break;
    }

    let output = day+sup + '\n'+ month.slice(0,3)  + ',  ' + year;

    viewData.date = output;
    
    loadViewQuestion(viewData);
}
else if(editClicked){
    editData = JSON.parse(localStorage.getItem("editData"));
    edit_id = editData.id;
    edit_featureId = editData.feature_id;

    var dateString = editData.date; 
    var dateObject = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    let month = monthNames[dateObject.getMonth()];
    let day = String(dateObject.getDate()).padStart(2, '0');
    let year = dateObject.getFullYear();

    var sup;
    switch (day % 10) {
        case 1:
            sup = "st";
            break;
        case 2:
            sup = "nd";
            break;
        case 3:
            sup = "rd";
            break;
        default:
            sup = "th";
            break;
    }

    let output = day+sup + '\n'+ month.slice(0,3)  + ',  ' + year;

    editData.date = output;

    loadEditQuestion(editData);
}


function loadViewQuestion(el){
    if(el != undefined || el != null){
        if(fvq){
            var template = document.getElementById("viewTemplate").innerHTML;
            var rendered = Mustache.render(template, el);
            document.getElementById("viewfeedbackQuestions").innerHTML = rendered;
        }
        else if(fvc){
            var template = document.getElementById("viewChatTemplate").innerHTML;
            var rendered = Mustache.render(template, el);
            document.getElementById("viewfeedbackQuestions").innerHTML = rendered;
            if(el.image == "" || el.image == null){
                $('.displayImageChat').css('display','none');
                $('.zoomInText').css('display','none');
            }
            else{
                 $('.displayImageChat').css('display','block');
                 $('.zoomInText').css('display','block');
            }
        }
        else{
            var template = document.getElementById("viewIdeaTemplate").innerHTML;
            var rendered = Mustache.render(template, el);
            document.getElementById("viewfeedbackQuestions").innerHTML = rendered;
            if(el.image == "" || el.image == null){
                $('.displayImageIdea').css('display','none');
                $('.zoomInText').css('display','none');
            }else{
                 $('.displayImageIdea').css('display','block');
                 $('.zoomInText').css('display','block');
            }
        }
        
        for (let i = 1; i <= el.rating; i++){
            $(".fa-fw-"+i).removeClass("far").addClass("fas");
        }
    }
    $('.zoomInText').on('click', function(){
        $('.displayMobileImage').slideToggle('slow');
        $('.displayImageMobile span').text($('.displayImageMobile span').text() == "Click To View Image" ? "Click To Hide Image" : "Click To View Image");
    });
}

function loadChatViewQuestion(el){
    if(el != undefined || el != null){
        var template = document.getElementById("viewChatTemplate").innerHTML;
        var rendered = Mustache.render(template, el);
        document.getElementById("viewfeedbackQuestions").innerHTML = rendered;
        
        for (let i = 1; i <= el.rating; i++){
            $(".fa-fw-"+i).removeClass("far").addClass("fas");
        }
    }
    $('.zoomInText').on('click', function(){
        $('.displayMobileImage').slideToggle('slow');
        $('.displayImageMobile span').text($('.displayImageMobile span').text() == "Click To View Image" ? "Click To Hide Image" : "Click To View Image");
    });
}

$('.btn-edit').on('click', function(){
    editfeedback = JSON.parse(localStorage.getItem("viewData"));

    edit_id = editfeedback.id;
    edit_featureId = editfeedback.feature_id;

    var dateString = editfeedback.date; 
    var dateObject = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    let month = monthNames[dateObject.getMonth()];
    let day = String(dateObject.getDate()).padStart(2, '0');
    let year = dateObject.getFullYear();

    var sup;
    switch (day % 10) {
        case 1:
            sup = "st";
            break;
        case 2:
            sup = "nd";
            break;
        case 3:
            sup = "rd";
            break;
        default:
            sup = "th";
            break;
    }

    let output = day+sup + '\n'+ month.slice(0,3)  + ',  ' + year;

    editfeedback.date = output;

    loadEditQuestion(editfeedback);
});

function loadEditQuestion(el){
     if(el != undefined || el != null){
        var template = document.getElementById("editTemplate").innerHTML;
        var rendered = Mustache.render(template, el);
        document.getElementById("viewfeedbackQuestions").innerHTML = rendered;
        
        for (let i = 1; i <= el.rating; i++){
            $(".fa-fw-"+i).removeClass("far").addClass("fas");
        }
    }
    $('.test-popup-link').magnificPopup({type:'image'});
    $('.zoomInText').on('click', function(){
        $('.displayMobileImage').slideToggle('slow');
        $('.displayImageMobile span').text($('.displayImageMobile span').text() == "Click To View Image" ? "Click To Hide Image" : "Click To View Image");
    });

    rating(el);

    // window.onbeforeunload = function() { return "Your work will be lost."; };
}


$('.questionaire').on('click', '.btn-back', function(){
    location.href = "dashboard.html";
});

function rating(el){
    valueHover = el.rating;
    function calcSliderPos(e, maxV) {
    return e.offsetX / e.target.clientWidth * parseInt(maxV, 10);
    }
    $(".starrate").on("click", function() {
    $(".validation").css("display", "none");
    $(this).data("val", valueHover);
    $(this).addClass("saved");
    });
    // $(".starrate").on("mouseout", function() {
    // upStars($(this).data("val"));
    // });
    $(".starrate span.ctrl").on("click", function(e) {
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
    // if (!full) {
    //   stars.slice(val, val + 1).attr("class", "fas fa-fw fa-star");
    //   val++;
    // }
    stars.slice(val, 5).attr("class", "far fa-fw fa-star");
    }

    $(document).ready(function() {
    $(".starrate span.ctrl").width("471px");
    $(".starrate span.ctrl").height($(".starrate span.cont").height());
    }); 

}

function saveEditedFeedback(){
    var rating = Math.floor(valueHover);
    var suggestion = $("textarea").val();

    saveDataObj = {};
    saveDataObj["customer_id"] = 6; //change customer id
    saveDataObj["rating"] = rating;
    saveDataObj["feedback_id"] = edit_id;
    saveDataObj["feature_id"] = edit_featureId;
    saveDataObj["feedback"] = suggestion;
    saveDataObj["action"] = "edit"; 
    
    storeData.feedback = [];
    storeData.feedback.push(saveDataObj);
    $('#confirmationPopup').modal("toggle");
}

function saveData(){
    saveUserFeddback(storeData);
}

function saveUserFeddback(storeData){
     $.ajax({
        url: ajax_url,
        type: "POST",
        data: JSON.stringify(storeData), 
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers: {
            Authorization: "Basic"
        },
        async: false,
        success: function(data, textStatus, jqXHR) {
            data = JSON.parse(data);
            if(data.status == 200){
                location.href = "dashboard.html";
            }else if(data.status == 400){
                errorSavingData();
            }
            console.log("Save ",data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        }
  });
}

function errorSavingData(){
    $.alert({
        content: "Error saving data"
    });
}

$(window).on('load', function(){
    $(".se-pre-con").fadeOut("slow");
});