import SliderVerify from './SliderVerify/index.vue';

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component(SliderVerify.name, SliderVerify)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
};