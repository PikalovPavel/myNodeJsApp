
window.onload = function () {
    var app = new Vue({
        el: 'body',
        data: {
            messagee:""
        }
    });
};


    function getRegister() {
    var register = {};
        let number = $( "#subjectSelect option:selected" ).val();
        let numberInt = parseInt(number,10);
        let id = $("#prisonerID").val();
        let idInt = parseInt(id,10);
        console.log(idInt);
        console.log(numberInt);
        let xhr = new XMLHttpRequest();
        if (isNaN(idInt)) idInt=0;
        if (isNaN(numberInt)) numberInt=0;
        xhr.open('GET', '/api/register/'+idInt+'/'+numberInt, false);
        xhr.send();
        if (xhr.status != 200) {
            Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
        } else {
            register = JSON.parse(xhr.responseText);
        }

        app.messagee=register;
     }






