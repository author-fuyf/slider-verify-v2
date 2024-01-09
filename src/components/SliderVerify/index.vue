<template>
  <div id="plugin-slider-verify_containe">
    <!-- <div style="display: none">
      <img ref="bgImgRef" crossOrigin :src="imgUrl" v-if="imgUrl" />
      <img ref="bgImgRef" :src="require(`./images/bg${bgRandom}.jpg`)" v-else />
    </div> -->
    <div
      id="slider-verify"
      :class="{ 'is-border': isBorder }"
      v-show="isShowSelf"
    >
      <div
        id="verify_containe"
        :class="{'is-opt': isCloseBtn || isReloadBtn}"
      >
        <div id="canvas_containe">
          <div
            class="loading"
            :style="{'width': `${width}px`, 'height': `${height}px`}"
            v-if="loading"
          >
            <loading
              type="circular"
              vertical
            >
              <span>加载中...</span>
            </loading>
          </div>
          <canvas
            id="bg_canvas"
            v-show="!loading"
          ></canvas>
          <canvas
            v-show="!loading"
            id="block_canvas"
            @mousedown.prevent="(e) => drag(e, 'block_canvas', 'circle')"
            @touchstart.prevent="
              (e) => {
                terminal = 'mobile'
                drag(e, 'block_canvas', 'circle')
              }
            "
            @click="e => {
              terminal = setTerminal()
              drag(e, 'block_canvas', 'circle', true)
            }"
          ></canvas>
        </div>
        <div class="slide-box">
          <div
            id="circle"
            @mousedown.prevent="(e) => drag(e, 'circle', 'block_canvas')"
            @touchstart.prevent="
              (e) => {
                terminal = 'mobile'
                drag(e, 'circle', 'block_canvas')
              }
            "
            @click="e => {
              terminal = setTerminal()
              drag(e, 'circle', 'block_canvas', true)
            }"
          >
            <div
              class="verticals"
              v-show="!isTouch"
            >
              <img
                src="./images/vertical_line.png"
                alt=""
              />
              <img
                src="./images/vertical_line.png"
                alt=""
              />
              <img
                src="./images/vertical_line.png"
                alt=""
              />
            </div>
            <div
              class="arrow"
              v-show="isTouch"
            >
              <img
                src="./images/arrow_left.png"
                alt=""
              />
              <img
                src="./images/circle.png"
                class="circle"
                alt=""
              />
              <img
                src="./images/arrow_right.png"
                alt=""
              />
            </div>
          </div>
          <span id="placehold">拖动滑块完成拼图</span>
        </div>

        <div
          class="operational"
          v-if="isCloseBtn || isReloadBtn"
        >
          <img
            src="./images/close.png"
            alt=""
            @click="close"
            v-if="isCloseBtn"
          />
          <img
            src="./images/reload.png"
            alt=""
            @click="initCanvas(); $emit('reload')"
            v-if="isReloadBtn"
          />
        </div>
      </div>
    </div>
    <popup
      v-model="popupShow"
      position="bottom"
      :overlay="false"
      :get-container="getContainer"
      class="result-popup"
      :class="{ 'popup-success': verifyResult }"
    >
      {{ verifyResult ? sText : eText }}
    </popup>
  </div>
</template>
<script>
import { Popup, Loading, Toast } from 'vant';

const l = 42 // 滑块边长
const r = 9 // 滑块圆半径
const PI = Math.PI
const L = l + r * 2 + 3 // 滑块实际边长

const Y = 70 // 滑块Y轴距离

