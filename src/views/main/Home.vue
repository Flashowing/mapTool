<template>
  <div id='cesiumContainer'></div>
</template>

<script>
import { Viewer } from 'cesium'

export default {
  name: 'Home',
  data: function() {
    return {
      isFullScreen: false
    }
  },
  mounted() {
    let _this = this
    /* eslint no-new: */
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YWJlYzNkNS0yY2M0LTQxZWQtOGZhNi05MjEzYmVmZGVkNTkiLCJpZCI6MzU1NTEsImlhdCI6MTYwNDYyNzY2NH0.JxhQQxEvJTrmeARILcywKaPoPEPjO1RlqL28CRjktx8'
    // eslint-disable-next-line no-unused-vars
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
      scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      // terrainProvider: Cesium.createWorldTerrain(),
      imageryProvider: new Cesium.TileMapServiceImageryProvider({
        url: 'http://183.230.114.154:9010/map/staticResources/Cesium-1.85/Build/Cesium/Assets/Textures/NaturalEarthII/'
      })
    })
    this.isFullscreen = true
    window._viewer = viewer
    var fullscreen = document.createElement('div') // 自定义全屏按钮只全屏canvas
    fullscreen.style.position = 'absolute'
    fullscreen.style.bottom = '0px'
    fullscreen.style.right = '0px'
    fullscreen.id = 'fullscreen'
    fullscreen.style.height = '30px'
    fullscreen.style.width = '30px'
    fullscreen.className = 'hidden-xs-only'
    var c = document.getElementsByClassName('cesium-viewer')
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
    // var token = 'c6a366fc893103a30164aef8a5a298f7'
    // // 服务域名
    // var tdtUrl = 'https://t{s}.tianditu.gov.cn/'
    // // 服务负载子域
    // var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
    // // 叠加影像服务
    // var imgMap = new Cesium.UrlTemplateImageryProvider({
    //   url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
    //   subdomains: subdomains,
    //   tilingScheme: new Cesium.WebMercatorTilingScheme(),
    //   maximumLevel: 18
    // })
    // viewer.imageryLayers.addImageryProvider(imgMap)
    //
    // // 叠加国界服务
    // var iboMap = new Cesium.UrlTemplateImageryProvider({
    //   url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
    //   subdomains: subdomains,
    //   tilingScheme: new Cesium.WebMercatorTilingScheme(),
    //   maximumLevel: 10
    // })
    // viewer.imageryLayers.addImageryProvider(iboMap)
    //
    // var TDT_CVA_W = 'http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0' + '&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' + '&style=default.jpg&tk=' + token
    //
    // var zhLayer = new Cesium.WebMapTileServiceImageryProvider({
    //   url: TDT_CVA_W,
    //   layer: 'cva',
    //   style: 'default',
    //   format: 'jpg',
    //   tileMatrixSetID: 'w',
    //   maximumLevel: 18
    // })
    // viewer.imageryLayers.addImageryProvider(zhLayer)
    //
    // viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    //   // 影像注记
    //   url: 'http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' + token,
    //   subdomains: subdomains,
    //   layer: 'tdtCiaLayer',
    //   style: 'default',
    //   format: 'image/jpeg',
    //   tileMatrixSetID: 'GoogleMapsCompatible',
    //   show: true
    // }))
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
  }
}
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
