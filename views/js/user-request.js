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
function checkerdate(arr) {
    var dateArray = arr.split("-");
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
    console.log(now);
    var other = new Date(parseInt(dateArray[0],10),parseInt(dateArray[1],10)-1,parseInt(dateArray[2],10)).valueOf();
    var othere = new Date(parseInt(dateArray[0],10),parseInt(dateArray[1],10)-1,parseInt(dateArray[2],10));
    console.log(othere);
    return other < today;

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
            ///КОСТЫЛИ!
            if (register[k]['СТАТУС']) register[k]['СТАТУС']="t";
            if (!register[k]['СТАТУС']) register[k]['СТАТУС']="f";
            if (checkerdate(arr[0])) register[k]['СТАТУС']='Дата уже прошла';
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