export default {
  name: 'SliderVerify',
  data() {
    return {
      popupShow: false,
      verifyResult: '',
      terminal: 'pc',
      blkTilesW: null,
      bgWidth: null,
      isTouch: false,
      bgRandom: 0,
      loading: false,
      isLoad: false
    }
  },
  props: {
    isShowSelf: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 180
    },
    isBorder: {
      type: Boolean,
      default: true
    },
    imgUrl: {
      type: String,
      default: ''
    },
    sText: {
      type: String,
      default: '验证通过'
    },
    eText: {
      type: String,
      default: '请正确拼合图像'
    },
    isShowTip: {
      type: Boolean,
      default: true
    },
    isCloseBtn: {
      type: Boolean,
      default: true
    },
    isReloadBtn: {
      type: Boolean,
      default: true
    },
    isParentNode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    repaint() {
      const width = this.width
      const height = this.height
      const isBorder = this.isBorder
      const imgUrl = this.imgUrl
      const isParentNode = this.isParentNode
      return {
        width,
        height,
        isBorder,
        imgUrl,
        isParentNode
      }
    }
  },
  watch: {
    isShowSelf(newVal) {
      if (newVal) {
        return this.$emit('show')
      }
      this.$emit('hide')
    },
    repaint() {
      this.initCanvas()
    }
  },
  components: {
    Popup,
    Loading
  },
  mounted() {
    console.log('SliderVerify init')
    this.initCanvas()
  },
  methods: {
    isMobile() {
      return navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
    },
    setTerminal() {
      return this.isMobile() ? 'mobile' : 'pc'
    },
    handlerClick() {
      console.log('handlerClick')
    },
    close() {
      this.$emit('update:isShowSelf', false)
      this.$emit('close')
    },
    getContainer() {
      return document.getElementById("canvas_containe");
    },
    initCanvas() {
      if (this.isLoad) return

      this.isLoad = true
      this.loading = true

      const bg_canvas = document.getElementById("bg_canvas")
      const bg_ctx = bg_canvas.getContext('2d')

      const block_canvas = document.getElementById("block_canvas")
      const block_ctx = block_canvas.getContext('2d')

      const placehold = document.getElementById("placehold")
      placehold.style.opacity = 1


      const random = (max, min) => {
        // return Math.floor(Math.random() * (max - min) + min)
        return Math.floor(Math.random() * (min - max) + max)
      }

      // const img = this.$refs.bgImgRef
      // img.src = require(`./images/bg${bgRandom}.jpg`)
      const bgRandom = random(3, 0)
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = this.imgUrl ? this.imgUrl : `https://portal.fuyunfeng.top/files/images/SliderVerify-${bgRandom}.jpg`
      img.onerror = () => {
        Toast({
          message: '图片加载失败',
          position: 'top'
        })
        img.src = 'https://portal.fuyunfeng.top/files/images/SliderVerify-error.png'
      }

      /**
       * 默认width
       * isParentNode 父级宽度100%
       * -20 为两边10px的padding
       * -2  默认border线框时
       * 
       */
      let width = this.width

      if (this.isParentNode) {
        const sliderVerify = document.getElementById("plugin-slider-verify_containe")
        // const s_verify_width = sliderVerify.parentNode.clientWidth
        const s_verify_width = sliderVerify.parentNode.getBoundingClientRect().width
        // sliderVerify.style.width = s_verify_width

        width = s_verify_width - 20
        if (this.isBorder) {
          width = width - 2
        }
      }

      const height = this.height

      /**
       * 滑块随机受控图形区间内 x轴
       * L + 10 滑块边长 + 10px间隙
       */
      this.bgWidth = width
      const blkTilesW = random(L + 10, width - (L + 10))
      this.blkTilesW = blkTilesW

      bg_canvas.width = width
      bg_canvas.height = height
      block_canvas.width = width
      block_canvas.height = height

      img.onload = () => {
        this.loading = false
        // console.log('onload')

        this.draw(bg_ctx, { x: blkTilesW, y: Y, r: r }, 'fill')
        this.draw(block_ctx, { x: blkTilesW, y: Y, r: r }, 'clip')

        bg_ctx.drawImage(img, 0, 0, width, height)
        block_ctx.drawImage(img, 0, 0, width, height)

        // 提取滑块放至左侧 并重置滑块画布宽度
        const y = Y - r * 2 - 1
        const ImageData = block_ctx.getImageData(blkTilesW - 3, y, L, L)
        block_canvas.width = L
        // 滑块画布高度重置 避免整个画布都可被拖拽
        block_canvas.height = Y
        block_canvas.style.top = `${Y - r * 2}px`
        block_ctx.putImageData(ImageData, 0, 0)

        this.isLoad = false
      }
    },
    drag(event, targetId, linkageId, isClick = false) {
      // console.log("clickE => ", event);

      this.isTouch = true
      const targetDom = document.querySelector(`#${targetId}`);
      const linkageDom = document.querySelector(`#${linkageId}`);
      const placehold = document.querySelector("#placehold");
      const terminal = this.terminal

      let x = 0;
      const move = moveEV => {
        // console.log("moveE => ", moveEV);
        if (terminal === 'pc') {
          x = moveEV.x - event.x
        } else {
          // click事件触发changedTouches可能丢失
          x = moveEV.changedTouches[0].clientX - (event.changedTouches ? event.changedTouches[0].clientX : event.clientX)
        }

        /**
         * 滑块拖动限定
         * 
         */
        if (x < 8) {
          placehold.style.opacity = 1
        }
        if (x >= (this.bgWidth - L) || x <= -2) return false
        targetDom.style.left = x + 'px';
        linkageDom.style.left = x + "px";
        placehold.style.opacity = 0
      };

      const up = (isVerify = true) => {
        this.isTouch = false
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);

        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", up);

        if (isVerify) {
          // 图块契合度 左右5 偏差
          const intervalMax = this.blkTilesW + 5
          const intervalMin = this.blkTilesW - 5
          if (x >= intervalMin && x <= intervalMax) {
            this.verifyResult = true
            this.$emit('success')
          } else {
            this.verifyResult = false
            this.$emit('fail')
          }

          if (this.isShowTip) this.popupShow = true
          setTimeout(() => {
            this.popupShow = false
          }, 500)
        }

        targetDom.style.left = 0
        linkageDom.style.left = 0
        this.initCanvas()
      };

      if (terminal === 'pc') {
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
      } else {
        document.addEventListener("touchmove", move);
        document.addEventListener("touchend", up);
      }

      if (isClick) up(false)
    },
    draw(ctx, xy, type) {
      const x = xy.x, y = xy.y;
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
      ctx.lineTo(x + l, y)
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
      ctx.lineTo(x + l, y + l)
      ctx.lineTo(x, y + l)
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
      ctx.lineTo(x, y)
      ctx.lineWidth = 1
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.stroke()
      ctx.globalCompositeOperation = 'destination-over'
      type === 'fill' ? ctx.fill() : ctx.clip()
    }
  }
}
</script>
<style scoped lang="stylus">
::v-deep .van-overlay {
  position: absolute;
}

