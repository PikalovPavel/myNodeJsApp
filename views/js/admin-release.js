var releas = null;

function loadReleasers() {
    var register = {};
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/allReleas', false);
    xhr.send();
    if (xhr.status != 200) {
        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        register = JSON.parse(xhr.responseText);
        }
        console.log(register);
        releas=register;
    }
    loadReleasers();


loadReleasers();
var app = new Vue({
    el: '#appe',
    data: {
        messagee:releas
    }
});



