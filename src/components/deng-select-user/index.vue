<template>
  <div>
    <el-dialog title="人员选择" :visible.sync="dialogCYVisible" append-to-body>
      <el-row>
        <span>已选:</span>
        <el-button type="danger" icon="el-icon-delete" size="mini" class="d2-fr" @click="CYUserSelect = []"> 清空 </el-button>
      </el-row>
      <el-row>
        <el-tag style="margin: 5px 5px 5px 5px;" size="medium" v-for="tag in CYUserSelect" :key="tag.GUID" :disable-transitions="true" @close="CYUserSelectClose(tag.GUID)" closable>
          {{ tag.UserName }}
        </el-tag>
      </el-row>
      <el-divider class="el-divider-diy"></el-divider>
      <el-row>
        <el-col :span="10">
          <el-form :inline="true" size="mini" style="background-color: #fff; border-radius: 4px;">
            <el-form-item prop="keyWord">
              <el-input v-model="keyWord" placeholder="请输入员工姓名/工号" clearable />
            </el-form-item>
            <el-form-item>
              <el-button @click="search" type="primary">
                <d2-icon name="search" /> 查询
              </el-button>
            </el-form-item>
          </el-form>
          <el-tree ref="CYtree" style="height: 400px;" heig class="filter-tree" node-key="GUID" highlight-current :default-expanded-keys="extree" :expand-on-click-node="false" :data="CYtreeList" :props="CYdefaultProps" @node-click="CYgetMenuData"></el-tree>
        </el-col>
        <el-col :span="14">
          <el-table stripe border height="440" :data="CYUserWaitData">
            <el-table-column property="UserName" width="80" label="姓名"></el-table-column>
            <el-table-column property="OrgName" width="120" label="部门"></el-table-column>
            <el-table-column property="SecurityLevel" width="50" label="安全级别"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="mini" @click="selectCYUser(scope.row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-checkbox-group v-model="checkedstatus">
            <el-checkbox v-for="sta in status" :label="sta" :key="sta">{{
              sta
            }}</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row style="margin: 10px 0 0 0">
          <el-button @click="dialogCYVisible = false" title="点击阴影部分可快捷关闭窗口">取消</el-button>
          <el-button type="primary" @click="submitdata">确定</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!-- 允许用户输入 -->
    <el-input v-model="currentValue" v-bind="bind">
      <el-button @click="showDialog" slot="append" :disabled="readonly">
        <i class="fa fa-list"></i>
      </el-button>
    </el-input>
  </div>
</template>

