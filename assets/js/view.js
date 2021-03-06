
var viewClicked = JSON.parse(localStorage.getItem("viewClicked"));
var viewData = "";


if(viewClicked){
    viewData = JSON.parse(localStorage.getItem("viewData"));

    var dateString = viewData.date; 
    var dateObject = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    let month = monthNames[dateObject.getMonth()];
    let day = String(dateObject.getDate()).padStart(2, '0');
    let year = dateObject.getFullYear();
    let output = day+"th" + '\n'+ month.slice(0,3)  + ',' + year;

    viewData.date = output;
    
    loadViewQuestion(viewData);
}

function loadViewQuestion(el){
    if(el != undefined){
        var template = document.getElementById("viewTemplate").innerHTML;
        var rendered = Mustache.render(template, el);
        document.getElementById("viewfeedbackQuestions").innerHTML = rendered;
        
        for (let i = 1; i <= el.rating; i++){
            $(".fa-fw-"+i).removeClass("far").addClass("fas");
        }
    }
    $('.zoomInText').on('click', function(){
    $('.displayMobileImage').slideToggle('slow');
  });
}

$(window).on('load', function(){
    $(".se-pre-con").fadeOut("slow");
});