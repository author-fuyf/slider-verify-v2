<template>
  <transition name="fade">
    <div class="uco-toast" v-if="isShow">
      <span :class="iconStyle"></span>
      <span>{{ msg }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      type: "success",
      msg: "成功",
      duration: 1,
    };
  },
  computed: {
    iconStyle() {
      return `tfont icon-${this.type} toast-icon`;
    },
  },
  mounted() {
    console.log('mounted', this)
    this.isShow = true;
    setTimeout(() => {
      this.isShow = false;
    }, this.duration * 1000);
  },
};
</script>

<style lang="less" scoped></style>