<script>
import util from "@/libs/util.js";
import { GetSysOrgList, GetUserByOrgGUID } from "@/api/elpack/elpack";
import qs from "qs";
export default {
  name: "deng-select-user",
  props: {
    CYUserSelectValue: {
      type: Array,
      required: false,
      default: [],
    },
    // 值
    value: {
      type: String,
      required: false,
      default: "",
    },
    // 占位符
    placeholder: {
      type: String,
      required: false,
      default: "请选择",
    },
    canMark: {
      type: String,
      required: false,
      default: "more",
    },
	readonly: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      dialogCYVisible: false,
      keyWord: "",
      CYdefaultProps: {
        label: "OrgName",
      },
      CYtreeList: [],
      CYUserWaitData: [],
      CYUserSelect: [],
      currentValue: "",
      sType: 0, //0树  1搜索
      //status:[{lable:1,value:"试用"},{lable:2,value:"临时"},{lable:3,value:"转正"},{lable:4,value:"离职"},{lable:5,value:"实习"},{lable:6,value:"备用"}],//页面显示
      status: ["试用", "临时", "转正", "离职", "实习", "备用"],
      checkedstatus: ["试用", "转正", "实习"], //组件获取的参数
      extree: [],
    };
  },
  computed: {
    // 输入框上绑定的设置
    bind() {
      return {
        placeholder: this.placeholder,
        canMark: this.canMark,
        readonly: this.readonly,
        ...this.$attrs,
      };
    },
  },
  watch: {
    value(value) {
      this.currentValue = value;
    },
    CYUserSelectValue(value) {
      this.CYUserSelect = value;
    },
  },
  created() {
    this.currentValue = this.value;
    this.CYUserSelect = this.CYUserSelectValue;
    this.GetSysOrgList();
  },
  methods: {
    GetSysOrgList() {
      let that = this;
      GetSysOrgList().then(async (res) => {
        if (typeof res != "undefined" && res.code == 0) {
          let a1 = {
            //定义数据属性名称
            GUID: "GUID",
            ParentGUID: "ParentGUID",
            OrgName: "OrgName",
            //orgCode:'orgCode',
            //orgType:'orgType',
            //corpGuid:'corpGuid',
            //orgLeader:'orgLeader'
          };
          let a2 = {
            //指定 rootId id parentId 的键值
            rootId: "-1",
            id: "GUID",
            parentId: "ParentGUID",
          };
          let treeObj = util.listToTreePlus(res.data, a1, a2, 1);
          console.log(111, treeObj);
          that.CYtreeList = treeObj.tree;
          that.extree = treeObj.extree;
        }
      });
    },
    //根据所选状态换取lable值的数组
    getStatus(arr) {
      let curArr = [
        { lable: 1, value: "试用" },
        { lable: 2, value: "临时" },
        { lable: 3, value: "转正" },
        { lable: 4, value: "离职" },
        { lable: 5, value: "实习" },
        { lable: 6, value: "备用" },
      ];
      let tmpArr = []; //curArr.map((item)=>{if(arr.includes(item.value)){return item.lable}})
      curArr.forEach((item) => {
        if (arr.includes(item.value)) {
          tmpArr.push(item.lable);
        }
      });
      return tmpArr;
    },
    CYgetMenuData(node) {
      let that = this;
      that.sType = 0;
      let param = {};
      param.orgGUID = node.GUID;
      param.type = that.sType;
      param.keyWord = that.keyWord;
      param.status = that.getStatus(that.checkedstatus).join(",");
      GetUserByOrgGUID(qs.stringify({ jsonStr: JSON.stringify(param) }))
        .then(async (res) => {
          if (typeof res != "undefined" && res.code == 0) {
            that.CYUserWaitData = res.data;
          }
        })
        .catch((err) => {
          console.log("err111: ", err);
        });
    },
    //选取需要传阅/沟通的人
    selectCYUser(item) {
      let that = this;
      // let tmpArry = that.CYUserSelect.map((val)=>{return val.GUID==item.GUID})
      // if(!tmpArry.includes(true)){
      // 	that.CYUserSelect.push({GUID:item.GUID,userName:item.userName})
      // }
      if (that.canMark == "one") {
        console.log("选单个人...");
        that.CYUserSelect = [{ GUID: item.GUID, UserName: item.UserName }];
      } else {
        let idx = util.ObjArryIncludes(that.CYUserSelect, item.GUID);
        if (idx == -1) {
          that.CYUserSelect.push({ GUID: item.GUID, UserName: item.UserName });
        }
      }
    },
    //移除需要传阅/沟通的人
    CYUserSelectClose(GUID) {
      let that = this;
      let idx = util.ObjArryIncludes(that.CYUserSelect, GUID);
      if (idx != -1) {
        that.CYUserSelect.splice(idx, 1); //注释：该方法会改变原始数组。
      }
    },
    submitdata() {
      let that = this;
      that.$emit("submitdata", that.CYUserSelect);
      that.dialogCYVisible = false;
      that.currentValue = util.ArryToJoinStr(
        that.CYUserSelect,
        false,
        "UserName"
      ); //that.CYUserSelect.map((v)=>{return v.userName}).join(",")
      //console.log('$emit>',that.CYUserSelect)
    },
    search() {
      let that = this;
      if (!that.keyWord) {
        that.$message({ message: `请输入员工姓名/工号`, type: "info" });
        return;
      }
      let param = {};
      that.sType = 1;
      param.orgGUID = "";
      param.keyWord = that.keyWord;
      param.type = that.sType;
      param.status = that.getStatus(that.checkedstatus).join(",");
      GetUserByOrgGUID(qs.stringify({ jsonStr: JSON.stringify(param) }))
        .then(async (res) => {
          if (typeof res != "undefined" && res.code == 0) {
            that.CYUserWaitData = res.data;
          }
        })
        .catch((err) => {
          console.log("err111: ", err);
        });
    },
	showDialog(){
		if(!this.readonly){
			this.dialogCYVisible=true
		}
	}
  }
};
</script>

<style>
.el-tree {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: scroll;
}

.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}

.el-dialog__body {
  padding: 10px 20px;
}

/* .el-dialog__header {
    padding: 10px 10px;
} */

.el-dialog__footer {
  padding: 10px 20px;
}

.el-divider-diy{
  margin: 3px 0;
}
</style>