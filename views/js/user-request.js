var release={};
var visits={};

function loadPrisoners() {
    var register = {};

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/allReqEarly', false);
    xhr.send();
    if (xhr.status != 200) {
        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        register = JSON.parse(xhr.responseText);
        console.log(register);
    }
    release=register;

}

function loadTeachers() {
    var register = {};

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/allReqVisit', false);
    xhr.send();
    if (xhr.status != 200) {
        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        register = JSON.parse(xhr.responseText);
        for (k in register) {
            var arr;
            arr=register[k]['ДАТА_ПОСЕЩЕНИЯ'].split("T");
            register[k]['ДАТА_ПОСЕЩЕНИЯ']=arr[0];
        }
        console.log(register);
    }
    visits=register;

}
loadPrisoners();
loadTeachers();
var app = new Vue({
    el: '#appe',
    data: {
        messagee:release,
        teacher:visits
    }
});