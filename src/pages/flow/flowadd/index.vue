<template>
  <d2-container>
    <template slot="header">
      <el-form>
        <el-form-item label="公司" prop="corp">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template>
      <el-row :gutter="10">
        <el-col :span="8" style="background-color: #fff; border-radius: 4px">
          <el-tree
            :data="data"
            v-loading="loading1"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-col>
        <el-col
          :span="15"
          style="
            background-color: #fff;
            border-radius: 4px;
            margin-left: 0.3125rem;
          "
        >
          <el-form :inline="true" size="mini" style="margin-bottom: -18px">
            <el-form-item prop="keyWord">
              <el-input
                v-model="keyWord"
                placeholder="流程名称"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="search">
                <d2-icon name="search" />查询
              </el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData"
            v-loading="loading2"
            style="width: 100%; margin-left: 5px"
          >
            <el-table-column
              prop="FlowTypeName"
              label="流程名称"
              width="180"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="mini"
                  @click="tapPut(scope.$index, scope.row)"
                  >发起流程</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </template>
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import util from "@/libs/util.js";
import qs from "qs";
import dayjs from "dayjs";
import { GetFlowTypeTree, GetFlowTypeList } from "@/api/flow/flow";
let flowTmp = "";
export default {
  name: "flow-flowadd",
  data() {
    return {
      data: [],
      defaultProps: {
        label: "FlowTypeName",
      },
      tableData: [],
      options: [
        {
          value: "地产公司",
          label: "地产公司",
        },
      ],
      value: "地产公司",
      keyWord: "",
      loading1: false,
      loading2: false,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      let that = this;
      that.loading1 = true;
      GetFlowTypeTree(qs.stringify({}))
        .then(async (res) => {
          that.loading1 = false;
          if (typeof res != "undefined" && res.code == 0) {
            let attr = {
              //定义数据属性名称
              GUID: "GUID",
              PGUID: "PGUID",
              FlowTypeName: "FlowTypeName",
            };
            let attr2 = {
              //指定 rootId id parentId 的键值
              rootId: "",
              id: "GUID",
              parentId: "PGUID",
            };
            that.data = util.listToTreePlus(res.data, attr, attr2).tree;
          } else {
            that.$message({ message: res.msg, type: "error" });
          }
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    },
    tapPut(idx, e) {
      console.log("拉取模版:", `${e.Path}`);
      console.log("模版名称:", `${e.Path}Temp1`);
      if (!e.Path) {
        this.$message({
          message: "当前流程无表单,请联系管理员![Path is null]",
          type: "error",
        });
        return;
      }
      //-----------------
      let name = `${e.Path}Temp1`;
      //从opened里判断当前打开页面是否已经打开  并返回将要打开的页面name
      //const canOpen = ["Temp1","Temp2","Temp3"];//允许打开的页面后缀
      //如果新打开页面path或name包含Temp 说明页面支持多开
      util.chkOpendPage(name, (res) => {
        if (res.c == 0) {
          this.$router.push({
            path: `./flowaddpush/${res.name}`,
            query: {
              name: e.FlowTypeName,
              GUID: e.GUID,
              t: new Date().getTime(),
              //BillID: Math.random()*100>= 50 ? "A" : "B",
            },
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
      //console.log("page opened", opened);
      //-----------------
    },
    handleNodeClick(e) {
      let that = this;
      if (e.children.length > 0) {
        return;
      }
      console.log(1, e);
      let par = { FlowTypeGUID: e.GUID, FlowTypeName: "" };
      that.GetFlowTypeList(par);
    },
    GetFlowTypeList(par) {
      let that = this;
      if (that.loading2) {
        return;
      }
      that.loading2 = true;
      GetFlowTypeList(qs.stringify(par))
        .then(async (res) => {
          that.loading2 = false;
          if (typeof res != "undefined" && res.code == 0) {
            that.tableData = res.data;
          } else if (typeof res != "undefined" && res.code == "3") {
            that.tableData = [];
            //that.$message({message: res.msg,type: 'error'})
          } else {
            that.$message({ message: res.msg, type: "error" });
          }
        })
        .catch((err) => {
          console.log("err111: ", err);
        });
    },
    search() {
      let that = this;
      if (!that.keyWord) {
        that.$message({ message: `请输入流程名称`, type: "info" });
        return;
      }
      let par = { FlowTypeGUID: "", FlowTypeName: that.keyWord };
      that.GetFlowTypeList(par);
    },
  },
};
</script>
