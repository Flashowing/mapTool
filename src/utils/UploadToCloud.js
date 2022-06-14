const COS = require('cos-js-sdk-v5')

export function UploadToCloud() {
  this.init.apply(this, arguments)
}
UploadToCloud.prototype = {
  Bucket: '360-1301474191',
  Region: 'ap-chongqing',
  cos: null,
  init() {
    let _this = this;
    _this.cos = new COS({
      SecretId: 'AKIDUlckbBUQGvQrMalIbcV6QSDhU0HMrOYT',
      SecretKey: '3UihRyFG9oIXWgbMsQnjSKya1CpDKDzX',
    });
  },
  upload(filename, fileObject, callback) {
    let _this = this;
    let msg;
    _this.cos.putObject({
      Bucket: _this.Bucket, /* 必须 */
      Region: _this.Region,     /* 存储桶所在地域，必须字段 */
      Key: filename,              /* 必须 */
      StorageClass: 'STANDARD',
      Body: fileObject, // 上传文件对象
      ContentDisposition: "attachment", // 访问改文件时，让浏览器识别为下载
      onProgress: function (progressData) {
      }
    }, function (err, data) {
      msg = err || data
      callback(msg);
    });
  }
}
