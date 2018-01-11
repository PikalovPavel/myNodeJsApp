function postVisit() {
    if (inputText!==null) {

        var inputText = $("#prisonerID").val();
        var inputId = parseInt(inputText,10);
        var text = $("#datepicker").val();
        var data = {};
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
                    $("#result_text").text("Все было успешно добавлено!");
                }
                else if(data==="false") {
                    $("#result_text").text("Заключенного с id = "+inputId+" не существует. Обратитесь к администратору за нужным ID.");
                }

            }

        });
    }

}