<template>
  <div class="page">
    <div class="home-view">
      <logo class="home-logo"></logo>
      <div class="home-title"><img class="img" src="./images/panda-title.png" alt="" /></div>
      <div class="home-circle">
        <div class="circel-item out1"></div>
        <div class="circel-item out2"></div>
        <div class="circel-item inner1"></div>
        <div class="circel-item inner2"></div>
        <tap-me class="tap-coin"></tap-me>
      </div>
      <div class="home-desc"><img class="img" src="./images/panda-desc.png" alt="" /></div>
      <div class="home-btn"><img class="img" src="./images/icon-btn.png" alt="" /></div>
    </div>
  </div>
</template>

<script>
import Logo from 'components/Logo'
import TapMe from 'components/TapMe'
export default {
  name: 'Home',
  components: { Logo, TapMe },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.home-view {
  .home-logo {
    margin: 54px auto 64px auto;
  }
  .home-title {
    width: 716px;
    height: 100px;
    margin: 0 auto;
  }
  .home-circle {
    width: 1117px;
    height: 1117px;
    margin: 172px auto 185px auto;
    position: relative;
    .tap-coin {
      position: absolute;
      left: 80px;
      bottom: -10px;
      z-index: 10;
    }
    .circel-item {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .out1 {
      width: 1117px;
      height: 1117px;
      background: url(./images/circle-cherish-animal.png) center center / 100% auto no-repeat;
    }
    .out2 {
      width: 961px;
      height: 961px;
      background: url(./images/circle-botany.png) center center / 100% auto no-repeat;
    }
    .inner1 {
      width: 793px;
      height: 793px;
      background: url(./images/circle-miracle-animal.png) center center / 100% auto no-repeat;
    }
    .inner2 {
      width: 641px;
      height: 641px;
      background: url(./images/panda-coin.png) center center / 100% auto no-repeat;
    }
  }
  .home-desc {
    width: 682px;
    height: 84px;
    margin: 185px auto 108px auto;
  }
  .home-btn {
    width: 473px;
    height: 124px;
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>
