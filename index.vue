<template>
  <block>
    <!-- 头部区域-->
    <div class="head-wrapper" id="head_wrapper"></div>

    <!-- 菜单栏-->
    <div class="menu-wrapper">
      <div class="menu" :class="{'fixed':setFixed}">
        <span class="menu-item">菜单栏</span>
      </div>
    </div>

    <!-- 内容区开始  -->
    <scroll-view :scroll-y="setFixed" class="content">
      <ul class="item-wrapper">
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
        <p>内容内容内容内容内容内容内容内容内容内容内容</p>
      </ul>
    </scroll-view>
  </block>
</template>

<script>

export default {
  data() {
    return {
      setFixed: false, // menu吸顶
      scrollY: false,
      headHeight: "" //距离顶部的高度
    };
  },
  onShow() {
    this.$nextTick(() => {  //稍微延迟一下，获取头部部分高度
      this.getOffsetHeight();
    });
  },
  onPageScroll(e) {
    var height = Math.floor(this.headHeight); //高度向下取整
    if (e.scrollTop >= height) {
      if (this.setFixed) {  //当滚动到menu的时候，添加吸顶样式       
        return;  // 已经为true时直接return
      }
      this.setFixed = true;  
    } else {
      this.setFixed = false;
    }
  },
  methods: {
    getOffsetHeight() {
      let self = this;
      this.query = wx.createSelectorQuery();
      this.query
        .select("#head_wrapper")
        .boundingClientRect(res => {
          self.headHeight = res.height;
        })
        .exec();
    }
  }
};
</script>
<style lang="scss" scoped>
.head-wrapper {
  width: 100%;
  height: 180px;
  background-color: aqua;
}
.menu-wrapper {
  color: rgb(0, 0, 0);
  position: relative;
  z-index: 3;
  .menu {
    position: absolute; //未吸顶之前是绝对定位
    left: 0;
    top: 0;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    padding: 0 10px;
    width: 100%;
    z-index: 2;
    background-color: blueviolet;
    text-align: center;
    color: black;
    &.fixed {
      position: fixed;   //吸顶的时候改为fixed布局
    }
  }
}

.content {
  width: 100%;
  height: 100%;
  .item-wrapper {
    min-height: 100vh; 
    padding-top: 50px;
  }
}
</style>