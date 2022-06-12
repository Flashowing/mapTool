<template>
  <div id='cesiumContainer'>
    <div class='tools'>
      <div class='myLocation'>
        <span class='normal'></span>
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

export default {
  name: 'coordLocation',
  data: function() {
    return {
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
      }
    }
  },
  mounted: function() {
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
      scene3DOnly: true // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      // terrainProvider: Cesium.createWorldTerrain(),
      // imageryProvider: new Cesium.TileMapServiceImageryProvider({
      //   url: 'http://183.230.114.154:9010/map/staticResources/Cesium-1.85/Build/Cesium/Assets/Textures/NaturalEarthII/'
      // })
    })
    window._viewer = viewer
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

    // var token = 'c6a366fc893103a30164aef8a5a298f7'
    // // 服务域名
    // var tdtUrl = '//t{s}.tianditu.gov.cn/'
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
    // var TDT_CVA_W = '//{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0' + '&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' + '&style=default.jpg&tk=' + token
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
    //   url: '//t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' + token,
    //   subdomains: subdomains,
    //   layer: 'tdtCiaLayer',
    //   style: 'default',
    //   format: 'image/jpeg',
    //   tileMatrixSetID: 'GoogleMapsCompatible',
    //   show: true
    // }))

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
            image: 'data:image/png;base64,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',
            eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, 0)),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //绝对贴地
            clampToGround: true,
            disableDepthTestDistance: Number.POSITIVE_INFINITY //元素在正上方
          }
        })
        if (callback) callback(position)
        const KEY = 'IOBBZ-5JNYS-4XZOL-66OLK-XAQ7T-JHFBU'
        let url = 'https://apis.map.qq.com/ws/geocoder/v1/'
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

    getLocation()

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
      // getLocation()
    }, 3000)

    fetch('./data/cityinfo_eight_parts.json').then(response => response.json()).then(data => {
      for (const dataKey in data) {
        data[dataKey].forEach(feature => {
          if (feature['lnglat']) {
            let cords = feature['lnglat'].split(',').map(item => {
              let coord = parseFloat(item.trim())
              // console.log(coord)
              return coord
            })
            if (cords && cords.length != 2) {
              console.log(feature[name])
              return
            }
            let gcj02towgs = gcj02towgs84(cords[0], cords[1])
            let pointEntity = viewer.entities.add({
              show: false,
              name: feature['name'],
              position: Cesium.Cartesian3.fromDegrees(gcj02towgs[0], gcj02towgs[1]),
              description: `<table>
<tr><td>序号</td><td>${feature['序号']}</td></tr>
<tr><td>管理单位</td><td>${feature['管理单位']}</td></tr>
<tr><td>点位名称</td><td>${feature['name']}</td></tr>
<tr><td>详细地址</td><td>${feature['详细地址']}</td></tr>
<tr><td>经纬度坐标</td><td>${feature['lnglat']}</td></tr>
</table>`,
              label: {
                text: feature['name'],
                font: '14pt sans-serif', // 字体样式
                pixelOffset: new Cesium.Cartesian2(0, -20),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //	一个属性，指定高度相对于什么
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 水平原点
                verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 垂直原点
                fillColor: Cesium.Color.WHITE, // 指定填充的属性Color
                backgroundColor: new Cesium.Color(1, 1, 1, 0.7), // 指定背景的属性Color
                backgroundPadding: new Cesium.Cartesian2(8, 4), // Cartesian2以像素为单位指定水平和垂直背景填充的属性
                disableDepthTestDistance: Number.POSITIVE_INFINITY // 元素在正上方
              }
              // billboard: {
              //   image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABOZJREFUaEPtmGWodUUUhp8PC8HGwG7UH4od2IqFLaIoKgYodheC8UNRVOxWEAMFUbHAwMZusAMFOzFQBBHl+VgD821m79n73HuUC3f9ORz2zJp5V75rZjDFZcYUvz/TAP5vD47TAwcCGwGHjRPkOAH8ExffEnhqXCD6AFgSuBzYOC7xDLBXjwsNAbAFcC6wBvAtcDdwao8zqkm8FPB5QdEPwCKVA/oCOAS4saDrM2D5GoiaB87PLHEx8Btwdii9ADit44C+AJ4FNgk95stOwM7x398Hu0DUANwfyq4GjgxFb4WrHwB2mQQAvwLzRljeFfo+BZYDTgI0XKvUAFwBHAXozm2AOYFHAfPiSuDoSQDwBrAmcDNwIrAy8GLo3Qe4cyIAvLQXLkmtuvQNoVMAw7EpH0RomW8je8CNWuWihoYNgZcmKYlVcx1waKbvq+gfnfHv+loIJZ3bAqsAWvXDDq/kmPp6wD2W0U0jNC0U7wFPA59UjFQEYGKeCaxT2xzfTeYjgC8a6/sCeBlYr+WsvHgUl5Q8cFVcqOf9Zy6zsaUKkvb1AXBWVpZL530f1eiPtsuUANwO7Au8AjxUQZF6giVWaw0NISvM3sC90e3z/U/Gn3WB14YAOCdC6GdgwQ4AduLv4nupIvXxQOopFomTs7OWBj6Osr0/cNsQAG64JTZ0JbmJl6y0OPDNQA/YvH4E5gAOB65t7H8XWA04DzhjCADbuu1dWamjEpi45otxumjhgJoHLMUvxD6r3GMNHRYHaYXhtccQADmB2w24r2VzSnapsiHUlBqAg4GbojQvFobIdVwKHAu8H54oXqMtRBI/kayVuqTKDB/DqK3U1QBcGFzHWJc+NEWaIo1XFgB+KSFoA/A6sBYgFzqmxQMmsImsldJB+dIaALvsjsAjwPaFM/IccxZ5fggAa/qeHfEnU5QxKjsAD48QQnbZFTo8OBfwZ+iVZtwwBEByr11yg8JGk07LKW2J3uUBy/NPsb/UQ9KRsuBlgcuA44YAkEIbPl8CJnVT0ve2CuT6LgB5pZOyGLIleRzYKrjXdkMAWL4sYzV5Lpummmu7ADh5pbrf1WtSpXOsXWYIANe+2oPQlRpQOqcLgElvlfkaWKLDSvsBt8b3haPxzbK8RqfvAXYH3g5Abva9RzkBuKTj8C4AKTTaekhSu2JQCv9vDvgiMghAYoupmcwO/BUaJHx3jAhA2mHz8tHg9EqcJkPY+a8ZCqCZzPIXm5yyK+DQ3yZtHshJYE2HulO/MR+8zyAPJGLnlDRfcB4fnpStgSdGAJA3qIrxZ/lcDLdaDvguk6zsWmuytVmpzcVdOdCnQDTBHRQvF4M8sFnMpm7S9VYC51Vl9UjuoSGU1usJxUZpLihvxq/PLIpUw2nsnQLZm7mg5gHfKh06lFWBuQHfcRRpQKITJRA1LpT2CCC9AxmmDlTHA38DFo1OqQHIQ8aDZstIlVUkTWQTASAV+SgUGJZSC3PPpxUf0CYEYH7A0VJJ82/6nQf4vUN7Xw8slDWo9AxveOnptScKwP1aRyvl0sbh8zV9AbSd4UBjKE3IA26WFx2QPadL4JyZa69mQwBIydfPbirFuL52eb/XcqCPjrY1QwCMfM40gElI4pGtPx1CFdP5auHs7PTlZDcWGWcOjOXCTaXTAP4TM3ccMuU98C+QkytAkhCa+gAAAABJRU5ErkJggg==',
              //   eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, 0)),
              //   heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //绝对贴地
              //   clampToGround: true,
              //   disableDepthTestDistance: Number.POSITIVE_INFINITY //元素在正上方
              // }
            })
            _this.datas[feature.type].push(pointEntity)
          }
          // let coordinates = feature.geometry.coordinates[0];
          // let c = coordinates.map(item => {
          //   return Cesium.Cartesian3.fromDegrees(item[0], item[1], 125);
          // });
        })
      }
    })
    console.log(_this.datas)
  }
}
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: relative;
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
  line-height: 30px;
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
