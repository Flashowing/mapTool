<template>
  <div id='cesiumContainer'>
    <div class='sideBtns'>
      <div>
        <van-button round is-link @click='showPopup'>图层</van-button>
        <div>
          <van-popup v-model='butsShow' position='bottom' round get-container='body' :style='{height: "35%"}'>
            <div class='popContent'>
              <div>
                <span>公厕：</span>
                <el-checkbox-group v-model='checkList.wc' class='chkGroup'>
                  <el-checkbox label='已采集' value='yes' @change='checked=>checkPoint(checked, "yes", "wc")'></el-checkbox>
                  <el-checkbox label='未采集' value='no' @change='checked=>checkPoint(checked, "no", "wc")'></el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <span>公园：</span>
                <el-checkbox-group v-model='checkList.park' class='chkGroup'>
                  <el-checkbox label='已采集' value='yes'
                               @change='checked=>checkPoint(checked, "yes", "park")'></el-checkbox>
                  <el-checkbox label='未采集' value='no' @change='checked=>checkPoint(checked, "no", "park")'></el-checkbox>
                </el-checkbox-group>
              </div>
              <div>
                <span>停车场：</span>
                <el-checkbox-group v-model='checkList.parking' class='chkGroup'>
                  <el-checkbox label='已采集' value='yes'
                               @change='checked=>checkPoint(checked, "yes", "parking")'></el-checkbox>
                  <el-checkbox label='未采集' value='no'
                               @change='checked=>checkPoint(checked, "no", "parking")'></el-checkbox>
                </el-checkbox-group>
              </div>
              <!--        <div>-->
              <!--          <span>直饮水点：</span>-->
              <!--          <el-checkbox-group v-model='checkList.drinkingwater' class='chkGroup'>-->
              <!--            <el-checkbox label='已采集' value='yes'-->
              <!--                         @change='checked=>checkPoint(checked, "yes", "drinkingwater")'></el-checkbox>-->
              <!--            <el-checkbox label='未采集' value='no'-->
              <!--                         @change='checked=>checkPoint(checked, "no", "drinkingwater")'></el-checkbox>-->
              <!--          </el-checkbox-group>-->
              <!--        </div>-->
              <!--        <div>-->
              <!--          <span>劳动者港湾：</span>-->
              <!--          <el-checkbox-group v-model='checkList.labourer' class='chkGroup'>-->
              <!--            <el-checkbox label='已采集' value='yes'-->
              <!--                         @change='checked=>checkPoint(checked, "yes", "labourer")'></el-checkbox>-->
              <!--            <el-checkbox label='未采集' value='no' @change='checked=>checkPoint(checked, "no", "labourer")'></el-checkbox>-->
              <!--          </el-checkbox-group>-->
              <!--        </div>-->
              <!--        <div>-->
              <!--          <span>人行天桥：</span>-->
              <!--          <el-checkbox-group v-model='checkList.footbridge' class='chkGroup'>-->
              <!--            <el-checkbox label='已采集' value='yes'-->
              <!--                         @change='checked=>checkPoint(checked, "yes", "footbridge")'></el-checkbox>-->
              <!--            <el-checkbox label='未采集' value='no'-->
              <!--                         @change='checked=>checkPoint(checked, "no", "footbridge")'></el-checkbox>-->
              <!--          </el-checkbox-group>-->
              <!--        </div>-->
              <!--        <div>-->
              <!--          <span>地下通道：</span>-->
              <!--          <el-checkbox-group v-model='checkList.underpress' class='chkGroup'>-->
              <!--            <el-checkbox label='已采集' value='yes'-->
              <!--                         @change='checked=>checkPoint(checked, "yes", "underpress")'></el-checkbox>-->
              <!--            <el-checkbox label='未采集' value='no'-->
              <!--                         @change='checked=>checkPoint(checked, "no", "underpress")'></el-checkbox>-->
              <!--          </el-checkbox-group>-->
              <!--        </div>-->
            </div>
          </van-popup>
        </div>
        <van-button round :type='btnStatus' @click='switchRoadStreet'>街道</van-button>
      </div>
    </div>
    <div class='tools'>
      <div class='myLocation'>
        <!--        <span class='normal'></span>-->
        <van-icon name='aim' size='22' />
      </div>
      <div class='info'>
        <div class='info_format'>{{ formatted_addresses }}</div>
        <div>{{ address }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Viewer } from 'cesium'
import { getCurrentLocation } from '@/utils/currentLocation'
import { jsonp } from 'vue-jsonp'
import { gcj02towgs84, wgs84togcj02 } from '@/utils/transformCoordinate'
import { Popup } from 'vant'
import { Icon } from 'vant'
import Vue from 'vue'

