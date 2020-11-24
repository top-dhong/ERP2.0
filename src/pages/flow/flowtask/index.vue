<template>
  <d2-container>
    <el-form
      slot="header"
      :inline="true"
      size="mini"
      style="margin-bottom: -18px"
    >
      <el-form-item>
        <el-button type="success" title="新建流程" @click="tapAdd">
          <d2-icon name="plus" />
          新建
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="test">
          <d2-icon name="clock-o" />
          催办
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="warning"
          v-show="tasksType == 'Wait'"
          @click="showFlowInvalid"
        >
          <d2-icon name="ban" />
          作废
        </el-button>
      </el-form-item>
      <!-- <el-form-item>
			  <el-button
			    type="danger"
				@click="test">
			    <d2-icon name="trash-o"/>
			    删除
			  </el-button>
			</el-form-item> -->
      <el-form-item>
        <el-button @click="test">
          <d2-icon name="pencil" />
          干预
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleDownloadXlsx"
          title="导出勾选的数据或查询的全部数据(最多200条)"
        >
          <d2-icon name="cloud-download" />
          导出
        </el-button>
      </el-form-item>
      <el-popover
        placement="top-start"
        title="温馨提示"
        width="400"
        trigger="click"
      >
        <li>导出勾选的数据或查询的全部数据(最多200条)</li>
        <li>如果需导出更多流程数据,请联系管理员</li>
        <li>重置会清空所有查询条件</li>
        <el-button
          slot="reference"
          size="mini"
          icon="el-icon-info"
          style="float: right"
        ></el-button>
      </el-popover>
    </el-form>
    <el-row>
      <el-col :span="4" style="height: 40.125rem">
        <el-radio-group
          v-model="viewClass"
          style="margin-bottom: 5px"
          size="mini"
        >
          <el-radio-button label="FlowClass">按类型</el-radio-button>
          <el-radio-button label="DeptClass">按部门</el-radio-button>
          <el-radio-button label="ProjectClass">按项目</el-radio-button>
        </el-radio-group>
        <el-scrollbar style="height: 100%">
          <el-tree
            :data="treeData"
            v-loading="loading2"
            node-key="GUID"
            :highlight-current="true"
            :check-on-click-node="true"
            :expand-on-click-node="false"
            :default-expanded-keys="defaultExpandeKeys"
            @node-click="handleCheck"
            :props="defaultProps"
          >
          </el-tree>
        </el-scrollbar>
      </el-col>
      <el-col :span="20" style="padding-left: 5px">
        <div>
          <el-form :inline="true" size="mini" style="margin-bottom: -18px">
            <el-form-item prop="keyWord">
              <el-input
                v-model="keyWord"
                @keyup.enter.native="search"
                placeholder="创建人/部门/流程标题/编号"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-button @click="search" type="primary">
                <d2-icon name="search" />
                查询
              </el-button>
            </el-form-item>
            <el-form-item label="状态" prop="tasksType">
              <el-select
                v-model="tasksType"
                placeholder="状态选择"
                style="width: 100px"
              >
                <el-option label="待办" value="Wait" />
                <el-option label="已办" value="Complete" />
                <el-option label="发起" value="SelfCreate" />
                <el-option label="传阅" value="MakeCopy" />
              </el-select>
            </el-form-item>
            <el-form-item label="时段" prop="TimeArea">
              <el-select
                v-model="TimeArea"
                placeholder="时段选择"
                style="width: 100px"
              >
                <el-option label="全部" value="36500" />
                <el-option label="近三月" value="90" />
                <el-option label="近一月" value="30" />
                <el-option label="近半月" value="15" />
                <el-option label="近七天" value="7" />
                <el-option label="近三天" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item prop="isRead">
              <el-radio-group
                v-model="isRead"
                :disabled="tasksType != 'MakeCopy'"
              >
                <!-- <el-radio-button label="-1">全部</el-radio-button> -->
                <el-radio-button label="1">已读</el-radio-button>
                <el-radio-button label="0">未读</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="isInvalid">
              <el-checkbox v-model="isInvalid">显示作废流程</el-checkbox>
            </el-form-item>
          </el-form>
          <el-table
            :data="table"
            v-loading="loading"
            size="mini"
            stripe
            style="width: 100%; margin-top: 5px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>

            <el-table-column label="时限" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.TimeLeft }}
              </template>
            </el-table-column>

            <el-table-column label="创建人">
              <template slot-scope="scope">
                {{ scope.row.CreateUserName }}
              </template>
            </el-table-column>
            <el-table-column label="创建部门">
              <template slot-scope="scope">
                {{ scope.row.CreateDeptName }}
              </template>
            </el-table-column>
            <el-table-column label="项目名称">
              <template slot-scope="scope">
                {{ scope.row.ProjectName }}
              </template>
            </el-table-column>
            <el-table-column label="流程类型">
              <template slot-scope="scope">
                {{ scope.row.WorkFlowTypeName }}
              </template>
            </el-table-column>
            <el-table-column label="流程编号" width="200">
              <template slot-scope="scope">
                {{ scope.row.BillID }}
              </template>
            </el-table-column>
            <el-table-column label="流程标题" width="150">
              <template slot-scope="scope">
                {{ scope.row.Subject }}
              </template>
            </el-table-column>
            <el-table-column label="到达时间">
              <template slot-scope="scope">
                {{ scope.row.GetTime }}
              </template>
            </el-table-column>
            <el-table-column label="处理时间">
              <template slot-scope="scope">
                {{ scope.row.DoTime }}
              </template>
            </el-table-column>
            <el-table-column label="当前节点" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.FlowState }}
              </template>
            </el-table-column>
            <el-table-column
              width="90"
              fixed="right"
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-dropdown size="small" class="d2-mr">
                  <span class="btn-text"
                    ><el-button icon="el-icon-setting" size="mini"></el-button
                  ></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="tapDetail(scope.row)">
                      <d2-icon name="info-circle" class="d2-mr-5" />
                      详情
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="tapEditer(scope.row)">
                      <d2-icon name="pencil" class="d2-mr-5" />
                      编辑
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="'作废流程[' + InvalidSubject + ']'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="作废原因:">
          <el-input
            v-model="form.InvalidReason"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading3" @click="tapFlowInvalid"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import qs from "qs";
