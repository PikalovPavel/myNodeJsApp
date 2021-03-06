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
function postMarks() {
    var inputText = $("#prisonerID").val();
    var prisoners = loadPrisoners();
    var inputId = parseInt(inputText,10);
    let subject = $( "#subjectSelect option:selected" ).val();
    let subjectInt = parseInt(subject,10);
    let kr1 = $( "#kr1 option:selected" ).val();
    let kr1Int = parseInt(kr1,10);
    let kr2 = $( "#kr2 option:selected" ).val();
    let kr2Int = parseInt(kr2,10);
    let kr3 = $( "#kr3 option:selected" ).val();
    let kr3Int = parseInt(kr3,10);
    let kr4 = $( "#kr4 option:selected" ).val();
    let kr4Int = parseInt(kr4,10);
    let lk = $( "#kr4 option:selected" ).val();
    let lkInt = parseInt(lk,10);
    if (!isNaN(inputId)&&!isNaN(kr1Int)&&!isNaN(kr2Int)&&!isNaN(kr3Int)&&!isNaN(kr4Int)&&!isNaN(lkInt)) {

        var data = {};
        if (include(prisoners,inputId)) {
            data.inpudId=inputId;
            data.subject=subjectInt;
            data.kr1=kr1Int;
            data.kr2=kr2Int;
            data.kr3=kr3Int;
            data.kr4=kr4Int;
            data.lk=lkInt;
            $.ajax({
                url : '/api/setMarks',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),

                success: function (data) {
                    console.log(data);
                    var result;
                    if (data) {
                        if ( !($( "#notify" ).length) ) {
                            $("#notify-container").append("<div id=\"notify\"></div>");
                        }
                        $("#notify").empty();
                        $("#notify").removeClass();
                        $("#notify").addClass("alert alert-success alert-dismissable");
                        $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
                        $("#notify").append("Вы успешно поставили оценки!");
                    }
                    else if(!data) {
                        if ( !($( "#notify" ).length) ) {
                            $("#notify-container").append("<div id=\"notify\"></div>");
                        }
                        $("#notify").empty();
                        $("#notify").removeClass();
                        $("#notify").addClass("alert alert-danger alert-dismissable");
                        $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
                        $("#notify").append("Оценки не были поставлены");
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
        $("#notify").append("Все поля должны быть заполнены");
    }
}



