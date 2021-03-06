var ajax_url = "https://devshare.noesis.tech/getUserDashboard";
var json = null;
var token = null;
var invalid_token = false;

// const logFileText = async file => {
//   return await fetch(file);
// };
// var user_resp = $.parseJSON(existingData.user_resp);
$('.dashboard_body').css('visibility','hidden');
$(document).ready(function() {
  //   $.getJSON("./assets/js/feedback.json", resp => {
//   fetch("./assets/json/dashboard.json")
//     .then(promise => promise.json())
//     .then(json => {

        // if(localStorage.getItem('token') != null){
        //     token = localStorage.getItem('token');
        // }

        getUserDashboard();

        // if(!invalid_token){
            $('.dashboard_body').css('visibility','visible');
            var user = 'Pushpa';
            if (user != null){
                var welcomeMessage = document.createElement("div");
                welcomeMessage.className = "GreetingMessage";
                var welcomeMessage_dom =
                    `<div class="greetingText"><h5 class="dsh-welcome">Welcome back, ` +
                    user +
                    `!</h5>
                    <p class="dsh-welcome"> This is your feedback dashboard, you can find a summary and details
                        of the feedback and new ideas you have shared with us below.</p></div>
                        <button type="button" class="btn-give-feedback">Give Feedback</button>`;

                welcomeMessage.innerHTML = welcomeMessage_dom;
                $(welcomeMessage).appendTo("#welcomeMessage");
            }

            //JSON for user rating
            if(json != null){
                json.user_rating.forEach(el => {
                    if(el.ratingTitle == "Improve"){
                        var count_dom = `<div class="count">`+ el.count + `</div>`;
                        $(count_dom).appendTo("#count-5");
                    }
                    else if(el.ratingTitle == "Better"){
                        var count_dom = `<div class="count">`+ el.count + `</div>`;
                        $(count_dom).appendTo("#count-4");
                    }
                    else if(el.ratingTitle == "Satisfactory"){
                        var count_dom = `<div class="count">`+ el.count + `</div>`;
                        $(count_dom).appendTo("#count-3");
                    }
                    else if(el.ratingTitle == "Good"){
                        var count_dom = `<div class="count">`+ el.count + `</div>`;
                        $(count_dom).appendTo("#count-2");
                    }
                    else if(el.ratingTitle == "Excellent"){
                        var count_dom = `<div class="count">`+ el.count + `</div>`;
                        $(count_dom).appendTo("#count-1");
                    }
                });

                var jsonstring1 = json.feedback_via_questionnaire;            
                var table = $('#table1').DataTable( {
                    "data": jsonstring1,
                    responsive: true,
                    paging: $(window).width() < 768 ? false  : true,
                    "columns": [
                        { "data": null,
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { "data": "category" },
                        { "data": "feature" },
                        {
                            "data": null,
                            render:function(data, type, row)
                            {
                                var ratingRow_dom = `<i class="fa fa-star" aria-hidden="true"></i>`;

                                arr = [];
                                for (let i = 0; i < data.rating; i++){
                                    arr.push(ratingRow_dom);
                                }

                                return arr.join(' ');
                            },
                            "targets": 3
                        },
                        { 
                            "data": null,
                            render: function(data, type, row){
                                var dateString = data.date; 
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
                                    
                                let output = day+sup + '\n'+ month.slice(0,3)  + ', ' + year;

                                return output;
                            }
                        },
                        {
                            "data": null,
                            render:function(data, type, row){
                                return '<button type="button" class="btn btn-view" id="'+(data.id)+'">View</button><button type="button" class="btn btn-edit" id="'+(data.id)+'">Edit</button>'
                            },
                            "targets": 5,
                        }
                    ],
                    "pagingType": "simple_numbers",
                    language: {
                        paginate: {
                            next: '<i class="fas fa-angle-right"></i>',
                            previous: '<i class="fa fa-angle-left"></i>'  
                        }
                    },
                    // "fnDrawCallback": function(oSettings) {
                    //     if ($('#table1 tr').length < 12) {
                    //         $('#table1_paginate').hide();
                    //     }
                    // },
                    "info": false,
                    "order": [[ 4, "desc" ]],
                    rowCallback: function(row, data, index) {
                        $('td:eq(1)', row).addClass('feature-'+(data.id-1));
                    },
                    fnDrawCallback: function(oSettings) {
                        var totalPages = this.api().page.info().pages;
                        if(totalPages == 1){ 
                            jQuery('#table1_paginate').hide(); 
                        }
                        else { 
                            jQuery('#table1_paginate').show(); 
                        }
                    },
                    "oLanguage": {
                        "sEmptyTable": "Sorry, you haven’t given any feedback yet, why don’t you?"
                    },
                    "columnDefs": [ 
                    { className: "questionaire-feature", "targets": [1] },
                    { responsivePriority: 1, targets: 2 },
                    { responsivePriority: 2, targets: 3 },
                    {
                        "targets": 5,
                        "data": null,
                        'createdCell':  function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'questionaire-button'); 
                        }
                    },
                    {
                        "targets": 1,
                        "data": null,
                        'createdCell':  function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'questionaire-feature'); 
                        }
                    },
                    {
                        "targets": 3,
                        "data": null,
                        'createdCell':  function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'questionaire-rating'); 
                        }
                    },
                    {
                        "targets": 0,
                        'createdCell':  function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'questionaire-id'); 
                        }
                    },
                    {
                        'targets': 4,
                        'createdCell':  function (td, cellData, rowData, row, col) {
                            $(td).attr('id', 'date'); 
                        }
                    },
                    { "width": "15%", "targets": 3 },
                    { "width": "20%", "targets": 1 },
                ]
                });

                var jsonstring2 = json.feedback_via_chat; 
                var table2 = $('#table2').DataTable( {
                        "data": jsonstring2,
                        responsive: true,
                        paging: $(window).width() < 768 ? false  : true,
                        "columns": [
                            { "data": null,
                                render: function (data, type, row, meta) {
                                    return meta.row + meta.settings._iDisplayStart + 1;
                                }
                            },
                            { "data": "category" },
                            { "data": "suggestion" },
                            {
                                "data": null,
                                render:function(data, type, row)
                                {
                                    var ratingRow_dom = `<i class="fa fa-star" aria-hidden="true"></i>`;

                                    arr = [];
                                    for (let i = 0; i < data.rating; i++){
                                        arr.push(ratingRow_dom);
                                    }

                                    return arr.join(' ');
                                },
                                "targets": 3
                            },
                            { 
                                "data": null,
                                render: function(data, type, row){
                                    var dateString = data.date; 
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

                                    let output = day+sup + '\n'+ month.slice(0,3)  + ', ' + year;

                                    return output;
                                }
                            },
                            {
                                "data": null,
                                render:function(data, type, row){
                                    return '<button type="button" class="btn chat-view" id="'+(data.id-1)+'">View</button>'
                                },
                                "targets": 5,
                            }
                        ],
                        language: {
                            paginate: {
                                next: '<i class="fas fa-angle-right"></i>',
                                previous: '<i class="fa fa-angle-left"></i>'  
                            }
                        },
                        fnDrawCallback: function(oSettings) {
                            var totalPages = this.api().page.info().pages;
                            if(totalPages == 1 || totalPages == 0){ 
                                jQuery('#table2_paginate').hide(); 
                            }
                            else { 
                                jQuery('#table2_paginate').show(); 
                            }
                        },
                        "info": false,
                        "oLanguage": {
                            "sEmptyTable": "Sorry, you haven’t given any feedback yet, why don’t you?"
                        },
                        "columnDefs": [
                        { responsivePriority: 1, targets: 2 },
                        { responsivePriority: 2, targets: 3 }, 
                        {
                            "targets": 5,
                            "data": null,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                                $(td).attr('id', 'chat-button'); 
                            }
                        },
                        {
                            "targets": 0,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                                $(td).attr('id', 'chat-id'); 
                            }
                        },
                        {
                            'targets': 4,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                                $(td).attr('id', 'date'); 
                            }
                        },
                        {
                            'targets': 3,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                                $(td).attr('id', 'chat-rating'); 
                            }
                        },
                        {
                            "targets": 2,
                            render: function ( data, type, row ) {
                                return data.length > 135 ?
                                data.substr( 0, 135 ) +'…' :
                                data;
                            }
                        },
                        {
                            'targets': 1,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                                $(td).attr('id', 'chat-feature'); 
                            }
                        },
                        { "width": "15%", "targets": 3 },
                        { "width": "20%", "targets": 1 },
                    ],
                });


                var jsonstring3 = json.news_ideas; 
                var table3 = $('#table3').DataTable( {
                        "data": jsonstring3,
                        responsive: true,
                        paging: $(window).width() < 768 ? false  : true,
                        "columns": [
                            { "data": null,
                                render: function (data, type, row, meta) {
                                    return meta.row + meta.settings._iDisplayStart + 1;
                                }
                            },
                            { "data": "idea" },
                            {
                                "data": null,
                                render: function(data, type, row){
                                    var dateString = data.date; 
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

                                    let output = day+sup + '\n'+ month.slice(0,3)  + ', ' + year;

                                    return output;
                                },
                                "targets": 2,
                            },
                            {
                                "data": null,
                                render:function(data, type, row){
                                    return '<button type="button" class="btn new-idea" id="'+(data.id-1)+'">View</button>'
                                },
                                "targets": 3,
                            }
                        ],
                        "info": false,
                        language: {
                            paginate: {
                                next: '<i class="fas fa-angle-right"></i>',
                                previous: '<i class="fa fa-angle-left"></i>'  
                            }
                        },
                       fnDrawCallback: function(oSettings) {
                            var totalPages = this.api().page.info().pages;
                            if(totalPages == 1 || totalPages == 0){ 
                                jQuery('#table3_paginate').hide(); 
                            }
                            else { 
                                jQuery('#table3_paginate').show(); 
                            }
                        },
                        "oLanguage": {
                            "sEmptyTable": "Sorry, you haven’t given any feedback yet, why don’t you?"
                        },
                        "fnRowCallback" : function(nRow, aData, iDisplayIndex){
                            $("td:first", nRow).html(iDisplayIndex +1);
                            return nRow;
                        },
                        "columnDefs": [ 
                        { responsivePriority: 1, targets: 1 },
                        {
                            "targets": 3,
                            "data": null,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                                $(td).attr('id', 'idea-button'); 
                            }
                        },
                        {
                            "targets": 1,
                            render: function ( data, type, row ) {
                                return data.length > 135 ?
                                data.substr( 0, 135 ) +'…' :
                                data;
                            }
                        },
                        {
                            "targets": 2,
                            "data": null,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                                $(td).attr('id', 'idea-date'); 
                            }
                        },
                        {
                            "targets": 0,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                                $(td).attr('id', 'idea-id'); 
                            }
                        },
                        { "width": "50%", "targets": 1 },
                    ],
                });
            }
        
            // if(JSON.parse(localStorage.getItem('emptyQuestion'))){
            //     $('.btn-give-feedback').css('display','none');
            // }else{
            //     $('.btn-give-feedback').css('display','block');
            // }

            if($('#table1 tbody td').hasClass('dataTables_empty')){
                $('#newIdeas tr').css('display', 'table-row');
                var giveFeedbackContainer = document.createElement("div");
                // $(giveFeedbackContainer).attr('colspan', '4');
                giveFeedbackContainer.className = "empty_feedback_btn";
                var giveFeedbackBtn = `<button type="button" class="btn-give-feedback">Give Feedback</button>`;
                giveFeedbackContainer.innerHTML = giveFeedbackBtn;
                $('#table1_paginate').css("display","none");
                // $(giveFeedbackContainer).insertAfter('#table3 tbody tr');
                $(giveFeedbackContainer).appendTo('.give_feedback_question');
            }
            // }else if($('#table2 tbody td').hasClass('dataTables_empty')){
            //     $('#newIdeas tr').css('display', 'table-row');
            //     var giveFeedbackContainer = document.createElement("div");
            //     // $(giveFeedbackContainer).attr('colspan', '4');
            //     giveFeedbackContainer.className = "empty_feedback_btn";
            //     var giveFeedbackBtn = `<button type="button" class="btn-give-feedback">Give Feedback</button>`;
            //     giveFeedbackContainer.innerHTML = giveFeedbackBtn;
            //     // $(giveFeedbackContainer).insertAfter('#table3 tbody tr');
            //     $(giveFeedbackContainer).appendTo('.give_feedback_chat');
            // }
            // else{
            //     $('#newIdeas tr').css('display', 'table-row');
            //     var giveFeedbackContainer = document.createElement("div");
            //     // $(giveFeedbackContainer).attr('colspan', '4');
            //     giveFeedbackContainer.className = "empty_feedback_btn";
            //     var giveFeedbackBtn = `<button type="button" class="btn-give-feedback">Give Feedback</button>`;
            //     giveFeedbackContainer.innerHTML = giveFeedbackBtn;
            //     // $(giveFeedbackContainer).insertAfter('#table3 tbody tr');
            //     $(giveFeedbackContainer).appendTo('.give_feedback_idea');
            // }

            if (window.matchMedia("(max-width: 767px)").matches){
                $("table").removeClass('display');
                var tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
            }
        // }

        $('#table1 tbody').on('click', '.btn-view', function(event){
             var rows = table.row( $(this).parents('tr') ).data();
             if(rows == undefined) {
                var selected_row = $(this).parents('tr');
                if (selected_row.hasClass('child')) {
                    selected_row = selected_row.prev();
                }

                var rowData = $('#table1').DataTable().row(selected_row).data();
                console.log("Mobile view", rowData);
                localStorage.setItem("viewData",JSON.stringify(rowData));
             }
            else{
                localStorage.setItem("viewData",JSON.stringify(rows));
                console.log("Desktop view", rows);
            }
             localStorage.removeItem("editClicked");
             localStorage.removeItem("ni");
             localStorage.removeItem("fvc");
             localStorage.setItem("viewClicked",JSON.stringify(true));
             localStorage.setItem("fvq",JSON.stringify(true));
             location.href = "view.html";
        });

        $('.btn-give-feedback').on('click', function(){
            location.href = "feedback.html";
        });

        $('#table2 tbody').on('click', '.chat-view', function(event){
             var rows = table2.row( $(this).parents('tr') ).data();
             if(rows == undefined) {
                var selected_row = $(this).parents('tr');
                if (selected_row.hasClass('child')) {
                    selected_row = selected_row.prev();
                }

                var rowData = $('#table2').DataTable().row(selected_row).data();
                console.log("Mobile view", rowData);
                localStorage.setItem("viewData",JSON.stringify(rowData));
             }
            else{
                localStorage.setItem("viewData",JSON.stringify(rows));
                console.log("Desktop view", rows);
            }
             localStorage.removeItem("editClicked");
             localStorage.removeItem("ni");
             localStorage.removeItem("fvq");
             localStorage.setItem("viewClicked",JSON.stringify(true));
             localStorage.setItem("fvc",JSON.stringify(true));
             location.href = "view.html";
        });

        $('#table3 tbody').on('click', '.new-idea', function(event){
             var rows = table3.row( $(this).parents('tr') ).data();
             if(rows == undefined) {
                var selected_row = $(this).parents('tr');
                if (selected_row.hasClass('child')) {
                    selected_row = selected_row.prev();
                }

                var rowData = $('#table3').DataTable().row(selected_row).data();
                console.log("Mobile view", rowData);
                localStorage.setItem("viewData",JSON.stringify(rowData));
             }
            else{
                localStorage.setItem("viewData",JSON.stringify(rows));
                console.log("Desktop view", rows);
            }
             localStorage.removeItem("editClicked");
             localStorage.removeItem("fvq");
             localStorage.removeItem("fvc");
             localStorage.setItem("viewClicked",JSON.stringify(true));
             localStorage.setItem("ni",JSON.stringify(true));
             location.href = "view.html";
        });

        $('#table1 tbody').on('click', '.btn-edit', function(event){
             var rows = table.row( $(this).parents('tr') ).data();
             if(rows == undefined) {
                var selected_row = $(this).parents('tr');
                if (selected_row.hasClass('child')) {
                    selected_row = selected_row.prev();
                }

                var rowData = $('#table1').DataTable().row(selected_row).data();
                console.log("Mobile edit", rowData);
                localStorage.setItem("editData",JSON.stringify(rowData));
             }
            else{
                localStorage.setItem("editData",JSON.stringify(rows));
                console.log("Desktop view", rows);
            }
             localStorage.removeItem("viewClicked");
             localStorage.removeItem("newIdeasViewClicked");
             localStorage.setItem("editClicked",JSON.stringify(true));
             location.href = "view.html";
        });

        edit = document.getElementById('questionaire-rating');

        $('#table1 tbody').on('click', '#questionaire-rating', function(e){
            if (window.matchMedia("(max-width: 767px)").matches){
                // if (e.offsetX > edit.offsetWidth) {
                //     edit.className = '';
                // } else {
                    // let evt = e.currentTarget.className.split(' ')[1].slice(8,9);
                    var rows = table.row( $(this).parents('tr') ).data();
                    console.log(rows);
                    localStorage.removeItem("viewClicked");
                    localStorage.removeItem("newIdeasViewClicked");
                    localStorage.setItem("editData",JSON.stringify(rows));
                    localStorage.setItem("editClicked",JSON.stringify(true));
                    location.href = "view.html";
                // }
            }
        });

        $('#table1, #table2').on('click', '.dtr-control', function(){
            if($('.odd').hasClass('parent')){
                $('.parent .dtr-control').css("white-space", "initial");
                $('#questionaire-feature').css("white-space", "initial");
                $('#questionaire-feature').css("width", "auto");
                // $('#questionaire-rating').css('cssText',"display:none !important");
                $('#questionaire-rating').css('margin-top','0.6rem');
                $( ".dtr-details li:nth-child(3)" ).css('display','none');
            }
            else if($('.even').hasClass('parent')){
                $('.parent .dtr-control').css("white-space", "initial");
                $('#questionaire-feature').css("white-space", "initial");
                $('#questionaire-feature').css("width", "auto");
                // $('#questionaire-rating').css('cssText',"display:none !important");
                $('#questionaire-rating').css('margin-top','0.6rem');
                $( ".dtr-details li:nth-child(3)" ).css('display','none');
            }
            else{
                $('.dtr-control').css("white-space", "nowrap");
                $('#questionaire-feature').css("white-space", "nowrap");
                $('#questionaire-feature').css("width", "100px");
                // $('#questionaire-rating').css('cssText',"display:block !important");
                $('#questionaire-rating').css('margin-top','0.6rem');
                $( ".dtr-details li:nth-child(3)" ).css('display','none');
            }
        });
        
        // if($('.page-item').hasClass('active')){
        //     $('.active .page-link').css('opacity', "1");
        // }
        // else{
        //      $('.page-link').css('opacity', "0.5");
        // }
    // });
});

if($('.odd').hasClass('parent')){
    $('.parent .dtr-control').css("white-space", "initial");
}

if($('.even').hasClass('parent')){
    $('.parent .dtr-control').css("white-space", "initial");
}

 $(window).on('load', function(){
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");

    getURLParameters();
});

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

  id = getUrlParameter('id');
  count = getUrlParameter('count');

}

function getUserDashboard(){
    customer_id = localStorage.getItem('customer_id');
     $.ajax({
        url: ajax_url,
        type: "POST",
        data: JSON.stringify({"customer_id": "6"}), 
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
            }else{
                 $.confirm({
                    icon: 'fa fa-exclamation-triangle',
                    content: 'Uh oh! Something went wrong.',
                    typeAnimated: true,
                });
                invalid_token = true;
            }
        },
            error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
  });
}


function error(data) {
  $.alert({
    content: data
  });
}