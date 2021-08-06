<template>
  <div class="no-weixin-wrap" v-if="!isWeixin">
    <img src="../assets/images/icon-warning-blue.png" alt="" class="icon-warning">
    <p class="tip">请使用微信客户端打开</p>
  </div>
</template>

<script>
import wxapi from 'utils/wxapi'

export default {
  data () {
    return {
      isWeixin: true
    }
  },
  created () {
    this.checkIsWeixin()
  },
  methods: {
    checkIsWeixin () {
      this.isWeixin = wxapi.checkIsWeixin()
    }
  }
}
</script>