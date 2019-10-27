var myCarousel = new Vue({
    el: '#carousel',
    data: {
        list: [{
            number: 12,
            imgs: ['./img2/image120.gif', './img2/image121.jpg', './img2/image122.jpg',
                './img2/image123.png',
                './img2/image124.png', './img2/image125.png', './img2/image126.png',
                './img2/image127.png',
                './img2/image128.png', './img2/image129.png', './img2/image130.png',
                './img2/image131.png'
            ]
        }, {
            number: 2,
            imgs: ['./img2/image058.jpg', './img2/image059.jpg']
        }, {
            number: 2,
            imgs: ['./img2/image060.jpg', './img2/image061.jpg']
        }, {
            number: 2,
            imgs: ['./img2/image062.jpg', './img2/image063.jpg']
        }, {
            number: 2,
            imgs: ['./img2/image064.jpg', './img2/image065.jpg']
        }, {
            number: 2,
            imgs: ['./img2/image066.jpg', './img2/image067.jpg']
        }],
        currentIndex: 0,
        timer: '',
        transition: "list",
    },
    methods: {
        go: function () { //定时轮播
            this.timer = setInterval(() => {
                this.autoPlay()
            }, 4000)
        },
        stop: function () { //暂停播放
            clearInterval(this.timer)
            this.timer = null
        },
        autoPlay: function () { //下一个
            this.transition = "list";
            this.currentIndex++
            if (this.currentIndex > this.list.length - 1) {
                this.currentIndex = 0

            }
        },
        left: function () { //向左滑动
            this.stop();
            this.autoPlay();
            this.go();
        },
        right: function () { //向右滑动
            this.transition = "list2";
            this.stop();
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.list.length - 1
            }
            this.go();

        }
    },
    created: function () {
        this.$nextTick(function () { //启动轮播图
            myCarousel.timer = setInterval(function () {
                myCarousel.autoPlay()
            }, 2000);
        })
    }
});