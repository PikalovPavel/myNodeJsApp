var visits=null;
function loadVisitors() {
    var register = {};
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/allVisits', false);
    xhr.send();
    if (xhr.status != 200) {
        Console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        visitors = JSON.parse(xhr.responseText);
        console.log(visitors);
        for (k in visitors) {
            var arr;
            arr=visitors[k]['ДАТА_ПОСЕЩЕНИЯ'].split("T");
            visitors[k]['ДАТА_ПОСЕЩЕНИЯ']=arr[0];
        }
    }
    console.log(visitors);
    visits=visitors ;
}
loadVisitors();
var app2 = new Vue ({
    el: '#appe',
    data: {
        messagee:visits
    }
});