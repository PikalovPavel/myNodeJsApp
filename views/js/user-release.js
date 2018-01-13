
function postRelease() {
    if (inputText!==null) {

        var inputText = $("#prisonerID").val();
        var inputId = parseInt(inputText,10);
        var text = $("#reason").val();
        var data = {};
        data.inpudId=inputId;
        data.text=text;
            $.ajax({
                url : '/api/release',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),

                success: function (data) {
                    console.log(data);
                    var result;
                    if (data=="true") {
                        if ( !($( "#notify" ).length) ) {
                            $("#notify-container").append("<div id=\"notify\"></div>");
                        }
                        $("#notify").empty();
                        $("#notify").removeClass();
                        $("#notify").addClass("alert alert-success alert-dismissable");
                        $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
                        $("#notify").append("Все было успешно добавлено!");
                    }
                    else if(data==="false") {
                        if ( !($( "#notify" ).length) ) {
                            $("#notify-container").append("<div id=\"notify\"></div>");
                        }
                        $("#notify").empty();
                        $("#notify").removeClass();
                        $("#notify").addClass("alert alert-danger alert-dismissable");
                        $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
                        $("#notify").append("Заключенного с id = "+inputId+" не существует. Обратитесь к администратору за нужным ID.");
                    }

                }

            });
        }

    }

