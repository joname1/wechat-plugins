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
                                    <span v-text="byfree"></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="loading" v-show="!listData.length">
                        <img src="../assets/loading.gif" width="60" height="60">
                    </div>
                    <footer>
                        <p class="rights">2017 © Joname.</p>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {url} from 'api/config'
export default {
  name: 'home',
  data: function() {
    return {
        header_title: "iOS微信免越狱下载",
        byfree: "本站软件永久免费!",
        listData: []
    }
  },
  created: function() {
    this._getDatas();
  },
  methods:{
    _getDatas: function() {
        this.$http.get(url).then((res) => {
            this.listData = res.body.data;
        });
    },
    Details: function(id) {
        this.$router.push("/detail?id="+id)
    }
  }
}
</script>
<style scoped>
.item-img {border-radius: 50%;width: 4rem;}
.item-subtitle,.item-text{color:#007AFF;}
.rights{color:#3d4145;text-align: center;}
.loading{text-align: center;}
</style>