Vue.use(Popup)
Vue.use(Icon)
export default {
  name: 'coordLocation',
  data: function() {
    return {
      btnStatus: 'default',
      butsShow: false,
      checkList: {
        wc: [],
        park: [],
        parking: [],
        drinkingwater: [],
        labourer: [],
        footbridge: [],
        underpress: []
      },
      formatted_addresses: '推荐地址',
      address: '地址',
      curPosition: [0, 0],
      datas: {
        wc: [],
        park: [],
        parking: [],
        drinkingwater: [],
        labourer: [],
        footbridge: [],
        underpress: []
      },
      gyroscopeAngle: 0,
      roadPovider: null
    }
  },
  methods: {
    showPopup() {
      this.butsShow = true
    },
    switchRoadStreet() {
      this.roadPovider.show = !this.roadPovider.show;
      this.roadPovider.show ? this.btnStatus = 'info' : this.btnStatus = 'default'
    },
    checkPoint(checked, val, type) {
      this.datas[type].forEach(item => {
        if (val === 'yes') {
          if (item.isCollection) item.show = checked
        } else {
          if (!item.isCollection) item.show = checked
        }
        // item.show = this.checkList.indexOf(item.type) > -1
      })
    }
  },
  mounted: function() {
    let _this = this
    let agreement = location.protocol
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
      // sceneMode: Cesium.SceneMode.SCENE2D, //使用earthsdk切换3d视角要加上这句
      selectionIndicator: true, // 取消点击有绿框
      shouldAnimate: true, // 允许动画
      sceneModePicker: true, // 是否显示3D/2D选择器
      navigationInstructionsInitiallyVisible: false
      // navigation: false,
      // scene3DOnly: true // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源（这个设置未true切换3d/2d的组件不会显示出来）
      // terrainProvider: Cesium.createWorldTerrain(),
      // imageryProvider: new Cesium.TileMapServiceImageryProvider({
      //   url: 'http://183.230.114.154:9010/map/staticResources/Cesium-1.85/Build/Cesium/Assets/Textures/NaturalEarthII/'
      // })
    })
    window._viewer = viewer
    viewer.sceneModePicker.viewModel.duration = 0.0
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
      duration: 2, // 设置飞行持续时间，默认会根据距离来计算
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
    viewer.scene.globe.depthTestAgainstTerrain = false

    let token = 'c6a366fc893103a30164aef8a5a298f7'
    // 服务域名
    let tdtUrl = agreement + '//t{s}.tianditu.gov.cn/'
    // 服务负载子域
    let subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
    // 叠加影像服务
    let imgMap = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18
    })
    // viewer.imageryLayers.addImageryProvider(imgMap)

    // 叠加国界服务
    let iboMap = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 10
    })
    // viewer.imageryLayers.addImageryProvider(iboMap)

    let TDT_CVA_W = agreement + '//{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0' + '&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' + '&style=default.jpg&tk=' + token

    let zhLayer = new Cesium.WebMapTileServiceImageryProvider({
      url: TDT_CVA_W,
      layer: 'cva',
      style: 'default',
      format: 'jpg',
      tileMatrixSetID: 'w',
      maximumLevel: 18
    })
    // viewer.imageryLayers.addImageryProvider(zhLayer)

    this.roadPovider = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
      // 影像注记
      url: agreement + '//t{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' + token,
      subdomains: subdomains,
      layer: 'tdtCiaLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      show: false
    }))
    this.roadPovider.show = false;

    // let roadProvider = new Cesium.UrlTemplateImageryProvider({
    //   url: 'http://222.178.182.14:9010/dataserver?x={x}&y={y}&l={z}&t=cva_c',
    //   tilingScheme: new Cesium.GeographicTilingScheme(),
    //   maximumLevel: 20,
    //   format: 'image/png'
    // })
    // let _roadProvider = viewer.imageryLayers.addImageryProvider(roadProvider);

    let myLocationEntity = void 0

    function getLocation(callback) {
      getCurrentLocation(function(position) {
        _this.curPosition = position
        if (myLocationEntity) {
          viewer.entities.remove(myLocationEntity)
        }
        myLocationEntity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(position[0], position[1]),
          billboard: {
            width: 30,
            height: 30,
            rotation: new Cesium.CallbackProperty(function() {
              return Cesium.Math.toRadians(Number(_this.gyroscopeAngle))
            }, false),
            // image: 'data:image/png;base64,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',
            image: 'data:image/png;base64,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',
            eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, 0)),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //绝对贴地
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY //元素在正上方
          }
        })
        if (callback) callback(position)
        const KEY = 'IOBBZ-5JNYS-4XZOL-66OLK-XAQ7T-JHFBU'
        let url = agreement + '//apis.map.qq.com/ws/geocoder/v1/'
        let txCoord = wgs84togcj02(position[0], position[1])
        jsonp(url, {
          key: KEY,
          location: `${txCoord[1]},${txCoord[0]}`,
          output: 'jsonp'
        }).then(res => {
          _this.address = res.result.address
          _this.formatted_addresses = res.result.formatted_addresses.recommend
        }).catch(err => {
          console.log(err)
        })
      }, () => {
        _this.address = '获取坐标失败'
        _this.formatted_addresses = '获取坐标失败'
      })
    }

    getLocation((position) => {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(position[0], position[1], 2500),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: Cesium.Math.toRadians(0)
        }
      })
    })

    document.querySelector('.myLocation').addEventListener('click', function() {
      getLocation((position) => {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(position[0], position[1], viewer.camera.positionCartographic.height),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: Cesium.Math.toRadians(0)
          }
        })
      })
    })

    setInterval(() => {
      getLocation()
    }, 3000)

    let wc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABSNJREFUaEO9mXfIvlMYxz+/MiLiD5SssjKyt5CVHVKIhGRkJEJm4R8jq+yZmayM7MyQkT1CGdkZKSv8QfT5de6385znPuc+9/Pez3vVqfd9zjnXdX3PuK7vde55DCcrA7sDawIrRk0LX0XtI+BR4PMhTM+bpZKNgD2AXYHNeup6DXgceAR4s+fcmeGTAtDxI0Ob1HY873rA1hvIJACuG9DxFLwgjuqzIn0B3APsGxn4Ange+BfYHFi7wvhvwCuhbQvYYrkX2K9Cz/whfQC8C6wbFH8DXApclhg6oeW3eMgtwLmAwBsRwNkJkPeA9WpA1AL4L1G2CfBGxsCywHctfQI+qeDU08AOSX+nf50DgC9DSGx0nxNWsbRArqjjGnkG2LFjRVcFPgAWjsYZflcqzesC8CKwVaLgCODGDmcMq49FY24DDqk4Ep8B5pNYXgK2zs0tAchFm+3Cxe3yJz52NbumvudaLrW/Z6NTDoBxPnfG53oHmoXauC1P5ACUYn3Nag51B+Jdbt2FNgCl1W8UzlUUSo/p2C60ATgdOK/jgOfygGHy4sLc2jyQU3EGcH7c2QYgd5GaeTrhDiwU7olR6iZgyxCxDJl/Jxk7ttmViUtrZ9Y3iMxICmCFQHu7Qu8+wP2ZQXsDDwJp8ouHy0Jlo9KSGvoRz5Wqf938kAI4Briq4/g4Z1IABoDFgZODjbWAUwK1iBNfyYVjgatzAOw4ugJAVw6wP92BJnrpQNsivQ2sX6H4GsCFni/pDlhcWFV1HaEKOyMA5EaSM9ungZ40OpYDvgWOA66oUGw1ZxHVCkAWuM4UADSr/xCwV4t+A8DLwIehJC258H7Eisd24BdgiYEBuPoGB/nM6sANLfoPBYxuXXTcqb8CS+Z24E9gkYEBNLHb43kQ4CKlYiheMHAhj9gqBR/+AhbNATBBeSaHugOuvvp2AuRQcTWX2rgjALSkvLbggPdl+RyAuOrK6eii4M08o5DOyGEeBm4HLElzcnmg4E+EXOSxa5ORai11pisLq9Bs+FOhbtXJpQMtVv+ewXnPbSm5bQp43EyEKRmMgYxk40kSWaPMfOG2/xFpPwC4M/rf6OOxeRU4vONo2v09YJwvZehiIlsD8OWsRlR0H/BDGCw/khYYTVLZBXiyQqlEsFQ3q8KXv49zd8DfffLwiaQkln7WsIqhUXrQPEp9EvXZ/zOwVIXzDjETm5Fz4k5uEXe2XchTgQs6DI6xwmh8eo+kJ+5WrZSS2WnAhV0AVgsZcYGCxT4Aaiq42FQukPwDSP7c4RnJhcS7O17H+gDwuMk4H6jYAlnqRZlxRrf9074cgO0BC5Oc9AGQLpgvca5yI/qQ/tZm10evZ2sBOM574H1ok7kG4Ln3/I9JKasaWV7IcPS5BPAOsA3we18AjndrfWFLCV6fMDqbIyRx2630kFbDa3Lns+E5pn1FzrMzcHPh7vgs4uOv3Ci+A9Lptnmdr4A1ADS0YSg44ofXgp+DdJXenkbQ11ozL1zZ9wtKrfJonCXjYcCPNXNrdyDWdTxwJrBMjYEeY0xUlwBnAf5dJZMAULGkTxBWWEOISUoi93pfZZMCaOwY3nwjsuUKkJxPhsW7QhtLULVAZgugsbMYcCBwYtidLvvyI2m3X39mJUMBaJzwY/dTgV7nHPMLpF8iB5GhAejUwcCtGe/8zOTnpsFkGgB0ru2JcuRJcCgE0wKgf1ZoJkDlLcAPJ4PLNAHE5eEGgKRscJkmAJ31MUtpe04cBMz/tBARQOdMv80AAAAASUVORK5CYII='
    let parking = 'data:image/png;base64,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'
    let park = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABBdJREFUaEO9mY+RTVEMxrMVoAJUgApQASpABagAFaACVIAKUAEqQAdUwPze3Ozk5iUnuX/enpmdse45Sb4kX5Jz9kz2WzdF5J6I3JlEXhMRfli/ph/+/UVEPonI9z1Un20UgoHPReS+iFxeKOuPiHwUkZcG3EIRImsB4O0nIvJoscb4wLu1QNYAwOMvdjLci0EuEWmvJQBIkQ8mx9tKFm6EIw9EhBQrVxcAKfN5RZ6XBiQbMP5uh+gdABdh/F8ReS0iT0Xk0gQKELcqglcASBs8D4hTLrxN6lCC0aeLUsu3NJ0qAAjTun4qAO9dNQPIbaOM3wERrhEAwvnqVFZPckkdokuj00Vv+en0PptS7MicDABCvl0AaSmZUUnm/yjXulI+ZABoLA9P7P3fk/ej/IZ7REUJjSk+1Q7mRQA4TAij0YBQQixGACt8DdbHIoKjskWXf+uicN0TOgKQ5f5XQ2gvfCmAH83K9q/iQgSA3I/KJjXZTpBbQTAA4pQshUhheoNd6MeO8xUB8KjZ/GZqMt7TW7gCB3TcjiIIB64GH2Y2ewC+kXCeUoeirJnAB+4BLCUm3rX5GxnIvMPZbEW2sFeb3uGcB+DLF3vSGjxphuw0mxsiYok5SjHLpxF/fFNj76z0egDWm+rRUZhVOSBIJzxvV5Zink8ZiKipzcqpB+ARz8I1ctXgm3dKxqdMBETm8qRrFr0RgG6YK1w2xY5yuDocDHhtAN0wN2w4FAGdbyiF8IpoVwse4X1b1tsAFl/vBtZghK3pVRdWUVEhGALw+VZ5aM33panpeTmsQhcxQi9NTd8PZmXdk5hcY5SoFtWJEhl1SnsWY628cKKslE26dDqeOSAaJei4o0lTSytgq8csf0280n1tcKC0CDAVzHRGAKr5Rgcqe3fNnAhYey1dmj4qVzPjKIIRgGwGUWFaQTp3ZSLQmVqzS713zJEDshtZNgkikEoFkeyVL4sAFYN7NcVhtDoAwjtEBiCLAmMAHImGvshAW/JGgDsAwrFm9CoRTYKkA3WcCEEmJtBs4THAQkD2wa2M9BUAnuP9oHjQOwKAYgjrK5J6teKKGtWJ1ghA9PRy7rTqYSsykukSHvBt9ErNHvYSteoZfgRgOBFXAEDa8WCjF60icXWZav+Bo+oNWwEgH2OpWBqtVtfuRGA0GW41PDvfnVbbEVBFVAK8tfVRKzMcwhKB0WV/dnZJBPQgpRBe2GveHpGgxyC39ZcZVbgGgJ6lzKKQqKyNCB7H28ixL9Rth2wBYCMCCEJv3/VHRtAMScXR22gLxB4ArKJOtWpVl5b1RSfuyvD7RiB2Nb4aJdYCyJpf2ZTWKNw7hawNdhhcepFvYzklADtH7fHCF4I6JQAU6uNV5/bW9rrdeGoAanjnFW4VgP+cL+oxKDwEFgAAAABJRU5ErkJggg=='
    let loabourer = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABBdJREFUaEPNmV3oj2cYxz9qyYmz4YQDWRFTLCWcbEN5KURMhhRTLDKv5SXkJTXC1nZgazavoYTalLcthbDFwaxWavIS5dCpA31/7ufXvft/P8/98nue/3bXU7/n91wv3+9zXfd9X/f19KC+MQqYCgwA+ptLvzWeAE/Npd8/A7/X4bpHh0YmA8X1XqKth8BF60pUfyueS2AesAiYmOW1q9Jl4EfgRKq9VAKfAF8Ao1MdRcrfBvYDpyLlkyLwGXAo1nCHckuB72JsxEZgF7AxxmCNMruBTSF7MQSuAONDhhp6fhWYUGU7ROAIsKAhcLFmjwILy4SrCKwFvoz10rDcOmCvz0cZgTHAzYZBpZofC9xylcoInAZmAx8Bv1lKW4Ft1v154B9zPxCYnooqQf4MMCeGgICLgEYletmTUXusMut4Aq4k0S4+fRFQ6iiFqgi4xGwUc4GTSbDihZVCSqX2cAkI2DXruS8CitD7AZ8vgH4mQkq5v+IxtiWHmnSVP3t8DPxa/OES2AFsDhDoC3weAHQHeOTL2QwixXwsVHcCW8oI/AkMCxBQek0KAPnbFGbbMwC7KioaD1t/PrAzwI6AQqaH9vCl0GpgCPC8BNwgQC9iD9AEAbnVS26lpU1AM9ytAstWoa+BlR4C7wLaORUh77KXERE3hWRCVXFrpbQJ+HbeqmX0D+AncyCRLR1sNDcGWyBFou5JLPPtndkm8BWwIiKF7I0s44XWotLOAJvAOc9OGtqJa0GTYUQVwAw3hX4xaRCaxP+HCOgsPcUlcAz4NCKFMl5YxyruSzsOzHcJxMyBjpFkGPjQ3nmNvncOuJWmZKtqngwsWSo+AopIa4+xJ/EI4F4ghbIQdKjkIzASuO8S0H2olOgQS5a6S6C0lJB19WRU0xfDt4zKYNNDh6iiDHEJHDC9qRYGtxpVqapOQBWB7lhG2zkOuATUIWmX/L4DzQ3r0PBfbWRlBHTYGmeH30dgjdUBsM/DhV53pZCNs/Cpem1fiEBvQM3WpvqfufNHfVM1k1+FCOi5GIvEO7neatZ7bcB3yYiqxpadSjXjSTbXJXUKC6HWojrES5Ld1avwPaDOuHeECEhJHYDumLg+gEoZrYSlI4aAlL8Bltf7YoPWfgAWh6RiCcjONEDh7BMyWsPz2j9wFJiGAxs854YaMLdMXDfr/IVYgykRsG3OBLRK/avNF+vUI6dPr9qgDqbayCVQ+BERXbOAXqnOgUvAWXO9zNBP+shXZV+tdX1FiS309OFELZe7OaBtnU4j4Pq3W/Nl2KInaAy5ugnIpyKhhpdv6M2vjwEWK9MEAfn+FljmgGi3QmLBxcg1RUC+1Xr8wIB4bFasZzGgUmSaJGA3CfSt1z7ppWCslG2SgByrCOtpSpHaQNuG3gDDVL0xVmufWQAAAABJRU5ErkJggg=='
    let drinkingwater = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABEFJREFUaEPFmVuoVkUUx39CIEE9pBhGL1GihEKKSmUFaSpGWWle0NRKrYjqQQoyL5SYWpgYZJBaeUFTK69lhnlFk5QkAk2QrF70wTAfiiIJir/MPm332TOz5jvznbNgczjfN+u/1n+vmVmXrxN55CpgqHtuB64rPbJwsfQcBfa455+2mu/URoD+wNPAKKBbItavwFZgBXA8UbdleaMECsflfA4RiYaINELgVeC1HF7XYAh3Xgp2CoF7ATmvv2VR+H8vfXAtoAg1KgccCf2NipXAA8DnNWgngT41n58Aekethxc8COyMYVgI3A1sB7rUgOktDa75fH9NpGK+VL//DXgYOBxSjBHQ290G3BIAqcP4N9Vbz/ozwCOAIlorMQKbgHEe3V8Aba0far7vAazMEAVBfwyMb4TAFGBN4E36tk+hkvO2ehxYW+eLLwJdgUPArQECvgNcqCx3SS7HbjoF3ANcqIL5CMwB5hssfwucdknoINDd6Q0A+hr0U5bMBV63ELgG+A7QPo7Je8CzNYteAhbHlBO//xHoB/xR1quLwPPAO0ZwXaG+hJN6E20A7gRuCth+AVgWI/A1MKidCRTnSc7/HLB9BLgrRKCzK3uvzkBAySxFioQYitxfrkz/uwCubiHVMDqYVgltIStGdZ36iW8CyrogWsrvKoHpLgFZjTeDwP3AFwEHngLe90XgDeBlq/euDsp1iGV2DPBnhMCbwEwfgdTkk/MWKmf20DlQ4/OMj4DqjrEdFAHta+3vgcCxgA+flOuz6hn4yjXmVg45IyCbKhAvAT0DDmggMMwXgY+ACVbvm3AGLKaV8Cb6CKjWmG1BcWtyR8BiegGgWu2yVLfQVOADC0oHEpgGfOgjoIY9JYN2RASusFlXzKmNu9kYhfYm8FO1va0jkNJJtTeBVnOjOgKxWqQcHN0GuhWqcgNwzhjFlGV3AJqttoivI9vi5p0x8I2ea1f96+SYcuL3mqOOrur4CAwB9hoMKKTCUOpXitcl0Mv9n3v8eB+wz0pA63RVPRkhEXIyJ4FVgK74VhKaC90GqLTwjc01Hlcn5RN1V6H20BDgy0tkR6XD96kEtP4xYJ3H0hWNhWeNmqO2DHoFOwlY72Mbm8xJ70XgrQrADOBtwytMTYxVSE03loTsWAhIXz9kqFcoRGdjdZMJqObXxRAUKwGBqE9Qv9Aeonms6v6opBAoSKhiDdXrUaOBBZryqdI0OS+cVALSud71pDoHOWUpoJ78fApoIwQKfCUWlbYjAY0jGxGNCT9zJbwlcbay0RYCBdiNjsRDgEYiFtkF7HDOn7Uo+NbkIFDGVsZ8IuKQbq9Yhjdzyk1AhjV8fc7jwbuAhsfZpBkE5NxC4JWKl4uAWdk8d0DNIiB47fMRzs6XCecjiWMzCTwKfOq80chwc5JnxsXNJCAXNM+XWH9vMLr9/7JmExjuTO1O9syo8B+s5sIxQCLq0wAAAABJRU5ErkJggg=='
    let footbridge = 'data:image/png;base64,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'
    let underpress = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABG5JREFUaEPNmY2xDUEQhc+LABEgAkSACBABIkAEiAARIAJEgAgQASJABNSn9tzq7TuzO7M/9W5XbV33mu3p0336Z+adaTu5LumOpFuDyiuSeJAfw8O/P0n6IOnrFlufrVSCgU8l3ZV0sVPXb0nvJT0P4DpVSEsB4O1Hkh5071h+4c1SIEsA4PFnGxme1aCXiDRLDwAo8i5wvHmTzoXkyD1JUGxWWgFAmY+B55+HZPQGjyVdmN1tvOCPpJfhJ5L/5vAd42+3JHoLgGw8e1xNiYch5ESPvJIEcAsF4Xv4Dogbcwk+BwDa4HlARMnvwV1yo0fges6lv0kBpZZIVOk0BwDjXdfPAwB7khOAKMoUAML7QtLPEEZzdO8IkGMItLos6UnKlwOYGgBe/DIYH+ljnu4JIOcXNAJEMR9qAGgs9yXhiUwheLongKwbChH5t6XGWQJA4lIN+DwlACQy0RkldAmAuQ/PTgkA9hzlQgkA3DfvTw0A+UAuTCZxrMWnBgDDR07PESBhqf2WDIC8+FXoxE76nkaWk9IV7lLiuZPYuukJ/PZfWqoJxnEgQQDIQyiZ5V2r15wHrBsdUBfjbCCg8sg+6uAZAEahhM+mabDH5SvXEn1AAu4AqlRzMT5OiSv33fR1KiQgDr2pBIAkBsApRgAA2DwJgK5XHZ429WefMh+oRoWl1rbpeISKW4ZTEG4xoDYTwiQAH0wocczq8YBxnkBwKPYwn01WoThGxJdKxnMkxCuEthYpRnHWwNlrFQ98GyoLEWfqzJKdORonMoUooYwSiEtp7eokNqJaI+Nw7n5BUSidm9244t4RBLpdQvmdUeJwKVaahWobZc/EM20LAOjom7qoaw5AXEvURxdoJQCtYwGhhxoopLnUwk8E84gSjXooiT1bLgaOzgQlAFObeWN4iLjhwV+8yxEUwVMkHaH2WGAgJCJi7vtmAkewhqeWLyP6oKR2ImM+KXmUd6gC/B8J6lsFPnnHV470EcAA1ADIBdaZ0xjKRRkUspB/5E2p+gE4345UAbREIZaz2rVKnBzzVGmjoxPztUqk2mgKLb2ck7S2odeRxHidpLfnsw68CR3wHnTLUYVqpgxriEhJaGTQ9EimrlXgNBx26WMzxN+JgGcSwJYutvAa5wuv9bWMDaGrEj3WeG3eh+84yGP3CMTcxVakEnzG268HDUTABmFI6WqRd8gFr80cxkF4F/BUI3TzSUK7IBSp00IhrzG/8QDduXRTV4n8op+JpntG9UKrBwBr3Rvi6WyRdQ0v+RRWvAfK789RKK4n2UyfBjtWLXFzm1XSAwBlVAKi0Pu3gFlDhgWuSp6fZt/rBYBCEoy86P17wJwxJDp6u06CSwDYELjKhkRlaUQ8kruTz4Hs6gOtyjzqkiO5ztd0UHahIs8qWROB0sYtk2xTdWlFtTWAWHJLNmxqPBvsAQC9peFutim1ej2u2wsAe8RhsHRJvMTeXZK4ZkicoybnmTVI9oyAo8DnbvPT3gDiuL3G0dV3/wGaKxtAhHv6fgAAAABJRU5ErkJggg=='

    fetch('./data/cityinfo_eight_parts.json').then(response => response.json()).then(data => {
      for (const dataKey in data) {
        let dataCluster = new Cesium.CustomDataSource(dataKey)
        data[dataKey].forEach(feature => {
          if (feature['lnglat']) {
            let cords = feature['lnglat'].split(',').map(item => {
              let coord = parseFloat(item.trim())
              // console.log(coord)
              return coord
            })
            if (cords && cords.length != 2) {
              console.log(feature['name'])
              return
            }
            let gcj02towgs = gcj02towgs84(cords[0], cords[1])
            let pointEntity = dataCluster.entities.add({
              show: false,
              name: feature['name'],
              isCollection: feature.isCollection,
              position: Cesium.Cartesian3.fromDegrees(gcj02towgs[0], gcj02towgs[1]),
              description: createDescription(feature),
              label: {
                text: feature['name'],
                font: '14pt sans-serif', // 字体样式
                pixelOffset: new Cesium.Cartesian2(0, -20),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //	一个属性，指定高度相对于什么
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 水平原点
                verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 垂直原点
                fillColor: Cesium.Color.fromCssColorString(feature.isCollection? "#e1b925": "#FFF"), // 指定填充的属性Color
                backgroundPadding: new Cesium.Cartesian2(8, 4), // Cartesian2以像素为单位指定水平和垂直背景填充的属性
                disableDepthTestDistance: Number.POSITIVE_INFINITY // 元素在正上方
              },
              billboard: {
                width: 20,
                height: 20,
                image: eval(feature.type),
                eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, 0)),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //绝对贴地
                clampToGround: true,
                disableDepthTestDistance: Number.POSITIVE_INFINITY //元素在正上方
              }
            })
            try {
              _this.datas[feature.type].push(pointEntity)
            } catch (e) {
              console.error(e)
              console.log(feature)
            }
          }
          // let coordinates = feature.geometry.coordinates[0];
          // let c = coordinates.map(item => {
          //   return Cesium.Cartesian3.fromDegrees(item[0], item[1], 125);
          // });
        })
        let dataSourcePromise = viewer.dataSources.add(dataCluster)
        dataSourcePromise.then(function(dataSource) {
          let pixelRange = 15 // 代码中pixelRange是聚合距离，也就是小于这个距离就会被聚合
          let minimumClusterSize = 3 // 是每个聚合点的最小聚合个数，这个值最好是设置为2，因为两个图标也可能叠压
          let enabled = true

          dataSource.clustering.enabled = enabled
          dataSource.clustering.pixelRange = pixelRange
          dataSource.clustering.minimumClusterSize = minimumClusterSize

          let removeListener

          let pinBuilder = new Cesium.PinBuilder()
          let pin50 = pinBuilder.fromText('50+', Cesium.Color.RED, 48).toDataURL()
          let pin40 = pinBuilder.fromText('40+', Cesium.Color.ORANGE, 48).toDataURL()
          let pin30 = pinBuilder.fromText('30+', Cesium.Color.YELLOW, 48).toDataURL()
          let pin20 = pinBuilder.fromText('20+', Cesium.Color.GREEN, 48).toDataURL()
          let pin10 = pinBuilder.fromText('10+', Cesium.Color.BLUE, 48).toDataURL()
          let singleDigitPins = new Array(8)
          for (let i = 0; i < singleDigitPins.length; ++i) {
            singleDigitPins[i] = pinBuilder.fromText('' + (i + 2), Cesium.Color.VIOLET, 48).toDataURL()
          }

          function customStyle() {
            if (Cesium.defined(removeListener)) {
              removeListener()
              removeListener = undefined
            } else {
              removeListener = dataSource.clustering.clusterEvent.addEventListener(function(clusteredEntities, cluster) {
                cluster.label.show = false
                cluster.billboard.show = true
                cluster.billboard.id = cluster.label.id
                cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM
                cluster.billboard.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND //绝对贴地
                // cluster.billboard.disableDepthTestDistance = Number.POSITIVE_INFINITY; //元素在正上方
                if (clusteredEntities.length >= 50) {
                  cluster.billboard.image = pin50
                } else if (clusteredEntities.length >= 40) {
                  cluster.billboard.image = pin40
                } else if (clusteredEntities.length >= 30) {
                  cluster.billboard.image = pin30
                } else if (clusteredEntities.length >= 20) {
                  cluster.billboard.image = pin20
                } else if (clusteredEntities.length >= 10) {
                  cluster.billboard.image = pin10
                } else {
                  cluster.billboard.image = singleDigitPins[clusteredEntities.length - 2]
                }
              })
            }
            // force a re-cluster with the new styling
            let pixelRange = dataSource.clustering.pixelRange
            dataSource.clustering.pixelRange = 0
            dataSource.clustering.pixelRange = pixelRange
          }

          customStyle()
        })
      }
    })

    function createDescription(feature) {
      let html = `<table>`
      for (const featureKey in feature) {
        html += `<tr><td>${featureKey}</td><td>${feature[featureKey]}</td></tr>`
      }
      html += `</table>`
      return html
    }

    let ua = navigator.userAgent.toLowerCase()
    if (window.DeviceOrientationEvent) {
      if (/android/.test(ua)) {
        window.addEventListener('deviceorientationabsolute', function(event) {
          let angle = event.webkitCompassHeading
            ? event.webkitCompassHeading
            : event.alpha
          if (angle >= 0) {
            _this.gyroscopeAngle = Number(angle)
          }
        })
      } else {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          window.DeviceOrientationEvent.requestPermission().then((state) => {
            switch (state) {
              case 'granted':
                window.addEventListener(
                  'deviceorientation',
                  function(event) {
                    _this.gyroscopeAngle = 360 - event.webkitCompassHeading
                  },
                  false
                )
                break
              case 'denied':
                alert('您拒绝了使用陀螺仪')
                break
              case 'prompt':
                alert('获取陀螺仪权限失败')
                break
            }
          })
        } else {
          // non iOS 13+
          window.addEventListener(
            'deviceorientation',
            function(event) {
              // iOS设备直接使用webkitCompassHeading
              if (event.webkitCompassHeading) {
                // 由于实际是指北的，需要反转角度，下同
                _this.gyroscopeAngle = 360 - event.webkitCompassHeading
              }
            },
            true
          )
        }
      }
    }
  }
}
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: relative;
}