import util from "@/libs/util.js";
import {
  GetFlowTaskClass,
  GetFlowTaskList,
  SetSelfFlowInvalid,
} from "@/api/flow/flow";
export default {
  components: {
    FlowPageHeader: () => import("./componnets/PageHeader"),
    FlowPageFooter: () => import("./componnets/PageFooter"),
  },
  data() {
    return {
      viewClass: "FlowClass",
      tasksType: "Wait",
      TimeArea: "90", //时段
      keyWord: "",
      isRead: 0,
      isInvalid: false,
      viewGuid: "", //GUID
      DeptOrProjGUID: "", //PGUID
      treeData: [],
      defaultProps: {
        children: "children",
        label: "ClassName",
      },
      defaultExpandeKeys: [],
      table: [],
      loading2: false, //加载树形菜单
      loading: false, //表格数据加载状态
      btnLoading3: false, //作废按钮加载状态
      multipleSelection: [], //当前表格中勾选的数据
      dialogFormVisible: false,
      form: { InvalidReason: "" },
      InvalidSubject: "",
    };
  },
  watch: {
    viewClass(val) {
      this.viewGuid = "";
      this.DeptOrProjGUID = "";
      this.getData();
      this.getTreeData();
    },
    tasksType(val) {
      this.getData();
      this.getTreeData();
    },
    isRead(val) {
      this.getData();
    },
    isInvalid(val) {
      this.getData();
      this.getTreeData();
    },
    TimeArea(val) {
      this.getData();
    },
  },
  mounted() {
    this.getData();
    this.getTreeData();
  },
  methods: {
    //初始化页面数据
    getTreeData() {
      let that = this;
      let IsInvalid = that.isInvalid ? 1 : 0; //反向一下
      that.loading2 = true;
      let par = {
        TasksType: that.tasksType,
        ViewClass: that.viewClass,
        TimeArea: that.TimeArea,
        IsInvalid,
        IsRead: that.isRead,
      };
      GetFlowTaskClass(qs.stringify(par))
        .then(async (res) => {
          that.loading2 = false;
          if (typeof res != "undefined" && res.code == 0) {
            let tmpTreeData = res.data;
            if (0 == tmpTreeData.length) return;
            let a1 = {
              //定义数据属性名称
              GUID: "GUID",
              PGUID: "PGUID",
              ClassName: "ClassName",
            };
            let a2 = {
              //指定 rootId id parentId 的键值
              rootId: "-1",
              id: "GUID",
              parentId: "PGUID",
            };
            let treeObj = util.listToTreePlus(tmpTreeData, a1, a2, 2);
            console.log(111, treeObj);
            that.treeData = treeObj.tree;
            that.defaultExpandeKeys = treeObj.extree;
          } else if (typeof res != "undefined" && res.code == 3) {
            that.treeData = [];
          }
        })
        .catch((err) => {
          console.log("err111: ", err);
        });
    },
    //加载table数据
    getData() {
      let that = this;
      that.loading = true;
      let IsInvalid = that.isInvalid ? 1 : 0; //反向一下
      let par = {
        TasksType: that.tasksType,
        ViewClass: that.viewClass,
        TimeArea: that.TimeArea,
        IsInvalid,
        IsRead: that.isRead,
        KeyWord: that.keyWord,
        FlowClassGUID: that.viewGuid,
        DeptOrProjGUID: that.DeptOrProjGUID,
      };
      GetFlowTaskList(qs.stringify(par))
        .then(async (res) => {
          that.loading = false;
          if (typeof res != "undefined" && res.code == 0) {
            let tableList = res.data;
            if (0 == tableList.length) return;
            that.table = tableList;
            //that.page['pageTotal'] = tableList[0].totalCount*1;
          } else if (typeof res != "undefined" && res.code == 3) {
            that.table = [];
            //that.page['pageTotal'] = 0
          } else {
            that.$message({ message: res.msg, type: "error" });
          }
        })
        .catch((err) => {
          that.loading = false;
          console.log("err111: ", err);
        });
    },
    //查询功能
    search() {
      this.getData();
    },
    //tree点击节点触发事件
    handleCheck(e) {
      let that = this;
      console.log(1, e);
      //处理根节点和非根节点  拼接所有根节点GUID为FlowClassGUID(viewGuid)  拼接所有非根节点GUID为DeptOrProjGUID
      let viewGuid = "";
      let DeptOrProjGUID = "";
      function doTreeNode(ele) {
        for (const i in ele) {
          let data = ele[i];
          if (0 < data.children.length) {
            DeptOrProjGUID += "," + data.GUID;
            doTreeNode(data.children); //自己调用自己
          } else {
            viewGuid += "," + data.GUID;
          }
        }
        return { viewGuid, DeptOrProjGUID };
      }
      let obj = doTreeNode([e]);
      that.viewGuid = obj.viewGuid.substr(1);
      that.DeptOrProjGUID = obj.DeptOrProjGUID.substr(1);
      that.getData();
      //标识根节点的意思
      // if(0==e.children.length){
      // 	that.viewGuid = e.GUID
      // 	that.DeptOrProjGUID = e.PGUID
      // 	that.getData()
      // }else{//点击非根节点
      // 	that.viewGuid = ""
      // 	that.DeptOrProjGUID = e.GUID;
      // 	that.getData()
      // }
    },
    tapAdd() {
      this.$router.push({ path: "./flowadd" });
    },
    tapDetail(e) {
      //-----------------
      let name = `${e.Path}Temp1`;
      //从opened里判断当前打开页面是否已经打开  并返回将要打开的页面name
      //const canOpen = ["Temp1","Temp2","Temp3"];//允许打开的页面后缀
      //如果新打开页面path或name包含Temp 说明页面支持多开
      util.chkOpendPage(name, (res) => {
        if (res.c == 0) {
          this.$router.push({
            path: `./flowaddpush/${res.name}`,
            query: { Flg: "VIEW", FlowGUID: e.GUID, flowTypeName: e.Subject },
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
      //-----------------
    },
    tapEditer(e) {
      //-----------------
      let name = `${e.Path}Temp1`;
      //从opened里判断当前打开页面是否已经打开  并返回将要打开的页面name
      //const canOpen = ["Temp1","Temp2","Temp3"];//允许打开的页面后缀
      //如果新打开页面path或name包含Temp 说明页面支持多开
      util.chkOpendPage(name, (res) => {
        if (res.c == 0) {
          this.$router.push({
            path: `./flowaddpush/${res.name}`,
            query: { Flg: "EDT", FlowGUID: e.GUID, flowTypeName: e.Subject },
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
      //-----------------
      //-----------------
      //that.$router.push({path:`./flowaddpush/${name}`,query:{Flg:"EDT",FlowGUID:e.GUID,flowTypeName:e.Subject}})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(11, this.multipleSelection);
    },
    //导出数据  不勾选导出当前查询条数  勾选仅导出当前勾选的数据
    handleDownloadXlsx() {
      let that = this;
      console.log(1, that.table);
      let columnsStr =
        "时限#TimeLeft,创建人#CreateUserName,创建部门#CreateDeptName,项目名称#ProjectName,流程类型#WorkFlowTypeName,流程编号#BillID,流程标题#Subject,到达时间#GetTime,处理时间#DoTime,当前节点#FlowState";
      util.exportExcel(that, "", columnsStr, that.table);
      //util.exportExcel(that,'','姓名#name,年龄#age',[{name:'张三',age:'18'},{name:'张三1',age:'181'}])
    },
    showFlowInvalid() {
      let that = this;
      if (1 != that.multipleSelection.length) {
        that.$message({
          message: `请勾选一条数据且只能勾选一条数据!`,
          type: "error",
        });
      } else {
        that.InvalidSubject = that.multipleSelection[0].Subject;
        that.dialogFormVisible = true;
      }
    },
    tapFlowInvalid() {
      let that = this;
      let par = {};
      par.FlowGUID = that.multipleSelection[0].GUID;
      par.InvalidReason = that.form.InvalidReason;
      if (!par.InvalidReason) {
        that.$message({ message: `请填写作废原因!`, type: "error" });
        return;
      }
      that.btnLoading3 = true;
      SetSelfFlowInvalid(qs.stringify(par))
        .then(async (res) => {
          that.btnLoading3 = false;
          if (typeof res != "undefined" && res.code == 0) {
            that.dialogFormVisible = false;
            that.$message({ message: res.msg, type: "success" });
          } else {
            that.$message({ message: res.msg, type: "error" });
          }
        })
        .catch((err) => {
          that.btnLoading3 = false;
          console.log("err111: ", err);
        });
    },
    test() {
      this.$message({ message: "敬请期待!", type: "info" });
    },
  },
};
</script>

<style>
.el-tree {
  height: 40.125rem;
}
</style>