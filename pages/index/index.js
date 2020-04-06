//index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: null,
    result:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  selectImg: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      success: function(res) {
        console.log('select image success')
        console.log(res)
        that.setData({
          imgUrl: res.tempFilePaths[0],
        });
      },
      fail: function() {
        console.log('select image failed');
      }
    })
  },

  uploadImg: function() {
    var that =this
    wx.showLoading({
      title: '上传中',
    })

    wx.uploadFile({
      url: 'https://proloving.imwork.net/recognition/', //仅为示例
      filePath: that.data.imgUrl,
      name: 'pic',
      success: function (res) {
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: '上传成功',
        })
        if(res.statusCode==200){
          that.setData({
            result: res.data,
          });
        }
      },
      fail:function(res){
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      }
    })
  }

})