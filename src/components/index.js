import toast from './Toast/index';
import Button from './Button/index.vue';
import SliderVerify from './SliderVerify/index.vue';

// 准备好 install 方法 给 Vue.use() 使用
const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;

  // 将包装好的 toast 挂到Vue的原型上，作为 Vue 实例上的方法
  // Vue.prototype.$toast = toast;
  // Vue.prototype.$test = 'tets';

  // Vue.component(Button.name, Button)
  Vue.component(SliderVerify.name, SliderVerify)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 默认导出 install
export default {
  install,
};