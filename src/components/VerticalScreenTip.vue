<template>
  <div class="hp-wrap" v-show="!isVerticalScreen">
    <img src="../assets/images/phone.png" alt="" class="phone">
    <p class="tip">为了您更好的体验，请使用竖屏操作~</p>
  </div>
</template>

<script>
import { listenOrientation } from 'utils/assist'
export default {
  data () {
    return {
      isVerticalScreen: true
    }
  },
  created () { 
    this.checkScreenDirection()
  },
  methods: {
    checkScreenDirection () {
      listenOrientation(() => {
        this.isVerticalScreen = true
      }, () => {
        this.isVerticalScreen = false
      })
    }
  }
}
</script>