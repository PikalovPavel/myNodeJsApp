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
                    $("#result_text").text("Запрос на посещение был отправлен!");
                }
                else if(data==="false") {
                    $("#result_text").text("Нельзя назначить встречу на эту дату!");
                }

            }

        });
    }
    else $("#result_text").text("Заключенного с id = "+inputId+" не существует");

    }  else $("#result_text").text("Пол не должно быть пустым");
}


