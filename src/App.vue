<template>
  <div id="app">
    <weixin-env-tip v-if="requireWeixin"></weixin-env-tip>
    <vertical-screen-tip></vertical-screen-tip>
    <router-view />
  </div>
</template>

<script>
import helper from 'utils/helper'
import wxShare from 'mixins/wx-share'
import WeixinEnvTip from 'components/WeixinEnvTip'
import VerticalScreenTip from 'components/VerticalScreenTip'

export default {
  name: 'app',
  mixins: [wxShare],
  components: { VerticalScreenTip, WeixinEnvTip },
  data() {
    return {
      requireWeixin: process.env.NODE_ENV !== 'development'
    }
  },
  created() {
    window.router = this.$router
  },
  mounted() {},
  watch: {
    $route({ meta }) {
      helper.title(meta.title)
    }
  }
}
</script>
