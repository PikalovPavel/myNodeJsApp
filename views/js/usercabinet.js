var registere=null;
function  loadRegister() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/register/0/1', false);
    xhr.send();

    if (xhr.status != 200) {
        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        register = JSON.parse(xhr.responseText);
        console.log(register);
    }

    registere=register;
}
loadRegister();
let app  = new Vue({
    el: '#app',
    data: {
        message:registere
    }
});



