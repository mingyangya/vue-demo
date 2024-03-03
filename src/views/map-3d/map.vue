<template>
  <div id="map3decharts">
    <div id="lineChart"></div>
  </div>
</template>
<script>
import mapDataCq from "./map.json";
// import mapDataCq from "./chongqing.json";

import * as echarts from 'echarts'
// 导入echarts库以及地图扩展模块
// import * as echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/map';
// import 'echarts/lib/component/geo';
import "echarts-gl" //3D地图插件

export default {
  props: {
    multipleTreeData: {
      type: Object,
      default: () => {
        return {}
      }
    },

  },
  data() {
    return {
      mapDataCqG: mapDataCq,
      timer: null,
      seriesData: [
        { name: "罗湖区", fydm: "2578", },// 2578  深圳市中院2577
        { name: "福田区", fydm: "2579", },// 2579
        { name: "南山区", fydm: "2580", },// 2580
        { name: "前海区", fydm: "2714", },// 2714
        { name: "宝安区", fydm: "2581", },// 2581
        { name: "龙华区", fydm: "5006", },// 5006
        { name: "光明区", fydm: "5033", }, // 5033
        { name: "盐田区", fydm: "2583", }, // 2583
        { name: "龙岗区", fydm: "2582", }, // 2582
        { name: "大鹏区", fydm: "2582", }, // 2582
        { name: "坪山区", fydm: "5007" }, // 5007
        { name: "深汕区", fydm: "5034" } // 5034
      ],
    };
  },
  mounted() {
    this.clearInterval()
    console.log("重庆地图数据", this.mapDataCqG);
    // console.log("echarts", echarts);
    this.lineChart = echarts.init(document.getElementById("lineChart"));
    this.$nextTick(() => {
      this.setLineChart(this.mapDataCqG, '#082F5F');

      // this.handleAnimate()
    });
  },
  methods: {
    setLineChart(nval, mapColor) {
      echarts.registerMap('map', nval);
      //3D地图旋转主要配置
      // var viewControl={
      //     alpha: 50, // 上下旋转的角度
      //     beta: -2, // 左右旋转的角度
      //     rotateSensitivity: 3, // 旋转操作的灵敏度
      //     panSensitivity: 3,
      //     panMouseButton: 'right',
      //     distance: 180,
      //     minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
      //     maxAlpha: 100, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
      //     minBeta: 25, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
      //     maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
      //     animation: false, // 是否开启动画。[ default: true ]
      //     animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
      //     animationEasingUpdate: "cubicInOut" // 过渡动画的缓动效果。[ default: cubicInOut ]
      // };

      let option = {
        backgroundColor: 'black',
        geo: { // 2D地图坐标系
          show: false, // 不显示地图，用于为动效散点提供2D地图坐标系
          map: 'centerMap',
          roam: false, // 禁用缩放、拖拽
          layoutCenter: ['50%', '47%'], // 地图中心位置
          layoutSize: '90%', // 控制地图尺寸（地图的宽度和高度都会改变）
          aspectScale: 0.78, // 控制地图长宽比（此值越小地图越窄，越大地图越宽）
          zlevel: 1,
        },
        geo3D: {
          zlevel: 2,
          map: 'map',
          regionHeight: 6, //地图厚度
          itemStyle: {
            color: 'rgb(8,32,53)',
            borderWidth: 2, //分界线宽度
            borderColor: '#409EFF', //分界线颜色
          },
          // environment: 'https://cdn.polyhaven.com/asset_img/primary/syferfontein_18d_clear_puresky.png?height=780',
          environment: 'https://cdn.polyhaven.com/asset_img/primary/kloppenheim_06_puresky.png?height=780',
          // environment: require('@/assets/mapjson/地图01.png'),
          shading: 'lambert',
          label: {
            show: true,
            alignText: 'center',
            color: '#fff', //文字颜色
            fontSize: 18, //文字大小
            position: [100, 100],
            padding: [5, 10],
            alignText: 'center',
            lineHeight: 24,
            backgroundColor: 'rgba(0,0,0,0.35)', //透明度0清空文字背景
            borderWidth: 1.5, //分界线宽度
            borderRadius: 5,
            borderColor: '#F2A451', //分界线颜色
            formatter: function (params) {
              // console.log("渲染", params);
              // if(params.name=='内蒙古林西工业园区' || params.name=='城北街道办事处筹备处' || params.name=='城南街道办事处筹备处'){
              //   return ` `
              // }else{
              //   return params.name
              // }
              return params.name

            }

          },
          // 设置单独区域样式
          regions: [],
          // hover高亮颜色
          emphasis: {
            label: {
              formatter: function (params) {
                // console.log("hover", params);
                return params.name
              }
            },
            itemStyle: {
              color: '#1341BE',
              opacity: 0.9, // 透明度
              borderWidth: 1, //分界线宽度
              borderColor: '#00EBFF', //分界线颜色
            },
          },
          shading: 'realistic',
          // 真实感材质相关配置 shading: 'realistic'时有效
          realisticMaterial: {
            detailTexture: 'https://cdn.polyhaven.com/asset_img/primary/painted_concrete.png?height=780', // 纹理贴图
            textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
            roughness: 1, // 材质粗糙度，0完全光滑，1完全粗糙
            metalness: 0, // 0材质是非金属 ，1金属
            roughnessAdjust: 0
          },
          // shading 为color 时无效
          light: {
            //光照阴影
            main: {
              color: "#fff", //光照颜色
              intensity: 5, //光照强度
              shadowQuality: 'high', //阴影亮度
              shadow: true, //是否显示阴影
              shadowQuality: "medium", //阴影质量 ultra //阴影亮度
              alpha: 55,
              beta: 10
            },
            ambient: {
              intensity: 0.7
            }
          },

          // viewControl: viewControl,
          viewControl: {
            distance: 150, // 地图视角 控制初始大小
            // rotateSensitivity: 0, // 旋转
            // zoomSensitivity: 0, // 缩放
            // autoRotate: false,
            // maxBeta: Infinity,
            // minBeta: -Infinity,
            beta: 15, //旋转视角
            alpha: 40, //视角
            panMouseButton: 'left',
            rotateMouseButton: 'right',
            center: [5, -10, 0],
          },
        },
        series: [
          { // 动效散点图层，使用2D地图坐标系
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 3,
            rippleEffect: { //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: 'fill', //波纹绘制方式 stroke, fill
              scale: 10 //波纹圆环最大限制，值越大波纹越大
            },
            symbol: 'circle',
            symbolSize: function (val) {
              return (5 + val[2] * 5) / 150; //圆环大小
            },
            itemStyle: {
              normal: {
                show: true,
                color: '#F41C19'
              }
            },
            data: [],
          },
          // {
          //   type: 'lines3D',
          //   coordinateSystem: 'geo3D',
          //   effect: {
          //     show: true,
          //     trailWidth: 2,
          //     trailOpacity: 0.8,
          //     trailLength: 2,
          //     constantSpeed: 120,
          //   },
          //   blendMode: 'source-over',
          //   lineStyle: {
          //     width: 12,
          //     opacity: .9,
          //   },
          //   data: [
          //     [
          //       [106.360329, 29.630748],
          //       [109.226216, 30.82779],
          //       // [
          //       //   114.148158,
          //       //   22.57487,
          //       //   6
          //       // ],
          //     ],
          //   ],
          // },
          // {
          //   type: "map3D",
          //   map: "map",
          //   top: "-12",

          //   left: "-2",
          //   itemStyle: {
          //     opacity: 0,  //设置opacity透明度为0
          //     borderWidth: 0,
          //   },
          //   regionHeight: 8,
          //   viewControl: {

          //     distance: 150, // 地图视角 控制初始大小
          //     // rotateSensitivity: 0, // 旋转
          //     // zoomSensitivity: 0, // 缩放
          //     // autoRotate: false,
          //     // maxBeta: Infinity,
          //     // minBeta: -Infinity,
          //     beta: 15, //旋转视角
          //     alpha: 40, //视角
          //     panMouseButton: 'left',
          //     rotateMouseButton: 'right',
          //     center: [5, -10, 0],
          //   },
          //   zlevel: 10,
          // },

        ],
        tooltip: {
          show: true
        }
      };

      option.series[0].data = this.convertData(this.seriesData); // 设置动效散点数据


      this.lineChart.setOption(option);
      window.addEventListener("resize", () => {
        this.lineChart.resize();
      });

      //  监听
      // this.lineChart.on("click", params => {
      //   console.log(1, params);
      //   let newObj = {
      //     name: params.name,
      //     itemStyle: {
      //       color: '#1341BE',
      //       opacity: 0.9, // 透明度
      //       borderWidth: 1, //分界线宽度
      //       borderColor: '#00EBFF', //分界线颜色

      //     },
      //     height: 12,

      //   };
      //   if (option.geo3D.regions && option.geo3D.regions[0] && option.geo3D.regions[0].name && option.geo3D.regions[0].itemStyle && option.geo3D.regions[0].name == params.name) {
      //     option.geo3D.regions[0] = { name: params.name, };
      //   } else {
      //     option.geo3D.regions[0] = newObj;
      //   }
      //   this.lineChart.setOption(option);
      // })
    },

    convertData(data) {
      var mapFeatures = echarts.getMap("map").geoJson.features;
      var geoCoordMap = {};
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.center;
      });

      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    },

    clearInterval() {
      clearInterval(this.timer)
      this.timer = null
    },

    handleAnimate() {
      // this.timer = se

      this.lineChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 0,
      })
    }
  }
};
</script>
 
<style lang="scss" scoped> #map3decharts {
   width: 100%;
   height: 100%;

   #lineChart {
     width: 100%;
     height: 100%;
     //  background-color: red;
   }
 }
</style>