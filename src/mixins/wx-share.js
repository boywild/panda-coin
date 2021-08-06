import wxapi from 'utils/wxapi'
import helper from 'utils/helper'

export default {
  data() {
    return {}
  },
  methods: {
    async wxCustomShare({ link = window.location.href, title, desc, imgUrl }) {
      // if (!title || !desc || !imgUrl) { throw new Error('请设置微信分享的标题title、描述desc和图片imgUrl') }
      let res = await this.$Weixin.getJsapiSignature()
      let { appid, timestamp, noncestr, signature } = res.data
      try {
        await wxapi.checkJsApi()
        try {
          await wxapi.config({
            appId: appid,
            timestamp,
            nonceStr: noncestr,
            signature
          })
          wxapi.updateAppMessageShareData({ title, desc, link, imgUrl })
          wxapi.updateTimelineShareData({ title, link, imgUrl })
        } catch (e) {
          helper.toast('微信分享配置失败')
        }
      } catch (e) {
        helper.toast('请升级微信客户端后分享')
      }
      return res
    },
    shareConfig() {
      this.wxCustomShare({
        link: process.env.PRO_BASE_URL,
        title: '夺旗争星突围战第二季',
        desc: '公私联动，批量引流。零售业务批发做，客户经营一盘棋。',
        imgUrl:
          'https://mmbiz.qpic.cn/mmbiz_png/KQTIzYeVrThDfULV1gd558tiae1heOLhpuBsqKevJHOyGLMiciaWL4jeN6JSMvSroia6THaoHqenmpI4wsqzicrEWQQ/0?wx_fmt=png'
      })
    }
  }
}
