<template>
  <div>
    <div id='cesiumContainer'>
      <div class='panel'>
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item title='坐标' name='1'>
            <div>经度：{{ coords.longitude }}</div>
            <div>纬度：{{ coords.latitude }}</div>
            <div>高度：{{ coords.height }}</div>
            <div>笛卡尔：{{ coords.cartesian3 }}</div>
            <div>弧度：{{ coords.cartographic }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class='info'>视角高度：{{ listenInfo.cameraHeight }}米 经度：{{ listenInfo.longitude }} 纬度：{{ listenInfo.latitude }} 地形高度 {{ listenInfo.height }}</div>
    </div>
  </div>
</template>

<script>
import 'cesium/Build/Cesium/Widgets/widgets.css'
// import { Viewer } from 'Cesium'
import { Viewer } from 'cesium'
// import * as Cesium from 'cesium'
// const Cesium = require('../../node_modules/cesium/Source/Cesium')

export default {
  name: 'CesiumContainer',
  data: function() {
    return {
      activeNames: ['1'],
      isFullScreen: false,
      coords: {
        longitude: 0,
        latitude: 0,
        height: 0,
        cartesian3: {},
        cartographic: {}
      },
      listenInfo: {
        cameraHeight: 0,
        longitude: 0,
        latitude: 0,
        height: 0,
      }
    }
  },
  mounted() {
    let _this = this;
    /* eslint no-new: */
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YWJlYzNkNS0yY2M0LTQxZWQtOGZhNi05MjEzYmVmZGVkNTkiLCJpZCI6MzU1NTEsImlhdCI6MTYwNDYyNzY2NH0.JxhQQxEvJTrmeARILcywKaPoPEPjO1RlqL28CRjktx8'
    // eslint-disable-next-line no-unused-lets
    const viewer = new Viewer('cesiumContainer', {
      homeButton: true, // 主页按钮
      baseLayerPicker: false, // 是否显示图层选择控件
      navigationHelpButton: false, // 帮助信息按钮
      geocoder: true, // 是否显示地名查找控件
      infoBox: true, // 是否显示点击要素之后显示的信息
      fullscreenButton: false, // 是否显示全屏按钮
      timeline: false, // 是否显示时间线控件
      animation: false, // 是否显示动画控件
      selectionIndicator: true, // 取消点击有绿框
      shouldAnimate: true, // 允许动画
      sceneModePicker: false, // 是否显示3D/2D选择器
      navigationInstructionsInitiallyVisible: false,
      // navigation: false,
      scene3DOnly: true // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      // terrainProvider: Cesium.createWorldTerrain(),
    })
    this.isFullscreen = true
    window._viewer = viewer
    let fullscreen = document.createElement('div') // 自定义全屏按钮只全屏canvas
    fullscreen.style.position = 'absolute'
    fullscreen.style.bottom = '0px'
    fullscreen.style.right = '0px'
    fullscreen.id = 'fullscreen'
    fullscreen.style.height = '30px'
    fullscreen.style.width = '30px'
    fullscreen.className = 'hidden-xs-only'
    let c = document.getElementsByClassName('cesium-viewer')
    c[0].appendChild(fullscreen)
    window._fullscreenButton = new Cesium.FullscreenButton(document.getElementById('fullscreen'), document.getElementById('cesiumContainer'))
    // if (window._fullscreenButton.viewModel.tooltip == "Full screen"){
    //   window._fullscreenButton.viewModel.tooltip = "全屏";
    // }
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(e) {
      e.cancel = true
      // 你要飞的位置
      viewer.camera.flyTo({
        destination: new Cesium.Cartesian3(-1564159.7858402105, 5317109.879222187, 3153973.184916946)
      })
    })

    // 去除版权信息
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    viewer.camera.flyTo({
      destination: new Cesium.Cartesian3(-1564159.7858402105, 5317109.879222187, 3153973.184916946), // 设置位置
      orientation: {
        heading: Cesium.Math.toRadians(359.5738468914868), // 方向
        pitch: Cesium.Math.toRadians(-89.62969989282242), // 倾斜角度
        roll: Cesium.Math.toRadians(0)
      },
      duration: 5, // 设置飞行持续时间，默认会根据距离来计算
      complete: function() {
        // 到达位置后执行的回调函数
      },
      cancle: function() {
        // 如果取消飞行则会调用此函数
      },
      pitchAdjustHeight: -90, // 如果摄像机飞越高于该值，则调整俯仰俯仰的俯仰角度，并将地球保持在视口中。
      maximumHeight: 5000, // 相机最大飞行高度
      flyOverLongitude: 100 // 如果到达目的地有2种方式，设置具体值后会强制选择方向飞过这个经度(这个，很好用)
    })
    let matrixIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
    viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://222.178.182.14:9010/wmts',
      tilingScheme: new Cesium.GeographicTilingScheme(),
      format: 'image/jpeg',
      style: 'default',
      layer: 'img',
      tileMatrixSetID: 'c',
      tileMatrixLabels: matrixIds,
      maximumLevel: 20
    }))
    let wxt = viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      url: 'http://183.230.114.154:9010/Satellite/{z}/{x}/{y}.png'
    }))
    wxt.saturation = 1.7
    viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      url: 'http://222.178.182.14:9010/dataserver?x={x}&y={y}&l={z}&t=cva_c',
      tilingScheme: new Cesium.GeographicTilingScheme(),
      maximumLevel: 20,
      format: 'image/png'
    }))

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction(function(event) {
      let wp = event.position
      if (!Cesium.defined(wp)) {
        return
      }
      let ray = viewer.scene.camera.getPickRay(wp)
      if (!Cesium.defined(ray)) {
        return
      }
      let cartesian = viewer.scene.globe.pick(ray, viewer.scene)
      if (!Cesium.defined(cartesian)) {
        return
      }
      if (cartesian) {
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        _this.coords.longitude = Cesium.Math.toDegrees(cartographic.longitude)
        _this.coords.latitude = Cesium.Math.toDegrees(cartographic.latitude)
        _this.coords.height = viewer.scene.globe.getHeight(cartographic)
        _this.coords.cartesian3 = cartesian
        _this.coords.cartographic = cartographic
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction(function(event) {
      let wp = event.endPosition
      if (!Cesium.defined(wp)) {
        return
      }
      let ray = viewer.scene.camera.getPickRay(wp)
      if (!Cesium.defined(ray)) {
        return
      }
      let cartesian = viewer.scene.globe.pick(ray, viewer.scene)
      if (!Cesium.defined(cartesian)) {
        return
      }
      if (cartesian) {
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        _this.listenInfo.longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6)
        _this.listenInfo.latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6)
        _this.listenInfo.height = viewer.scene.globe.getHeight(cartographic).toFixed(2)
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    viewer.camera.changed.addEventListener(()=>{
      // 当前高度
      _this.listenInfo.cameraHeight = viewer.camera.positionCartographic.height.toFixed(0);
      // 下面可以写其他的代码了
    });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 440px;
  position: relative;
}

.panel {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  /*width: 100px;*/
  background: #FFF;
  padding: 0 10px;
}
.info {
  position: absolute;
  bottom: 0px;
  right: 40px;
  z-index: 1;
  color: #FFF;
  font-size: 14px;
  background: transparent;
}
</style>
