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
   var prisoners = loadPrisoners();
    if (inputText!==null) {
        var inputText = $("#prisonerID").val();
        var inputId = parseInt(inputText,10);
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
                   alert(data);
                }
                else if(data==="false") {
                    alert("На эту дату уже назначено посещение")
                }

            }

        });
    }
    else alert("Заключенного с таким ID не существует")
    }
else alert("Поле не должно быть пустым");
}


