<template>
    <div class="commentContainer cflex">
        <div class="comment rflex" v-for="(item,index) in commentData" :key="index">
            <!-- <div class="left">
               <img class="userImg" :src="userImg" alt="img" />
            </div> -->
            <div class="right cflex wflex">
               <!-- <p class="username">{{item.username}}</p> -->
               <p class="content">{{item.commentContent}}</p>
               <p class="dateTime"><d2-icon-svg class="time-svg" name="time"/>{{item.date}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  //import { getSalesTableList } from "@/api/static/sales";
  import userImg from "@/assets/img/avatar-3.png";

  export default {
    name:'commentList',
    data() {
      return {
        commentData: [],
        userImg:userImg
      }
    },
    mounted(){
        this.getSalesList();
    },
    methods:{
        // 获取列表数据
        getSalesList(){
            //getSalesTableList({}).then(res => {
                //let list = res.data.list
                this.commentData = [
                  {username:'系统管理员',commentContent:'关于2020年元旦放假通知关于2020年元旦放假通知关于2020年元旦放假',date:'2020-01-01'},
                  {username:'系统管理员',commentContent:'关于2020年元旦放假通知关于2020年元旦放假通知关于2020年元旦放假通知关于2020年元旦放假通知',date:'2020-01-01'},
                  {username:'系统管理员',commentContent:'关于2020年元旦放假通知关于2020年元旦放假通知关于2020年元旦放假通知关于2020年元旦放假通知关于2020年元旦放假通知',date:'2020-01-01'},
                  {username:'系统管理员',commentContent:'关于2020年元旦放假通知关于2020年元旦放假通知',date:'2020-01-01'},
                  {username:'系统管理员',commentContent:'关于2020年元旦放假通知关于2020年元旦放假通知',date:'2020-01-01'},
                  {username:'系统管理员',commentContent:'关于2020年元旦放假通知关于2020年元旦放假通知',date:'2020-01-01'}];//list.slice(0,3);
            //})
        },
    }
  }
</script>

<style lang="less" scoped>
  .time-svg{
        width: 1em;
        height: 1em;
        font-size: 14px;
        vertical-align: -0.15em;
        fill: #fff;
        color: #000000;
        overflow: hidden;
        margin-right: 5px;
  }
 .commentContainer{
   background: #fff;
   padding: 10px;
   box-sizing: border-box;
   height: 400px;
   max-height: 400px;
   overflow: hidden;
   border-radius: 6px;
   justify-content: space-between;
   .comment{
       border-bottom: 1px solid #e8e8e8;
       padding-bottom: 5px;
      .left{
         width:80px;
         text-align: center;
         .userImg{
           width:50px;
           border-radius: 50%;
         }
      }
      .right{
           justify-content: space-between;
           //height: 120px;
          .username{
            font-size: 14px;
            font-weight: bold;
          }
          .content{
            font-size: 13px;
            //line-height: 20px;
          }
          .dateTime{
             text-align: right;
             font-size: 13px;
             color:#87DE75;
             .svg-icon{
               margin-right: 5px;
             }
          }

      }
   }
 }
</style>
