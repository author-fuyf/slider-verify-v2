import Vue from 'vue';
import Toast from './index.vue';

// 使用 Vue.extend() 创建 Toast 的构造器
const ToastConstructor = Vue.extend(Toast);

const toast = function(options = {}) {
    // 创建 Toast 实例，通过构造函数传参，
    // 并调用 Vue 实例上的 $mount() 手动挂载
    const toastInstance = new ToastConstructor({
        data: options
    }).$mount();

    // 手动把真实 dom 挂到 html 的 body 上
    document.body.appendChild(toastInstance.$el);

    return toastInstance;
};

// 导出包装好的 toast 方法
export default toast;