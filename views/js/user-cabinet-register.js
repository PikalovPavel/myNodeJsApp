function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

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
    var app = new Vue({
        el: '#appe',
        data: {
            message:{},
            mesb:true
        },
        methods: {
            load:function () {
                var inputText = $("#prisonerID").val();
                var inputId = parseInt(inputText,10);
                var select = $("#subjectSelect").val();
                var selectInt = parseInt(select,10);
                if (include(loadPrisoners(),inputId)) {
                var register = {};
                if(!isNaN(inputId)&&!isNaN(selectInt)) {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', '/api/register/'+inputId+'/'+selectInt, false);
                xhr.send();
                if (xhr.status != 200) {
                    Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
                } else {
                    register = JSON.parse(xhr.responseText);
                    console.log(register);
                    try {
                        register['ЧЕЛОВЕК_ИД'] = register.prisoner_register.human_prisoner['ИМЯ'];
                        register['ПРЕДМЕТ_ИД'] = register.prisoner_register.human_prisoner['ФАМИЛИЯ'];
                        app.message = register;
                        $("#notify").empty();
                        $("#notify").removeClass();
                    } catch (e) {
                        app.message={};
                        if ( !($( "#notify" ).length) ) {
                            $("#notify-container").append("<div id=\"notify\"></div>");
                        }
                        $("#notify").empty();
                        $("#notify").removeClass();
                        $("#notify").addClass("alert");
                        $("#notify").addClass("alert-warning");
                        $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
                        $("#notify").append("У заключённого с этим айди на данный момент не стоит оценок:(");
                    }
                }
            } else {
                    app.message={};
                    if ( !($( "#notify" ).length) ) {
                        $("#notify-container").append("<div id=\"notify\"></div>");
                    }
                    $("#notify").empty();
                    $("#notify").removeClass();
                    $("#notify").addClass("alert");
                    $("#notify").addClass("alert-warning");
                    $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
                    $("#notify").append("Все поля долджны быть заполнены");
                }
            } else {
                    app.message={};
                    if ( !($( "#notify" ).length) ) {
                        $("#notify-container").append("<div id=\"notify\"></div>");
                    }
                    $("#notify").empty();
                    $("#notify").removeClass();
                    $("#notify").addClass("alert");
                    $("#notify").addClass("alert-danger");
                    $("#notify").append("<a href=\"#\" id=\"notify-close\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>");
                    $("#notify").append("Заключённого с ID = "+inputId+" не существует");
                }
            }
        }

    });






