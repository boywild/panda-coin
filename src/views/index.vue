<template>
  <div class="page">home</div>
</template>

<script>
// import loading from 'utils/loading'
// import { getPageQueryObject } from 'utils/assist'
export default {
  name: 'Index',
  data() {
    return {
      loading: null
      // proUrl: process.env.PRO_BASE_URL,
      // appId: process.env.APP_ID
    }
  },
  computed: {},
  created() {
    // this.loading = loading.show({ type: 'loader' })
    // const { groupId = '' } = this.$route.query
    // let url = `${this.proUrl}middle`
    // if (groupId) {
    //   // 组团助力分享
    //   url = `${this.proUrl}middle?groupId=${groupId}`
    // }
    // const encodeUrl = window.encodeURIComponent(url)
    // const wxUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${encodeUrl}&groupId=${groupId}&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`
    // window.location.replace(wxUrl)
  },
  mounted() {},
  beforeDestroy() {
    // loading.hide(this.loading)
  },
  methods: {},
  components: {}
}
</script>
