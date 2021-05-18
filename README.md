## Demo演示

> **plugins_v2**：[https://portal.fuyunfeng.top/plugins_v2/index.html](https://portal.fuyunfeng.top/plugins_v2/index.html)  

## 使用

### vue-cli
> vue-cli 中使用

1. 首先安装插件

```shell
# npm 安装：
npm install slider-verify-v2 -S
```

2. `main.js` 中引入

```js
import SliderVerify from 'slider-verify-v2';
import 'slider-verify-v2/lib/SliderVerify.css'
Vue.use(SliderVerify);
```

3. 组件中声明

```vue
<template>
  <div>
    <SliderVerify
      :imgUrl="sliderVConf.imgUrl"
      :sText="sliderVConf.sText"
      :eText="sliderVConf.eText"
      :isShowSelf.sync="sliderVConf.isShowSelf"
      :isBorder="sliderVConf.isBorder"
      :isParentNode="sliderVConf.isParentNode"
      :isCloseBtn="sliderVConf.isCloseBtn"
      :isReloadBtn="sliderVConf.isReloadBtn"
      :width="sliderVConf.width"
      :height="sliderVConf.height"
    ></SliderVerify>
  </div>
</template>
```

### script标签
> 实际使用建议**下载到本地或服务器**

- **引入样式：** [https://portal.fuyunfeng.top/files/plugins/v2/SliderVerify/SliderVerify.css](https://portal.fuyunfeng.top/files/plugins/v2/SliderVerify/SliderVerify.css)

- **引入JS：** [https://portal.fuyunfeng.top/files/plugins/v2/SliderVerify/SliderVerify.umd.js](https://portal.fuyunfeng.top/files/plugins/v2/SliderVerify/SliderVerify.umd.js)


```html
<meta charset="utf-8">
<title>SliderVerify demo</title>
<link rel="stylesheet" href="./SliderVerify.css">
<body>
  <div id="app">
    <slider-verify :is-show-self="isShowSelf"></slider-verify>
  </div>
</body>
<script src="./vue.min.js"></script>
<script src="./SliderVerify.umd.js"></script>

<script>
  new Vue({
    data() {
      return {
        isShowSelf: true
      }
    }
  }).$mount('#app')
</script>
```

## 参考链接

- [https://juejin.cn/post/6844903940262199303](https://juejin.cn/post/6844903940262199303)
- [https://www.jb51.net/article/137129.htm](https://www.jb51.net/article/137129.htm)


