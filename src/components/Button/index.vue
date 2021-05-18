<template>
  <span :class="type" style="padding: 5px 10px; border-radius: 5px; background: #41B883; color: white;" :style="type === 'warning' ? 'color: yellow;' : ''" @click="$emit('eclick')">
    <slot>{{ text }}</slot>
  </span>
</template>

<script>
export default {
  name: 'v-button',
  props: {
    type: {
      type: String,
      default: 'error'
    }
  },
  data() {
    return {
      text: '确定'
    };
  },
  computed: {
  },
  mounted() {
  },
};
</script>

<style lang="less" scoped>
</style>
