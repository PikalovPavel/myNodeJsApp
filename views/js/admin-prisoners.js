
var prisoners=null;

function loadPrisoners() {
    var register = {};

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/allPrisoners', false);
    xhr.send();
    if (xhr.status != 200) {
        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        register = JSON.parse(xhr.responseText);
        console.log(register);
        for (k in register) {

        var arr;
        arr=register[k].human_prisoner['Дата_Рождения'].split("T");
        register[k].human_prisoner['Дата_Рождения']=arr[0];
        }

    }
    prisoners=register;

}
loadPrisoners();
var app = new Vue({
    el: '#appe',
    data: {
        messagee:prisoners
    }
});