.sideBtns {
  position: absolute;
  right: 25px;
  top: 65px;
  z-index: 1;
}

.sideBtns button {
  margin-bottom: 10px;
}

.sideBtns > div {
  width: 32px;
  height: 32px;
}

.sideBtns .van-button--info {
  color: #FFFFFF !important;
}

.buts {
  position: absolute;
  top: 10px;
  left: 10px;
  /*width: 100%;*/
  /*height: 100%;*/
  z-index: 1;
  /*background: rgba(0, 0, 0, 0.5);*/
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.popContent {
  height: calc(100% - 40px);
  margin: 20px;
}

.chkGroup {
  display: inline-block;
}

.chkGroup .el-checkbox {
  /*color: #fff;*/
  margin-right: 15px;
}

.tools {
  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 1;
}

.myLocation {
  width: 32px;
  height: 32px;
  overflow: hidden;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  line-height: 38px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  -webkit-box-shadow: 1px 2px 1px rgb(0 0 0 / 15%);
  box-shadow: 1px 2px 1px rgb(0 0 0 / 15%);
  border-radius: 36px;
}

.myLocation span {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  display: inline-block;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAA0JJREFUSEudVktoE2EQnv/fpK19gaWHHixIRZPgpUWpehCLClpEqCbpQWstXkRoRZvUi4hRT9ak1epBSw/iE9m0RnzhRVoPgkhpLyWbFEE9iCDW2sZHm+w/zkYT8thtti5skt15fDPfzPwTBsu4XIHIWQDBgh6Hz6wZM6PYPDBdXLqA9ZyJ08iQMcYvwFxiUvatXyxkvySA26+4ALALgDUCw0kUzAIcGSAkgLF6Mn5N31flbttDIyBDAJc/fJ+MJYFFPSPeug+ag1yKWvrDqy0qBCiAX0GvvU0PJA+gyYcl1RWRWQbssOyxPShEgSZ394UPALKhmNW28vlxtpBpkwfgCii/2bxaTfzGzDhP6ezyTVVVVkgfZY+93BBAo4UKGDIbeW4ALr9yEBjsDnrsh1KydAZaQal8rSRsXU7kubruQHhEIL817LWFNFkawOkPjyEUt6cKmmuoFVRS+TbtvSqJsdBJx3u9QFp6p9dYuTooe+070gBan5cvqrP0coWeEUXVAQJuIIdk39MoWOjjmOxx3DTQX/wyby8d9bFEMgPnpegmztXLZLBFL3JrAiLUskXpfJGmA3AhIYFdLxN3QHmjIusc8dresr+9DRvprqH7SdBjO5cJQl11ggm8CJwAMi4CiFF0XblZJP0h7iXZJ5r5cQII+8huA0VYQ4KnueeMIQCKH3RmdOYDkD/G9pCvz+R3PEmRuy/SiEIMBL2OzXoU0bQqNHjFWRQhfk9YoL4gRUkA31QRVkhz1KIlRkVGhOsUcVyT028LW06RkyAB5WWc4xHD9qM2tQpo0nTjHEaN9Pb3R+u4KgbpbNqZbtN/NO0jmtqIJqdeFmbfUaCPhMCh4R7H4ywA7YFG/Q7j+Ezudtwz6zC74yLtgGI7BdmRep932FEEP+dY2aoX3bUzywFx907VIJeiRE1lpl0eQPMA0lQrXxHYUVK+awaEer+dSn+N1dqq5VaWteWMF05AuU2rqyyuWnpCp9a+S1KYs5O1gkpC9CPit0xalswgU+j0R1oIpItaciudQBOUFdeWPs2EShE30PMrFHglVVC9bE0tfdpylqryaIMEeEZb+nQcn5+JrZvQDrNCFJoCSDn5n78tfwC6vIKZYKvxSwAAAABJRU5ErkJggg==);
  background-size: 20px, auto;
}

.info {
  margin: 0 10px;
  padding: 0 5px;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.info_format {
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0;
}
</style>
