<template>
    <div class="page-group">
        <div class="page page-current">
            <header class="bar bar-nav" style="z-index: 999;">
                <h1 class="title" v-text="header_title"></h1>
            </header>
            <div class="content" style="top:1rem;">
                <div class="list-block media-list">
                    <ul v-for="item in listData" @click="Details(item.id)">
                        <li class="external item-link item-content">
                            <div class="item-media">
                                <img class="item-img" :src="item.img">
                            </div>
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title" v-text="item.title"></div>
                                    <div class="item-after"></div>
                                </div>
                                <div class="item-subtitle">
                                    <span>微信版本: {{item.version}}</span>
                                </div>
                                <div class="item-text">                                        
                                    <span>支持iOS7.0~iOS10.3</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <footer>
                        <p class="rights">2017 © Joname.</p>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data: function() {
    return {
        header_title: "iOS微信免越狱下载",
        listData: ""
    }
  },
  created: function() {
    this.getDatas();
  },
  methods:{
    getDatas: function() {
        this.$http.get("https://www.easy-mock.com/mock/5968a4edeec7d75c08df4544/joe/listdata").then(response => {
        this.listData = response.body.data;
        // console.log(listData)
        },error => {
            console.log(error);
        });
    },
    Details: function(id) {
        // console.log(id);
        this.$router.push("/detail?id="+id)
    }
  }
}
</script>
<style scoped>
.item-img {border-radius: 50%;width: 4rem;}
.item-subtitle,.item-text{color:#007AFF;}
.rights{color:#3d4145;text-align: center;}
</style>
