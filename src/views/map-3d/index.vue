<template>
  <div class="map-3d">
    <div ref="refEchart" class="chart w-full h-full"></div>
  </div>
</template>

<script>
import mapData from './map.json'

import * as echarts from 'echarts';
import 'echarts-gl';

export default {
  data() {
    return {
      option: [],
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
    }
  },
  mounted() {
    this.initEchart()
  },
  methods: {

    handleData() {
      const mapFeatures = echarts.getMap("centerMap").geoJson.features;
      var geoCoordMap = {};
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.center;

        return geoCoordMap
      });

      var convertData = function (data) {
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
      };
    },
    initEchart() {
      echarts.registerMap('shenzhen', mapData)
      const myEchart = echarts.init(this.$refs.refEchart)

      this.setOption()
      myEchart.setOption(this.option)

      window.addEventListener("resize", () => {
        myEchart.resize();
      })

      //  监听
      myEchart.on("mouseover", params => {
        console.log(1, params);
      })

      setTimeout(() => {
        myEchart.dispatchAction({
          type: 'showTip',
          seriesIndex: 1, // 假设这是你的系列索引  
          dataIndex: 0 // 数据项的索引  
        });

        // myEchart.dispatchAction({
        //   type: 'highlight',
        //   seriesIndex: 0,
        //   dataIndex: 10
        // });

        // myEchart.dispatchAction({
        //   type: 'toggleSelect',

        //   // 用 index 或 id 或 name 来指定系列。
        //   // 可以使用数组指定多个系列。
        //   seriesIndex: 0,
        //   dataIndex: 0,
        // })
      })

      // dispatchAction
    },

    setOption() {
      const viewControl = {
        distance: 100, // 地图视角 控制初始大小
        // rotateSensitivity: 0, // 旋转
        // zoomSensitivity: 0, // 缩放
        // autoRotate: false,
        // maxBeta: Infinity,
        // minBeta: -Infinity,
        beta: 15, // 旋转视角
        alpha: 45, // 视角
        panMouseButton: 'left',
        rotateMouseButton: 'right',
        // center: [5, -10, 0],
      }

      // const regions = this.seriesData.map(item => ({ name: item.name }))

      const option = {
        backgroundColor: 'rgba(0,0,0,1)',
        geo3D: {
          type: 'map',
          map: 'shenzhen',
          roam: 'true',
          regionHeight: 6, // 地图厚度
          top: '5%',
          zlevel: 1,
          itemStyle: {
            show: true,
            color: 'rgb(8,32,53)',
            borderWidth: 2, // 分界线宽度
            // borderColor: '#409EFF', // 分界线颜色
            borderColor: '#fff', // 分界线颜色
          },
          // 通过经典的 lambert 着色表现光照带来的明暗
          shading: 'lambert',
          label: {
            show: true
          },
          // 默认高亮区域
          regions: [
            {
              name: '福田区',
              itemStyle: {
                // hover之后的颜色
                color: '#1341BE',
                opacity: 0.9, // 透明度
                borderWidth: 1, //分界线宽度
                borderColor: '#00EBFF', //分界线颜色
              },
            },
          ],
          // hover高亮颜色
          emphasis: {
            label: {
              show: true,
            },
            itemStyle: {
              // hover之后的颜色
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
              color: "#fff", // 光照颜色
              intensity: 5, // 光照强度
              shadowQuality: 'high', //阴影亮度
              shadow: false, //是否显示阴影
              shadowQuality: "medium", //阴影质量 ultra //阴影亮度
              alpha: 55,
              beta: 10
            },
            ambient: {
              intensity: 0.7
            }
          },
          viewControl: viewControl,
        },
        tooltip: {
          show: true
        },
        series: [
          {
            name: 'map',
            // type: "map",
            type: "map3D",
            map: "shenzhen",
            regionHeight: 0,
            zlevel: 2,
            data: this.seriesData.map(item => {
              return {
                ...item,
                value: item.name + '-1'
              }
            }),

            itemStyle: {
              show: true,
              color: 'rgb(8,32,53)',
              borderWidth: 2, // 分界线宽度
              // borderColor: '#409EFF', // 分界线颜色
              borderColor: '#fff', // 分界线颜色
            },
            tooltip: {
              show: true
            },
          },
          {
            type: "scatter3D",
            coordinateSystem: "geo3D",
            geo3DIndex: 0,
            zlevel: 6,
          }

        ]
      }

      this.option = option
    }
  }
}
</script>

<style scoped lang="scss">
.map-3d {
  width: 100%;
  height: 100vh;
}
</style>
