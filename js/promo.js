// 轮播图参数对象
var config = {
    imgWidth: 520,
    curIndex: 1,
    imgNumber: $('.promo-bd >img').length,
    oConfig: this,
    dom: {
        imgs: $('.promo-bd'),
        btn: $('.promo-opt'),
        nav: $('.promo-nav'),
        setImgsPosition: undefined
    },
    animate: {
        id: null,
        duration: 16,
        total: 1000,
        auto_time:2000,
        complete: true,
        stop: false
    },
    _debug: false
}

// 初始化
function init() {
    var firstImg = $('.promo-bd>img').first();
    var lastImg = $('.promo-bd>img').last();
    firstImg.clone().insertAfter(lastImg);
    lastImg.clone().insertBefore(firstImg);
    setDotsStatus();
    initImgsFun();
    config.dom.setImgsPosition();
    addEvent();
}

function initImgsFun() {
    config.dom.setImgsPosition = function (x, y) {
        x = (x || -config.curIndex * config.imgWidth) + 'px';
        y = (y || 0) + 'px';
        config.dom.imgs.css({
            'left': x,
            'top': y
        });
    }
    config.dom.setImgsAnimate = function (x) {
        var complete = config.animate.complete;
        if (config._debug) console.log("animate complete " + complete);
        if (!complete) {
            return;
        } else {
            config.animate.complete = false;
        }
        var curIndex = config.curIndex;
        if (config.curIndex < 1) {
            config.curIndex = config.imgNumber;
        } else if (config.curIndex > config.imgNumber) {
            config.curIndex = 1;
        }
        setDotsStatus();
        x = (x || -curIndex * config.imgWidth) + 'px';
        config.dom.imgs.animate({
            'left': x
        }, {
            'duration': config.animate.total,
            'complete': function () {
                if (config._debug) console.log('animate has complete');
                config.animate.complete = true;
                config.dom.setImgsPosition(getCorrectMarginLeft());
            }
        });
    }
}

// 设置导航点的状态
function setDotsStatus() {
    config.dom.nav.find('li.selected').removeClass('selected');
    config.dom.nav.find('li').eq(config.curIndex - 1).addClass('selected');
}

// 获取轮播图的真实位置
function getCorrectMarginLeft() {
    var left = -config.curIndex * config.imgWidth
    if (config._debug) console.log('left : ' + left);
    return left;
}

// 轮播图切换图片
function switchTo(index, direction) {
    if (config._debug) console.log('need stop ' + config.animate.stop);
    if (index === config.curIndex) {
        if (config._debug) console.log("curIndex not change");
        return;
    } else {
        if (config._debug) console.log("curIndex change from " + config.curIndex + " to " + index);
        config.curIndex = index;
    }
    setDotsStatus();
    config.dom.setImgsAnimate(getCorrectMarginLeft());
}

// 绑定点击事件
function addEvent() {
    // 绑定导航点的点击事件
    config.dom.nav.on('click', 'li', function () {
        if (!config.animate.complete) return;
        var index = $(this).index() + 1;
        var direction;
        if (index < config.curIndex) {
            direction = 'left';
        } else if (index > config.curIndex) {
            direction = 'right';
        } else {
            direction = 'stop';
        }
        if (config._debug) console.log('click index : ' + index);
        switchTo(index, direction);
    });
    // 绑定左右按钮事件
    config.dom.btn.on('click', 'span', function () {
        if (!config.animate.complete) return;
        var index = config.curIndex;
        if ($(this).hasClass('s-prev')) {
            index--;
        } else {
            index++;
        }
        switchTo(index);
    });
    // 绑定暂停轮播事件
    $('.promo').hover(function () {
        config.animate.stop = true;
    }, function () {
        config.animate.stop = false;
    });
}
(function () {
    init();
    autoPlay();
})();
// 自动轮播
function autoPlay() {
    setInterval(function () {
        if (!config.animate.stop) {
            switchTo(config.curIndex + 1);
        }
    }, config.animate.auto_time);
}