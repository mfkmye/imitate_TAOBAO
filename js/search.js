// callback({"result":[["sssss徐小姐的店","238.44827586206895"],["ssssss","259.25"],["sssss徐小姐","341.64285714285717"]]})
function ajaxFunc(method, url, data, callback, falg) {
    var xhr = null;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState, xhr.status);
        if (xhr.readyState == 4 & xhr.status == 200) {
            callback(xhr.responseText);
        }
    };
    method = method.toUpperCase();
    if (method == 'POST') {
        xhr.open(method, url, falg);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    } else if (method == 'GET') {
        xhr.open(method, url + '?' + data, falg);
        xhr.send();
    }
}

(function () {
    bindSearchEvent();
})();

function bindSearchEvent() {
    $('.search_input').on('input onpropertychange', function (e) {
        search($(this).val());
    });
    $(document).on('click', function () {
        $('.search_list').removeClass("search_list_show").html("");
    });
    $('.search_input').focus(function (e) {
        $('.search_icon_box').css('display', "none");
    }).blur(function (e) {
        $('.search_icon_box').css('display', $(this).val().length > 0 ? "none" : "block");
    });
}

function search(text, callback) {
    var url = "https://suggest.taobao.com/sug?code=utf-8&q=" + text + "&_ksTS=1572278313829_2225&callback=doJson";
    var oScript = $("<script></script>").attr({
        "src": url,
        "class": "search_script"
    }).appendTo('body');
}

function doJson(data) {
    // console.log(data);
    var result = data.result;
    var htmlText = "";
    result.forEach(function (ele, index) {
        // console.log(index, ele);
        htmlText += "<li>" + ele[0] + "</li>";
    });
    if (htmlText.length > 0) {
        $('.search_list').html(htmlText).addClass("search_list_show");
    } else {
        $('.search_list').removeClass("search_list_show").html("");
    }
    $('.search_script').remove();
}