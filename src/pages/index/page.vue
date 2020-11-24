<template>
  <d2-container better-scroll>
    <section class="data_section" ref="data_section">
      <el-row :gutter="10" class="row_list">
        <el-col :span="8">
          <div class="row_left row_base">
            <el-col :span="12">
              <router-link :to="{ path: '/usr/page1' }">
                <div class="pay saleBgcolor data_list rflex">
                  <div class="leftItem cflex wflex">
                    <p class="investor">待办任务</p>
                    <p class="number">68<span class="perTitle">(条)</span></p>
                  </div>
                  <div class="rightItem">
                    <d2-icon-svg class="svg-icon" name="book" />
                  </div>
                </div>
              </router-link>
            </el-col>
            <el-col :span="12">
              <div class="pay taxBgcolor data_list rflex">
                <div class="leftItem cflex wflex">
                  <p class="investor">紧急待办</p>
                  <p class="number">11<span class="perTitle">(条)</span></p>
                </div>
                <div class="rightItem">
                  <d2-icon-svg class="svg-icon" name="editer" />
                </div>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="row_right row_base">
            <el-col :span="6">
              <div class="extenedBgcolor data_list rflex">
                <div class="leftItem cflex wflex">
                  <p class="investor">我的会议</p>
                  <p class="number">6<span class="perTitle">(个)</span></p>
                </div>
                <div class="rightItem">
                  <d2-icon-svg class="svg-icon" name="pick" />
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="likeBgcolor data_list rflex">
                <div class="leftItem cflex wflex">
                  <p class="investor">其它待办</p>
                  <p class="number">1276<span class="perTitle">(个)</span></p>
                </div>
                <div class="rightItem">
                  <d2-icon-svg class="svg-icon" name="shuqian" />
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="linkBgColor data_list rflex">
                <div class="leftItem cflex wflex">
                  <p class="investor">其它待办</p>
                  <p class="number">82367<span class="perTitle">(个)</span></p>
                </div>
                <div class="rightItem">
                  <d2-icon-svg class="svg-icon" name="cader" />
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="keleBgColor data_list rflex">
                <div class="leftItem cflex wflex">
                  <p class="investor">其它待办</p>
                  <p class="number">827373<span class="perTitle">(个)</span></p>
                </div>
                <div class="rightItem">
                  <d2-icon-svg class="svg-icon" name="editer" />
                </div>
              </div>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="row_list order_list">
        <el-col :span="7">
          <comment-list></comment-list>
        </el-col>
        <el-col :span="17">
          <ve-histogram
            class="ve-chat"
            :data="chartData"
            :settings="chartSettings"
          ></ve-histogram>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="row_list order_list">
        <el-col :span="7">
          <log-list></log-list>
        </el-col>
        <el-col :span="17">
          <ve-histogram
            class="ve-chat"
            :data="chartData"
            :settings="chartSettings"
          ></ve-histogram>
        </el-col>
      </el-row>
    </section>
  </d2-container>
</template>

<script>
import logList from "./components/logList"; // 日志列表
import commentList from "./components/commentList"; // 用户评论列表
import util from "@/libs/util.js";
export default {
  components: {
    logList,
    commentList,
  },
  data() {
    this.chartSettings = {
      metrics: ["签约", "回款", "认购"],
      dimension: ["日期"],
    };
    return {
      chartData: {
        columns: ["日期", "签约", "回款", "认购"],
        rows: [
          { 日期: "1/1", 签约: 1393, 回款: 1093, 认购: 1132 },
          { 日期: "1/2", 签约: 3530, 回款: 3230, 认购: 1126 },
          { 日期: "1/3", 签约: 2923, 回款: 2623, 认购: 1176 },
          { 日期: "1/4", 签约: 1723, 回款: 1423, 认购: 1149 },
          { 日期: "1/5", 签约: 3792, 回款: 3492, 认购: 323 },
        ],
      },
    };
  },
  mounted() {
    util.cookies.set("glb_opened", "[]");
  },
};
</script>


<style lang="less" scoped>
.page {
  margin-top: 20px;
}
.ve-chat {
  background: #ffffff;
  border-radius: 5px;
}
.saleBgcolor {
  background: #ffa3a1;
}
.taxBgcolor {
  background: #84d9d2;
}
.extenedBgcolor {
  background: #87de75;
}
.likeBgcolor {
  background: #a5e7f0;
}
.linkBgColor {
  background: #93b7e3;
}
.keleBgColor {
  background: #edafda;
}

.data_section {
  margin: 2px;
  border-radius: 2px;
  .row_list {
    margin-bottom: 20px;
    .row_base {
      padding: 10px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 6px;
      height: 120px;
    }
  }
  .order_list {
    .orderArea {
      width: 100%;
      height: 300px;
      background: #fff !important;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 10px;
      padding-top: 40px;
      overflow: hidden;
    }
    .orderbarArea {
      height: 370px;
    }
  }
  .rflex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    border-radius: 6px;
    padding: 10px;
    color: #fff;
    height: 80px;
    .leftItem {
      align-items: start;
      justify-content: space-between;
      text-align: left;
      width: 162px;
    }
    .rightItem {
      width: 62px;
      display: flex;
      align-items: center;
      justify-content: center;
      //margin-right: 0px;
      .svg-icon {
        width: 1em;
        height: 1em;
        font-size: 30px;
        vertical-align: -0.15em;
        fill: #fff;
        overflow: hidden;
      }
    }
    .number {
      font-size: 22px;
      font-weight: bold;
      .perTitle {
        font-size: 13px;
        margin-left: 5px;
      }
    }
  }
  .pay {
    .leftItem {
      justify-content: space-around;
    }
  }
}
</style>
