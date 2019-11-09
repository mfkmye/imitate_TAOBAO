;
(function () {
    getData();
})();
// 获取数据
function getData() {
    $.ajax({
        url: "./data/cainixihuan_data.json",
        type: "GET",
        dataType: "json",
        async: false,
        error: function (e) {
            console.log(e.status, e.statusText);
        }
    }).then(function (data) {
        createEle(data);
    });
}
// 初始化组件(双层嵌套组件)
function initComponents(data) {
    Vue.component('vue_layer', {
        data: function () {
            return {
                title: data.title,
                result: data.result,
            };
        },
        template: `<div>
                        <h3><span></span><span>{{ title }}</span></h3>
                        <div>
                            <vue_layer_item v-for="(item, index) in result" :key="item.itemId" :itemid="item.itemId" :pic="item.pic" :item_name="item.itemName" :promotion_price="item.promotionPrice" :sale_cnt="item.saleCnt" :is_ad="item.extMap.isAd" :title_icon="item.atmosphere.activityTagIcon"></vue_layer_item>
                        </div>
                        <div class="hotsale-ft"><span>END</span></div>
                    </div>`,
        components: {
            vue_layer_item: {
                props: ['itemid', 'pic', 'item_name', 'promotion_price', 'is_ad', 'sale_cnt', 'title_icon'],
                template: `<div class="item">
                                <a>
                                    <div class="img-wrapper"><img :src="pic"></div>
                                    <h4><img v-if="title_icon" :src="title_icon" />{{ item_name }}</h4>
                                </a>
                                <p class="info">
                                    <!-- 根据特殊条件决定是否显示 -->
                                    <span v-if="is_ad" class="adHot" style="background-image: url(&quot;//img.alicdn.com/tps/i3/TB1xWZUKVXXXXXbXXXXdpC3GXXX-33-15.png&quot;); width: 33px; height: 15px; left: 0px; top: 5px;"></span>
                                    <span class="price"><span>¥</span><span>{{ promotion_price }}</span></span>
                                    <!-- 根据特殊条件决定是否显示 -->
                                    <span v-if="is_ad" class="sales">销量:{{ sale_cnt }}</span>
                                </p>
                                <a class="item-more">
                                    <p>♡找相似</p>
                                    <p>发现更多相似的宝贝&gt;</p>
                                </a>
                            </div>`
            }
        }
    });
}
// 组件实例化
function createEle(data) {
    console.log(data);
    initComponents(data);
    var vue_layer = new Vue({
        el: '#vue_layer',
    });
}