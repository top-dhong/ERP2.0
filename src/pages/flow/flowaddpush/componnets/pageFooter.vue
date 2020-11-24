<template>
  <div>
    <el-row class="no-print" style="margin-bottom: 18px">
      <el-col :span="12">
        <span><b><i class="el-icon-files"></i>相关附件</b></span>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" justify="end">
          <global-uploader></global-uploader>
          <el-button size="small" type="primary" @click="tapUpload" title="选择需要上传的文件" :disabled="(Flg=='VIEW')">选择文件</el-button>
          <el-button v-show="funShowButtn(flowData.annexData)" size="small" type="danger" @click="tapDelAll" title="删除全部文件" :disabled="(Flg=='VIEW')">删除全部</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="no-print" style="margin-bottom: 18px">
      <el-col :span="24">
        <el-table :data="flowData.annexData" border stripe size="mini" :show-header="false" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column fixed label="文件名">
            <template slot-scope="scope">{{scope.row.FileName}}.{{scope.row.FileExt}}</template>
          </el-table-column>
          <el-table-column prop="CreateMan" label="姓名" width="120"></el-table-column>
          <el-table-column prop="CreateDate" label="日期" width="150"></el-table-column>
          <el-table-column type="index" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="tapView(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="tapDEl(scope.row,scope.$index)" type="text" size="small" :disabled="(Flg=='VIEW')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="no-print" style="margin-bottom: 18px">
      <el-col :span="12">
        <span><b><i class="el-icon-postcard"></i>相关流程</b></span>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" justify="end">
          <deng-select-flow @setData="setData" :autoClose="false" :disabled="(Flg=='VIEW')"></deng-select-flow>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="no-print" style="margin-bottom: 18px">
      <el-col :span="24">
        <el-table :data="flowData.relaFlowObj" border stripe size="mini" :show-header="false" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column fixed label="流程主题">
            <template slot-scope="scope">{{scope.row.Subject}}</template>
          </el-table-column>
          <el-table-column type="index" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="tapFlowView(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="tapFlowDEl(scope.row,scope.$index)" type="text" size="small" :disabled="(Flg=='VIEW')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :class="{'no-print':!(flowData.printChk.includes('打印流转意见'))}" style="margin-bottom: 18px">
      <el-col :span="24">
        <span><b><i class="fa fa-check-square"></i>流转意见</b></span>
      </el-col>
    </el-row>
    <el-row :class="{'no-print':!(flowData.printChk.includes('打印流转意见'))}">
      <el-col :span="24">
        <el-table stripe border size="mini" :data="flowData.hisOpinionData" style="width: 100%">
          <el-table-column prop="NodeName" label="节点" width="110">
          </el-table-column>
          <el-table-column prop="DoMan" label="审批人" width="90">
          </el-table-column>
          <el-table-column prop="DoTime" label="审批时间" :width="fitWidth1">
          </el-table-column>
          <el-table-column prop="DoType" label="类型" width="60">
          </el-table-column>
          <el-table-column prop="GetMan" label="接受人" width="90">
          </el-table-column>
          <el-table-column prop="ApprRet" label="表态" width="60">
          </el-table-column>
          <el-table-column prop="Opinion" label="意见内容" :width="fitWidth2" >
          </el-table-column>          
        </el-table>
      </el-col>
    </el-row>
    <el-row class="no-print" style="margin-bottom: 18px; margin-top: 18px">
      <el-col :span="12">
        <span><b><i class="fa fa-check-square"></i>我的意见</b></span>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" justify="end" class="no-print">
          <el-button size="small" type="primary" title="显示当前环节的审核要素" :disabled="(Flg=='VIEW')">审核要素</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="no-print">
      <el-col :span="24">
        <el-form-item label="是否同意：" class="te-item">
          <el-radio-group v-model="flowData.agree" :disabled="(Flg=='VIEW')">
            <el-radio label="同意"></el-radio>
            <el-radio label="不同意"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="no-print">
      <el-col :span="24">
        <el-form-item label="签字意见：" class="te-item">
          <el-input type="textarea" placeholder="请输入你的意见..." :autosize="{ minRows: 4}" :minlength="5" v-model="flowData.opinionData" maxlength="200" :readonly="(Flg=='VIEW')" show-word-limit></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//https://www.cnblogs.com/xiahj/p/vue-simple-uploader.html
