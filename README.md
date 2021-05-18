> A Vue.js 2.0 UI Toolkit for Web.
## Demo演示

> **plugins_v2**：[https://portal.fuyunfeng.top/plugins_v2/index.html](https://portal.fuyunfeng.top/plugins_v2/index.html)  


<br />














- **在 js / jq 中使用 [lucky-canvas](https://github.com/luckdraw/lucky-canvas)**

- **在 vue 中使用 [vue-luck-draw](https://github.com/luckdraw/vue-luck-draw)**

- **在 react 中使用 [react-luck-draw](https://github.com/luckdraw/react-luck-draw)**

- **在 uni-app 中使用 [uni-luck-draw](https://github.com/luckdraw/uni-luck-draw)**

- **在 taro 中使用 [taro-luck-draw](https://github.com/luckdraw/taro-luck-draw)**

- **在 微信小程序 中使用 [mini-luck-draw](https://github.com/luckdraw/mini-luck-draw)**

<br />

## 在 vue2.x / vue3.x 中使用

### 方式 1：通过 import 引入

1. 首先安装插件

```shell
# npm 安装：
npm install vue-luck-draw

# yarn 安装：
yarn add vue-luck-draw
```

2. 然后找到 `main.js` 引入插件并 `use`

```js
// vue2.x
import LuckDraw from 'vue-luck-draw'
Vue.use(LuckDraw)

// vue3.x
import LuckDraw from 'vue-luck-draw/vue3'
createApp(App).use(LuckDraw).mount('#app')
```

3. 最后在组件内使用 **`<LuckyWheel />`大转盘抽奖** 或 **`<LuckyGrid />`九宫格抽奖**

```vue
<template>
  <div>
    <!-- 大转盘抽奖 -->
    <LuckyWheel
      width="200px"
      height="200px"
      ...你的配置
    />
    <!-- 九宫格抽奖 -->
    <LuckyGrid
      width="200px"
      height="200px"
      ...你的配置
    />
  </div>
</template>
```

<br />

### 方式 2：通过 script 标签引入

> 为了避免 CDN 链接出现异常或波动，我非常建议你**缓存到本地或服务器(✿◡‿◡)**

- **vue2.x：** [https://cdn.jsdelivr.net/npm/vue-luck-draw@3.4/dist/vue-luck-draw.umd.min.js](https://cdn.jsdelivr.net/npm/vue-luck-draw@3.4/dist/vue-luck-draw.umd.min.js)

- **vue3.x：** [https://cdn.jsdelivr.net/npm/vue-luck-draw@3.4/vue3/vue-luck-draw.umd.min.js](https://cdn.jsdelivr.net/npm/vue-luck-draw@3.4/vue3/vue-luck-draw.umd.min.js)


```html
<div id="app">
  <!-- 大转盘抽奖 -->
  <lucky-wheel
    width="200px"
    height="200px"
    ...你的配置
  />
  <!-- 九宫格抽奖 -->
  <lucky-grid
    width="200px"
    height="200px"
    ...你的配置
  />
</div>
<script src="./vue.min.js"></script>
<script src="./vue-luck-draw.umd.min.js"></script>
<script>
  new Vue({
    el: '#app',
    data () {
      return {}
    }
  })
</script>
```

<br />

### **如果您觉得这个项目还不错, 可以在 [Github](https://github.com/LuckDraw/vue-luck-draw) 上面帮我点个`star` ☜(ﾟヮﾟ☜)**


<br />

## 友情链接

- [🎁 h5-Dooring 一款功能强大，高可扩展的H5可视化编辑器](https://github.com/MrXujiang/h5-Dooring)


