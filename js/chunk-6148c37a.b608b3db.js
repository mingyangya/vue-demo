(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6148c37a"],{"13b8":function(t,i,n){},4610:function(t,i,n){"use strict";n("13b8")},ed64:function(t,i,n){"use strict";n.r(i);var e=function(){var t=this,i=t._self._c;return i("div",[t.noticeShow?i("transition",{attrs:{name:"slide-up"}},[t.noticeShow&&t.content&&t.content.length>0?i("div",{staticClass:"com-notice",class:t.isMobile?"app-layout-type-mobile":"app-layout-type-pc"},[i("div",{ref:"noticeEle",staticClass:"content-container",style:t.noticeStyle},[i("div",{ref:"noticeContentEle",staticClass:"content",style:t.style},t._l(t.content,(function(n,e){return i("div",{key:e,staticClass:"content-item",style:t.itemStyle},[t._v(" "+t._s(n)+" ")])})),0)]),i("span",{staticClass:"close-btn",on:{click:t.close}})]):t._e()]):i("el-button",{on:{click:function(i){t.noticeShow=!0}}},[t._v("打开")])],1)},o=[],c=(n("a9e3"),n("caad"),{name:"com-notice",props:{content:{type:Array,default:[]},isMobile:{type:Boolean,default:!1},distance:{type:Number,default:1},direction:{type:String,default:"x",validator:function(t){return["x","y"].includes(t)}}},data:function(){return{noticeShow:!0,hasScrollAnimation:!1,timer:null,contentTranslate:0,oneScreen:!0}},computed:{noticeSize:function(){var t=this.$refs.noticeEle;return{width:t.clientWidth,height:t.clientHeight}},noticeContentSize:function(){var t=this.$refs.noticeContentEle;return{width:t.clientWidth,height:t.clientHeight}},noticeStyle:function(){if(this.hasScrollAnimation){var t={};return this.direction,t}},style:function(){return{flexDirection:"x"===this.direction?"row":"column",transform:"x"===this.direction?"translateX(".concat(this.contentTranslate,"px)"):"translateY(".concat(this.contentTranslate,"px)")}},itemStyle:function(){return"x"===this.direction?this.oneScreen?{"min-width":"100%"}:{width:"max-content"}:this.oneScreen?{"min-height":"100%"}:{height:"max-content"}},len:function(){return this.oneScreen?this.content.length-1:1}},mounted:function(){window.addEventListener("resize",this.initAnimation)},beforeDestroy:function(){window.removeEventListener("resize",this.initAnimation)},watch:{content:{immediate:!0,handler:function(){this.getNotice()}}},methods:{getNotice:function(){var t=this;this.$nextTick((function(){t.initAnimation()}))},initAnimation:function(){if(this.noticeShow&&this.content&&this.content.length)if(this.tickStop(),"x"===this.direction){var t=this.noticeSize.width,i=this.noticeContentSize.width;i*this.len>t&&this.tickStart()}else{var n=this.noticeSize.height,e=this.noticeContentSize.height;e*this.len>n&&this.tickStart()}},tickStart:function(){this.hasScrollAnimation=!0,this.contentTranslate="x"===this.direction?this.noticeContentSize.width:this.noticeContentSize.height,this.timer=!0,this.tick()},tickStop:function(){this.hasScrollAnimation&&(this.hasScrollAnimation=!1,this.contentTranslate=0,cancelAnimationFrame&&cancelAnimationFrame(this.timer),this.timer=null)},tick:function(){this.contentTranslate-=this.distance,"x"===this.direction?this.contentTranslate<-this.noticeContentSize.width*this.len&&(this.contentTranslate=this.noticeContentSize.width):this.contentTranslate<-this.noticeContentSize.height*this.len&&(this.contentTranslate=this.noticeContentSize.height),this.timer&&(this.timer=requestAnimationFrame(this.tick))},close:function(){this.noticeShow=!1,this.tickStop()}}}),s=c,h=(n("4610"),n("2877")),a=Object(h["a"])(s,e,o,!1,null,"410fab2e",null);i["default"]=a.exports}}]);
//# sourceMappingURL=chunk-6148c37a.b608b3db.js.map