{
    /* service-float
    <div class="service-float-item">
        <div class="lt">
            <div class="service-panel">
                <h5>
                    <a>title</a>
                    <a>更多</a>
                </h5>
                <p>
                    <a></a>
                    ......
                </p>
            </div>
            ...*2
        </div>
        <div class="rt">
            <h3></h3>
            <div>
                <a>
                    <img src="./img/image011.jpg">
                    <h5></h5>
                </a>
                ...*6
            </div>
        </div>
    </div> */
}
_debug = false;
$.ajax({
    url: "./data/data.json", //json文件位置
    type: "GET", //请求方式为get
    dataType: "json", //返回数据格式为json
    async: false,
    error: function (e) {
        console.log(e.status, e.statusText);
    }
}).then(function (res) {
    if(_debug) console.log(res);
    var service_float = $('.service-float');
    res.forEach(function (ele, index) {
        var service_float_item = $('<div></div>').addClass('service-float-item');
        var textList = ele.text_list;
        var lt = $('<div></div>').addClass('lt');
        textList.forEach(function (tl_ele, tl_index) {
            var service_panel = $('<div></div>').addClass('service-panel');
            $('<h5></h5>').append($('<a></a>').text(tl_ele.title))
                .append($('<a></a>').text("更多>"))
                .appendTo(service_panel);
            var list = tl_ele.list;
            var p = $('<p></p>');
            list.forEach(function (list_ele, list_index) {
                p.append($('<a></a>').text(list_ele));
            });
            p.appendTo(service_panel);
            service_panel.append(p).appendTo(lt)
        });
        service_float_item.append(lt);
        var rt = $('<div></div>').addClass('rt').append($('<h3></h3>').text('猜你喜欢'));
        var imgList = ele.img_list;
        var imgPanelBox = $('<div></div>').appendTo(rt);
        imgList.forEach(function (il_ele, il_index) {
            $('<a></a>').append($('<div></div>').addClass('img-wrapper').append($('<img />').attr('src', il_ele.src))).append($('<h5></h5>').text(il_ele.description)).appendTo(imgPanelBox);
        });
        service_float_item.append(rt).appendTo(service_float);
    });
    // add Event
    $('.tbh-service').hover(function () {
        $('.service-float').show();
    }, function () {
        $('.service-float').hide();
    });
    $('.service-bd').on('mouseenter', 'li', function () {
        var index = $(this).index();
        $('.service-float>.show_block').removeClass('show_block');
        $('.service-float-item').eq(index).addClass('show_block');
    });
});