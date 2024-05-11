

const x_PI = 3.14159265358979324 * 3000.0 / 180.0
const PI = 3.1415926535897932384626
const a = 6378245.0
const ee = 0.00669342162296594323


function transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0
    return ret
}
function transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0
    return ret
}
const wgs84togcj02 = (lng, lat) => {
    var dlat = transformlat(lng - 105.0, lat - 35.0)
    var dlng = transformlng(lng - 105.0, lat - 35.0)
    var radlat = lat / 180.0 * PI
    var magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    var sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
    const mglat = lat + dlat
    const mglng = lng + dlng
    return [mglng, mglat]

}
const gcj02tobd09 = (lng, lat) => {
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI)
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI)
    var bd_lng = z * Math.cos(theta) + 0.0065
    var bd_lat = z * Math.sin(theta) + 0.006
    return [bd_lng, bd_lat]
}
const cgcs2000ToBaidu = (lng, lat) => {
    const gcj02 = wgs84togcj02(lng, lat)
    const bd09 = gcj02tobd09(gcj02[0], gcj02[1])
    return {
        lng: bd09[0],
        lat: bd09[1]
    }
}
export default cgcs2000ToBaidu