import util from "@libs/util.js";
//import downRead from "@libs/downRead.js";
let downRead = require("@libs/downRead.js");
//import globalUploader from "@/components/deng-uploader"; //global-uploader
import { DeleteRelaFlow, DeleteRelaAnnex } from "@/api/flow/flow";
import dayjs from "dayjs";
import qs from "qs";
import Bus from "@assets/js/bus.js";
export default {
  props: {
	flowData: Object,
	Flg: "",
  },
  components: {
    globalUploader: () => import(`@cps/deng-uploader`),
    dengSelectFlow: () => import(`@cps/deng-select-flow`),
  },
  data() {
    return { 
      fitWidth1:"90",
      fitWidth2:"auto",
    };
  },
  mounted() {
    // 文件选择后的回调
    Bus.$on("fileAdded", () => {
      console.log("footbar文件已选择");
    });
    // 打印前设置合适宽度
    Bus.$on("printBeforeFitWidth", () => {
      this.fitWidth1 = "105";
      this.fitWidth2 = "240";
    });    
    // 打印后恢复宽度
    Bus.$on("printAfterFitWidth", () => {
      this.fitWidth1 = "90";
      this.fitWidth2 = "atuo";
    });     
    // 文件上传成功的回调
    Bus.$on("fileSuccess", (par) => {
      let that = this;
      //IsModify// 0init 1update 2delete
      par.data["IsModify"] = 1;
      console.log("footbar文件上传成功", par);
      //判断当前页面filelist中是否已上传该文件  有秒传支持所以在这里判断也无所谓
      if (!that.flowData.annexData) { that.flowData.annexData = [] }
      let arr = util
        .ArryToJoinStr(that.flowData.annexData, false, "FileMd5")
        .split(",");
      let boo = arr.includes(par.data.FileMd5);
      if (!boo) {
        //that.flowData.annexData.push(par.data);
        util.addArray(that.flowData.annexData, par.data);
      } else {
        that.$message({ message: "请勿上传相同文件!", type: "warning" });
      }
    });
  },
  methods: {
    setData(data) {
      let that = this;
      //判断当前页面relaFlowObj
      if (!that.flowData.relaFlowObj) { that.flowData.relaFlowObj = [] }
      let arr = util
        .ArryToJoinStr(that.flowData.relaFlowObj, false, "GUID")
        .split(",");
      let boo = arr.includes(data.GUID);
      let { GUID, BillID, Subject, Path } = data;
      if (!boo) {
        util.addArray(that.flowData.relaFlowObj, { GUID, BillID, Subject, Path });
      } else {
        that.$message({
          message: `请勿重复选取! [${Subject}]已存在!`,
          type: "warning",
        });
      }
    },
    // //查看相关流程
    // openFlowDetail(val) {
    //   this.$emit("openFlowDetail", val);
    // },
    //打开文件（查看文件） 注意后缀可以大写
    //http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=http://www.xdocin.com/demo/demo.docx
    tapView(e) {
      console.log(1, e);
      let that = this;
      let Url = `http://192.168.1.8:8080/Annex/${e.Url}`;
      downRead.downRead(that, Url);
    },
    tapDEl(e, idx) {
      console.log("tapDEl=>", idx);
      let that = this;
      that
        .$confirm(`确定删除附件[${e.FileName}.${e.FileExt}]?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          //that.flowData.annexData.splice(idx, 1);
          util.delArray(that.flowData.annexData, idx);
          that.$message({ message: "删除附件成功!", type: "success" });
        });
    },
    //查看相关流程
    tapFlowView(e) {
      console.log("tapFlowView=>", e);
      let that = this
      //-----------------
      let name = `${e.Path}Temp1`;
      //从opened里判断当前打开页面是否已经打开  并返回将要打开的页面name
      //const canOpen = ["Temp1","Temp2","Temp3"];//允许打开的页面后缀
      //如果新打开页面path或name包含Temp 说明页面支持多开
      util.chkOpendPage(name, (res) => {
        if (res.c == 0) {
          that.$router.push({
            path: `../flowaddpush/${res.name}`,
            query: { Flg: "EDT", FlowGUID: e.GUID, flowTypeName: e.Subject },
          });
        } else {
          that.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
      //-----------------
      //this.$router.push({path:'./flowaddpush/WorkRequestTemp1'})
      //let name = `${e.Path}Temp1`
      //that.$router.push({path:`./flowaddpush/${name}`,query:{Flg:"EDT",FlowGUID:e.GUID,flowTypeName:e.Subject}})
    },
    tapFlowDEl(e, idx) {
      console.log("tapFlowDEl=>", idx);
      let that = this;
      that.$confirm(`确定删除流程[${e.Subject}]?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          util.delArray(that.flowData.relaFlowObj, idx);
          that.$message({ message: "删除流程成功!", type: "success" });
        });
    },
    handleChange(file, annexData) {
      //this.flowData.annexData = annexData.slice(-3);
    },
    resetForm(formName) {
      //this.$refs[formName].resetFields();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    tapUpload() {
      console.log("打开文件选择框");
      // 打开文件选择框  timestamp分文件夹存储
      let token = util.cookies.get("Token");
      Bus.$emit("openUploader", {
        timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        token,
      });
    },
    tapDelAll() {
      let that = this;
      that
        .$confirm(`确定删除全部附件?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          //that.flowData.annexData.splice(0,that.flowData.annexData.length+1)
          //that.flowData.annexData = [];
          util.delAllArray(that.flowData.annexData);
          that.$message({ message: "删除全部附件成功!", type: "success" });
        });
    },
    //处理  控制el-table行显示  (isModify==0显示 不提交)(isModify==1显示 提交)(isModify==2不显示 提交)
    tableRowClassName({ row, rowIndex }) {
      if (row.isModify == 2) {
        return "hidden-row";
      }
      return "";
    },
    //显示全部删除按钮的条件方法
    funShowButtn(arr) {
      let tmpArr = [];
      arr.forEach((item) => {
        if (item.isModify != 2) {
          tmpArr.push(item);
        }
      });
      return tmpArr.length > 0;
    },
  },
  destroyed() {
    Bus.$off("fileAdded");
    Bus.$off("fileSuccess");
    Bus.$off("printBeforeFitWidth");
    Bus.$off("printAfterFitWidth");
  },
};
</script>
<style>
.te-item {
  margin-left: 0.9375rem;
}
.el-table .hidden-row {
  display: none;
}
</style>