// 云函数模板
// 部署：在 cloud-functions/userInfo 文件夹右击选择 “上传并部署”

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含
 * - 小程序端调用传入的 data
 * - 经过微信鉴权直接可信的用户唯一标识 openid 
 * 
 */
const cloud = require('wx-server-sdk')
cloud.init()
// const db = cloud.database()
// const COLLECTION_LOGS = 'logs'

exports.main = (event, context) => {
	// 这里获取到的 openId、 appId 和 unionId 是可信的，注意 unionId 仅在满足 unionId 获取条件时返回
  	let { OPENID, APPID, UNIONID } = cloud.getWXContext()

	return {
		OPENID,
		APPID,
		UNIONID
	}
}
