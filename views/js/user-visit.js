function loadPrisoners() {
    var register = {};
    var Ids = [];
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/allPrisoners', false);
    xhr.send();
    if (xhr.status != 200) {
        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        register = JSON.parse(xhr.responseText);
        for (var k in register) {
            Ids[k]=register[k]['ЧЕЛОВЕК_ИД'];
        }

    }
return Ids;
}
function include(arr,obj) {

    return (arr.indexOf(obj) != -1);
}
function postVisit() {
    var inputText = $("#prisonerID").val();
   var prisoners = loadPrisoners();
    var inputId = parseInt(inputText,10);
    if (!isNaN(inputId)) {
        var text = $("#datepicker").val();
        var data = {};
        if (include(prisoners,inputId)) {
        data.inpudId=inputId;
        data.text=text;
        $.ajax({
            url : '/api/visit',
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
                    $("#notify").append("Запрос на посещение был отправлен!");
                }
                else if(data==="false") {
                    if ( !($( "#notify" ).length) ) {
                        $("#notify-container").append("<div id=\"notify\"></div>");
                    }
                    $("#notify").empty();
                    $("#notify").removeClass();
                    $("#notify").addClass("alert alert-warning alert-dismissable");
                    $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
                    $("#notify").append("Нельзя назначить встречу на эту дату!");
                }

            }

        });
    }
    else {
            if ( !($( "#notify" ).length) ) {
                $("#notify-container").append("<div id=\"notify\"></div>");
            }
            $("#notify").empty();
            $("#notify").removeClass();
            $("#notify").addClass("alert alert-danger alert-dismissable");
            $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
            $("#notify").append("Заключенного с id = "+inputId+" не существует");
        }

    }  else {
        if ( !($( "#notify" ).length) ) {
            $("#notify-container").append("<div id=\"notify\"></div>");
        }
        $("#notify").empty();
        $("#notify").removeClass();
        $("#notify").addClass("alert alert-warning alert-dismissable");
        $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
        $("#notify").append("Поле не должно быть пустым");
    }
}


