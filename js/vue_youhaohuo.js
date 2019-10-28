$.ajax({
    type: "POST",
    url: "./data/youhaohuo.json",
    dataType: "json",
}).then(function (obj) {
    var data1 = obj[0];
    var data2 = obj[1];
    var youhaohuo = new Vue({
        el: "#youhaohuo",
        data: data1
    });
    var aiguangjie = new Vue({
        el: "#aiguangjie",
        data: data2
    });
    // console.log(youhaohuo.$data);
});