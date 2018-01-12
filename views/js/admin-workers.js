
var workers=null;
var teachers=null;

function loadPrisoners() {
    var register = {};

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/allWorkers', false);
    xhr.send();
    if (xhr.status != 200) {
        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        register = JSON.parse(xhr.responseText);
        console.log(register);
    }
    workers=register;

}

function loadTeachers() {
    var register = {};

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/allTeachers', false);
    xhr.send();
    if (xhr.status != 200) {
        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        register = JSON.parse(xhr.responseText);
        console.log(register);
    }
    teachers=register;

}
loadPrisoners();
loadTeachers();
var app = new Vue({
    el: '#appe',
    data: {
        messagee:workers,
        teacher:teachers
    }
});