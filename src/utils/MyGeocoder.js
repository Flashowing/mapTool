import { bd09togcj02, gcj02towgs84 } from './transformCoordinate'

export function MyGeocoder() {
}

MyGeocoder.prototype.geocode = function(input) {
  var endpoint = 'http://localhost:8080/api/map/bd/geocoding/v2/suggestion'
  var resource = new Cesium.Resource({
    url: endpoint,
    queryParameters: {
      format: 'json',
      query: input,
      region: '重庆',
      city_limit: true,
      output: 'json',
      ak: 'lQjhCHE3WwuP4dme9G2MGEqbYKdatgyl'
    }
  })

  return resource.fetchJson()
    .then(function(results) {
      if (!results) {
        return null
      }
      if (!results.data) {
        return null
      }
      if (!results.data.result) {
        return null
      }
      return results.data.result.map(function(resultObject) {
        var lon = resultObject.location.lng
        var lat = resultObject.location.lat
        let a = bd09togcj02(lon, lat);
        let coord = gcj02towgs84(a[0], a[1]);
        var destination = Cesium.Cartesian3.fromDegrees(coord[0], coord[1])
        return {
          displayName: resultObject.name,
          destination: destination
        }
      })
    })
}
