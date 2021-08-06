<template>
  <div :class="setClass"><img class="img" src="./images/logo.png" alt="" /></div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    size: { type: String, default: () => 'big' }
  },
  data() {
    return {}
  },
  computed: {
    setClass() {
      let cn = ['logo']
      if (this.size === 'big') {
        cn.push('big')
      } else if (this.size === 'small') {
        cn.push('small')
      }
      return cn
    }
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.logo {
  &.big {
    width: 747px;
    height: 119px;
  }
  &.small {
    width: 503px;
    height: 94px;
  }
}
</style>
