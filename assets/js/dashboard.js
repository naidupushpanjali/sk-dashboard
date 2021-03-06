const logFileText = async file => {
  return await fetch(file);
};
// var user_resp = $.parseJSON(existingData.user_resp);
$(document).ready(function() {
  //   $.getJSON("./assets/js/feedback.json", resp => {
  fetch("./assets/json/dashboard.json")
    .then(promise => promise.json())
    .then(json => {

        var user = localStorage.getItem("user");
        var welcomeMessage = document.createElement("div");
        welcomeMessage.className = "GreetingMessage";
        var welcomeMessage_dom =
            `<div class="greetingText"><h5>Welcome back, ` +
            user +
            `!</h5>
            <p> This is your feedback dashboard, you can find a summary and details
                of the feedback and new ideas you have shared with us below.</p></div>
                <button type="button" class="btn-give-feedback">Give Feedback</button>`;

        welcomeMessage.innerHTML = welcomeMessage_dom;
        $(welcomeMessage).appendTo("#welcomeMessage");

        //JSON for user rating
        json.user_rating.forEach(el => {
            var count_dom = 
            `<div class="count">`+ el.count + `</div>`
            $(count_dom).appendTo("#count-"+el.rating);
        });

        var jsonstring = tableData.feedback_via_questionnaire;       
        
            var table = $('#table1').DataTable( {
                "data": jsonstring,
                "columns": [
                    { "data": "id" },
                    { "data": "category" },
                    { "data": "question" },
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
                            let output = day+`<sup>`+"th"+`</sup>`  + '\n'+ month.slice(0,3)  + ',' + year;

                            return output;
                        }
                    },
                    {
                        "data": null,
                        render:function(data, type, row){
                            return '<button type="button" class="btn btn-view" id="'+(data.id-1)+'">View</button><button type="button" class="btn btn-edit">Edit</button>'
                        },
                        "targets": 5,
                    }
                ],
                "columnDefs": [ 
                {
                    "targets": 5,
                    "data": null,
                    'createdCell':  function (td, cellData, rowData, row, col) {
                        $(td).attr('id', 'button'); 
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
            ],
        });

        $('.btn-view').on('click', function(event){
             var rows = table.rows(event.currentTarget.id).data();
             console.log(rows[0]);
             localStorage.setItem("viewData",JSON.stringify(rows[0]));
             localStorage.setItem("viewClicked",JSON.stringify(true));
             location.href = "view.html";
        });
    });

    var tableData = 
    {
        "feedback_via_questionnaire": 
        [
            {
                "id": "1",
                "category": "Reports",
                "question": "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
                "suggestions": "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
                "rating": "1",
                "image_web": "./assets/images/Illustration-1 (1).svg",
                "image_mobile": "../images/mob-1.svg",
                "description": "Lorem ipsum",
                "date": "12-2-2020"
            },
            {
                "id": "2",
                "category": "Reports",
                "question": "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
                "suggestions": "Lorem ipsum",
                "rating": "2",
                "image_web": "./assets/images/Illustration-1 (1).svg",
                "image_mobile": "../images/mob-1.svg",
                "description": "Lorem ipsum",
                "date": "12-2-2020"
            },
            {
                "id": "3",
                "category": "Reports",
                "question": "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
                "suggestions": "Lorem ipsum",
                "rating": "3",
                "image_web": "./assets/images/Illustration-1 (1).svg",
                "image_mobile": "../images/mob-1.svg",
                "description": "Lorem ipsum",
                "date": "12-2-2020"
            }
        ],
        "feedback_via_chat":[
            {
                "id":"1",
                "category":"margin",
                "suggestion": "Lorem ipsum",
                "rating": "2",
                "date": "12-2-2020"
            },
            {
                "id":"2",
                "category":"margin",
                "suggestion": "Lorem ipsum",
                "rating": "2",
                "date": "12-2-2020"
            }
        ],
        "new_ideas": [
            {
                "id": "1",
                "idea": "Lorem Ipsum text"
            },
            {
                "id": "2",
                "idea": "Lorem Ipsum text"
            }
        ]
    }
});

