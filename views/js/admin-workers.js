
var workers=[];
var teachers=[];

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
        for (k in register) {
            let arr0;
            let arr1;
            arr0=register[k].human_personal['Дата_Рождения'].split("T");
            register[k].human_personal['Дата_Рождения']=arr0[0];
            arr1=register[k]['ДАТА_НАЧАЛА_РАБОТЫ'].split("T");
            register[k]['ДАТА_НАЧАЛА_РАБОТЫ']=arr1[0];
        }
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