::v-deep .van-popup {
  position: absolute;
}

.result-popup {
  height: 30px;
  line-height: 30px;
  color: white;
  background: #DE715B;
  text-align: center;
}

.popup-success {
  background: #41B883;
}

.is-border {
  border: 1px solid rgb(199, 198, 198);
}

#slider-verify {
  width: auto;
  height: auto;
  display: inline-block;
  // margin: 20px auto 0;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;

  .is-opt {
    padding-bottom: 45px;
  }

  #verify_containe {
    position: relative;

    #canvas_containe {
      position: relative;
      line-height: 0;

      #block_canvas {
        position: absolute;
        left: 0;
        cursor: pointer;
      }

      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .slide-box {
      width: 100%;
      height: 40px;
      margin-top: 15px;
      border-radius: 20px;
      background: #DFE0E1;
      position: relative;
      color: #A3ABB3;
      display: flex;
      align-items: center;
      justify-content: center;

      #circle {
        width: 50px;
        height: 50px;
        top: -8px;
        left: 0;
        border-radius: 50px;
        position: absolute;
        background: white;
        border: 1px solid #D0D0D0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        .verticals {
          display: flex;
          align-items: center;

          img {
            width: 8px;
            height: 16px;
          }
        }

        .arrow {
          display: flex;
          align-items: center;

          img {
            width: 13px;
            height: 16px;
          }

          img.circle {
            width: 13px;
            height: 13px;
          }
        }
      }

      #placehold {
        transition: opacity 0.3s;
        user-select: none;
      }
    }

    .operational {
      position: absolute;
      width: 100%;
      height: 32px;
      left: -10px;
      bottom: 0;
      border-top: 1px solid #EAE8E8;
      padding: 0 10px;
      display: flex;
      align-items: flex-end;

      img:first-child {
        margin-left: 0;
      }

      img {
        width: 22px;
        height: 22px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>