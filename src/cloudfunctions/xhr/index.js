// 云函数模板
// 部署：在 cloud-functions/index 文件夹右击选择 “上传并部署”

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含
 * - 小程序端调用传入的 data
 * - 经过微信鉴权直接可信的用户唯一标识 openid 
 * 
 */
var request = require('request-promise');

exports.main = (event, context) => {
  	// 可执行其他自定义逻辑
  	// console.log 的内容可以在云开发云函数调用日志查看
  	const option = event.option

  	return request(option)
}