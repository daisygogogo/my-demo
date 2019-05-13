<template>
  <view style="width:100%;height:100%;z-index:-1;">
    <video
      id="myVideo"
      :src="videoSrc"
      :controls="true"
      :autoplay="true"
      :loop="false"
      :enable-progress-gesture="false"
      :objectFit="cover"
      style="width:100%;height:100%;"
    >
      <cover-view class="download" v-if="imageUrl" @click.stop="downLoad">
        <cover-image class="img" :src="imageUrl + '/service/download.png'"/>
      </cover-view>
    </video>
  </view>
</template>

<script>
import "./index.scss";
// 创建Touch实例
const type = "mp4";
const filePath = wx.env.USER_DATA_PATH;
export default {
  data() {
    return {
      imageUrl: "",
      cover: "cover", //video的objectFit设置
      videoSrc: "", //视频地址
      videoInfo: {}, //video信息，宽高等
      downloading:false, //当前是否在下载中
      timer:null,
    };
  },
  async onLoad(options) {
    console.log(options);
    (this.imageUrl = this.globalData.pageConfig.imageUrl),
    (this.videoSrc = decodeURIComponent(options.url));

    //解决高和宽的问题,横屏和竖屏的问题。
    var height = options.height;
    var width = options.width;
    if (Number(width) > Number(height)) {
      this.cover = "";
    }
  },
  onShow() {
    //     this.videoCtx = wx.createVideoContext("myVideo", self);
    // this.videoCtx.requestFullScreen();
  },
  methods: {
    downLoad() {
      let self = this;
      let videoSrc = self.videoSrc;
      if(this.downloading){
        self.msg("text", "操作太频繁了~");
        return;
      }else{
        this.updateDownloading();
      }
      
      wx.getSetting({
        success: res => {
          let recordAuth = res.authSetting["scope.writePhotosAlbum"];
          if (recordAuth === false) {
            //申请过授权，但用户不同意
            self.openAuth();
          } else if (recordAuth === true) {
            //授权成功
            self.saveVideoToAlbum();
          } else {
            //从未授权
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success: () => {
                //授权成功
                // self.saveVideoToAlbum();
              },
              fail: () => {
                //授权失败
                self.msg("text", "授权失败，请重试");
              }
            });
          }
        }
      });
    },
    openAuth() {
      let self = this;
      console.log('授权过但是用户不同意')
      wx.openSetting({
        success: function(res) {
          let recordAuth = res.authSetting["scope.writePhotosAlbum"];
          if (recordAuth == true) {
            // self.saveVideoToAlbum();
          }
        }
      });
    },
    saveVideoToAlbum() {
      let self = this; //先调用下载接口，再保存到相册
      let videoSrc = self.videoSrc;
      this.removeLocalFile().then(() => {
        wx.downloadFile({
          url: videoSrc,
          filePath: `${filePath}/file.${type}`, //指定下载路径和文件后缀，防止非mp4格式的视频无法保存
          success(res) {
            wx.saveVideoToPhotosAlbum({
              filePath: res.filePath,
              success(res) {
                self.msg("text", "保存成功");
              },
              fail(res) {
                self.msg("text", "保存失败");
                console.log(res);
              }
            });
          },
          complete(res) {
            console.log("complete", res);
          }
        });
      });
    },
    removeLocalFile() {
      return new Promise((resolve, reject) => {
        var fileMgr = wx.getFileSystemManager();
        fileMgr.readdir({
          dirPath: filePath,
          success(res) {
            let files = res.files;
            if (files && files.length > 0) {
              files.forEach(item => {
                if(item.indexOf('miniprogram') == -1){
                  fileMgr.unlinkSync(filePath + '/' + item);
                }
              });
            }
            resolve();
          },
          fail() {
            reject();
          }
        });
      });
    },
    updateDownloading(){
      this.downloading = true;
      this.timer = setTimeout(() =>{
        this.downloading = false;
      },3000)
    }
  },
  onUnload() {
    this.cover = "cover";
    clearTimeout(this.timer);
  }
};
</script>