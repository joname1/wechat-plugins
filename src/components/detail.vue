<template>
<div class="page-group">
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/gohome" class="external button button-link button-nav pull-left" data-no-cache="true">
                <span class="icon icon-left"></span>
            </router-link>
            <h1 class="title" v-text="details.title"></h1>
        </header>
        <div class="loading" v-show="!details.img">
            <img src="../assets/loading.gif" width="60" height="60">
        </div>
        <div class="content">
            <div class="app_logo">
                <img :src="details.img">
            </div>
            <p class="app_desc">{{details.description}}</p>
            <div class="more_info">
                <p v-show="details.size">版本: {{details.version}} ({{details.size}})</p>
                <p>本站软件收集于互联网!</p>
                <div class="load_fixed">
                    <a :href="'itms-services://?action=download-manifest&url='+details.url" class="button button-fill button-big" @click="useSafari">点击安装</a>
                </div>
                <p>提示: 请使用Safari浏览器打开!</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {url} from 'api/config'
export default {
  name: 'detail',
  data: function() {
    return {
      details: []
    }
  },
  created: function() {
    this._getDetails();
  },
  methods:{
    _getDetails: function() {
        var Appid = this.$route.query.id;
        this.$http.get(url).then((res) => {
            for(var i=0, len=res.body.data.length; i<len; i++){
                this.details = res.body.data[Appid];
            }
        });
    },
    is_ios: function() {
        if((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i))) {
            return Boolean(navigator.userAgent.match(/OS [9-9]_\d[_\d]* like Mac OS X/i));
        } else {
            return false;
        }
    },
    is_weixin: function() {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    useSafari: function() {
        var browser = {
        versions: function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1,
                presto: u.indexOf('Presto') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                iPad: u.indexOf('iPad') > -1,
                webApp: u.indexOf('Safari') == -1
            };
        }()
    }
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        //微信打开时 系统为ios
        if( this.is_weixin() ){
            alert('请使用Safari浏览器打开!');
        } else {
            //系统为ios  不是微信打开
            if( this.is_ios() ){
                alert('请使用Safari浏览器打开!'); 
            }
        }
    } else {
        //不是 ios 设备
        alert('抱歉, 本软件不支持非iOS设备!');
    }
    }
  }
}
</script>


<style scoped>
.app_logo{width:120px; height:130px; margin: 40px auto 0px;text-align: center;}
.app_logo img{border-radius:22.5%;width:120px; height:120px; display:inline-block;}
.app_name{color:#000; margin-bottom:10px;text-align: center;}
.app_desc{text-align:center;margin:20px}
.more_info {margin-top:2rem;}
.more_info p{width:100%; text-align:center; line-height:1rem;color: #000;font-size: 16px;font-weight: 300;letter-spacing: 1.2px;}
.load_fixed{margin:2rem auto;}
@media screen and (max-width:768px){.load_fixed a{ width:50%; margin-left:25%;}}
.load_fixed{position:relative;}
.fixing .fa-circle-o-notch{color:#fff; font-weight:100; width:100%; text-align:center; position:absolute; top:0px;}
.load_fixed .home_key{position:absolute; top:0px; font-size:14px;}
.loading{text-align: center;position: relative;top: 10rem;}
</style>