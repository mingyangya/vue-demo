(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c26a7c72"],{4242:function(t,e,i){"use strict";i("9d6f")},"5db4":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"shape-trapezoid",style:t.style},[t._t("default")],2)},o=[],r=(i("a9e3"),i("caad"),i("99af"),{data:function(){return{smoothing:.1,style:{}}},props:{boxWidth:[String,Number],boxHeight:[String,Number],width:[Number],height:[Number],color:{type:String,default:"#422A1C"},direction:{type:String,default:"",validator:function(t){return["","top-right","top-left","bottom-left","bottom-right"].includes(t)}},quadrant:{type:Number,default:1}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.$nextTick((function(){t.initStyle(t.direction)}))},initStyle:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=0;if(t){var i=this.getGradientLineLength();switch(e=this.getDeg(),t){case"top-right":default:e=e;break;case"bottom-right":e=180-e;break;case"bottom-left":e=360-e;break;case"top-left":e=-180+e;break}this.setStyle(e,i)}else this.$set(this.style,"background","".concat(this.color)),this.$emit("set-style",{color:color})},setStyle:function(t,e){var i=this.getSize(),n=i.h,o=e+n*Math.abs(Math.cos(this.degToRad(this.getDeg()))),r=e/o*100;this.$set(this.style,"background","linear-gradient( ".concat(t,"deg, ").concat(this.color," ").concat(r,"%, transparent ").concat(this.smoothing?r+this.smoothing:r,"%)")),this.$emit("set-style",{color:this.co9lor,width:e,precent:r,smoothing:this.smoothing})},changeColor:function(){var t="rgba(66, 42, 28, 1)";return t},getSize:function(){var t=this.$el,e=t.clientWidth,i=t.clientHeight;return{w:e,h:i}},getGradientLineLength:function(){var t=this.getSize().w,e=this.getDeg();return t*Math.abs(Math.sin(this.degToRad(e)))},getDeg:function(){var t=this.getSize(),e=t.h,i=this.height||e,n=this.width,o=Math.atan(i/n),r=this.radToDeg(o);return r},radToDeg:function(t){return 180*t/Math.PI},degToRad:function(t){return Math.PI*t/180}}}),s=r,a=(i("4242"),i("2877")),h=Object(a["a"])(s,n,o,!1,null,"f6bd602c",null);e["default"]=h.exports},"9d6f":function(t,e,i){}}]);
//# sourceMappingURL=chunk-c26a7c72.7e3220c7.js.map