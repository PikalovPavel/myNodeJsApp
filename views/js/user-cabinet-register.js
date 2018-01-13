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
                        $("#result_text").text("");
                    } catch (e) {
                        app.message={};
                        $("#result_text").text("У заключённого с этим айди на данный момент не стоит оценок:(");
                    }
                }
            } else {
                    app.message={};
                    $("#result_text").text("Все поля долджны быть заполнены");
                }
            } else {
                    app.message={};
                    $("#result_text").text("Заключённого с ID = "+inputId+" не существует");
                }
            }
        }

    });






