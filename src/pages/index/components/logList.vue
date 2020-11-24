
<template>
  <div class="logContainer">
    <el-card class="box-card">
      <div class="logArea el-scrollbar">
            <div class="item" v-for="(item,index) in logsData" :key="index">
              <p class="timeArea">
                <span class="title">日期：</span>
                <span class="title time">{{item.createTime}}</span>
              </p>
              <div class="logContent">
                  <p class="title">更新内容：</p>
                  <ul class="logUl">
                    <li v-for="(citem,cindex) in item.data" :key="cindex">{{citem}}</li>
                </ul>
              </div>
          </div>
      </div>

  </el-card>
  </div>
</template>

<script>
  //import logsData from "@/assets/datas/logs.json";
  //import { github } from "@/utils/env";

  export default {
    name:'logList',
    data() {
      return {
        logsData:[
        { "createTime":"2019-08-20","data":["从以下方面对前端性能展开优化：","使用插件TerserPlugin,去除所有的console信息","使用CompressionPlugin,开启gzip压缩","忽略生产环境打包文件,使用外链cdn","图片压缩","路由按需加载","使用optimization.minimize(true):压缩代码和optimization.splitChunks():分割代码"]},
        { "createTime":"2019-08-14","data":["新增中英文切换功能","公共组件footerNav布局优化","顶部用户信息优化","新增回到顶部功能"]},
        { "createTime":"2019-08-10","data":["项目布局更改为左右布局，右侧内容超出窗口可视范围，出现滚动条","项目401页面和404页面重新改版"]},
        { "createTime":"2019-08-05","data":["项目401页面和404页面样式更新","剔除项目easy-mock模拟数据功能","项目登录之后的业务逻辑修改"]},
        { "createTime":"2019-07-10","data":["首页数据导航区域重新改版及ui优化","首页新增项目更新日志列表展示","首页新增访问量和下载量柱状图","首页新增用户投资区域雷达图","首页新增用户价格列表","首页新增用户评论列表","首页新增本项目技术栈progress"]},
        { "createTime":"2019-07-03","data":["新增分享功能组件","分享功能组件包含4组横向排列","完成放简书网站分享组件","完成仿掘金网站分享组件","完成仿新浪分享组件"]},
        { "createTime":"2019-06-22","data":["项目logo的设计和使用","项目添加微信和加入qq群宣传图的设计"]}
      ],
        github:"http://www.baidu.com"
      };
    }
  }
</script>

<style lang="less" scoped>
.logContainer{
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    height:370px;
    max-height: 370px;
    overflow: hidden;
    border-radius: 6px;
    .logArea{
       overflow: auto;
       height: 100%;
    }
    .item{
       .title{
         font-size: 13px;
       }
       .time{
         color:#87DE75;
       }
        .logContent{
          .logUl{
            padding-left: 30px;
            li{
              font-size: 12px;
              list-style: disc;
              line-height: 20px;
            }
          }
      }
    }
}
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
