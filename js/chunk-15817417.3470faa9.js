(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15817417","chunk-499c1038"],{1148:function(t,e,i){"use strict";var n=i("5926"),r=i("577e"),s=i("1d80"),a=RangeError;t.exports=function(t){var e=r(s(this)),i="",o=n(t);if(o<0||o==1/0)throw a("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(i+=e);return i}},6711:function(t,e,i){"use strict";i("a6b2")},"8f6d":function(t,e,i){"use strict";i("ec92")},9864:function(t,e,i){"use strict";i.r(e);var n=function(){var t,e=this,i=e._self._c;return i("div",{staticClass:"custom-slider"},[i("div",{ref:"refContent",staticClass:"custom-slider-container"},[null!==(t=e.markList)&&void 0!==t&&t.length?i("ul",{staticClass:"mark"},[e._l(e.markList,(function(t,n){return i("li",{key:n,staticClass:"mark-li",style:{left:"".concat(t.position,"%")},on:{click:function(i){return i.stopPropagation(),e.clikMark(t)}}})})),i("div",{directives:[{name:"show",rawName:"v-show",value:e.showTip,expression:"showTip"}],staticClass:"custom-tips",style:{left:"".concat(e.tipsX,"%")}},[i("div",{domProps:{innerHTML:e._s(e.tips)}})])],2):e._e(),i("el-slider",{staticClass:"progress-slider",attrs:{"show-tooltip":!1},on:{change:e.input},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}})],1)])},r=[],s=i("5530"),a=(i("a9e3"),i("b680"),i("c740"),i("b0c0"),i("d81d"),{props:{value:{type:Number,default:0},duration:Number,marks:Array},data:function(){return{inputValue:0,markList:[],startLeft:0,showTip:!1,tips:"",tipsX:0}},watch:{value:function(t){this.inputValue=t},marks:{handler:function(t){this.formatData(t,this.duration)},deep:!0},duration:function(t){this.formatData(this.marks,t)}},mounted:function(){this.$refs.refContent.addEventListener("mousemove",this.mousemove),this.$refs.refContent.addEventListener("mouseleave",this.mouseleave)},beforeDestroy:function(){this.$refs.refContent.removeEventListener("mousemove",this.mousemove),this.$refs.refContent.removeEventListener("mouseleave",this.mouseleave)},methods:{mouseleave:function(){this.tips="",this.showTip=!1},getMarkIndexByDistance:function(t){var e=this,i=t-this.$refs.refContent.getBoundingClientRect().left,n=this.$refs.refContent.clientWidth,r=Math.round((parseFloat(100*i)/n).toFixed());return this.tipsX=r,this.markList.findIndex((function(t){return e.isInWithin(r,t.start,t.end)}))},isInWithin:function(t,e,i){return t>=e&&t<=i},mousemove:function(t){var e=this.getMarkIndexByDistance(t.clientX);-1!==e?(this.showTip=!0,this.tips=this.markList[e].name):this.showTip=!1},input:function(t){this.$emit("change",t)},formatData:function(t,e){this.markList=(t||[]).map((function(t){var i=Math.round(+(parseFloat(100*t.start)/e).toFixed()),n=Math.round((+parseFloat(100*t.end)/e).toFixed());return Object(s["a"])(Object(s["a"])({},t),{},{position:i,start:i,end:n})}))},clikMark:function(t){this.inputValue=t}}}),o=a,u=(i("8f6d"),i("2877")),c=Object(u["a"])(o,n,r,!1,null,"445440c8",null);e["default"]=c.exports},a6b2:function(t,e,i){},b680:function(t,e,i){"use strict";var n=i("23e7"),r=i("e330"),s=i("5926"),a=i("408a"),o=i("1148"),u=i("d039"),c=RangeError,l=String,d=Math.floor,h=r(o),f=r("".slice),p=r(1..toFixed),m=function(t,e,i){return 0===e?i:e%2===1?m(t,e-1,i*t):m(t*t,e/2,i)},v=function(t){var e=0,i=t;while(i>=4096)e+=12,i/=4096;while(i>=2)e+=1,i/=2;return e},g=function(t,e,i){var n=-1,r=i;while(++n<6)r+=e*t[n],t[n]=r%1e7,r=d(r/1e7)},y=function(t,e){var i=6,n=0;while(--i>=0)n+=t[i],t[i]=d(n/e),n=n%e*1e7},k=function(t){var e=6,i="";while(--e>=0)if(""!==i||0===e||0!==t[e]){var n=l(t[e]);i=""===i?n:i+h("0",7-n.length)+n}return i},w=u((function(){return"0.000"!==p(8e-5,3)||"1"!==p(.9,0)||"1.25"!==p(1.255,2)||"1000000000000000128"!==p(0xde0b6b3a7640080,0)}))||!u((function(){p({})}));n({target:"Number",proto:!0,forced:w},{toFixed:function(t){var e,i,n,r,o=a(this),u=s(t),d=[0,0,0,0,0,0],p="",w="0";if(u<0||u>20)throw c("Incorrect fraction digits");if(o!=o)return"NaN";if(o<=-1e21||o>=1e21)return l(o);if(o<0&&(p="-",o=-o),o>1e-21)if(e=v(o*m(2,69,1))-69,i=e<0?o*m(2,-e,1):o/m(2,e,1),i*=4503599627370496,e=52-e,e>0){g(d,0,i),n=u;while(n>=7)g(d,1e7,0),n-=7;g(d,m(10,n,1),0),n=e-1;while(n>=23)y(d,1<<23),n-=23;y(d,1<<n),g(d,1,1),y(d,2),w=k(d)}else g(d,0,i),g(d,1<<-e,0),w=k(d)+h("0",u);return u>0?(r=w.length,w=p+(r<=u?"0."+h("0",u-r)+w:f(w,0,r-u)+"."+f(w,r-u))):w=p+w,w}})},c740:function(t,e,i){"use strict";var n=i("23e7"),r=i("b727").findIndex,s=i("44d2"),a="findIndex",o=!0;a in[]&&Array(1)[a]((function(){o=!1})),n({target:"Array",proto:!0,forced:o},{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),s(a)},ec92:function(t,e,i){},fd6e:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"meeting-player"},[e("div",{staticClass:"meeting-player-container w-full"},[e("div",{class:["player-area",t.type+"-area"]},[e(t.type,{ref:"refPlayer",tag:"components",attrs:{src:t.playerSrc},on:{timeupdate:t.timeupdate,loadedmetadata:t.loadedmetadata}})],1),e("div",{staticClass:"ctrl-area flex items-center"},[e("div",{staticClass:"btn-group"},[e("i",{staticClass:"ctrl-btn prev el-icon-arrow-left",on:{click:t.prev}}),e("i",{class:["ctrl-btn play ml-2",t.paused?"el-icon-video-play":"el-icon-video-pause"],on:{click:t.handleClick}}),e("i",{staticClass:"el-icon-arrow-right ctrl-btn next ml-2",on:{click:t.next}})]),e("div",{staticClass:"progress flex-1 ml-4"},[e("customSlider",{attrs:{value:t.sliderValue,marks:t.marks,duration:t.duration},on:{change:t.sliderChange}})],1)])])])},r=[],s=(i("caad"),i("b680"),i("9864")),a={data:function(){return{playerSrc:"",duration:0,currentTime:0,sliderValue:0,paused:!0,initialPlay:!1,step:15}},components:{customSlider:s["default"]},props:{src:String,marks:Array,type:{type:String,default:"audio",validator:function(t){return["audio","video"].includes(t.toLowerCase())}}},watch:{src:{handler:function(t){console.log(t,"newSrc"),this.playerSrc=t},immediate:!0}},methods:{handleClick:function(){this.paused?this.play():this.pause()},play:function(){this.paused=!1,this.$refs.refPlayer.play()},pause:function(){this.paused=!0,this.$refs.refPlayer.pause()},loadedmetadata:function(t){var e=t.target,i=e.duration,n=e.currentTime,r=e.paused;this.paused=r,this.duration=i,this.currentTime=n,console.log("loadedmetadata")},canplay:function(){var t=event.target.duration;console.log("canplay"),this.duration=t},timeupdate:function(t){var e=t.target,i=e.paused,n=e.currentTime;this.currentTime=n,this.paused=i,this.setSliderValue(),console.log("timeupdate"),this.$emit("timeupdate",n)},prev:function(){var t=this.currentTime-this.step<=0?.01:this.currentTime-this.step;this.setCurrentTime(t)},next:function(){var t=this.currentTime+this.step>=this.duration?this.duration:this.currentTime+this.step;this.setCurrentTime(t)},setCurrentTime:function(t){this.currentTime=t,this.$refs.refPlayer.currentTime=t},setSliderValue:function(){var t=Math.round(100*this.currentTime/this.duration);this.sliderValue=t},sliderChange:function(t){var e=Math.round((parseFloat(this.duration)*t/100).toFixed(2));this.setCurrentTime(e)}}},o=a,u=(i("6711"),i("2877")),c=Object(u["a"])(o,n,r,!1,null,"89a7d630",null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-15817417.3470faa9.js.map