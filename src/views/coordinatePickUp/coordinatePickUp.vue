<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span='17' class='full-height'>
          <div id='cesiumContainer'>
            <div class='coordinate-tooltip' :style='{ left: coordinateTooltipX, top: coordinateTooltipY }'>
              {{ coordinate }}
            </div>
          </div>
        </el-col>
        <el-col :span='7' class='full-height'>
          <el-header><h1>{{ formLabelAlign.formatted_addresses }}</h1></el-header>
          <div class='right-form'>
            <el-form :label-position='labelPosition' :model='formLabelAlign'>
              <el-form-item label='WGS84坐标'>
                <el-input v-model='formLabelAlign.wgs84' readonly><i slot='suffix'
                                                                     v-clipboard='() => formLabelAlign.wgs84'
                                                                     v-clipboard:error='onCopyError'
                                                                     v-clipboard:success='onCopy'
                                                                     class='el-input__icon el-icon-document-copy'></i>
                </el-input>
              </el-form-item>
              <el-form-item label='火星坐标系'>
                <el-input v-model='formLabelAlign.gcj02' readonly><i slot='suffix'
                                                                     v-clipboard='() => formLabelAlign.gcj02'
                                                                     v-clipboard:error='onCopyError'
                                                                     v-clipboard:success='onCopy'
                                                                     class='el-input__icon el-icon-document-copy'></i>
                </el-input>
              </el-form-item>
              <el-form-item label='百度坐标系'>
                <el-input v-model='formLabelAlign.bd09' readonly><i slot='suffix'
                                                                    v-clipboard='() => formLabelAlign.bd09'
                                                                    v-clipboard:error='onCopyError'
                                                                    v-clipboard:success='onCopy'
                                                                    class='el-input__icon el-icon-document-copy'></i>
                </el-input>
              </el-form-item>
              <el-form-item label='地址'>
                <el-input v-model='formLabelAlign.address' readonly><i slot='suffix'
                                                                       v-clipboard='() => formLabelAlign.address'
                                                                       v-clipboard:error='onCopyError'
                                                                       v-clipboard:success='onCopy'
                                                                       class='el-input__icon el-icon-document-copy'></i>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-header><h1>相关功能</h1></el-header>
          <div class='right-form'>
            <el-link class='trans-coord-btn' type="info" href='#/coordTrans' :underline="false">
              <el-card class='box-card'>
                <div class='text item'>
                  坐标转换
                </div>
              </el-card>
            </el-link>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { Viewer } from 'cesium'
import { wgs84togcj02, gcj02tobd09 } from '@/utils/transformCoordinate'
import { jsonp } from 'vue-jsonp'

export default {
  name: 'coordinatePickUp',
  data: function() {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        wgs84: '-',
        gcj02: '-',
        bd09: '-',
        address: '-',
        formatted_addresses: '点图获取坐标'
      },
      coordinate: '',
      coordinateTooltipX: 0,
      coordinateTooltipY: 0,
      isFullScreen: false
    }
  },
  mounted() {
    let _this = this
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
        destination: Cesium.Cartesian3.fromDegrees(106.57235543868288, 29.560696474923013, 10000)
      })
    })

    // 去除版权信息
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(106.57235543868288, 29.560696474923013, 10000), // 设置位置
      orientation: {
        heading: Cesium.Math.toRadians(0.0), // 方向
        pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
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
    let token = 'c6a366fc893103a30164aef8a5a298f7'
    // 服务域名
    let tdtUrl = 'https://t{s}.tianditu.gov.cn/'
    // 服务负载子域
    let subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
    // 叠加影像服务
    let imgMap = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18
    })
    viewer.imageryLayers.addImageryProvider(imgMap)

    // 叠加国界服务
    let iboMap = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 10
    })
    viewer.imageryLayers.addImageryProvider(iboMap)

    let TDT_CVA_W = 'http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0' + '&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' + '&style=default.jpg&tk=' + token

    let zhLayer = new Cesium.WebMapTileServiceImageryProvider({
      url: TDT_CVA_W,
      layer: 'cva',
      style: 'default',
      format: 'jpg',
      tileMatrixSetID: 'w',
      maximumLevel: 18
    })
    viewer.imageryLayers.addImageryProvider(zhLayer)

    viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      // 影像注记
      url: 'http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' + token,
      subdomains: subdomains,
      layer: 'tdtCiaLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      show: true
    }))

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
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
        let longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6)
        let latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6)
        _this.coordinate = longitude + ',' + latitude
        document.querySelector('.coordinate-tooltip').style.display = 'block'
        _this.coordinateTooltipY = (wp.y + 15) + 'px'
        _this.coordinateTooltipX = (wp.x + 15) + 'px'
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
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
        let longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6)
        let latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6)
        _this.formLabelAlign.wgs84 = longitude + ',' + latitude
        let gcj02 = wgs84togcj02(+longitude, +latitude)
        _this.formLabelAlign.gcj02 = gcj02.map(item => item.toFixed(6)).join(',')
        _this.formLabelAlign.bd09 = gcj02tobd09(gcj02[0], gcj02[1]).map(item => item.toFixed(6)).join(',')


        // axios.get('https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp', {
        //   params: {
        //     location: `${latitude},${longitude}`,
        //     key: 'IOBBZ-5JNYS-4XZOL-66OLK-XAQ7T-JHFBU'
        //   },
        //   dataType: 'jsonp',
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET,POST',
        //   }
        // })
        //   .then(function (response) {
        //     console.log(response)
        //     if (response.data.status === 0) {
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        const KEY = 'IOBBZ-5JNYS-4XZOL-66OLK-XAQ7T-JHFBU'
        let url = 'https://apis.map.qq.com/ws/geocoder/v1/'
        jsonp(url, {
          key: KEY,
          location: `${gcj02[1]},${gcj02[0]}`,
          output: 'jsonp'
        }).then(res => {
          _this.formLabelAlign.address = res.result.address
          _this.formLabelAlign.formatted_addresses = res.result.formatted_addresses.recommend
        }).catch(err => {
          console.log(err)
        })
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    document.querySelector('#cesiumContainer').onmouseout = function(event) {
      document.querySelector('.coordinate-tooltip').style.display = 'none'
    }
  },
  methods: {
    onCopy: function() {
      this.$message.success('复制成功')
    },
    onCopyError: function() {
      this.$message.error('复制失败')
    }
  }
}
</script>

<style scoped>
.el-row, el-col {
  height: 100%;
}

.full-height {
  height: 100%;
}

#cesiumContainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.right-form {
  padding: 0 20px;
}

.el-input__icon:hover {
  cursor: pointer;
  color: #5cb6ff;
}

.coordinate-tooltip {
  position: absolute;
  z-index: 1;
  display: none;
  color: #FFF;
  padding: 8px;
  border-radius: 5px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.7);
  pointer-events: none;
}

.trans-coord-btn{
  display: block;
}

.trans-coord-btn .el-card:hover {
  background-color: #f7f9fd;
}

</style>
