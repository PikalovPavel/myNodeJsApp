
var app = new Vue({
    el: '#appe',
    data: {
        message:{},
    },
    methods: {
        load:function () {
            var select = $("#subjectSelect").val();
            var selectInt = parseInt(select,10);
                var register = {};
                if(!isNaN(selectInt)) {
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', '/api/registerById/'+selectInt, false);
                    xhr.send();
                    if (xhr.status != 200) {
                        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
                    } else {
                        register = JSON.parse(xhr.responseText);
                        console.log(register);
                        try {
                            for (k in register) {
                                var arr1;
                                var arr2;
                                arr1=register[k].prisoner_register.human_prisoner['ИМЯ'];
                               register[k]['ЧЕЛОВЕК_ИД']=arr1;
                                arr2=register[k].prisoner_register.human_prisoner['ФАМИЛИЯ'];
                                register[k]['ПРЕДМЕТ_ИД']=arr2;

                            }
                            app.message = register;
                            $("#result_text").text("");
                        } catch (e) {
                            console.log(e);
                            app.message={};
                            $("#result_text").text("У заключённого с этим айди на данный момент не стоит оценок:(");
                        }
                    }
                } else {
                    app.message={};
                    $("#result_text").text("Все поля долджны быть заполнены");
                }

        }
    }

});
