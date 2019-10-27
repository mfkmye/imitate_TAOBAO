;
$('.notice-hd').on('mouseenter', 'li', function (e) {
    var index = $(this).index();
    e = window.event || e;
    $('.notice-hd .selected').removeClass('selected');
    $(this).addClass('selected');
    $('.notice-bd .selected').removeClass('selected');
    $('.notice-bd>ul').eq(index).addClass('selected');
});

$('.conve-lise').on('mouseenter', 'li', function (e) {
    e = window.event || e;
    var index = $(this).index();
    if (index < 3) {
        $('.conve-lise .selected').removeClass('selected');
        $('.conve-bd-box .selected').removeClass('selected');
        $(this).addClass('selected');
        $('.conve-bd-box').addClass('show_block');
        $('.conve-bd-box>li').eq(index).addClass('selected');
    }
});

$('.conve-bd-box-exit').click(function (e) {
    $('.conve-lise .selected').removeClass('selected');
    $('.conve-bd-box .selected').removeClass('selected');
    $('.conve-bd-box').removeClass('show_block');
});